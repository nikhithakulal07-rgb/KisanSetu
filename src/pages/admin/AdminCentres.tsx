import React from 'react';
import { useCentres } from '../../hooks/useRealtimeData';
import { simulationApi } from '../../services/apiServices';
import {
  Building2,
  Scale,
  Users,
  Clock,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  RotateCcw,
  Sliders,
  CheckCircle2
} from 'lucide-react';

export const AdminCentres: React.FC = () => {
  const centres = useCentres();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1">
            <Building2 className="h-4 w-4" />
            <span>District APMC Infrastructure</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white font-display">
            Procurement Centres & Weighbridge Health
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Live telemetry of all Mandya District procurement yards, weighing stations, and load balance status.
          </p>
        </div>

        <button
          onClick={() => simulationApi.resetSimulation()}
          className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-bold px-3.5 py-2 rounded-xl flex items-center gap-1.5 transition"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          <span>Reset Overrides</span>
        </button>
      </div>

      {/* Centre Cards Table */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {centres.map((centre) => {
          const isCritical = centre.capacityUtilizationPercent > 85 || centre.status === 'DELAYED';

          return (
            <div
              key={centre.id}
              className="bg-slate-800 p-5 rounded-3xl border border-slate-700 space-y-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <span className="text-[10px] font-extrabold text-emerald-400 uppercase tracking-wider">
                    {centre.code} • Mandya APMC Circle
                  </span>
                  <h3 className="text-lg font-black text-white mt-0.5">{centre.name}</h3>
                  <p className="text-xs text-slate-400">{centre.address}</p>
                </div>

                <span className={`text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-lg border ${
                  isCritical
                    ? 'bg-rose-950 text-rose-300 border-rose-700'
                    : 'bg-emerald-950 text-emerald-300 border-emerald-700'
                }`}>
                  {centre.status}
                </span>
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                <div className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-750">
                  <span className="text-slate-400 text-[10px] block">Queue Size</span>
                  <strong className="text-white font-bold">{centre.queueSize} farmers</strong>
                </div>
                <div className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-750">
                  <span className="text-slate-400 text-[10px] block">Avg Wait</span>
                  <strong className="text-white font-bold">{centre.averageWaitMinutes} mins</strong>
                </div>
                <div className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-750">
                  <span className="text-slate-400 text-[10px] block">Scales</span>
                  <strong className="text-white font-bold">{centre.activeWeighingStations}/{centre.totalWeighingStations} Active</strong>
                </div>
                <div className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-750">
                  <span className="text-slate-400 text-[10px] block">Storage</span>
                  <strong className="text-white font-bold">{centre.capacityUtilizationPercent}%</strong>
                </div>
              </div>

              {/* Progress Bar for Storage */}
              <div>
                <div className="flex justify-between text-[11px] text-slate-400 mb-1">
                  <span>Storage Capacity ({centre.currentCapacityUsedQuintals} / {centre.capacityQuintalsPerDay} Qtl)</span>
                  <span>{centre.capacityUtilizationPercent}%</span>
                </div>
                <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      centre.capacityUtilizationPercent > 85 ? 'bg-rose-500' : 'bg-emerald-500'
                    }`}
                    style={{ width: `${centre.capacityUtilizationPercent}%` }}
                  ></div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-700/60 text-xs">
                <span className="text-slate-400">Rate: {centre.processingRatePerHour} farmers/hr</span>
                <button
                  onClick={() => simulationApi.injectCentreSlowdown(30)}
                  className="text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1"
                >
                  <Sliders className="h-3.5 w-3.5" />
                  <span>Adjust Capacity Quota</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
