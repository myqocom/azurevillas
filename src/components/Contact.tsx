import { MapPin, Phone, Mail } from 'lucide-react';

export default function Contact() {
  return (
    <section id="contact" className="py-20 md:py-32 bg-azure-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-center mb-16">
          Contact Us
        </h2>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-4">
              <MapPin className="text-azure-300" size={28} />
            </div>
            <h3 className="text-lg font-medium mb-2">Location</h3>
            <p className="text-azure-200">
              Katouna, 31100<br />
              Lefkada, Greece
            </p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-4">
              <Phone className="text-azure-300" size={28} />
            </div>
            <h3 className="text-lg font-medium mb-2">Phone</h3>
            <a
              href="tel:+306997273882"
              className="text-azure-200 hover:text-white transition-colors"
            >
              (+30) 699 727 3882
            </a>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-4">
              <Mail className="text-azure-300" size={28} />
            </div>
            <h3 className="text-lg font-medium mb-2">Email</h3>
            <a
              href="mailto:info@azzuravillas.gr"
              className="text-azure-200 hover:text-white transition-colors"
            >
              info@azzuravillas.gr
            </a>
          </div>
        </div>

        <div className="mt-16 text-center">
          <p className="text-azure-300 text-sm">
            We look forward to welcoming you to Azzura Villas
          </p>
        </div>
      </div>
    </section>
  );
}
