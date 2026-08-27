import React, { useState } from 'react';
import { useCentres, useActiveBooking, useProcurement, usePayment } from '../../hooks/useRealtimeData';
import { procurementApi, queueApi, simulationApi } from '../../services/apiServices';
import { QueueActionState, QualityGrade } from '../../types';
import {
  Scale,
  Users,
  CheckCircle2,
  AlertTriangle,
  FileCheck,
  IndianRupee,
  Clock,
  Play,
  RotateCcw,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Building2
} from 'lucide-react';

export const OperatorDashboard: React.FC = () => {
  const centres = useCentres();
  const booking = useActiveBooking();
  const procurement = useProcurement();
  const payment = usePayment();

  const currentCentre = centres.find((c) => c.id === 'centre-b') || centres[1];

  const [grossWeight, setGrossWeight] = useState<number>(42.5);
  const [tareWeight, setTareWeight] = useState<number>(7.5);
  const [moisture, setMoisture] = useState<number>(12.8);
  const [qualityGrade, setQualityGrade] = useState<QualityGrade>('GRADE_A');
  const [isUpdating, setIsUpdating] = useState<boolean>(false);

  const netWeight = Math.max(0, grossWeight - tareWeight);
  const mspRate = 2183;
  const calculatedTotal = netWeight * mspRate;

  const handleAdvanceState = async (nextState: QueueActionState) => {
    setIsUpdating(true);
    try {
      await queueApi.updateActionState(nextState);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleAdvanceWorkflow = async () => {
    setIsUpdating(true);
    try {
      await simulationApi.advanceQueue();
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Station KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
            <span>Queue Size</span>
            <Users className="h-4 w-4 text-emerald-700" />
          </div>
          <div className="text-2xl font-black text-slate-900 mt-2 font-display">
            {currentCentre.queueSize} farmers
          </div>
          <span className="text-[11px] text-emerald-700 font-medium">Estimated wait: ~{Math.floor(currentCentre.averageWaitMinutes / 60)}h {currentCentre.averageWaitMinutes % 60}m</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
            <span>Active Weighbridges</span>
            <Scale className="h-4 w-4 text-blue-700" />
          </div>
          <div className="text-2xl font-black text-slate-900 mt-2 font-display">
            {currentCentre.activeWeighingStations} / {currentCentre.totalWeighingStations} Active
          </div>
          <span className="text-[11px] text-slate-500 font-medium">Station #2 Operational</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
            <span>Storage Utilization</span>
            <Building2 className="h-4 w-4 text-indigo-700" />
          </div>
          <div className="text-2xl font-black text-slate-900 mt-2 font-display">
            {currentCentre.capacityUtilizationPercent}%
          </div>
          <span className="text-[11px] text-slate-500 font-medium">{currentCentre.currentCapacityUsedQuintals} / {currentCentre.capacityQuintalsPerDay} Qtl</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
            <span>Current Delay</span>
            <Clock className="h-4 w-4 text-amber-700" />
          </div>
          <div className="text-2xl font-black text-slate-900 mt-2 font-display">
            {currentCentre.delayMinutes} mins
          </div>
          <span className="text-[11px] text-slate-500 font-medium">Intake rate: {currentCentre.processingRatePerHour} / hr</span>
        </div>
      </div>

      {/* Main Workspace: Active Token Inspection & Operator Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Active Farmer Token & Step Control */}
        <div className="lg:col-span-7 bg-white p-6 rounded-3xl border-2 border-slate-200 shadow-sm space-y-6">
          <div className="flex items-start justify-between border-b border-slate-100 pb-4">
            <div>
              <span className="text-[10px] font-extrabold uppercase bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">
                Current Active Token Under Processing
              </span>
              <h2 className="text-3xl font-black text-slate-900 font-mono mt-1">
                {booking.tokenNumber}
              </h2>
              <p className="text-xs text-slate-600 mt-0.5">
                Farmer: <strong className="text-slate-900">{booking.farmerName}</strong> • Phone: {booking.farmerPhone}
              </p>
            </div>

            <div className="text-right">
              <span className="text-[10px] text-slate-400 block uppercase font-bold">Current State</span>
              <span className="inline-block bg-slate-900 text-white font-extrabold text-xs px-3 py-1 rounded-lg mt-1">
                {booking.actionState}
              </span>
            </div>
          </div>

          {/* Quick Operator Advance Buttons */}
          <div>
            <h3 className="text-xs font-extrabold uppercase text-slate-400 tracking-wider mb-3">
              Operator Stage Actions (Calls Backend API)
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              <button
                onClick={() => handleAdvanceState('ARRIVED')}
                disabled={isUpdating}
                className="p-3 rounded-xl border border-slate-200 bg-slate-50 hover:bg-emerald-50 hover:border-emerald-300 text-left transition"
              >
                <span className="text-xs font-bold block text-slate-900">1. Mark Arrived</span>
                <span className="text-[10px] text-slate-500">Gate security entry</span>
              </button>

              <button
                onClick={() => handleAdvanceState('WEIGHING')}
                disabled={isUpdating}
                className="p-3 rounded-xl border border-slate-200 bg-slate-50 hover:bg-emerald-50 hover:border-emerald-300 text-left transition"
              >
                <span className="text-xs font-bold block text-slate-900">2. Start Weighing</span>
                <span className="text-[10px] text-slate-500">Vehicle on scale</span>
              </button>

              <button
                onClick={() => handleAdvanceState('QUALITY_ASSESSMENT')}
                disabled={isUpdating}
                className="p-3 rounded-xl border border-slate-200 bg-slate-50 hover:bg-emerald-50 hover:border-emerald-300 text-left transition"
              >
                <span className="text-xs font-bold block text-slate-900">3. Quality Check</span>
                <span className="text-[10px] text-slate-500">Moisture & FAQ test</span>
              </button>

              <button
                onClick={() => handleAdvanceState('PROCUREMENT_ACCEPTED')}
                disabled={isUpdating}
                className="p-3 rounded-xl border border-slate-200 bg-slate-50 hover:bg-emerald-50 hover:border-emerald-300 text-left transition"
              >
                <span className="text-xs font-bold block text-slate-900">4. Accept Lot</span>
                <span className="text-[10px] text-slate-500">MSP approval</span>
              </button>

              <button
                onClick={() => handleAdvanceState('BILL_GENERATED')}
                disabled={isUpdating}
                className="p-3 rounded-xl border border-slate-200 bg-slate-50 hover:bg-emerald-50 hover:border-emerald-300 text-left transition"
              >
                <span className="text-xs font-bold block text-slate-900">5. Generate Bill</span>
                <span className="text-[10px] text-slate-500">Digital receipt</span>
              </button>

              <button
                onClick={() => handleAdvanceState('PAYMENT_CREDITED')}
                disabled={isUpdating}
                className="p-3 rounded-xl border border-slate-200 bg-emerald-50 hover:bg-emerald-100 border-emerald-300 text-left transition"
              >
                <span className="text-xs font-bold block text-emerald-900">6. Credit DBT</span>
                <span className="text-[10px] text-emerald-700">Instant test transfer</span>
              </button>
            </div>

            {/* Big One-Click Next Step Button */}
            <div className="mt-5">
              <button
                onClick={handleAdvanceWorkflow}
                disabled={isUpdating}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold py-3 px-4 rounded-xl flex items-center justify-center gap-2 shadow-md transition"
              >
                <Play className="h-4 w-4 fill-white" />
                <span>One-Click Advance Next Step Workflow</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Right: Weighing & Quality Calibration Inputs */}
        <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
              <Scale className="h-4 w-4 text-emerald-700" />
              <span>Weighbridge Calibration Terminal</span>
            </h3>
            <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
              Scale ID: WB-02-DIGI
            </span>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Gross Vehicle Weight (Quintals)
              </label>
              <input
                type="number"
                step="0.1"
                value={grossWeight}
                onChange={(e) => setGrossWeight(Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 font-bold text-slate-900"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Tare Empty Vehicle Weight (Quintals)
              </label>
              <input
                type="number"
                step="0.1"
                value={tareWeight}
                onChange={(e) => setTareWeight(Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 font-bold text-slate-900"
              />
            </div>

            <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 flex items-center justify-between">
              <span className="font-bold text-emerald-900">Net Grain Weight:</span>
              <strong className="text-base font-black text-emerald-950">{netWeight.toFixed(1)} Quintals</strong>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Moisture Content (%)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={moisture}
                  onChange={(e) => setMoisture(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 font-bold text-slate-900"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Quality Grade
                </label>
                <select
                  value={qualityGrade}
                  onChange={(e) => setQualityGrade(e.target.value as QualityGrade)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 font-bold text-slate-900"
                >
                  <option value="GRADE_A">Grade A (FAQ Standard)</option>
                  <option value="GRADE_B">Grade B (Acceptable)</option>
                  <option value="REJECTED">Rejected (&gt;15% Moisture)</option>
                </select>
              </div>
            </div>

            <div className="p-4 bg-slate-900 text-white rounded-2xl flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-400 block">Calculated MSP Value</span>
                <span className="text-xl font-black text-emerald-400 font-display">
                  ₹{calculatedTotal.toLocaleString('en-IN')}
                </span>
              </div>
              <span className="text-[10px] bg-emerald-800 text-emerald-200 px-2.5 py-1 rounded-lg font-bold">
                MSP: ₹{mspRate}/Qtl
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
