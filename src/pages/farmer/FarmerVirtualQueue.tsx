import React from 'react';
import { useActiveBooking, useCentres, useSimulationState } from '../../hooks/useRealtimeData';
import { useAuth } from '../../features/auth/AuthContext';
import { useTranslation } from '../../i18n/I18nContext';
import { StatusBadge } from '../../components/common/StatusBadge';
import { DelayAlertBanner } from '../../components/common/DelayAlertBanner';
import { QueueActionState } from '../../types';
import {
  Clock,
  Users,
  Navigation,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Scale,
  FileCheck,
  IndianRupee,
  RefreshCw,
  Home,
  Check
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const FarmerVirtualQueue: React.FC = () => {
  const { t } = useTranslation();
  const { farmer } = useAuth();
  const booking = useActiveBooking();
  const centres = useCentres();
  const simulationState = useSimulationState();

  const centre = centres.find((c) => c.id === booking.centreId) || centres[1];
  const isTravelling = booking.actionState === 'START_TRAVELLING';
  const isDelayed = booking.centreDelayMinutes > 0;

  // Queue stages for visual step progression
  const steps: { state: QueueActionState; label: string; desc: string }[] = [
    { state: 'WAIT_AT_HOME', label: '1. Wait at Home', desc: 'Rest safely at your village' },
    { state: 'START_TRAVELLING', label: '2. Start Travelling', desc: 'Triggered when 4 farmers ahead' },
    { state: 'ARRIVED', label: '3. Arrived at Gate', desc: 'Entry pass validated' },
    { state: 'WEIGHING', label: '4. Weighing In-Progress', desc: 'Gross & tare weight capture' },
    { state: 'QUALITY_ASSESSMENT', label: '5. Quality Assessment', desc: 'Moisture & purity grading' },
    { state: 'BILL_GENERATED', label: '6. Digital Bill', desc: 'Instant MSP invoice generated' },
    { state: 'PAYMENT_CREDITED', label: '7. DBT Payment', desc: 'Credited directly to bank' },
  ];

  const getStateIndex = (currentState: QueueActionState) => {
    switch (currentState) {
      case 'WAIT_AT_HOME':
        return 0;
      case 'YOUR_TURN_IS_APPROACHING':
      case 'START_TRAVELLING':
        return 1;
      case 'ARRIVED':
      case 'WAITING_FOR_WEIGHING':
        return 2;
      case 'WEIGHING':
        return 3;
      case 'QUALITY_ASSESSMENT':
      case 'PROCUREMENT_ACCEPTED':
        return 4;
      case 'BILL_GENERATED':
      case 'PAYMENT_PROCESSING':
        return 5;
      case 'PAYMENT_CREDITED':
        return 6;
      default:
        return 0;
    }
  };

  const currentStepIndex = getStateIndex(booking.actionState);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header with Live Sync Beacon */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 uppercase tracking-wider mb-1">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span>Live Virtual Queue Telemetry</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 font-display">
            Smart Queue & Dynamic Arrival Window
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-3 py-1.5 rounded-full border border-emerald-300 flex items-center gap-1.5">
            <RefreshCw className="h-3.5 w-3.5 animate-spin" />
            <span>Auto-Refreshing Every 5s</span>
          </span>
        </div>
      </div>

      {/* Real-time Centre Delay Banner */}
      {isDelayed && (
        <DelayAlertBanner
          centreName={booking.centreName}
          delayMinutes={booking.centreDelayMinutes}
          newArrivalWindowStart={booking.dynamicArrivalWindow.start}
          newArrivalWindowEnd={booking.dynamicArrivalWindow.end}
          reason={booking.centreDelayReason}
        />
      )}

      {/* HERO QUEUE STATUS DISPLAY */}
      <div className={`rounded-3xl p-6 sm:p-8 border-2 shadow-2xl transition-all duration-500 relative overflow-hidden ${
        isTravelling
          ? 'bg-gradient-to-br from-emerald-600 via-green-600 to-emerald-700 text-white border-emerald-400 ring-4 ring-emerald-400/40 animate-pulse-slow'
          : 'bg-white text-slate-900 border-slate-200'
      }`}>
        {/* Token & Big Action Status */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-6 border-slate-100/30">
          <div>
            <div className="flex items-center gap-2">
              <span className={`text-xs font-black uppercase px-2.5 py-1 rounded-md ${
                isTravelling ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-700'
              }`}>
                Smart Token
              </span>
              <span className={`text-xs font-bold ${isTravelling ? 'text-emerald-100' : 'text-slate-500'}`}>
                {centre.name}
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-black tracking-tight mt-1 font-mono">
              {booking.tokenNumber}
            </h2>
          </div>

          <div className="flex flex-col items-start sm:items-end">
            <span className={`text-xs font-bold uppercase tracking-wider mb-2 ${isTravelling ? 'text-emerald-100' : 'text-slate-500'}`}>
              Recommended Action
            </span>
            <div className="scale-110">
              <StatusBadge status={booking.actionState} size="lg" />
            </div>
          </div>
        </div>

        {/* Big 4 Telemetry Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-8">
          {/* Stat 1: Farmers Ahead */}
          <div className={`p-4 rounded-2xl border ${
            isTravelling ? 'bg-white/10 border-white/20' : 'bg-slate-50 border-slate-200'
          }`}>
            <span className={`text-xs font-bold uppercase tracking-wider block ${
              isTravelling ? 'text-emerald-100' : 'text-slate-500'
            }`}>
              Farmers Ahead
            </span>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-3xl sm:text-4xl font-black font-display">
                {booking.farmersAhead}
              </span>
              <span className={`text-xs ${isTravelling ? 'text-emerald-200' : 'text-slate-400'}`}>
                farmers
              </span>
            </div>
            <p className={`text-xs font-medium mt-1 ${isTravelling ? 'text-emerald-200' : 'text-slate-500'}`}>
              Queue position: #{booking.currentPositionInQueue}
            </p>
          </div>

          {/* Stat 2: Estimated Wait */}
          <div className={`p-4 rounded-2xl border ${
            isTravelling ? 'bg-white/10 border-white/20' : 'bg-slate-50 border-slate-200'
          }`}>
            <span className={`text-xs font-bold uppercase tracking-wider block ${
              isTravelling ? 'text-emerald-100' : 'text-slate-500'
            }`}>
              Estimated Wait
            </span>
            <div className="mt-2">
              <span className="text-3xl sm:text-4xl font-black font-display">
                {Math.floor(booking.estimatedWaitMinutes / 60)}h {booking.estimatedWaitMinutes % 60}m
              </span>
            </div>
            <p className={`text-xs font-medium mt-1 ${isTravelling ? 'text-emerald-200' : 'text-slate-500'}`}>
              Live intake rate adjusted
            </p>
          </div>

          {/* Stat 3: Current Processing Rate */}
          <div className={`p-4 rounded-2xl border ${
            isTravelling ? 'bg-white/10 border-white/20' : 'bg-slate-50 border-slate-200'
          }`}>
            <span className={`text-xs font-bold uppercase tracking-wider block ${
              isTravelling ? 'text-emerald-100' : 'text-slate-500'
            }`}>
              Processing Rate
            </span>
            <div className="mt-2 flex items-baseline gap-1">
              <span className="text-3xl sm:text-4xl font-black font-display">
                {centre.processingRatePerHour}
              </span>
              <span className={`text-xs ${isTravelling ? 'text-emerald-200' : 'text-slate-400'}`}>
                farmers/hr
              </span>
            </div>
            <p className={`text-xs font-medium mt-1 ${isTravelling ? 'text-emerald-200' : 'text-slate-500'}`}>
              {centre.activeWeighingStations}/{centre.totalWeighingStations} weighbridges active
            </p>
          </div>

          {/* Stat 4: Dynamic Arrival Window */}
          <div className={`p-4 rounded-2xl border ${
            isTravelling
              ? 'bg-white/20 border-white/30 text-white'
              : isDelayed
              ? 'bg-amber-50 border-amber-300 text-amber-950'
              : 'bg-emerald-50 border-emerald-200 text-emerald-950'
          }`}>
            <span className="text-xs font-extrabold uppercase tracking-wider block">
              Arrival Window
            </span>
            <div className="mt-2">
              <span className="text-xl sm:text-2xl font-black">
                {booking.dynamicArrivalWindow.start} – {booking.dynamicArrivalWindow.end}
              </span>
            </div>
            <p className="text-xs font-semibold mt-1 opacity-90">
              Est. Weighing: {booking.estimatedProcurementTime}
            </p>
          </div>
        </div>

        {/* Action Advice Callout */}
        <div className={`mt-8 p-4 rounded-2xl border flex items-center justify-between flex-wrap gap-4 ${
          isTravelling
            ? 'bg-emerald-800/80 border-emerald-400/40 text-white'
            : 'bg-slate-100 border-slate-200 text-slate-800'
        }`}>
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-xl ${isTravelling ? 'bg-white text-emerald-800' : 'bg-emerald-600 text-white'}`}>
              {isTravelling ? <Navigation className="h-6 w-6 animate-bounce" /> : <Home className="h-6 w-6" />}
            </div>
            <div>
              <h4 className="font-extrabold text-sm sm:text-base">
                {isTravelling
                  ? 'Your turn is approaching! Please leave home now.'
                  : 'You have plenty of time. Please rest comfortably at home.'}
              </h4>
              <p className="text-xs opacity-90">
                Transit time from Keregodu: ~22 minutes. KisanSetu will send an SMS and trigger alarms when it is time to depart.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Visual Step-by-Step Progress Timeline */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-extrabold text-slate-900">Procurement Lifecycle Stage</h3>
            <p className="text-xs text-slate-500">Live progress tracking from home departure to DBT bank transfer</p>
          </div>
          <span className="text-xs font-bold bg-slate-100 text-slate-700 px-3 py-1 rounded-full">
            Stage {currentStepIndex + 1} of {steps.length}
          </span>
        </div>

        {/* Step Progression */}
        <div className="space-y-4">
          {steps.map((step, idx) => {
            const isCompleted = idx < currentStepIndex;
            const isCurrent = idx === currentStepIndex;

            return (
              <div
                key={step.state}
                className={`flex items-start gap-4 p-3.5 rounded-2xl transition border ${
                  isCurrent
                    ? 'bg-emerald-50/80 border-emerald-300 ring-2 ring-emerald-500/20 shadow-xs'
                    : isCompleted
                    ? 'bg-slate-50/60 border-slate-200/80'
                    : 'bg-white border-transparent opacity-60'
                }`}
              >
                {/* Step Icon / Circle */}
                <div className={`h-9 w-9 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${
                  isCompleted
                    ? 'bg-emerald-600 text-white'
                    : isCurrent
                    ? 'bg-emerald-600 text-white animate-pulse ring-4 ring-emerald-200'
                    : 'bg-slate-200 text-slate-600'
                }`}>
                  {isCompleted ? <Check className="h-5 w-5" /> : idx + 1}
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className={`text-sm font-extrabold ${isCurrent ? 'text-emerald-950' : 'text-slate-800'}`}>
                      {step.label}
                    </h4>
                    {isCurrent && (
                      <span className="text-[10px] bg-emerald-600 text-white font-extrabold px-2 py-0.5 rounded-full uppercase">
                        Current Stage
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">{step.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Navigation shortcuts */}
      <div className="flex items-center justify-between">
        <Link
          to="/farmer/dashboard"
          className="text-xs font-bold text-slate-600 hover:text-slate-900"
        >
          ← Back to Dashboard
        </Link>
        <Link
          to="/farmer/procurement"
          className="bg-slate-900 hover:bg-emerald-600 text-white text-xs font-bold px-4 py-2.5 rounded-xl flex items-center gap-1.5 transition"
        >
          <span>View Procurement Details</span>
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
};
