import React, { useState } from 'react';
import { TransportServiceItem } from '../types';
import { TRANSPORT_SERVICES } from '../data/mockData';
import { formatZAR, formatUSD } from '../utils/pricing';
import { 
  Car, 
  Plane, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  Check, 
  ArrowRight, 
  Wine, 
  Fish, 
  Sparkles, 
  Calendar, 
  Phone, 
  User, 
  Mail, 
  Luggage,
  X,
  CreditCard
} from 'lucide-react';

interface TransportServicesProps {
  onOpenBooking?: (tourId?: string) => void;
}

export const TransportServices: React.FC<TransportServicesProps> = () => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'airport' | 'shark' | 'wine' | 'local'>('all');
  const [selectedServiceForModal, setSelectedServiceForModal] = useState<TransportServiceItem | null>(null);

  // Quick Instant Quote State
  const [pickupLocation, setPickupLocation] = useState<string>('cpt-airport');
  const [dropoffLocation, setDropoffLocation] = useState<string>('hermanus-hotel');
  const [vehicleClass, setVehicleClass] = useState<'sedan' | 'van' | 'sprinter'>('van');
  const [passengerCount, setPassengerCount] = useState<number>(2);
  const [transferDate, setTransferDate] = useState<string>('2026-12-18');
  const [transferTime, setTransferTime] = useState<string>('Morning');
  const [flightNumber, setFlightNumber] = useState<string>('');
  const [includeScenicR44, setIncludeScenicR44] = useState<boolean>(false);
  const [includeChildSeat, setIncludeChildSeat] = useState<boolean>(false);
  
  // Modal booking state
  const [bookingModalOpen, setBookingModalOpen] = useState<boolean>(false);
  const [guestName, setGuestName] = useState<string>('');
  const [guestEmail, setGuestEmail] = useState<string>('');
  const [guestPhone, setGuestPhone] = useState<string>('');
  const [bookingSuccess, setBookingSuccess] = useState<boolean>(false);
  const [bookingRef, setBookingRef] = useState<string>('');

  const filteredServices = TRANSPORT_SERVICES.filter(service => {
    if (activeCategory === 'all') return true;
    if (activeCategory === 'airport') return service.category === 'airport' || service.category === 'scenic';
    if (activeCategory === 'shark') return service.category === 'shark-shuttle';
    if (activeCategory === 'wine') return service.category === 'wine-valley';
    if (activeCategory === 'local') return service.category === 'local' || service.category === 'bike-rental';
    return true;
  });

  // Calculate instant quote price
  const calculateQuote = () => {
    let baseZAR = 1850;
    if (pickupLocation === 'cpt-airport' && dropoffLocation === 'gansbaai') baseZAR = 2450;
    if (pickupLocation === 'cpt-city' && dropoffLocation === 'hermanus-hotel') baseZAR = 2100;
    if (pickupLocation === 'hermanus-hotel' && dropoffLocation === 'kleinbaai-sharks') baseZAR = 750;
    if (pickupLocation === 'hermanus-hotel' && dropoffLocation === 'hemel-wine') baseZAR = 650;

    // Vehicle upgrade
    if (vehicleClass === 'van') baseZAR += 450;
    if (vehicleClass === 'sprinter') baseZAR += 1200;

    // Addons
    if (includeScenicR44) baseZAR += 900;
    if (includeChildSeat) baseZAR += 0; // free

    return {
      totalZAR: baseZAR,
      totalUSD: Math.round(baseZAR * 0.054),
    };
  };

  const quote = calculateQuote();

  const handleOpenTransferModal = (service: TransportServiceItem) => {
    setSelectedServiceForModal(service);
    setBookingModalOpen(true);
    setBookingSuccess(false);
  };

  const handleTransferSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ref = `TRF-${Math.floor(10000 + Math.random() * 90000)}`;
    setBookingRef(ref);
    setBookingSuccess(true);
  };

  return (
    <section id="transport" className="bg-slate-50/70 border-b border-slate-200 py-14 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header Hero Section */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-100 text-cyan-900 text-xs font-semibold tracking-wide uppercase">
            <Car className="w-3.5 h-3.5 text-cyan-700" />
            <span>Activity Accessibility & Regional Transit</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight font-display">
            Direct Activity Shuttles & Regional Transport
          </h2>
          
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Easily reach every excursion across the Overberg. Door-to-door Cape Town Airport (CPT) transfers, dawn hotel pickups directly to Gansbaai for Shark Cage Diving, beach hoppers to Grotto surf lessons, and Hemel-en-Aarde wine safari shuttles.
          </p>

          {/* Quick Value Points */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-medium text-slate-700">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" /> Fully Permitted Western Cape Passenger Fleet
            </span>
            <span className="flex items-center gap-1.5">
              <Plane className="w-4 h-4 text-cyan-700" /> 24/7 Live Flight Radar Tracking
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-cyan-700" /> Fixed Transparent Rates (Tolls Included)
            </span>
          </div>
        </div>

        {/* Interactive Instant Fare Calculator Card */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-6 border-b border-slate-100">
            <div>
              <div className="text-xs font-bold text-cyan-800 uppercase tracking-wider">Fast-Track Reservation</div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-0.5">
                Instant Transfer Quote & Reservation
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Calculate fixed door-to-door pricing for your Cape Town airport arrival or local holiday excursion.
              </p>
            </div>

            <div className="flex items-baseline gap-2 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5">
              <span className="text-xs text-slate-500 font-medium">Estimated Fare:</span>
              <span className="text-xl font-bold text-slate-900 font-mono tabular-nums">
                {formatZAR(quote.totalZAR)}
              </span>
              <span className="text-xs text-slate-500 font-normal">
                ({formatUSD(quote.totalUSD)})
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 pt-6 text-xs">
            {/* Pickup */}
            <div>
              <label className="block text-slate-700 font-semibold mb-1.5 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-cyan-700" /> Pickup Location
              </label>
              <select
                value={pickupLocation}
                onChange={e => setPickupLocation(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-slate-900 focus:outline-none focus:border-cyan-600 focus:bg-white"
              >
                <option value="cpt-airport">Cape Town Airport (CPT Terminal)</option>
                <option value="cpt-city">Cape Town City Bowl / Waterfront</option>
                <option value="hermanus-hotel">Hermanus Central / Voëlklip Lodging</option>
              </select>
            </div>

            {/* Dropoff */}
            <div>
              <label className="block text-slate-700 font-semibold mb-1.5 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-emerald-600" /> Drop-off Destination
              </label>
              <select
                value={dropoffLocation}
                onChange={e => setDropoffLocation(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-slate-900 focus:outline-none focus:border-cyan-600 focus:bg-white"
              >
                <option value="hermanus-hotel">Hermanus (Hotel / Villa / Airbnb)</option>
                <option value="kleinbaai-sharks">Gansbaai / Kleinbaai Shark Slipway</option>
                <option value="hemel-wine">Hemel-en-Aarde Wine Valley</option>
                <option value="gansbaai">Gansbaai / De Kelders</option>
              </select>
            </div>

            {/* Vehicle Type */}
            <div>
              <label className="block text-slate-700 font-semibold mb-1.5 flex items-center gap-1">
                <Car className="w-3.5 h-3.5 text-cyan-700" /> Vehicle Class
              </label>
              <select
                value={vehicleClass}
                onChange={e => setVehicleClass(e.target.value as any)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-slate-900 focus:outline-none focus:border-cyan-600 focus:bg-white"
              >
                <option value="sedan">Executive Sedan (1–3 Pax + 3 Bags)</option>
                <option value="van">Mercedes Vito Van (4–7 Pax + 7 Bags)</option>
                <option value="sprinter">Mercedes Sprinter (8–13 Pax Large Group)</option>
              </select>
            </div>

            {/* Travel Date */}
            <div>
              <label className="block text-slate-700 font-semibold mb-1.5 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-cyan-700" /> Travel Date & Time
              </label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="date"
                  value={transferDate}
                  onChange={e => setTransferDate(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-2.5 py-2.5 text-slate-900 focus:outline-none focus:border-cyan-600 focus:bg-white font-mono text-[11px]"
                />
                <input
                  type="text"
                  placeholder="e.g. Morning"
                  value={transferTime}
                  onChange={e => setTransferTime(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-2.5 py-2.5 text-slate-900 focus:outline-none focus:border-cyan-600 focus:bg-white font-mono text-[11px]"
                />
              </div>
            </div>
          </div>

          {/* Add-ons Row */}
          <div className="mt-5 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4 text-xs">
            <div className="flex flex-wrap items-center gap-6">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={includeScenicR44}
                  onChange={e => setIncludeScenicR44(e.target.checked)}
                  className="rounded border-slate-300 text-cyan-700 focus:ring-cyan-600"
                />
                <span className="text-slate-700 font-medium">
                  Upgrade to Clarence Drive Scenic Coastal Route (+R900)
                </span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={includeChildSeat}
                  onChange={e => setIncludeChildSeat(e.target.checked)}
                  className="rounded border-slate-300 text-cyan-700 focus:ring-cyan-600"
                />
                <span className="text-slate-700 font-medium">
                  Include Baby / Child Safety Booster Seat (Complimentary)
                </span>
              </label>
            </div>

            <button
              onClick={() => {
                const sampleItem = TRANSPORT_SERVICES[0];
                handleOpenTransferModal(sampleItem);
              }}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-xl shadow-xs transition-all cursor-pointer"
            >
              <span>Book Custom Transfer ({formatZAR(quote.totalZAR)})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Category Filters */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-2xl font-bold text-slate-900 tracking-tight font-display">
                All Holiday Transit & Connected Services
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Choose from private airport transfers, wine shuttles, and local December transport options.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setActiveCategory('all')}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-xl border transition-all cursor-pointer ${
                  activeCategory === 'all'
                    ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                All Transit ({TRANSPORT_SERVICES.length})
              </button>
              <button
                onClick={() => setActiveCategory('airport')}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-xl border transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeCategory === 'airport'
                    ? 'bg-cyan-700 text-white border-cyan-700 shadow-xs'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <Plane className="w-3.5 h-3.5 text-cyan-600" />
                <span>Airport & Scenic</span>
              </button>
              <button
                onClick={() => setActiveCategory('shark')}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-xl border transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeCategory === 'shark'
                    ? 'bg-cyan-700 text-white border-cyan-700 shadow-xs'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <Fish className="w-3.5 h-3.5 text-cyan-600" />
                <span>Shark Diver Shuttle</span>
              </button>
              <button
                onClick={() => setActiveCategory('wine')}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-xl border transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeCategory === 'wine'
                    ? 'bg-cyan-700 text-white border-cyan-700 shadow-xs'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <Wine className="w-3.5 h-3.5 text-cyan-600" />
                <span>Wine Safari Shuttle</span>
              </button>
              <button
                onClick={() => setActiveCategory('local')}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-xl border transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeCategory === 'local'
                    ? 'bg-cyan-700 text-white border-cyan-700 shadow-xs'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <Car className="w-3.5 h-3.5 text-cyan-600" />
                <span>Town Hopper & E-Bikes</span>
              </button>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map(service => (
              <div
                key={service.id}
                className="bg-white rounded-2xl border border-slate-200 hover:border-slate-300 transition-all duration-300 flex flex-col group shadow-sm hover:shadow-xl overflow-hidden"
              >
                {/* Image Banner */}
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-900/10 to-transparent" />
                  
                  {service.badge && (
                    <div className="absolute top-3 left-3 px-2.5 py-1 text-[11px] font-bold rounded-lg bg-slate-900 text-white shadow-sm">
                      {service.badge}
                    </div>
                  )}

                  <div className="absolute bottom-2.5 right-3 text-[11px] font-mono text-white bg-slate-950/80 backdrop-blur-sm px-2 py-0.5 rounded border border-white/20">
                    {service.duration}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h4 className="text-base font-bold text-slate-900 group-hover:text-cyan-800 transition-colors">
                      {service.title}
                    </h4>
                    <div className="text-xs text-slate-500 mt-1">
                      {service.subtitle}
                    </div>

                    <div className="mt-3 p-2.5 rounded-lg bg-slate-50 border border-slate-200/80 text-[11px] space-y-1">
                      <div className="flex items-center gap-1.5 text-slate-700 font-medium">
                        <MapPin className="w-3.5 h-3.5 text-cyan-700 shrink-0" />
                        <span className="truncate">{service.route}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-500 font-mono">
                        <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span>Schedule: {service.departureSchedule}</span>
                      </div>
                    </div>

                    {/* Features checklist */}
                    <ul className="mt-3.5 space-y-1.5 text-xs text-slate-600">
                      {service.features.slice(0, 3).map((f, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-cyan-700 shrink-0 mt-0.5" />
                          <span className="line-clamp-2">{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Price and CTA */}
                  <div className="pt-4 border-t border-slate-100 space-y-3">
                    <div className="flex items-baseline justify-between">
                      <div>
                        <div className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">
                          {service.priceUnit}
                        </div>
                        <div className="text-lg font-bold text-slate-900 font-mono tabular-nums">
                          {formatZAR(service.priceZAR)}
                          <span className="text-xs font-normal text-slate-500 ml-1">
                            ({formatUSD(service.priceUSD)})
                          </span>
                        </div>
                      </div>
                      <div className="text-right text-[11px] text-slate-500 font-mono">
                        {service.capacity}
                      </div>
                    </div>

                    <button
                      onClick={() => handleOpenTransferModal(service)}
                      className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-4 text-xs font-semibold rounded-xl bg-slate-900 hover:bg-slate-800 text-white active:scale-98 transition-all shadow-xs cursor-pointer"
                    >
                      <span>Reserve This Transfer</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Booking / Quote Modal */}
      {bookingModalOpen && selectedServiceForModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-xl w-full shadow-2xl overflow-hidden my-auto">
            
            <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Car className="w-5 h-5 text-cyan-700" />
                <h3 className="text-sm font-bold text-slate-900">
                  {bookingSuccess ? 'Transfer Reservation Confirmed' : 'Book Private Transfer Service'}
                </h3>
              </div>
              <button
                onClick={() => setBookingModalOpen(false)}
                className="w-8 h-8 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {bookingSuccess ? (
              <div className="p-6 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                  <Check className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold text-slate-900">
                  Transfer Booking #{bookingRef}
                </h4>
                <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
                  Your chauffeur booking for <strong>{selectedServiceForModal.title}</strong> has been secured for <strong>{transferDate}</strong> at <strong>{transferTime}</strong>. A confirmation voucher and live driver contact details have been sent to <strong>{guestEmail}</strong>.
                </p>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-left space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Service:</span>
                    <span className="font-semibold text-slate-900">{selectedServiceForModal.title}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Total Fixed Fare:</span>
                    <span className="font-mono font-bold text-slate-900">{formatZAR(selectedServiceForModal.priceZAR)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Lead Passenger:</span>
                    <span className="text-slate-900">{guestName} ({guestPhone})</span>
                  </div>
                </div>
                <button
                  onClick={() => setBookingModalOpen(false)}
                  className="px-6 py-2.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-xl"
                >
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={handleTransferSubmit} className="p-6 space-y-4 text-xs">
                <div className="p-3 rounded-xl bg-cyan-50 border border-cyan-200 text-cyan-900">
                  <div className="font-bold">{selectedServiceForModal.title}</div>
                  <div className="text-[11px] text-cyan-800 mt-0.5">{selectedServiceForModal.route}</div>
                  <div className="text-sm font-bold font-mono text-cyan-950 mt-1">
                    {formatZAR(selectedServiceForModal.priceZAR)} · <span className="text-xs font-normal">{formatUSD(selectedServiceForModal.priceUSD)}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Travel Date *</label>
                    <input
                      type="date"
                      required
                      value={transferDate}
                      onChange={e => setTransferDate(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-cyan-600 focus:bg-white font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Pickup Time / Flight ETA *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Afternoon (Flight BA 056)"
                      value={transferTime}
                      onChange={e => setTransferTime(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-cyan-600 focus:bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Full Name (Lead Passenger) *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Duane Steffens"
                    value={guestName}
                    onChange={e => setGuestName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-cyan-600 focus:bg-white"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Email (For Chauffeur Voucher) *</label>
                    <input
                      type="email"
                      required
                      placeholder="name@example.com"
                      value={guestEmail}
                      onChange={e => setGuestEmail(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-cyan-600 focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Mobile / WhatsApp (For Driver) *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+27 82 000 0000"
                      value={guestPhone}
                      onChange={e => setGuestPhone(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-cyan-600 focus:bg-white font-mono"
                    />
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between border-t border-slate-100">
                  <div className="text-slate-500 text-[11px]">
                    No upfront card charge until driver dispatch confirmed.
                  </div>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-1.5 px-5 py-2.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-xl cursor-pointer"
                  >
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Confirm Transfer Booking</span>
                  </button>
                </div>
              </form>
            )}

          </div>
        </div>
      )}

    </section>
  );
};
