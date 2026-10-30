import { useMemo } from 'react';

export interface TelemetryData {
  time: string;
  swellHeight: number;
  swellPeriod: number;
  windSpeed: number;
  windDirection: string;
  windDegrees: number;
  tideLevel: number;
  tideStatus: 'Rising' | 'Falling';
  visibility: number;
  podsActive: number;
  status: 'CLEARED FOR DEPARTURE' | 'CAUTION ADVISED' | 'OPERATIONS SUSPENDED';
  lighting: string;
  recommendedActivity: string;
  hourlyWind: any[];
  tideEvents: any[];
  
  // Compatibility with MaritimeWeatherState
  stationName: string;
  shortName: string;
  coordinates: string;
  windSpeedKnots: number;
  windGustKnots: number;
  windDirectionDegrees: number;
  beaufortScale: string;
  beaufortDescription: string;
  swellHeightMeters: number;
  swellPeriodSeconds: number;
  swellDirection: string;
  seaStateDescription: string;
  waterTemperatureCelsius: number;
  underwaterVisibilityMeters: number;
  atmosphericPressureHpa: number;
  currentTideMeters: number;
  tideTrend: 'RISING' | 'FALLING';
}

/**
 * Simulates marine telemetry data based on a given hour (06:00 to 18:00)
 */
export const getTelemetryAtHour = (hour: number): TelemetryData => {
  const swellHeight = parseFloat((1.2 + Math.sin(hour / 2) * 0.4).toFixed(1));
  const swellPeriod = Math.floor(8 + Math.cos(hour / 3) * 3);
  const windSpeed = parseFloat((4 + Math.pow(hour - 6, 1.2) * 0.8).toFixed(1));
  const windDegrees = (180 + (hour - 12) * 10) % 360;
  const windDirection = degreesToCardinal(windDegrees);
  const tideLevel = parseFloat((0.5 + Math.abs(Math.sin(hour / 4)) * 1.5).toFixed(2));
  const tideStatus = Math.sin(hour / 4 + 0.1) > Math.sin(hour / 4) ? 'Rising' : 'Falling';
  const visibility = parseFloat((12 - (hour - 6) * 0.3).toFixed(1));
  const podsActive = Math.floor(3 + Math.sin(hour / 2) * 3);
  
  let status: TelemetryData['status'] = 'CLEARED FOR DEPARTURE';
  if (windSpeed > 20 || swellHeight > 2.5) status = 'OPERATIONS SUSPENDED';
  else if (windSpeed > 15 || swellHeight > 1.8) status = 'CAUTION ADVISED';
  
  let lighting = 'brightness(1)';
  if (hour < 8) lighting = 'brightness(0.7) sepia(0.2) hue-rotate(-20deg)';
  else if (hour > 16) lighting = 'brightness(0.8) sepia(0.3) hue-rotate(10deg)';
  
  let recommendedActivity = 'Optimal Whale Safari Window';
  
  if (hour < 8) {
    recommendedActivity = swellHeight < 1.0 ? 'Premium Sunrise Kayaking' : 'First-Light Photography Safari';
  } else if (hour < 11) {
    recommendedActivity = podsActive > 5 ? 'High-Density Pod Interaction' : 'Standard Boat-Based Whale Watch';
  } else if (hour < 14) {
    recommendedActivity = windSpeed > 15 ? 'Extreme Kitesurfing Window' : 'Deep Sea Fishing Expedition';
  } else if (hour < 17) {
    recommendedActivity = visibility > 8 ? 'Guided Snorkeling & Kelp Forest' : 'Coastal Bird Watch Discovery';
  } else {
    recommendedActivity = 'Golden Hour Marine Sunset Cruise';
  }

  if (status === 'OPERATIONS SUSPENDED') {
    recommendedActivity = 'Museum & Land-Based Sightseeing';
  } else if (status === 'CAUTION ADVISED') {
    recommendedActivity = 'Harbor-Side Marine Education';
  }

  return {
    time: `${hour.toString().padStart(2, '0')}:00`,
    swellHeight,
    swellPeriod,
    windSpeed,
    windDirection,
    windDegrees,
    tideLevel,
    tideStatus,
    visibility,
    podsActive,
    status,
    lighting,
    recommendedActivity,
    hourlyWind: [
      { time: 'Morning', speedKnots: Math.max(0, windSpeed - 2), gustKnots: windSpeed + 2, direction: windDirection, directionDegrees: windDegrees },
      { time: 'Afternoon', speedKnots: windSpeed + 4, gustKnots: windSpeed + 8, direction: windDirection, directionDegrees: windDegrees },
      { time: 'Evening', speedKnots: windSpeed, gustKnots: windSpeed + 3, direction: windDirection, directionDegrees: windDegrees }
    ],
    tideEvents: [
      { type: 'LOW', time: '04:15', heightMeters: 0.4 },
      { type: 'HIGH', time: '10:30', heightMeters: 1.8 },
      { type: 'LOW', time: '16:45', heightMeters: 0.5 },
      { type: 'HIGH', time: '22:50', heightMeters: 1.9 }
    ],
    stationName: 'HWH-OMEGA-01',
    shortName: 'OMEGA-01',
    coordinates: '34°25′54″S 19°13′22″E',
    windSpeedKnots: windSpeed,
    windGustKnots: windSpeed + 4,
    windDirectionDegrees: windDegrees,
    beaufortScale: `Force ${Math.floor(windSpeed / 5) + 1}`,
    beaufortDescription: getDouglasSeaDescription(swellHeight),
    swellHeightMeters: swellHeight,
    swellPeriodSeconds: swellPeriod,
    swellDirection: 'SW (220°)',
    seaStateDescription: getDouglasSeaDescription(swellHeight),
    waterTemperatureCelsius: 15.4,
    underwaterVisibilityMeters: visibility,
    atmosphericPressureHpa: 1014.2,
    currentTideMeters: tideLevel,
    tideTrend: tideStatus.toUpperCase() as 'RISING' | 'FALLING'
  };
};

