import React from 'react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import {
  BarChart3,
  TrendingUp,
  Clock,
  CheckCircle2,
  Users,
  ShieldCheck,
  IndianRupee,
  Cpu
} from 'lucide-react';

export const AdminAnalytics: React.FC = () => {
  // Chart 1: Hourly Intake Telemetry (Farmers Processed vs Scheduled)
  const hourlyData = [
    { time: '08:00', scheduled: 80, processed: 65, waitMinutes: 20 },
    { time: '09:00', scheduled: 140, processed: 130, waitMinutes: 28 },
    { time: '10:00', scheduled: 210, processed: 195, waitMinutes: 38 },
    { time: '11:00', scheduled: 280, processed: 250, waitMinutes: 52 },
    { time: '12:00', scheduled: 240, processed: 230, waitMinutes: 44 },
    { time: '13:00', scheduled: 150, processed: 145, waitMinutes: 30 },
    { time: '14:00', scheduled: 220, processed: 210, waitMinutes: 41 },
    { time: '15:00', scheduled: 260, processed: 245, waitMinutes: 48 },
    { time: '16:00', scheduled: 190, processed: 180, waitMinutes: 34 },
    { time: '17:00', scheduled: 110, processed: 105, waitMinutes: 22 },
  ];

  // Chart 2: Centre Capacity & Load Utilization
  const centreLoadData = [
    { name: 'Mandya APMC Yard', capacity: 5000, current: 4600, queue: 87, wait: 240 },
    { name: 'Gejjalagere Sub-Centre', capacity: 3500, current: 2135, queue: 31, wait: 100 },
    { name: 'Maddur Raitha Seva', capacity: 4000, current: 1680, queue: 14, wait: 55 },
    { name: 'Srirangapatna Terminal', capacity: 3000, current: 2550, queue: 52, wait: 165 },
  ];

  // Chart 3: Prediction Accuracy (Predicted Arrival vs Actual Arrival Time Error in mins)
  const predictionAccuracyData = [
    { errorRange: '< 5 mins error', farmersCount: 5120, percentage: 68 },
    { errorRange: '5 - 10 mins', farmersCount: 1640, percentage: 22 },
    { errorRange: '10 - 20 mins', farmersCount: 580, percentage: 8 },
    { errorRange: '> 20 mins (Delays)', farmersCount: 150, percentage: 2 },
  ];

  // Chart 4: Slot Utilization & No-Show Rate
  const slotEfficiencyData = [
    { metric: 'On-Time Arrival (Window Match)', rate: 91.4, fill: '#10b981' },
    { metric: 'Rescheduled via KisanSetu', rate: 6.2, fill: '#3b82f6' },
    { metric: 'No-Show / Unreported', rate: 2.4, fill: '#f43f5e' },
  ];

  const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444'];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1">
          <BarChart3 className="h-4 w-4" />
          <span>Predictive AI Telemetry & Throughput</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-white font-display">
          District Procurement Analytics & Model Performance
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Evaluation metrics for queue reduction, dynamic slot compliance, and DBT disbursements.
        </p>
      </div>

      {/* Row 1: Hourly Throughput & Waiting Time Curve */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 bg-slate-800 p-5 rounded-3xl border border-slate-700 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-extrabold text-white">
                Hourly Throughput (Scheduled Windows vs Actual Processed)
              </h3>
              <p className="text-xs text-slate-400">Comparing slot intake with weighing gate completions</p>
            </div>
            <span className="text-[10px] bg-slate-700 text-emerald-300 font-bold px-2.5 py-1 rounded-full">
              Live Mandya District Feed
            </span>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={hourlyData}>
                <defs>
                  <linearGradient id="colorScheduled" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorProcessed" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.6}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="time" stroke="#94a3b8" fontSize={11} />
                <YAxis stroke="#94a3b8" fontSize={11} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '0.75rem', color: '#fff', fontSize: '12px' }}
                />
                <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '8px' }} />
                <Area type="monotone" dataKey="scheduled" name="Scheduled Farmers" stroke="#3b82f6" fillOpacity={1} fill="url(#colorScheduled)" />
                <Area type="monotone" dataKey="processed" name="Weighed & Processed" stroke="#10b981" fillOpacity={1} fill="url(#colorProcessed)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Prediction Error Histogram */}
        <div className="lg:col-span-4 bg-slate-800 p-5 rounded-3xl border border-slate-700 space-y-4">
          <div>
            <h3 className="text-sm font-extrabold text-white flex items-center gap-1.5">
              <Cpu className="h-4 w-4 text-emerald-400" />
              <span>ETA Prediction Accuracy</span>
            </h3>
            <p className="text-xs text-slate-400">Deviation between predicted arrival window and actual gate entry</p>
          </div>

          <div className="space-y-3 pt-2 text-xs">
            {predictionAccuracyData.map((item, idx) => (
              <div key={item.errorRange} className="space-y-1">
                <div className="flex justify-between text-slate-300">
                  <span>{item.errorRange}</span>
                  <strong className="text-white">{item.percentage}% ({item.farmersCount.toLocaleString()} farmers)</strong>
                </div>
                <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${item.percentage}%`,
                      backgroundColor: COLORS[idx % COLORS.length],
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 bg-emerald-950/40 border border-emerald-700/60 rounded-xl text-emerald-300 text-xs">
            <strong>Model Precision: 90.0%</strong> of farmers arrived within ±10 minutes of their dynamic arrival window.
          </div>
        </div>
      </div>

      {/* Row 2: Capacity Comparison & Slot Compliance */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Centre Capacity Utilization Comparison */}
        <div className="lg:col-span-7 bg-slate-800 p-5 rounded-3xl border border-slate-700 space-y-4">
          <div>
            <h3 className="text-sm font-extrabold text-white">Centre Storage & Queue Congestion</h3>
            <p className="text-xs text-slate-400">Quintals stored vs Daily Capacity Limit</p>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={centreLoadData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={10} tickFormatter={(v) => v.split(' ')[0]} />
                <YAxis stroke="#94a3b8" fontSize={11} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '0.75rem', color: '#fff', fontSize: '12px' }}
                />
                <Legend wrapperStyle={{ fontSize: '12px' }} />
                <Bar dataKey="capacity" name="Max Capacity (Qtl)" fill="#475569" radius={[4, 4, 0, 0]} />
                <Bar dataKey="current" name="Current Stock (Qtl)" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Slot Compliance & No-Show */}
        <div className="lg:col-span-5 bg-slate-800 p-5 rounded-3xl border border-slate-700 space-y-4">
          <div>
            <h3 className="text-sm font-extrabold text-white">Slot Compliance & No-Show Rates</h3>
            <p className="text-xs text-slate-400">Reduction in roadside congestion compared to static tokens</p>
          </div>

          <div className="space-y-4 pt-2 text-xs">
            <div className="p-3.5 bg-slate-900 rounded-2xl border border-slate-750 flex items-center justify-between">
              <div>
                <span className="text-slate-400 block text-[11px]">On-Time Window Compliance</span>
                <strong className="text-emerald-400 text-lg font-black font-display">91.4%</strong>
              </div>
              <span className="text-[10px] text-emerald-400 bg-emerald-950 px-2 py-1 rounded font-bold border border-emerald-800">
                +34% vs Static Tokens
              </span>
            </div>

            <div className="p-3.5 bg-slate-900 rounded-2xl border border-slate-750 flex items-center justify-between">
              <div>
                <span className="text-slate-400 block text-[11px]">No-Show / Unreported Rate</span>
                <strong className="text-rose-400 text-lg font-black font-display">2.4%</strong>
              </div>
              <span className="text-[10px] text-rose-400 bg-rose-950 px-2 py-1 rounded font-bold border border-rose-800">
                Reduced from 19.8%
              </span>
            </div>

            <div className="p-3.5 bg-slate-900 rounded-2xl border border-slate-750 flex items-center justify-between">
              <div>
                <span className="text-slate-400 block text-[11px]">Avg Idle Transit Wait Saved</span>
                <strong className="text-blue-400 text-lg font-black font-display">3.2 Hours / Farmer</strong>
              </div>
              <span className="text-[10px] text-blue-400 bg-blue-950 px-2 py-1 rounded font-bold border border-blue-800">
                KisanSetu Impact
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
