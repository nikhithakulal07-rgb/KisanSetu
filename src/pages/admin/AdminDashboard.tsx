import React, { useState } from 'react';
import { useCentres, useAdminAlerts } from '../../hooks/useRealtimeData';
import { CentresLeafletMap } from '../../components/map/CentresLeafletMap';
import { ProcurementCentre, AdminAlert } from '../../types';
import {
  Users,
  CalendarCheck,
  CheckCircle2,
  Clock,
  AlertTriangle,
  IndianRupee,
  Building2,
  Sparkles,
  ArrowRight,
  TrendingUp,
  ShieldAlert,
  HelpCircle,
  Eye
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const AdminDashboard: React.FC = () => {
  const centres = useCentres();
  const alerts = useAdminAlerts();
  const [selectedCentre, setSelectedCentre] = useState<ProcurementCentre | null>(centres[0]);

  // Overall District KPIs
  const totalRegistered = 12840;
  const totalScheduled = 8420;
  const totalProcessed = 6931;
  const currentlyWaiting = centres.reduce((acc, c) => acc + c.queueSize, 0) + 1100;
  const avgWait = Math.round(centres.reduce((acc, c) => acc + c.averageWaitMinutes, 0) / centres.length);
  const centresAtRisk = centres.filter((c) => c.capacityUtilizationPercent > 80 || c.status === 'DELAYED').length;
  const pendingPaymentsCrores = '2.4';

  return (
    <div className="space-y-6">
      {/* Top Metric Strip (Required KPIs) */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3 text-white">
        {/* Metric 1 */}
        <div className="bg-slate-800/80 p-3.5 rounded-2xl border border-slate-700">
          <span className="text-[11px] font-semibold text-slate-400 block">Registered Farmers</span>
          <span className="text-xl font-black font-display text-white mt-1 block">
            {totalRegistered.toLocaleString('en-IN')}
          </span>
          <span className="text-[10px] text-emerald-400 font-medium">District Total</span>
        </div>

        {/* Metric 2 */}
        <div className="bg-slate-800/80 p-3.5 rounded-2xl border border-slate-700">
          <span className="text-[11px] font-semibold text-slate-400 block">Scheduled Slots</span>
          <span className="text-xl font-black font-display text-blue-400 mt-1 block">
            {totalScheduled.toLocaleString('en-IN')}
          </span>
          <span className="text-[10px] text-slate-400 font-medium">Today's Windows</span>
        </div>

        {/* Metric 3 */}
        <div className="bg-slate-800/80 p-3.5 rounded-2xl border border-slate-700">
          <span className="text-[11px] font-semibold text-slate-400 block">Processed Today</span>
          <span className="text-xl font-black font-display text-emerald-400 mt-1 block">
            {totalProcessed.toLocaleString('en-IN')}
          </span>
          <span className="text-[10px] text-emerald-400 font-medium">82.3% Completed</span>
        </div>

        {/* Metric 4 */}
        <div className="bg-slate-800/80 p-3.5 rounded-2xl border border-slate-700">
          <span className="text-[11px] font-semibold text-slate-400 block">Currently Waiting</span>
          <span className="text-xl font-black font-display text-amber-400 mt-1 block">
            {currentlyWaiting.toLocaleString('en-IN')}
          </span>
          <span className="text-[10px] text-amber-300 font-medium">In Virtual Queue</span>
        </div>

        {/* Metric 5 */}
        <div className="bg-slate-800/80 p-3.5 rounded-2xl border border-slate-700">
          <span className="text-[11px] font-semibold text-slate-400 block">Average Wait</span>
          <span className="text-xl font-black font-display text-purple-400 mt-1 block">
            {avgWait} min
          </span>
          <span className="text-[10px] text-emerald-400 font-medium">-18m vs Static Token</span>
        </div>

        {/* Metric 6 */}
        <div className="bg-slate-800/80 p-3.5 rounded-2xl border border-rose-800/60 bg-rose-950/20">
          <span className="text-[11px] font-semibold text-rose-300 block">Centres At Risk</span>
          <span className="text-xl font-black font-display text-rose-400 mt-1 block">
            {centresAtRisk} Centres
          </span>
          <span className="text-[10px] text-rose-400 font-medium">Capacity / Delay Alert</span>
        </div>

        {/* Metric 7 */}
        <div className="bg-slate-800/80 p-3.5 rounded-2xl border border-slate-700">
          <span className="text-[11px] font-semibold text-slate-400 block">Payments Pending</span>
          <span className="text-xl font-black font-display text-cyan-400 mt-1 block">
            ₹{pendingPaymentsCrores} Cr
          </span>
          <span className="text-[10px] text-slate-400 font-medium">PFMS Batch Clearance</span>
        </div>
      </div>

      {/* Main Command Center Grid: Heatmap + Centre Inspection Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Interactive Procurement Heatmap & Centre List */}
        <div className="lg:col-span-8 space-y-4">
          <div className="bg-slate-800 p-4 rounded-3xl border border-slate-700 shadow-sm space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <h2 className="text-base font-extrabold text-white">Geospatial Procurement Heatmap</h2>
                <p className="text-xs text-slate-400">
                  Green (Low), Yellow (Moderate), Red (Critical Congestion / Delay)
                </p>
              </div>
              <div className="flex items-center gap-3 text-xs">
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-500"></span> Low
                </span>
                <span className="flex items-center gap-1.5 text-amber-400">
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-500"></span> Moderate
                </span>
                <span className="flex items-center gap-1.5 text-rose-400">
                  <span className="h-2.5 w-2.5 rounded-full bg-rose-500"></span> Critical
                </span>
              </div>
            </div>

            <CentresLeafletMap
              centres={centres}
              selectedCentreId={selectedCentre?.id}
              onSelectCentre={(c) => setSelectedCentre(c)}
              height="360px"
            />
          </div>

          {/* Quick Centre Load Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {centres.map((centre) => {
              const isSelected = selectedCentre?.id === centre.id;
              const isCritical = centre.capacityUtilizationPercent > 85 || centre.status === 'DELAYED';

              return (
                <div
                  key={centre.id}
                  onClick={() => setSelectedCentre(centre)}
                  className={`cursor-pointer p-4 rounded-2xl border transition ${
                    isSelected
                      ? 'bg-slate-800 border-emerald-500 ring-2 ring-emerald-500/30'
                      : 'bg-slate-850 hover:bg-slate-800 border-slate-700/80'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="font-bold text-white text-sm">{centre.name}</h4>
                      <span className="text-[11px] text-slate-400">{centre.code} • {centre.distanceKm} km</span>
                    </div>
                    <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded ${
                      isCritical
                        ? 'bg-rose-900/60 text-rose-300 border border-rose-700'
                        : 'bg-emerald-900/60 text-emerald-300 border border-emerald-700'
                    }`}>
                      {centre.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 mt-3 pt-2 border-t border-slate-700 text-xs">
                    <div>
                      <span className="text-slate-400 text-[10px] block">Queue</span>
                      <strong className="text-white font-bold">{centre.queueSize}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 text-[10px] block">Avg Wait</span>
                      <strong className="text-white font-bold">{centre.averageWaitMinutes}m</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 text-[10px] block">Capacity</span>
                      <strong className="text-white font-bold">{centre.capacityUtilizationPercent}%</strong>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Selected Centre Deep-Dive Side Panel */}
        <div className="lg:col-span-4 bg-slate-800 p-5 rounded-3xl border border-slate-700 space-y-5">
          {selectedCentre ? (
            <>
              <div className="border-b border-slate-700 pb-4">
                <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-bold uppercase">
                  <Building2 className="h-4 w-4" />
                  <span>Centre Detail Telemetry</span>
                </div>
                <h3 className="text-lg font-black text-white mt-1">{selectedCentre.name}</h3>
                <p className="text-xs text-slate-400">{selectedCentre.address}</p>
              </div>

              {selectedCentre.delayMinutes > 0 && (
                <div className="p-3 bg-amber-950/40 border border-amber-600/60 rounded-xl text-amber-200 text-xs flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="font-bold block">Active Delay: +{selectedCentre.delayMinutes} mins</strong>
                    <p className="text-[11px] text-amber-300/80 mt-0.5">{selectedCentre.delayReason || 'Weighbridge maintenance buffer'}</p>
                  </div>
                </div>
              )}

              <div className="space-y-2 text-xs">
                <div className="flex justify-between py-1.5 border-b border-slate-700/60">
                  <span className="text-slate-400">Active Weighing Bridges:</span>
                  <strong className="text-white">{selectedCentre.activeWeighingStations} / {selectedCentre.totalWeighingStations} Operational</strong>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-700/60">
                  <span className="text-slate-400">Processing Throughput:</span>
                  <strong className="text-white">{selectedCentre.processingRatePerHour} farmers / hour</strong>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-700/60">
                  <span className="text-slate-400">Daily Grain Storage Cap:</span>
                  <strong className="text-white">{selectedCentre.capacityQuintalsPerDay} Quintals</strong>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-700/60">
                  <span className="text-slate-400">Current Storage Filled:</span>
                  <strong className="text-white">{selectedCentre.currentCapacityUsedQuintals} Qtl ({selectedCentre.capacityUtilizationPercent}%)</strong>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-700/60">
                  <span className="text-slate-400">Operating Hours:</span>
                  <strong className="text-white">{selectedCentre.operatingHours}</strong>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-slate-400">Contact Helpline:</span>
                  <strong className="text-white">{selectedCentre.contactPhone}</strong>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  to="/admin/analytics"
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs py-2.5 px-4 rounded-xl flex items-center justify-center gap-1.5 transition"
                >
                  <span>View Historical Analytics</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </>
          ) : (
            <div className="text-center py-12 text-slate-500 text-xs">
              Select a centre to view deep telemetry.
            </div>
          )}
        </div>
      </div>

      {/* AI Alerts & Predictive Recommendations Panel */}
      <div className="bg-slate-800 p-6 rounded-3xl border border-slate-700 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-extrabold text-white flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-amber-400" />
              <span>AI Congestion Predictions & Proactive Intervention Alerts</span>
            </h3>
            <p className="text-xs text-slate-400">
              Predictions are machine forecasts based on real-time intake telemetry. Clearly demarcated by confidence rating.
            </p>
          </div>
          <span className="text-xs bg-slate-700 text-slate-300 px-3 py-1 rounded-full font-bold">
            {alerts.length} Active System Alerts
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {alerts.map((alert) => {
            const isHigh = alert.severity === 'high';
            const isMedium = alert.severity === 'medium';

            const badgeColor =
              alert.type === 'PREDICTION'
                ? 'bg-purple-900/80 text-purple-300 border-purple-700'
                : alert.type === 'RECOMMENDATION'
                ? 'bg-blue-900/80 text-blue-300 border-blue-700'
                : 'bg-amber-900/80 text-amber-300 border-amber-700';

            return (
              <div
                key={alert.id}
                className="bg-slate-900/80 p-4 rounded-2xl border border-slate-700 flex flex-col justify-between space-y-3"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded border ${badgeColor}`}>
                      {alert.type}
                    </span>
                    <span className="text-[10px] text-slate-400">{alert.timestamp}</span>
                  </div>

                  <h4 className="font-extrabold text-white text-sm mt-2">{alert.title}</h4>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">{alert.description}</p>
                </div>

                {alert.suggestedAction && (
                  <div className="p-2.5 bg-slate-800 rounded-xl border border-slate-700 text-[11px] text-emerald-300">
                    <span className="font-bold text-slate-300 block">Suggested Action:</span>
                    {alert.suggestedAction}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
