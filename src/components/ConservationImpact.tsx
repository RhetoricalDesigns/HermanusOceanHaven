import React, { useState } from 'react';
import { 
  ShieldCheck, 
  TrendingUp, 
  Heart, 
  Waves, 
  Fish, 
  BarChart3, 
  Award, 
  Activity, 
  CheckCircle2, 
  Info, 
  Globe, 
  ArrowUpRight, 
  Radio, 
  Sparkles, 
  MapPin, 
  Calendar,
  Anchor
} from 'lucide-react';

interface ConservationImpactProps {
  onOpenBooking?: (tourId?: string) => void;
}

// Historical population survey data points (Walker Bay & Overberg Nursery Waters)
const POPULATION_TREND_DATA = [
  { year: 1980, count: 120, calves: 18, label: 'Post-Whaling Ban Baseline', detail: 'Commercial whaling outlawed in SA waters.' },
  { year: 1990, count: 340, calves: 62, label: 'Walker Bay MPA Gazetted', detail: 'Sanctuary created with vessel restrictions.' },
  { year: 2000, count: 680, calves: 145, label: 'Acoustic Patrol Array Deployed', detail: 'First acoustic bio-loggers deployed off Sievers Point.' },
  { year: 2010, count: 1150, calves: 280, label: 'SAMSA Permit Enforcement', detail: 'Strict 300m vessel buffer zones enforced.' },
  { year: 2020, count: 1580, calves: 410, label: 'Global Sanctuary Designation', detail: 'Mission Blue Hope Spot recognition.' },
  { year: 2026, count: 2140, calves: 590, label: 'Current Season Estimate', detail: 'Record nursing mother & calf pair arrivals.' },
];

// Seasonal Calving Breakdown (Monthly distribution of sightings)
const MONTHLY_CALVING_DATA = [
  { month: 'Jun', motherCalf: 15, solitaryAdults: 45, total: 60, condition: 'Arrival Phase' },
  { month: 'Jul', motherCalf: 65, solitaryAdults: 110, total: 175, condition: 'Mating Pod Peak' },
  { month: 'Aug', motherCalf: 140, solitaryAdults: 130, total: 270, condition: 'Calving Surge' },
  { month: 'Sep', motherCalf: 290, solitaryAdults: 180, total: 470, condition: 'Peak Nursery Density' },
  { month: 'Oct', motherCalf: 310, solitaryAdults: 150, total: 460, condition: 'Peak Nursing & Play' },
  { month: 'Nov', motherCalf: 180, solitaryAdults: 70, total: 250, condition: 'Migration Preparation' },
  { month: 'Dec', motherCalf: 45, solitaryAdults: 15, total: 60, condition: 'Antarctic Departure' },
];

// Species Health & Protection Ratings
const SPECIES_PROTECTION_CARDS = [
  {
    id: 'right-whale',
    species: 'Southern Right Whale',
    scientificName: 'Eubalaena australis',
    status: 'Recovering Population',
    statusBadge: 'Least Concern (SA Waters)',
    badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300',
    populationEst: '~2,140 in Overberg',
    growthRate: '+6.8% Annual Growth',
    keyThreat: 'Ship Strikes & Entanglement',
    protectionMeasure: '120km² Vessel Speed & Distance Zone',
    icon: Waves,
  },
  {
    id: 'great-white',
    species: 'Great White Shark',
    scientificName: 'Carcharodon carcharias',
    status: 'Protected Apex Species',
    statusBadge: 'Vulnerable (Global)',
    badgeColor: 'bg-amber-100 text-amber-900 border-amber-300',
    populationEst: '~320 Sighted Annually',
    growthRate: 'Stable Inshore Sightings',
    keyThreat: 'Orca Predation & Unlawful Longlines',
    protectionMeasure: 'Dyer Island Marine Reserve Protection',
    icon: Fish,
  },
  {
    id: 'african-penguin',
    species: 'African Penguin',
    scientificName: 'Spheniscus demersus',
    status: 'Endangered Seabird',
    statusBadge: 'Endangered',
    badgeColor: 'bg-rose-100 text-rose-900 border-rose-300',
    populationEst: '~900 Breeding Pairs',
    growthRate: 'Rehabilitation Focused',
    keyThreat: 'Sardine Preyshift & Habitat Loss',
    protectionMeasure: 'Dyer Island Sanctuary Rehabilitation',
    icon: ShieldCheck,
  },
];

