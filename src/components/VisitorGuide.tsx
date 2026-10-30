import React, { useState } from 'react';
import { CLIFF_PATH_VIEWPOINTS } from '../data/mockData';
import { playKelpHornBlast } from '../utils/audioSynth';
import { 
  MapPin, 
  Volume2, 
  Compass, 
  ShieldCheck, 
  ChevronRight,
  Info,
  Footprints,
  Eye,
  Leaf,
  AlertTriangle,
  Phone,
  Clock,
  Sparkles,
  Check
} from 'lucide-react';

interface TrailZone {
  id: string;
  name: string;
  segment: string;
  distanceKm: number;
  surface: string;
  accessibility: string;
  highlight: string;
  bestWhaleActivity: string;
}

const TRAIL_ZONES: TrailZone[] = [
  {
    id: 'zone-1',
    name: 'Zone 1: West Coast Promenade',
    segment: 'New Harbour ⇄ Gearings Point',
    distanceKm: 2.5,
    surface: 'Smooth Paved Tarmac & Concrete',
    accessibility: '100% Wheelchair & Stroller Accessible',
    highlight: 'Windsor Bay, Marine Hotel tidal pools, historic Old Harbour slips',
    bestWhaleActivity: 'Nursing cow & calf pairs seeking calm, sheltered rocky inlets within 30m of shore.',
  },
  {
    id: 'zone-2',
    name: 'Zone 2: Central Marine Amphitheater',
    segment: 'Gearings Point ⇄ Sievers Point',
    distanceKm: 2.1,
    surface: 'Hard-Packed Crushed Stone & Timber Lookouts',
    accessibility: 'Paved ramps at Gearings Point & Sievers Point',
    highlight: 'Dreunkrans thundering sea caves, Whale Crier patrol territory, 180° open panoramic vistas',
    bestWhaleActivity: 'Breaching, lobtailing, and deep-water shelf approaches within 15–20 meters of the rocks.',
  },
  {
    id: 'zone-3',
    name: 'Zone 3: East Fynbos Sanctuary',
    segment: 'Sievers Point ⇄ Castle Rock',
    distanceKm: 2.7,
    surface: 'Natural Sandstone Footpath & Coastal Gravel',
    accessibility: 'Natural footpath with stone steps at rocky rises',
    highlight: 'Pristine coastal protea fynbos, basking rock dassies, peaceful uncrowded viewing benches',
    bestWhaleActivity: 'Tail sailing, fluke displays, and transiting pods feeding peacefully along kelp fringes.',
  },
  {
    id: 'zone-4',
    name: 'Zone 4: Grotto Dunes & Lagoon Reach',
    segment: 'Castle Rock ⇄ Grotto Beach & Estuary',
    distanceKm: 4.7,
    surface: 'Elevated Sandstone Bluffs & Blue Flag White Beach Sand',
    accessibility: 'Paved ramp at Grotto Pavilion; firm beach sand',
    highlight: 'Klein River Lagoon mouth, De Kelders mountain backdrop, Blue Flag beach expanses',
    bestWhaleActivity: 'Surf-line cruising where whales swim parallel to beach walkers just past the wave break.',
  },
];

