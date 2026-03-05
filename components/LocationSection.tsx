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

          <div className="location__nearby">
            <div className="location__nearby-group">
              <p className="location__nearby-label">Beaches</p>
              <ul className="location__nearby-list">
                <li>Vasiliki Beach <span>1 km</span></li>
                <li>Agiofili Beach <span>5 km</span></li>
                <li>Kastri Beach <span>6 km</span></li>
                <li>Egremni Beach <span>9 km</span></li>
              </ul>
            </div>
            <div className="location__nearby-group">
              <p className="location__nearby-label">Eat &amp; Drink</p>
              <ul className="location__nearby-list">
                <li>Garden Cafe-Cocktail Bar <span>2.7 km</span></li>
                <li>The Old Plane Tree <span>4.7 km</span></li>
                <li>Sesoula Taverna <span>10 km</span></li>
              </ul>
            </div>
            <div className="location__nearby-group">
              <p className="location__nearby-label">Airport</p>
              <ul className="location__nearby-list">
                <li>Aktion Airport (PVK) <span>56 km</span></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="location__map reveal reveal-d1">
          <iframe
            src="https://maps.google.com/maps?q=Vasiliki,+Lefkada,+Greece&t=&z=14&ie=UTF8&iwloc=&output=embed"
            title="Azzura Villas location, Vasiliki, Lefkada, Greece"
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
