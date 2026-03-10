"use server"

import { Resend } from "resend"
import { headers } from "next/headers"

const resend = new Resend(process.env.RESEND_API_KEY)

const SITE_NAME = "Azzura Villas"
const SITE_URL = "https://azzuravillas.gr"
const RECIPIENT_EMAIL = "lefkadabooking@gmail.com"
const SLACK_WEBHOOK_URL = process.env.SLACK_WEBHOOK_URL

// Simple in-memory rate limiting (per server instance)
const rateLimit = new Map<string, { count: number; resetAt: number }>()
const RATE_LIMIT_MAX = 5
const RATE_LIMIT_WINDOW = 60 * 60 * 1000 // 1 hour

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const entry = rateLimit.get(ip)
  if (!entry || now > entry.resetAt) {
    rateLimit.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW })
    return false
  }
  entry.count++
  return entry.count > RATE_LIMIT_MAX
}

function sanitize(input: string): string {
  return input.replace(/[<>]/g, "").trim().slice(0, 2000)
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length < 320
}

async function sendSlack(text: string) {
  if (!SLACK_WEBHOOK_URL) return
  try {
    await fetch(SLACK_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    })
  } catch {
    // Slack notification is best-effort
  }
}

export type ContactFormState = {
  success: boolean
  error: string
}

export async function submitContactForm(
  _prev: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  // Get IP for rate limiting
  const headersList = await headers()
  const ip =
    headersList.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    headersList.get("x-real-ip") ||
    "unknown"

  if (isRateLimited(ip)) {
    return { success: false, error: "Too many requests. Please try again later." }
  }

  // Honeypot check
  const honeypot = formData.get("website") as string
  if (honeypot) {
    // Spam detected, send to Slack only
    await sendSlack(
      `🚫 *Spam blocked* on ${SITE_NAME}\nIP: ${ip}\nHoneypot field filled: "${honeypot}"`
    )
    // Return success to not reveal detection
    return { success: true, error: "" }
  }

  // Extract and validate fields
  const name = sanitize((formData.get("name") as string) || "")
  const email = sanitize((formData.get("email") as string) || "")
  const checkin = sanitize((formData.get("checkin") as string) || "")
  const checkout = sanitize((formData.get("checkout") as string) || "")
  const guests = sanitize((formData.get("guests") as string) || "")
  const message = sanitize((formData.get("message") as string) || "")

  if (!name || !email) {
    return { success: false, error: "Name and email are required." }
  }

  if (!isValidEmail(email)) {
    return { success: false, error: "Please enter a valid email address." }
  }

  const now = new Date()
  const timestamp = now.toISOString().slice(0, 16).replace("T", " ")

  const body = [
    `Hello ${SITE_NAME} team,`,
    "",
    "A new inquiry has been submitted via your website. Don't forget to reply:",
    "",
    "--- Booking Enquiry Details ---",
    `Name: ${name}`,
    `Email: ${email}`,
    checkin ? `Check-in: ${checkin}` : null,
    checkout ? `Check-out: ${checkout}` : null,
    guests ? `Number of Guests: ${guests}` : null,
    message ? `Message: ${message}` : null,
    "",
    SITE_URL,
    timestamp,
    `IP Address: ${ip}`,
  ]
    .filter(Boolean)
    .join("\n")

  try {
    await resend.emails.send({
      from: "MYQO <mailer@myqo.com>",
      to: RECIPIENT_EMAIL,
      subject: `${SITE_NAME} | New Booking Enquiry from ${name}`,
      text: body,
      headers: { "Reply-To": email },
    })

    // Notify Slack of successful inquiry
    const slackMsg = [
      `📩 *New enquiry* on ${SITE_NAME}`,
      `*Name:* ${name}`,
      `*Email:* ${email}`,
      checkin ? `*Check-in:* ${checkin}` : null,
      checkout ? `*Check-out:* ${checkout}` : null,
      guests ? `*Guests:* ${guests}` : null,
      message ? `*Message:* ${message}` : null,
    ]
      .filter(Boolean)
      .join("\n")
    await sendSlack(slackMsg)

    return { success: true, error: "" }
  } catch {
    return {
      success: false,
      error: "Something went wrong. Please try again or contact us directly.",
    }
  }
}
