import React from 'react';
import { TourPackage } from '../types';
import { formatZAR, formatUSD } from '../utils/pricing';
import { 
  Clock, 
  Check, 
  ArrowRight, 
  ShieldCheck, 
  Ship, 
  Fish, 
  Waves, 
  Compass, 
  Wind,
  Info,
  Award,
  Calendar
} from 'lucide-react';

interface ServiceDetailsPageProps {
  category: 'whale' | 'shark' | 'paragliding' | 'surf-kite';
  tours: TourPackage[];
  onOpenBooking: (tourId?: string, category?: 'whale' | 'shark' | 'paragliding' | 'surf-kite') => void;
}

const CATEGORY_META = {
  whale: {
    title: 'Southern Right Whale Safaris',
    tagline: 'Witness the Giants of Walker Bay',
    description: 'Hermanus is recognized by the WWF as one of the 12 best whale watching destinations in the world. Get up close to Southern Right, Humpback, and Bryde\'s whales in their natural nursery.',
    icon: Waves,
    color: 'cyan',
    badge: 'Seasonal Peak: Jun - Dec'
  },
  shark: {
    title: 'Shark Cage Diving Expeditions',
    tagline: 'Face the Ocean\'s Ultimate Predators',
    description: 'Venture to Gansbaai, the shark capital of the world. Experience the thrill of seeing Great White and Bronze Whaler sharks from the safety of a surface cage, accompanied by marine biologists.',
    icon: Fish,
    color: 'cyan',
    badge: 'Year-Round Activity'
  },
  paragliding: {
    title: 'Tandem Paragliding Flights',
    tagline: 'Soar Above the Whale Coast',
    description: 'Experience the ultimate aerial vantage point. Launch from the scenic Rotary Way ridge and glide over the Hermanus coastline with panoramic views of the bay and mountains.',
    icon: Wind,
    color: 'sky',
    badge: 'Panoramic Views'
  },
  'surf-kite': {
    title: 'Surfing & Kitesurfing Academy',
    tagline: 'Ride the Waves & Catch the Wind',
    description: 'From the rolling breaks of Grotto Beach to the flat-water perfection of Klein River Lagoon. Professional coaching for all levels in one of South Africa\'s most beautiful coastal settings.',
    icon: Compass,
    color: 'slate',
    badge: 'Expert Coaching'
  }
};

export const ServiceDetailsPage: React.FC<ServiceDetailsPageProps> = ({ 
  category, 
  tours, 
  onOpenBooking 
}) => {
  const meta = CATEGORY_META[category];
  const Icon = meta.icon;
  const filteredTours = tours.filter(t => t.category === category);

  return (
    <div className="bg-white min-h-screen">
      
      {/* Dynamic Hero Header */}
      <div className={`relative py-16 lg:py-24 overflow-hidden border-b border-slate-200 ${
        category === 'shark' ? 'bg-cyan-900 text-white' : 
        category === 'paragliding' ? 'bg-sky-900 text-white' :
        category === 'surf-kite' ? 'bg-slate-900 text-white' :
        'bg-cyan-950 text-white'
      }`}>
        {/* Subtle background patterns */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:32px_32px]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-bold uppercase tracking-widest mb-6">
            <Icon className="w-3.5 h-3.5" />
            <span>{meta.badge}</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight font-display mb-4">
            {meta.title}
          </h1>
          
          <p className="text-xl sm:text-2xl font-medium text-cyan-100/90 mb-8 max-w-3xl mx-auto italic">
            {meta.tagline}
          </p>
          
          <p className="text-base sm:text-lg text-white/70 max-w-2xl mx-auto leading-relaxed">
            {meta.description}
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <button 
              onClick={() => onOpenBooking(undefined, category)}
              className="px-8 py-4 rounded-2xl bg-white text-slate-900 font-bold text-lg hover:bg-cyan-50 transition-all shadow-xl cursor-pointer"
            >
              Book {meta.title}
            </button>
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm font-semibold">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>SAMSA Certified</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        
        {/* Available Packages Grid */}
        <div className="space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-100 pb-6">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Available Expedition Packages</h2>
              <p className="text-slate-500 text-sm mt-1">Select your preferred adventure style and duration</p>
            </div>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <Info className="w-4 h-4" />
              <span>Showing {filteredTours.length} Verified Offerings</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTours.map(tour => (
              <TourPackageCard 
                key={tour.id} 
                tour={tour} 
                onSelect={() => onOpenBooking(undefined, category)} 
              />
            ))}
          </div>
        </div>

        {/* Requirements & Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200">
              <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2 mb-4">
                <ShieldCheck className="w-5 h-5 text-cyan-700" />
                Preparation & Safety Guidelines
              </h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-600">
                <li className="flex gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Arrive 30 minutes before your scheduled departure time.</span>
                </li>
                <li className="flex gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Bring a warm windproof jacket even in summer.</span>
                </li>
                <li className="flex gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Sunscreen, hat, and polarized sunglasses recommended.</span>
                </li>
                <li className="flex gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Motion sickness medication advised 1 hour before boat trips.</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="p-8 rounded-3xl bg-slate-900 text-white space-y-6">
            <h3 className="text-xl font-bold font-display flex items-center gap-2">
              <Calendar className="w-5 h-5 text-cyan-400" />
              Custom Group Booking?
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              We specialize in corporate team building, private charters, and educational school groups. 
              Enquire for volume discounts and tailored itineraries.
            </p>
            <button 
              onClick={() => onOpenBooking(undefined, category)}
              className="w-full py-3 rounded-xl bg-cyan-700 hover:bg-cyan-600 text-white font-bold text-sm transition-all cursor-pointer shadow-lg shadow-cyan-900/40"
            >
              Contact Concierge
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

const TourPackageCard: React.FC<{ 
  tour: TourPackage; 
  onSelect: () => void 
}> = ({ tour, onSelect }) => (
  <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group">
    <div className="relative aspect-[16/11] overflow-hidden">
      <img 
        src={tour.image} 
        alt={tour.title} 
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        referrerPolicy="no-referrer"
      />
      {tour.badge && (
        <div className="absolute top-4 left-4 px-3 py-1 bg-slate-900 text-white text-[10px] font-bold rounded-lg shadow-sm">
          {tour.badge}
        </div>
      )}
      <div className="absolute bottom-3 right-4 px-2 py-1 bg-white/90 backdrop-blur-sm rounded-lg border border-slate-200 text-[10px] font-mono font-bold text-slate-700">
        {tour.duration}
      </div>
    </div>

    <div className="p-6 flex-1 flex flex-col justify-between space-y-6">
      <div className="space-y-2">
        <h3 className="text-lg font-bold text-slate-900 group-hover:text-cyan-800 transition-colors">
          {tour.title}
        </h3>
        <p className="text-xs text-slate-500 line-clamp-2">
          {tour.subtitle}
        </p>
      </div>

      <div className="space-y-4">
        <ul className="space-y-2 text-xs text-slate-600">
          {tour.highlights.slice(0, 3).map((h, i) => (
            <li key={i} className="flex items-start gap-2">
              <Check className="w-3.5 h-3.5 text-cyan-600 shrink-0 mt-0.5" />
              <span>{h}</span>
            </li>
          ))}
        </ul>

        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
          <div>
            <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Rate Per Adult</div>
            <div className="text-xl font-bold text-slate-900 font-mono">
              {formatZAR(tour.priceZAR)}
            </div>
          </div>
          <button 
            onClick={onSelect}
            className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-cyan-900 text-white text-xs font-bold flex items-center gap-2 transition-all cursor-pointer shadow-md"
          >
            <span>Reserve Spot</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  </div>
);
