import React, { useState, useRef, useEffect } from 'react';
import { 
  Compass, 
  MapPin, 
  Calendar, 
  Bell, 
  Menu, 
  X, 
  Anchor, 
  Waves, 
  Home, 
  Car,
  AlertTriangle,
  AlertCircle,
  CheckCircle2,
  XCircle,
  ChevronDown, 
  Info, 
  Wind, 
  CircleDollarSign, 
  Fish,
  Gauge,
  Thermometer,
  Eye,
  Activity
} from 'lucide-react';
import { AppPage, TideEvent } from '../types';
import { evaluateExcursionSafety } from '../utils/weather';
import { MARITIME_STATIONS } from '../data/weatherData';

interface NavbarProps {
  currentPage: AppPage;
  onNavigate: (page: AppPage) => void;
  onOpenBooking: (tourId?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  currentPage,
  onNavigate,
  onOpenBooking
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [advisoryPopoverOpen, setAdvisoryPopoverOpen] = useState(false);
  const [bookPopoverOpen, setBookPopoverOpen] = useState(false);
  
  // Real-time telemetry condition state (default: optimal conditions)
  const [currentSwellMeters, setCurrentSwellMeters] = useState<number>(1.2);
  const [currentWindKnots, setCurrentWindKnots] = useState<number>(7);

  const popoverRef = useRef<HTMLDivElement>(null);
  const bookRef = useRef<HTMLDivElement>(null);

  // Close popover when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        setAdvisoryPopoverOpen(false);
      }
      if (bookRef.current && !bookRef.current.contains(event.target as Node)) {
        setBookPopoverOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNavClick = (page: AppPage) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    setAdvisoryPopoverOpen(false);
    setBookPopoverOpen(false);
  };

  // Evaluate safety thresholds
  const safetyEval = evaluateExcursionSafety(currentWindKnots, currentSwellMeters);
  
  // Trigger weather advisory badge if wind > 18kts or swell > 2.2m
  const isAdvisoryActive = currentWindKnots > 18 || currentSwellMeters > 2.2;
  const isSevereGale = currentWindKnots > 24 || currentSwellMeters > 3.0;

