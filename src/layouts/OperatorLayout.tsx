import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Navbar } from '../components/navigation/Navbar';
import { DemoSimulationBar } from '../components/common/DemoSimulationBar';
import { Scale, Users, FileCheck, AlertTriangle } from 'lucide-react';

export const OperatorLayout: React.FC = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 flex flex-col">
      <DemoSimulationBar />
      <Navbar />
      <div className="bg-emerald-900 text-white py-3 px-4 sm:px-8 border-b border-emerald-950">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-800 rounded-lg">
              <Scale className="h-5 w-5 text-emerald-300" />
            </div>
            <div>
              <h1 className="text-base font-bold">Mandya APMC Gejjalagere Sub-Centre (Station #2)</h1>
              <p className="text-xs text-emerald-200">Operator ID: OP-MND-402 • Duty: Weighing & Quality Intake</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 bg-emerald-800 text-emerald-100 text-xs px-3 py-1 rounded-full border border-emerald-700">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Live Weighbridge Connected
            </span>
          </div>
        </div>
      </div>
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Outlet />
      </main>
    </div>
  );
};
