import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateBookingPricing, formatZAR, ADDON_PRICES_ZAR } from './pricing';

test('calculates basic adult-only tour pricing correctly', () => {
  const result = calculateBookingPricing(1250, 650, 2, 0, {
    hotelShuttle: false,
    rentalOptics: false,
    conservationDonation: false,
  });

  assert.equal(result.adultTotalZAR, 2500);
  assert.equal(result.childTotalZAR, 0);
  assert.equal(result.addOnsTotalZAR, 0);
  assert.equal(result.totalZAR, 2500);
  assert.ok(result.totalUSD > 0);
  assert.ok(result.vatZAR > 0);
});

test('calculates pricing with children and add-ons correctly', () => {
  const result = calculateBookingPricing(1200, 600, 2, 2, {
    hotelShuttle: true, // 350
    rentalOptics: true, // 150 * 2 = 300
    conservationDonation: true, // 100
  });

  // Adults: 2 * 1200 = 2400
  // Children: 2 * 600 = 1200
  // Addons: 350 + 300 + 100 = 750
  // Subtotal = 2400 + 1200 + 750 = 4350
  assert.equal(result.adultTotalZAR, 2400);
  assert.equal(result.childTotalZAR, 1200);
  assert.equal(result.addOnsTotalZAR, 750);
  assert.equal(result.totalZAR, 4350);
});

test('handles zero and negative guest inputs safely', () => {
  const result = calculateBookingPricing(1000, 500, -1, 0, {
    hotelShuttle: false,
    rentalOptics: false,
    conservationDonation: false,
  });

  assert.equal(result.totalZAR, 0);
  assert.equal(result.totalUSD, 0);
});

test('formats ZAR currency strings properly', () => {
  const formatted = formatZAR(1500);
  assert.ok(formatted.includes('1') && formatted.includes('500'));
});
