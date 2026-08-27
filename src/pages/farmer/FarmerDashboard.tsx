import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../features/auth/AuthContext';
import { useTranslation } from '../../i18n/I18nContext';
import { useActiveBooking, useCentres } from '../../hooks/useRealtimeData';
import { DelayAlertBanner } from '../../components/common/DelayAlertBanner';
import { StatusBadge } from '../../components/common/StatusBadge';
import {
  Clock,
  Users,
  Navigation,
  ArrowRight,
  Sparkles,
  MapPin,
  Calendar,
  IndianRupee,
  FileCheck,
  CheckCircle2,
  Wheat,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';

import { CropPriceForecastWidget } from '../../components/farmer/CropPriceForecastWidget';

export const FarmerDashboard: React.FC = () => {
  const { farmer } = useAuth();
  const { t } = useTranslation();
  const booking = useActiveBooking();
  const centres = useCentres();

  const activeCentre = centres.find((c) => c.id === booking.centreId) || centres[1];

  const isStartTravelling = booking.actionState === 'START_TRAVELLING';
  const isDelayed = booking.centreDelayMinutes > 0;

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-emerald-800 to-green-700 rounded-2xl p-5 sm:p-6 text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-emerald-900/60 text-emerald-200 text-xs px-3 py-1 rounded-full mb-2 font-medium">
              <span>🌾 Registered Farmer ID:</span>
              <strong className="text-white font-bold">{farmer.farmerId}</strong>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-display">
              Namaste, {farmer.name}
            </h1>
            <p className="text-emerald-100 text-sm mt-1 max-w-xl">
              Village: <strong className="text-white">{farmer.village}</strong>, {farmer.district} • Land: {farmer.landSizeAcres} Acres • Crop: <strong className="text-white">{farmer.primaryCrop}</strong>
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-xl p-3.5 border border-white/20 sm:text-right shrink-0">
            <span className="text-xs text-emerald-200 block">Expected Harvest Lot</span>
            <span className="text-xl font-black text-white">{booking.expectedQuantityQuintals} Quintals</span>
            <span className="text-[11px] text-emerald-200 block mt-0.5">Govt MSP: ₹2,183 / Qtl</span>
          </div>
        </div>
      </div>

      {/* Real-Time Delay Alert Banner (If simulated delay injected) */}
      {isDelayed && (
        <DelayAlertBanner
          centreName={booking.centreName}
          delayMinutes={booking.centreDelayMinutes}
          newArrivalWindowStart={booking.dynamicArrivalWindow.start}
          newArrivalWindowEnd={booking.dynamicArrivalWindow.end}
          reason={booking.centreDelayReason}
        />
      )}

      {/* HERO SECTION: Current Predictive Token & Queue Action Card */}
      <div className={`rounded-2xl border-2 shadow-xl p-6 transition-all duration-300 ${
        isStartTravelling
          ? 'bg-gradient-to-br from-emerald-600 via-green-600 to-emerald-700 text-white border-emerald-500 shadow-emerald-600/30 ring-4 ring-emerald-400/40 animate-pulse-slow'
          : 'bg-white text-slate-900 border-slate-200'
      }`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-5 border-slate-100/30">
          <div>
            <div className="flex items-center gap-2">
              <span className={`text-xs font-black uppercase tracking-wider px-2.5 py-1 rounded-md ${
                isStartTravelling ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-700'
              }`}>
                Active Smart Token
              </span>
              <span className="text-xs font-semibold opacity-80">{booking.bookingDate}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight mt-1 font-mono">
              {booking.tokenNumber}
            </h2>
            <p className={`text-xs mt-1 flex items-center gap-1.5 ${isStartTravelling ? 'text-emerald-100' : 'text-slate-500'}`}>
              <MapPin className="h-3.5 w-3.5" />
              <span>Allocated at: <strong className={isStartTravelling ? 'text-white' : 'text-slate-800'}>{booking.centreName}</strong></span>
            </p>
          </div>

          {/* Action State Status Badge */}
          <div className="flex flex-col items-start md:items-end">
            <span className={`text-xs font-bold uppercase tracking-wider mb-1.5 ${isStartTravelling ? 'text-emerald-100' : 'text-slate-500'}`}>
              {t.recommendedAction}
            </span>
            <div className="scale-105">
              <StatusBadge status={booking.actionState} size="lg" />
            </div>
          </div>
        </div>

        {/* 4 Critical Predictive Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          {/* 1. Farmers Ahead */}
          <div className={`p-4 rounded-xl border ${
            isStartTravelling
              ? 'bg-white/10 border-white/20'
              : 'bg-slate-50 border-slate-200/70'
          }`}>
            <div className="flex items-center justify-between">
              <span className={`text-xs font-semibold ${isStartTravelling ? 'text-emerald-100' : 'text-slate-500'}`}>
                {t.farmersAhead}
              </span>
              <Users className={`h-4 w-4 ${isStartTravelling ? 'text-emerald-200' : 'text-slate-400'}`} />
            </div>
            <div className="mt-2 flex items-baseline gap-1">
              <span className="text-2xl sm:text-3xl font-black tracking-tight font-display">
                {booking.farmersAhead}
              </span>
              <span className={`text-xs ${isStartTravelling ? 'text-emerald-200' : 'text-slate-500'}`}>
                (Queue #{booking.currentPositionInQueue})
              </span>
            </div>
            <p className={`text-[11px] mt-1 ${isStartTravelling ? 'text-emerald-200' : 'text-slate-500'}`}>
              Processing: ~{activeCentre.processingRatePerHour}/hr
            </p>
          </div>

          {/* 2. Estimated Wait Time */}
          <div className={`p-4 rounded-xl border ${
            isStartTravelling
              ? 'bg-white/10 border-white/20'
              : 'bg-slate-50 border-slate-200/70'
          }`}>
            <div className="flex items-center justify-between">
              <span className={`text-xs font-semibold ${isStartTravelling ? 'text-emerald-100' : 'text-slate-500'}`}>
                {t.estimatedWait}
              </span>
              <Clock className={`h-4 w-4 ${isStartTravelling ? 'text-emerald-200' : 'text-slate-400'}`} />
            </div>
            <div className="mt-2">
              <span className="text-2xl sm:text-3xl font-black tracking-tight font-display">
                {Math.floor(booking.estimatedWaitMinutes / 60)}h {booking.estimatedWaitMinutes % 60}m
              </span>
            </div>
            <p className={`text-[11px] mt-1 ${isStartTravelling ? 'text-emerald-200' : 'text-slate-500'}`}>
              Predictive algorithm estimate
            </p>
          </div>

          {/* 3. Dynamic Arrival Window */}
          <div className={`p-4 rounded-xl border ${
            isStartTravelling
              ? 'bg-white/15 border-white/30'
              : isDelayed
              ? 'bg-amber-50 border-amber-300 text-amber-950'
              : 'bg-emerald-50 border-emerald-200 text-emerald-950'
          }`}>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider">
                {t.arrivalWindow}
              </span>
              <Navigation className="h-4 w-4 text-emerald-600" />
            </div>
            <div className="mt-2">
              <span className="text-lg sm:text-xl font-black tracking-tight">
                {booking.dynamicArrivalWindow.start} – {booking.dynamicArrivalWindow.end}
              </span>
            </div>
            <p className="text-[11px] font-semibold mt-1 opacity-90">
              Target arrival timing at gate
            </p>
          </div>

          {/* 4. Est. Procurement Time */}
          <div className={`p-4 rounded-xl border ${
            isStartTravelling
              ? 'bg-white/10 border-white/20'
              : 'bg-slate-50 border-slate-200/70'
          }`}>
            <div className="flex items-center justify-between">
              <span className={`text-xs font-semibold ${isStartTravelling ? 'text-emerald-100' : 'text-slate-500'}`}>
                Est. Weighing Slot
              </span>
              <CheckCircle2 className={`h-4 w-4 ${isStartTravelling ? 'text-emerald-200' : 'text-slate-400'}`} />
            </div>
            <div className="mt-2">
              <span className="text-2xl sm:text-3xl font-black tracking-tight font-display">
                {booking.estimatedProcurementTime}
              </span>
            </div>
            <p className={`text-[11px] mt-1 ${isStartTravelling ? 'text-emerald-200' : 'text-slate-500'}`}>
              Station #2 Allocated
            </p>
          </div>
        </div>

        {/* Action Button Strip */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-100/30">
          <div className="text-xs font-medium opacity-90 flex items-center gap-1.5">
            <Sparkles className="h-4 w-4 text-amber-300" />
            <span>KisanSetu calculates real-time road travel buffer from your village (22 mins)</span>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to="/farmer/queue"
              className={`px-5 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 transition shadow-md ${
                isStartTravelling
                  ? 'bg-white text-emerald-800 hover:bg-slate-100'
                  : 'bg-emerald-600 hover:bg-emerald-700 text-white'
              }`}
            >
              <span>Enter Virtual Queue</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Crop Price Trajectory & Forecast Section */}
      <CropPriceForecastWidget />

      {/* Quick Navigation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Card 1: Discover Centres & Compare */}
        <Link
          to="/farmer/centres"
          className="group bg-white hover:bg-emerald-50/50 p-5 rounded-2xl border border-slate-200 hover:border-emerald-300 transition shadow-xs hover:shadow-md flex flex-col justify-between"
        >
          <div>
            <div className="h-10 w-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold mb-3 group-hover:scale-105 transition">
              <MapPin className="h-5 w-5" />
            </div>
            <h3 className="font-extrabold text-slate-900 text-base group-hover:text-emerald-800 transition">
              Centre Discovery & Load
            </h3>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              Compare 4 nearby Mandya APMC centres by distance, live waiting time, and capacity.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-700">
            <span>View Interactive Map</span>
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition" />
          </div>
        </Link>

        {/* Card 2: Dynamic Booking / Reschedule */}
        <Link
          to="/farmer/booking"
          className="group bg-white hover:bg-emerald-50/50 p-5 rounded-2xl border border-slate-200 hover:border-emerald-300 transition shadow-xs hover:shadow-md flex flex-col justify-between"
        >
          <div>
            <div className="h-10 w-10 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center font-bold mb-3 group-hover:scale-105 transition">
              <Calendar className="h-5 w-5" />
            </div>
            <h3 className="font-extrabold text-slate-900 text-base group-hover:text-blue-800 transition">
              Dynamic Slot Booking
            </h3>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              Book predictive arrival windows with AI confidence ratings instead of static fixed dates.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-blue-700">
            <span>Book or Reschedule Slot</span>
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition" />
          </div>
        </Link>

        {/* Card 3: Payment & Procurement Status */}
        <Link
          to="/farmer/payments"
          className="group bg-white hover:bg-emerald-50/50 p-5 rounded-2xl border border-slate-200 hover:border-emerald-300 transition shadow-xs hover:shadow-md flex flex-col justify-between"
        >
          <div>
            <div className="h-10 w-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold mb-3 group-hover:scale-105 transition">
              <IndianRupee className="h-5 w-5" />
            </div>
            <h3 className="font-extrabold text-slate-900 text-base group-hover:text-amber-800 transition">
              Procurement & Payments
            </h3>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              Track weighing, quality grading, e-Bill generation, and direct DBT transfer status.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-amber-800">
            <span>Track DBT Pipeline (₹76,405)</span>
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition" />
          </div>
        </Link>
      </div>
    </div>
  );
};