export const VisitorGuide: React.FC = () => {
  const [selectedViewpoint, setSelectedViewpoint] = useState(CLIFF_PATH_VIEWPOINTS[2]); // Sievers Point default
  const [selectedZone, setSelectedZone] = useState<string>('zone-2');
  const [activeHornBlast, setActiveHornBlast] = useState<number | null>(null);

  const handleHornSound = (blasts: number) => {
    setActiveHornBlast(blasts);
    playKelpHornBlast(blasts);
    setTimeout(() => setActiveHornBlast(null), blasts * 1000);
  };

  return (
    <section id="guide" className="py-14 lg:py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Header - 100% Focused on the 12km Cliff Path */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-cyan-800 uppercase tracking-wider mb-2">
            <Footprints className="w-4 h-4 text-cyan-700" />
            <span>12-Kilometer Heritage Coastal Trail</span>
            <span className="text-slate-300">·</span>
            <span>Fernkloof Nature Reserve</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight font-display">
            The Hermanus 12km Cliff Path Guide
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
            Widely acclaimed as the world's premier land-based whale watching route. Carved into rugged sandstone bluffs from the New Harbour to Grotto Beach, the cliff path brings you within 20 meters of surfacing Southern Right Whales without setting foot on a boat.
          </p>
        </div>

        {/* Trail Key Metrics Bar */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-slate-50 border border-slate-200/90 rounded-xl p-4 text-center">
            <div className="text-xs font-mono font-bold text-cyan-800 uppercase tracking-wider">Total Trail Length</div>
            <div className="text-2xl font-bold text-slate-900 mt-1 font-display">12.0 Kilometers</div>
            <div className="text-xs text-slate-500 mt-0.5">New Harbour ⇄ Grotto Beach</div>
          </div>
          <div className="bg-slate-50 border border-slate-200/90 rounded-xl p-4 text-center">
            <div className="text-xs font-mono font-bold text-cyan-800 uppercase tracking-wider">Trail Access</div>
            <div className="text-2xl font-bold text-slate-900 mt-1 font-display">Free 24/7 Access</div>
            <div className="text-xs text-slate-500 mt-0.5">Municipal Coastal Reserve</div>
          </div>
          <div className="bg-slate-50 border border-slate-200/90 rounded-xl p-4 text-center">
            <div className="text-xs font-mono font-bold text-cyan-800 uppercase tracking-wider">Viewing Benches</div>
            <div className="text-2xl font-bold text-slate-900 mt-1 font-display">45+ Hardwood Benches</div>
            <div className="text-xs text-slate-500 mt-0.5">Dedicated Memorial Vantage Points</div>
          </div>
          <div className="bg-slate-50 border border-slate-200/90 rounded-xl p-4 text-center">
            <div className="text-xs font-mono font-bold text-cyan-800 uppercase tracking-wider">Wheelchair Access</div>
            <div className="text-2xl font-bold text-slate-900 mt-1 font-display">4 Paved Sections</div>
            <div className="text-xs text-slate-500 mt-0.5">Old Harbour, Gearings & Sievers</div>
          </div>
        </div>

        {/* 1. Interactive 10 Cliff Path Viewpoints Explorer */}
        <div className="bg-slate-50/70 rounded-2xl border border-slate-200 p-6 lg:p-8 space-y-8 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
            <div>
              <span className="text-xs font-mono font-bold text-cyan-800 tracking-wider">CLIFF VANTAGE DIRECTORY</span>
              <h3 className="text-xl font-bold text-slate-900 mt-1 font-display">
                Strategic Shore-Based Whale Viewpoints
              </h3>
              <p className="text-xs text-slate-600 mt-0.5">
                Select a point along the 12km trail to view distance, wheelchair accessibility, and specific whale behaviors observed.
              </p>
            </div>
            <div className="text-xs text-slate-600 flex items-center gap-2 font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-500" /> All Points Free Public Entry
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Viewpoint Selector List */}
            <div className="lg:col-span-5 space-y-2">
              <div className="text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                Select a Cliff Vantage Point
              </div>
              {CLIFF_PATH_VIEWPOINTS.map(vp => {
                const isSelected = vp.id === selectedViewpoint.id;
                return (
                  <div
                    key={vp.id}
                    onClick={() => setSelectedViewpoint(vp)}
                    className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                      isSelected
                        ? 'bg-white border-cyan-500 shadow-sm ring-2 ring-cyan-500/10'
                        : 'bg-white border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div>
                      <div className="text-xs font-bold text-slate-900 flex items-center gap-2">
                        <span>{vp.name}</span>
                        {vp.afrikaansName && (
                          <span className="text-[10px] text-slate-500 font-normal">({vp.afrikaansName})</span>
                        )}
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5">
                        {vp.distanceFromOldHarbourKm} km along cliff path from town center
                      </div>
                    </div>
                    <ChevronRight className={`w-4 h-4 ${isSelected ? 'text-cyan-700' : 'text-slate-400'}`} />
                  </div>
                );
              })}
            </div>

            {/* Viewpoint Detail Card */}
            <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200 p-6 space-y-5 shadow-xs">
              <div className="flex items-start justify-between border-b border-slate-200 pb-4">
                <div>
                  <span className="text-xs font-mono font-bold text-cyan-800">CLIFF PROFILE & GEOLOGY</span>
                  <h4 className="text-2xl font-bold text-slate-900 mt-1 font-display">
                    {selectedViewpoint.name}
                  </h4>
                  <div className="text-xs text-slate-500 mt-1">
                    Walker Bay Sandstone Bluff · Hermanus Cliff Path
                  </div>
                </div>
                <div className="text-right font-mono text-xs text-slate-700">
                  <div className="text-cyan-800 font-bold text-sm">{selectedViewpoint.distanceFromOldHarbourKm} km</div>
                  <div className="text-[10px] text-slate-500">From Old Harbour Centre</div>
                </div>
              </div>

              <p className="text-sm text-slate-600 leading-relaxed">
                {selectedViewpoint.description}
              </p>

              {/* Specific Whale Activity Sighting Callout */}
              <div className="p-3.5 rounded-lg bg-cyan-50/60 border border-cyan-200/80 space-y-1">
                <div className="text-xs font-semibold text-cyan-900 flex items-center gap-1.5">
                  <Eye className="w-3.5 h-3.5 text-cyan-700" />
                  Whale Behaviors Seen From This Cliff Point
                </div>
                <p className="text-xs text-cyan-950 leading-relaxed">
                  {selectedViewpoint.bestWhaleActivity}
                </p>
              </div>

              {/* Viewpoint Amenities Grid */}
              <div className="grid grid-cols-3 gap-3 text-xs pt-1">
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <div className="text-slate-500 text-[11px]">Wheelchair Access</div>
                  <div className={`font-semibold mt-0.5 ${selectedViewpoint.wheelchairAccessible ? 'text-emerald-700' : 'text-amber-700'}`}>
                    {selectedViewpoint.wheelchairAccessible ? 'Paved Ramp' : 'Rocky Steps'}
                  </div>
                </div>

                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <div className="text-slate-500 text-[11px]">Viewing Benches</div>
                  <div className="font-semibold text-slate-900 mt-0.5 font-mono">
                    {selectedViewpoint.benchesCount} Wooden Benches
                  </div>
                </div>

                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <div className="text-slate-500 text-[11px]">Roadside Parking</div>
                  <div className="font-semibold text-slate-900 mt-0.5">
                    {selectedViewpoint.parkingAvailable ? 'Adjacent Bay' : 'Street Walk Only'}
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* 2. The 4 Distinct Trail Zones (Route Breakdown) */}
        <div className="bg-slate-50/70 rounded-2xl border border-slate-200 p-6 lg:p-8 space-y-6 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-4">
            <div>
              <span className="text-xs font-mono font-bold text-cyan-800">12KM ROUTE SEGMENTS</span>
              <h3 className="text-xl font-bold text-slate-900 mt-1 font-display">
                Trail Zones & Walking Conditions
              </h3>
            </div>
            <span className="text-xs text-slate-500 font-mono">West to East Elevation</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {TRAIL_ZONES.map(zone => {
              const isActive = selectedZone === zone.id;
              return (
                <div
                  key={zone.id}
                  onClick={() => setSelectedZone(zone.id)}
                  className={`p-5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between space-y-4 ${
                    isActive
                      ? 'bg-white border-cyan-500 shadow-md ring-2 ring-cyan-500/10'
                      : 'bg-white border-slate-200 hover:border-slate-300 shadow-xs'
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-cyan-800">{zone.distanceKm} km</span>
                      <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                        {zone.accessibility.includes('100%') ? 'Paved' : 'Scenic Trail'}
                      </span>
                    </div>
                    <h4 className="text-base font-bold text-slate-900 font-display">
                      {zone.name}
                    </h4>
                    <p className="text-xs font-mono text-slate-500">
                      {zone.segment}
                    </p>
                    <p className="text-xs text-slate-600 leading-relaxed pt-1">
                      {zone.highlight}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 text-[11px] text-cyan-900 bg-cyan-50/50 p-2.5 rounded-lg">
                    <strong className="block text-[10px] uppercase tracking-wider text-cyan-800 mb-0.5">Whale Activity:</strong>
                    {zone.bestWhaleActivity}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 3. The Whale Crier Heritage on the Cliff Path */}
        <div className="bg-slate-50/70 rounded-2xl border border-slate-200 p-6 lg:p-8 space-y-6 shadow-sm">
          <div className="max-w-4xl mx-auto space-y-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-cyan-800 uppercase tracking-wider">
              <Volume2 className="w-4 h-4 text-cyan-700" />
              <span>The World's Only Whale Crier</span>
              <span className="text-slate-300">·</span>
              <span>Patrolling Since 1992</span>
            </div>

            <h3 className="text-2xl font-bold text-slate-900 font-display">
              Kelp Horn Signals Along the Cliff Path
            </h3>

            <p className="text-sm text-slate-600 leading-relaxed">
              Hermanus is the only town in the world with an official <strong>Whale Crier</strong>. Patrolling the 12km cliff path daily during migration season, the Crier alerts coastal walkers and residents to whale positions by sounding rhythmic codes on a dried kelp horn (<em className="text-cyan-800 font-serif">Ecklonia maxima</em>).
            </p>

            {/* Interactive Horn Soundboard */}
            <div className="pt-2 space-y-2">
              <div className="text-xs font-semibold text-slate-700">
                Click to hear the authentic kelp horn codes:
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  onClick={() => handleHornSound(1)}
                  disabled={activeHornBlast !== null}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    activeHornBlast === 1 
                      ? 'bg-cyan-700 text-white border-cyan-700 shadow-sm' 
                      : 'bg-white text-slate-800 border-slate-200 hover:border-cyan-400 shadow-xs'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-bold mb-1">
                    <span>1 Horn Blast</span>
                    <Volume2 className="w-3.5 h-3.5" />
                  </div>
                  <div className={`text-[11px] ${activeHornBlast === 1 ? 'text-cyan-100' : 'text-slate-500'}`}>
                    Whale at Old Harbour
                  </div>
                </button>

                <button
                  onClick={() => handleHornSound(2)}
                  disabled={activeHornBlast !== null}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    activeHornBlast === 2 
                      ? 'bg-cyan-700 text-white border-cyan-700 shadow-sm' 
                      : 'bg-white text-slate-800 border-slate-200 hover:border-cyan-400 shadow-xs'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-bold mb-1">
                    <span>2 Horn Blasts</span>
                    <Volume2 className="w-3.5 h-3.5" />
                  </div>
                  <div className={`text-[11px] ${activeHornBlast === 2 ? 'text-cyan-100' : 'text-slate-500'}`}>
                    Whale at Sievers Point
                  </div>
                </button>

                <button
                  onClick={() => handleHornSound(3)}
                  disabled={activeHornBlast !== null}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    activeHornBlast === 3 
                      ? 'bg-cyan-700 text-white border-cyan-700 shadow-sm' 
                      : 'bg-white text-slate-800 border-slate-200 hover:border-cyan-400 shadow-xs'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-bold mb-1">
                    <span>3 Horn Blasts</span>
                    <Volume2 className="w-3.5 h-3.5" />
                  </div>
                  <div className={`text-[11px] ${activeHornBlast === 3 ? 'text-cyan-100' : 'text-slate-500'}`}>
                    Whale at Gearings Point
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 4. Shore-Based Whale Watching Field Guide (Cliff Path Spotting Tips) */}
        <div className="space-y-6">
          <div className="border-b border-slate-200 pb-3">
            <span className="text-xs font-mono font-bold text-cyan-800">FIELD PROTOCOL</span>
            <h3 className="text-xl font-bold text-slate-900 mt-1 font-display">
              How to Spot Whales From the Cliffs (Naked-Eye Cues)
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-3 shadow-xs">
              <div className="p-2.5 rounded-lg bg-cyan-50 text-cyan-700 w-fit border border-cyan-200">
                <Compass className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-slate-900">Look for the "V-Blow" Spout</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Southern Right Whales possess two separated blowholes. When they exhale warm breath into the crisp coastal air, it produces a distinctive V-shaped vapour spout up to 5 meters tall. Spotting the V-blow against the ocean horizon is the fastest way to pinpoint a pod from cliff lookouts.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-3 shadow-xs">
              <div className="p-2.5 rounded-lg bg-cyan-50 text-cyan-700 w-fit border border-cyan-200">
                <Clock className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-slate-900">Time With High Tide & Morning Light</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                During high tide, ocean water floods into the kelp channels right beneath the rocks, allowing 50-ton mothers to swim within 15–20 meters of Sievers Point and Gearings Point. Morning sunlight eliminates water surface glare, allowing you to see right down into the clear blue water.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-3 shadow-xs">
              <div className="p-2.5 rounded-lg bg-cyan-50 text-cyan-700 w-fit border border-cyan-200">
                <Sparkles className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-slate-900">White Callosities on the Head</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Unlike Humpbacks or Bryde's, Southern Rights have no dorsal fin on their back. Instead, look for their wide, smooth dark backs and distinctive white rough callosity patches on the head and lower jaw. These markings are unique to each individual whale, just like a human fingerprint.
              </p>
            </div>
          </div>
        </div>

        {/* 5. Cliff Path Trail Regulations, Ecology & Safety */}
        <div className="bg-slate-50/70 rounded-2xl border border-slate-200 p-6 lg:p-8 space-y-6 shadow-sm">
          <div className="border-b border-slate-200 pb-3">
            <span className="text-xs font-mono font-bold text-cyan-800">SAFETY & CONSERVATION</span>
            <h3 className="text-xl font-bold text-slate-900 mt-1 font-display">
              Cliff Path Trail Etiquette & Safety Essentials
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-600">
            <div className="space-y-2 p-4 bg-white rounded-xl border border-slate-200">
              <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <span>Cliff Edge Precaution</span>
              </div>
              <p className="leading-relaxed">
                The Hermanus Cliff Path has natural unfenced sandstone precipices with drops up to 20 meters into tidal surge channels. Always stay on marked pathways and supervise children closely. Avoid slippery wet rocks after heavy surf.
              </p>
            </div>

            <div className="space-y-2 p-4 bg-white rounded-xl border border-slate-200">
              <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                <Leaf className="w-4 h-4 text-emerald-600" />
                <span>Protected Flora & Fynbos</span>
              </div>
              <p className="leading-relaxed">
                The path meanders through the UNESCO-recognized Cape Floral Kingdom containing over 1,400 fynbos species. Picking indigenous flowers, disturbing rock dassies, or removing coastal rocks is strictly prohibited by municipal bylaw.
              </p>
            </div>

            <div className="space-y-2 p-4 bg-white rounded-xl border border-slate-200">
              <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                <ShieldCheck className="w-4 h-4 text-cyan-700" />
                <span>Dogs On Leash Regulations</span>
              </div>
              <p className="leading-relaxed">
                Dogs are permitted along the Cliff Path but must remain securely on a leash at all times. This prevents accidental cliff falls and protects ground-nesting African Black Oystercatchers along the rocky beaches.
              </p>
            </div>
          </div>

          <div className="p-3 bg-white rounded-lg border border-slate-200 text-xs text-slate-600 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 font-mono">
              <ShieldCheck className="w-4 h-4 text-cyan-700" />
              <span>NSRI Sea Rescue Hermanus (Station 17): <strong>+27 (0)82 990 5967</strong></span>
            </div>
            <div className="text-slate-500 text-[11px]">Overstrand Emergency Law Enforcement: +27 (0)28 313 8980</div>
          </div>
        </div>

      </div>
    </section>
  );
};
