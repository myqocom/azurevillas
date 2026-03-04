export function LocationSection() {
  return (
    <section className="location" id="location">
      <div className="location__inner">
        <div className="reveal">
          <p className="section-label">Lefkada, Greece</p>
          <h2 className="location__heading">Location</h2>
          <p className="location__text">
            Azzura Villas sits above Vasiliki Bay on the southern tip of Lefkada,
            one of the most sought-after corners of the Ionian Islands. Vasiliki
            Beach is a 12-minute walk (1 km). Vasiliki Port is 4.2 km away. The
            famous Agiofili Beach is 5 km south, and Aktion National Airport is
            56 km by car.
          </p>
        </div>

        <div className="location__map reveal reveal-d1">
          <iframe
            src="https://maps.google.com/maps?q=Vasiliki,+Lefkada,+Greece&t=&z=14&ie=UTF8&iwloc=&output=embed"
            title="Azzura Villas location — Vasiliki, Lefkada, Greece"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
          <div className="location__map-overlay">
            <a
              href="https://www.google.com/maps/dir/?api=1&destination=Vasiliki,+Lefkada,+Greece"
              target="_blank"
              rel="noopener"
              className="location__map-btn"
            >
              Vasiliki, Lefkada, Greece
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
