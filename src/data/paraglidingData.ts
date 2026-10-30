import { WhaleWatchingOperator } from '../types';

export const PARAGLIDING_MARKET_DATA: WhaleWatchingOperator[] = [
  {
    id: 'tandem-flights',
    name: 'Tandem Paragliding Flights',
    location: 'Hermanus',
    locationDetail: 'Rotary Drive (Main Site) or Voëlklip (Sunset)',
    pricing: {
      adult: 'R1,550 – R2,200',
      notes: 'SAHPA-certified instructor & return transport included. Standard (10–15 min): R1,550. Premium (20 min + GoPro): R2,200. GoPro Add-on: +R300.'
    }
  },
  {
    id: 'flight-academy',
    name: 'Learn to Fly / Basic Training',
    location: 'Hermanus',
    locationDetail: 'Regional Training Slopes',
    pricing: {
      adult: 'R24,900',
      notes: 'Comprehensive basic training course to become a licensed pilot.'
    }
  }
];
