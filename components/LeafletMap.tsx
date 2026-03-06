'use client'

import { useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

const LAT = 38.6328
const LNG = 20.5889

export default function LeafletMap() {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<L.Map | null>(null)

  const handleGetDirections = () => {
    window.open(`https://maps.google.com/maps?q=${LAT},${LNG}&t=m&z=16`, '_blank')
  }

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return

    const map = L.map(mapRef.current, {
      center: [LAT, LNG],
      zoom: 14,
      zoomControl: false,
      attributionControl: false,
      scrollWheelZoom: false,
      dragging: false,
      touchZoom: false,
      doubleClickZoom: false,
    })

    mapInstanceRef.current = map

    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      maxZoom: 19,
      subdomains: 'abcd',
    }).addTo(map)

    const customIcon = L.divIcon({
      className: 'azzura-map-marker',
      html: `
        <div class="azzura-marker-bounce">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="#170f0b"/>
            <circle cx="12" cy="9" r="2.5" fill="#ede9e4"/>
          </svg>
        </div>
      `,
      iconSize: [48, 48],
      iconAnchor: [24, 48],
    })

    const marker = L.marker([LAT, LNG], {
      icon: customIcon,
      alt: 'Azzura Villas location',
      title: 'Azzura Villas, Vasiliki, Lefkada',
    }).addTo(map)

    marker.on('click', handleGetDirections)

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
    }
  }, [])

  return (
    <>
      <style jsx global>{`
        .azzura-map-marker {
          background: transparent !important;
          border: none !important;
        }
        .azzura-marker-bounce {
          animation: marker-bounce 1s infinite;
          cursor: pointer;
        }
        @keyframes marker-bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
      <div
        ref={mapRef}
        style={{ width: '100%', height: '100%', minHeight: '400px', borderRadius: '16px' }}
      />
    </>
  )
}
