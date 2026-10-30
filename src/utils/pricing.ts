import { BookingAddOns } from '../types';

export interface BookingPricingResult {
  adultTotalZAR: number;
  childTotalZAR: number;
  addOnsTotalZAR: number;
  subtotalZAR: number;
  vatZAR: number; // 15% South African VAT included in price
  totalZAR: number;
  totalUSD: number;
}

export const ADDON_PRICES_ZAR = {
  hotelShuttle: 350, // Per booking group
  rentalOptics: 150, // Per adult passenger
  conservationDonation: 100, // Fixed donation to Dyer Island & Walker Bay Whale Sanctuary
};

export const ZAR_TO_USD_RATE = 0.054; // ~18.5 ZAR per USD

export function calculateBookingPricing(
  adultPriceZAR: number,
  childPriceZAR: number,
  adults: number,
  children: number,
  addOns: BookingAddOns
): BookingPricingResult {
  const safeAdults = Math.max(0, adults);
  const safeChildren = Math.max(0, children);

  const adultTotalZAR = safeAdults * adultPriceZAR;
  const childTotalZAR = safeChildren * childPriceZAR;

  let addOnsTotalZAR = 0;
  if (addOns.hotelShuttle) {
    addOnsTotalZAR += ADDON_PRICES_ZAR.hotelShuttle;
  }
  if (addOns.rentalOptics) {
    addOnsTotalZAR += safeAdults * ADDON_PRICES_ZAR.rentalOptics;
  }
  if (addOns.conservationDonation) {
    addOnsTotalZAR += ADDON_PRICES_ZAR.conservationDonation;
  }

  const subtotalZAR = adultTotalZAR + childTotalZAR + addOnsTotalZAR;
  
  // South African Standard VAT is 15%, included
  const vatZAR = Math.round((subtotalZAR - subtotalZAR / 1.15) * 100) / 100;
  const totalZAR = subtotalZAR;
  const totalUSD = Math.round(totalZAR * ZAR_TO_USD_RATE);

  return {
    adultTotalZAR,
    childTotalZAR,
    addOnsTotalZAR,
    subtotalZAR,
    vatZAR,
    totalZAR,
    totalUSD,
  };
}

export function formatZAR(amount: number): string {
  return new Intl.NumberFormat('en-ZA', {
    style: 'currency',
    currency: 'ZAR',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatUSD(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount);
}
