import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../features/auth/AuthContext';
import { useTranslation } from '../../i18n/I18nContext';
import { useNotifications, useActiveBooking } from '../../hooks/useRealtimeData';
import { Language } from '../../i18n/translations';
import { UserRole } from '../../types';
import {
  Bell,
  Globe,
  User,
  Shield,
  Layers,
  ChevronDown,
  Wheat,
  Clock,
  Sparkles,
  Menu,
  X
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { role, setRole, farmer } = useAuth();
  const { language, setLanguage, t } = useTranslation();
  const notifications = useNotifications();
  const booking = useActiveBooking();
  const location = useLocation();

  const [isRoleMenuOpen, setIsRoleMenuOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const roles: { role: UserRole; label: string; desc: string; icon: string }[] = [
    {
      role: 'FARMER',
      label: 'Farmer View',
      desc: 'Predictive ETA, smart queue & arrival windows',
      icon: '🌾',
    },
    {
      role: 'PROCUREMENT_OPERATOR',
      label: 'Centre Operator View',
      desc: 'Weighing platform, grading & bill generation',
      icon: '⚖️',
    },
    {
      role: 'DISTRICT_ADMIN',
      label: 'District Command Centre',
      desc: 'Heatmaps, capacity risk & AI congestion predictions',
      icon: '🏛️',
    },
  ];

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo & Name */}
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-emerald-700 to-green-500 flex items-center justify-center text-white shadow-md shadow-emerald-500/20 group-hover:scale-105 transition">
                <Wheat className="h-6 w-6" />
              </div>
              <div>
                <span className="text-xl font-black tracking-tight text-slate-900 flex items-center gap-1.5 font-display">
                  <span>KisanSetu</span>
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded">
                    Gov AgriTech
                  </span>
                </span>
                <p className="text-[10px] text-slate-500 font-medium hidden sm:block">
                  Predictive Procurement & Smart Queue System
                </p>
              </div>
            </Link>
          </div>

          {/* Center Navigation for current role (Desktop) */}
          <nav className="hidden md:flex items-center gap-1 text-sm font-medium">
            {role === 'FARMER' && (
              <>
                <Link
                  to="/farmer/dashboard"
                  className={`px-3 py-1.5 rounded-lg transition ${
                    location.pathname === '/farmer/dashboard'
                      ? 'bg-emerald-50 text-emerald-700 font-bold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  Dashboard
                </Link>
                <Link
                  to="/farmer/centres"
                  className={`px-3 py-1.5 rounded-lg transition ${
                    location.pathname === '/farmer/centres'
                      ? 'bg-emerald-50 text-emerald-700 font-bold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  Centres & Slots
                </Link>
                <Link
                  to="/farmer/queue"
                  className={`px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 ${
                    location.pathname === '/farmer/queue'
                      ? 'bg-emerald-600 text-white font-bold shadow-sm'
                      : 'text-emerald-700 font-bold hover:bg-emerald-50'
                  }`}
                >
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  Virtual Queue
                </Link>
                <Link
                  to="/farmer/procurement"
                  className={`px-3 py-1.5 rounded-lg transition ${
                    location.pathname === '/farmer/procurement'
                      ? 'bg-emerald-50 text-emerald-700 font-bold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  Procurement
                </Link>
                <Link
                  to="/farmer/payments"
                  className={`px-3 py-1.5 rounded-lg transition ${
                    location.pathname === '/farmer/payments'
                      ? 'bg-emerald-50 text-emerald-700 font-bold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  Payments
                </Link>
              </>
            )}

            {role === 'PROCUREMENT_OPERATOR' && (
              <>
                <Link
                  to="/operator/dashboard"
                  className="px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 font-bold"
                >
                  Operator Console
                </Link>
              </>
            )}

            {(role === 'DISTRICT_ADMIN' || role === 'SUPER_ADMIN') && (
              <>
                <Link
                  to="/admin/dashboard"
                  className="px-3 py-1.5 rounded-lg bg-slate-900 text-white font-bold shadow-sm"
                >
                  Admin Command Centre
                </Link>
              </>
            )}
          </nav>

          {/* Right Action Controls: Language, Role Switcher, Notifications, Profile */}
          <div className="flex items-center gap-2">
            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => {
                  setIsLangMenuOpen(!isLangMenuOpen);
                  setIsRoleMenuOpen(false);
                }}
                className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 transition"
                title="Change language"
              >
                <Globe className="h-3.5 w-3.5 text-slate-500" />
                <span className="uppercase">{language}</span>
                <ChevronDown className="h-3 w-3 text-slate-400" />
              </button>

              {isLangMenuOpen && (
                <div className="absolute right-0 mt-2 w-36 bg-white rounded-xl shadow-lg border border-slate-100 py-1 z-50 animate-in fade-in zoom-in-95">
                  <button
                    onClick={() => {
                      setLanguage('en');
                      setIsLangMenuOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between ${
                      language === 'en' ? 'bg-emerald-50 text-emerald-800 font-bold' : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span>English</span>
                    {language === 'en' && '✓'}
                  </button>
                  <button
                    onClick={() => {
                      setLanguage('hi');
                      setIsLangMenuOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between ${
                      language === 'hi' ? 'bg-emerald-50 text-emerald-800 font-bold' : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span>हिन्दी (Hindi)</span>
                    {language === 'hi' && '✓'}
                  </button>
                  <button
                    onClick={() => {
                      setLanguage('kn');
                      setIsLangMenuOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between ${
                      language === 'kn' ? 'bg-emerald-50 text-emerald-800 font-bold' : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span>ಕನ್ನಡ (Kannada)</span>
                    {language === 'kn' && '✓'}
                  </button>
                </div>
              )}
            </div>

            {/* Role Switcher (SIH Interactive Demo Dropdown) */}
            <div className="relative">
              <button
                onClick={() => {
                  setIsRoleMenuOpen(!isRoleMenuOpen);
                  setIsLangMenuOpen(false);
                }}
                className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 transition"
              >
                <Layers className="h-3.5 w-3.5 text-emerald-600" />
                <span className="hidden sm:inline">Role:</span>
                <span className="text-emerald-800">
                  {role === 'FARMER' ? 'Farmer' : role === 'PROCUREMENT_OPERATOR' ? 'Operator' : 'Admin'}
                </span>
                <ChevronDown className="h-3 w-3 text-slate-500" />
              </button>

              {isRoleMenuOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-2xl border border-slate-200 py-2 z-50">
                  <div className="px-3 py-1.5 border-b border-slate-100">
                    <span className="text-[10px] font-extrabold uppercase text-slate-400 tracking-wider">
                      Switch Role Interface (SIH Demo)
                    </span>
                  </div>
                  {roles.map((r) => (
                    <button
                      key={r.role}
                      onClick={() => {
                        setRole(r.role);
                        setIsRoleMenuOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2.5 transition flex items-start gap-2.5 ${
                        role === r.role ? 'bg-emerald-50 text-emerald-950' : 'hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      <span className="text-xl">{r.icon}</span>
                      <div>
                        <div className="font-bold text-xs flex items-center gap-1">
                          {r.label}
                          {role === r.role && (
                            <span className="text-[10px] bg-emerald-600 text-white px-1.5 py-0.2 rounded font-bold">
                              Active
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-500 leading-tight mt-0.5">{r.desc}</p>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Notification Bell */}
            <Link
              to="/farmer/notifications"
              className="relative p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition"
              title="Notifications"
            >
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-600 text-[10px] font-extrabold text-white">
                  {unreadCount}
                </span>
              )}
            </Link>

            {/* Farmer Profile Pill */}
            <Link
              to="/farmer/profile"
              className="hidden lg:flex items-center gap-2 pl-2 border-l border-slate-200"
            >
              <div className="h-8 w-8 rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-800 font-bold text-xs">
                RP
              </div>
              <div className="text-left text-xs">
                <span className="font-bold text-slate-800 block leading-tight">{farmer.name}</span>
                <span className="text-[10px] text-slate-500 block">{farmer.village}</span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};