// --- RESTORED EXPORTS FOR OTHER COMPONENTS ---

export interface LiveTelemetryResponse {
  station: string;
  timestamp: string;
  latencyMs: number;
  apiProvider: string;
  data: any;
}

export const TELEMETRY_STATIONS = {
  OMEGA: { name: 'HWH-OMEGA-01', latitude: -34.4215, longitude: 19.2486 },
  ALPHA: { name: 'HWH-ALPHA-02', latitude: -34.4320, longitude: 19.2150 },
  SIGMA: { name: 'HWH-SIGMA-03', latitude: -34.4450, longitude: 19.2680 },
};

export const degreesToCardinal = (degrees: number): string => {
  const normalized = ((degrees % 360) + 360) % 360;
  const index = Math.round(normalized / 22.5) % 16;
  const cardinals = [
    'N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE',
    'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'
  ];
  return cardinals[index];
};

export const getDouglasSeaDescription = (swellHeight: number): string => {
  if (swellHeight < 0.1) return 'Calm Glassy (Douglas 0)';
  if (swellHeight < 0.5) return 'Calm Rippled (Douglas 1)';
  if (swellHeight < 1.25) return 'Smooth Wavelets (Douglas 2)';
  if (swellHeight < 2.5) return 'Slight to Moderate (Douglas 3-4)';
  if (swellHeight < 4.0) return 'Rough (Douglas 5)';
  return 'Very Rough / High (Douglas 6+)';
};

export const fetchLiveMarineTelemetry = async (stationKey: string = 'OMEGA'): Promise<LiveTelemetryResponse> => {
  // Simulate a live fetch
  await new Promise(r => setTimeout(r, 450));
  const currentHour = new Date().getHours();
  const simulated = getTelemetryAtHour(currentHour >= 6 && currentHour <= 18 ? currentHour : 12);
  
  return {
    station: stationKey.toUpperCase(),
    timestamp: new Date().toISOString(),
    latencyMs: 142,
    apiProvider: 'South African Weather Service (SAWS)',
    data: simulated
  };
};
