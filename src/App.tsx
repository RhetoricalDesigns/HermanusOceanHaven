import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { PageHeader } from './components/PageHeader';
import { TelemetryHero } from './components/TelemetryHero';
import { MaritimeWeather } from './components/MaritimeWeather';
import { ToursSection } from './components/ToursSection';
import { VisitorGuide } from './components/VisitorGuide';
import { BookingEngine } from './components/BookingEngine';
import { TransportServices } from './components/TransportServices';
import { RegionalMap } from './components/RegionalMap';
import { ConservationImpact } from './components/ConservationImpact';
import { WhaleWatchingPage } from './components/WhaleWatchingPage';
import { MarineGlossary } from './components/MarineGlossary';
import { TripPlanner } from './components/TripPlanner';
import { Footer } from './components/Footer';
import { ParaglidingPage } from './components/ParaglidingPage';
import { SharkDivePage } from './components/SharkDivePage';
import { SurfKitePage } from './components/SurfKitePage';
import { ServiceDetailsPage } from './components/ServiceDetailsPage';

import { TOUR_PACKAGES } from './data/mockData';
import { AppPage } from './types';
import { ShieldCheck, Compass, Anchor, ArrowRight } from 'lucide-react';

const VALID_PAGES: AppPage[] = [
  'home', 
  'whale-watching',
  'whale-safari',
  'shark-dive',
  'paragliding',
  'surf-kite',
  'transport',
  'weather', 
  'guide', 
  'map',
  'conservation'
];

