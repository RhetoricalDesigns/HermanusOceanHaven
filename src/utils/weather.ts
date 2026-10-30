import { MaritimeWeatherState, TideEvent } from '../types';

export interface ExcursionSafetyEvaluation {
  overallScore: number; // 0 to 100
  overallStatus: 'OPTIMAL' | 'FAVORABLE' | 'MODERATE' | 'RESTRICTED';
  catamaranStatus: 'CLEARED' | 'CAUTION' | 'CANCELLED';
  kayakStatus: 'CLEARED' | 'CAUTION' | 'CANCELLED';
  aerialStatus: 'CLEARED' | 'CAUTION' | 'CANCELLED';
  paraglidingStatus: 'CLEARED' | 'CAUTION' | 'CANCELLED';
  cliffWalkStatus: 'OPTIMAL' | 'MODERATE' | 'CAUTION';
  whaleVisibilityIndex: 'EXCELLENT' | 'VERY GOOD' | 'GOOD' | 'CHALLENGING';
  safetyNotice: string;
}

/**
 * Calculates official Beaufort Wind Scale based on knots
 */
export function getBeaufortScale(knots: number): { scale: number; name: string; seaImpact: string } {
  if (knots < 1) return { scale: 0, name: 'Calm', seaImpact: 'Sea like a mirror' };
  if (knots <= 3) return { scale: 1, name: 'Light Air', seaImpact: 'Ripples with appearance of scales' };
  if (knots <= 6) return { scale: 2, name: 'Light Breeze', seaImpact: 'Small wavelets, glassy crests' };
  if (knots <= 10) return { scale: 3, name: 'Gentle Breeze', seaImpact: 'Large wavelets, scattered whitecaps' };
  if (knots <= 16) return { scale: 4, name: 'Moderate Breeze', seaImpact: 'Small waves, fairly frequent white horses' };
  if (knots <= 21) return { scale: 5, name: 'Fresh Breeze', seaImpact: 'Moderate waves, many white horses, some spray' };
  if (knots <= 27) return { scale: 6, name: 'Strong Breeze', seaImpact: 'Large waves begin to form, extensive white spray' };
  return { scale: 7, name: 'Near Gale / Gale', seaImpact: 'Sea heaps up, white foam blown in streaks' };
}

/**
 * Evaluates marine excursion safety thresholds for Walker Bay
 */
export function evaluateExcursionSafety(
  windKnots: number,
  swellMeters: number
): ExcursionSafetyEvaluation {
  // Catamaran can handle up to 22 knots and 2.8m swell safely in Walker Bay
  let catamaranStatus: 'CLEARED' | 'CAUTION' | 'CANCELLED' = 'CLEARED';
  if (windKnots > 24 || swellMeters > 3.0) {
    catamaranStatus = 'CANCELLED';
  } else if (windKnots > 18 || swellMeters > 2.2) {
    catamaranStatus = 'CAUTION';
  }

  // Sea kayaks are sensitive to surface chop (safe up to 14 knots, 1.8m swell)
  let kayakStatus: 'CLEARED' | 'CAUTION' | 'CANCELLED' = 'CLEARED';
  if (windKnots > 15 || swellMeters > 1.8) {
    kayakStatus = 'CANCELLED';
  } else if (windKnots > 11 || swellMeters > 1.4) {
    kayakStatus = 'CAUTION';
  }

  // Aerial flights (safe up to 24 knots crosswind, high cloud ceiling)
  let aerialStatus: 'CLEARED' | 'CAUTION' | 'CANCELLED' = 'CLEARED';
  if (windKnots >= 25) {
    aerialStatus = 'CANCELLED';
  } else if (windKnots >= 18) {
    aerialStatus = 'CAUTION';
  }

  // Tandem Paragliding (ideal 6-14 knots laminar ridge breeze; caution 15-18 knots; cancelled >18 or <4 knots)
  let paraglidingStatus: 'CLEARED' | 'CAUTION' | 'CANCELLED' = 'CLEARED';
  if (windKnots > 18 || windKnots < 4) {
    paraglidingStatus = 'CANCELLED';
  } else if (windKnots >= 15) {
    paraglidingStatus = 'CAUTION';
  }

  // Cliff Path (always open, cautious in high gale spray)
  let cliffWalkStatus: 'OPTIMAL' | 'MODERATE' | 'CAUTION' = 'OPTIMAL';
  if (windKnots >= 28) {
    cliffWalkStatus = 'CAUTION';
  } else if (windKnots >= 16) {
    cliffWalkStatus = 'MODERATE';
  }

  let whaleVisibilityIndex: 'EXCELLENT' | 'VERY GOOD' | 'GOOD' | 'CHALLENGING' = 'EXCELLENT';
  if (windKnots <= 8 && swellMeters <= 1.5) {
    whaleVisibilityIndex = 'EXCELLENT';
  } else if (windKnots <= 14 && swellMeters <= 2.0) {
    whaleVisibilityIndex = 'VERY GOOD';
  } else if (windKnots <= 20) {
    whaleVisibilityIndex = 'GOOD';
  } else {
    whaleVisibilityIndex = 'CHALLENGING';
  }

  const overallScore = Math.max(10, Math.min(100, Math.round(100 - (windKnots * 1.4 + swellMeters * 8))));

  let overallStatus: 'OPTIMAL' | 'FAVORABLE' | 'MODERATE' | 'RESTRICTED' = 'OPTIMAL';
  if (catamaranStatus === 'CANCELLED' || windKnots >= 24 || swellMeters >= 3.0) {
    overallStatus = 'RESTRICTED';
  } else if (overallScore >= 78) {
    overallStatus = 'OPTIMAL';
  } else if (overallScore >= 62) {
    overallStatus = 'FAVORABLE';
  } else if (overallScore >= 45) {
    overallStatus = 'MODERATE';
  } else {
    overallStatus = 'RESTRICTED';
  }

  let safetyNotice = 'Exceptional ocean conditions across Walker Bay. Pristine surface clarity for spotting mother & calf pairs.';
  if (overallStatus === 'RESTRICTED') {
    safetyNotice = 'Advisory: Strong swell / winds present. Ocean departures delayed or restricted to sheltered bays.';
  } else if (overallStatus === 'MODERATE') {
    safetyNotice = 'Moderate chop. Catamarans operating comfortably; kayak tours stay within Old Harbour kelp line.';
  }

  return {
    overallScore,
    overallStatus,
    catamaranStatus,
    kayakStatus,
    aerialStatus,
    paraglidingStatus,
    cliffWalkStatus,
    whaleVisibilityIndex,
    safetyNotice,
  };
}

/**
 * Calculates estimated tide curve points over 24 hours for smooth SVG rendering
 */
export function generate24HourTideCurve(tideEvents: TideEvent[]): { hour: number; timeLabel: string; height: number }[] {
  const points: { hour: number; timeLabel: string; height: number }[] = [];
  
  // Approximate semi-diurnal M2 lunar tide harmonic curve (12.4h cycle)
  // Low: ~0.4m, High: ~1.85m, Mean: 1.125m, Amplitude: ~0.725m
  for (let h = 0; h <= 24; h += 1) {
    // Phase offset matching 10:48 High Tide
    const phaseOffsetHours = 10.8;
    const periodHours = 12.4;
    const angle = ((h - phaseOffsetHours) / periodHours) * 2 * Math.PI;
    const height = 1.15 + 0.72 * Math.cos(angle);
    
    const formattedHour = `${h.toString().padStart(2, '0')}:00`;
    points.push({
      hour: h,
      timeLabel: formattedHour,
      height: Math.round(height * 100) / 100,
    });
  }
  return points;
}
