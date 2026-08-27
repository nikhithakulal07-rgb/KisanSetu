import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useCentres } from '../../hooks/useRealtimeData';
import { useAuth } from '../../features/auth/AuthContext';
import { farmerApi, centresApi } from '../../services/apiServices';
import { DynamicSlot, ProcurementCentre } from '../../types';
import {
  Clock,
  Navigation,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Truck,
  Wheat,
  Info,
  Calendar,
  AlertCircle
} from 'lucide-react';

export const FarmerBooking: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { farmer } = useAuth();
  const centres = useCentres();

  const centreIdParam = searchParams.get('centreId');
  const [selectedCentreId, setSelectedCentreId] = useState<string>(
    centreIdParam || centres.find((c) => c.isRecommended)?.id || centres[1]?.id || 'centre-b'
  );

  const [slots, setSlots] = useState<DynamicSlot[]>([]);
  const [selectedSlotId, setSelectedSlotId] = useState<string>('');
  const [cropQuantity, setCropQuantity] = useState<number>(35);
  const [cropVariety, setCropVariety] = useState<string>('JGL 1798 (BPT-5204)');
  const [vehicleType, setVehicleType] = useState<string>('Tractor Trolley (Single Axle)');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const activeCentre = centres.find((c) => c.id === selectedCentreId) || centres[0];

  useEffect(() => {
    let isMounted = true;
    centresApi.getAvailableSlots(selectedCentreId).then((data) => {
      if (isMounted) {
        setSlots(data);
        if (data.length > 0) {
          const rec = data.find((s) => s.isRecommendedSlot) || data[0];
          setSelectedSlotId(rec.id);
        }
      }
    });
    return () => {
      isMounted = false;
    };
  }, [selectedCentreId]);

  const selectedSlot = slots.find((s) => s.id === selectedSlotId) || slots[0];

  const handleConfirmBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSlot) return;

    setIsSubmitting(true);
    try {
      const newBooking = await farmerApi.createBooking({
        centreId: activeCentre.id,
        cropType: farmer.primaryCrop,
        variety: cropVariety,
        expectedQuantityQuintals: cropQuantity,
        scheduledArrivalWindow: {
          start: selectedSlot.arrivalWindowStart,
          end: selectedSlot.arrivalWindowEnd,
        },
        dynamicArrivalWindow: {
          start: selectedSlot.arrivalWindowStart,
          end: selectedSlot.arrivalWindowEnd,
        },
      });

      navigate('/farmer/booking/confirmation', {
        state: { booking: newBooking, slot: selectedSlot, centre: activeCentre },
      });
    } catch (err) {
      console.error('Booking failed', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 uppercase tracking-wider mb-1">
          <Calendar className="h-4 w-4" />
          <span>Intelligent Arrival Window Allocation</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
          Dynamic Arrival Slot Selection
        </h1>
        <p className="text-sm text-slate-600 mt-1">
          KisanSetu uses dynamic arrival <strong>windows</strong> (e.g. 10:30 AM – 11:00 AM) with confidence scoring instead of rigid static tokens.
        </p>
      </div>

      <form onSubmit={handleConfirmBooking} className="space-y-6">
        {/* Step 1: Choose Centre */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
            <span className="h-6 w-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center text-xs font-extrabold">1</span>
            <span>Target Procurement Centre</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {centres.map((centre) => (
              <div
                key={centre.id}
                onClick={() => setSelectedCentreId(centre.id)}
                className={`cursor-pointer p-4 rounded-xl border transition flex flex-col justify-between ${
                  selectedCentreId === centre.id
                    ? 'border-emerald-600 bg-emerald-50/50 ring-2 ring-emerald-500/20'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">{centre.name}</h3>
                    <p className="text-xs text-slate-500 mt-0.5">{centre.distanceKm} km away • {centre.district}</p>
                  </div>
                  {centre.isRecommended && (
                    <span className="bg-emerald-600 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full shrink-0">
                      ★ Best Match
                    </span>
                  )}
                </div>

                <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
                  <span>Wait: <strong>~{Math.floor(centre.averageWaitMinutes / 60)}h {centre.averageWaitMinutes % 60}m</strong></span>
                  <span>Load: <strong>{centre.capacityUtilizationPercent}%</strong></span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Step 2: Select Dynamic Arrival Window (HERO) */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
              <span className="h-6 w-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center text-xs font-extrabold">2</span>
              <span>Available Dynamic Arrival Windows (Today)</span>
            </h2>
            <span className="text-xs text-slate-500 flex items-center gap-1">
              <Info className="h-3.5 w-3.5" /> Windows adapt to live weighing speed
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {slots.map((slot) => {
              const isSelected = selectedSlotId === slot.id;
              const isHighConfidence = slot.confidenceScore === 'HIGH';

              return (
                <div
                  key={slot.id}
                  onClick={() => setSelectedSlotId(slot.id)}
                  className={`cursor-pointer rounded-xl p-4 border-2 transition-all relative ${
                    isSelected
                      ? 'border-emerald-600 bg-emerald-50/70 shadow-md ring-2 ring-emerald-500/20'
                      : 'border-slate-200 hover:border-emerald-300 bg-slate-50/50'
                  }`}
                >
                  {slot.isRecommendedSlot && (
                    <span className="absolute -top-2.5 right-3 bg-emerald-700 text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded-full shadow-xs flex items-center gap-1">
                      <Sparkles className="h-3 w-3" /> Recommended Window
                    </span>
                  )}

                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                        Arrival Window
                      </span>
                      <div className="text-lg font-black text-slate-900 flex items-center gap-1.5 mt-0.5">
                        <Navigation className="h-4 w-4 text-emerald-700" />
                        <span>{slot.arrivalWindowStart} – {slot.arrivalWindowEnd}</span>
                      </div>
                    </div>

                    <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-md ${
                      isHighConfidence ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {slot.confidenceScore} Confidence
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-slate-200/60 text-xs">
                    <div>
                      <span className="text-slate-500 text-[11px] block">Expected Waiting</span>
                      <strong className="text-slate-800 font-bold flex items-center gap-1 mt-0.5">
                        <Clock className="h-3.5 w-3.5 text-slate-400" />
                        <span>{slot.expectedWaitMinutes} minutes</span>
                      </strong>
                    </div>
                    <div>
                      <span className="text-slate-500 text-[11px] block">Slot Quota</span>
                      <strong className="text-slate-800 font-bold mt-0.5 block">
                        {slot.bookedTokens}/{slot.maxTokens} tokens
                      </strong>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Step 3: Harvest Lot & Vehicle Details */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
            <span className="h-6 w-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center text-xs font-extrabold">3</span>
            <span>Harvest Lot & Transport Details</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Crop & Grade
              </label>
              <input
                type="text"
                disabled
                value={farmer.primaryCrop}
                className="w-full bg-slate-100 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Expected Quantity (Quintals)
              </label>
              <input
                type="number"
                min={5}
                max={200}
                value={cropQuantity}
                onChange={(e) => setCropQuantity(Number(e.target.value))}
                className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold text-slate-900 focus:ring-2 focus:ring-emerald-500 outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Transport Vehicle Type
              </label>
              <select
                value={vehicleType}
                onChange={(e) => setVehicleType(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:ring-2 focus:ring-emerald-500 outline-hidden"
              >
                <option value="Tractor Trolley (Single Axle)">Tractor Trolley (Single Axle)</option>
                <option value="Mini Truck / Tata Ace">Mini Truck / Commercial (Small)</option>
                <option value="Large Truck (6-Wheeler)">Large Multi-Axle Truck</option>
                <option value="Bullock Cart">Bullock Cart / Animal Driven</option>
              </select>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex items-center justify-between gap-4 pt-2">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-bold text-sm hover:bg-slate-100 transition"
          >
            Back
          </button>

          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 max-w-md bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm py-3 px-6 rounded-xl shadow-lg hover:shadow-emerald-600/30 flex items-center justify-center gap-2 transition disabled:opacity-50"
          >
            <span>Confirm Dynamic Arrival Window</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </form>
    </div>
  );
};