  const navLinks: { page: AppPage; label: string; icon: React.ElementType; badge?: string }[] = [
    { page: 'home', label: 'Home', icon: Home },
    { page: 'whale-watching', label: 'Whale Watching', icon: CircleDollarSign },
    { page: 'shark-dive', label: 'Shark Cage Diving', icon: Fish },
    { page: 'paragliding', label: 'Paragliding', icon: Wind },
    { page: 'surf-kite', label: 'Surf & Kite', icon: Compass },
    { page: 'transport', label: 'Transport', icon: Car },
    { page: 'guide', label: 'Guide', icon: MapPin },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 h-18">
          
          {/* Zone 1: Wordmark Logo */}
          <button 
            onClick={() => handleNavClick('home')} 
            className="flex items-center gap-2 whitespace-nowrap shrink-0 group text-left cursor-pointer"
            title="Hermanus Whale Haven Home"
          >
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-cyan-50 border border-cyan-200 flex items-center justify-center text-cyan-700 group-hover:bg-cyan-100 transition-colors shadow-2xs">
              <Anchor className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
          </button>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5 text-xs font-medium text-slate-600">
            {navLinks.map(({ page, label, icon: Icon, badge }) => {
              const isActive = currentPage === page;
              return (
                <button
                  key={page}
                  onClick={() => handleNavClick(page)}
                  className={`flex items-center gap-1 px-2 xl:px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'bg-cyan-50 text-cyan-900 border border-cyan-200 shadow-2xs'
                      : page === 'weather'
                      ? 'bg-cyan-700 text-white shadow-sm hover:bg-cyan-800'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-cyan-700' : page === 'weather' ? 'text-white' : 'text-slate-400'}`} />
                  <span>{label}</span>
                  {badge && (
                    <span className={`text-[10px] px-1 py-0.2 rounded-full font-mono tabular-nums ${
                      isActive ? 'bg-cyan-200/80 text-cyan-950 font-bold' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Real-Time Weather Advisory Badge + CTA */}
          <div className="flex items-center gap-2 xl:gap-3 shrink-0 relative" ref={popoverRef}>
            
            {/* REAL-TIME WEATHER ADVISORY BADGE */}
            {/* SEA & TIDES TELEMETRY BLOCK */}
            <div className={`hidden sm:flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-lg border ${
                isSevereGale
                  ? 'bg-rose-50 text-rose-950 border-rose-300'
                  : isAdvisoryActive
                  ? 'bg-amber-50 text-amber-950 border-amber-300'
                  : 'bg-cyan-50/80 text-cyan-900 border-cyan-200'
              }`}>
              <div className="flex items-center gap-1">
                {isSevereGale ? (
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-600" />
                  </span>
                ) : isAdvisoryActive ? (
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500" />
                  </span>
                ) : (
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                )}
                <Waves className={`w-3.5 h-3.5 ${isSevereGale ? 'text-rose-600' : isAdvisoryActive ? 'text-amber-600' : 'text-cyan-700'}`} />
              </div>
              <span className="font-mono tabular-nums font-bold">
                {currentSwellMeters}m · {currentWindKnots}kts
              </span>
            </div>

            {/* SEA & TIDES ACTION BUTTON */}
            <button
              onClick={() => setAdvisoryPopoverOpen(!advisoryPopoverOpen)}
              className="px-3 sm:px-4 py-2 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 active:scale-95 transition-all shadow-xs whitespace-nowrap shrink-0 cursor-pointer flex items-center gap-1.5"
            >
              <span>Sea & Tides</span>
              <ChevronDown className={`w-3 h-3 transition-transform ${advisoryPopoverOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* SEA & TIDES TELEMETRY POPOVER */}
            {advisoryPopoverOpen && (
              <div className="absolute right-0 top-11 w-80 sm:w-[420px] bg-white rounded-2xl shadow-2xl border border-slate-200 p-0 z-50 text-slate-900 animate-in fade-in zoom-in-95 duration-150 overflow-hidden">
                
                {/* Header: Station Identity */}
                <div className="bg-slate-50 border-b border-slate-200 p-4 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-lg bg-cyan-100 text-cyan-700 shadow-sm">
                      <Anchor className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">
                        {MARITIME_STATIONS['new-harbour'].shortName} Station
                      </h4>
                      <div className="text-[10px] text-slate-500 font-mono tracking-tight">
                        {MARITIME_STATIONS['new-harbour'].coordinates}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setAdvisoryPopoverOpen(false)}
                    className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="p-4 space-y-4">
                  {/* Primary Telemetry Grid */}
                  <div className="grid grid-cols-2 gap-3">
                    
                    {/* Wind Metric */}
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5 mb-2">
                        <Wind className="w-3.5 h-3.5 text-cyan-700" />
                        Wind Velocity
                      </div>
                      <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-bold font-mono text-slate-900">
                          {currentWindKnots}
                        </span>
                        <span className="text-xs text-slate-500 font-medium">kts</span>
                      </div>
                      <div className="text-[10px] text-slate-600 mt-1 flex items-center gap-1">
                        <span className="font-bold text-cyan-800">{MARITIME_STATIONS['new-harbour'].windDirection}</span>
                        <span>· Gusts to {currentWindKnots + 3} kts</span>
                      </div>
                    </div>

                    {/* Swell Metric */}
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5 mb-2">
                        <Waves className="w-3.5 h-3.5 text-cyan-700" />
                        Swell Dynamics
                      </div>
                      <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-bold font-mono text-slate-900">
                          {currentSwellMeters.toFixed(1)}
                        </span>
                        <span className="text-xs text-slate-500 font-medium">m</span>
                      </div>
                      <div className="text-[10px] text-slate-600 mt-1">
                        {MARITIME_STATIONS['new-harbour'].swellPeriodSeconds}s Period · {MARITIME_STATIONS['new-harbour'].swellDirection.split(' ')[0]}
                      </div>
                    </div>

                    {/* Tide Metric */}
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5 mb-2">
                        <Gauge className="w-3.5 h-3.5 text-cyan-700" />
                        Tide Status
                      </div>
                      <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-bold font-mono text-slate-900">
                          {MARITIME_STATIONS['new-harbour'].currentTideMeters}
                        </span>
                        <span className="text-xs text-slate-500 font-medium">m</span>
                      </div>
                      <div className="text-[10px] text-emerald-700 font-bold mt-1">
                        {MARITIME_STATIONS['new-harbour'].tideTrend} TIDE
                      </div>
                    </div>

                    {/* Water Temp */}
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5 mb-2">
                        <Thermometer className="w-3.5 h-3.5 text-cyan-700" />
                        Water Temp
                      </div>
                      <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-bold font-mono text-slate-900">
                          {MARITIME_STATIONS['new-harbour'].waterTemperatureCelsius}
                        </span>
                        <span className="text-xs text-slate-500 font-medium">°C</span>
                      </div>
                      <div className="text-[10px] text-slate-600 mt-1 flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        <span>Vis: {MARITIME_STATIONS['new-harbour'].underwaterVisibilityMeters}m</span>
                      </div>
                    </div>
                  </div>

                  {/* Upcoming Tide Events */}
                  <div className="bg-slate-900 rounded-xl p-3 text-white">
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 border-b border-white/10 pb-1.5">
                      Daily Tidal Schedule
                    </div>
                    <div className="grid grid-cols-4 gap-2">
                      {MARITIME_STATIONS['new-harbour'].tideEvents.map((t: TideEvent, idx: number) => (
                        <div key={idx} className="text-center">
                          <div className={`text-[9px] font-bold ${t.type === 'HIGH' ? 'text-cyan-400' : 'text-slate-400'}`}>{t.type}</div>
                          <div className="text-[11px] font-mono font-bold">{t.time.split(' ')[0]}</div>
                          <div className="text-[10px] text-slate-400">{t.heightMeters}m</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Safety Summary Action */}
                  <button
                    onClick={() => handleNavClick('weather')}
                    className="w-full py-2.5 rounded-xl bg-cyan-700 hover:bg-cyan-800 text-white text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2 shadow-sm"
                  >
                    <Activity className="w-3.5 h-3.5" />
                    <span>View Full Oceanographic Telemetry</span>
                  </button>
                </div>

                <div className="bg-slate-50 px-4 py-2 text-[9px] font-mono text-slate-400 text-center border-t border-slate-100">
                  Data updated 5 minutes ago via SAMSA & SAWS
                </div>
              </div>
            )}

            <div className="relative" ref={bookRef}>
              <button
                onClick={() => setBookPopoverOpen(!bookPopoverOpen)}
                className="px-3 sm:px-4 py-2 text-xs font-semibold text-white bg-cyan-700 rounded-lg hover:bg-cyan-800 active:scale-95 transition-all shadow-xs whitespace-nowrap shrink-0 cursor-pointer"
              >
                Book Activity
              </button>

              {bookPopoverOpen && (
                <div className="absolute right-0 top-11 w-64 bg-white rounded-2xl shadow-2xl border border-slate-200 p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="p-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-50 mb-1">
                    Select Expedition Category
                  </div>
                  <div className="grid grid-cols-1 gap-1">
                    <button 
                      onClick={() => handleNavClick('whale-watching')}
                      className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-cyan-50 text-slate-700 hover:text-cyan-900 transition-colors text-left cursor-pointer"
                    >
                      <div className="p-2 rounded-lg bg-cyan-100 text-cyan-700">
                        <Waves className="w-4 h-4" />
                      </div>
                      <span className="text-sm font-bold">Whale Watching</span>
                    </button>
                    <button 
                      onClick={() => handleNavClick('shark-dive')}
                      className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-cyan-50 text-slate-700 hover:text-cyan-900 transition-colors text-left cursor-pointer"
                    >
                      <div className="p-2 rounded-lg bg-cyan-100 text-cyan-700">
                        <Fish className="w-4 h-4" />
                      </div>
                      <span className="text-sm font-bold">Shark Cage Diving</span>
                    </button>
                    <button 
                      onClick={() => handleNavClick('paragliding')}
                      className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-cyan-50 text-slate-700 hover:text-cyan-900 transition-colors text-left cursor-pointer"
                    >
                      <div className="p-2 rounded-lg bg-cyan-100 text-cyan-700">
                        <Wind className="w-4 h-4" />
                      </div>
                      <span className="text-sm font-bold">Tandem Paragliding</span>
                    </button>
                    <button 
                      onClick={() => handleNavClick('surf-kite')}
                      className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-cyan-50 text-slate-700 hover:text-cyan-900 transition-colors text-left cursor-pointer"
                    >
                      <div className="p-2 rounded-lg bg-cyan-100 text-cyan-700">
                        <Compass className="w-4 h-4" />
                      </div>
                      <span className="text-sm font-bold">Surf & Kite School</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile menu hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-700 hover:text-slate-900 rounded-lg focus:outline-none min-w-[40px] min-h-[40px] flex items-center justify-center cursor-pointer"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-cyan-700" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile navigation drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-200 bg-white px-4 py-4 space-y-3 shadow-lg max-h-[80vh] overflow-y-auto">
          
          {/* Mobile Weather Advisory Card */}
          <div 
            onClick={() => handleNavClick('weather')}
            className={`p-3 rounded-xl border cursor-pointer flex items-center justify-between ${
              isSevereGale ? 'bg-rose-50 border-rose-300 text-rose-950' :
              isAdvisoryActive ? 'bg-amber-50 border-amber-300 text-amber-950' :
              'bg-cyan-50 border-cyan-200 text-cyan-950'
            }`}
          >
            <div className="flex items-center gap-2">
              {isSevereGale ? (
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              ) : isAdvisoryActive ? (
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
              ) : (
                <Waves className="w-4 h-4 text-cyan-700 shrink-0" />
              )}
              <div>
                <div className="text-xs font-bold">
                  {isSevereGale ? 'Gale Alert: Excursions Restricted' : isAdvisoryActive ? 'Weather Advisory: Caution' : 'Sea State: Optimal'}
                </div>
                <div className="text-[11px] font-mono text-slate-600">
                  {currentSwellMeters}m Swell · {currentWindKnots}kts Wind
                </div>
              </div>
            </div>

            <ChevronDown className="w-4 h-4 -rotate-90 text-slate-400" />
          </div>

          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-3 py-1">
            Main Navigation
          </div>

          {navLinks.map(({ page, label, icon: Icon, badge }) => (
            <button
              key={page}
              onClick={() => handleNavClick(page)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                currentPage === page
                  ? 'bg-cyan-50 text-cyan-900 font-bold'
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              <span className="flex items-center gap-2.5">
                <Icon className="w-4 h-4 text-cyan-700" />
                {label}
              </span>
              {badge && (
                <span className="text-xs bg-cyan-100 text-cyan-800 px-2 py-0.5 rounded-full font-mono">
                  {badge}
                </span>
              )}
            </button>
          ))}

          <div className="pt-3 border-t border-slate-100 space-y-2">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-3 mb-1">
              Quick Booking
            </div>
            <div className="grid grid-cols-2 gap-2 px-1">
              <button
                onClick={() => handleNavClick('whale-watching')}
                className="flex flex-col items-center justify-center gap-1.5 p-3 rounded-xl bg-cyan-50 border border-cyan-100 text-cyan-900 transition-colors"
              >
                <Waves className="w-5 h-5 text-cyan-700" />
                <span className="text-[10px] font-bold">Whales</span>
              </button>
              <button
                onClick={() => handleNavClick('shark-dive')}
                className="flex flex-col items-center justify-center gap-1.5 p-3 rounded-xl bg-cyan-50 border border-cyan-100 text-cyan-900 transition-colors"
              >
                <Fish className="w-5 h-5 text-cyan-700" />
                <span className="text-[10px] font-bold">Sharks</span>
              </button>
              <button
                onClick={() => handleNavClick('paragliding')}
                className="flex flex-col items-center justify-center gap-1.5 p-3 rounded-xl bg-cyan-50 border border-cyan-100 text-cyan-900 transition-colors"
              >
                <Wind className="w-5 h-5 text-cyan-700" />
                <span className="text-[10px] font-bold">Paraglide</span>
              </button>
              <button
                onClick={() => handleNavClick('surf-kite')}
                className="flex flex-col items-center justify-center gap-1.5 p-3 rounded-xl bg-cyan-50 border border-cyan-100 text-cyan-900 transition-colors"
              >
                <Compass className="w-5 h-5 text-cyan-700" />
                <span className="text-[10px] font-bold">Surf/Kite</span>
              </button>
            </div>
          </div>

        </div>
      )}
    </header>
  );
};
