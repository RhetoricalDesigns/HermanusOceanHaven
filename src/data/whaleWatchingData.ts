import { WhaleWatchingOperator } from '../types';

export const WHALE_WATCHING_OPERATORS: WhaleWatchingOperator[] = [
  {
    id: 'hermanus-boat',
    name: 'Hermanus Boat-Based Safaris',
    location: 'Hermanus',
    locationDetail: 'New Harbour Launches (Walker Bay)',
    pricing: {
      adult: 'R1,500 – R1,580',
      studentSenior: 'R1,350 – R1,480',
      child: 'R750 – R790',
      infant: 'Free (under 3)',
      notes: 'Standard 1.5 - 2 hour excursions. Official 2026 market rates.'
    }
  },
  {
    id: 'gansbaai-boat',
    name: 'Gansbaai & De Kelders Safaris',
    location: 'Gansbaai',
    locationDetail: 'De Kelders Coastal Launches',
    pricing: {
      adult: 'R1,300 – R2,150',
      studentSenior: 'R1,200 – R1,900',
      child: 'R650 – R1,075',
      infant: 'Free (under 5)',
      notes: 'SA Resident specials available. 40 mins from Hermanus.'
    }
  },
  {
    id: 'marine-big-5',
    name: 'Marine Big 5 & Dyer Island Safaris',
    location: 'Kleinbaai',
    locationDetail: 'Eco-Tours including Shark Alley',
    pricing: {
      adult: 'R2,340 – R2,500',
      child: 'R1,725 (5–12)',
      infant: 'Free (under 5)',
      notes: 'Includes Dyer Island & Geyser Rock (Seals & Penguins).'
    }
  },
  {
    id: 'aerial-safari',
    name: 'Aerial Whale Watching Flights',
    location: 'Hermanus Area',
    locationDetail: 'Scenic Coastal Patrols',
    pricing: {
      adult: 'R2,850 – R3,500',
      child: 'R2,100 – R2,500',
      notes: '45-60 minute fixed-wing aircraft flights.'
    }
  },
  {
    id: 'kayak-safari',
    name: 'Guided Sea Kayak Encounters',
    location: 'Hermanus',
    locationDetail: 'Old Harbour Coastal Paddling',
    pricing: {
      adult: 'R850',
      child: 'R850 (No discount)',
      notes: '2-hour intimate water-level experience.'
    }
  }
];
