import test from 'node:test';
import assert from 'node:assert/strict';
import { evaluateExcursionSafety, getBeaufortScale, generate24HourTideCurve } from './weather';

test('Beaufort scale evaluates knots correctly', () => {
  assert.equal(getBeaufortScale(0.5).scale, 0);
  assert.equal(getBeaufortScale(5).scale, 2);
  assert.equal(getBeaufortScale(8).scale, 3);
  assert.equal(getBeaufortScale(15).scale, 4);
  assert.equal(getBeaufortScale(25).scale, 6);
});

test('evaluates calm weather as OPTIMAL for all excursions', () => {
  const safety = evaluateExcursionSafety(7, 1.2);
  assert.equal(safety.overallStatus, 'OPTIMAL');
  assert.equal(safety.catamaranStatus, 'CLEARED');
  assert.equal(safety.kayakStatus, 'CLEARED');
  assert.equal(safety.aerialStatus, 'CLEARED');
  assert.equal(safety.paraglidingStatus, 'CLEARED');
  assert.equal(safety.whaleVisibilityIndex, 'EXCELLENT');
  assert.ok(safety.overallScore >= 80);
});

test('evaluates rough sea conditions with proper caution/cancellation', () => {
  const safety = evaluateExcursionSafety(26, 3.2);
  assert.equal(safety.catamaranStatus, 'CANCELLED');
  assert.equal(safety.kayakStatus, 'CANCELLED');
  assert.equal(safety.aerialStatus, 'CANCELLED');
  assert.equal(safety.paraglidingStatus, 'CANCELLED');
  assert.equal(safety.overallStatus, 'RESTRICTED');
  assert.equal(safety.whaleVisibilityIndex, 'CHALLENGING');
});

test('evaluates tandem paragliding wind envelope accurately', () => {
  // Too light for ridge lift (< 4 knots)
  assert.equal(evaluateExcursionSafety(2, 1.0).paraglidingStatus, 'CANCELLED');
  // Optimal smooth laminar ridge breeze (6-14 knots)
  assert.equal(evaluateExcursionSafety(10, 1.2).paraglidingStatus, 'CLEARED');
  // Cautionary brisk coastal breeze (15-18 knots)
  assert.equal(evaluateExcursionSafety(16, 1.5).paraglidingStatus, 'CAUTION');
  // Blown out (> 18 knots)
  assert.equal(evaluateExcursionSafety(20, 1.8).paraglidingStatus, 'CANCELLED');
});

test('generates valid 24-hour tide curve with realistic height limits', () => {
  const curve = generate24HourTideCurve([]);
  assert.equal(curve.length, 25);
  // Tidal height in Hermanus stays roughly between 0.3m and 2.1m
  curve.forEach(pt => {
    assert.ok(pt.height >= 0.3 && pt.height <= 2.1, `Height ${pt.height} out of range`);
  });
});
