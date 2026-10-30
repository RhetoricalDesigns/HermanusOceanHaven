import React from 'react';

interface WhaleLoadingProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const WhaleLoading: React.FC<WhaleLoadingProps> = ({ size = 'md', className = '' }) => {
  const sizeMap = {
    sm: 'w-12 h-12',
    md: 'w-24 h-24',
    lg: 'w-32 h-32',
    xl: 'w-48 h-48',
  };

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <div className={`${sizeMap[size]} relative flex items-center justify-center`}>
        {/* Animated Water / Spray Particles */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 flex gap-1 items-end h-1/2 w-full justify-center overflow-hidden pointer-events-none">
          <div className="w-1 h-1 bg-cyan-400 rounded-full animate-whale-spray-1 opacity-0" />
          <div className="w-1.5 h-1.5 bg-cyan-300 rounded-full animate-whale-spray-2 opacity-0" />
          <div className="w-1 h-1 bg-cyan-500 rounded-full animate-whale-spray-3 opacity-0" />
          <div className="w-2 h-2 bg-cyan-200 rounded-full animate-whale-spray-4 opacity-0" />
          <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-whale-spray-5 opacity-0" />
        </div>

        {/* The Whale Body (Surfacing) */}
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full fill-slate-800 animate-whale-surface"
        >
          {/* Main Body Curve */}
          <path
            d="M 10,80 C 10,80 30,30 50,30 C 70,30 90,80 90,80 L 10,80 Z"
            className="fill-slate-800"
          />
          {/* Eye */}
          <circle cx="40" cy="55" r="2" fill="white" className="animate-pulse" />
          {/* Blowhole */}
          <ellipse cx="50" cy="35" rx="3" ry="1" fill="slate-900" />
          
          {/* Water Surface / Waves at the bottom */}
          <path
            d="M 0,80 Q 25,75 50,80 T 100,80 L 100,100 L 0,100 Z"
            className="fill-cyan-600/30"
          />
        </svg>
      </div>
      
      {/* Optional Loading Text with animated dots */}
      <div className="mt-4 text-xs font-bold text-slate-500 uppercase tracking-[0.2em] flex items-center gap-1">
        Locating Giants
        <span className="flex gap-0.5">
          <span className="animate-bounce delay-0">.</span>
          <span className="animate-bounce delay-150">.</span>
          <span className="animate-bounce delay-300">.</span>
        </span>
      </div>

      <style>{`
        @keyframes whale-surface {
          0%, 100% { transform: translateY(10px) rotate(-2deg); }
          50% { transform: translateY(0) rotate(2deg); }
        }
        @keyframes whale-spray-1 {
          0%, 40% { transform: translateY(40px) scale(0); opacity: 0; }
          50% { transform: translateY(0px) scale(1); opacity: 0.8; }
          70% { transform: translateY(-30px) scale(1.5); opacity: 0; }
          100% { transform: translateY(-30px) scale(0); opacity: 0; }
        }
        @keyframes whale-spray-2 {
          0%, 42% { transform: translateY(40px) scale(0); opacity: 0; }
          52% { transform: translateY(-5px) scale(1); opacity: 1; }
          72% { transform: translateY(-40px) scale(2); opacity: 0; }
          100% { transform: translateY(-40px) scale(0); opacity: 0; }
        }
        @keyframes whale-spray-3 {
          0%, 45% { transform: translateY(40px) scale(0); opacity: 0; }
          55% { transform: translateY(-10px) scale(1); opacity: 0.9; }
          75% { transform: translateY(-35px) scale(1.2); opacity: 0; }
          100% { transform: translateY(-35px) scale(0); opacity: 0; }
        }
        @keyframes whale-spray-4 {
          0%, 48% { transform: translateY(40px) scale(0); opacity: 0; }
          58% { transform: translateY(-2px) scale(1); opacity: 1; }
          78% { transform: translateY(-45px) scale(1.8); opacity: 0; }
          100% { transform: translateY(-45px) scale(0); opacity: 0; }
        }
        @keyframes whale-spray-5 {
          0%, 50% { transform: translateY(40px) scale(0); opacity: 0; }
          60% { transform: translateY(-8px) scale(1); opacity: 0.7; }
          80% { transform: translateY(-25px) scale(1.1); opacity: 0; }
          100% { transform: translateY(-25px) scale(0); opacity: 0; }
        }
        .animate-whale-surface {
          animation: whale-surface 4s ease-in-out infinite;
        }
        .animate-whale-spray-1 { animation: whale-spray-1 4s ease-out infinite; }
        .animate-whale-spray-2 { animation: whale-spray-2 4s ease-out infinite; }
        .animate-whale-spray-3 { animation: whale-spray-3 4s ease-out infinite; }
        .animate-whale-spray-4 { animation: whale-spray-4 4s ease-out infinite; }
        .animate-whale-spray-5 { animation: whale-spray-5 4s ease-out infinite; }
      `}</style>
    </div>
  );
};
