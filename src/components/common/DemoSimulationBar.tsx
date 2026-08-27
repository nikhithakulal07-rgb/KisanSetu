import React, { useState } from 'react';
import {
  Activity,
  AlertOctagon,
  FastForward,
  RotateCcw,
  Users,
  Wrench,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Cpu
} from 'lucide-react';
import { simulationApi } from '../../services/apiServices';
import { useSimulationState } from '../../hooks/useRealtimeData';

export const DemoSimulationBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);
  const simulationState = useSimulationState();
  const [isTriggering, setIsTriggering] = useState(false);

  const handleAction = async (actionFn: () => Promise<void>) => {
    setIsTriggering(true);
    try {
      await actionFn();
    } finally {
      setTimeout(() => setIsTriggering(false), 300);
    }
  };

  return (
    <div className="sticky top-0 z-50 bg-slate-900 text-white shadow-xl border-b border-slate-700">
      <div className="max-w-7xl mx-auto px-3 py-2 flex flex-wrap items-center justify-between gap-2 text-xs">
        {/* Left header / status */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 font-bold tracking-wide uppercase bg-emerald-950 text-emerald-400 px-2 py-0.5 rounded border border-emerald-700">
            <Cpu className="h-3.5 w-3.5 animate-pulse text-emerald-400" />
            <span>SIH Demo Console</span>
          </div>

          <span className="hidden sm:inline text-slate-300 font-medium">
            {simulationState.lastSimulatedEvent ? (
              <span className="text-amber-300 font-semibold flex items-center gap-1">
                <Sparkles className="h-3 w-3" /> {simulationState.lastSimulatedEvent}
              </span>
            ) : (
              'Simulate live procurement events to test dynamic ETA reaction'
            )}
          </span>
        </div>

        {/* Right toggles & buttons */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <button
            onClick={() => handleAction(() => simulationApi.injectCentreSlowdown(50))}
            disabled={isTriggering}
            className="flex items-center gap-1 bg-amber-600 hover:bg-amber-500 text-white px-2.5 py-1 rounded font-semibold transition active:scale-95 shadow-sm"
            title="Inject a 50-minute delay to test dynamic arrival window recalculation"
          >
            <AlertOctagon className="h-3.5 w-3.5" />
            <span>Inject 50m Delay</span>
          </button>

          <button
            onClick={() => handleAction(() => simulationApi.injectQueueSpike(20))}
            disabled={isTriggering}
            className="flex items-center gap-1 bg-indigo-600 hover:bg-indigo-500 text-white px-2.5 py-1 rounded font-semibold transition active:scale-95 shadow-sm"
            title="Add 20 farmers to the queue"
          >
            <Users className="h-3.5 w-3.5" />
            <span>Queue Spike (+20)</span>
          </button>

          <button
            onClick={() => handleAction(() => simulationApi.injectStationFailure())}
            disabled={isTriggering}
            className="flex items-center gap-1 bg-rose-700 hover:bg-rose-600 text-white px-2.5 py-1 rounded font-semibold transition active:scale-95 shadow-sm"
            title="Simulate 1 weighbridge offline"
          >
            <Wrench className="h-3.5 w-3.5" />
            <span>Station Failure</span>
          </button>

          <button
            onClick={() => handleAction(() => simulationApi.advanceQueue())}
            disabled={isTriggering}
            className="flex items-center gap-1 bg-emerald-600 hover:bg-emerald-500 text-white px-2.5 py-1 rounded font-bold transition active:scale-95 shadow-sm"
            title="Fast forward queue steps: Wait -> Travel -> Arrived -> Weighing -> Accepted -> Payment"
          >
            <FastForward className="h-3.5 w-3.5" />
            <span>Advance Step</span>
          </button>

          <button
            onClick={() => handleAction(() => simulationApi.resetSimulation())}
            disabled={isTriggering}
            className="flex items-center gap-1 bg-slate-700 hover:bg-slate-600 text-slate-200 px-2 py-1 rounded font-medium transition active:scale-95"
            title="Reset to default initial state"
          >
            <RotateCcw className="h-3 w-3" />
            <span className="hidden md:inline">Reset</span>
          </button>
        </div>
      </div>
    </div>
  );
};
