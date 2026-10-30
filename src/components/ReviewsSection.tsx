import React, { useState } from 'react';
import { ReviewItem } from '../types';
import { CUSTOMER_REVIEWS } from '../data/mockData';
import { 
  Star, 
  ThumbsUp, 
  MessageSquare, 
  CheckCircle2, 
  MapPin, 
  Plus,
  ShieldCheck,
  X 
} from 'lucide-react';

export const ReviewsSection: React.FC = () => {
  const [reviews, setReviews] = useState<ReviewItem[]>(CUSTOMER_REVIEWS);
  const [filterRating, setFilterRating] = useState<number | 'all'>('all');
  const [reviewModalOpen, setReviewModalOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // New review form state
  const [newAuthor, setNewAuthor] = useState('');
  const [newOrigin, setNewOrigin] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [newTour, setNewTour] = useState('Apex Great White & Bronze Whaler Shark Cage Dive');
  const [newText, setNewText] = useState('');
  const [newSightingCount, setNewSightingCount] = useState(5);

  const handleHelpful = (id: string) => {
    setReviews(reviews.map(r => {
      if (r.id === id) {
        return { ...r, helpfulCount: r.helpfulCount + 1 };
      }
      return r;
    }));
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthor.trim() || !newText.trim()) return;

    const newReviewItem: ReviewItem = {
      id: `rev-${Date.now()}`,
      author: newAuthor.trim(),
      origin: newOrigin.trim() || 'Cape Town, South Africa',
      rating: newRating,
      date: 'Today',
      tourTitle: newTour,
      text: newText.trim(),
      sightingCount: newSightingCount,
      verified: true,
      helpfulCount: 1,
    };

    setReviews([newReviewItem, ...reviews]);
    setReviewModalOpen(false);
    setToastMessage('Thank you! Your verified review has been published.');
    setTimeout(() => setToastMessage(null), 4000);

    // Reset
    setNewAuthor('');
    setNewOrigin('');
    setNewText('');
  };

  const filteredReviews = filterRating === 'all'
    ? reviews
    : reviews.filter(r => r.rating === filterRating);

  return (
    <section className="py-14 lg:py-20 bg-slate-50/70 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-cyan-800 uppercase tracking-wider mb-2">
              <Star className="w-4 h-4 fill-cyan-700 text-cyan-700" />
              <span>Verified Guest Feedback</span>
              <span className="text-slate-300">·</span>
              <span>1,420+ Global Travelers</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight font-display">
              Adventurer Reviews & Encounters
            </h2>
            <p className="mt-2 text-slate-600 text-sm sm:text-base max-w-2xl leading-relaxed">
              Authentic reviews from marine biologists, families, and solo explorers who experienced Hermanus whale watching on land and sea, and shark cage diving in Gansbaai.
            </p>
          </div>

          <button
            onClick={() => setReviewModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-slate-900 rounded-xl hover:bg-slate-800 active:scale-95 transition-all shadow-xs self-start md:self-end whitespace-nowrap cursor-pointer"
          >
            <Plus className="w-4 h-4 text-cyan-400" />
            <span>Write a Review</span>
          </button>
        </div>

        {/* Feedback confirmation */}
        {toastMessage && (
          <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2 animate-fadeIn">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Overall Rating & Breakdown Scoreboard */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 grid grid-cols-1 md:grid-cols-12 gap-8 items-center shadow-sm">
          
          <div className="md:col-span-4 text-center md:text-left border-b md:border-b-0 md:border-r border-slate-200 pb-6 md:pb-0 md:pr-6 space-y-2">
            <div className="text-5xl font-bold text-slate-900 font-mono tracking-tight font-display">4.9</div>
            <div className="flex items-center justify-center md:justify-start gap-1 text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-current" />
              ))}
            </div>
            <div className="text-xs text-slate-500 font-medium">
              Based on 1,428 verified expedition reviews
            </div>
            <div className="text-[11px] text-emerald-700 font-semibold flex items-center justify-center md:justify-start gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> 98.4% Sighting Success Guaranteed
            </div>
          </div>

          <div className="md:col-span-8 space-y-2.5 text-xs">
            <div className="flex items-center gap-3">
              <span className="w-14 text-slate-600 font-medium">5 Stars</span>
              <div className="flex-1 h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div className="w-[92%] h-full bg-cyan-700 rounded-full" />
              </div>
              <span className="w-12 text-right font-mono font-bold text-slate-700">92%</span>
            </div>

            <div className="flex items-center gap-3">
              <span className="w-14 text-slate-600 font-medium">4 Stars</span>
              <div className="flex-1 h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div className="w-[6%] h-full bg-cyan-600/70 rounded-full" />
              </div>
              <span className="w-12 text-right font-mono font-bold text-slate-700">6%</span>
            </div>

            <div className="flex items-center gap-3">
              <span className="w-14 text-slate-600 font-medium">3 Stars</span>
              <div className="flex-1 h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div className="w-[1.5%] h-full bg-slate-300 rounded-full" />
              </div>
              <span className="w-12 text-right font-mono font-bold text-slate-700">1.5%</span>
            </div>
          </div>

        </div>

        {/* Filter Segmented Control */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500 mr-2">Filter reviews:</span>
          <button
            onClick={() => setFilterRating('all')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors cursor-pointer ${
              filterRating === 'all'
                ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            All Reviews ({reviews.length})
          </button>
          <button
            onClick={() => setFilterRating(5)}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors cursor-pointer ${
              filterRating === 5
                ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            5 Stars Only
          </button>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredReviews.map(review => (
            <div
              key={review.id}
              className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between space-y-4 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="space-y-3">
                
                {/* Header with Star Rating and Date */}
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-1 text-amber-500 mb-1">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                      <span>{review.author}</span>
                      {review.verified && (
                        <span title="Verified Passenger">
                          <CheckCircle2 className="w-3.5 h-3.5 text-cyan-700" />
                        </span>
                      )}
                    </h3>
                    <div className="text-[11px] text-slate-500">{review.origin}</div>
                  </div>

                  <span className="text-[11px] font-mono text-slate-500 tabular-nums">
                    {review.date}
                  </span>
                </div>

                {/* Tour Badge */}
                <div className="text-[11px] text-cyan-900 font-semibold font-mono bg-cyan-50 border border-cyan-200/80 px-2.5 py-1 rounded-md w-fit">
                  {review.tourTitle}
                </div>

                {/* Review Text */}
                <p className="text-xs text-slate-700 leading-relaxed">
                  "{review.text}"
                </p>

              </div>

              {/* Card Footer: Sighting count & helpful button */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span className="font-mono text-[11px]">
                  {review.sightingCount > 0 ? `${review.sightingCount} Whales / Sharks Sighted` : 'Coastal Scenic Walk'}
                </span>

                <button
                  onClick={() => handleHelpful(review.id)}
                  className="inline-flex items-center gap-1 text-[11px] text-slate-500 hover:text-cyan-800 transition-colors cursor-pointer"
                >
                  <ThumbsUp className="w-3 h-3" />
                  <span>Helpful ({review.helpfulCount})</span>
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Write a Review Modal */}
      {reviewModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Plus className="w-4 h-4 text-cyan-700" />
                Write an Expedition Review
              </h3>
              <button
                onClick={() => setReviewModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded-md cursor-pointer"
                aria-label="Close review modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleReviewSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-medium mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Duane Steffens"
                    value={newAuthor}
                    onChange={e => setNewAuthor(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-cyan-600 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-medium mb-1">
                    Your City & Country *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. London, UK"
                    value={newOrigin}
                    onChange={e => setNewOrigin(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-cyan-600 focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-medium mb-1">
                  Tour or Activity Taken *
                </label>
                <select
                  value={newTour}
                  onChange={e => setNewTour(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-cyan-600 focus:bg-white"
                >
                  <option value="Apex Great White & Bronze Whaler Shark Cage Dive">Apex Great White & Bronze Whaler Shark Cage Dive (Gansbaai)</option>
                  <option value="Catamaran Southern Right Whale Safari">Catamaran Southern Right Whale Safari (Walker Bay)</option>
                  <option value="Hermanus Cliff Path & Marine Heritage Walk">Hermanus Cliff Path & Marine Heritage Walk</option>
                  <option value="Eco-Sea Kayak Whale & Marine Encounter">Eco-Sea Kayak Whale & Marine Encounter</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 font-medium mb-1">
                  Overall Rating *
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setNewRating(star)}
                      className="p-1 cursor-pointer"
                    >
                      <Star
                        className={`w-6 h-6 ${
                          star <= newRating ? 'text-amber-500 fill-amber-500' : 'text-slate-300'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="text-xs font-mono font-bold text-slate-700 ml-2">
                    {newRating} / 5 Stars
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-medium mb-1">
                  Whales or Sharks Spotted During Trip
                </label>
                <input
                  type="number"
                  min="0"
                  max="50"
                  value={newSightingCount}
                  onChange={e => setNewSightingCount(parseInt(e.target.value) || 0)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-cyan-600 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-medium mb-1">
                  Review & Sighting Experience *
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Describe your encounter, the marine biologist guide, boat conditions, or cliff path view..."
                  value={newText}
                  onChange={e => setNewText(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-cyan-600 focus:bg-white"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setReviewModalOpen(false)}
                  className="px-4 py-2 text-slate-600 hover:text-slate-900 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-xl cursor-pointer"
                >
                  Publish Verified Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </section>
  );
};
