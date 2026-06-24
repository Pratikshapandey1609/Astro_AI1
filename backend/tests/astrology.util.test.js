const test = require("node:test");
const assert = require("node:assert/strict");
const {
  calculateZodiacSign,
  calculateCompatibility,
  calculateMoonSign
} = require("../src/utils/astrology.util");

test("calculateZodiacSign returns the expected western sign", () => {
  assert.equal(calculateZodiacSign("1998-08-10"), "Leo");
  assert.equal(calculateZodiacSign("1998-12-30"), "Capricorn");
});

test("calculateCompatibility returns high score for compatible signs", () => {
  const result = calculateCompatibility("Leo", "Aries");
  assert.equal(result.level, "High");
  assert.ok(result.score >= 80);
});

test("calculateMoonSign is deterministic for the same birth data", () => {
  const input = { dob: "1998-08-10", tob: "14:30", pob: "Mumbai" };
  assert.equal(calculateMoonSign(input), calculateMoonSign(input));
});
