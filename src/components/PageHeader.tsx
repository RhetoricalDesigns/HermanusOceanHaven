import React from 'react';
import { ChevronRight, ArrowLeft, Home } from 'lucide-react';
import { AppPage } from '../types';

interface PageHeaderProps {
  pageTitle: string;
  badge: string;
  subtitle: string;
  currentPage: AppPage;
  onNavigate: (page: AppPage) => void;
  onOpenBooking: () => void;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  pageTitle,
  badge,
  subtitle,
  currentPage,
  onNavigate,
  onOpenBooking
}) => {
  return (
    <div className="border-b border-slate-200 bg-slate-50/70 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-3">
          <button
            onClick={() => onNavigate('home')}
            className="hover:text-cyan-700 font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Home className="w-3.5 h-3.5 text-cyan-700" />
            Home
          </button>
          <ChevronRight className="w-3 h-3 text-slate-400" />
          <span className="text-slate-900 font-medium">{pageTitle}</span>
        </div>

        {/* Header content and quick actions */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[11px] font-bold uppercase tracking-wider bg-cyan-100/70 text-cyan-800 border border-cyan-200 mb-1.5">
              {badge}
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display tracking-tight">
              {pageTitle}
            </h1>
            {subtitle && (
              <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
                {subtitle}
              </p>
            )}
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <button
              onClick={() => onNavigate('home')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors shadow-2xs cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Back to Home
            </button>
            <button
              onClick={onOpenBooking}
              className="px-3.5 py-1.5 text-xs font-semibold text-white bg-cyan-700 hover:bg-cyan-800 rounded-lg transition-colors shadow-2xs"
            >
              Book Activity
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
