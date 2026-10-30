import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronDown, 
  MapPin, 
  Info, 
  Users, 
  CircleDollarSign,
  Compass,
  ArrowRight
} from 'lucide-react';
import { WHALE_WATCHING_OPERATORS } from '../data/whaleWatchingData';
import { WhaleWatchingOperator } from '../types';

interface WhaleWatchingPageProps {
  onOpenBooking: (tourId?: string, category?: 'whale' | 'shark' | 'paragliding' | 'surf-kite') => void;
}

export const WhaleWatchingPage: React.FC<WhaleWatchingPageProps> = ({ onOpenBooking }) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId(prev => prev === id ? null : id);
  };

  // Group by location for better organization
  const locations = Array.from(new Set(WHALE_WATCHING_OPERATORS.map(o => o.location)));

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-10">

        {/* Global Market Rate Booking CTA */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-2 py-0.5 rounded-lg bg-cyan-50 text-cyan-700 text-[10px] font-bold uppercase tracking-wider border border-cyan-100">
              Agency Concierge Service
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
              Whale Safari Market Guide
            </h2>
            <p className="text-slate-600 text-sm max-w-lg leading-relaxed">
              We shop around across all licensed local operators to secure the best available rate and vessel for your selected date.
              <span className="block mt-2 font-bold text-cyan-800">Average Rate: R1,300 - R1,580</span>
            </p>
          </div>
          <button
            onClick={() => onOpenBooking(undefined, 'whale')}
            className="px-8 py-4 rounded-2xl bg-slate-900 hover:bg-cyan-900 text-white font-bold text-lg transition-all shadow-xl shadow-slate-900/10 cursor-pointer whitespace-nowrap"
          >
            Get Best Market Rate
          </button>
        </div>

        {/* Locations Navigation (Subtle) */}
        <div className="flex flex-wrap justify-center gap-3">
          {locations.map(loc => (
            <a 
              key={loc}
              href={`#${loc.toLowerCase().replace(/\s+/g, '-')}`}
              className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 text-sm font-semibold hover:border-cyan-500 hover:text-cyan-700 transition-all shadow-xs"
            >
              {loc}
            </a>
          ))}
        </div>

        {/* Categories List by Location */}
        {locations.map(location => (
          <section 
            key={location} 
            id={location.toLowerCase().replace(/\s+/g, '-')}
            className="space-y-6"
          >
            <div className="flex items-center gap-4 px-2">
              <h2 className="text-xl font-bold text-slate-900 font-display">{location} Region</h2>
              <div className="h-px bg-slate-200 flex-1" />
            </div>

            <div className="grid grid-cols-1 gap-4">
              {WHALE_WATCHING_OPERATORS.filter(o => o.location === location).map((operator) => (
                <OperatorCard 
                  key={operator.id} 
                  operator={operator} 
                  isExpanded={expandedId === operator.id}
                  onToggle={() => toggleExpand(operator.id)}
                  onOpenBooking={onOpenBooking}
                />
              ))}
            </div>
          </section>
        ))}

        {/* Summary / Takeaway Card */}
        <div className="bg-slate-900 text-white rounded-3xl p-8 shadow-xl border border-slate-800 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-cyan-900 text-cyan-400 border border-cyan-800">
              <Info className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold font-display">How Our Agency Works</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm leading-relaxed text-slate-300">
            <div className="space-y-4">
              <p>
                Instead of booking with one specific company, we monitor the daily availability and pricing across <span className="text-white font-semibold">all licensed operators</span> in the region.
              </p>
              <p>
                We consider <span className="text-white font-semibold">Senior (60+) benefits</span>, seasonal SA resident specials, and vessel size preferences to ensure you get the best value and experience.
              </p>
            </div>
            <div className="space-y-4">
              <p>
                By aggregating all offerings, we can offer more flexibility with time slots and higher certainty of sightings by selecting the best performing launch site for that day's conditions.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

const OperatorCard: React.FC<{ 
  operator: WhaleWatchingOperator; 
  isExpanded: boolean;
  onToggle: () => void;
  onOpenBooking: (tourId?: string, category?: 'whale' | 'shark' | 'paragliding' | 'surf-kite') => void;
}> = ({ operator, isExpanded, onToggle, onOpenBooking }) => {
  return (
    <div 
      className={`bg-white rounded-2xl border transition-all overflow-hidden ${
        isExpanded ? 'border-cyan-500 ring-4 ring-cyan-500/5 shadow-md' : 'border-slate-200 shadow-xs hover:border-slate-300'
      }`}
    >
      <button 
        onClick={onToggle}
        className="w-full text-left p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer"
      >
        <div className="space-y-1">
          <h3 className="text-lg font-bold text-slate-900 font-display flex items-center gap-2">
            {operator.name}
            {isExpanded && <ArrowRight className="w-4 h-4 text-cyan-500" />}
          </h3>
          <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
            <MapPin className="w-3.5 h-3.5" />
            <span>{operator.locationDetail}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="text-right hidden sm:block">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Market Rate Range</div>
            <div className="text-lg font-bold text-slate-900 font-mono">{operator.pricing.adult.split(' ')[0]}</div>
          </div>
          <div className={`p-2 rounded-xl transition-colors ${isExpanded ? 'bg-cyan-500 text-white' : 'bg-slate-100 text-slate-400'}`}>
            <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
          </div>
        </div>
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <div className="px-6 pb-6 pt-2 border-t border-slate-100 space-y-6">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <PriceItem label="Adult Average" value={operator.pricing.adult} icon={CircleDollarSign} primary />
                {operator.pricing.studentSenior && (
                  <PriceItem label="Student / Senior" value={operator.pricing.studentSenior} icon={Users} />
                )}
                {operator.pricing.child && (
                  <PriceItem label="Child (Average)" value={operator.pricing.child} icon={Users} />
                )}
                {operator.pricing.infant && (
                  <PriceItem label="Infant" value={operator.pricing.infant} icon={Users} />
                )}
              </div>

              {operator.pricing.notes && (
                <div className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 leading-relaxed">
                  <Info className="w-4 h-4 text-cyan-700 shrink-0 mt-0.5" />
                  <p>{operator.pricing.notes}</p>
                </div>
              )}

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                <p className="text-[11px] text-slate-500 italic">
                  * Prices are market averages. Our concierge will secure the best rate for your date.
                </p>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => onOpenBooking(undefined, 'whale')}
                    className="px-4 py-2 text-xs font-bold text-white bg-slate-900 hover:bg-cyan-900 rounded-xl transition-all cursor-pointer shadow-sm"
                  >
                    Shop Best Rate for Me
                  </button>
                  <div className="hidden sm:block text-[11px] font-bold text-emerald-600 uppercase tracking-wider">
                    2026 Price Index
                  </div>
                </div>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const PriceItem: React.FC<{ 
  label: string; 
  value: string; 
  icon: React.ElementType; 
  primary?: boolean 
}> = ({ label, value, icon: Icon, primary }) => (
  <div className={`p-4 rounded-xl border ${primary ? 'bg-cyan-50 border-cyan-200' : 'bg-white border-slate-100'}`}>
    <div className="flex items-center gap-2 mb-2">
      <Icon className={`w-3.5 h-3.5 ${primary ? 'text-cyan-700' : 'text-slate-400'}`} />
      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{label}</span>
    </div>
    <div className={`font-mono font-bold leading-tight ${primary ? 'text-cyan-900 text-base' : 'text-slate-700 text-sm'}`}>
      {value}
    </div>
  </div>
);
