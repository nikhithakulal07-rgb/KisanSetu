import React from 'react';
import { useProcurement, useActiveBooking } from '../../hooks/useRealtimeData';
import { useAuth } from '../../features/auth/AuthContext';
import {
  Scale,
  ShieldCheck,
  FileCheck,
  CheckCircle2,
  Clock,
  IndianRupee,
  Download,
  Share2,
  Printer,
  ChevronRight,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const FarmerProcurement: React.FC = () => {
  const procurement = useProcurement();
  const booking = useActiveBooking();
  const { farmer } = useAuth();

  const stages = [
    { key: 'arrivedAt', label: 'Arrived at Centre Gate', time: procurement.stageTimestamps.arrivedAt },
    { key: 'weighingStartedAt', label: 'Vehicle Weighing Started', time: procurement.stageTimestamps.weighingStartedAt },
    { key: 'weighingCompletedAt', label: 'Tare & Net Weight Verified', time: procurement.stageTimestamps.weighingCompletedAt },
    { key: 'qualityAssessedAt', label: 'Quality Assessment & Moisture Test', time: procurement.stageTimestamps.qualityAssessedAt },
    { key: 'procurementAcceptedAt', label: 'Procurement Lot Approved', time: procurement.stageTimestamps.procurementAcceptedAt },
    { key: 'billGeneratedAt', label: 'Digital Bill / MSP Invoice Generated', time: procurement.stageTimestamps.billGeneratedAt },
    { key: 'paymentInitiatedAt', label: 'PFMS Direct Payment Dispatched', time: procurement.stageTimestamps.paymentInitiatedAt },
    { key: 'paymentCreditedAt', label: 'DBT Payment Credited to Bank', time: procurement.stageTimestamps.paymentCreditedAt },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 uppercase tracking-wider mb-1">
          <Scale className="h-4 w-4" />
          <span>Procurement Lifecycle & Digital Weighing</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 font-display">
          Procurement & Weighing Record
        </h1>
        <p className="text-sm text-slate-600 mt-1">
          Token: <strong className="text-slate-900 font-mono">{procurement.tokenNumber}</strong> • Lot: <strong>{procurement.cropType}</strong>
        </p>
      </div>

      {/* Grid: Left Timeline, Right Digital Bill */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Visual Stage Timeline with Timestamps */}
        <div className="lg:col-span-6 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-extrabold text-slate-900">Procurement Progress</h2>
            <span className="text-xs font-bold bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full border border-emerald-300">
              Station #{procurement.weighingStationNumber}
            </span>
          </div>

          <div className="relative pl-6 border-l-2 border-slate-200 space-y-6">
            {stages.map((stage, idx) => {
              const isDone = !!stage.time;

              return (
                <div key={stage.key} className="relative group">
                  {/* Pin */}
                  <div className={`absolute -left-[31px] top-0 h-6 w-6 rounded-full flex items-center justify-center border-2 ${
                    isDone
                      ? 'bg-emerald-600 border-white text-white shadow-sm'
                      : 'bg-white border-slate-300 text-slate-400'
                  }`}>
                    {isDone ? <CheckCircle2 className="h-3.5 w-3.5" /> : <Clock className="h-3.5 w-3.5" />}
                  </div>

                  <div>
                    <h3 className={`text-xs font-extrabold ${isDone ? 'text-slate-900' : 'text-slate-400'}`}>
                      {stage.label}
                    </h3>
                    <p className="text-[11px] font-semibold text-emerald-700 mt-0.5">
                      {stage.time || 'Pending operator completion'}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Digital MSP Procurement Bill */}
        <div className="lg:col-span-6 bg-white p-6 rounded-3xl border-2 border-slate-200 shadow-md space-y-5">
          <div className="flex items-start justify-between border-b border-slate-100 pb-4">
            <div>
              <span className="text-[10px] font-extrabold text-emerald-800 uppercase tracking-wide bg-emerald-100 px-2 py-0.5 rounded">
                Official MSP Procurement Bill
              </span>
              <h3 className="text-base font-black text-slate-900 mt-1">
                {procurement.billNumber}
              </h3>
              <p className="text-[11px] text-slate-500">{procurement.billGeneratedAt}</p>
            </div>
            <div className="p-2 bg-slate-100 rounded-xl">
              <FileCheck className="h-6 w-6 text-emerald-700" />
            </div>
          </div>

          {/* Measurements Breakdown */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="bg-slate-50 p-3 rounded-xl">
              <span className="text-slate-500 block">Gross Weight</span>
              <strong className="text-slate-900 text-sm font-bold">{procurement.grossWeightQuintals} Qtl</strong>
            </div>
            <div className="bg-slate-50 p-3 rounded-xl">
              <span className="text-slate-500 block">Tare (Vehicle) Weight</span>
              <strong className="text-slate-900 text-sm font-bold">{procurement.tareWeightQuintals} Qtl</strong>
            </div>
            <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-200">
              <span className="text-emerald-800 font-bold block">Net Grain Weight</span>
              <strong className="text-emerald-950 text-base font-black">{procurement.netWeightQuintals} Quintals</strong>
            </div>
            <div className="bg-slate-50 p-3 rounded-xl">
              <span className="text-slate-500 block">Moisture Content</span>
              <strong className="text-slate-900 text-sm font-bold">{procurement.moisturePercent}% (Permissible &lt; 14%)</strong>
            </div>
          </div>

          {/* Quality Assessment & Grade */}
          <div className="p-3.5 bg-emerald-50 rounded-xl border border-emerald-200 flex items-center justify-between text-xs">
            <div>
              <span className="text-emerald-800 font-bold block">Quality Grade:</span>
              <strong className="text-emerald-950 font-black text-sm">Grade A (FAQ Standard)</strong>
              <span className="text-[10px] text-emerald-700 block">Foreign matter: {procurement.foreignMatterPercent}%</span>
            </div>
            <div className="text-right">
              <span className="text-emerald-800 font-bold block">Govt MSP Rate:</span>
              <strong className="text-emerald-950 font-black text-sm">₹{procurement.mspRatePerQuintal} / Qtl</strong>
            </div>
          </div>

          {/* Total Payout */}
          <div className="p-4 bg-slate-900 text-white rounded-2xl flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-400 block font-medium">Total Procurement Amount</span>
              <span className="text-2xl font-black text-emerald-400 font-display">
                ₹{procurement.totalProcurementAmount.toLocaleString('en-IN')}
              </span>
            </div>
            <Link
              to="/farmer/payments"
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-3.5 py-2 rounded-xl flex items-center gap-1.5 transition shadow-sm"
            >
              <span>Track Payment</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
