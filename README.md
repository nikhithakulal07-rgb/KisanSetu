# 🌾 KisanSetu — Predictive Procurement & Smart Queue Management Platform

> *"Existing systems tell farmers what their token is; KisanSetu tells farmers when they should actually leave home."*

KisanSetu is an intelligent agritech procurement and smart queue platform developed for Government Agricultural Produce Market Committees (APMC) and food corporation procurement centers. It replaces rigid static token queues with predictive arrival windows, dynamic delay adjustments, virtual queuing, and direct benefit transfer (DBT) tracking.

---

## 🚀 Key Features

* **Predictive Procurement ETA**: Calculates dynamic arrival windows (e.g. `2:10 PM – 2:30 PM`) based on live weighbridge throughput and transit time from the farmer's village.
* **Dynamic Delay Reaction**: When a procurement yard experiences equipment failure or slowdown, farmer arrival windows automatically shift with real-time alerts (*"Centre A is experiencing a 50-minute delay. Please do not travel yet"*).
* **Smart Centre Discovery**: Interactive Leaflet + OpenStreetMap integration with transparent recommendation breakdown (lowest wait time, available capacity, acceptable distance).
* **Virtual Queue (Hero Experience)**: Real-time telemetry, stage progression, processing rate monitoring, and actionable status banners (`WAIT AT HOME` vs `START TRAVELLING`).
* **Operator Weighbridge Console**: Calibrated gross/tare weight capture, moisture testing, quality grading (Grade A / FAQ), digital bill generation, and stage advancements.
* **District Admin Command Centre**: Live geospatial heatmaps, risk alerts, AI congestion forecasting, and Recharts analytics.
* **Multilingual UI (i18n)**: One-click switching between English, हिन्दी (Hindi), and ಕನ್ನಡ (Kannada).
* **Interactive SIH Demo Console**: Top-mounted simulation controls to inject 50m delays, queue spikes, station failures, or advance workflow steps with zero backend setup required.

---

## 🛠️ Technology Stack

* **Core Framework**: React 18 with TypeScript
* **Build Tooling**: Vite 8 with `@tailwindcss/vite`
* **Styling**: Tailwind CSS v4 + Lucide Icons + Google Fonts (Outfit & Inter)
* **Routing**: React Router v6
* **State & Server State**: TanStack Query (React Query) + Axios + Reactive Simulation Store
* **Geospatial Maps**: Leaflet + React-Leaflet + OpenStreetMap
* **Analytics & Telemetry**: Recharts
* **Validation**: Zod + TypeScript strict types

---

## 📁 Project Architecture

