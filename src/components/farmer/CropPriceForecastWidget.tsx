import React, { useState } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  CartesianGrid
} from 'recharts';
import {
  TrendingUp,
  Clock,
  Sparkles,
  Calendar,
  IndianRupee,
  ShieldCheck,
  ArrowUpRight,
  ArrowDownRight,
  CheckCircle2,
  Wheat,
  Info,
  ChevronRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface CropPriceData {
  id: string;
  name: string;
  category: string;
  icon: string;
  unit: string;
  mspRate: number;
  pastWeek: number;
  yesterday: number;
  today: number;
  tomorrow: number;
  nextWeek: number;
  forecastChangePercent: number;
  trend: 'up' | 'down' | 'steady';
  marketAdvisory: string;
  bestArrivalDay: string;
  historicalChartData: {
    period: string;
    label: string;
    price: number;
    isForecast?: boolean;
  }[];
}

const cropList: CropPriceData[] = [
  {
    id: 'paddy',
    name: 'Paddy (Grade A)',
    category: 'Cereals / Kharif',
    icon: '🌾',
    unit: 'Quintal',
    mspRate: 2183,
    pastWeek: 2120,
    yesterday: 2165,
    today: 2183,
    tomorrow: 2205,
    nextWeek: 2260,
    forecastChangePercent: +3.5,
    trend: 'up',
    marketAdvisory: 'Mandya & Mysuru APMC procurement mills running at high intake. Predicted price appreciation of +₹77/Qtl over the next 7 days.',
    bestArrivalDay: 'Thursday to Saturday (Peak Rates)',
    historicalChartData: [
      { period: '1 Week Ago', label: 'Past (-7d)', price: 2120, isForecast: false },
      { period: 'Yesterday', label: 'Yesterday (-1d)', price: 2165, isForecast: false },
      { period: 'Today', label: 'Today (Live MSP)', price: 2183, isForecast: false },
      { period: 'Tomorrow', label: 'Tomorrow (+1d)', price: 2205, isForecast: true },
      { period: 'In 1 Week', label: 'Next Week (+7d)', price: 2260, isForecast: true },
    ],
  },
  {
    id: 'ragi',
    name: 'Ragi (Finger Millet)',
    category: 'Millets / Nutri-Cereal',
    icon: '🥣',
    unit: 'Quintal',
    mspRate: 3846,
    pastWeek: 3780,
    yesterday: 3830,
    today: 3846,
    tomorrow: 3875,
    nextWeek: 3950,
    forecastChangePercent: +2.7,
    trend: 'up',
    marketAdvisory: 'Govt Nutri-Grain public distribution procurement active. High demand across South Karnataka centres.',
    bestArrivalDay: 'Wednesday onwards',
    historicalChartData: [
      { period: '1 Week Ago', label: 'Past (-7d)', price: 3780, isForecast: false },
      { period: 'Yesterday', label: 'Yesterday (-1d)', price: 3830, isForecast: false },
      { period: 'Today', label: 'Today (Live MSP)', price: 3846, isForecast: false },
      { period: 'Tomorrow', label: 'Tomorrow (+1d)', price: 3875, isForecast: true },
      { period: 'In 1 Week', label: 'Next Week (+7d)', price: 3950, isForecast: true },
    ],
  },
  {
    id: 'wheat',
    name: 'Wheat (Sharbati/Lokwan)',
    category: 'Cereals / Rabi',
    icon: '🥖',
    unit: 'Quintal',
    mspRate: 2275,
    pastWeek: 2230,
    yesterday: 2260,
    today: 2275,
    tomorrow: 2300,
    nextWeek: 2360,
    forecastChangePercent: +3.7,
    trend: 'up',
    marketAdvisory: 'Buffer stock replenishment by Food Corporation. Premium rates expected for moisture levels below 12.5%.',
    bestArrivalDay: 'Friday morning windows',
    historicalChartData: [
      { period: '1 Week Ago', label: 'Past (-7d)', price: 2230, isForecast: false },
      { period: 'Yesterday', label: 'Yesterday (-1d)', price: 2260, isForecast: false },
      { period: 'Today', label: 'Today (Live MSP)', price: 2275, isForecast: false },
      { period: 'Tomorrow', label: 'Tomorrow (+1d)', price: 2300, isForecast: true },
      { period: 'In 1 Week', label: 'Next Week (+7d)', price: 2360, isForecast: true },
    ],
  },
  {
    id: 'maize',
    name: 'Maize (Yellow Corn)',
    category: 'Feed / Industrial',
    icon: '🌽',
    unit: 'Quintal',
    mspRate: 2090,
    pastWeek: 2040,
    yesterday: 2075,
    today: 2090,
    tomorrow: 2110,
    nextWeek: 2150,
    forecastChangePercent: +2.9,
    trend: 'up',
    marketAdvisory: 'Starch & poultry feed industry demand steady. Stable upward forecast across Mandya APMC yards.',
    bestArrivalDay: 'Thursday slots',
    historicalChartData: [
      { period: '1 Week Ago', label: 'Past (-7d)', price: 2040, isForecast: false },
      { period: 'Yesterday', label: 'Yesterday (-1d)', price: 2075, isForecast: false },
      { period: 'Today', label: 'Today (Live MSP)', price: 2090, isForecast: false },
      { period: 'Tomorrow', label: 'Tomorrow (+1d)', price: 2110, isForecast: true },
      { period: 'In 1 Week', label: 'Next Week (+7d)', price: 2150, isForecast: true },
    ],
  },
  {
    id: 'soybean',
    name: 'Soybean (Yellow)',
    category: 'Oilseeds',
    icon: '🌱',
    unit: 'Quintal',
    mspRate: 4600,
    pastWeek: 4490,
    yesterday: 4565,
    today: 4600,
    tomorrow: 4650,
    nextWeek: 4780,
    forecastChangePercent: +3.9,
    trend: 'up',
    marketAdvisory: 'Oil mill crushing parity recovered. Prices forecast to surge +₹180/Qtl over next week.',
    bestArrivalDay: 'Weekend arrival slots',
    historicalChartData: [
      { period: '1 Week Ago', label: 'Past (-7d)', price: 4490, isForecast: false },
      { period: 'Yesterday', label: 'Yesterday (-1d)', price: 4565, isForecast: false },
      { period: 'Today', label: 'Today (Live MSP)', price: 4600, isForecast: false },
      { period: 'Tomorrow', label: 'Tomorrow (+1d)', price: 4650, isForecast: true },
      { period: 'In 1 Week', label: 'Next Week (+7d)', price: 4780, isForecast: true },
    ],
  },
  {
    id: 'cotton',
    name: 'Cotton (Medium Staple)',
    category: 'Commercial / Fibre',
    icon: '☁️',
    unit: 'Quintal',
    mspRate: 6620,
    pastWeek: 6510,
    yesterday: 6590,
    today: 6620,
    tomorrow: 6680,
    nextWeek: 6850,
    forecastChangePercent: +3.5,
    trend: 'up',
    marketAdvisory: 'Cotton Corporation of India (CCI) procurement active. Clean FAQ grade securing instant approvals.',
    bestArrivalDay: 'Wednesday to Friday',
    historicalChartData: [
      { period: '1 Week Ago', label: 'Past (-7d)', price: 6510, isForecast: false },
      { period: 'Yesterday', label: 'Yesterday (-1d)', price: 6590, isForecast: false },
      { period: 'Today', label: 'Today (Live MSP)', price: 6620, isForecast: false },
      { period: 'Tomorrow', label: 'Tomorrow (+1d)', price: 6680, isForecast: true },
      { period: 'In 1 Week', label: 'Next Week (+7d)', price: 6850, isForecast: true },
    ],
  },
  {
    id: 'sugarcane',
    name: 'Sugarcane (FRP)',
    category: 'Cash Crop',
    icon: '🎋',
    unit: 'Quintal',
    mspRate: 315,
    pastWeek: 310,
    yesterday: 312,
    today: 315,
    tomorrow: 318,
    nextWeek: 325,
    forecastChangePercent: +3.2,
    trend: 'up',
    marketAdvisory: 'Mandya Sugar Mills running at full crushing capacity. Guaranteed FRP floor price with bonus recovery incentive.',
    bestArrivalDay: 'Daily direct yard allocation',
    historicalChartData: [
      { period: '1 Week Ago', label: 'Past (-7d)', price: 310, isForecast: false },
      { period: 'Yesterday', label: 'Yesterday (-1d)', price: 312, isForecast: false },
      { period: 'Today', label: 'Today (Live MSP)', price: 315, isForecast: false },
      { period: 'Tomorrow', label: 'Tomorrow (+1d)', price: 318, isForecast: true },
      { period: 'In 1 Week', label: 'Next Week (+7d)', price: 325, isForecast: true },
    ],
  },
];

export const CropPriceForecastWidget: React.FC = () => {
  const [selectedCropId, setSelectedCropId] = useState<string>('paddy');

  const selectedCrop = cropList.find((c) => c.id === selectedCropId) || cropList[0];

  const pastWeekDiff = selectedCrop.today - selectedCrop.pastWeek;
  const yesterdayDiff = selectedCrop.today - selectedCrop.yesterday;
  const tomorrowDiff = selectedCrop.tomorrow - selectedCrop.today;
  const nextWeekDiff = selectedCrop.nextWeek - selectedCrop.today;

  return (
    <div className="bg-white rounded-3xl border-2 border-slate-200 shadow-md p-5 sm:p-7 space-y-6 overflow-hidden">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 uppercase tracking-wider mb-1">
            <TrendingUp className="h-4 w-4" />
            <span>Predictive Mandi & MSP Price Intelligence</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-display">
            Crop Price Trajectory & Forecast
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Select a crop to view past prices (1 week ago, yesterday), live MSP, and AI-predicted prices for tomorrow & next week.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-800 text-xs font-bold px-3 py-1.5 rounded-full border border-emerald-200">
            <Sparkles className="h-3.5 w-3.5 text-emerald-600" />
            <span>AI APMC Trend Engine</span>
          </span>
        </div>
      </div>

      {/* Crop Selector Scrollable Horizontal Chips */}
      <div>
        <label className="block text-xs font-extrabold uppercase text-slate-400 tracking-wider mb-2.5">
          Select Crop to Analyze:
        </label>
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {cropList.map((crop) => {
            const isSelected = selectedCropId === crop.id;
            return (
              <button
                key={crop.id}
                onClick={() => setSelectedCropId(crop.id)}
                className={`shrink-0 px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 border ${
                  isSelected
                    ? 'bg-slate-900 text-white border-slate-900 shadow-sm scale-102'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                }`}
              >
                <span className="text-base">{crop.icon}</span>
                <span>{crop.name}</span>
                {isSelected && (
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Crop 5-Stage Price Trajectory Cards (1 Week Ago -> Yesterday -> Today -> Tomorrow -> In 1 Week) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {/* Card 1: 1 Week Ago */}
        <div className="bg-slate-50/80 p-3.5 rounded-2xl border border-slate-200">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              1 Week Ago (-7d)
            </span>
            <Clock className="h-3.5 w-3.5 text-slate-400" />
          </div>
          <div className="text-lg sm:text-xl font-black text-slate-700 mt-1 font-display">
            ₹{selectedCrop.pastWeek.toLocaleString('en-IN')}
          </div>
          <span className="text-[10px] text-slate-400 font-medium block mt-0.5">
            Past Mandi average
          </span>
        </div>

        {/* Card 2: Yesterday */}
        <div className="bg-slate-50/80 p-3.5 rounded-2xl border border-slate-200">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Yesterday (-1d)
            </span>
            <Clock className="h-3.5 w-3.5 text-slate-400" />
          </div>
          <div className="text-lg sm:text-xl font-black text-slate-700 mt-1 font-display">
            ₹{selectedCrop.yesterday.toLocaleString('en-IN')}
          </div>
          <span className="text-[10px] text-slate-400 font-medium block mt-0.5">
            Closing rate
          </span>
        </div>

        {/* Card 3: Today (Current Spot / MSP) - HERO CARD */}
        <div className="col-span-2 sm:col-span-1 bg-gradient-to-br from-emerald-600 to-green-700 text-white p-3.5 rounded-2xl shadow-md border border-emerald-500 ring-2 ring-emerald-400/30">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-black uppercase tracking-wider text-emerald-100">
              Today (Govt MSP)
            </span>
            <span className="bg-white/20 text-white text-[9px] font-black px-1.5 py-0.5 rounded">
              LIVE
            </span>
          </div>
          <div className="text-xl sm:text-2xl font-black mt-1 font-display">
            ₹{selectedCrop.today.toLocaleString('en-IN')}
          </div>
          <span className="text-[10px] text-emerald-100 font-semibold block mt-0.5">
            Base procurement rate
          </span>
        </div>

        {/* Card 4: Tomorrow (AI Forecast) */}
        <div className="bg-emerald-50/80 p-3.5 rounded-2xl border border-emerald-300/80">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-800">
              Tomorrow (+1d)
            </span>
            <Sparkles className="h-3.5 w-3.5 text-emerald-600" />
          </div>
          <div className="text-lg sm:text-xl font-black text-emerald-950 mt-1 font-display flex items-baseline gap-1">
            <span>₹{selectedCrop.tomorrow.toLocaleString('en-IN')}</span>
            <span className="text-[10px] font-bold text-emerald-700 flex items-center">
              <ArrowUpRight className="h-3 w-3" /> +₹{tomorrowDiff}
            </span>
          </div>
          <span className="text-[10px] text-emerald-700 font-bold block mt-0.5">
            AI Predicted Rate
          </span>
        </div>

        {/* Card 5: In 1 Week (7-Day Forecast) */}
        <div className="bg-amber-50/80 p-3.5 rounded-2xl border border-amber-300/80">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-900">
              In 1 Week (+7d)
            </span>
            <TrendingUp className="h-3.5 w-3.5 text-amber-600" />
          </div>
          <div className="text-lg sm:text-xl font-black text-amber-950 mt-1 font-display flex items-baseline gap-1">
            <span>₹{selectedCrop.nextWeek.toLocaleString('en-IN')}</span>
            <span className="text-[10px] font-bold text-emerald-700 flex items-center">
              <ArrowUpRight className="h-3 w-3" /> +{selectedCrop.forecastChangePercent}%
            </span>
          </div>
          <span className="text-[10px] text-amber-800 font-bold block mt-0.5">
            Expected Peak Rate
          </span>
        </div>
      </div>

      {/* Trajectory AreaChart & Advisory */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 pt-2">
        {/* Left: Recharts Trajectory Graph */}
        <div className="lg:col-span-7 bg-slate-50 p-4 rounded-2xl border border-slate-200">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-extrabold text-slate-800 flex items-center gap-1.5">
              <TrendingUp className="h-4 w-4 text-emerald-600" />
              <span>Price Movement Timeline (Past → Present → AI Forecast)</span>
            </span>
            <span className="text-[10px] text-slate-500 font-medium">Per {selectedCrop.unit} (₹)</span>
          </div>

          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={selectedCrop.historicalChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                <XAxis dataKey="period" stroke="#64748b" fontSize={10} tickLine={false} />
                <YAxis
                  stroke="#64748b"
                  fontSize={10}
                  domain={['dataMin - 50', 'dataMax + 50']}
                  tickLine={false}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderColor: '#334155',
                    borderRadius: '0.75rem',
                    color: '#fff',
                    fontSize: '11px',
                    padding: '8px 12px',
                  }}
                  formatter={(value: any) => [`₹${Number(value).toLocaleString('en-IN')}`, 'Price / Quintal']}
                />
                <ReferenceLine x="Today" stroke="#16a34a" strokeDasharray="3 3" label={{ value: 'Live Today', fill: '#15803d', fontSize: 10, position: 'top' }} />
                <Area
                  type="monotone"
                  dataKey="price"
                  stroke="#10b981"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#priceGradient)"
                  dot={{ r: 4, fill: '#10b981', strokeWidth: 2, stroke: '#fff' }}
                  activeDot={{ r: 6, fill: '#059669' }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right: AI Market Intelligence & Best Slot Advice */}
        <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 to-slate-850 text-white p-5 rounded-2xl flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between gap-2 border-b border-slate-700 pb-2.5">
              <span className="text-xs font-bold text-amber-400 flex items-center gap-1">
                <Sparkles className="h-3.5 w-3.5" />
                <span>AI Market Recommendation</span>
              </span>
              <span className="text-[10px] bg-emerald-950 text-emerald-400 border border-emerald-800 font-bold px-2 py-0.5 rounded">
                High Confidence
              </span>
            </div>

            <p className="text-xs text-slate-300 mt-3 leading-relaxed">
              {selectedCrop.marketAdvisory}
            </p>
          </div>

          <div className="space-y-3 pt-2">
            <div className="p-3 bg-slate-800/90 rounded-xl border border-slate-700 text-xs">
              <span className="text-slate-400 block text-[10px]">Optimal Arrival Slot:</span>
              <strong className="text-emerald-400 font-bold text-sm block mt-0.5">
                {selectedCrop.bestArrivalDay}
              </strong>
            </div>

            <Link
              to={`/farmer/booking?crop=${selectedCrop.id}`}
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs py-2.5 px-4 rounded-xl flex items-center justify-center gap-1.5 transition shadow-md"
            >
              <span>Book Dynamic Slot for {selectedCrop.name}</span>
              <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
