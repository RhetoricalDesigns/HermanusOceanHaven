import test from 'node:test';
import assert from 'node:assert/strict';
import { degreesToCardinal, getDouglasSeaDescription, TELEMETRY_STATIONS } from './telemetryService';

test('degreesToCardinal converts angles to accurate cardinal directions', () => {
  assert.equal(degreesToCardinal(0), 'N');
  assert.equal(degreesToCardinal(360), 'N');
  assert.equal(degreesToCardinal(90), 'E');
  assert.equal(degreesToCardinal(180), 'S');
  assert.equal(degreesToCardinal(270), 'W');
  assert.equal(degreesToCardinal(225), 'SW');
  assert.equal(degreesToCardinal(155), 'SSE');
});

test('getDouglasSeaDescription produces valid Douglas scale stages', () => {
  assert.equal(getDouglasSeaDescription(0.05), 'Calm Glassy (Douglas 0)');
  assert.equal(getDouglasSeaDescription(0.3), 'Calm Rippled (Douglas 1)');
  assert.equal(getDouglasSeaDescription(1.0), 'Smooth Wavelets (Douglas 2)');
  assert.equal(getDouglasSeaDescription(1.8), 'Slight to Moderate (Douglas 3-4)');
  assert.equal(getDouglasSeaDescription(3.5), 'Rough (Douglas 5)');
  assert.equal(getDouglasSeaDescription(4.5), 'Very Rough / High (Douglas 6+)');
});

test('telemetry stations have valid geographic coordinates in Walker Bay area', () => {
  const stations = Object.values(TELEMETRY_STATIONS);
  assert.equal(stations.length, 3);
  for (const st of stations) {
    // South Africa Western Cape / Walker Bay latitude is ~ -34 deg, longitude is ~ +19 deg
    assert.ok(st.latitude < -34 && st.latitude > -35, `Invalid lat for ${st.name}: ${st.latitude}`);
    assert.ok(st.longitude > 19 && st.longitude < 20, `Invalid lon for ${st.name}: ${st.longitude}`);
  }
});
