import {
  Waves,
  Wind,
  Flame,
  Car,
  Snowflake,
  Tv,
  Wifi,
  UtensilsCrossed,
  WashingMachine,
  Bath,
} from 'lucide-react';

const outdoorAmenities = [
  { icon: Waves, label: 'Glass Walled Balcony' },
  { icon: Waves, label: 'Private Pool (5.5 x 11m)' },
  { icon: Bath, label: 'Outdoor Jacuzzi' },
  { icon: Flame, label: 'Barbecue' },
  { icon: Car, label: 'Private Parking' },
];

const generalAmenities = [
  { icon: Snowflake, label: 'Air Conditioning / Heating' },
  { icon: Flame, label: 'Fireplace' },
  { icon: Bath, label: 'En Suite Jacuzzi' },
  { icon: UtensilsCrossed, label: 'Fully Equipped Kitchen' },
  { icon: WashingMachine, label: 'Washing Machine' },
  { icon: Tv, label: 'TV' },
  { icon: Wifi, label: 'Wi-Fi Internet' },
];

const villaSpecs = [
  {
    name: 'Azzura Villa I',
    specs: [
      'Accommodates: 6 persons',
      'Bedrooms: 2',
      'Master room: 1',
      'Super King Size Double Beds',
      'Flexible double/twins bedroom',
      'En suite bathrooms: 3',
      'Guest toilet',
      'Walk-in closet',
    ],
  },
  {
    name: 'Azzura Villa II',
    specs: [
      'Accommodates: 8 persons',
      'Bedrooms: 4',
      'Master rooms: 4',
      'Super King Size Double Beds',
      'Flexible double/twins bedroom',
      'En suite bathrooms: 4',
      'Guest toilet',
      'Walk-in closet',
    ],
  },
];

export default function Amenities() {
  return (
    <section id="amenities" className="py-20 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-center text-gray-800 mb-16">
          Amenities
        </h2>

        {/* Villa Specifications */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {villaSpecs.map((villa) => (
            <div
              key={villa.name}
              className="bg-sand-50 rounded-2xl p-8 shadow-sm"
            >
              <h3 className="text-2xl font-serif text-azure-700 mb-6">
                {villa.name}
              </h3>
              <ul className="space-y-3">
                {villa.specs.map((spec, index) => (
                  <li key={index} className="text-gray-600 flex items-center">
                    <span className="w-2 h-2 bg-azure-400 rounded-full mr-3" />
                    {spec}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Outdoor Amenities */}
        <div className="mb-16">
          <h3 className="text-2xl font-serif text-gray-800 text-center mb-8">
            Outdoor
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {outdoorAmenities.map((amenity, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center p-4"
              >
                <div className="w-16 h-16 bg-azure-100 rounded-full flex items-center justify-center mb-4">
                  <amenity.icon className="text-azure-600" size={28} />
                </div>
                <span className="text-sm text-gray-600">{amenity.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* General Amenities */}
        <div>
          <h3 className="text-2xl font-serif text-gray-800 text-center mb-8">
            General
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-6">
            {generalAmenities.map((amenity, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center p-4"
              >
                <div className="w-16 h-16 bg-sand-100 rounded-full flex items-center justify-center mb-4">
                  <amenity.icon className="text-sand-600" size={28} />
                </div>
                <span className="text-sm text-gray-600">{amenity.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
