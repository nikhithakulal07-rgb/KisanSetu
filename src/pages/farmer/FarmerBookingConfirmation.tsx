import React from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { useActiveBooking, useCentres } from '../../hooks/useRealtimeData';
import { useAuth } from '../../features/auth/AuthContext';
import {
  CheckCircle2,
  Navigation,
  Clock,
  MapPin,
  FileText,
  ArrowRight,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Share2,
  Download
} from 'lucide-react';

export const FarmerBookingConfirmation: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { farmer } = useAuth();
  const booking = useActiveBooking();
  const centres = useCentres();

  const centre = centres.find((c) => c.id === booking.centreId) || centres[1];

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Success Notification Banner */}
      <div className="bg-emerald-600 text-white rounded-2xl p-6 shadow-xl text-center relative overflow-hidden">
        <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-white text-emerald-700 mb-3 shadow-inner">
          <CheckCircle2 className="h-8 w-8" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold font-display">
          Arrival Window Allocated!
        </h1>
        <p className="text-emerald-100 text-sm mt-1 max-w-md mx-auto">
          Your dynamic procurement token has been assigned. Please wait at home until notified.
        </p>
      </div>

      {/* Digital Smart Token Card */}
      <div className="bg-white rounded-2xl border-2 border-slate-200 shadow-md p-6 relative overflow-hidden">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 block">
              Govt Procurement Token
            </span>
            <span className="text-3xl font-black text-slate-900 font-mono tracking-tight mt-0.5 block">
              {booking.tokenNumber}
            </span>
          </div>

          <div className="text-right">
            <span className="inline-block bg-amber-100 text-amber-900 border border-amber-300 font-extrabold text-xs px-3 py-1 rounded-lg">
              WAIT AT HOME
            </span>
            <span className="block text-[10px] text-slate-400 mt-1">Live Virtual Queue Active</span>
          </div>
        </div>

        {/* Dynamic Arrival Window Highlight */}
        <div className="my-5 p-4 rounded-xl bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50 border border-emerald-200">
          <span className="text-xs font-extrabold uppercase tracking-wide text-emerald-800 flex items-center gap-1.5">
            <Navigation className="h-4 w-4 text-emerald-700" />
            Dynamic Arrival Window
          </span>
          <div className="text-2xl font-black text-emerald-950 mt-1">
            {booking.dynamicArrivalWindow.start} – {booking.dynamicArrivalWindow.end}
          </div>
          <p className="text-xs text-emerald-800 font-medium mt-1">
            Expected arrival at centre gate. You will receive an SMS when 4 farmers remain ahead of you.
          </p>
        </div>

        {/* Details List */}
        <div className="grid grid-cols-2 gap-3 text-xs border-t border-slate-100 pt-4">
          <div>
            <span className="text-slate-500 block">Farmer Name:</span>
            <strong className="text-slate-900 text-sm font-bold">{farmer.name}</strong>
          </div>
          <div>
            <span className="text-slate-500 block">Farmer ID:</span>
            <strong className="text-slate-900 text-sm font-mono">{farmer.farmerId}</strong>
          </div>
          <div>
            <span className="text-slate-500 block">Procurement Centre:</span>
            <strong className="text-slate-900 font-bold">{centre.name}</strong>
          </div>
          <div>
            <span className="text-slate-500 block">Crop & Expected Lot:</span>
            <strong className="text-slate-900 font-bold">{booking.cropType} ({booking.expectedQuantityQuintals} Qtl)</strong>
          </div>
          <div>
            <span className="text-slate-500 block">Initial Queue Position:</span>
            <strong className="text-slate-900 font-bold">#{booking.currentPositionInQueue} ({booking.farmersAhead} ahead)</strong>
          </div>
          <div>
            <span className="text-slate-500 block">Est. Road Transit Time:</span>
            <strong className="text-slate-900 font-bold">22 mins from Keregodu</strong>
          </div>
        </div>

        {/* Advisory Guidance */}
        <div className="mt-5 p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700 space-y-1">
          <div className="font-bold flex items-center gap-1.5 text-slate-900">
            <Sparkles className="h-3.5 w-3.5 text-amber-600" />
            <span>KisanSetu Smart Queue Guidance:</span>
          </div>
          <p className="leading-relaxed">
            1. You do not need to stand in physical queue under the sun.<br />
            2. The live virtual queue updates automatically as batches are weighed.<br />
            3. When your status changes to <strong>"START TRAVELLING"</strong>, proceed with your transport vehicle.
          </p>
        </div>

        {/* CTAs */}
        <div className="mt-6 flex flex-col sm:flex-row items-center gap-3">
          <Link
            to="/farmer/queue"
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm py-3 px-4 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 transition"
          >
            <span>Open Live Virtual Queue</span>
            <ArrowRight className="h-4 w-4" />
          </Link>

          <Link
            to="/farmer/dashboard"
            className="w-full sm:w-auto px-5 py-3 rounded-xl border border-slate-300 text-slate-700 font-bold text-sm hover:bg-slate-100 text-center transition"
          >
            Return to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};
