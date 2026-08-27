import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from 'react-leaflet';
import L from 'leaflet';
import { ProcurementCentre } from '../../types';
import { Clock, Users, Zap, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Fix leaflet icon default marker assets
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Custom colored SVG pin creators
const createCustomPin = (color: string, label: string, isRecommended: boolean) => {
  const html = `
    <div style="position: relative; display: flex; flex-direction: column; align-items: center; transform: translate(-50%, -100%);">
      ${isRecommended ? '<div style="background: #15803d; color: white; font-size: 10px; font-weight: 800; padding: 2px 6px; border-radius: 999px; white-space: nowrap; margin-bottom: 2px; box-shadow: 0 2px 4px rgba(0,0,0,0.2);">★ RECOMMENDED</div>' : ''}
      <div style="background-color: ${color}; width: 34px; height: 34px; border-radius: 50% 50% 50% 0; transform: rotate(-45deg); display: flex; align-items: center; justify-content: center; border: 2px solid white; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.3);">
        <span style="transform: rotate(45deg); color: white; font-size: 12px; font-weight: 800;">${label}</span>
      </div>
    </div>
  `;
  return L.divIcon({
    html,
    className: 'custom-leaflet-marker',
    iconSize: [34, 34],
    iconAnchor: [17, 34],
    popupAnchor: [0, -34],
  });
};

interface MapUpdaterProps {
  center: [number, number];
  zoom: number;
}

const MapUpdater: React.FC<MapUpdaterProps> = ({ center, zoom }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
};

interface CentresLeafletMapProps {
  centres: ProcurementCentre[];
  selectedCentreId?: string;
  onSelectCentre?: (centre: ProcurementCentre) => void;
  height?: string;
  userLocation?: [number, number]; // Mandya farm coordinate: [12.5220, 76.9000]
}

export const CentresLeafletMap: React.FC<CentresLeafletMapProps> = ({
  centres,
  selectedCentreId,
  onSelectCentre,
  height = '420px',
  userLocation = [12.5220, 76.9000],
}) => {
  const navigate = useNavigate();

  const getMarkerColor = (centre: ProcurementCentre) => {
    if (centre.status === 'DELAYED' || centre.capacityUtilizationPercent > 85) return '#dc2626'; // RED
    if (centre.status === 'MODERATE' || centre.capacityUtilizationPercent > 65) return '#f59e0b'; // YELLOW
    return '#16a34a'; // GREEN
  };

  const getMarkerLetter = (index: number) => String.fromCharCode(65 + index); // A, B, C, D

  return (
    <div style={{ height }} className="w-full relative rounded-xl overflow-hidden shadow-inner border border-slate-200">
      <MapContainer
        center={userLocation}
        zoom={11}
        scrollWheelZoom={false}
        className="h-full w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* User Farm Location Marker */}
        <Marker
          position={userLocation}
          icon={L.divIcon({
            html: `
              <div style="background-color: #0f172a; color: white; padding: 4px 8px; border-radius: 999px; font-size: 11px; font-weight: bold; border: 2px solid white; box-shadow: 0 2px 5px rgba(0,0,0,0.3); display: flex; align-items: center; gap: 4px; white-space: nowrap;">
                🏡 Your Farm (Keregodu)
              </div>
            `,
            className: 'user-farm-marker',
            iconAnchor: [50, 15],
          })}
        >
          <Popup>
            <div className="p-1 text-xs">
              <strong className="block text-slate-900 font-bold">Your Registered Farm</strong>
              <span className="text-slate-600">Keregodu, Mandya Taluk</span>
            </div>
          </Popup>
        </Marker>

        {/* 10km radius circle around farm */}
        <Circle
          center={userLocation}
          radius={12000}
          pathOptions={{
            color: '#10b981',
            fillColor: '#10b981',
            fillOpacity: 0.05,
            weight: 1,
            dashArray: '4 4',
          }}
        />

        {/* Centre Markers */}
        {centres.map((centre, index) => {
          const isSelected = selectedCentreId === centre.id;
          const letter = getMarkerLetter(index);
          const color = getMarkerColor(centre);
          const icon = createCustomPin(color, letter, !!centre.isRecommended);

          return (
            <Marker
              key={centre.id}
              position={[centre.latitude, centre.longitude]}
              icon={icon}
              eventHandlers={{
                click: () => onSelectCentre && onSelectCentre(centre),
              }}
            >
              <Popup className="kisanflow-popup">
                <div className="p-1 space-y-2 max-w-xs text-xs">
                  <div className="flex items-start justify-between gap-2 border-b border-slate-100 pb-1.5">
                    <div>
                      <span className="inline-block font-extrabold text-emerald-800 text-[11px] bg-emerald-50 px-1.5 py-0.5 rounded">
                        Centre {letter} • {centre.distanceKm} km away
                      </span>
                      <h4 className="font-bold text-slate-900 text-sm mt-0.5">{centre.name}</h4>
                    </div>
                  </div>

                  {centre.isRecommended && (
                    <div className="bg-emerald-50 text-emerald-900 p-2 rounded-lg border border-emerald-200">
                      <div className="font-bold text-xs flex items-center gap-1 text-emerald-800">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" /> Recommended For You
                      </div>
                      <p className="text-[11px] text-emerald-700 mt-0.5">
                        Lowest waiting time ({Math.floor(centre.averageWaitMinutes / 60)}h {centre.averageWaitMinutes % 60}m) & optimal capacity.
                      </p>
                    </div>
                  )}

                  {centre.delayMinutes > 0 && (
                    <div className="bg-amber-50 text-amber-900 p-1.5 rounded border border-amber-200 flex items-center gap-1.5 font-semibold text-[11px]">
                      <AlertTriangle className="h-3.5 w-3.5 text-amber-600 shrink-0" />
                      <span>{centre.delayMinutes}m delay recorded</span>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-1.5 text-[11px] pt-1">
                    <div className="bg-slate-50 p-1.5 rounded border border-slate-100">
                      <span className="text-slate-500 block">Queue Size</span>
                      <strong className="text-slate-900 font-bold">{centre.queueSize} farmers</strong>
                    </div>
                    <div className="bg-slate-50 p-1.5 rounded border border-slate-100">
                      <span className="text-slate-500 block">Est. Wait</span>
                      <strong className="text-slate-900 font-bold">{Math.floor(centre.averageWaitMinutes / 60)}h {centre.averageWaitMinutes % 60}m</strong>
                    </div>
                    <div className="bg-slate-50 p-1.5 rounded border border-slate-100">
                      <span className="text-slate-500 block">Capacity</span>
                      <strong className="text-slate-900 font-bold">{centre.capacityUtilizationPercent}% utilized</strong>
                    </div>
                    <div className="bg-slate-50 p-1.5 rounded border border-slate-100">
                      <span className="text-slate-500 block">Processing Rate</span>
                      <strong className="text-slate-900 font-bold">{centre.processingRatePerHour} / hr</strong>
                    </div>
                  </div>

                  <button
                    onClick={() => navigate(`/farmer/booking?centreId=${centre.id}`)}
                    className="w-full mt-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-1.5 px-3 rounded-lg flex items-center justify-center gap-1 text-xs transition"
                  >
                    <span>Select Arrival Window</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
};
