import React, { useState } from 'react';
import { 
  BookOpen, 
  Search, 
  Waves, 
  Volume2, 
  Compass, 
  Info, 
  ChevronDown, 
  ChevronUp, 
  Sparkles, 
  Radio, 
  ShieldCheck, 
  Eye, 
  HelpCircle,
  Award
} from 'lucide-react';

export interface GlossaryTerm {
  id: string;
  term: string;
  phonetic: string;
  category: 'behavior' | 'anatomy' | 'tech' | 'weather';
  categoryLabel: string;
  definition: string;
  walkerBayContext: string;
  iconName: string;
}

export const GLOSSARY_TERMS: GlossaryTerm[] = [
  {
    id: 'baleen',
    term: 'Baleen',
    phonetic: '/bəˈliːn/',
    category: 'anatomy',
    categoryLabel: 'Anatomy & Feeding',
    definition: 'Flexible keratinous plates hanging in parallel rows from the upper jaw of mysticete (baleen) whales, acting as a fine comb-like filter to strain microscopic krill, copepods, and plankton from seawater.',
    walkerBayContext: 'Southern Right Whales possess over 200 dark baleen plates up to 2.5 meters long, allowing them to skim-feed through nutrient-rich Benguela current plankton blooms in Walker Bay.',
    iconName: 'Waves',
  },
  {
    id: 'breaching',
    term: 'Breaching',
    phonetic: '/ˈbriːtʃɪŋ/',
    category: 'behavior',
    categoryLabel: 'Whale Behavior',
    definition: 'An acrobatic aerial display where a whale propels up to 90% of its massive body out of the water using powerful tail strokes, rotating in mid-air before crashing onto the sea surface with an explosive splash.',
    walkerBayContext: 'Breaches in Walker Bay generate sound impulses heard kilometers underwater and are used by Southern Rights for long-distance acoustic communication, dislodging barnacles, or mother-calf play.',
    iconName: 'Sparkles',
  },
  {
    id: 'hydrophone',
    term: 'Hydrophone',
    phonetic: '/ˈhaɪdrəfoʊn/',
    category: 'tech',
    categoryLabel: 'Ocean Technology',
    definition: 'A specialized, waterproof acoustic microphone designed to record, detect, and amplify underwater acoustic signals, sound waves, and vocalizations propagating through liquid marine environments.',
    walkerBayContext: 'Walker Bay features 32 submerged hydrophone receivers (including off Sievers Point) transmitting live Southern Right whale calls and boat noise to acoustic research centers and the live app map.',
    iconName: 'Radio',
  },
  {
    id: 'callosities',
    term: 'Callosities',
    phonetic: '/kəˈlɒsɪtiz/',
    category: 'anatomy',
    categoryLabel: 'Anatomy & Identification',
    definition: 'Raised, rough patches of calcified skin found on the heads, lips, and blowholes of Southern Right Whales. They appear white or yellow due to dense colonies of small crustaceans called whale lice (cyamids).',
    walkerBayContext: 'Every Southern Right Whale has a unique pattern of callosities like a human fingerprint, enabling marine biologists to identify individual whales visiting Hermanus year after year.',
    iconName: 'Eye',
  },
  {
    id: 'spyhopping',
    term: 'Spyhopping',
    phonetic: '/ˈspaɪhɒpɪŋ/',
    category: 'behavior',
    categoryLabel: 'Whale Behavior',
    definition: 'A vertical surface behavior where a whale lifts its head straight up out of the water above the surface, holding position using gentle pectoral fin strokes to inspect surroundings above the waterline.',
    walkerBayContext: 'Whales in Walker Bay frequently spyhop just 20 meters off Gearings Point and Sievers Point cliffs, curiously using their lateral eyes to view onlookers gathered along the cliff path.',
    iconName: 'Compass',
  },
  {
    id: 'lobtailing',
    term: 'Lobtailing / Tail Slapping',
    phonetic: '/ˈlɒbteɪlɪŋ/',
    category: 'behavior',
    categoryLabel: 'Whale Behavior',
    definition: 'The act of raising the broad caudal fluke (tail) clear of the water and slamming it down repeatedly against the sea surface, producing a loud slap that echoes underwater and across the bay.',
    walkerBayContext: 'Lobtailing is a powerful social warning or signaling behavior commonly observed among mother whales in Walker Bay when protecting young calves from approaching vessels.',
    iconName: 'Volume2',
  },
  {
    id: 'kelp-horn',
    term: 'Kelp Horn',
    phonetic: '/kɛlp hɔːrn/',
    category: 'weather',
    categoryLabel: 'Coastal Heritage',
    definition: 'A traditional musical signal horn fashioned from the hollow dried stipe and bulb of giant sea bamboo / bull kelp (Ecklonia maxima), unique to the Hermanus whale-watching heritage.',
    walkerBayContext: 'Blown exclusively by the Hermanus Whale Crier along the 12km Cliff Path. Different horn call rhythms indicate whether whales are located at Old Harbour, Sievers Point, or Grotto Beach.',
    iconName: 'Award',
  },
  {
    id: 'douglas-scale',
    term: 'Douglas Sea Scale',
    phonetic: '/ˈdʌɡləs siː skeɪl/',
    category: 'weather',
    categoryLabel: 'Sea State & Weather',
    definition: 'An international maritime rating system (Degrees 0 through 9) measuring sea surface roughness and swell height to determine vessel navigational safety and charter operating conditions.',
    walkerBayContext: 'Walker Bay tours operate safely up to Douglas Scale Stage 3 (Slight Swell, 1.25m - 2.5m). Real-time Douglas ratings feed directly into the Hermanus maritime weather station.',
    iconName: 'ShieldCheck',
  },
  {
    id: 'pod',
    term: 'Pod',
    phonetic: '/pɒd/',
    category: 'behavior',
    categoryLabel: 'Social Dynamics',
    definition: 'A social group or family group of cetaceans (whales or dolphins) traveling, nursing, hunting, or mating together.',
    walkerBayContext: 'During peak spring months in Hermanus, visitors often observe "mating pods" (groups of 3 to 8 whales tumbling together) and "nursery pods" (mother and newborn calf pairs resting in shallow coves).',
    iconName: 'Waves',
  },
  {
    id: 'cage-diving',
    term: 'Surface Cage Diving',
    phonetic: '/seɪf cAyd dY-vIng/',
    category: 'tech',
    categoryLabel: 'Ocean Gear & Tours',
    definition: 'An eco-tourism immersion method using heavy-duty galvanized steel mesh cages suspended at the water surface, allowing divers equipped with wetsuits and masks to safely observe apex marine predators.',
    walkerBayContext: 'Centered in Shark Alley off Gansbaai (30 minutes from Hermanus). Surface cages require no SCUBA certification or oxygen tanks since divers breathe directly from surface air hoses.',
    iconName: 'ShieldCheck',
  },
];

