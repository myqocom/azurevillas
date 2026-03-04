'use client'

import { useState } from 'react'
import BlurRevealText from '@/components/BlurRevealText'

const faqs = [
  {
    question: 'How many guests can each villa accommodate?',
    answer: 'Each villa sleeps up to 8 guests across 3 bedrooms. The villas can be rented individually or together for groups of up to 16.',
  },
  {
    question: 'Is there a minimum stay requirement?',
    answer: 'We require a minimum of 5 nights during peak season (July and August) and 3 nights during the shoulder months. Contact us for short-break availability in spring or autumn.',
  },
  {
    question: 'Are the pools private?',
    answer: 'Yes. Each villa has its own dedicated infinity pool and hot tub. No shared facilities — your pool is yours alone for the duration of your stay.',
  },
  {
    question: 'What is the cancellation policy?',
    answer: 'Cancellations made 60 or more days before arrival receive a full refund. Between 30 and 60 days, 50% of the booking amount is retained. Within 30 days of arrival, the full amount is non-refundable. We strongly recommend travel insurance.',
  },
  {
    question: 'Is airport transfer included?',
    answer: 'Airport transfers from Aktion National Airport (PVK) can be arranged on request for an additional fee. The drive takes approximately 55 minutes. We can also arrange private boat transfers from Lefkada port.',
  },
  {
    question: 'Are pets allowed?',
    answer: 'Small, well-behaved pets are welcome with prior notice. Please let us know at the time of booking so we can prepare accordingly.',
  },
  {
    question: 'What is the check-in and check-out time?',
    answer: 'Check-in is from 15:00 and check-out is by 11:00. Early check-in or late check-out can often be accommodated subject to availability — just ask.',
  },
  {
    question: 'Is daily cleaning included?',
    answer: 'A mid-stay clean is included for stays of 7 nights or more. Additional cleaning services and fresh linen changes can be arranged at any time for an extra charge.',
  },
]

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section className="faq" id="faq">
      <div className="faq__inner">
        <div className="faq__header">
          <p className="section-label">Questions</p>
          <BlurRevealText
            text="Everything You Need to Know."
            accentFromIndex={2}
            lineBreakAfter={1}
            as="h2"
            className="faq__heading"
          />
        </div>

        <div className="faq__list">
          {faqs.map((item, i) => (
            <div key={i} className="faq__item">
              <button
                className="faq__question"
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span>{item.question}</span>
                <span
                  className="faq__icon"
                  style={{ transform: open === i ? 'rotate(45deg)' : 'rotate(0deg)' }}
                >
                  +
                </span>
              </button>
              <div
                className="faq__answer"
                style={{
                  maxHeight: open === i ? '240px' : '0',
                  opacity: open === i ? 1 : 0,
                }}
              >
                <p>{item.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
