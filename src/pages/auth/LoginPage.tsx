import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../features/auth/AuthContext';
import { UserRole } from '../../types';
import {
  Wheat,
  Scale,
  Building2,
  ArrowRight,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Lock
} from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<UserRole>('FARMER');
  const [phoneOrId, setPhoneOrId] = useState<string>('9845123890');
  const [otpOrPin, setOtpOrPin] = useState<string>('1234');

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(selectedRole);

    if (selectedRole === 'FARMER') {
      navigate('/farmer/dashboard');
    } else if (selectedRole === 'PROCUREMENT_OPERATOR') {
      navigate('/operator/dashboard');
    } else {
      navigate('/admin/dashboard');
    }
  };

  const roles = [
    {
      id: 'FARMER' as UserRole,
      title: 'Farmer / Raitha Seva',
      desc: 'Predictive procurement ETA, virtual queue & dynamic arrival windows',
      icon: <Wheat className="h-6 w-6 text-emerald-600" />,
      tag: 'Smart Queue',
    },
    {
      id: 'PROCUREMENT_OPERATOR' as UserRole,
      title: 'Centre Weighing Operator',
      desc: 'Weighbridge capture, moisture testing, MSP lot acceptance & billing',
      icon: <Scale className="h-6 w-6 text-blue-600" />,
      tag: 'Station #2',
    },
    {
      id: 'DISTRICT_ADMIN' as UserRole,
      title: 'District Administration',
      desc: 'Command centre, predictive heatmaps, load balancing & DBT pipeline',
      icon: <Building2 className="h-6 w-6 text-amber-600" />,
      tag: 'Mandya HQ',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background glowing gradients */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-600/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none"></div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center z-10 px-4">
        <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-tr from-emerald-600 to-green-400 text-white shadow-xl shadow-emerald-500/20 mb-3">
          <Wheat className="h-8 w-8" />
        </div>
        <h1 className="text-3xl font-black tracking-tight font-display text-white">
          KisanSetu
        </h1>
        <p className="text-xs font-semibold text-emerald-400 uppercase tracking-widest mt-1">
          Predictive Procurement & Smart Queue Management
        </p>
        <p className="text-xs text-slate-400 mt-2 max-w-sm mx-auto">
          "Existing systems tell farmers what their token is; KisanSetu tells farmers when they should actually leave home."
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-xl z-10 px-4">
        <div className="bg-slate-800/90 backdrop-blur-xl py-8 px-6 sm:px-10 rounded-3xl border border-slate-700 shadow-2xl space-y-6">
          {/* Step 1: Select Application Role */}
          <div>
            <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-300 mb-3">
              1. Select Application Role (SIH Demo Entry)
            </label>
            <div className="space-y-2.5">
              {roles.map((roleItem) => {
                const isSelected = selectedRole === roleItem.id;
                return (
                  <div
                    key={roleItem.id}
                    onClick={() => setSelectedRole(roleItem.id)}
                    className={`cursor-pointer p-3.5 rounded-2xl border-2 transition flex items-center justify-between ${
                      isSelected
                        ? 'border-emerald-500 bg-emerald-950/40 shadow-md ring-2 ring-emerald-500/30'
                        : 'border-slate-700 bg-slate-850 hover:border-slate-600'
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="p-2 rounded-xl bg-slate-900 border border-slate-700">
                        {roleItem.icon}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-extrabold text-sm text-white">{roleItem.title}</h4>
                          <span className="text-[10px] font-bold px-2 py-0.2 rounded bg-slate-700 text-slate-300">
                            {roleItem.tag}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 mt-0.5 leading-tight">{roleItem.desc}</p>
                      </div>
                    </div>

                    <div className={`h-5 w-5 rounded-full border-2 flex items-center justify-center ${
                      isSelected ? 'border-emerald-500 bg-emerald-500' : 'border-slate-600'
                    }`}>
                      {isSelected && <div className="h-2 w-2 rounded-full bg-white"></div>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleLoginSubmit} className="space-y-4 pt-2">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                {selectedRole === 'FARMER' ? 'Registered Mobile Number (Aadhaar Seeded)' : 'Employee / Operator ID'}
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={phoneOrId}
                  onChange={(e) => setPhoneOrId(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm font-semibold text-white focus:ring-2 focus:ring-emerald-500 outline-hidden"
                />
                <Smartphone className="absolute right-3.5 top-3 h-4 w-4 text-slate-500" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                {selectedRole === 'FARMER' ? 'OTP Verification Code' : 'Security Access PIN'}
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={otpOrPin}
                  onChange={(e) => setOtpOrPin(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm font-semibold text-white focus:ring-2 focus:ring-emerald-500 outline-hidden"
                />
                <Lock className="absolute right-3.5 top-3 h-4 w-4 text-slate-500" />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-sm py-3 px-4 rounded-xl shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2 transition active:scale-98"
            >
              <span>Launch {selectedRole === 'FARMER' ? 'Farmer Interface' : selectedRole === 'PROCUREMENT_OPERATOR' ? 'Operator Console' : 'District Command Centre'}</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>

          {/* Demonstration Notice */}
          <div className="pt-2 text-center">
            <span className="text-[11px] text-slate-400 flex items-center justify-center gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
              <span>SIH Demo Mode • Pre-filled test credentials active</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
