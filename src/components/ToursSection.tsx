import React, { useState } from 'react';
import { TourPackage } from '../types';
import { formatZAR, formatUSD } from '../utils/pricing';
import { Clock, Users, Check, ArrowRight, ShieldCheck, Ship, Fish, Waves, Compass, Wind } from 'lucide-react';

interface ToursSectionProps {
  tours: TourPackage[];
  onSelectTour: (tourId?: string, category?: 'whale' | 'shark' | 'paragliding' | 'surf-kite') => void;
}

export const ToursSection: React.FC<ToursSectionProps> = ({ tours, onSelectTour }) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'whale' | 'shark' | 'paragliding' | 'surf-kite'>('all');

  const filteredTours = tours.filter(tour => {
    if (activeCategory === 'all') return true;
    if (activeCategory === 'whale') return tour.category === 'whale';
    if (activeCategory === 'shark') return tour.category === 'shark';
    if (activeCategory === 'paragliding') return tour.category === 'paragliding';
    if (activeCategory === 'surf-kite') return tour.category === 'surf-kite';
    return true;
  });

  return (
    <section id="tours" className="py-14 lg:py-20 bg-slate-50/70 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-cyan-800 uppercase tracking-wider mb-2">
            <Ship className="w-4 h-4 text-cyan-700" />
            <span>Certified Marine, Aerial & Beach Adventures</span>
            <span className="text-slate-300">·</span>
            <span>Permit Regulated Expeditions</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight font-display">
            Elite Marine Safaris, Aerial Expeditions & Coastal Academies
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
            From specialist Great White research dives and high-altitude thermal paragliding, to door-to-door aerial whale safaris and professional wave-literacy surf clinics.
          </p>

          {/* 4 Main Categories + All Selector */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-6">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-4 py-2 text-xs font-semibold rounded-xl border transition-all cursor-pointer ${
                activeCategory === 'all'
                  ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              All Offerings ({tours.length})
            </button>
            <button
              onClick={() => setActiveCategory('whale')}
              className={`px-4 py-2 text-xs font-semibold rounded-xl border transition-all flex items-center gap-1.5 cursor-pointer ${
                activeCategory === 'whale'
                  ? 'bg-cyan-700 text-white border-cyan-700 shadow-sm'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              <Waves className="w-3.5 h-3.5 text-cyan-600" />
              <span>Whale Watching</span>
            </button>
            <button
              onClick={() => setActiveCategory('shark')}
              className={`px-4 py-2 text-xs font-semibold rounded-xl border transition-all flex items-center gap-1.5 cursor-pointer ${
                activeCategory === 'shark'
                  ? 'bg-cyan-700 text-white border-cyan-700 shadow-sm'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              <Fish className="w-3.5 h-3.5 text-cyan-600" />
              <span>Shark Cage Diving</span>
            </button>
            <button
              onClick={() => setActiveCategory('paragliding')}
              className={`px-4 py-2 text-xs font-semibold rounded-xl border transition-all flex items-center gap-1.5 cursor-pointer ${
                activeCategory === 'paragliding'
                  ? 'bg-cyan-700 text-white border-cyan-700 shadow-sm'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              <Wind className="w-3.5 h-3.5 text-cyan-600" />
              <span>Paragliding</span>
            </button>
            <button
              onClick={() => setActiveCategory('surf-kite')}
              className={`px-4 py-2 text-xs font-semibold rounded-xl border transition-all flex items-center gap-1.5 cursor-pointer ${
                activeCategory === 'surf-kite'
                  ? 'bg-cyan-700 text-white border-cyan-700 shadow-sm'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              <Compass className="w-3.5 h-3.5 text-cyan-600" />
              <span>Surfing & Kite Surfing Lessons</span>
            </button>
          </div>
        </div>

        {/* Tours Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredTours.map(tour => {
            const isSharkTour = tour.id === 'shark-cage-dive';
            return (
              <div
                key={tour.id}
                className={`bg-white rounded-2xl border transition-all duration-300 flex flex-col group shadow-sm hover:shadow-xl ${
                  isSharkTour 
                    ? 'border-cyan-300 ring-2 ring-cyan-500/10' 
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                {/* Tour Image */}
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-100 rounded-t-2xl">
                  <img
                    src={tour.image}
                    alt={tour.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
                  
                  {tour.badge && (
                    <div className={`absolute top-3 left-3 px-2.5 py-1 text-[11px] font-bold rounded-lg shadow-sm ${
                      isSharkTour 
                        ? 'bg-cyan-600 text-white' 
                        : 'bg-slate-900 text-white'
                    }`}>
                      {tour.badge}
                    </div>
                  )}

                  <div className="absolute bottom-2.5 right-3 text-[11px] font-mono text-white bg-slate-950/80 backdrop-blur-sm px-2 py-0.5 rounded border border-white/20">
                    {tour.duration}
                  </div>
                </div>

                {/* Tour Details */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="text-base font-bold text-slate-900 group-hover:text-cyan-800 transition-colors">
                      {tour.title}
                    </h3>
                    <div className="text-xs text-slate-500 mt-1 line-clamp-2">
                      {tour.subtitle}
                    </div>

                    {/* Highlights list */}
                    <ul className="mt-4 space-y-2 text-xs text-slate-600">
                      {tour.highlights.slice(0, 3).map((h, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-cyan-700 shrink-0 mt-0.5" />
                          <span className="line-clamp-2">{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Price and CTA */}
                  <div className="pt-4 border-t border-slate-100 space-y-3">
                    <div className="flex items-baseline justify-between">
                      <div>
                        <div className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Per Explorer</div>
                        <div className="text-lg font-bold text-slate-900 font-mono tabular-nums">
                          {formatZAR(tour.priceZAR)}
                          <span className="text-xs font-normal text-slate-500 ml-1">
                            ({formatUSD(tour.priceUSD)})
                          </span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => onSelectTour(tour.id, tour.category)}
                      className={`w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-4 text-xs font-semibold rounded-xl active:scale-98 transition-all shadow-xs cursor-pointer ${
                        isSharkTour 
                          ? 'bg-cyan-700 hover:bg-cyan-800 text-white shadow-cyan-900/10' 
                          : tour.id === 'tandem-paragliding'
                          ? 'bg-sky-700 hover:bg-sky-800 text-white shadow-sky-900/10'
                          : 'bg-slate-900 hover:bg-slate-800 text-white'
                      }`}
                    >
                      <span>
                        {tour.id === 'tandem-paragliding' 
                          ? 'Book Tandem Flight' 
                          : isSharkTour 
                          ? 'Book Shark Cage Dive' 
                          : tour.category === 'surf-kite'
                          ? 'Book Surf / Kite Lesson'
                          : tour.id === 'catamaran-safari'
                          ? 'Book Whale Safari'
                          : 'Book Expedition'}
                      </span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