export const MarineGlossary: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedTermId, setExpandedTermId] = useState<string | null>('baleen'); // Default 'baleen' expanded

  const filteredTerms = GLOSSARY_TERMS.filter((term) => {
    const matchesCategory = selectedCategory === 'all' || term.category === selectedCategory;
    const matchesSearch = 
      term.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
      term.definition.toLowerCase().includes(searchQuery.toLowerCase()) ||
      term.walkerBayContext.toLowerCase().includes(searchQuery.toLowerCase()) ||
      term.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleExpand = (id: string) => {
    setExpandedTermId(expandedTermId === id ? null : id);
  };

  return (
    <section id="glossary" className="py-12 lg:py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Component Title & Subtitle */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-200">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 text-cyan-900 border border-cyan-200 text-xs font-semibold tracking-wider uppercase mb-3">
              <BookOpen className="w-3.5 h-3.5 text-cyan-700" />
              <span>Ocean Literacy & Naturalist Reference</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight font-display">
              Marine & Whale Behavior Glossary
            </h2>

            <p className="mt-2 text-slate-600 text-sm sm:text-base max-w-2xl leading-relaxed">
              Essential ocean terminology defining Southern Right whale behaviors, anatomy, hydrophone technology, and coastal weather terms encountered along the Hermanus Cliff Path.
            </p>
          </div>

          {/* Quick Counter Badge */}
          <div className="flex items-center gap-3 bg-slate-50 px-4 py-2.5 rounded-2xl border border-slate-200 shrink-0 self-start md:self-auto">
            <div className="p-2 rounded-xl bg-cyan-100 text-cyan-800">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs text-slate-500 font-medium">Curated Glossary Terms</div>
              <div className="text-base font-bold text-slate-900 font-mono tabular-nums">
                {GLOSSARY_TERMS.length} Key Terminology Entries
              </div>
            </div>
          </div>
        </div>

        {/* Filter Tabs & Search Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-3.5 bg-slate-50 rounded-2xl border border-slate-200">
          
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-xl border transition-all cursor-pointer whitespace-nowrap ${
                selectedCategory === 'all'
                  ? 'bg-slate-900 text-white border-slate-900 shadow-2xs font-bold'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              All Terms ({GLOSSARY_TERMS.length})
            </button>

            <button
              onClick={() => setSelectedCategory('behavior')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-xl border transition-all cursor-pointer whitespace-nowrap ${
                selectedCategory === 'behavior'
                  ? 'bg-cyan-800 text-white border-cyan-700 font-bold'
                  : 'bg-white text-cyan-900 border-slate-200 hover:bg-cyan-50'
              }`}
            >
              Whale Behavior (4)
            </button>

            <button
              onClick={() => setSelectedCategory('anatomy')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-xl border transition-all cursor-pointer whitespace-nowrap ${
                selectedCategory === 'anatomy'
                  ? 'bg-emerald-800 text-white border-emerald-700 font-bold'
                  : 'bg-white text-emerald-900 border-slate-200 hover:bg-emerald-50'
              }`}
            >
              Anatomy & ID (2)
            </button>

            <button
              onClick={() => setSelectedCategory('tech')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-xl border transition-all cursor-pointer whitespace-nowrap ${
                selectedCategory === 'tech'
                  ? 'bg-purple-800 text-white border-purple-700 font-bold'
                  : 'bg-white text-purple-900 border-slate-200 hover:bg-purple-50'
              }`}
            >
              Technology & Gear (2)
            </button>

            <button
              onClick={() => setSelectedCategory('weather')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-xl border transition-all cursor-pointer whitespace-nowrap ${
                selectedCategory === 'weather'
                  ? 'bg-amber-800 text-white border-amber-700 font-bold'
                  : 'bg-white text-amber-900 border-slate-200 hover:bg-amber-50'
              }`}
            >
              Heritage & Weather (2)
            </button>
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search 'baleen', 'hydrophone'..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-slate-300 rounded-xl pl-9 pr-4 py-1.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-cyan-600 focus:ring-1 focus:ring-cyan-600"
            />
          </div>

        </div>

        {/* Glossary Terms Accordion / Cards List */}
        {filteredTerms.length === 0 ? (
          <div className="text-center py-12 bg-slate-50 rounded-2xl border border-slate-200 text-slate-500 text-sm">
            <HelpCircle className="w-8 h-8 text-slate-400 mx-auto mb-2" />
            <p>No glossary terms match your search filter.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredTerms.map((item) => {
              const isExpanded = expandedTermId === item.id;

              return (
                <div
                  key={item.id}
                  className={`rounded-2xl border transition-all cursor-pointer ${
                    isExpanded 
                      ? 'bg-slate-50/90 border-cyan-400 ring-2 ring-cyan-400/20 shadow-xs' 
                      : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/50'
                  }`}
                >
                  {/* Card Main Bar */}
                  <div 
                    onClick={() => toggleExpand(item.id)}
                    className="p-4 sm:p-5 flex items-start justify-between gap-3 select-none"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-lg font-bold text-slate-900 font-display">
                          {item.term}
                        </h3>
                        <span className="text-xs font-mono text-slate-400 font-medium">
                          {item.phonetic}
                        </span>
                      </div>

                      <div className="inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-700 border border-slate-200">
                        {item.categoryLabel}
                      </div>
                    </div>

                    <button 
                      className={`p-1.5 rounded-lg border text-slate-500 transition-transform ${
                        isExpanded ? 'bg-cyan-100 border-cyan-300 text-cyan-800 rotate-180' : 'bg-slate-100 border-slate-200'
                      }`}
                      aria-label="Toggle definition"
                    >
                      <ChevronDown className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Expanded Definition & Context Details */}
                  {isExpanded && (
                    <div className="px-4 pb-5 sm:px-5 space-y-3 pt-1 border-t border-slate-200/80">
                      
                      <div>
                        <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                          Definition
                        </div>
                        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                          {item.definition}
                        </p>
                      </div>

                      <div className="p-3.5 rounded-xl bg-cyan-50/80 border border-cyan-200 text-xs space-y-1 text-cyan-950">
                        <div className="font-bold flex items-center gap-1.5 text-cyan-900">
                          <Info className="w-3.5 h-3.5 text-cyan-700 shrink-0" />
                          <span>Walker Bay Naturalist Context:</span>
                        </div>
                        <p className="text-xs text-slate-700 leading-relaxed">
                          {item.walkerBayContext}
                        </p>
                      </div>

                    </div>
                  )}

                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};
