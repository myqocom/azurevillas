'use client'

import { useState } from 'react'
import BlurRevealText from '@/components/BlurRevealText'

const faqs = [
  {
    question: 'Does Azzura Villas have a pool?',
    answer: 'Yes. Each villa has its own private infinity pool and hot tub. You can find out more about the facilities on this page.',
  },
  {
    question: 'What are the check-in and check-out times?',
    answer: 'Check-in is from 16:00. Check-out is until 11:00.',
  },
  {
    question: 'How much does it cost to stay at Azzura Villas?',
    answer: 'Prices vary depending on your dates and the option you select. Enter your dates to see current availability and pricing.',
  },
  {
    question: 'What activities are available?',
    answer: 'Azzura Villas offers the following activities and services (charges may apply): hot tub, cycling, snorkelling, diving, canoeing, windsurfing, water park access, bicycle rental, and swimming pool.',
  },
  {
    question: 'How far is Azzura Villas from the centre of Vasiliki?',
    answer: 'Azzura Villas is 1.6 km from the centre of Vasiliki.',
  },
  {
    question: 'How close to the beach is Azzura Villas?',
    answer: 'The nearest beach is just 300 m from Azzura Villas.',
  },
  {
    question: 'How many guests can Azzura Villas accommodate?',
    answer: 'Each villa accommodates up to 8 guests across 3 bedrooms.',
  },
  {
    question: 'Are pets allowed at Azzura Villas?',
    answer: 'Pets are not allowed at this property.',
  },
  {
    question: 'Is there an airport shuttle service?',
    answer: 'Yes. Azzura Villas has an airport shuttle service for an additional fee. You can request it directly after you have booked your stay.',
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
