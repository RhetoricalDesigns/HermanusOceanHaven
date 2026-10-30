import { WhaleWatchingOperator } from '../types';

export const SURF_KITE_MARKET_DATA: WhaleWatchingOperator[] = [
  {
    id: 'surf-lesson-group',
    name: 'Group Surfing Lessons',
    location: 'Voëlklip Beach',
    locationDetail: 'Perfect for Beginners & Families',
    pricing: {
      adult: 'R350 – R450',
      child: 'R350 – R450',
      notes: '1-hour session. Includes surfboard and wetsuit rental. Group sizes typically 4-6 people.'
    }
  },
  {
    id: 'surf-lesson-private',
    name: 'Private 1-on-1 Surf Coaching',
    location: 'Voëlklip / Grotto',
    locationDetail: 'Intensive Instruction',
    pricing: {
      adult: 'R600 – R750',
      notes: 'Personalized 1-hour coaching. High success rate for standing up in the first session.'
    }
  },
  {
    id: 'kite-lesson-intro',
    name: 'Introductory Kitesurfing Session',
    location: 'Kleinriver Lagoon',
    locationDetail: 'Flat Water Training (Safe & Shallow)',
    pricing: {
      adult: 'R1,800 – R2,200',
      notes: '2-hour private intro. Covers kite handling, safety systems, and water relaunch.'
    }
  },
  {
    id: 'kite-course-full',
    name: 'Full Kitesurfing Certification',
    location: 'Kleinriver Lagoon',
    locationDetail: 'Complete Beginner to Independent Rider',
    pricing: {
      adult: 'R4,500 – R5,800',
      notes: '6-9 hours of instruction (split over 2-3 days). IKO standard certification.'
    }
  },
  {
    id: 'equipment-rental',
    name: 'Premium Equipment Rentals',
    location: 'Regional Spots',
    locationDetail: 'Daily & Weekly Rentals Available',
    pricing: {
      adult: 'R300 – R1,200',
      notes: 'Surfboards: R300/day. Wetsuits: R150/day. Full Kite Gear: R1,200/day (for certified riders only).'
    }
  }
];
