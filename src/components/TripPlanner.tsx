import React, { useState } from 'react';
import { TourPackage } from '../types';
import { 
  Calendar, 
  Clock, 
  ChevronDown, 
  ChevronUp, 
  Check, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  Sparkles, 
  DollarSign, 
  Car, 
  Waves, 
  Fish, 
  Wind, 
  Wine, 
  Compass, 
  ArrowRight,
  BookmarkPlus,
  Share2,
  Printer
} from 'lucide-react';

interface TripPlannerProps {
  tours: TourPackage[];
  onOpenBooking: (tourId?: string) => void;
}

export interface SelectableActivity {
  id: string;
  title: string;
  subtitle: string;
  category: 'whale' | 'shark' | 'air' | 'surf' | 'wine' | 'transport';
  duration: string;
  priceZAR: number;
  assignedDay: 1 | 2 | 3;
  timeSlot: 'Morning' | 'Afternoon' | 'Evening';
  image: string;
  tourId?: string;
}

// Available Pool of Activities & Transport Services
const ALL_ACTIVITIES_POOL: SelectableActivity[] = [
  // Tours
  {
    id: 'act-catamaran',
    title: 'Catamaran Southern Right Whale Safari',
    subtitle: 'Walker Bay 2-Hour Marine Expedition',
    category: 'whale',
    duration: '2 Hours',
    priceZAR: 1350,
    assignedDay: 1,
    timeSlot: 'Afternoon',
    image: '/tour_catamaran_expedition_1792562652925.jpg',
    tourId: 'catamaran-safari',
  },
  {
    id: 'act-shark-cage',
    title: 'Shark Cage Diving & Conservation Boat',
    subtitle: 'Dyer Island & Shark Alley Great White Tour',
    category: 'shark',
    duration: '4 Hours',
    priceZAR: 2850,
    assignedDay: 2,
    timeSlot: 'Morning',
    image: '/hero_shark_cage_real_1793002838731.jpg',
    tourId: 'shark-cage-dive',
  },
  {
    id: 'act-wine-tour',
    title: 'Hemel-en-Aarde Wine Safari Tasting',
    subtitle: '4 Premium Cool-Climate Wine Estates & Pairings',
    category: 'wine',
    duration: '5 Hours',
    priceZAR: 950,
    assignedDay: 2,
    timeSlot: 'Afternoon',
    image: '/hermanus_coastal_shuttle_1792990229807.jpg',
    tourId: 'wine-tour',
  },
  {
    id: 'act-paraglide',
    title: 'Rotary Way Tandem Paragliding Flight',
    subtitle: '280m Ridge Launch over Walker Bay',
    category: 'air',
    duration: '1.5 Hours',
    priceZAR: 1950,
    assignedDay: 3,
    timeSlot: 'Morning',
    image: '/hero_paraglide_real_1793002851758.jpg',
    tourId: 'tandem-paragliding',
  },
  {
    id: 'act-surf-kitesurf',
    title: 'Grotto Beach Surf & Lagoon Kite School',
    subtitle: 'ISA Certified Surfing & Wing-Foiling Lesson',
    category: 'surf',
    duration: '2.5 Hours',
    priceZAR: 650,
    assignedDay: 3,
    timeSlot: 'Afternoon',
    image: '/hero_surfkite_real_1793002865367.jpg',
    tourId: 'surf-lessons-camps',
  },
  // Transport Services
  {
    id: 'act-cpt-shuttle',
    title: 'Cape Town Airport (CPT) Direct Shuttle',
    subtitle: 'Door-to-door luxury air-conditioned van',
    category: 'transport',
    duration: '1.5 Hours',
    priceZAR: 1200,
    assignedDay: 1,
    timeSlot: 'Morning',
    image: '/hermanus_coastal_shuttle_1792990229807.jpg',
  },
  {
    id: 'act-ebike-rental',
    title: 'Hermanus Coastal Fat-Tire E-Bike Rental',
    subtitle: 'Full-day electric bike for Cliff Path exploration',
    category: 'transport',
    duration: 'Full Day',
    priceZAR: 450,
    assignedDay: 1,
    timeSlot: 'Morning',
    image: '/cliff_path_viewpoint_1792562653990.jpg',
  },
  {
    id: 'act-shark-transfer',
    title: 'Gansbaai Shark Cage Direct Transfer',
    subtitle: 'Return shuttle to Kleinbaai slipway quay',
    category: 'transport',
    duration: '45 Mins',
    priceZAR: 350,
    assignedDay: 2,
    timeSlot: 'Morning',
    image: '/shark_cage_diving_expedition_1792564255886.jpg',
  },
];

