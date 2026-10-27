import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Eye } from 'lucide-react';
import { Site } from '../types';
import { ConservationBadge } from './ConservationBadge';

interface Props {
  sites: Site[];
  selectedSite?: Site | null;
  onSelectSite?: (site: Site) => void;
  center?: [number, number];
  zoom?: number;
  height?: string;
  interactive?: boolean;
}

// Custom category-colored SVG pin icons
const createCustomIcon = (category: string, isSelected: boolean = false) => {
  let color = '#C65D3B'; // terracotta default
  if (category === 'temple') color = '#E9A23B'; // saffron
  else if (category === 'fort') color = '#1B1F3B'; // deep indigo
  else if (category === 'monument') color = '#C65D3B'; // terracotta
  else if (category === 'natural') color = '#5B6B3A'; // olive
  else if (category === 'museum') color = '#8A5A36';

  const size = isSelected ? 42 : 34;

  const svgIcon = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 36" width="${size}" height="${size * 1.5}">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 9 12 24 12 24s12-15 12-24c0-6.63-5.37-12-12-12z" fill="${color}" stroke="#FFFFFF" stroke-width="2"/>
      <circle cx="12" cy="11" r="5" fill="#FFFFFF"/>
      <circle cx="12" cy="11" r="2.5" fill="${color}"/>
    </svg>
  `;

  return L.divIcon({
    html: svgIcon,
    className: 'custom-heritage-pin',
    iconSize: [size, size * 1.5],
    iconAnchor: [size / 2, size * 1.5],
    popupAnchor: [0, -size * 1.3]
  });
};

// Component to dynamically re-center map when selection changes
const MapRecenter: React.FC<{ center: [number, number]; zoom: number }> = ({ center, zoom }) => {
  const map = useMap();
  useEffect(() => {
    map.flyTo(center, zoom, { duration: 1.2 });
  }, [center, zoom, map]);
  return null;
};

export const MapView: React.FC<Props> = ({
  sites,
  selectedSite,
  onSelectSite,
  center = [21.5, 78.9], // Default center over India
  zoom = 5,
  height = '500px',
  interactive = true
}) => {
  const currentCenter: [number, number] = selectedSite
    ? [selectedSite.latitude, selectedSite.longitude]
    : center;

  const currentZoom = selectedSite ? 9 : zoom;

  return (
    <div style={{ height }} className="w-full rounded-2xl overflow-hidden shadow-warm border border-parchment-border dark:border-night-border relative">
      <MapContainer
        center={currentCenter}
        zoom={currentZoom}
        scrollWheelZoom={interactive}
        dragging={interactive}
        touchZoom={interactive}
        doubleClickZoom={interactive}
        className="w-full h-full"
      >
        <MapRecenter center={currentCenter} zoom={currentZoom} />

        {/* Standard OpenStreetMap tiles (No API key required) */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {sites.map(site => {
          const isSelected = selectedSite?.id === site.id;
          return (
            <Marker
              key={site.id}
              position={[site.latitude, site.longitude]}
              icon={createCustomIcon(site.category, isSelected)}
              eventHandlers={{
                click: () => {
                  if (onSelectSite) onSelectSite(site);
                }
              }}
            >
              <Popup className="heritage-popup">
                <div className="w-56 p-1">
                  <div className="relative h-28 rounded-lg overflow-hidden mb-2">
                    <img src={site.coverImage} alt={site.name} className="w-full h-full object-cover" />
                    <div className="absolute top-1.5 left-1.5">
                      <span className="px-2 py-0.5 text-[10px] uppercase font-bold tracking-wider rounded-md bg-black/70 text-white">
                        {site.category}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-1">
                    <ConservationBadge status={site.conservationStatus} size="sm" />
                    <span className="text-[10px] text-ink/50 dark:text-stone-400 font-medium">{site.era} Era</span>
                  </div>

                  <h4 className="font-serif text-sm font-bold text-ink leading-snug line-clamp-1 mb-1">
                    {site.name}
                  </h4>

                  <p className="text-[11px] text-ink/70 line-clamp-2 mb-2 leading-relaxed">
                    {site.shortDescription}
                  </p>

                  <div className="flex items-center justify-between pt-1 border-t border-stone-200">
                    <span className="text-[10px] text-stone-500 flex items-center gap-0.5">
                      <MapPin className="w-3 h-3 text-terracotta" /> {site.district}
                    </span>
                    <Link
                      to={`/sites/${site.slug}`}
                      className="text-xs font-semibold text-terracotta hover:underline flex items-center gap-1"
                    >
                      Explore <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
};
