export type WhaleSpecies = 
  | 'Southern Right' 
  | 'Humpback' 
  | "Bryde's" 
  | 'Common Dolphin'
  | 'Great White Shark'
  | 'Bronze Whaler Shark';

export type WhaleBehavior = 
  | 'Breaching' 
  | 'Tail Sailing' 
  | 'Lobtailing' 
  | 'Spyhopping' 
  | 'Logging' 
  | 'Mating Pod'
  | 'Surface Patrol & Cage Interaction';

export interface Sighting {
  id: string;
  species: WhaleSpecies;
  podCount: number;
  hasCalf: boolean;
  behavior: WhaleBehavior;
  distanceMeters: number;
  landmark: string;
  coordinates: {
    x: number; // percentage on map (0-100)
    y: number; // percentage on map (0-100)
    lat: number;
    lng: number;
  };
  depthMeters: number;
  lastSpottedMinutesAgo: number;
  diveTimeRemainingSeconds: number;
  notes: string;
  reportedBy: string;
  verified: boolean;
}

export interface TourPackage {
  id: string;
  title: string;
  subtitle: string;
  duration: string;
  boatName: string;
  departureTimes: string[];
  priceZAR: number;
  priceUSD: number;
  childPriceZAR: number;
  childPriceUSD: number;
  capacity: number;
  remainingSeatsToday: number;
  image: string;
  highlights: string[];
  included: string[];
  badge?: string;
  ecoCertified: boolean;
  category?: 'whale' | 'shark' | 'paragliding' | 'surf-kite';
}

export interface BookingAddOns {
  hotelShuttle: boolean; // ZAR 350 / USD 20
  rentalOptics: boolean; // ZAR 150 / USD 8
  conservationDonation: boolean; // ZAR 100 / USD 5
}

export interface BookingFormState {
  tourId: string;
  date: string;
  timeSlot: string;
  adults: number;
  children: number;
  seniors: number;
  infants: number;
  addOns: BookingAddOns;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  specialRequests: string;
}

export interface ConfirmedBooking {
  bookingRef: string;
  tourTitle: string;
  date: string;
  timeSlot: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  adults: number;
  children: number;
  seniors: number;
  totalZAR: number;
  totalUSD: number;
  qrCodeValue: string;
  status: 'PROVISIONAL_REQUEST' | 'CONFIRMED' | 'DISPATCHED';
}

export interface EmailAlertSubscription {
  email: string;
  instantBreaches: boolean;
  cowCalfSightings: boolean;
  closeToShoreOnly: boolean; // <200m
  dailyDigest: boolean;
}

export interface EmailAlertLog {
  id: string;
  timestamp: string;
  title: string;
  subject: string;
  preview: string;
  species: WhaleSpecies;
  landmark: string;
  distanceMeters: number;
  behavior: WhaleBehavior;
  hasCalf: boolean;
  recipientsCount: number;
}

export interface CliffPathViewpoint {
  id: string;
  name: string;
  afrikaansName?: string;
  description: string;
  bestWhaleActivity: string;
  distanceFromOldHarbourKm: number;
  wheelchairAccessible: boolean;
  benchesCount: number;
  parkingAvailable: boolean;
  coordinates: { x: number; y: number };
}

export interface PhotoItem {
  id: string;
  title: string;
  photographer: string;
  species: WhaleSpecies;
  location: string;
  imageUrl: string;
  likes: number;
  userLiked?: boolean;
  date: string;
  cameraInfo: string;
}

export interface ReviewItem {
  id: string;
  author: string;
  origin: string;
  rating: number;
  date: string;
  tourTitle: string;
  text: string;
  sightingCount: number;
  verified: boolean;
  helpfulCount: number;
}


export interface TideEvent {
  type: 'HIGH' | 'LOW';
  time: string;
  heightMeters: number;
}

export interface HourlyWindData {
  time: string;
  speedKnots: number;
  gustKnots: number;
  direction: string;
  directionDegrees: number;
}

export interface MaritimeWeatherState {
  stationName: string;
  shortName: string;
  coordinates: string;
  windSpeedKnots: number;
  windGustKnots: number;
  windDirection: string;
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
  tideEvents: TideEvent[];
  hourlyWind: HourlyWindData[];
  lastUpdated: string;
}

export type AppPage = 
  | 'home' 
  | 'whale-watching'
  | 'whale-safari'
  | 'shark-dive'
  | 'paragliding'
  | 'surf-kite'
  | 'transport'
  | 'weather' 
  | 'guide' 
  | 'map'
  | 'conservation';

export interface WhaleWatchingPrice {
  adult: string;
  studentSenior?: string;
  child?: string;
  infant?: string;
  notes?: string;
}

export interface WhaleWatchingOperator {
  id: string;
  name: string;
  location: string;
  locationDetail: string;
  pricing: WhaleWatchingPrice;
}

export interface TransportServiceItem {
  id: string;
  title: string;
  subtitle: string;
  category: 'airport' | 'scenic' | 'shark-shuttle' | 'wine-valley' | 'local' | 'bike-rental';
  route: string;
  duration: string;
  priceZAR: number;
  priceUSD: number;
  priceUnit: string;
  capacity: string;
  image: string;
  features: string[];
  vehicleTypes: string[];
  badge?: string;
  departureSchedule: string;
}

