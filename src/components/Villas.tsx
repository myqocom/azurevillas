'use client';

import { useState } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface Villa {
  name: string;
  description: string;
  images: { url: string; alt: string }[];
}

const villas: Villa[] = [
  {
    name: 'Azzura Villa I',
    description: 'A stunning contemporary villa with panoramic sea views, private infinity pool, and luxurious interiors.',
    images: [
      { url: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80', alt: 'Azzura Villa I exterior' },
      { url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80', alt: 'Azzura Villa I pool' },
      { url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80', alt: 'Azzura Villa I interior' },
      { url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80', alt: 'Azzura Villa I bedroom' },
      { url: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80', alt: 'Azzura Villa I living room' },
      { url: 'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=800&q=80', alt: 'Azzura Villa I kitchen' },
    ],
  },
  {
    name: 'Azzura Villa II',
    description: 'An elegant retreat featuring modern architecture, breathtaking mountain views, and premium amenities.',
    images: [
      { url: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&q=80', alt: 'Azzura Villa II exterior' },
      { url: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80', alt: 'Azzura Villa II pool' },
      { url: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&q=80', alt: 'Azzura Villa II interior' },
      { url: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80', alt: 'Azzura Villa II bedroom' },
      { url: 'https://images.unsplash.com/photo-1600121848594-d8644e57abab?w=800&q=80', alt: 'Azzura Villa II living' },
      { url: 'https://images.unsplash.com/photo-1600489000022-c2086d79f9d4?w=800&q=80', alt: 'Azzura Villa II terrace' },
    ],
  },
  {
    name: 'Azzura Villa III',
    description: 'A spacious family villa surrounded by olive groves, offering privacy, comfort, and stunning sunsets.',
    images: [
      { url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80', alt: 'Azzura Villa III exterior' },
      { url: 'https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=800&q=80', alt: 'Azzura Villa III pool' },
      { url: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&q=80', alt: 'Azzura Villa III interior' },
      { url: 'https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?w=800&q=80', alt: 'Azzura Villa III bedroom' },
      { url: 'https://images.unsplash.com/photo-1600573472591-ee6c563aaec2?w=800&q=80', alt: 'Azzura Villa III dining' },
      { url: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&q=80', alt: 'Azzura Villa III bathroom' },
    ],
  },
];

export default function Villas() {
  const [lightbox, setLightbox] = useState<{ villaIndex: number; imageIndex: number } | null>(null);

  const openLightbox = (villaIndex: number, imageIndex: number) => {
    setLightbox({ villaIndex, imageIndex });
  };

  const closeLightbox = () => {
    setLightbox(null);
  };

  const prevImage = () => {
    if (!lightbox) return;
    const villa = villas[lightbox.villaIndex];
    const newIndex = (lightbox.imageIndex - 1 + villa.images.length) % villa.images.length;
    setLightbox({ ...lightbox, imageIndex: newIndex });
  };

  const nextImage = () => {
    if (!lightbox) return;
    const villa = villas[lightbox.villaIndex];
    const newIndex = (lightbox.imageIndex + 1) % villa.images.length;
    setLightbox({ ...lightbox, imageIndex: newIndex });
  };

  return (
    <section id="villas" className="py-20 md:py-32 bg-sand-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-center text-gray-800 mb-16">
          Our Villas
        </h2>

        {villas.map((villa, villaIndex) => (
          <div key={villa.name} className="mb-20 last:mb-0">
            <h3 className="text-2xl md:text-3xl font-serif text-azure-700 mb-8 text-center">
              {villa.name}
            </h3>
            <p className="text-gray-600 text-center max-w-2xl mx-auto mb-8">
              {villa.description}
            </p>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {villa.images.map((image, imageIndex) => (
                <div
                  key={imageIndex}
                  className="villa-card relative aspect-square overflow-hidden rounded-lg cursor-pointer group"
                  onClick={() => openLightbox(villaIndex, imageIndex)}
                >
                  <Image
                    src={image.url}
                    alt={image.alt}
                    fill
                    className="object-cover transition-transform duration-500"
                  />
                  <div className="villa-overlay absolute inset-0 bg-black/30 opacity-0 transition-opacity duration-300 flex items-center justify-center">
                    <span className="text-white text-sm font-medium">View</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
          onClick={closeLightbox}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              closeLightbox();
            }}
            className="absolute top-4 right-4 p-2 text-white hover:text-gray-300 transition-colors"
            aria-label="Close lightbox"
          >
            <X size={32} />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              prevImage();
            }}
            className="absolute left-4 p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
            aria-label="Previous image"
          >
            <ChevronLeft className="text-white" size={32} />
          </button>

          <div className="relative w-full max-w-4xl h-[80vh] mx-4" onClick={(e) => e.stopPropagation()}>
            <Image
              src={villas[lightbox.villaIndex].images[lightbox.imageIndex].url}
              alt={villas[lightbox.villaIndex].images[lightbox.imageIndex].alt}
              fill
              className="object-contain"
            />
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              nextImage();
            }}
            className="absolute right-4 p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
            aria-label="Next image"
          >
            <ChevronRight className="text-white" size={32} />
          </button>

          <div className="absolute bottom-4 text-white text-sm">
            {lightbox.imageIndex + 1} / {villas[lightbox.villaIndex].images.length}
          </div>
        </div>
      )}
    </section>
  );
}