const getPageFromHash = (): AppPage => {
  const hash = window.location.hash.replace(/^#\/?/, '').toLowerCase();
  if (VALID_PAGES.includes(hash as AppPage)) {
    return hash as AppPage;
  }
  return 'home'; // Home is the flagship main page
};

export default function App() {
  const [tours] = useState(TOUR_PACKAGES);

  // Router state
  const [currentPage, setCurrentPage] = useState<AppPage>(getPageFromHash);

  // Modals state
  const [bookingModalOpen, setBookingModalOpen] = useState<boolean>(false);
  const [preselectedTourId, setPreselectedTourId] = useState<string | undefined>(undefined);
  const [activeBookingCategory, setActiveBookingCategory] = useState<'whale' | 'shark' | 'paragliding' | 'surf-kite' | undefined>(undefined);

  // Sync hash with browser history
  useEffect(() => {
    const handleHashChange = () => {
      setCurrentPage(getPageFromHash());
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Ensure scroll is at top whenever page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [currentPage]);

  const handleNavigate = (page: AppPage) => {
    setCurrentPage(page);
    window.location.hash = `/${page}`;
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleOpenBooking = (tourId?: string, category?: 'whale' | 'shark' | 'paragliding' | 'surf-kite') => {
    setPreselectedTourId(tourId);
    setActiveBookingCategory(category);
    setBookingModalOpen(true);
  };



  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-sans">
      
      {/* Universal Multi-Page Top Navigation */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenBooking={handleOpenBooking}
      />

      <main className="flex-1">

        {/* 1. FLAGSHIP HOME PAGE (Cinematic Motion Hero + Curated Highlights) */}
        {currentPage === 'home' && (
          <div>
            {/* World Class Hero Section with Motion */}
            <TelemetryHero
              onOpenBooking={(tourId, category) => handleOpenBooking(tourId, category as any)}
            />

            {/* Maritime Weather & Sea State summary */}
            <MaritimeWeather
              onOpenBooking={() => handleOpenBooking()}
            />



            <ToursSection
              tours={tours}
              onSelectTour={(tourId, category) => handleOpenBooking(tourId, category)}
            />

            {/* Direct Activity Shuttles & Regional Accessibility */}
            <TransportServices onOpenBooking={handleOpenBooking} />

            {/* Marine Protected Area Conservation Impact & Population Data */}
            <ConservationImpact onOpenBooking={handleOpenBooking} />
          </div>
        )}



        {/* 2. WHALE WATCHING OPERATORS & PRICING PAGE */}
        {currentPage === 'whale-watching' && (
          <div>
            <PageHeader
              pageTitle="Whale Watching"
              badge="OFFICIAL 2026 RATES"
              subtitle=""
              currentPage="whale-watching"
              onNavigate={handleNavigate}
              onOpenBooking={() => handleOpenBooking()}
            />
            <WhaleWatchingPage onOpenBooking={handleOpenBooking} />
          </div>
        )}

        {/* 2.1 WHALE SAFARI PAGE */}
        {currentPage === 'whale-safari' && (
          <ServiceDetailsPage 
            category="whale" 
            tours={tours} 
            onOpenBooking={handleOpenBooking} 
          />
        )}

        {/* 2.2 SHARK CAGE DIVING PAGE */}
        {currentPage === 'shark-dive' && (
          <div>
            <PageHeader
              pageTitle="Shark Cage Diving"
              badge="REGIONAL MARKET RATES"
              subtitle="Face the ocean's ultimate predators in Gansbaai, the shark capital of the world."
              currentPage="shark-dive"
              onNavigate={handleNavigate}
              onOpenBooking={() => handleOpenBooking()}
            />
            <SharkDivePage onOpenBooking={handleOpenBooking} />
          </div>
        )}


        {/* 2.3 PARAGLIDING PAGE */}
        {currentPage === 'paragliding' && (
          <div>
            <PageHeader
              pageTitle="Tandem Paragliding"
              badge="FLIGHT RATES & PACKAGES"
              subtitle="Soar over Walker Bay from Rotary Way or Voëlklip with SAHPA-certified instructors."
              currentPage="paragliding"
              onNavigate={handleNavigate}
              onOpenBooking={() => handleOpenBooking()}
            />
            <ParaglidingPage onOpenBooking={handleOpenBooking} />
          </div>
        )}

        {/* 2.4 SURF & KITE PAGE */}
        {currentPage === 'surf-kite' && (
          <div>
            <PageHeader
              pageTitle="Surfing & Kitesurfing"
              badge="COACHING & RENTAL RATES"
              subtitle="Ride the waves at Voëlklip or catch the wind in the Kleinriver Lagoon."
              currentPage="surf-kite"
              onNavigate={handleNavigate}
              onOpenBooking={() => handleOpenBooking()}
            />
            <SurfKitePage onOpenBooking={handleOpenBooking} />
          </div>
        )}

        {/* 3. TRANSPORT & SHUTTLES PAGE */}
        {currentPage === 'transport' && (
          <div>
            <PageHeader
              pageTitle="Airport Transfers & Holiday Shuttles"
              badge="CAPE TOWN & OVERBERG TRANSIT CONCIERGE"
              subtitle="Door-to-door private Cape Town Airport (CPT) transfers, scenic Clarence Drive tours, Gansbaai shark shuttles, and Hemel-en-Aarde wine valley circuits."
              currentPage="transport"
              onNavigate={handleNavigate}
              onOpenBooking={() => handleOpenBooking()}
            />
            <TransportServices onOpenBooking={handleOpenBooking} />
          </div>
        )}



        {/* 5. MARITIME WEATHER & TIDES PAGE */}
        {currentPage === 'weather' && (
          <div>
            <PageHeader
              pageTitle="Maritime Weather & Tides Observatory"
              badge="WALKER BAY MARINE STATION"
              subtitle="Live wave height, swell period, wind direction, 7-day tidal forecast, water temperature, and boat launch advisories."
              currentPage="weather"
              onNavigate={handleNavigate}
              onOpenBooking={() => handleOpenBooking()}
            />
            <MaritimeWeather
              onOpenBooking={() => handleOpenBooking()}
            />
          </div>
        )}

        {/* 6. 12KM CLIFF PATH & VISITOR GUIDE PAGE */}
        {currentPage === 'guide' && (
          <div>
            <PageHeader
              pageTitle="Hermanus 12km Cliff Path Guide & Trip Planner"
              badge="COASTAL TRAIL · 3-DAY ITINERARY BUILDER · MARINE GLOSSARY"
              subtitle="12km continuous sandstone coastal walking trail, 10 strategic land-based whale vantage points, interactive 3-Day Trip Planner, and Marine Glossary."
              currentPage="guide"
              onNavigate={handleNavigate}
              onOpenBooking={() => handleOpenBooking()}
            />
            <VisitorGuide />
            <TripPlanner tours={tours} onOpenBooking={handleOpenBooking} />
            <MarineGlossary />
          </div>
        )}


        {/* 8. EXTENDED REGIONAL INTERACTIVE MAP PAGE */}
        {currentPage === 'map' && (
          <div>
            <PageHeader
              pageTitle="Hermanus & Overberg Regional Interactive Map"
              badge="EXTENDED REGIONAL GIS & MARINE MAP"
              subtitle="Interactive Google Map covering 18 key locations across Hermanus, Walker Bay Marine Sanctuary, Gansbaai Shark Alley, Hemel-en-Aarde Wine Valley, and coastal adventure sites."
              currentPage="map"
              onNavigate={handleNavigate}
              onOpenBooking={() => handleOpenBooking()}
            />
            <RegionalMap onOpenBooking={handleOpenBooking} />
          </div>
        )}

        {/* 9. CONSERVATION IMPACT & POPULATION DATA PAGE */}
        {currentPage === 'conservation' && (
          <div>
            <PageHeader
              pageTitle="Walker Bay Marine Sanctuary Conservation Impact"
              badge="SANCTUARY POPULATION TRENDS & RESEARCH"
              subtitle="45-year Southern Right Whale population recovery dataset, annual calving survey statistics, and marine species health ratings."
              currentPage="conservation"
              onNavigate={handleNavigate}
              onOpenBooking={() => handleOpenBooking()}
            />
            <ConservationImpact onOpenBooking={handleOpenBooking} />
          </div>
        )}

      </main>

      {/* Booking Engine & Secure Payment Gateway Modal */}
      <BookingEngine
        tours={tours}
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        preselectedTourId={preselectedTourId}
        category={activeBookingCategory}
      />

      {/* Quiet Footer with Full Site Directory */}
      <Footer
        onOpenBooking={() => handleOpenBooking()}
        onNavigate={handleNavigate}
      />

    </div>
  );
}