export const ConservationImpact: React.FC<ConservationImpactProps> = ({ onOpenBooking }) => {
  const [selectedYearIndex, setSelectedYearIndex] = useState<number>(5); // Default to 2026
  const [activeTab, setActiveTab] = useState<'recovery' | 'calving' | 'metrics' | 'species'>('recovery');

  const currentYearData = POPULATION_TREND_DATA[selectedYearIndex];
  const maxCount = Math.max(...POPULATION_TREND_DATA.map(d => d.count));

  return (
    <section id="conservation" className="py-14 lg:py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Title & Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-950 border border-emerald-200 text-xs font-semibold tracking-wider uppercase">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
            <span>Walker Bay Marine Protected Area Sanctuary</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight font-display">
            Conservation Impact & Population Data
          </h2>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Over 45 years of scientific monitoring in Walker Bay. Explore data visualizations tracking the recovery of Southern Right Whales and annual marine protection metrics in South Africa’s ocean sanctuary.
          </p>
        </div>

        {/* Highlighted Protection Metric Cards (4-Card Grid) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2 hover:border-emerald-300 transition-colors">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Whale Recovery</span>
              <div className="p-2 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200">
                <TrendingUp className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-slate-900 font-mono tabular-nums">
              +1,680%
            </div>
            <p className="text-xs text-emerald-800 font-medium flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Population surge since 1980 ban</span>
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2 hover:border-cyan-300 transition-colors">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Sanctuary Area</span>
              <div className="p-2 rounded-xl bg-cyan-50 text-cyan-700 border border-cyan-200">
                <Globe className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-slate-900 font-mono tabular-nums">
              120 km²
            </div>
            <p className="text-xs text-cyan-800 font-medium flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Protected Marine Sanctuary Zone</span>
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2 hover:border-blue-300 transition-colors">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">2026 Calf Births</span>
              <div className="p-2 rounded-xl bg-blue-50 text-blue-700 border border-blue-200">
                <Heart className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-slate-900 font-mono tabular-nums">
              590 Calves
            </div>
            <p className="text-xs text-blue-800 font-medium flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Record season in Walker Bay</span>
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2 hover:border-purple-300 transition-colors">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Acoustic Monitoring</span>
              <div className="p-2 rounded-xl bg-purple-50 text-purple-700 border border-purple-200">
                <Radio className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-slate-900 font-mono tabular-nums">
              32 Receivers
            </div>
            <p className="text-xs text-purple-800 font-medium flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Ocean acoustic monitoring grid</span>
            </p>
          </div>

        </div>

        {/* Data Visualization Tabs & Main Card Box */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-8">
          
          {/* Navigation Controls inside Card */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-cyan-800" />
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 font-display">
                Conservation Data Visualizations
              </h3>
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
              <button
                onClick={() => setActiveTab('recovery')}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-xl transition-all cursor-pointer whitespace-nowrap border ${
                  activeTab === 'recovery'
                    ? 'bg-slate-900 text-white border-slate-900 shadow-2xs font-bold'
                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                }`}
              >
                1. Population Trend (1980 - 2026)
              </button>

              <button
                onClick={() => setActiveTab('calving')}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-xl transition-all cursor-pointer whitespace-nowrap border ${
                  activeTab === 'calving'
                    ? 'bg-slate-900 text-white border-slate-900 shadow-2xs font-bold'
                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                }`}
              >
                2. Seasonal Calving Pattern
              </button>

              <button
                onClick={() => setActiveTab('species')}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-xl transition-all cursor-pointer whitespace-nowrap border ${
                  activeTab === 'species'
                    ? 'bg-slate-900 text-white border-slate-900 shadow-2xs font-bold'
                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                }`}
              >
                3. Species Health Scorecard
              </button>
            </div>
          </div>

          {/* TAB 1: POPULATION TREND DATA VISUALIZATION */}
          {activeTab === 'recovery' && (
            <div className="space-y-6">
              
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
                <div>
                  <div className="text-xs font-bold text-cyan-800 uppercase tracking-wider">Historical Census Recovery</div>
                  <div className="text-base font-bold text-slate-900 mt-0.5">
                    Southern Right Whale Count in Walker Bay Sanctuary
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Interactive aerial survey census data compiled by Mammal Research Institute Whale Unit.
                  </p>
                </div>

                <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-2xs">
                  <div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase">Selected Year</div>
                    <div className="text-base font-bold text-slate-900 font-mono">{currentYearData.year}</div>
                  </div>
                  <div className="h-6 w-px bg-slate-200" />
                  <div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase">Estimated Whales</div>
                    <div className="text-base font-bold text-emerald-700 font-mono">{currentYearData.count}</div>
                  </div>
                </div>
              </div>

              {/* Bar & Trend Chart Visualization Container */}
              <div className="p-6 bg-slate-950 rounded-2xl border border-slate-800 text-white space-y-6">
                
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span className="font-mono">Census Count (Adults & Calves)</span>
                  <span className="font-mono text-cyan-400">Max Survey Capacity: 2,500</span>
                </div>

                {/* SVG Visual Bar Chart with Interaction */}
                <div className="grid grid-cols-6 gap-2 sm:gap-4 items-end h-56 pt-6 pb-2 border-b border-slate-800">
                  {POPULATION_TREND_DATA.map((item, index) => {
                    const isSelected = selectedYearIndex === index;
                    const heightPercent = Math.round((item.count / maxCount) * 100);

                    return (
                      <div
                        key={item.year}
                        onClick={() => setSelectedYearIndex(index)}
                        className="flex flex-col items-center gap-2 group cursor-pointer h-full justify-end"
                      >
                        {/* Hover Tooltip Value */}
                        <div className={`text-[10px] sm:text-xs font-mono font-bold transition-all ${
                          isSelected ? 'text-emerald-400 scale-110' : 'text-slate-400 group-hover:text-white'
                        }`}>
                          {item.count}
                        </div>

                        {/* Bar Pillar */}
                        <div className="w-full bg-slate-800/80 rounded-t-xl h-full flex items-end overflow-hidden relative">
                          <div
                            className={`w-full rounded-t-xl transition-all duration-500 ${
                              isSelected 
                                ? 'bg-gradient-to-t from-emerald-600 to-cyan-400 shadow-lg shadow-cyan-500/20' 
                                : 'bg-slate-700 group-hover:bg-slate-600'
                            }`}
                            style={{ height: `${heightPercent}%` }}
                          />
                        </div>

                        {/* Year Label */}
                        <div className={`text-xs font-bold font-mono transition-colors ${
                          isSelected ? 'text-cyan-300' : 'text-slate-400 group-hover:text-slate-200'
                        }`}>
                          {item.year}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Year Detail Banner */}
                <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div>
                    <span className="font-bold text-cyan-300 uppercase tracking-wider font-mono mr-2">
                      {currentYearData.year} Milestone:
                    </span>
                    <span className="text-slate-200 font-semibold">{currentYearData.label}</span>
                    <p className="text-slate-400 text-[11px] mt-0.5">{currentYearData.detail}</p>
                  </div>

                  <div className="flex items-center gap-3 shrink-0 bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800">
                    <span className="text-slate-400">Calf Ratio:</span>
                    <span className="font-mono font-bold text-emerald-400">{currentYearData.calves} Calves Born</span>
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* TAB 2: SEASONAL CALVING PATTERN DATA VISUALIZATION */}
          {activeTab === 'calving' && (
            <div className="space-y-6">
              
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="text-xs font-bold text-cyan-800 uppercase tracking-wider">Annual Migration Cycle</div>
                  <div className="text-base font-bold text-slate-900 mt-0.5">
                    Monthly Sighting Distribution in Walker Bay
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Monthly census comparing nursing mother-and-calf pairs versus migrating solitary adults.
                  </p>
                </div>

                <div className="flex items-center gap-3 text-xs font-semibold">
                  <span className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded bg-cyan-600 inline-block" />
                    <span>Mother & Calf Pairs</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded bg-slate-300 inline-block" />
                    <span>Solitary Adults</span>
                  </span>
                </div>
              </div>

              {/* Monthly Stacked Visual Bar Grid */}
              <div className="grid grid-cols-1 md:grid-cols-7 gap-3">
                {MONTHLY_CALVING_DATA.map((m) => {
                  const maxTotal = 500;
                  const pairHeightPct = Math.round((m.motherCalf / maxTotal) * 100);
                  const adultHeightPct = Math.round((m.solitaryAdults / maxTotal) * 100);

                  return (
                    <div 
                      key={m.month}
                      className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-cyan-300 transition-colors space-y-3"
                    >
                      <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                        <span className="font-bold text-sm text-slate-900 font-mono">{m.month}</span>
                        <span className="text-[10px] font-bold text-cyan-800 bg-cyan-50 px-1.5 py-0.5 rounded border border-cyan-200">
                          {m.total} Total
                        </span>
                      </div>

                      {/* Visual Stacked Progress Indicator */}
                      <div className="space-y-1.5 pt-1">
                        <div>
                          <div className="flex justify-between text-[10px] text-slate-500 mb-0.5 font-mono">
                            <span>Calf Pairs</span>
                            <span className="font-bold text-cyan-900">{m.motherCalf}</span>
                          </div>
                          <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                            <div className="bg-cyan-600 h-full rounded-full" style={{ width: `${pairHeightPct * 2}%` }} />
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between text-[10px] text-slate-500 mb-0.5 font-mono">
                            <span>Solitary Adults</span>
                            <span className="font-bold text-slate-700">{m.solitaryAdults}</span>
                          </div>
                          <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                            <div className="bg-slate-400 h-full rounded-full" style={{ width: `${adultHeightPct * 2}%` }} />
                          </div>
                        </div>
                      </div>

                      <div className="text-[10px] font-medium text-slate-500 truncate pt-1 border-t border-slate-200/60">
                        {m.condition}
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>
          )}

          {/* TAB 3: SPECIES HEALTH SCORECARD */}
          {activeTab === 'species' && (
            <div className="space-y-6">
              
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
                <div className="text-xs font-bold text-cyan-800 uppercase tracking-wider">Ecosystem Health Audit</div>
                <div className="text-base font-bold text-slate-900 mt-0.5">
                  Walker Bay & Dyer Island Protected Species Scorecard
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  Status ratings, annual population estimates, key environmental threats, and active conservation protocols.
                </p>
              </div>

              {/* 3-Card Species Scorecard Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {SPECIES_PROTECTION_CARDS.map((card) => {
                  const Icon = card.icon;
                  return (
                    <div 
                      key={card.id}
                      className="p-5 rounded-2xl bg-slate-50 border border-slate-200/90 hover:bg-white hover:border-cyan-300 hover:shadow-xs transition-all space-y-4"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="text-xs font-bold text-slate-500 italic font-mono">{card.scientificName}</div>
                          <h4 className="text-lg font-bold text-slate-900 mt-0.5">{card.species}</h4>
                        </div>

                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border shrink-0 ${card.badgeColor}`}>
                          {card.statusBadge}
                        </span>
                      </div>

                      <div className="space-y-2 pt-2 border-t border-slate-200 text-xs">
                        <div className="flex justify-between items-center">
                          <span className="text-slate-500 font-medium">Population Est:</span>
                          <span className="font-bold text-slate-900 font-mono">{card.populationEst}</span>
                        </div>

                        <div className="flex justify-between items-center">
                          <span className="text-slate-500 font-medium">Annual Growth:</span>
                          <span className="font-bold text-emerald-700 font-mono">{card.growthRate}</span>
                        </div>

                        <div className="flex justify-between items-center">
                          <span className="text-slate-500 font-medium">Key Threat:</span>
                          <span className="font-bold text-slate-800">{card.keyThreat}</span>
                        </div>
                      </div>

                      <div className="p-3 rounded-xl bg-white border border-slate-200 text-xs text-slate-700 space-y-1">
                        <div className="font-bold text-cyan-900 flex items-center gap-1">
                          <ShieldCheck className="w-3.5 h-3.5 text-cyan-700" />
                          <span>Active Protection Protocol:</span>
                        </div>
                        <p className="text-[11px] text-slate-600 leading-snug">{card.protectionMeasure}</p>
                      </div>

                    </div>
                  );
                })}
              </div>

            </div>
          )}

          {/* Bottom Card Footer Action Callout */}
          <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900">SAMSA & CapeNature Eco-Certified Expeditions</div>
                <p className="text-xs text-slate-500">100% of boat tour proceeds directly fund marine conservation research and whale sanctuary patrols.</p>
              </div>
            </div>

            <button
              onClick={() => onOpenBooking?.()}
              className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-cyan-900 text-white text-xs font-semibold inline-flex items-center justify-center gap-2 transition-colors cursor-pointer shrink-0"
            >
              <span>Book Eco-Certified Tour</span>
              <ArrowUpRight className="w-4 h-4 text-cyan-400" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
