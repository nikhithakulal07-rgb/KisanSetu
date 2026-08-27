import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCentres } from '../../hooks/useRealtimeData';
import { useTranslation } from '../../i18n/I18nContext';
import { CentresLeafletMap } from '../../components/map/CentresLeafletMap';
import { ProcurementCentre } from '../../types';
import {
  MapPin,
  Clock,
  Users,
  ShieldCheck,
  AlertTriangle,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Gauge,
  Layers,
  ChevronRight
} from 'lucide-react';

export const FarmerCentres: React.FC = () => {
  const centres = useCentres();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [selectedCentreId, setSelectedCentreId] = useState<string>(centres.find((c) => c.isRecommended)?.id || centres[0].id);

  const selectedCentre = centres.find((c) => c.id === selectedCentreId) || centres[0];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 uppercase tracking-wider mb-1">
          <MapPin className="h-4 w-4" />
          <span>Procurement Centre Discovery</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
          Nearby Procurement Centres & Live Load
        </h1>
        <p className="text-sm text-slate-600 mt-1 max-w-2xl">
          Compare real-time queue loads, waiting times, and capacity. KisanSetu recommends the best centre to minimize idle road queueing.
        </p>
      </div>

      {/* Interactive Map Section */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-bold text-slate-800">Geospatial Centre Map & Congestion Radius</h2>
            <span className="text-[11px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
              Live OpenStreetMap
            </span>
          </div>

          {/* Legend */}
          <div className="flex items-center gap-3 text-xs">
            <span className="flex items-center gap-1">
              <span className="h-3 w-3 rounded-full bg-emerald-600"></span> Optimal (&lt; 65%)
            </span>
            <span className="flex items-center gap-1">
              <span className="h-3 w-3 rounded-full bg-amber-500"></span> Moderate (65-85%)
            </span>
            <span className="flex items-center gap-1">
              <span className="h-3 w-3 rounded-full bg-rose-600"></span> Congested (&gt; 85%)
            </span>
          </div>
        </div>

        <CentresLeafletMap
          centres={centres}
          selectedCentreId={selectedCentreId}
          onSelectCentre={(centre) => setSelectedCentreId(centre.id)}
          height="380px"
        />
      </div>

      {/* Recommended Centre Hero Card with "WHY" Explanation */}
      {centres.filter((c) => c.isRecommended).map((recCentre) => (
        <div
          key={recCentre.id}
          className="rounded-2xl border-2 border-emerald-500 bg-gradient-to-br from-emerald-50 via-white to-green-50/40 p-6 shadow-md relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 bg-emerald-600 text-white font-extrabold text-xs px-4 py-1.5 rounded-bl-xl shadow-sm flex items-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5" />
            <span>{t.recommendedForYou}</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <div>
                <span className="text-xs font-extrabold text-emerald-800 uppercase tracking-wide">
                  Top Recommended Procurement Centre
                </span>
                <h3 className="text-2xl font-black text-slate-900 mt-0.5">
                  {recCentre.name} ({recCentre.code})
                </h3>
                <p className="text-xs text-slate-600 mt-1 flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5 text-emerald-700" />
                  <span>{recCentre.address} • <strong>{recCentre.distanceKm} km</strong> from your farm in Keregodu</span>
                </p>
              </div>

              {/* Clear WHY Breakdown (Not unexplained AI) */}
              <div className="bg-white/90 p-4 rounded-xl border border-emerald-200">
                <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-900 flex items-center gap-1.5 mb-2">
                  <ShieldCheck className="h-4 w-4 text-emerald-700" />
                  <span>Why KisanSetu recommends this centre:</span>
                </h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                  {recCentre.recommendationReasons?.map((reason, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="font-semibold text-slate-800">{reason}</span>
                    </li>
                  )) || (
                    <>
                      <li className="flex items-center gap-2 font-medium">
                        <CheckCircle2 className="h-4 w-4 text-emerald-600" /> Lowest expected waiting time (1h 40m vs 4h)
                      </li>
                      <li className="flex items-center gap-2 font-medium">
                        <CheckCircle2 className="h-4 w-4 text-emerald-600" /> Available capacity (61% utilized vs 92%)
                      </li>
                      <li className="flex items-center gap-2 font-medium">
                        <CheckCircle2 className="h-4 w-4 text-emerald-600" /> High slot availability in next 2 hours
                      </li>
                      <li className="flex items-center gap-2 font-medium">
                        <CheckCircle2 className="h-4 w-4 text-emerald-600" /> Acceptable distance (11.4 km)
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>

            {/* Quick Metrics & CTA */}
            <div className="bg-white p-5 rounded-xl border border-emerald-200 shadow-sm flex flex-col justify-between shrink-0 lg:w-72">
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <span className="text-xs text-slate-500">Live Queue:</span>
                  <strong className="text-sm font-bold text-slate-900">{recCentre.queueSize} farmers</strong>
                </div>
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <span className="text-xs text-slate-500">Est. Wait:</span>
                  <strong className="text-sm font-bold text-emerald-700">
                    {Math.floor(recCentre.averageWaitMinutes / 60)}h {recCentre.averageWaitMinutes % 60}m
                  </strong>
                </div>
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <span className="text-xs text-slate-500">Storage Load:</span>
                  <strong className="text-sm font-bold text-slate-900">{recCentre.capacityUtilizationPercent}%</strong>
                </div>
              </div>

              <button
                onClick={() => navigate(`/farmer/booking?centreId=${recCentre.id}`)}
                className="mt-4 w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 shadow-md transition"
              >
                <span>Select Dynamic Slot</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* Detailed Centre Cards Comparison Grid */}
      <div className="space-y-3">
        <h3 className="text-lg font-bold text-slate-900">All Available Procurement Centres ({centres.length})</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {centres.map((centre, index) => {
            const isRec = !!centre.isRecommended;
            const isDelayed = centre.delayMinutes > 0;
            const letter = String.fromCharCode(65 + index);

            return (
              <div
                key={centre.id}
                onClick={() => setSelectedCentreId(centre.id)}
                className={`cursor-pointer rounded-2xl p-5 border transition-all duration-200 ${
                  selectedCentreId === centre.id
                    ? 'border-emerald-600 bg-white shadow-md ring-2 ring-emerald-500/20'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="h-6 w-6 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs font-extrabold">
                        {letter}
                      </span>
                      <h4 className="font-extrabold text-slate-900 text-base">{centre.name}</h4>
                    </div>
                    <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      <span>{centre.district} • <strong>{centre.distanceKm} km</strong></span>
                    </p>
                  </div>

                  <div className="text-right">
                    <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md ${
                      centre.status === 'CONGESTED' || centre.capacityUtilizationPercent > 85
                        ? 'bg-rose-100 text-rose-800'
                        : centre.status === 'MODERATE'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-emerald-100 text-emerald-800'
                    }`}>
                      {centre.status}
                    </span>
                    {isRec && (
                      <span className="block text-[10px] text-emerald-700 font-bold mt-1">
                        ★ Recommended
                      </span>
                    )}
                  </div>
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-slate-100 text-xs">
                  <div className="bg-slate-50 p-2 rounded-lg text-center">
                    <span className="text-slate-500 text-[10px] block">Queue Size</span>
                    <strong className="text-slate-900 font-extrabold text-sm">{centre.queueSize}</strong>
                    <span className="text-[9px] text-slate-400 block">farmers</span>
                  </div>

                  <div className="bg-slate-50 p-2 rounded-lg text-center">
                    <span className="text-slate-500 text-[10px] block">Est. Wait</span>
                    <strong className="text-slate-900 font-extrabold text-sm">
                      {Math.floor(centre.averageWaitMinutes / 60)}h {centre.averageWaitMinutes % 60}m
                    </strong>
                    <span className="text-[9px] text-slate-400 block">predictive</span>
                  </div>

                  <div className="bg-slate-50 p-2 rounded-lg text-center">
                    <span className="text-slate-500 text-[10px] block">Capacity</span>
                    <strong className="text-slate-900 font-extrabold text-sm">{centre.capacityUtilizationPercent}%</strong>
                    <span className="text-[9px] text-slate-400 block">{centre.activeWeighingStations}/{centre.totalWeighingStations} scales</span>
                  </div>
                </div>

                {isDelayed && (
                  <div className="mt-3 bg-amber-50 text-amber-900 text-xs p-2 rounded-lg border border-amber-200 flex items-center gap-1.5 font-semibold">
                    <AlertTriangle className="h-4 w-4 text-amber-600 shrink-0" />
                    <span>{centre.delayMinutes}-minute delay recorded at weighing bridge.</span>
                  </div>
                )}

                <div className="mt-4 flex items-center justify-between pt-2">
                  <span className="text-xs text-slate-500 font-medium">
                    Rate: <strong>{centre.processingRatePerHour} farmers/hr</strong>
                  </span>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/farmer/booking?centreId=${centre.id}`);
                    }}
                    className="bg-slate-900 hover:bg-emerald-600 text-white text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1 transition"
                  >
                    <span>Book Window</span>
                    <ChevronRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
