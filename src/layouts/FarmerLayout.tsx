import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '../components/navigation/Navbar';
import { FarmerBottomNav } from '../components/navigation/FarmerBottomNav';
import { DemoSimulationBar } from '../components/common/DemoSimulationBar';

export const FarmerLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col pb-16 md:pb-0">
      <DemoSimulationBar />
      <Navbar />
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <Outlet />
      </main>
      <FarmerBottomNav />
    </div>
  );
};
