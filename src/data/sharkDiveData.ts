import { WhaleWatchingOperator } from '../types';

export const SHARK_DIVE_MARKET_DATA: WhaleWatchingOperator[] = [
  {
    id: 'standard-expedition',
    name: 'Standard Shark Cage Expeditions',
    location: 'Kleinbaai Harbour',
    locationDetail: 'Gansbaai Area (Marine Protected Area)',
    pricing: {
      adult: 'R2,400 – R2,750',
      studentSenior: 'R1,220 – R1,800',
      child: 'R1,350 – R1,450',
      infant: 'Free (under 5)',
      notes: 'Includes breakfast, lunch, and all diving equipment. International rates shown. SA Resident specials available from R1,800.'
    }
  },
  {
    id: 'premium-research',
    name: 'Premium Marine Research Safari',
    location: 'Kleinbaai Harbour',
    locationDetail: 'Scientific Focus with Marine Biologists',
    pricing: {
      adult: 'R3,655 + R150 Fee',
      child: 'R2,070',
      notes: 'Includes R150 conservation levy for Dyer Island Trust. Features trip video and Great White House hospitality.'
    }
  },
  {
    id: 'hookah-diving',
    name: 'Hookah Air-Supply Cage Diving',
    location: 'Gansbaai',
    locationDetail: 'Advanced Surface-Supplied Air',
    pricing: {
      adult: 'R3,300',
      notes: 'Stay underwater longer with surface-supplied air (Hookah system). Professional gear included.'
    }
  },
  {
    id: 'combo-safaris',
    name: 'Multi-Species Combo Safaris',
    location: 'Regional Coastline',
    locationDetail: 'Whale, Shark & Marine Big 5',
    pricing: {
      adult: 'R3,900 – R5,050',
      notes: 'Best Value. Whale Safari + Shark Dive: R5,050. Big 5 Sea Safari + Hookah Dive: R4,450.'
    }
  },
  {
    id: 'sa-resident-specials',
    name: 'South African Resident Rates',
    location: 'Gansbaai / Kleinbaai',
    locationDetail: 'ID Required for Local Discount',
    pricing: {
      adult: 'R1,800 – R1,950',
      child: 'R1,200 – R1,400',
      notes: 'Up to 40% discount for SA Residents. Valid Green Barcoded ID or Smart ID card required at check-in.'
    }
  }
];
