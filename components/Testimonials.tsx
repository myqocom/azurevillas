import BlurRevealText from '@/components/BlurRevealText'

const reviews = [
  {
    text: 'Fresh, new villa with an amazing view. Extraordinary view, new and beautiful villa, close to Vasiliki. Very kind and helpful owner and staff. Fully equipped.',
    name: 'Alievski',
    country: 'Sweden',
    source: 'booking',
  },
  {
    text: 'Fabulous. Breathtaking view. Fantastic property. Luxury, clean, modern, well equipped. Lovely people, very helpful. Electric BBQ on request.',
    name: 'Chloe',
    country: 'United Kingdom',
    source: 'booking',
  },
  {
    text: 'Makis is a very good boy. Everything is perfect.',
    name: 'Olympia P.',
    country: 'Greece',
    source: 'google',
  },
  {
    text: 'Woke up to the sea every morning. The infinity pool is even more beautiful in person. Hot tub at sunset is something else entirely.',
    name: 'Julia B.',
    country: 'Austria',
    source: 'website',
  },
  {
    text: 'Booked for a family trip and it exceeded every expectation. Spacious, spotless, and the views from the terrace are genuinely unforgettable.',
    name: 'Konstantinos P.',
    country: 'Greece',
    source: 'website',
  },
  {
    text: 'Best villa we have stayed in across the Greek islands. Kitchen fully stocked, beds incredibly comfortable, and the host thought of everything.',
    name: 'Emma R.',
    country: 'United Kingdom',
    source: 'website',
  },
  {
    text: 'Quiet, private, and beautifully designed. The pool is right on the edge of the hill. We did not want to leave.',
    name: 'Marco D.',
    country: 'Italy',
    source: 'website',
  },
  {
    text: 'We come to Lefkada every summer. This was different. Brand new, spotless, and that view is something you just stare at for hours.',
    name: 'Sarah M.',
    country: 'Germany',
    source: 'website',
  },
  {
    text: 'Incredible location. The villa is modern and very well equipped. The owner was responsive and made everything easy from the first message.',
    name: 'Thomas K.',
    country: 'Netherlands',
    source: 'website',
  },
]

function Stars({ count = 5, color = 'var(--orange)' }: { count?: number; color?: string }) {
  return (
    <div className="testimonial-stars">
      {[...Array(count)].map((_, i) => (
        <svg key={i} width="13" height="13" viewBox="0 0 24 24" fill={color} stroke="none">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      ))}
    </div>
  )
}

function Card({ review }: { review: typeof reviews[0] }) {
  const initial = review.name.charAt(0)
  const parts = review.name.split(' ')
  const first = parts[0]
  const last = parts.slice(1).join(' ')

  return (
    <div className="testimonial-card">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--taupe)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="testimonial-card__quote">
        <path d="M16 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z" />
        <path d="M5 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z" />
      </svg>
      <p className="testimonial-card__text">{review.text}</p>
      <div className="testimonial-card__footer">
        <div className="testimonial-card__avatar">{initial}</div>
        <div>
          <p className="testimonial-card__name">
            <strong>{first}</strong>{last ? <em> {last}</em> : null}
          </p>
          <div className="testimonial-card__rating">
            <Stars color="var(--bg)" />
            <span>on {review.source === 'booking' ? 'Booking.com' : review.source === 'google' ? 'google.com' : 'azzuravillas.gr'}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export function Testimonials() {
  return (
    <section className="testimonials" id="testimonials">
      <div className="testimonials__header reveal">
        <p className="section-label">Testimonials</p>
        <BlurRevealText text="Their Words" accentWord="Words" as="h2" className="testimonials__heading" />
        <div className="testimonials__badges">
          <div className="testimonials__rating-badge">
            <span className="testimonials__rating-score">9.0</span>
            <span className="testimonials__rating-label" style={{ color: 'var(--dark)', fontWeight: 700 }}>Superb</span>
            <span className="testimonials__rating-label">Booking.com</span>
          </div>
          <div className="testimonials__rating-badge">
            <span className="testimonials__rating-score">4.9</span>
            <Stars color="var(--dark)" />
            <span className="testimonials__rating-label">Google.com</span>
          </div>
        </div>
      </div>

      <div className="testimonials__tracks">
        <div className="testimonials__fade testimonials__fade--left" />
        <div className="testimonials__fade testimonials__fade--right" />

        <div className="testimonials__row testimonials__row--left">
          {[...reviews, ...reviews].map((r, i) => (
            <Card key={`a-${i}`} review={r} />
          ))}
        </div>
      </div>
    </section>
  )
}
