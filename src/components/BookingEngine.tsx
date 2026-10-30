import React, { useState, useEffect } from 'react';
import { TourPackage, BookingFormState, ConfirmedBooking } from '../types';
import { formatZAR, formatUSD } from '../utils/pricing';
import { 
  Calendar, 
  Clock, 
  ArrowRight, 
  ArrowLeft,
  X,
  Waves,
  PhoneCall,
  Send,
  MessageSquare,
  Mail,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { WhaleLoading } from './WhaleLoading';
import { initAuth, googleSignIn, getAccessToken } from '../services/auth';
import { sendGmail } from '../services/gmail';
import { User } from 'firebase/auth';

export const OPERATOR_WHATSAPP_NUMBER = '27765588138';
export const OPERATOR_WHATSAPP_DISPLAY = '076 558 8138';
export const OPERATOR_EMAIL = 'bookings@hermanuswhalehaven.com'; // Example operator email

interface BookingEngineProps {
  tours: TourPackage[];
  isOpen: boolean;
  onClose: () => void;
  preselectedTourId?: string;
  category?: 'whale' | 'shark' | 'paragliding' | 'surf-kite';
}

const CATEGORY_PRICES = {
  whale: {
    label: 'Whale Watching Safari',
    range: 'R1,300 - R1,580',
    avgAdult: 1520,
    avgSenior: 1400,
    avgChild: 750,
  },
  shark: {
    label: 'Shark Cage Diving',
    range: 'R1,800 - R3,655',
    avgAdult: 2750,
    avgSenior: 1800,
    avgChild: 1400,
  },
  paragliding: {
    label: 'Tandem Paragliding',
    range: 'R1,550 - R2,200',
    avgAdult: 1550,
    avgSenior: 1550,
    avgChild: 1550,
  },
  'surf-kite': {
    label: 'Surf & Kite Lessons',
    range: 'R350 - R2,200',
    avgAdult: 450,
    avgSenior: 450,
    avgChild: 350,
  }
};

export const BookingEngine: React.FC<BookingEngineProps> = ({
  tours,
  isOpen,
  onClose,
  preselectedTourId,
  category: propCategory
}) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [needsAuth, setNeedsAuth] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Form state
  const initialTour = tours.find(t => t.id === preselectedTourId) || tours[0];
  const activeCategory = propCategory || (initialTour?.category as any) || 'whale';
  
  const [formData, setFormData] = useState<BookingFormState>({
    tourId: initialTour?.id || tours[0].id,
    date: '2026-10-30',
    timeSlot: initialTour?.departureTimes[0] || 'Morning',
    adults: 2,
    children: 0,
    seniors: 0,
    infants: 0,
    addOns: {
      hotelShuttle: false,
      rentalOptics: false,
      conservationDonation: true,
    },
    guestName: '',
    guestEmail: '',
    guestPhone: '',
    specialRequests: '',
  });

  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [confirmedBooking, setConfirmedBooking] = useState<ConfirmedBooking | null>(null);

  const catPrice = CATEGORY_PRICES[activeCategory as keyof typeof CATEGORY_PRICES];

  // Sync auth state
  useEffect(() => {
    const unsubscribe = initAuth(
      (u, t) => {
        setUser(u);
        setToken(t);
        setNeedsAuth(false);
        // Pre-fill user data if available
        setFormData(prev => ({
          ...prev,
          guestName: u.displayName || prev.guestName,
          guestEmail: u.email || prev.guestEmail,
        }));
      },
      () => setNeedsAuth(true)
    );
    return () => unsubscribe();
  }, []);

  const [loginError, setLoginError] = useState<string | null>(null);

  const handleLogin = async () => {
    setIsLoggingIn(true);
    setLoginError(null);
    try {
      const result = await googleSignIn();
      if (result) {
        setUser(result.user);
        setToken(result.accessToken);
        setNeedsAuth(false);
        setFormData(prev => ({
          ...prev,
          guestName: result.user.displayName || prev.guestName,
          guestEmail: result.user.email || prev.guestEmail,
        }));
      }
    } catch (err: any) {
      console.error('Login failed:', err);
      if (err.code === 'auth/popup-blocked') {
        setLoginError('The sign-in popup was blocked by your browser. Please click the button again or allow popups for this site.');
      } else {
        setLoginError('Sign-in failed. Please try again.');
      }
    } finally {
      setIsLoggingIn(false);
    }
  };

  // Calculate pricing
  const totalZAR = (formData.adults * catPrice.avgAdult) + 
                   (formData.seniors * catPrice.avgSenior) + 
                   (formData.children * catPrice.avgChild);
  const totalUSD = Math.round(totalZAR / 18);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!token) {
      setNeedsAuth(true);
      return;
    }

    setIsProcessing(true);

    const bookingRef = `WH-${Math.floor(10000 + Math.random() * 90000)}`;
    const subject = `Booking Request: ${catPrice.label} - Ref #${bookingRef}`;
    const body = `
NEW BOOKING REQUEST VIA HERMANUS WHALE HAVEN

Ref: #${bookingRef}
Category: ${catPrice.label}
Date: ${formData.date}
Time: ${formData.timeSlot}

PASSENGERS:
Adults: ${formData.adults}
Seniors: ${formData.seniors}
Children: ${formData.children}
Infants: ${formData.infants}

GUEST DETAILS:
Name: ${formData.guestName}
Email: ${formData.guestEmail}
Phone: ${formData.guestPhone}

SPECIAL REQUESTS:
${formData.specialRequests || 'None'}

ESTIMATED MARKET RATE:
${formatZAR(totalZAR)} (Approx ${formatUSD(totalUSD)})

---
This reservation request was automatically dispatched via Google Workspace.
    `;

    // 1. Send real email via Gmail API
    const emailSent = await sendGmail(token, {
      to: OPERATOR_EMAIL,
      subject,
      body
    });

    // 2. Also send a copy to the guest
    await sendGmail(token, {
      to: formData.guestEmail,
      subject: `Reservation Dispatched: ${catPrice.label} (#${bookingRef})`,
      body: `Hi ${formData.guestName},\n\nYour reservation request for ${catPrice.label} has been successfully dispatched to our network of local skippers. \n\nWe are currently checking live vessel capacity and sea state for ${formData.date}.\n\nYou will receive a confirmation shortly.\n\nRef: #${bookingRef}\n\nBest regards,\nHermanus Whale Haven Concierge`
    });

    setTimeout(() => {
      setIsProcessing(false);
      setConfirmedBooking({
        bookingRef,
        tourTitle: catPrice.label,
        date: formData.date,
        timeSlot: formData.timeSlot,
        guestName: formData.guestName,
        guestEmail: formData.guestEmail,
        guestPhone: formData.guestPhone,
        adults: formData.adults,
        children: formData.children,
        seniors: formData.seniors,
        totalZAR: totalZAR,
        totalUSD: totalUSD,
        qrCodeValue: `HERMANUS-PASS-${bookingRef}`,
        status: 'DISPATCHED',
      });
      setStep(5);
    }, 1500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full border border-slate-200 shadow-2xl overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="bg-slate-900 text-white p-5 sm:p-6 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-cyan-900/80 text-cyan-300 border border-cyan-700">
              <PhoneCall className="w-5 h-5" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 text-[10px] font-mono font-bold uppercase tracking-wider">
                Automated Dispatch · {activeCategory.toUpperCase()}
              </div>
              <h3 className="text-lg sm:text-xl font-bold font-display leading-tight mt-0.5">
                {catPrice.label}
              </h3>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Steps Indicator */}
        <div className="bg-slate-50 px-6 py-3 border-b border-slate-200 flex items-center justify-between text-[10px] sm:text-xs font-semibold">
          {[1, 2, 3, 4, 5].map((s) => (
            <React.Fragment key={s}>
              <div className={`flex items-center gap-1 ${step >= s ? 'text-cyan-800' : 'text-slate-400'}`}>
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step >= s ? 'bg-cyan-100' : 'bg-slate-100'}`}>{s}</span>
                <span className="hidden sm:inline">{s === 1 ? 'Date' : s === 2 ? 'Passengers' : s === 3 ? 'Auth' : s === 4 ? 'Concierge' : 'Done'}</span>
              </div>
              {s < 5 && <span className="text-slate-300">→</span>}
            </React.Fragment>
          ))}
        </div>

        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto relative">
          {isProcessing && (
            <div className="absolute inset-0 z-20 bg-white/95 backdrop-blur-sm flex flex-col items-center justify-center space-y-4 animate-in fade-in">
              <WhaleLoading size="lg" />
              <p className="text-sm font-bold text-cyan-900 animate-pulse text-center px-6">
                Dispatched automated reservation to local skippers...
              </p>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-6">
              <div className="p-4 rounded-2xl bg-cyan-50 border border-cyan-200 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <Waves className="w-5 h-5 text-cyan-700" />
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-widest text-cyan-700">Market Rate Range</div>
                    <div className="text-lg font-bold font-mono">{catPrice.range}</div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-cyan-700" />
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={e => setFormData({ ...formData, date: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-sm font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-cyan-700" />
                    Departure Slot
                  </label>
                  <select 
                    value={formData.timeSlot}
                    onChange={e => setFormData({ ...formData, timeSlot: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-sm"
                  >
                    <option>Morning</option>
                    <option>Afternoon</option>
                    <option>Evening</option>
                  </select>
                </div>
              </div>
              <div className="pt-4 flex justify-end border-t border-slate-100">
                <button onClick={() => setStep(2)} className="bg-slate-900 text-white px-6 py-3 rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-cyan-900 transition-colors cursor-pointer">
                  Passengers <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { label: 'Adults (13+)', key: 'adults', sub: `Avg ${formatZAR(catPrice.avgAdult)}` },
                  { label: 'Seniors (60+)', key: 'seniors', sub: `Avg ${formatZAR(catPrice.avgSenior)}` },
                  { label: 'Children (3-12)', key: 'children', sub: `Avg ${formatZAR(catPrice.avgChild)}` },
                  { label: 'Infants (0-2)', key: 'infants', sub: 'Free' },
                ].map(p => (
                  <div key={p.key} className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-slate-900">{p.label}</div>
                      <div className="text-[10px] text-slate-500">{p.sub}</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <button 
                        onClick={() => setFormData({ ...formData, [p.key as any]: Math.max(0, (formData as any)[p.key] - 1) })}
                        className="w-8 h-8 rounded-lg bg-white border border-slate-300 font-bold cursor-pointer hover:bg-slate-100"
                      >-</button>
                      <span className="w-4 text-center font-mono font-bold">{(formData as any)[p.key]}</span>
                      <button 
                        onClick={() => setFormData({ ...formData, [p.key as any]: (formData as any)[p.key] + 1 })}
                        className="w-8 h-8 rounded-lg bg-white border border-slate-300 font-bold cursor-pointer hover:bg-slate-100"
                      >+</button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-4 rounded-2xl bg-slate-900 text-white flex justify-between items-center">
                <div>
                  <div className="text-[10px] font-bold text-cyan-300 uppercase tracking-widest">Market Estimate</div>
                  <div className="text-xl font-bold font-mono">{formatZAR(totalZAR)}</div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] font-bold text-cyan-300 uppercase tracking-widest">USD Approx</div>
                  <div className="text-lg font-bold font-mono opacity-80">{formatUSD(totalUSD)}</div>
                </div>
              </div>
              <div className="pt-4 flex justify-between border-t border-slate-100">
                <button onClick={() => setStep(1)} className="text-slate-500 text-sm font-semibold hover:text-slate-900 flex items-center gap-1 cursor-pointer">
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
                <button onClick={() => setStep(3)} className="bg-slate-900 text-white px-6 py-3 rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-cyan-900 transition-colors cursor-pointer">
                  Continue <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6 text-center py-4">
              <div className="w-16 h-16 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-white shadow-sm">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-bold text-slate-900">Secure Dispatch with Gmail</h4>
              <p className="text-sm text-slate-600 max-w-sm mx-auto">
                We use your Google account to automatically dispatch the booking request to the skipper network and send you a confirmation copy.
              </p>
              
              {loginError && (
                <div className="mb-4 p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs font-medium text-left max-w-sm mx-auto">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>{loginError}</span>
                  </div>
                </div>
              )}
              
              {!user ? (
                <button
                  onClick={handleLogin}
                  disabled={isLoggingIn}
                  className="mt-2 flex items-center gap-3 bg-white border border-slate-300 px-6 py-3 rounded-xl hover:bg-slate-50 transition-all mx-auto shadow-sm cursor-pointer disabled:opacity-50"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  <span className="font-bold text-slate-700">{isLoggingIn ? 'Signing in...' : 'Sign in with Google'}</span>
                </button>
              ) : (
                <div className="space-y-4">
                  <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-800 text-sm font-medium flex items-center justify-center gap-2">
                    <CheckCircle2 className="w-4 h-4" /> Connected as {user.email}
                  </div>
                  <button onClick={() => setStep(4)} className="bg-slate-900 text-white px-8 py-3 rounded-xl font-bold text-sm hover:bg-cyan-900 transition-colors cursor-pointer">
                    Proceed to Guest Details
                  </button>
                </div>
              )}
            </div>
          )}

          {step === 4 && (
            <form onSubmit={handleFormSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Lead Guest Name</label>
                  <input
                    type="text"
                    required
                    value={formData.guestName}
                    onChange={e => setFormData({ ...formData, guestName: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Email (Dispatch Source)</label>
                  <input
                    type="email"
                    required
                    readOnly
                    value={formData.guestEmail}
                    className="w-full bg-slate-100 border border-slate-300 rounded-xl px-3 py-2 text-sm text-slate-500 cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">WhatsApp / Phone</label>
                  <input
                    type="tel"
                    required
                    placeholder="+27..."
                    value={formData.guestPhone}
                    onChange={e => setFormData({ ...formData, guestPhone: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-sm"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Special Requests (Optional)</label>
                  <textarea
                    rows={2}
                    value={formData.specialRequests}
                    onChange={e => setFormData({ ...formData, specialRequests: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-sm"
                  />
                </div>
              </div>
              <div className="pt-4 flex justify-between border-t border-slate-100">
                <button type="button" onClick={() => setStep(3)} className="text-slate-500 text-sm font-semibold hover:text-slate-900 flex items-center gap-1 cursor-pointer">
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
                <button type="submit" className="bg-cyan-700 text-white px-8 py-3 rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-cyan-800 transition-colors shadow-lg cursor-pointer">
                  <Mail className="w-4 h-4" /> Dispatch Reservation
                </button>
              </div>
            </form>
          )}

          {step === 5 && confirmedBooking && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="text-center space-y-2">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto mb-2">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-2xl font-bold text-slate-900">Request Dispatched!</h4>
                <p className="text-sm text-slate-600">Ref: <span className="font-mono font-bold">#{confirmedBooking.bookingRef}</span></p>
              </div>

              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-4">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-white rounded-xl border border-slate-200 text-cyan-800">
                    <Send className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <h5 className="text-sm font-bold text-slate-900">Automated Concierge Active</h5>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      We've automatically sent your request to the operator network. You should receive a confirmation email at <strong>{formData.guestEmail}</strong> shortly.
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-200 text-center space-y-3">
                  <p className="text-xs text-slate-500 font-medium">Need immediate verification?</p>
                  <a
                    href={`https://wa.me/${OPERATOR_WHATSAPP_NUMBER}?text=${encodeURIComponent(
                      `Hi! I've just dispatched a booking for ${catPrice.label} on ${formData.date} via the website. Ref: #${confirmedBooking.bookingRef}. Please confirm status.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-sm hover:bg-emerald-500 transition-all shadow-md"
                  >
                    <MessageSquare className="w-4 h-4" /> Open WhatsApp Chat
                  </a>
                </div>
              </div>

              <button onClick={onClose} className="w-full py-3 text-slate-500 text-sm font-bold hover:text-slate-900 transition-colors">
                Close and Return to Site
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

