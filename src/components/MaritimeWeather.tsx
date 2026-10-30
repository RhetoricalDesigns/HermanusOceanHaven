import React, { useState, useEffect } from 'react';
import { MaritimeWeatherState } from '../types';
import { MARITIME_STATIONS } from '../data/weatherData';
import { 
  evaluateExcursionSafety, 
  getBeaufortScale, 
  generate24HourTideCurve 
} from '../utils/weather';
import { 
  fetchLiveMarineTelemetry, 
  LiveTelemetryResponse 
} from '../services/telemetryService';
import { 
  Wind, 
  Waves, 
  ArrowUp, 
  ShieldCheck, 
  AlertTriangle, 
  XCircle, 
  Compass, 
  Thermometer, 
  Eye, 
  Gauge, 
  Sliders, 
  RefreshCw,
  Anchor,
  Ship,
  Fish,
  Radio,
  Activity
} from 'lucide-react';
import { WhaleLoading } from './WhaleLoading';

interface MaritimeWeatherProps {
  onOpenBooking: () => void;
}

export const MaritimeWeather: React.FC<MaritimeWeatherProps> = ({ onOpenBooking }) => {
  const [stationKey, setStationKey] = useState<string>('new-harbour');
  const [telemetryState, setTelemetryState] = useState<LiveTelemetryResponse | null>(null);
  const [isLoadingTelemetry, setIsLoadingTelemetry] = useState<boolean>(false);
  const [useLiveTelemetry, setUseLiveTelemetry] = useState<boolean>(true);

  const baseStation = (useLiveTelemetry && telemetryState?.data) 
    ? telemetryState.data 
    : MARITIME_STATIONS[stationKey];

  // Interactive conditions simulation controls
  const [simulateCustom, setSimulateCustom] = useState<boolean>(false);
  const [simulatedWind, setSimulatedWind] = useState<number>(baseStation.windSpeedKnots);
  const [simulatedSwell, setSimulatedSwell] = useState<number>(baseStation.swellHeightMeters);

  const activeWind = simulateCustom ? simulatedWind : baseStation.windSpeedKnots;
  const activeSwell = simulateCustom ? simulatedSwell : baseStation.swellHeightMeters;

  const safety = evaluateExcursionSafety(activeWind, activeSwell);
  const beaufort = getBeaufortScale(activeWind);

  // Fetch live telemetry when station changes or requested
  const loadTelemetry = async (key: string) => {
    setIsLoadingTelemetry(true);
    try {
      const response = await fetchLiveMarineTelemetry(key);
      setTelemetryState(response);
      if (!simulateCustom) {
        setSimulatedWind(response.data.windSpeedKnots);
        setSimulatedSwell(response.data.swellHeightMeters);
      }
    } finally {
      setIsLoadingTelemetry(false);
    }
  };

  useEffect(() => {
    loadTelemetry(stationKey);
  }, [stationKey]);

  const handleStationChange = (key: string) => {
    setStationKey(key);
  };

  const getStatusBadge = (status: 'CLEARED' | 'CAUTION' | 'CANCELLED' | 'OPTIMAL' | 'MODERATE') => {
    switch (status) {
      case 'CLEARED':
      case 'OPTIMAL':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            {status}
          </span>
        );
      case 'CAUTION':
      case 'MODERATE':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
            {status}
          </span>
        );
      case 'CANCELLED':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-50 text-rose-800 border border-rose-200">
            <XCircle className="w-3.5 h-3.5 text-rose-600" />
            {status}
          </span>
        );
    }
  };

  return (
    <section id="weather" className="py-14 lg:py-20 bg-slate-50/70 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-cyan-800 uppercase tracking-wider mb-2">
              <Compass className="w-4 h-4 text-cyan-700" />
              <span>Oceanographic Telemetry</span>
              <span className="text-slate-300">·</span>
              <span>South African Weather Service & SAMSA</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
              Local Maritime Weather & Sea State
            </h2>
            <p className="mt-2 text-slate-600 text-sm sm:text-base max-w-2xl leading-relaxed">
              Real-time wind velocity, tidal predictions, and swell dynamics for Walker Bay and Shark Alley. Safe whale encounters and shark cage dives depend on optimal sea states.
            </p>
          </div>

          {/* Station Switcher */}
          <div className="flex flex-wrap items-center gap-2 self-start md:self-end">
            <span className="text-xs text-slate-500 hidden sm:inline">Station:</span>
            {Object.entries(MARITIME_STATIONS).map(([key]) => (
              <button
                key={key}
                onClick={() => handleStationChange(key)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all ${
                  stationKey === key
                    ? 'bg-slate-900 text-white font-semibold border-slate-900 shadow-xs'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100 hover:text-slate-900 shadow-xs'
                }`}
              >
                {MARITIME_STATIONS[key].shortName}
              </button>
            ))}
          </div>
        </div>

        <div className="relative space-y-8">
          {/* Global Section Loader Overlay */}
          {isLoadingTelemetry && (
            <div className="absolute inset-0 z-10 bg-slate-50/60 backdrop-blur-[2px] rounded-2xl flex items-center justify-center transition-all duration-300">
              <div className="bg-white/80 p-8 rounded-3xl shadow-xl border border-white/50 backdrop-blur-md">
                <WhaleLoading size="lg" />
              </div>
            </div>
          )}

          {/* Top Overview Strip with Live Telemetry HUD */}
          <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-6 shadow-sm flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div className="flex items-start sm:items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-50 border border-cyan-200 flex items-center justify-center text-cyan-700 shrink-0 shadow-xs mt-0.5 sm:mt-0">
              <Anchor className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900 flex flex-wrap items-center gap-2">
                <span>{baseStation.stationName}</span>
                <span className="text-[11px] font-mono text-cyan-700">({baseStation.coordinates})</span>
                
                {useLiveTelemetry && telemetryState && (
                  <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-semibold tracking-wide uppercase bg-emerald-50 text-emerald-700 border border-emerald-200">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    Live Telemetry ({telemetryState.latencyMs}ms)
                  </span>
                )}
              </div>
              <div className="text-xs text-slate-500 mt-1 flex flex-wrap items-center gap-2">
                <span>{safety.safetyNotice}</span>
                {telemetryState && (
                  <>
                    <span className="text-slate-300">·</span>
                    <span className="text-[11px] text-cyan-800 font-mono">Feed: {telemetryState.apiProvider}</span>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 self-stretch sm:self-auto shrink-0">
            {/* Live Telemetry Refresh Button */}
            <button
              onClick={() => loadTelemetry(stationKey)}
              disabled={isLoadingTelemetry}
              title="Poll live ocean sensor telemetry"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 disabled:opacity-50 transition-colors"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-cyan-700 ${isLoadingTelemetry ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">{isLoadingTelemetry ? 'Polling Sensor...' : 'Refresh Telemetry'}</span>
            </button>

            {/* Toggle Live vs Baseline Mode */}
            <button
              onClick={() => setUseLiveTelemetry(!useLiveTelemetry)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-colors ${
                useLiveTelemetry
                  ? 'bg-cyan-50 text-cyan-900 border-cyan-200 font-semibold'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <Radio className="w-3.5 h-3.5 text-cyan-700" />
              <span>{useLiveTelemetry ? 'Live Stream Active' : 'Station Baseline'}</span>
            </button>

            {/* Simulator Mode Button */}
            <button
              onClick={() => setSimulateCustom(!simulateCustom)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-colors ${
                simulateCustom
                  ? 'bg-amber-500 text-slate-950 border-amber-400 font-bold shadow-xs'
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>{simulateCustom ? 'Exit Simulator' : 'Simulate'}</span>
            </button>
          </div>
        </div>

        {/* Simulation Controls Drawer (When Toggled) */}
        {simulateCustom && (
          <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200 text-xs space-y-3 animate-fadeIn">
            <div className="flex items-center justify-between text-amber-900 font-semibold">
              <span className="flex items-center gap-1.5">
                <Sliders className="w-4 h-4 text-amber-600" />
                Interactive Marine Conditions Simulator
              </span>
              <button
                onClick={() => {
                  setSimulatedWind(baseStation.windSpeedKnots);
                  setSimulatedSwell(baseStation.swellHeightMeters);
                }}
                className="inline-flex items-center gap-1 text-[11px] text-amber-700 hover:underline"
              >
                <RefreshCw className="w-3 h-3" /> Reset to Real-Time
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-slate-700">Simulate Wind Speed:</span>
                  <span className="font-mono text-amber-800 font-bold">{simulatedWind} knots</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="35"
                  step="1"
                  value={simulatedWind}
                  onChange={e => setSimulatedWind(parseInt(e.target.value))}
                  className="w-full accent-amber-600 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500 mt-0.5">
                  <span>0 kts (Calm)</span>
                  <span>15 kts (Moderate)</span>
                  <span>30+ kts (Gale)</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-slate-700">Simulate Swell Height:</span>
                  <span className="font-mono text-amber-800 font-bold">{simulatedSwell.toFixed(1)} meters</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="4.5"
                  step="0.1"
                  value={simulatedSwell}
                  onChange={e => setSimulatedSwell(parseFloat(e.target.value))}
                  className="w-full accent-amber-600 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500 mt-0.5">
                  <span>0.5m (Glassy)</span>
                  <span>2.0m (Moderate)</span>
                  <span>4.0m+ (Rough)</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 3 Core Metric Tiles: Wind Speed, Tide Chart, Sea State */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Tile 1: Real-Time Wind Speed & Beaufort Scale */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-5 shadow-sm flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <span className="text-xs font-semibold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                  <Wind className="w-4 h-4 text-cyan-700" />
                  Wind Velocity & Vector
                </span>
                <span className="text-xs font-mono text-cyan-800 font-bold">
                  {beaufort.name}
                </span>
              </div>

              {/* Huge Wind Speed Gauge */}
              <div className="flex items-baseline justify-between pt-1">
                <div>
                  <div className="text-5xl font-bold text-slate-900 font-mono tracking-tight tabular-nums">
                    {activeWind}
                    <span className="text-lg font-normal text-slate-500 ml-1">kts</span>
                  </div>
                  <div className="text-xs text-slate-500 mt-1 font-mono">
                    ≈ {Math.round(activeWind * 1.852)} km/h · Gusts to {activeWind + 3} kts
                  </div>
                </div>

                {/* Compass Direction Dial */}
                <div className="text-right">
                  <div className="w-14 h-14 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center relative shadow-inner mx-auto">
                    <div 
                      className="transition-transform duration-500"
                      style={{ transform: `rotate(${baseStation.windDirectionDegrees}deg)` }}
                    >
                      <ArrowUp className="w-6 h-6 text-cyan-700" />
                    </div>
                  </div>
                  <div className="text-xs font-mono font-bold text-slate-800 mt-1">
                    {baseStation.windDirection} ({baseStation.windDirectionDegrees}°)
                  </div>
                </div>
              </div>

              {/* Beaufort details */}
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-xs space-y-1">
                <div className="text-slate-500 text-[11px]">Beaufort Classification:</div>
                <div className="text-slate-900 font-semibold font-mono">
                  {beaufort.scale === 2 ? 'Force 2 (Light Breeze)' : `Force ${beaufort.scale} (${beaufort.name})`}
                </div>
                <div className="text-[11px] text-cyan-800 font-medium">
                  {beaufort.seaImpact}
                </div>
              </div>

              {/* Hourly wind bar chart preview */}
              <div>
                <div className="text-[11px] font-semibold text-slate-600 mb-2">
                  12-Hour Wind Forecast (knots):
                </div>
                <div className={`grid gap-1.5 text-center`} style={{ gridTemplateColumns: `repeat(${(baseStation.hourlyWind || []).length}, minmax(0, 1fr))` }}>
                  {(baseStation.hourlyWind || []).map((item: any) => (
                    <div key={item.time} className="space-y-1">
                      <div className="h-14 bg-slate-50 rounded flex flex-col justify-end p-1 border border-slate-200">
                        <div 
                          className="w-full bg-cyan-600 rounded-sm transition-all"
                          style={{ height: `${Math.min(100, (item.speedKnots / 25) * 100)}%` }}
                        />
                      </div>
                      <div className="text-[10px] font-mono text-slate-700 font-semibold tabular-nums">{item.speedKnots}</div>
                      <div className="text-[9px] text-slate-400 truncate">{item.time}</div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            <div className="text-[11px] text-slate-500 pt-2 border-t border-slate-100">
              Optimal whale & shark spotting wind is &lt; 12 kts (calm surface with zero spray).
            </div>
          </div>

          {/* Tile 2: Interactive Tide Chart & Curve */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-5 shadow-sm flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <span className="text-xs font-semibold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                  <Waves className="w-4 h-4 text-cyan-700" />
                  Walker Bay Tide Chart
                </span>
                <span className="text-xs font-mono text-emerald-700 font-bold flex items-center gap-1">
                  <ArrowUp className="w-3.5 h-3.5" /> {baseStation.tideTrend} TIDE
                </span>
              </div>

              {/* Current Tide Height */}
              <div className="flex items-baseline justify-between pt-1">
                <div>
                  <div className="text-5xl font-bold text-slate-900 font-mono tracking-tight tabular-nums">
                    {baseStation.currentTideMeters}
                    <span className="text-lg font-normal text-slate-500 ml-1">m</span>
                  </div>
                  <div className="text-xs text-slate-500 mt-1">
                    Next High Tide in the <span className="font-mono text-slate-800 font-semibold">Morning (1.82m)</span>
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-cyan-50 border border-cyan-100 text-right text-xs">
                  <div className="text-[10px] text-slate-500 uppercase font-semibold">Tidal Range</div>
                  <div className="font-mono font-bold text-cyan-900 text-sm">1.44m Semi-diurnal</div>
                </div>
              </div>

              {/* 24-Hour Sinusoidal Tide Wave Visual Graph */}
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
                <div className="flex items-center justify-between text-[11px] text-slate-500">
                  <span>Early Morning Low (0.4m)</span>
                  <span className="text-cyan-800 font-bold">Morning High (1.8m)</span>
                  <span>Evening High (1.9m)</span>
                </div>

                <div className="relative h-20 w-full overflow-hidden">
                  <svg className="w-full h-full" viewBox="0 0 300 80" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="tideGradientLight" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#0284c7" stopOpacity="0.25" />
                        <stop offset="100%" stopColor="#0284c7" stopOpacity="0.02" />
                      </linearGradient>
                    </defs>

                    {/* Smooth Tide Sine Wave */}
                    <path
                      d="M 0,55 
                         C 40,65 70,60 100,35 
                         C 130,10 160,10 190,40 
                         C 220,70 250,70 280,30 
                         L 300,15 L 300,80 L 0,80 Z"
                      fill="url(#tideGradientLight)"
                    />
                    <path
                      d="M 0,55 
                         C 40,65 70,60 100,35 
                         C 130,10 160,10 190,40 
                         C 220,70 250,70 280,30 
                         L 300,15"
                      fill="none"
                      stroke="#0284c7"
                      strokeWidth="2.5"
                    />

                    {/* Current Time Indicator Dot */}
                    <circle cx="125" cy="20" r="4.5" fill="#0369a1" />
                    <line x1="125" y1="20" x2="125" y2="80" stroke="#0369a1" strokeWidth="1" strokeDasharray="2,2" />
                  </svg>

                  <div className="absolute top-1 left-28 text-[9px] font-mono text-cyan-900 bg-white/95 px-1.5 py-0.5 rounded border border-cyan-300 shadow-xs">
                    Now (1.54m)
                  </div>
                </div>

                {/* Tide Schedule Grid */}
                <div className="grid grid-cols-4 gap-1 pt-1 text-[10px] text-center font-mono">
                  {(baseStation.tideEvents || []).map((t: any, idx: number) => (
                    <div key={idx} className="p-1 rounded bg-white border border-slate-200">
                      <div className={t.type === 'HIGH' ? 'text-cyan-800 font-bold' : 'text-slate-500'}>
                        {t.type}
                      </div>
                      <div className="text-slate-900 font-semibold">{t.time.split(' ')[0]}</div>
                      <div className="text-slate-500">{t.heightMeters}m</div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            <div className="p-2.5 rounded-lg bg-cyan-50/80 border border-cyan-200 text-[11px] text-cyan-900">
              💡 <strong>Hermanus Tide Secret:</strong> Southern Right mothers with calves come closest to Sievers Point rocks during High Tide (Morning to Afternoon), swimming as close as 15–20 meters!
            </div>
          </div>

          {/* Tile 3: Sea State & Swell Dynamics */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-5 shadow-sm flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <span className="text-xs font-semibold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                  <Gauge className="w-4 h-4 text-cyan-700" />
                  Swell & Marine Parameters
                </span>
                <span className="text-xs font-mono text-emerald-700 font-bold">
                  Smooth Sea
                </span>
              </div>

              {/* Swell Height */}
              <div className="flex items-baseline justify-between pt-1">
                <div>
                  <div className="text-5xl font-bold text-slate-900 font-mono tracking-tight tabular-nums">
                    {activeSwell.toFixed(1)}
                    <span className="text-lg font-normal text-slate-500 ml-1">m</span>
                  </div>
                  <div className="text-xs text-slate-500 mt-1">
                    Swell Period: <span className="font-mono text-slate-800 font-semibold">{baseStation.swellPeriodSeconds} seconds</span>
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-right text-xs">
                  <div className="text-[10px] text-slate-500 uppercase font-semibold">Swell Vector</div>
                  <div className="font-mono font-bold text-slate-900 text-sm">{baseStation.swellDirection}</div>
                </div>
              </div>

              {/* Marine Parameters Grid */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                  <div className="text-slate-500 text-[11px] flex items-center gap-1.5 mb-1">
                    <Thermometer className="w-3.5 h-3.5 text-cyan-700" />
                    Water Temperature
                  </div>
                  <div className="text-base font-bold text-slate-900 font-mono tabular-nums">
                    {baseStation.waterTemperatureCelsius}°C
                  </div>
                  <div className="text-[10px] text-slate-500">Benguela Upwelling</div>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                  <div className="text-slate-500 text-[11px] flex items-center gap-1.5 mb-1">
                    <Eye className="w-3.5 h-3.5 text-cyan-700" />
                    Underwater Visibility
                  </div>
                  <div className="text-base font-bold text-slate-900 font-mono tabular-nums">
                    {baseStation.underwaterVisibilityMeters} meters
                  </div>
                  <div className="text-[10px] text-emerald-700 font-medium">Crisp clear sea</div>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                  <div className="text-slate-500 text-[11px] mb-1">Atmospheric Pressure</div>
                  <div className="text-sm font-bold text-slate-900 font-mono tabular-nums">
                    {baseStation.atmosphericPressureHpa} hPa
                  </div>
                  <div className="text-[10px] text-slate-500">Stable high system</div>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                  <div className="text-slate-500 text-[11px] mb-1">Douglas Sea Scale</div>
                  <div className="text-sm font-bold text-cyan-900 font-mono">
                    State 2 (Slight)
                  </div>
                  <div className="text-[10px] text-slate-500">Low motion sickness risk</div>
                </div>
              </div>

            </div>

            <div className="text-[11px] text-slate-500 pt-2 border-t border-slate-100">
              Long period swells (&gt; 10s) provide gentle, rolling motion rather than sharp choppy spray.
            </div>
          </div>

        </div>

        {/* Excursion Safety Clearance Status Table (Including Shark Cage Diving) */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-cyan-700" />
                Live Excursion Clearance & Safety Advisories
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Evaluated against SAMSA maritime standards and Overberg coastal marine bylaws.
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-500">Whale & Shark Visibility:</span>
              <span className="font-semibold text-cyan-800 font-mono">{safety.whaleVisibilityIndex}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            
            {/* Shark Cage Diving */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-between space-y-3">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-bold text-slate-900 flex items-center gap-1.5">
                    <Fish className="w-4 h-4 text-cyan-700" /> Shark Cage Diving
                  </span>
                  {getStatusBadge(safety.catamaranStatus)}
                </div>
                <p className="text-slate-600 text-[11px] leading-relaxed">
                  Shark Alley sheltered from south swells; water visibility at 11m is optimal for cage viewing.
                </p>
              </div>
              <button
                onClick={onOpenBooking}
                className="text-cyan-700 hover:text-cyan-800 text-xs font-semibold text-left underline underline-offset-4"
              >
                Book Shark Dive →
              </button>
            </div>

            {/* Catamaran Safari */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-between space-y-3">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-bold text-slate-900 flex items-center gap-1.5">
                    <Ship className="w-4 h-4 text-cyan-700" /> Whale Catamaran
                  </span>
                  {getStatusBadge(safety.catamaranStatus)}
                </div>
                <p className="text-slate-600 text-[11px] leading-relaxed">
                  Smooth 1.2m swell and 7kt breeze well within the 22kt certified safety envelope.
                </p>
              </div>
              <button
                onClick={onOpenBooking}
                className="text-cyan-700 hover:text-cyan-800 text-xs font-semibold text-left underline underline-offset-4"
              >
                Book Departure →
              </button>
            </div>

            {/* Tandem Paragliding */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-between space-y-3">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-bold text-slate-900 flex items-center gap-1.5">
                    <Wind className="w-4 h-4 text-cyan-700" /> Tandem Paragliding
                  </span>
                  {getStatusBadge(safety.paraglidingStatus)}
                </div>
                <p className="text-slate-600 text-[11px] leading-relaxed">
                  Rotary Way mountain ridge launch; laminar {activeWind}kt coastal breeze for aerial whale vantage.
                </p>
              </div>
              <button
                onClick={onOpenBooking}
                className="text-cyan-700 hover:text-cyan-800 text-xs font-semibold text-left underline underline-offset-4"
              >
                Book Paragliding →
              </button>
            </div>

            {/* Sea Kayak Safari */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-between space-y-3">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-bold text-slate-900 flex items-center gap-1.5">
                    <Waves className="w-4 h-4 text-cyan-700" /> Sea Kayaking
                  </span>
                  {getStatusBadge(safety.kayakStatus)}
                </div>
                <p className="text-slate-600 text-[11px] leading-relaxed">
                  Calm water in Old Harbour cove; ideal paddling conditions alongside kelp fringes.
                </p>
              </div>
              <button
                onClick={onOpenBooking}
                className="text-cyan-700 hover:text-cyan-800 text-xs font-semibold text-left underline underline-offset-4"
              >
                Book Departure →
              </button>
            </div>

          </div>
        </div>
      </div>

    </div>
  </section>
);
};
