import React, { useState, useEffect } from 'react';
import { 
  APIProvider, 
  Map, 
  AdvancedMarker, 
  InfoWindow, 
  useMap 
} from '@vis.gl/react-google-maps';
import { MAP_LOCATIONS, MapLocationPOI } from '../data/mapData';
import { 
  MapPin, 
  Compass, 
  Waves, 
  Fish, 
  Wind, 
  Wine, 
  Car, 
  Search, 
  Calendar, 
  ArrowRight, 
  Navigation, 
  Clock, 
  CheckCircle2, 
  AlertTriangle,
  Sparkles
} from 'lucide-react';

interface RegionalMapProps {
  onOpenBooking: (tourId?: string) => void;
}

// Camera controller helper component using `useMap`
const CameraController: React.FC<{ targetCoords: { lat: number; lng: number; zoom: number } | null }> = ({ targetCoords }) => {
  const map = useMap();

  useEffect(() => {
    if (map && targetCoords) {
      map.panTo({ lat: targetCoords.lat, lng: targetCoords.lng });
      map.setZoom(targetCoords.zoom);
    }
  }, [map, targetCoords]);

  return null;
};

const REGIONAL_PRESETS = [
  { id: 'all', name: 'Entire Overberg Coast', lat: -34.48, lng: 19.30, zoom: 10 },
  { id: 'hermanus', name: 'Hermanus Town & Cliffs', lat: -34.4170, lng: 19.2550, zoom: 13 },
  { id: 'walker', name: 'Walker Bay Sanctuary', lat: -34.4600, lng: 19.2800, zoom: 11 },
  { id: 'gansbaai', name: 'Gansbaai & Shark Alley', lat: -34.6400, lng: 19.3400, zoom: 12 },
  { id: 'wine', name: 'Hemel-en-Aarde Wine Valley', lat: -34.3500, lng: 19.2600, zoom: 12 },
];

