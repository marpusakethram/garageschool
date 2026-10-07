// Run with: node tests/engine.test.js
const assert = require('assert');
const E = require('../assets/js/engine.js');
const DASHES = new RegExp('[' + String.fromCharCode(0x2013, 0x2014) + ']');

// Fund sizes start at $10M, end at $2.5B, and rise every single test.
for (let n = 2; n <= E.TESTS_PER_TRACK; n++) assert(E.fundSize(n) > E.fundSize(n - 1), `fund size must rise at test ${n}`);
assert.strictEqual(E.fundSize(1), 10e6);
assert.strictEqual(E.fundSize(50), 2.5e9);

// Same seed, same test. Every test has 50 companies with unique names.
const a = JSON.stringify(E.generateTest('associate', 7));
const b = JSON.stringify(E.generateTest('associate', 7));
assert.strictEqual(a, b, 'tests must be deterministic');

const stats = { companies: 0, success: 0, multiples: [], outOfThesis: { analyst: 0, associate: 0, partner: 0 } };
for (const track of Object.keys(E.TRACKS)) {
  for (let n = 1; n <= E.TESTS_PER_TRACK; n++) {
    const t = E.generateTest(track, n);
    assert.strictEqual(t.companies.length, 50);
    assert.strictEqual(new Set(t.companies.map(c => c.name)).size, 50, `duplicate names in ${track} ${n}`);
    for (const c of t.companies) {
      assert(c.hidden.multiple >= 0 && Number.isFinite(c.hidden.multiple));
      assert(c.terms.ownership > 0 && c.terms.ownership <= 0.3);
      assert(c.month >= 1 && c.month <= 36);
      assert(!DASHES.test(JSON.stringify(c)), 'no en or em dashes in generated text');
      stats.companies++; if (c.hidden.success) stats.success++;
      stats.multiples.push(c.hidden.multiple);
      if (!c.inThesis) stats.outOfThesis[track]++;
    }
    assert.strictEqual(t.meta.thesis.groups === null, track === 'partner');
  }
}
assert.strictEqual(stats.companies, 3 * 50 * 50);
assert.strictEqual(stats.outOfThesis.partner, 0, 'partner deals are pre-screened');
assert(stats.outOfThesis.analyst > stats.outOfThesis.associate, 'analysts see more off-thesis deals');

// Power law: most companies lose money, a few return a lot.
const sorted = stats.multiples.slice().sort((x, y) => x - y);
const median = sorted[Math.floor(sorted.length / 2)];
const top5 = sorted.slice(-Math.floor(sorted.length * 0.05));
const share = top5.reduce((s, x) => s + x, 0) / sorted.reduce((s, x) => s + x, 0);
assert(median < 1, `median multiple should be under 1x, got ${median}`);
assert(share > 0.3, `top 5% should drive a large share of returns, got ${share}`);

// Scoring: picking by true expected value beats picking at random.
const t = E.generateTest('associate', 12);
const best = t.companies.filter(c => c.inThesis).sort((x, y) => y.hidden.ev - x.hidden.ev).slice(0, 10);
const worst = t.companies.slice().sort((x, y) => x.hidden.ev - y.hidden.ev).slice(0, 10);
const asState = list => ({ decisions: Object.fromEntries(t.companies.map(c => [c.i, { yes: list.includes(c), conviction: 2 }])) });
const good = E.scoreTest(t, asState(best));
const bad = E.scoreTest(t, asState(worst));
assert(good.judgment >= 90, `perfect picks should score high, got ${good.judgment}`);
assert(bad.judgment <= 10, `worst picks should score low, got ${bad.judgment}`);
assert(good.lessons.length >= 1 && good.lessons.length <= 3);

// Partner fund math stays sane.
const p = E.generateTest('partner', 30);
const pPicks = p.companies.slice().sort((x, y) => y.hidden.ev - x.hidden.ev).slice(0, p.meta.slots);
const pState = { decisions: Object.fromEntries(p.companies.map(c => [c.i, { yes: pPicks.includes(c) }])), followOns: Object.fromEntries(pPicks.slice(0, p.meta.followSlots).map(c => [c.i, true])) };
const pr = E.scoreTest(p, pState);
assert(pr.fund.deployed <= p.meta.investable + 1, 'cannot deploy more than investable capital');
assert(pr.fund.netTvpi >= 0 && Number.isFinite(pr.fund.netTvpi));
assert(pr.fundPercentile >= 0 && pr.fundPercentile <= 100);

console.log('engine ok:', stats.companies, 'companies;', 'success rate', (stats.success / stats.companies * 100).toFixed(1) + '%;',
  'median', median.toFixed(2) + 'x;', 'top 5% share', (share * 100).toFixed(0) + '%;',
  'partner sample net TVPI', pr.fund.netTvpi.toFixed(2) + 'x', 'percentile', pr.fundPercentile);
