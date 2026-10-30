import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronDown, 
  MapPin, 
  Info, 
  CircleDollarSign,
  Wind,
  ArrowRight
} from 'lucide-react';
import { PARAGLIDING_MARKET_DATA } from '../data/paraglidingData';
import { WhaleWatchingOperator } from '../types';

interface ParaglidingPageProps {
  onOpenBooking: (tourId?: string, category?: 'whale' | 'shark' | 'paragliding' | 'surf-kite') => void;
}

export const ParaglidingPage: React.FC<ParaglidingPageProps> = ({ onOpenBooking }) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId(prev => prev === id ? null : id);
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-10">

        {/* Global Market Rate Booking CTA */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-2 py-0.5 rounded-lg bg-sky-50 text-sky-700 text-[10px] font-bold uppercase tracking-wider border border-sky-100">
              Flight Concierge Service
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
              Paragliding Market Guide
            </h2>
            <p className="text-slate-600 text-sm max-w-lg leading-relaxed">
              We coordinate with SAHPA-certified instructors to secure your flight window based on thermal conditions and coastal ridge lift.
              <span className="block mt-2 font-bold text-sky-800">Tandem Rates: R1,550 - R2,200</span>
            </p>
          </div>
          <button
            onClick={() => onOpenBooking(undefined, 'paragliding')}
            className="px-8 py-4 rounded-2xl bg-slate-900 hover:bg-sky-900 text-white font-bold text-lg transition-all shadow-xl shadow-slate-900/10 cursor-pointer whitespace-nowrap"
          >
            Book Tandem Flight
          </button>
        </div>

        {/* Categories List */}
        <section className="space-y-6">
          <div className="flex items-center gap-4 px-2">
            <h2 className="text-xl font-bold text-slate-900 font-display">Flight Options</h2>
            <div className="h-px bg-slate-200 flex-1" />
          </div>

          <div className="grid grid-cols-1 gap-4">
            {PARAGLIDING_MARKET_DATA.map((operator) => (
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

        {/* Summary / Takeaway Card */}
        <div className="bg-slate-900 text-white rounded-3xl p-8 shadow-xl border border-slate-800 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-sky-900 text-sky-400 border border-sky-800">
              <Info className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold font-display">How Our Flight Agency Works</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm leading-relaxed text-slate-300">
            <div className="space-y-4">
              <p>
                Paragliding is 100% weather-dependent. We monitor wind velocity at Rotary Way and Voëlklip to match you with the best available flight slot.
              </p>
              <p>
                All flights are conducted by <span className="text-white font-semibold">SAHPA-certified instructors</span> with full safety equipment and passenger insurance included.
              </p>
            </div>
            <div className="space-y-4">
              <p>
                By booking through our agency, you get priority scheduling and automatic transfers to the backup launch site if wind directions shift.
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
        isExpanded ? 'border-sky-500 ring-4 ring-sky-500/5 shadow-md' : 'border-slate-200 shadow-xs hover:border-slate-300'
      }`}
    >
      <button 
        onClick={onToggle}
        className="w-full text-left p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer"
      >
        <div className="space-y-1">
          <h3 className="text-lg font-bold text-slate-900 font-display flex items-center gap-2">
            {operator.name}
            {isExpanded && <ArrowRight className="w-4 h-4 text-sky-500" />}
          </h3>
          <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
            <MapPin className="w-3.5 h-3.5" />
            <span>{operator.locationDetail}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="text-right hidden sm:block">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Starting From</div>
            <div className="text-lg font-bold text-slate-900 font-mono">{operator.pricing.adult.split(' ')[0]}</div>
          </div>
          <div className={`p-2 rounded-xl transition-colors ${isExpanded ? 'bg-sky-500 text-white' : 'bg-slate-100 text-slate-400'}`}>
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
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <PriceItem label="Rate Info" value={operator.pricing.adult} icon={CircleDollarSign} primary />
                <div className="p-4 rounded-xl border bg-slate-50 border-slate-100 flex items-center gap-3">
                  <Wind className="w-5 h-5 text-sky-600" />
                  <div>
                    <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Inclusions</div>
                    <div className="text-xs font-semibold text-slate-700">Transport & Equipment</div>
                  </div>
                </div>
              </div>

              {operator.pricing.notes && (
                <div className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 leading-relaxed">
                  <Info className="w-4 h-4 text-sky-700 shrink-0 mt-0.5" />
                  <p>{operator.pricing.notes}</p>
                </div>
              )}

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                <p className="text-[11px] text-slate-500 italic">
                  * All flights are subject to suitable wind and thermal conditions.
                </p>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => onOpenBooking(undefined, 'paragliding')}
                    className="px-4 py-2 text-xs font-bold text-white bg-slate-900 hover:bg-sky-900 rounded-xl transition-all cursor-pointer shadow-sm"
                  >
                    Check Availability
                  </button>
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
  <div className={`p-4 rounded-xl border ${primary ? 'bg-sky-50 border-sky-200' : 'bg-white border-slate-100'}`}>
    <div className="flex items-center gap-2 mb-2">
      <Icon className={`w-3.5 h-3.5 ${primary ? 'text-sky-700' : 'text-slate-400'}`} />
      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{label}</span>
    </div>
    <div className={`font-mono font-bold leading-tight ${primary ? 'text-sky-900 text-base' : 'text-slate-700 text-sm'}`}>
      {value}
    </div>
  </div>
);
