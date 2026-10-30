import React from 'react';
import { Anchor, ShieldCheck, Heart, Fish } from 'lucide-react';
import { AppPage } from '../types';

interface FooterProps {
  onOpenBooking: () => void;
  onNavigate?: (page: AppPage) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenBooking, onNavigate }) => {
  const handleClick = (e: React.MouseEvent, page: AppPage) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(page);
    }
  };

  return (
    <footer className="bg-slate-50 border-t border-slate-200 text-slate-600 text-xs py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          <div className="space-y-3 md:col-span-1">
            <button 
              onClick={(e) => handleClick(e, 'home')}
              className="flex items-center gap-2 text-slate-900 font-bold text-base font-display text-left cursor-pointer"
            >
              <div className="w-7 h-7 rounded-lg bg-cyan-50 border border-cyan-200 flex items-center justify-center text-cyan-700">
                <Anchor className="w-4 h-4" />
              </div>
              <span>Hermanus Whale Haven</span>
            </button>
            <p className="text-slate-600 text-xs leading-relaxed">
              Walker Bay Marine Protected Area and Dyer Island Shark Sanctuary initiative. Safeguarding Southern Right Whales and Great White Sharks through ethical eco-tourism, telemetry, and conservation.
            </p>
            <div className="text-[11px] text-slate-500 font-medium">
              Western Cape, South Africa · Walker Bay & Dyer Island
            </div>
          </div>

          <div className="space-y-2">
            <div className="text-slate-900 font-bold uppercase tracking-wider text-[11px]">
              Expeditions & Charters
            </div>
            <ul className="space-y-1.5 text-xs text-slate-600">
              <li>
                <button 
                  onClick={(e) => handleClick(e, 'shark-dive')} 
                  className="hover:text-cyan-800 transition-colors font-medium text-cyan-800 flex items-center gap-1 text-left cursor-pointer"
                >
                  <Fish className="w-3 h-3" /> Great White Shark Cage Dive
                </button>
              </li>
              <li>
                <button onClick={(e) => handleClick(e, 'whale-watching')} className="hover:text-cyan-800 transition-colors text-left cursor-pointer font-medium text-cyan-800">
                  Whale Watching Safaris
                </button>
              </li>
              <li>
                <button onClick={(e) => handleClick(e, 'paragliding')} className="hover:text-cyan-800 transition-colors text-left cursor-pointer">
                  Tandem Paragliding Flight
                </button>
              </li>
              <li>
                <button onClick={(e) => handleClick(e, 'surf-kite')} className="hover:text-cyan-800 transition-colors text-left cursor-pointer">
                  Surfing & Kite Lessons
                </button>
              </li>
              <li>
                <button onClick={(e) => handleClick(e, 'transport')} className="hover:text-cyan-800 transition-colors text-left cursor-pointer font-medium text-cyan-800">
                  Airport Transfers & Shuttles
                </button>
              </li>
            </ul>
          </div>

          <div className="space-y-2">
            <div className="text-slate-900 font-bold uppercase tracking-wider text-[11px]">
              Visitor Information
            </div>
            <ul className="space-y-1.5 text-xs text-slate-600">
              <li>
                <button onClick={(e) => handleClick(e, 'home')} className="hover:text-cyan-800 transition-colors text-left cursor-pointer">
                  Flagship Home Page
                </button>
              </li>
              <li>
                <button onClick={(e) => handleClick(e, 'guide')} className="hover:text-cyan-800 transition-colors text-left cursor-pointer">
                  12km Cliff Path Trail Map
                </button>
              </li>
              <li>
                <button onClick={(e) => handleClick(e, 'map')} className="hover:text-cyan-800 transition-colors text-left cursor-pointer">
                  Extended Regional Interactive Map
                </button>
              </li>
              <li>
                <button onClick={(e) => handleClick(e, 'conservation')} className="hover:text-cyan-800 transition-colors text-left cursor-pointer">
                  Conservation Impact & Population Data
                </button>
              </li>
            </ul>
          </div>

          <div className="space-y-2">
            <div className="text-slate-900 font-bold uppercase tracking-wider text-[11px]">
              Marine Safety & Emergency
            </div>
            <div className="text-xs space-y-1.5 text-slate-600">
              <div>SAMSA Commercial Permit: <span className="font-mono text-slate-800 font-semibold">WBY-ECO-2026/04</span></div>
              <div>Operator WhatsApp Dispatch: <a href="https://wa.me/27765588138" target="_blank" rel="noopener noreferrer" className="font-mono text-emerald-800 font-bold hover:underline">076 558 8138</a></div>
              <div>NSRI Station 17 Hermanus: <span className="font-mono text-emerald-800 font-bold">+27 82 990 5967</span></div>
              <div>Hermanus Whale Hotline: <span className="font-mono text-cyan-800 font-bold">+27 28 312 2629</span></div>
              <div className="text-slate-500 pt-1">Dyer Island Conservation Trust Partner</div>
            </div>
          </div>

        </div>

        <div className="pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px]">
          <div>
            © 2026 Hermanus Whale Haven. All rights reserved. Strict ethical 300m whale perimeter observed.
          </div>
          <div className="flex items-center gap-4">
            <button onClick={(e) => handleClick(e, 'home')} className="hover:text-slate-800 transition-colors cursor-pointer">
              Home
            </button>
            <button onClick={(e) => handleClick(e, 'shark-dive')} className="hover:text-slate-800 transition-colors cursor-pointer">
              Shark Diving
            </button>
            <button onClick={onOpenBooking} className="hover:text-cyan-800 font-semibold transition-colors cursor-pointer">
              Book Tickets
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