```
kisansetu/
├── src/
│   ├── app/                    # Query client & global providers
│   ├── components/
│   │   ├── common/             # StatusBadge, DelayAlertBanner, DemoSimulationBar
│   │   ├── farmer/             # CropPriceForecastWidget (MSP & Price Intelligence)
│   │   ├── map/                # CentresLeafletMap (OpenStreetMap + dynamic load pins)
│   │   └── navigation/         # Navbar, FarmerBottomNav, Language & Role Switchers
│   ├── layouts/
│   │   ├── FarmerLayout.tsx    # Mobile-first farmer view with bottom nav
│   │   ├── OperatorLayout.tsx  # Weighing platform operator layout
│   │   └── AdminLayout.tsx     # Command center dark theme layout
│   ├── pages/
│   │   ├── auth/               # Multi-role login portal
│   │   ├── farmer/             # Dashboard, Centres, Booking, Confirmation, Virtual Queue, Procurement, Payments, Notifications, Profile
│   │   ├── operator/           # Weighbridge console, grading & billing
│   │   └── admin/              # Command Overview, Centres & Capacity, Analytics, Simulation Lab
│   ├── features/
│   │   └── auth/               # AuthContext & Role switching state
│   ├── services/
│   │   ├── apiClient.ts        # Central Axios instance with auth interceptors
│   │   ├── apiServices.ts      # Typed domain APIs (Farmer, Centres, Queue, Procurement, Payments, Admin)
│   │   ├── mockData.ts         # Rich Mandya APMC district datasets
│   │   └── simulationStore.ts  # Real-time event bus & simulation engine
│   ├── hooks/
│   │   └── useRealtimeData.ts  # Reactive hooks for instant live updates
│   ├── types/
│   │   └── index.ts            # Domain TypeScript models and interfaces
│   ├── i18n/
│   │   ├── translations.ts     # English, Hindi, Kannada dictionaries
│   │   └── I18nContext.tsx     # Translation context & hook
│   ├── routes/
│   │   └── AppRouter.tsx       # Route definitions & guards
│   ├── index.css               # Design system tokens & animations
│   ├── main.tsx                # React DOM entry
│   └── App.tsx                 # Root application wrapper
├── index.html
├── vite.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

---

## 🚦 Application Routes

| Route | Role | Description |
|---|---|---|
| `/login` | Public | Role selector and OTP/PIN login |
| `/farmer/dashboard` | Farmer | Action banner (`WAIT AT HOME` / `START TRAVELLING`), live token, arrival window, crop price forecast |
| `/farmer/centres` | Farmer | OpenStreetMap centre discovery, distance, queue load & smart recommendation |
| `/farmer/booking` | Farmer | Dynamic arrival window selection with confidence ratings |
| `/farmer/booking/confirmation` | Farmer | Digital token receipt and travel buffer guidance |
| `/farmer/queue` | Farmer | **HERO FEATURE**: Live virtual queue, telemetry, delay alert banner, step progress |
| `/farmer/procurement` | Farmer | Visual stage timeline with timestamps & official MSP invoice |
| `/farmer/payments` | Farmer | Direct Benefit Transfer (DBT) clearance pipeline (₹76,405) |
| `/farmer/notifications` | Farmer | Categorized alerts (Delay warnings, queue movements, payment confirmations) |
| `/farmer/profile` | Farmer | FRUITS ID, Aadhaar verification, and bank seeding details |
| `/operator/dashboard` | Operator | Scale calibration, gross/tare weight capture, moisture grading, bill issuance |
| `/admin/dashboard` | District Admin | Mandya command centre, KPIs, geospatial heatmap, and AI alerts |
| `/admin/centres` | District Admin | Centre storage capacity and weighbridge operational status |
| `/admin/analytics` | District Admin | Hourly throughput curves, prediction error histogram, no-show reduction |
| `/admin/simulation` | Admin / Evaluator| Stress-testing lab with real-time telemetry observation |

---

## ⚡ Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
*(Leave `VITE_API_BASE_URL` empty to run with the built-in high-fidelity simulation engine).*

### 3. Start Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 4. Production Build
```bash
npm run build
```

---

## 🎮 SIH Demonstration & Simulation Guide

KisanSetu includes a persistent **SIH Demo Console** sticky bar at the top of the interface:

1. **Test Dynamic Delay Experience**:
   - Navigate to `/farmer/dashboard` or `/farmer/queue`.
   - Click **"Inject 50m Delay"** in the demo bar.
   - *Observe*: The Farmer UI instantly updates with an urgent amber banner: *"Gejjalagere Sub-Centre is experiencing a 50-minute delay. Your arrival window has been updated to 3:00 PM – 3:20 PM. Please do not travel yet."*
2. **Test Traffic Surge**:
   - Click **"Queue Spike (+20)"**.
   - *Observe*: Queue position adjusts from `#18` to `#38`, and estimated waiting time increases accurately.
3. **Test Scale Hardware Failure**:
   - Click **"Station Failure"**.
   - *Observe*: Active scales drop from 3 to 2, throughput drops, and maintenance alert triggers.
4. **Test End-to-End Workflow**:
   - Click **"Advance Step"** repeatedly.
   - *Observe*: Status transitions seamlessly from `WAIT AT HOME` → `START TRAVELLING` (at 4 ahead) → `ARRIVED` → `WEIGHING` → `QUALITY ASSESSMENT` → `BILL GENERATED` → `PAYMENT CREDITED`.

---

## 🏛️ Government & Agritech Compliance

* **Direct Benefit Transfer (DBT)**: Real-time PFMS transaction tracking (`PFMS20260827981244X`).
* **FRUITS Karnataka**: Farmer Registration and Unified Beneficiary Information System integration readiness.
* **Low Digital Literacy Optimized**: High-contrast typography, large touch targets, color-coded status badges, and full multilingual support.
