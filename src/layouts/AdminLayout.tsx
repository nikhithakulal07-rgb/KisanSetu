import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Navbar } from '../components/navigation/Navbar';
import { DemoSimulationBar } from '../components/common/DemoSimulationBar';
import { Building2, BarChart3, AlertOctagon, Map, ShieldAlert, Cpu } from 'lucide-react';

export const AdminLayout: React.FC = () => {
  const location = useLocation();

  const navLinks = [
    { to: '/admin/dashboard', label: 'Command Overview', icon: Building2 },
    { to: '/admin/centres', label: 'Centres & Capacity', icon: Map },
    { to: '/admin/analytics', label: 'Predictive Analytics', icon: BarChart3 },
    { to: '/admin/simulation', label: 'Live Simulation Lab', icon: Cpu },
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col">
      <DemoSimulationBar />
      <Navbar />
      <div className="bg-slate-950 border-b border-slate-800 py-3 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <h1 className="text-lg font-black tracking-tight text-white font-display">
                Government Procurement Command Centre
              </h1>
              <span className="bg-blue-900/60 text-blue-300 text-xs px-2 py-0.5 rounded border border-blue-700 font-semibold">
                District: Mandya
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Live Monitoring, Congestion Prediction, Inter-Centre Load Balancing & DBT Tracking
            </p>
          </div>

          <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800">
            {navLinks.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.to;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                    isActive
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Outlet />
      </main>
    </div>
  );
};