export const TripPlanner: React.FC<TripPlannerProps> = ({ tours, onOpenBooking }) => {
  // Selected activity IDs state
  const [selectedIds, setSelectedIds] = useState<string[]>([
    'act-cpt-shuttle',
    'act-catamaran',
    'act-shark-cage',
    'act-wine-tour',
    'act-paraglide'
  ]);

  // Activity Day Reassignments
  const [dayAssignments, setDayAssignments] = useState<Record<string, 1 | 2 | 3>>({
    'act-cpt-shuttle': 1,
    'act-catamaran': 1,
    'act-ebike-rental': 1,
    'act-shark-cage': 2,
    'act-shark-transfer': 2,
    'act-wine-tour': 2,
    'act-paraglide': 3,
    'act-surf-kitesurf': 3,
  });

  // Accordion collapsed state for Days 1, 2, 3
  const [openDays, setOpenDays] = useState<Record<number, boolean>>({
    1: true,
    2: true,
    3: true,
  });

  const toggleDayAccordion = (day: number) => {
    setOpenDays(prev => ({ ...prev, [day]: !prev[day] }));
  };

  const toggleActivitySelection = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(item => item !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const handleDayChange = (actId: string, newDay: 1 | 2 | 3) => {
    setDayAssignments(prev => ({ ...prev, [actId]: newDay }));
  };

  // Preset Itinerary Shortcuts
  const applyPreset = (presetType: 'classic' | 'thrill' | 'family') => {
    if (presetType === 'classic') {
      setSelectedIds(['act-cpt-shuttle', 'act-catamaran', 'act-wine-tour', 'act-ebike-rental', 'act-paraglide']);
      setDayAssignments({
        'act-cpt-shuttle': 1,
        'act-ebike-rental': 1,
        'act-catamaran': 1,
        'act-wine-tour': 2,
        'act-paraglide': 3,
      });
    } else if (presetType === 'thrill') {
      setSelectedIds(['act-shark-cage', 'act-shark-transfer', 'act-paraglide', 'act-surf-kitesurf']);
      setDayAssignments({
        'act-shark-cage': 2,
        'act-shark-transfer': 2,
        'act-paraglide': 1,
        'act-surf-kitesurf': 3,
      });
    } else if (presetType === 'family') {
      setSelectedIds(['act-catamaran', 'act-ebike-rental', 'act-wine-tour', 'act-surf-kitesurf']);
      setDayAssignments({
        'act-catamaran': 1,
        'act-ebike-rental': 1,
        'act-wine-tour': 2,
        'act-surf-kitesurf': 3,
      });
    }
  };

  // Selected items calculation
  const selectedActivities = ALL_ACTIVITIES_POOL.filter(act => selectedIds.includes(act.id));
  const totalCostZAR = selectedActivities.reduce((sum, act) => sum + act.priceZAR, 0);

  const getActivitiesForDay = (day: 1 | 2 | 3) => {
    return selectedActivities.filter(act => (dayAssignments[act.id] || act.assignedDay) === day);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'whale': return <Waves className="w-3.5 h-3.5 text-cyan-700" />;
      case 'shark': return <Fish className="w-3.5 h-3.5 text-emerald-700" />;
      case 'air': return <Wind className="w-3.5 h-3.5 text-sky-700" />;
      case 'surf': return <Compass className="w-3.5 h-3.5 text-blue-700" />;
      case 'wine': return <Wine className="w-3.5 h-3.5 text-purple-700" />;
      case 'transport': return <Car className="w-3.5 h-3.5 text-amber-700" />;
      default: return <Sparkles className="w-3.5 h-3.5 text-slate-700" />;
    }
  };

  return (
    <section id="trip-planner" className="py-12 lg:py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Title Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-200">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-100 text-cyan-950 border border-cyan-200 text-xs font-semibold tracking-wider uppercase mb-3">
              <Calendar className="w-3.5 h-3.5 text-cyan-700" />
              <span>Personalized Coastal Itinerary Builder</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight font-display">
              Hermanus 3-Day Trip Planner
            </h2>

            <p className="mt-2 text-slate-600 text-sm sm:text-base max-w-2xl leading-relaxed">
              Customize your dream Hermanus ocean safari, shark dive, paraglide flight, and wine valley transfers into a seamless 3-day collapsible itinerary.
            </p>
          </div>

          {/* Quick Preset Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block w-full sm:w-auto">
              Preset Templates:
            </span>
            <button
              onClick={() => applyPreset('classic')}
              className="px-3 py-1.5 text-xs font-semibold rounded-xl bg-white text-slate-800 border border-slate-200 hover:bg-cyan-50 hover:border-cyan-300 transition-colors cursor-pointer shadow-2xs"
            >
              Classic 3-Day Highlights
            </button>
            <button
              onClick={() => applyPreset('thrill')}
              className="px-3 py-1.5 text-xs font-semibold rounded-xl bg-white text-slate-800 border border-slate-200 hover:bg-amber-50 hover:border-amber-300 transition-colors cursor-pointer shadow-2xs"
            >
              Apex Thrill-Seeker
            </button>
            <button
              onClick={() => applyPreset('family')}
              className="px-3 py-1.5 text-xs font-semibold rounded-xl bg-white text-slate-800 border border-slate-200 hover:bg-emerald-50 hover:border-emerald-300 transition-colors cursor-pointer shadow-2xs"
            >
              Family Relaxer
            </button>
          </div>
        </div>

        {/* Main Grid: Activity Picker (Left) + 3-Day Accordion Itinerary (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Col: Activity & Transport Selector List */}
          <div className="lg:col-span-5 bg-white border border-slate-200 rounded-3xl p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-base font-bold text-slate-900 font-display">
                  Select Activities & Transfers
                </h3>
                <p className="text-xs text-slate-500">Check items to include in your 3-day itinerary</p>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-cyan-100 text-cyan-900 border border-cyan-200 font-mono text-xs font-bold">
                {selectedIds.length} Selected
              </span>
            </div>

            <div className="space-y-2.5 max-h-[520px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-slate-200">
              {ALL_ACTIVITIES_POOL.map((act) => {
                const isSelected = selectedIds.includes(act.id);
                return (
                  <div
                    key={act.id}
                    onClick={() => toggleActivitySelection(act.id)}
                    className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                      isSelected
                        ? 'bg-cyan-50/90 border-cyan-400 shadow-2xs ring-1 ring-cyan-400/30'
                        : 'bg-slate-50/60 border-slate-200 hover:bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-lg border flex items-center justify-center shrink-0 transition-colors ${
                        isSelected ? 'bg-cyan-700 border-cyan-700 text-white' : 'bg-white border-slate-300'
                      }`}>
                        {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>

                      <div>
                        <div className="flex items-center gap-1.5 text-[11px] font-bold text-cyan-900 uppercase tracking-wider">
                          {getCategoryIcon(act.category)}
                          <span>{act.duration}</span>
                        </div>
                        <h4 className="text-xs font-bold text-slate-900 leading-snug">
                          {act.title}
                        </h4>
                        <div className="text-[11px] text-slate-500 truncate max-w-[210px]">
                          {act.subtitle}
                        </div>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <div className="text-xs font-bold text-slate-900 font-mono">
                        R{act.priceZAR.toLocaleString()}
                      </div>
                      <div className="text-[10px] text-slate-400">
                        per guest
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Col: 3-Day Collapsible Accordion Itinerary */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Itinerary Total Summary Bar */}
            <div className="bg-slate-900 text-white p-5 rounded-3xl border border-slate-800 shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
                  Personalized 3-Day Estimate
                </div>
                <div className="text-2xl font-bold text-white font-mono mt-0.5">
                  R{totalCostZAR.toLocaleString()} ZAR
                  <span className="text-xs text-slate-400 font-normal font-sans ml-2">
                    (~${Math.round(totalCostZAR / 18)} USD)
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">
                  Includes {selectedActivities.length} customized activities across Days 1–3
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => onOpenBooking(selectedActivities[0]?.tourId)}
                  disabled={selectedActivities.length === 0}
                  className="px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs inline-flex items-center gap-2 transition-colors cursor-pointer shadow-md disabled:opacity-50"
                >
                  <span>Book Full Itinerary</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* 3-DAY ACCORDION PANELS */}
            {[1, 2, 3].map((dayNum) => {
              const dayActivities = getActivitiesForDay(dayNum as 1 | 2 | 3);
              const isOpen = openDays[dayNum];

              const dayTitles = {
                1: 'Day 1: Coastal Arrival & Cliff Path Discovery',
                2: 'Day 2: Apex Marine & Hemel-en-Aarde Wine Safari',
                3: 'Day 3: Scenic Peaks, Paragliding & Lagoon Adventure',
              };

              return (
                <div 
                  key={dayNum}
                  className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-xs"
                >
                  {/* Accordion Header Bar */}
                  <div 
                    onClick={() => toggleDayAccordion(dayNum)}
                    className="p-4 sm:p-5 flex items-center justify-between gap-4 bg-slate-50/80 hover:bg-slate-100/80 transition-colors cursor-pointer select-none border-b border-slate-200/60"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-cyan-700 text-white font-bold text-sm font-mono flex items-center justify-center shrink-0 shadow-2xs">
                        D{dayNum}
                      </div>
                      <div>
                        <h4 className="text-sm sm:text-base font-bold text-slate-900 font-display">
                          {dayTitles[dayNum as 1 | 2 | 3]}
                        </h4>
                        <div className="text-xs text-slate-500 flex items-center gap-2">
                          <span>{dayActivities.length} scheduled activities</span>
                          <span>·</span>
                          <span className="font-mono text-cyan-900 font-semibold">
                            Subtotal: R{dayActivities.reduce((s, a) => s + a.priceZAR, 0).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-slate-500 hidden sm:inline">
                        {isOpen ? 'Collapse Day' : 'Expand Details'}
                      </span>
                      <div className={`p-1.5 rounded-lg border border-slate-200 bg-white text-slate-600 transition-transform ${isOpen ? 'rotate-180' : ''}`}>
                        <ChevronDown className="w-4 h-4" />
                      </div>
                    </div>
                  </div>

                  {/* Accordion Body Content */}
                  {isOpen && (
                    <div className="p-4 sm:p-5 space-y-3 bg-white">
                      {dayActivities.length === 0 ? (
                        <div className="text-center py-6 text-slate-400 text-xs border border-dashed border-slate-200 rounded-2xl">
                          No activities assigned to Day {dayNum}. Select items from the left panel or reassign an existing activity.
                        </div>
                      ) : (
                        dayActivities.map((act) => (
                          <div 
                            key={act.id}
                            className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                          >
                            <div className="flex items-center gap-3">
                              <img
                                src={act.image}
                                alt={act.title}
                                className="w-14 h-14 rounded-xl object-cover shrink-0 border border-slate-200"
                              />
                              <div>
                                <div className="flex items-center gap-1.5 text-[10px] font-bold text-cyan-900 uppercase tracking-wider">
                                  {getCategoryIcon(act.category)}
                                  <span>{act.timeSlot} · {act.duration}</span>
                                </div>
                                <h5 className="text-xs sm:text-sm font-bold text-slate-900">
                                  {act.title}
                                </h5>
                                <p className="text-[11px] text-slate-500">
                                  {act.subtitle}
                                </p>
                              </div>
                            </div>

                            <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-200">
                              <div className="text-xs font-bold text-slate-900 font-mono">
                                R{act.priceZAR.toLocaleString()}
                              </div>

                              {/* Day Reassignment Dropdown */}
                              <div className="flex items-center gap-1">
                                <span className="text-[10px] text-slate-400 font-medium">Day:</span>
                                <select
                                  value={dayAssignments[act.id] || act.assignedDay}
                                  onChange={(e) => handleDayChange(act.id, Number(e.target.value) as 1 | 2 | 3)}
                                  className="bg-white border border-slate-300 rounded-lg px-2 py-1 text-xs text-slate-800 font-bold focus:outline-none focus:border-cyan-600"
                                >
                                  <option value={1}>Day 1</option>
                                  <option value={2}>Day 2</option>
                                  <option value={3}>Day 3</option>
                                </select>
                              </div>
                            </div>

                          </div>
                        ))
                      )}
                    </div>
                  )}

                </div>
              );
            })}

          </div>

        </div>

      </div>
    </section>
  );
};
