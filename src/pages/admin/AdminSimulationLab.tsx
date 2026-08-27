import React, { useState } from 'react';
import { useSimulationState, useCentres, useActiveBooking } from '../../hooks/useRealtimeData';
import { simulationApi } from '../../services/apiServices';
import {
  Cpu,
  AlertOctagon,
  Users,
  Wrench,
  FastForward,
  RotateCcw,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Navigation
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const AdminSimulationLab: React.FC = () => {
  const simulationState = useSimulationState();
  const centres = useCentres();
  const booking = useActiveBooking();
  const [loadingAction, setLoadingAction] = useState<string | null>(null);

  const executeAction = async (name: string, fn: () => Promise<void>) => {
    setLoadingAction(name);
    try {
      await fn();
    } finally {
      setTimeout(() => setLoadingAction(null), 300);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1">
          <Cpu className="h-4 w-4" />
          <span>SIH Prototype Evaluation Environment</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-white font-display">
          Live Stress Testing & Scenario Simulation Lab
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Inject real-time centre breakdowns, queue spikes, and slowdowns to evaluate KisanSetu's dynamic arrival window recalculation and farmer alerts.
        </p>
      </div>

      {/* Current Simulation Status Banner */}
      <div className="bg-slate-800 p-5 rounded-3xl border border-slate-700 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-extrabold text-white flex items-center gap-2">
            <span className={`h-2.5 w-2.5 rounded-full ${simulationState.isSimulationActive ? 'bg-amber-400 animate-ping' : 'bg-emerald-400'}`}></span>
            <span>Simulation Status: {simulationState.isSimulationActive ? 'Active Overrides' : 'Normal Baseline Operations'}</span>
          </h3>

          <button
            onClick={() => executeAction('reset', () => simulationApi.resetSimulation())}
            disabled={loadingAction === 'reset'}
            className="bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs font-bold px-3 py-1.5 rounded-xl flex items-center gap-1.5 transition"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Reset All Overrides</span>
          </button>
        </div>

        {simulationState.lastSimulatedEvent && (
          <div className="p-3 bg-amber-950/60 border border-amber-600/60 rounded-xl text-xs text-amber-200 flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-amber-400 shrink-0" />
            <span><strong>Latest Triggered Event:</strong> {simulationState.lastSimulatedEvent}</span>
          </div>
        )}
      </div>

      {/* Simulation Scenarios Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Scenario 1: Centre Slowdown */}
        <div className="bg-slate-800 p-5 rounded-3xl border border-slate-700 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase">
              <AlertOctagon className="h-4 w-4" />
              <span>Scenario 1: Dynamic Delay Experience</span>
            </div>
            <h4 className="text-base font-black text-white mt-1">Inject 50-Minute Centre Delay</h4>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed">
              Simulates a weighbridge recalibration at Gejjalagere Sub-Centre. Immediately recalculates the farmer's dynamic arrival window (shifts to 3:00 PM) and issues a critical warning banner: <em>"Please do not travel yet."</em>
            </p>
          </div>

          <button
            onClick={() => executeAction('slowdown', () => simulationApi.injectCentreSlowdown(50))}
            disabled={loadingAction === 'slowdown'}
            className="w-full bg-amber-600 hover:bg-amber-500 text-white font-extrabold text-xs py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 transition shadow-md"
          >
            <AlertOctagon className="h-4 w-4" />
            <span>Trigger 50-Min Delay Injection</span>
          </button>
        </div>

        {/* Scenario 2: Queue Surge */}
        <div className="bg-slate-800 p-5 rounded-3xl border border-slate-700 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase">
              <Users className="h-4 w-4" />
              <span>Scenario 2: Traffic Surge</span>
            </div>
            <h4 className="text-base font-black text-white mt-1">Spike Centre Queue (+20 Farmers)</h4>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed">
              Simulates a wave of unannounced farm vehicle arrivals from adjacent taluks. Updates queue position and recalculates wait times in real time.
            </p>
          </div>

          <button
            onClick={() => executeAction('spike', () => simulationApi.injectQueueSpike(20))}
            disabled={loadingAction === 'spike'}
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 transition shadow-md"
          >
            <Users className="h-4 w-4" />
            <span>Spike Queue (+20 Farmers)</span>
          </button>
        </div>

        {/* Scenario 3: Station Failure */}
        <div className="bg-slate-800 p-5 rounded-3xl border border-slate-700 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center gap-2 text-rose-400 text-xs font-bold uppercase">
              <Wrench className="h-4 w-4" />
              <span>Scenario 3: Scale Hardware Failure</span>
            </div>
            <h4 className="text-base font-black text-white mt-1">Weighing Station #1 Breakdown</h4>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed">
              Takes 1 of 3 weighing stations offline. Throughput drops by ~35% and system triggers maintenance alert.
            </p>
          </div>

          <button
            onClick={() => executeAction('station', () => simulationApi.injectStationFailure())}
            disabled={loadingAction === 'station'}
            className="w-full bg-rose-700 hover:bg-rose-600 text-white font-extrabold text-xs py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 transition shadow-md"
          >
            <Wrench className="h-4 w-4" />
            <span>Simulate Station Hardware Failure</span>
          </button>
        </div>

        {/* Scenario 4: Fast-Forward Queue Steps */}
        <div className="bg-slate-800 p-5 rounded-3xl border border-slate-700 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase">
              <FastForward className="h-4 w-4" />
              <span>Scenario 4: End-to-End Workflow</span>
            </div>
            <h4 className="text-base font-black text-white mt-1">Fast-Forward Queue Step Progression</h4>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed">
              Advances farmer from <strong>WAIT AT HOME</strong> → <strong>START TRAVELLING</strong> (4 farmers ahead) → <strong>ARRIVED</strong> → <strong>WEIGHING</strong> → <strong>BILL GENERATED</strong> → <strong>PAYMENT CREDITED</strong>.
            </p>
          </div>

          <button
            onClick={() => executeAction('step', () => simulationApi.advanceQueue())}
            disabled={loadingAction === 'step'}
            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 transition shadow-md"
          >
            <FastForward className="h-4 w-4" />
            <span>Advance Next Workflow Step</span>
          </button>
        </div>
      </div>

      {/* Live Farmer Telemetry Watch */}
      <div className="bg-slate-900 p-5 rounded-3xl border border-slate-800 text-xs space-y-3">
        <h4 className="font-extrabold text-white uppercase tracking-wider flex items-center gap-2">
          <Navigation className="h-4 w-4 text-emerald-400" />
          <span>Real-Time Farmer Telemetry Observer</span>
        </h4>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="bg-slate-800 p-2.5 rounded-xl border border-slate-700">
            <span className="text-slate-400 block">Token Number</span>
            <strong className="text-white font-mono text-sm">{booking.tokenNumber}</strong>
          </div>
          <div className="bg-slate-800 p-2.5 rounded-xl border border-slate-700">
            <span className="text-slate-400 block">Farmers Ahead</span>
            <strong className="text-white text-sm">{booking.farmersAhead}</strong>
          </div>
          <div className="bg-slate-800 p-2.5 rounded-xl border border-slate-700">
            <span className="text-slate-400 block">Action State</span>
            <strong className="text-emerald-400 text-sm">{booking.actionState}</strong>
          </div>
          <div className="bg-slate-800 p-2.5 rounded-xl border border-slate-700">
            <span className="text-slate-400 block">Arrival Window</span>
            <strong className="text-amber-300 text-sm">{booking.dynamicArrivalWindow.start} - {booking.dynamicArrivalWindow.end}</strong>
          </div>
        </div>
      </div>
    </div>
  );
};