export const RegionalMap: React.FC<RegionalMapProps> = ({ onOpenBooking }) => {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '';
  const [selectedPoi, setSelectedPoi] = useState<MapLocationPOI | null>(null);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('all');
  const [activeRegionPreset, setActiveRegionPreset] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [mapType, setMapType] = useState<'roadmap' | 'satellite' | 'hybrid' | 'terrain'>('hybrid');
  const [targetCoords, setTargetCoords] = useState<{ lat: number; lng: number; zoom: number } | null>({
    lat: -34.46,
    lng: 19.29,
    zoom: 11,
  });

  // Quota warning banner state
  const [quotaExceeded, setQuotaExceeded] = useState<boolean>(false);

  useEffect(() => {
    const handleQuotaExceeded = () => setQuotaExceeded(true);
    window.addEventListener('gmp-quota-exceeded', handleQuotaExceeded);
    return () => window.removeEventListener('gmp-quota-exceeded', handleQuotaExceeded);
  }, []);

  const filteredPois = MAP_LOCATIONS.filter((poi) => {
    const matchesCategory = activeCategoryFilter === 'all' || poi.category === activeCategoryFilter;
    const matchesSearch = 
      poi.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      poi.subRegion.toLowerCase().includes(searchQuery.toLowerCase()) ||
      poi.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      poi.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleSelectPoi = (poi: MapLocationPOI) => {
    setSelectedPoi(poi);
    setTargetCoords({ lat: poi.lat, lng: poi.lng, zoom: 14 });
  };

  const handlePresetClick = (preset: typeof REGIONAL_PRESETS[0]) => {
    setActiveRegionPreset(preset.id);
    setTargetCoords({ lat: preset.lat, lng: preset.lng, zoom: preset.zoom });
  };

  const getMarkerBadgeColor = (category: string) => {
    switch (category) {
      case 'whale': return 'bg-cyan-700 text-white shadow-sm ring-2 ring-cyan-200';
      case 'shark': return 'bg-emerald-700 text-white shadow-sm ring-2 ring-emerald-200';
      case 'air': return 'bg-sky-600 text-white shadow-sm ring-2 ring-sky-200';
      case 'surf': return 'bg-blue-700 text-white shadow-sm ring-2 ring-blue-200';
      case 'wine': return 'bg-purple-700 text-white shadow-sm ring-2 ring-purple-200';
      case 'transit': return 'bg-amber-600 text-white shadow-sm ring-2 ring-amber-200';
      default: return 'bg-slate-800 text-white';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'whale': return <Waves className="w-3.5 h-3.5" />;
      case 'shark': return <Fish className="w-3.5 h-3.5" />;
      case 'air': return <Wind className="w-3.5 h-3.5" />;
      case 'surf': return <Compass className="w-3.5 h-3.5" />;
      case 'wine': return <Wine className="w-3.5 h-3.5" />;
      case 'transit': return <Car className="w-3.5 h-3.5" />;
      default: return <MapPin className="w-3.5 h-3.5" />;
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen text-slate-900 py-8 lg:py-12 border-b border-slate-200">
      
      {/* Quota Warning Banner */}
      {quotaExceeded && (
        <div className="bg-amber-50 border-b border-amber-200 text-amber-900 px-4 py-3 text-xs sm:text-sm text-center sticky top-0 z-50 shadow-xs">
          <div className="max-w-7xl mx-auto flex items-center justify-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
            <span>
              Google Maps Platform quota limit reached. If you are the app owner, visit{' '}
              <a
                href="https://developers.google.com/maps/ai/ai-studio?utm_campaign=gmp_mcp_codeassist_v1_aistudio#quota_exceeded_errors"
                target="_blank"
                rel="noopener noreferrer"
                className="underline font-bold text-amber-950 hover:text-amber-800"
              >
                Google Maps Developer Portal
              </a>{' '}
              for instructions.
            </span>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Top Control Bar: Region Jump Presets & Sub-Region Quick Switcher */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-cyan-50 text-cyan-800 border border-cyan-200">
              <Navigation className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900">Regional Camera Focus</div>
              <div className="text-[11px] text-slate-500">Snap directly to specific coastline areas</div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            {REGIONAL_PRESETS.map((preset) => (
              <button
                key={preset.id}
                onClick={() => handlePresetClick(preset)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition-all border cursor-pointer ${
                  activeRegionPreset === preset.id
                    ? 'bg-cyan-900 text-white border-cyan-800 font-bold shadow-xs'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                {preset.name}
              </button>
            ))}
          </div>
        </div>

        {/* Category Filters & Search Bar Card */}
        <div className="flex items-center justify-between gap-4 flex-wrap bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs">
          
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none w-full sm:w-auto">
            <button
              onClick={() => setActiveCategoryFilter('all')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-xl border transition-all cursor-pointer whitespace-nowrap ${
                activeCategoryFilter === 'all'
                  ? 'bg-slate-900 text-white border-slate-900 font-bold shadow-xs'
                  : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200/80 hover:text-slate-900'
              }`}
            >
              All POIs ({MAP_LOCATIONS.length})
            </button>

            <button
              onClick={() => setActiveCategoryFilter('whale')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl border transition-all cursor-pointer whitespace-nowrap ${
                activeCategoryFilter === 'whale'
                  ? 'bg-cyan-800 text-white border-cyan-700 font-bold shadow-xs'
                  : 'bg-cyan-50/80 text-cyan-900 border-cyan-200 hover:bg-cyan-100'
              }`}
            >
              <Waves className="w-3.5 h-3.5 text-cyan-700" />
              <span>Whale Points (5)</span>
            </button>

            <button
              onClick={() => setActiveCategoryFilter('shark')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl border transition-all cursor-pointer whitespace-nowrap ${
                activeCategoryFilter === 'shark'
                  ? 'bg-emerald-800 text-white border-emerald-700 font-bold shadow-xs'
                  : 'bg-emerald-50/80 text-emerald-900 border-emerald-200 hover:bg-emerald-100'
              }`}
            >
              <Fish className="w-3.5 h-3.5 text-emerald-700" />
              <span>Shark Cage & Islands (4)</span>
            </button>

            <button
              onClick={() => setActiveCategoryFilter('air')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl border transition-all cursor-pointer whitespace-nowrap ${
                activeCategoryFilter === 'air'
                  ? 'bg-sky-800 text-white border-sky-700 font-bold shadow-xs'
                  : 'bg-sky-50/80 text-sky-900 border-sky-200 hover:bg-sky-100'
              }`}
            >
              <Wind className="w-3.5 h-3.5 text-sky-700" />
              <span>Paragliding & Peaks (2)</span>
            </button>

            <button
              onClick={() => setActiveCategoryFilter('surf')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl border transition-all cursor-pointer whitespace-nowrap ${
                activeCategoryFilter === 'surf'
                  ? 'bg-blue-800 text-white border-blue-700 font-bold shadow-xs'
                  : 'bg-blue-50/80 text-blue-900 border-blue-200 hover:bg-blue-100'
              }`}
            >
              <Compass className="w-3.5 h-3.5 text-blue-700" />
              <span>Surf & Lagoon (3)</span>
            </button>

            <button
              onClick={() => setActiveCategoryFilter('wine')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl border transition-all cursor-pointer whitespace-nowrap ${
                activeCategoryFilter === 'wine'
                  ? 'bg-purple-800 text-white border-purple-700 font-bold shadow-xs'
                  : 'bg-purple-50/80 text-purple-900 border-purple-200 hover:bg-purple-100'
              }`}
            >
              <Wine className="w-3.5 h-3.5 text-purple-700" />
              <span>Wine Estates (3)</span>
            </button>

            <button
              onClick={() => setActiveCategoryFilter('transit')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl border transition-all cursor-pointer whitespace-nowrap ${
                activeCategoryFilter === 'transit'
                  ? 'bg-amber-800 text-white border-amber-700 font-bold shadow-xs'
                  : 'bg-amber-50/80 text-amber-900 border-amber-200 hover:bg-amber-100'
              }`}
            >
              <Car className="w-3.5 h-3.5 text-amber-700" />
              <span>Transit Hubs (2)</span>
            </button>
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Filter by POI or bay..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-slate-300 rounded-xl pl-9 pr-4 py-1.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-cyan-600 focus:ring-1 focus:ring-cyan-600"
            />
          </div>

        </div>

        {/* Main Map + Directory Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left / Top Col: Interactive Google Map Frame */}
          <div className="lg:col-span-8 rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 shadow-xl relative">
            
            {/* Map Canvas Container */}
            <div className="h-[550px] lg:h-[680px] w-full relative">
              {apiKey ? (
                <APIProvider apiKey={apiKey}>
                  <Map
                    mapId="DEMO_MAP_ID"
                    internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
                    defaultCenter={{ lat: -34.46, lng: 19.29 }}
                    defaultZoom={11}
                    mapTypeId={mapType}
                    gestureHandling="greedy"
                    disableDefaultUI={false}
                    className="w-full h-full"
                  >
                    <CameraController targetCoords={targetCoords} />

                    {filteredPois.map((poi) => {
                      const isSelected = selectedPoi?.id === poi.id;
                      return (
                        <AdvancedMarker
                          key={poi.id}
                          position={{ lat: poi.lat, lng: poi.lng }}
                          onClick={() => handleSelectPoi(poi)}
                          title={poi.name}
                        >
                          <div className={`px-2.5 py-1 rounded-full shadow-md flex items-center gap-1.5 font-bold text-xs cursor-pointer transition-transform hover:scale-110 ${getMarkerBadgeColor(poi.category)} ${isSelected ? 'scale-125 z-50 ring-4 ring-cyan-500' : ''}`}>
                            {getCategoryIcon(poi.category)}
                            <span className="hidden sm:inline font-mono">{poi.name.split(' ')[0]}</span>
                          </div>
                        </AdvancedMarker>
                      );
                    })}

                    {/* Selected POI Info Window Popup */}
                    {selectedPoi && (
                      <InfoWindow
                        position={{ lat: selectedPoi.lat, lng: selectedPoi.lng }}
                        onCloseClick={() => setSelectedPoi(null)}
                        pixelOffset={[0, -20]}
                      >
                        <div className="max-w-xs text-slate-900 p-1">
                          <div className="relative rounded-lg overflow-hidden h-28 mb-2 border border-slate-200">
                            <img
                              src={selectedPoi.image}
                              alt={selectedPoi.name}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-slate-900/90 text-white font-mono text-[10px] font-bold">
                              {selectedPoi.subRegion}
                            </div>
                          </div>

                          <div className="text-xs font-bold text-cyan-800 uppercase tracking-wider">{selectedPoi.categoryLabel}</div>
                          <h3 className="text-sm font-bold text-slate-950 mt-0.5 leading-snug">{selectedPoi.name}</h3>

                          <p className="text-[11px] text-slate-600 mt-1 line-clamp-3 leading-relaxed">
                            {selectedPoi.description}
                          </p>

                          {selectedPoi.telemetryNote && (
                            <div className="mt-2 p-1.5 rounded bg-cyan-50 border border-cyan-200 text-[10px] text-cyan-900 font-semibold flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3 text-cyan-700 shrink-0" />
                              <span className="truncate">{selectedPoi.telemetryNote}</span>
                            </div>
                          )}

                          <div className="mt-2.5 pt-2 border-t border-slate-200 flex items-center justify-between gap-2">
                            <div className="text-[10px] text-slate-500 font-medium">
                              {selectedPoi.accessibility}
                            </div>

                            <button
                              onClick={() => onOpenBooking(selectedPoi.tourId)}
                              className="px-2.5 py-1 rounded bg-slate-900 hover:bg-cyan-900 text-white text-[11px] font-bold inline-flex items-center gap-1 transition-colors cursor-pointer"
                            >
                              <span>Explore</span>
                              <ArrowRight className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </InfoWindow>
                    )}
                  </Map>
                </APIProvider>
              ) : (
                <div className="w-full h-full bg-slate-100 flex flex-col items-center justify-center p-6 text-center">
                  <MapPin className="w-12 h-12 text-cyan-700 mb-3 animate-bounce" />
                  <h3 className="text-lg font-bold text-slate-900">Google Maps Platform Integration</h3>
                  <p className="text-xs text-slate-600 max-w-md mt-1">
                    Interactive satellite, terrain, and road maps across Hermanus, Walker Bay, and Gansbaai.
                  </p>
                </div>
              )}

              {/* In-Map Type Switcher Controls */}
              <div className="absolute top-4 left-4 z-10 flex items-center gap-1 p-1 bg-white/95 backdrop-blur-md rounded-xl border border-slate-200 text-xs shadow-md">
                {(['hybrid', 'roadmap', 'terrain', 'satellite'] as const).map((type) => (
                  <button
                    key={type}
                    onClick={() => setMapType(type)}
                    className={`px-2.5 py-1 rounded-lg font-bold capitalize transition-colors cursor-pointer ${
                      mapType === type ? 'bg-cyan-900 text-white shadow-2xs' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>

              {/* Map Footer Telemetry Overlay */}
              <div className="absolute bottom-4 left-4 right-4 z-10 hidden sm:flex items-center justify-between px-4 py-2.5 rounded-xl bg-white/95 backdrop-blur-md border border-slate-200 text-xs text-slate-700 shadow-md">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  <span className="font-mono font-bold text-slate-900">Overberg GIS Layer Active</span>
                  <span className="text-slate-300">·</span>
                  <span className="font-semibold text-cyan-900">{filteredPois.length} Locations Visible</span>
                </div>
                <div className="text-[11px] text-slate-500 font-mono">
                  Coordinates: 34°25′S 19°13′E · Walker Bay Sanctuary
                </div>
              </div>

            </div>

          </div>

          {/* Right Col: Interactive POI Directory List */}
          <div className="lg:col-span-4 bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-xs space-y-4 max-h-[680px] overflow-y-auto scrollbar-thin scrollbar-thumb-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2 font-display">
                  <Navigation className="w-4 h-4 text-cyan-700" />
                  <span>Points Directory</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">Click any location card to center and inspect</p>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-cyan-50 text-cyan-900 border border-cyan-200 font-mono text-xs font-bold">
                {filteredPois.length}
              </span>
            </div>

            {filteredPois.length === 0 ? (
              <div className="text-center py-10 text-slate-500 text-xs">
                No locations match your search query or filter.
              </div>
            ) : (
              <div className="space-y-3">
                {filteredPois.map((poi) => {
                  const isSelected = selectedPoi?.id === poi.id;
                  return (
                    <div
                      key={poi.id}
                      onClick={() => handleSelectPoi(poi)}
                      className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer relative ${
                        isSelected 
                          ? 'bg-cyan-50/90 border-cyan-400 ring-2 ring-cyan-400/20 shadow-xs' 
                          : 'bg-slate-50/80 border-slate-200 hover:bg-white hover:border-cyan-300 hover:shadow-2xs'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-1.5 text-[11px] font-bold text-cyan-800 uppercase tracking-wider">
                          {getCategoryIcon(poi.category)}
                          <span>{poi.categoryLabel}</span>
                        </div>
                        <span className="text-[10px] font-mono text-slate-600 bg-white border border-slate-200 px-1.5 py-0.5 rounded font-semibold">
                          {poi.subRegion}
                        </span>
                      </div>

                      <h4 className="text-sm font-bold text-slate-900 mt-1 leading-snug">
                        {poi.name}
                      </h4>

                      <p className="text-xs text-slate-600 mt-1 line-clamp-2 leading-relaxed">
                        {poi.highlight}
                      </p>

                      <div className="mt-2.5 pt-2 border-t border-slate-200/80 flex items-center justify-between text-[11px] text-slate-500">
                        <span className="flex items-center gap-1 font-medium">
                          <Clock className="w-3 h-3 text-slate-400" />
                          <span>{poi.bestTime.split('(')[0]}</span>
                        </span>

                        <span className="font-bold text-cyan-800 flex items-center gap-1">
                          <span>Focus Map</span>
                          <ArrowRight className="w-3 h-3 text-cyan-600" />
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
