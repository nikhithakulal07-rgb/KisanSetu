import React from 'react';
import { useAuth } from '../../features/auth/AuthContext';
import {
  User,
  MapPin,
  FileCheck,
  Building2,
  Wheat,
  ShieldCheck,
  Smartphone,
  CreditCard,
  Layers
} from 'lucide-react';

export const FarmerProfile: React.FC = () => {
  const { farmer } = useAuth();

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 uppercase tracking-wider mb-1">
          <User className="h-4 w-4" />
          <span>Government Land & Farmer Registry</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 font-display">
          Farmer Profile & Bank Seeding
        </h1>
        <p className="text-sm text-slate-600 mt-1">
          Verified through Karnataka FRUITS (Farmer Registration and Unified Beneficiary Information System).
        </p>
      </div>

      {/* Profile Card */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
        <div className="flex items-center gap-4 border-b border-slate-100 pb-6">
          <div className="h-16 w-16 rounded-2xl bg-emerald-700 text-white flex items-center justify-center text-2xl font-black shadow-md">
            RP
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-extrabold text-slate-900">{farmer.name}</h2>
              <span className="bg-emerald-100 text-emerald-800 text-[10px] font-extrabold px-2 py-0.5 rounded-md flex items-center gap-1">
                <ShieldCheck className="h-3 w-3" /> FRUITS Verified
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              FRUITS ID: <strong className="font-mono text-slate-800">{farmer.farmerId}</strong> • Aadhaar: <span className="font-mono">{farmer.aadhaarMasked}</span>
            </p>
          </div>
        </div>

        {/* Section 1: Land & Crop Registration */}
        <div>
          <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 mb-3">
            Agricultural Holdings & Crop Details
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
            <div className="bg-slate-50 p-3 rounded-xl">
              <span className="text-slate-500 block">Village & Taluk</span>
              <strong className="text-slate-900 font-bold">{farmer.village}, {farmer.taluk}</strong>
            </div>
            <div className="bg-slate-50 p-3 rounded-xl">
              <span className="text-slate-500 block">District & State</span>
              <strong className="text-slate-900 font-bold">{farmer.district}, {farmer.state}</strong>
            </div>
            <div className="bg-slate-50 p-3 rounded-xl">
              <span className="text-slate-500 block">Registered Land</span>
              <strong className="text-slate-900 font-bold">{farmer.landSizeAcres} Acres (Irrigated)</strong>
            </div>
            <div className="bg-slate-50 p-3 rounded-xl">
              <span className="text-slate-500 block">Primary Crop</span>
              <strong className="text-emerald-800 font-bold">{farmer.primaryCrop}</strong>
            </div>
            <div className="bg-slate-50 p-3 rounded-xl">
              <span className="text-slate-500 block">Mobile Contact</span>
              <strong className="text-slate-900 font-bold">{farmer.phone}</strong>
            </div>
            <div className="bg-slate-50 p-3 rounded-xl">
              <span className="text-slate-500 block">Mandya APMC Circle</span>
              <strong className="text-slate-900 font-bold">Zone 4 (South)</strong>
            </div>
          </div>
        </div>

        {/* Section 2: Direct Benefit Transfer Bank Account */}
        <div className="border-t border-slate-100 pt-5">
          <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
            <CreditCard className="h-4 w-4 text-emerald-700" />
            <span>Aadhaar Seeded Bank Details (Direct MSP Deposit)</span>
          </h3>
          <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div>
              <span className="text-slate-500 block">Bank Name</span>
              <strong className="text-emerald-950 font-bold">{farmer.bankName}</strong>
            </div>
            <div>
              <span className="text-slate-500 block">Masked Account Number</span>
              <strong className="text-emerald-950 font-mono font-bold">{farmer.bankAccountMasked}</strong>
            </div>
            <div>
              <span className="text-slate-500 block">IFSC Code</span>
              <strong className="text-emerald-950 font-mono font-bold">{farmer.ifscCode}</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
