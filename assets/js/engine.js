/*
  VentureSim test engine.
  Every test is generated from a seed, so the same track and test number always
  produce the same 50 companies for every user. Nothing here touches the page.
*/
(function (root, factory) {
  var api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.GarageEngine = api;
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  var TESTS_PER_TRACK = 50;
  var COMPANIES_PER_TEST = 50;

  // ---------- Random numbers ----------
  function hashStr(s) {
    var h = 2166136261 >>> 0;
    for (var i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); }
    return h >>> 0;
  }
  function makeRng(seed) {
    var a = hashStr(String(seed));
    return function () {
      a = (a + 0x6D2B79F5) | 0;
      var t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  function normal(r) { var u = 1 - r(), v = r(); return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v); }
  function pick(r, arr) { return arr[Math.floor(r() * arr.length)]; }
  function clamp(x, a, b) { return Math.max(a, Math.min(b, x)); }
  function bell(r) { return (r() + r() + r()) / 3; }               // 0..1, centered on 0.5
  function tier(s, n) { return clamp(Math.floor(s * n), 0, n - 1); }
  function sigmoid(x) { return 1 / (1 + Math.exp(-x)); }
  function shuffle(r, arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(r() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; }
    return a;
  }

  // ---------- Formatting ----------
  function money(x) {
    var abs = Math.abs(x), sign = x < 0 ? '-' : '';
    if (abs >= 1e9) return sign + '$' + trim(abs / 1e9, abs >= 1e10 ? 0 : 1) + 'B';
    if (abs >= 1e6) return sign + '$' + trim(abs / 1e6, abs >= 1e8 ? 0 : 1) + 'M';
    if (abs >= 1e3) return sign + '$' + Math.round(abs / 1e3) + 'K';
    return sign + '$' + Math.round(abs);
  }
  function trim(v, d) { var s = v.toFixed(d); return s.indexOf('.') > -1 ? s.replace(/\.0+$/, '') : s; }
  function mult(m) { return (m >= 10 ? m.toFixed(0) : m >= 1 ? m.toFixed(1) : m.toFixed(2)) + 'x'; }
  function pct(x) { return Math.round(x * 100) + '%'; }

  // ---------- Funds ----------
  function niceRound(x) { var mag = Math.pow(10, Math.floor(Math.log10(x)) - 1); return Math.round(x / mag) * mag; }
  // $10M for test 1, rising every test to $2.5B for test 50.
  function fundSize(n) { return niceRound(10e6 * Math.pow(250, (n - 1) / (TESTS_PER_TRACK - 1))); }

  var STAGES = {
    preseed: { label: 'Pre-seed', w: { team: .36, market: .18, product: .2, traction: .04, moat: .1, risk: .12 }, upside: 14, sigma: 1.25, base: -1.35, own: .12, keep: .45, fail: [.6, 0, .5], stepK: 1 },
    seed:    { label: 'Seed',     w: { team: .28, market: .2,  product: .2, traction: .12, moat: .1, risk: .1 },  upside: 10, sigma: 1.15, base: -1.2,  own: .10, keep: .5, fail: [.6, 0, .5], stepK: 1 },
    a:       { label: 'Series A', w: { team: .2,  market: .18, product: .16, traction: .26, moat: .12, risk: .08 }, upside: 7.5, sigma: 1.0, base: -.8, own: .09, keep: .6, fail: [.45, 0, .6], stepK: .8 },
    b:       { label: 'Series B', w: { team: .14, market: .16, product: .14, traction: .32, moat: .14, risk: .1 },  upside: 5.4, sigma: .85, base: -.3, own: .06, keep: .7, fail: [.2, .1, .7], stepK: .55 },
    growth:  { label: 'Growth',   w: { team: .1,  market: .15, product: .13, traction: .34, moat: .16, risk: .12 }, upside: 3.9, sigma: .7, base: .1, own: .035, keep: .8, fail: [.05, .3, .9], stepK: .4 }
  };
  var FACTORS = ['team', 'market', 'product', 'traction', 'moat', 'risk'];
  var FACTOR_LABEL = { team: 'Team', market: 'Market', product: 'Product and customers', traction: 'Traction', moat: 'Competition and moat', risk: 'Risk', price: 'Price' };

  function stagesFor(size) {
    if (size < 40e6) return ['preseed', 'seed'];
    if (size < 150e6) return ['seed', 'a'];
    if (size < 600e6) return ['a', 'b'];
    return ['b', 'growth'];
  }

  var TRACKS = {
    analyst: {
      id: 'analyst', name: 'Analyst', yes: 'Advance', no: 'Let go', past: { yes: 'Advanced', no: 'Let go' },
      blurb: 'Screen the pipeline. Pick the 10 companies worth a partner meeting and let the rest go, while staying inside the fund\'s thesis.',
      outOfThesis: .25, conviction: false, credits: 8
    },
    associate: {
      id: 'associate', name: 'Associate', yes: 'Invest', no: 'Let go', past: { yes: 'Invested', no: 'Let go' },
      blurb: 'Recommend investments. Choose 10 companies to back, rate your conviction in each, and pay attention to price.',
      outOfThesis: .1, conviction: true, credits: 10
    },
    partner: {
      id: 'partner', name: 'Partner', yes: 'Invest', no: 'Let go', past: { yes: 'Invested', no: 'Let go' },
      blurb: 'Run the fund. Make your initial investments over three years, decide which portfolio companies get your reserves, and answer to LPs on net returns.',
      outOfThesis: 0, conviction: false, credits: 12
    }
  };

  // ---------- Content tables ----------
  var GROUPS = {
    software: { label: 'B2B software', sectors: ['vertical', 'devtools', 'ai', 'security', 'work'] },
    fintech: { label: 'financial services', sectors: ['fintech', 'insurance'] },
    health: { label: 'healthcare', sectors: ['health'] },
    climate: { label: 'industrial and climate tech', sectors: ['climate', 'hardware', 'logistics'] },
    consumer: { label: 'consumer', sectors: ['marketplace', 'consumer', 'edtech'] }
  };

  var SECTORS = {
    fintech: { label: 'Fintech', lines: [
      ['Corporate cards and spend controls for {c}.', ['restaurant groups', 'construction subcontractors', 'independent pharmacies', 'trucking fleets']],
      ['Payroll and benefits software built for {c}.', ['dental practices', 'nonprofits', 'franchise owners', 'staffing agencies']],
      ['Invoice financing for {c}, repaid when their customers pay.', ['food distributors', 'freight brokers', 'small manufacturers']],
      ['Accounting automation that closes the books for {c} in days instead of weeks.', ['multi-location retailers', 'property managers', 'ecommerce brands']]] },
    insurance: { label: 'Insurance', lines: [
      ['Insurance for {c}, sold inside the apps they already use.', ['gig workers', 'small landlords', 'e-bike owners', 'freelance designers']],
      ['Claims automation for {c}.', ['regional insurers', 'auto body shops', 'pet insurers']]] },
    vertical: { label: 'Vertical software', lines: [
      ['Scheduling, dispatch, and billing for {c}.', ['HVAC contractors', 'home care agencies', 'landscaping companies', 'plumbing companies']],
      ['An operating system for {c}, replacing spreadsheets and paper forms.', ['veterinary clinics', 'auto repair shops', 'craft breweries', 'funeral homes']],
      ['Inventory and ordering software for {c}.', ['independent grocers', 'restaurant groups', 'hospital pharmacies']]] },
    devtools: { label: 'Developer tools', lines: [
      ['Test infrastructure that cuts build times in half for {c}.', ['mobile teams', 'game studios', 'mid-size SaaS companies']],
      ['Observability for {c} running AI features in production.', ['platform engineering teams', 'consumer app companies', 'fintech engineering teams']],
      ['Database tooling that lets {c} ship schema changes without downtime.', ['data teams', 'ecommerce engineering teams', 'B2B SaaS companies']]] },
    ai: { label: 'AI infrastructure', lines: [
      ['Model evaluation and monitoring for {c}.', ['enterprise AI teams', 'healthcare AI companies', 'banks deploying chat assistants']],
      ['A cheaper inference layer for {c} serving open models.', ['consumer apps', 'robotics companies', 'AI startups']],
      ['Data labeling with AI agents and human review for {c}.', ['autonomous vehicle teams', 'medical imaging companies', 'legal AI companies']]] },
    security: { label: 'Cybersecurity', lines: [
      ['Identity security for {c}.', ['mid-market companies', 'hospitals', 'school districts']],
      ['Automated compliance evidence for {c} going through SOC 2 and ISO audits.', ['early-stage SaaS companies', 'fintech companies', 'health tech companies']],
      ['Phishing and email defense built for {c}.', ['law firms', 'accounting firms', 'local governments']]] },
    work: { label: 'Work software', lines: [
      ['Hiring software for {c}.', ['hourly retail chains', 'hospital systems', 'warehouse operators']],
      ['An AI assistant that drafts {c}.', ['RFP responses for B2B sales teams', 'board materials for finance teams', 'contracts for in-house legal teams']]] },
    health: { label: 'Digital health', lines: [
      ['Virtual care for {c}, paid for by employers.', ['people with type 2 diabetes', 'people with chronic back pain', 'new parents']],
      ['Prior authorization automation for {c}.', ['orthopedic practices', 'oncology clinics', 'imaging centers']],
      ['Remote monitoring for {c} after hospital discharge.', ['heart failure patients', 'patients recovering from surgery', 'COPD patients']]] },
    climate: { label: 'Climate and energy', lines: [
      ['Software that turns {c} into flexible power for the grid.', ['home batteries', 'commercial EV chargers', 'water heaters']],
      ['Carbon accounting for {c} with audited supplier data.', ['mid-size manufacturers', 'food brands', 'apparel companies']],
      ['Financing and installation of heat pumps for {c}.', ['apartment buildings', 'schools', 'small offices']]] },
    hardware: { label: 'Robotics and hardware', lines: [
      ['Autonomous robots for {c}.', ['commercial kitchens', 'solar farms', 'hospital supply rooms']],
      ['Low-cost sensors that monitor {c}.', ['water utilities', 'cold storage warehouses', 'bridges and tunnels']]] },
    logistics: { label: 'Logistics', lines: [
      ['Freight booking and tracking for {c}.', ['regional shippers', 'produce growers', 'furniture makers']],
      ['Returns processing for {c}.', ['online apparel brands', 'electronics retailers']],
      ['Warehouse robots leased by the hour to {c}.', ['third-party warehouses', 'grocery distributors']]] },
    marketplace: { label: 'Marketplace', lines: [
      ['A marketplace connecting {c} with vetted local providers.', ['busy parents', 'pet owners', 'older adults living alone']],
      ['A resale marketplace for {c}.', ['used outdoor gear', 'vintage furniture', 'kids\' clothing']]] },
    consumer: { label: 'Consumer subscription', lines: [
      ['A subscription app that helps {c} stick to a routine.', ['new runners', 'people managing insomnia', 'beginner lifters']],
      ['Personal finance coaching for {c}.', ['first-time investors', 'recent graduates', 'gig workers']],
      ['Language practice with AI tutors for {c}.', ['adults learning Spanish', 'nurses learning English', 'kids learning Mandarin']]] },
    edtech: { label: 'Education', lines: [
      ['Tutoring software sold to {c}.', ['public school districts', 'charter school networks']],
      ['Skills training for {c}, paid for by employers.', ['hospital nursing staff', 'warehouse workers', 'utility line workers']]] }
  };

  var PLACES = {
    na: ['San Francisco', 'New York', 'Austin', 'Boston', 'Chicago', 'Seattle', 'Denver', 'Atlanta', 'Toronto', 'Los Angeles', 'Miami', 'Pittsburgh'],
    eu: ['London', 'Berlin', 'Paris', 'Stockholm', 'Amsterdam', 'Lisbon', 'Madrid', 'Copenhagen'],
    row: ['Bangalore', 'Singapore', 'Lagos', 'Sao Paulo', 'Mexico City', 'Sydney', 'Tel Aviv', 'Nairobi', 'Jakarta']
  };
  var GEO = { na: 'the US and Canada', eu: 'Europe', global: 'anywhere' };

  var NAME_A = ['Tide', 'Corv', 'Nim', 'Lum', 'Ark', 'Vel', 'Sol', 'Bram', 'Cind', 'Dov', 'Esk', 'Fen', 'Gal', 'Hal', 'Kest', 'Lark', 'Mar', 'Nov', 'Orr', 'Pell',
    'Quin', 'Ros', 'Sabl', 'Tav', 'Ver', 'Wren', 'Yar', 'Zeph', 'Alder', 'Birch', 'Cobal', 'Dun', 'Ember', 'Flint', 'Grov', 'Harb', 'Ir', 'Jas', 'Kel', 'Mos'];
  var NAME_B = ['ly', 'io', 'a', 'en', 'ix', 'or', 'well', 'line', 'stack', 'path', 'forge', 'loop', 'base', 'yard', 'mint', 'grid', 'field', 'works', 'ra', 'ova', 'et', 'um'];
  var NAME_TAIL = { health: ' Health', climate: ' Energy', fintech: ' Pay', ai: ' AI', hardware: ' Robotics', insurance: ' Cover', edtech: ' Learn', security: ' Security' };

  var TEAM = [
    ['First-time founders with no background in this industry. The CEO plans to go full time once the round closes.',
     'Two recent graduates building their first company. Neither has sold to this kind of customer before.',
     'A solo founder who has not yet found a cofounder. Strong on product, no experience selling.'],
    ['First-time founders. The CEO spent two years in the industry in a junior sales role.',
     'A technical founder and a designer who met at a hackathon four months ago.',
     'Founders with consulting backgrounds who studied this market for a year before starting.'],
    ['A technical founder with six years at a larger company in this space, plus a commercial cofounder who joined last quarter.',
     'Founders who previously built a small business in this industry and sold it to a local competitor.',
     'An engineer from a well-known tech company and an industry operator with eight years of experience.'],
    ['Founders who worked together for five years at a category leader in this market.',
     'A CEO who ran a business unit selling to these exact customers, with a technical cofounder who led a team of 20 engineers.',
     'Three cofounders with complementary skills who have shipped and sold a product together before.'],
    ['A repeat founder whose last company was acquired, paired with a cofounder who led product at a market leader.',
     'A founder who built the leading product in an adjacent market and recruited the best engineer from that team.',
     'Repeat founders who built and sold a company to these same customers. Early hires followed them from that company.']
  ];
  var PRODUCT = [
    ['Pilot users log in about once a month. Two of five pilots did not renew.', 'Customers describe the product as interesting but have not changed how they work.'],
    ['Customers like the product but call it a nice extra. Usage drops after the first month.', 'Early users are friendly but most were found through the founders\' personal networks.'],
    ['Weekly usage is steady among early customers. Several asked for features before they would renew.', 'Customers use it for one important workflow and are asking for a second.'],
    ['Customers use it daily, and two expanded to more teams without being asked.', 'Most new customers come from referrals by existing ones.'],
    ['Customers say they could not run their work without it. Almost none have left.', 'Users pull the product into new departments themselves, and support tickets are mostly feature requests.']
  ];
  var MARKET = [
    'A niche market with few buyers and slow budget growth.',
    'A real but crowded market where buyers already have a default vendor.',
    'A large market growing at a steady pace.',
    'A large market where spending is shifting quickly toward new tools.',
    'A very large market being reshaped by a recent change in technology or regulation.'
  ];
  var MOAT = [
    'Many direct competitors offer the same features at a lower price.',
    'Three well funded competitors. The main difference today is design.',
    'Some proprietary workflow data, but a competitor could copy the product within a year.',
    'Integrations and years of customer data make switching costly.',
    'Network effects or exclusive data that get stronger with every new customer.'
  ];
  var RISKS = [
    function (r) { return 'The largest customer accounts for ' + (40 + Math.floor(r() * 26)) + '% of revenue.'; },
    function () { return 'The product depends on one platform\'s API, and that platform launched a competing feature last quarter.'; },
    function () { return 'The core product needs regulatory approval, expected in about 12 months.'; },
    function () { return 'The CEO is also running a second company.'; },
    function (r) { return 'Only ' + (5 + Math.floor(r() * 5)) + ' months of runway left at the current burn.'; },
    function () { return 'A former cofounder who left the company still owns 30% of the equity.'; },
    function () { return 'A patent dispute with a larger competitor is ongoing.'; },
    function () { return 'Gross margins are under 30% because of model and compute costs.'; }
  ];
  var REFS = [
    'Former colleagues raised concerns about follow-through. Two references would not work with the CEO again.',
    'References describe the CEO as smart but slow to hire and reluctant to delegate.',
    'References are positive but generic. Nobody had worked closely with the founders on a hard problem.',
    'Former managers rank the CEO in the top 10% of people they have worked with.',
    'Every reference, including two the founders did not suggest, called the CEO the best operator they know.'
  ];
  var CALLS = [
    'Customer calls were lukewarm. Two of five are evaluating alternatives.',
    'Customers like it, but only one of five said they would be very disappointed to lose it.',
    'Customers are satisfied and plan to renew, with some complaints about reliability.',
    'Four of five customers said they would be very disappointed to lose the product.',
    'Every customer we called has already expanded their contract or plans to this year.'
  ];

  // ---------- Thesis ----------
  function makeThesis(r, track) {
    if (track === 'partner') return { groups: null, geo: 'global', text: 'Generalist. Any sector, any region.' };
    var keys = Object.keys(GROUPS);
    var count = r() < .3 ? 1 : r() < .7 ? 2 : 3;
    var groups = shuffle(r, keys).slice(0, count);
    var geo = pick(r, ['na', 'na', 'eu', 'global']);
    var names = groups.map(function (g) { return GROUPS[g].label; });
    var list = names.length === 1 ? names[0] : names.slice(0, -1).join(', ') + (names.length > 2 ? ', and ' : ' and ') + names[names.length - 1];
    var text = list.charAt(0).toUpperCase() + list.slice(1) + ' companies based ' + (geo === 'global' ? 'anywhere' : 'in ' + GEO[geo]) + '.';
    return { groups: groups, geo: geo, text: text };
  }
  function sectorsOf(groups) {
    return groups.reduce(function (acc, g) { return acc.concat(GROUPS[g].sectors); }, []);
  }
  function groupOf(sector) {
    for (var g in GROUPS) if (GROUPS[g].sectors.indexOf(sector) > -1) return g;
    return null;
  }

  function testMeta(track, n) {
    var T = TRACKS[track];
    var size = fundSize(n);
    var r = makeRng('meta:' + track + ':' + n);
    // Fees and expenses take a smaller share of bigger funds.
    var investable = size * (size < 100e6 ? 0.8 : size < 600e6 ? 0.84 : 0.87);
    var reserve = 0.4;
    var slots = track === 'partner' ? 10 + Math.floor((n - 1) / 10) * 2 : 10;
    var follow = Math.round(slots * 0.6);
    return {
      track: track, n: n, trackName: T.name,
      fundName: 'VentureSim Capital Fund ' + n,
      fundSize: size, investable: investable, fees: size - investable,
      stages: stagesFor(size),
      thesis: makeThesis(r, track),
      slots: slots,                                       // advances or initial investments allowed
      check: investable * (1 - reserve) / slots,
      followSlots: follow,
      followCheck: investable * reserve / follow,
      reserve: reserve,
      credits: T.credits,
      carry: 0.2, carryHigh: 0.25, hurdle: 1.47,
      months: 36
    };
  }

  // ---------- Companies ----------
  function makeCompany(r, meta, i, used) {
    var T = TRACKS[meta.track];
    var stageKey = r() < .7 ? meta.stages[0] : meta.stages[1];
    var S = STAGES[stageKey];

    // Thesis: decide fit first, then draw sector and place to match.
    var fits = r() >= T.outOfThesis;
    var allSectors = Object.keys(SECTORS);
    var thesisSectors = meta.thesis.groups ? sectorsOf(meta.thesis.groups) : allSectors;
    var sector, region, miss = null;
    if (fits) {
      sector = pick(r, thesisSectors);
      region = meta.thesis.geo === 'global' ? pick(r, ['na', 'na', 'eu', 'row']) : meta.thesis.geo;
    } else if (r() < .55 && thesisSectors.length < allSectors.length) {
      var others = allSectors.filter(function (s) { return thesisSectors.indexOf(s) === -1; });
      sector = pick(r, others);
      region = meta.thesis.geo === 'global' ? pick(r, ['na', 'eu', 'row']) : meta.thesis.geo;
      miss = 'Sector is outside the thesis.';
    } else {
      sector = pick(r, thesisSectors);
      region = meta.thesis.geo === 'na' ? pick(r, ['eu', 'row']) : meta.thesis.geo === 'eu' ? pick(r, ['na', 'row']) : 'row';
      miss = meta.thesis.geo === 'global' ? null : 'Location is outside the thesis.';
    }
    var inThesis = !miss;

    var SEC = SECTORS[sector];
    var line = pick(r, SEC.lines);
    var pitch = line[0].replace('{c}', pick(r, line[1]));

    var name;
    for (var tries = 0; tries < 20; tries++) {
      name = pick(r, NAME_A) + pick(r, NAME_B);
      if (NAME_TAIL[sector] && r() < .3) name += NAME_TAIL[sector];
      if (!used[name]) break;
    }
    used[name] = true;

    // Hidden fundamentals, 0..1. Risk is bad when high.
    var f = { team: bell(r), market: bell(r), product: bell(r), traction: bell(r), moat: bell(r), risk: bell(r) };
    f.product = clamp(f.product * .75 + f.team * .25 + (r() - .5) * .1, 0, 1);
    f.traction = clamp(f.traction * .7 + f.product * .3, 0, 1);
    var q = 0;
    FACTORS.forEach(function (k) { q += S.w[k] * (k === 'risk' ? 1 - f.risk : f[k]); });

    // Good companies cost more. Price above 1 means expensive.
    var price = Math.exp(.25 * normal(r) + .9 * (q - .5));

    // What the user can see: each factor plus noise.
    var noise = function (x, sd) { return clamp(x + normal(r) * sd, 0, 1); };
    var s = {};
    FACTORS.forEach(function (k) { s[k] = noise(f[k], .12); });

    var ownership = clamp(S.own / price, .015, .3);
    var post = meta.check / ownership;
    var round = post * clamp(.14 + r() * .1, .1, .3);
    var traction = tractionRows(r, stageKey, s.traction, s.product, post, price);

    var c = {
      i: i, name: name, sector: sector, sectorLabel: SEC.label, stage: stageKey, stageLabel: S.label,
      location: pick(r, PLACES[region]), region: region,
      pitch: pitch, inThesis: inThesis, miss: miss,
      team: { text: TEAM[tier(s.team, 5)][Math.floor(r() * 3)], fullTime: 2 + Math.round(s.team * 4 + r() * 2) },
      market: { text: MARKET[tier(s.market, 5)], tam: niceRound(Math.pow(10, 8.3 + 2.4 * s.market)), growth: Math.round(3 + 30 * s.market) },
      product: { text: PRODUCT[tier(s.product, 5)][Math.floor(r() * 2)] },
      traction: traction.rows,
      moat: { text: MOAT[tier(s.moat, 5)], competitors: Math.max(1, Math.round(12 - 10 * s.moat + r() * 2)) },
      risks: pickRisks(r, s.risk),
      terms: { round: round, post: post, check: meta.check, ownership: ownership, arrMultiple: traction.arr ? post / traction.arr : null },
      dig: { refs: REFS[tier(noise(f.team, .04), 5)], calls: CALLS[tier(noise(f.product, .04), 5)] }
    };
    c.notes = diligenceNotes(r, c, s, price, traction.arr);

    // Outcome. Luck is drawn separately from quality.
    var pSuccess = sigmoid(S.base + (q - .5) * 9);
    var success = r() < pSuccess;
    var z = normal(r);
    var qs = clamp((q - .2) / .6, .1, 1.3);
    var A = 1 + (S.upside - 1) * qs;
    var m = success ? Math.max(1, A * Math.exp(S.sigma * z - .3)) / price
      : (r() < S.fail[0] ? 0 : S.fail[1] + r() * (S.fail[2] - S.fail[1])) / Math.max(price, .8);
    var failMean = (1 - S.fail[0]) * (S.fail[1] + S.fail[2]) / 2;
    var ev = (pSuccess * A * Math.exp(S.sigma * S.sigma / 2 - .3) + (1 - pSuccess) * failMean) / price;
    var year = success ? 4 + Math.floor(r() * 7) : 2 + Math.floor(r() * 5);
    var exitValue = post * Math.max(m, 0.01) / S.keep;

    // Portfolio update used by partner follow-on decisions.
    var momentum = success ? .45 + .35 * z + normal(r) * .35 : -.8 + normal(r) * .45;
    var stepUp = 1 + clamp(.4 + 1.1 * momentum, 0, 3) * S.stepK;
    var update = makeUpdate(r, momentum, stepUp);
    var followMultiple = success ? Math.max(.5, m / stepUp) : m * .8;

    c.hidden = {
      f: f, q: q, price: price, ev: ev, pSuccess: pSuccess, success: success, multiple: m, year: year,
      exitValue: exitValue, outcome: outcomeText(m, year, exitValue, success),
      mattered: whatMattered(f, S, price, q, success, m),
      signals: s, update: update, followMultiple: followMultiple
    };
    return c;
  }

  function tractionRows(r, stage, st, sp, post, price) {
    var rows = [], arr = null;
    if (stage === 'preseed') {
      rows.push(['Paying customers', st > .65 ? String(1 + Math.round(st * 6)) : 'None yet']);
      rows.push(['Pilots running', String(1 + Math.round(st * 7))]);
      rows.push(['Letters of intent', String(Math.round(st * 9))]);
      return { rows: rows, arr: null };
    }
    if (stage === 'seed') {
      arr = st < .15 ? 0 : niceRound(Math.pow(10, 4.4 + 1.7 * st));
      rows.push(['Annual recurring revenue', arr ? money(arr) : 'Pre-revenue']);
      rows.push(['Monthly growth', arr ? Math.round(3 + 22 * st) + '%' : 'n/a']);
      rows.push(['Customers', String(Math.max(0, Math.round(Math.pow(10, .3 + 1.6 * st))))]);
      return { rows: rows, arr: arr || null };
    }
    var cfg = { a: [5.9, .9, 1.3, 2.7], b: [6.7, .85, 1.2, 1.8], growth: [7.5, .8, 1.15, 1] }[stage];
    arr = niceRound(Math.pow(10, cfg[0] + cfg[1] * st));
    rows.push(['Annual recurring revenue', money(arr)]);
    rows.push(['Growth, last 12 months', (cfg[2] + cfg[3] * st).toFixed(1) + 'x']);
    rows.push(['Net revenue retention', Math.round(82 + 55 * sp) + '%']);
    if (stage !== 'a') rows.push(['Burn multiple', (4 - 3.2 * st + r() * .3).toFixed(1) + 'x']);
    rows.push(['Gross margin', Math.round(42 + 38 * (sp * .5 + st * .5)) + '%']);
    return { rows: rows, arr: arr };
  }

  function pickRisks(r, sr) {
    var count = sr > .72 ? 2 : sr > .52 ? 1 : 0;
    var idx = shuffle(r, RISKS.map(function (_, k) { return k; })).slice(0, count);
    return idx.map(function (k) { return RISKS[k](r); });
  }

  function diligenceNotes(r, c, s, price, arr) {
    var notes = [];
    var ranked = ['team', 'market', 'product', 'moat'].sort(function (a, b) { return s[b] - s[a]; });
    var best = ranked[0], worst = ranked[ranked.length - 1];
    var good = {
      team: 'The team is the strongest part of this deal.',
      market: 'The market is larger and growing faster than most we see.',
      product: 'Customer love is real. Usage data backs up what customers say.',
      moat: 'Hard to copy. Competitors would need years of data to catch up.'
    };
    var bad = {
      team: 'The team has gaps for this stage. Hiring will matter.',
      market: 'We are not sure the market is big enough for a venture outcome.',
      product: 'We could not find strong evidence that customers need this.',
      moat: 'Competition is heavy and differentiation is thin.'
    };
    if (s[best] > .6) notes.push(good[best]);
    if (s[worst] < .4) notes.push(bad[worst]);
    if (arr) {
      var mlt = c.terms.post / arr;
      var view = price > 1.25 ? 'above' : price < .8 ? 'below' : 'in line with';
      notes.push('Priced at ' + Math.round(mlt) + 'x ARR, ' + view + ' similar ' + c.stageLabel + ' rounds this year.');
    } else {
      var v = price > 1.25 ? 'rich for a company this early' : price < .8 ? 'cheap for the stage' : 'about market for the stage';
      notes.push('The valuation looks ' + v + '.');
    }
    return notes;
  }

  function makeUpdate(r, momentum, stepUp) {
    var growth = clamp(Math.exp(.9 * momentum), .5, 9);
    var good = ['Hired a VP of Sales from a public company.', 'Signed the largest customer in the category.', 'Gross margin up 12 points after a pricing change.', 'Two competitors shut down this year.'];
    var bad = ['Lost two of the top five customers.', 'The CTO left the company.', 'Missed the revenue plan by 40%.', 'Burn doubled while growth slowed.'];
    var round = stepUp >= 2.2 ? 'New round led by an outside investor at ' + stepUp.toFixed(1) + 'x your entry price.'
      : stepUp >= 1.4 ? 'Raising at ' + stepUp.toFixed(1) + 'x your entry price, mostly from existing investors.'
      : 'Raising a flat bridge round from existing investors.';
    return {
      revenue: growth >= 1 ? 'Revenue is up ' + growth.toFixed(1) + 'x since your investment.' : 'Revenue is down ' + Math.round((1 - growth) * 100) + '% since your investment.',
      news: momentum > .2 ? pick(r, good) : momentum < -.3 ? pick(r, bad) : pick(r, ['Steady quarter. No major changes.', 'Shipped the product the last round was raised for, a quarter late.']),
      round: round
    };
  }

  function outcomeText(m, year, exitValue, success) {
    var y = 2026 + year;
    if (m === 0) return 'Shut down in ' + y + '. The investment was lost.';
    if (m < .5) return 'Sold for parts in ' + y + '. Investors got back ' + mult(m) + '.';
    if (m < 1) return 'Acquired in ' + y + ' for less than investors put in. ' + mult(m) + ' on the check.';
    if (m >= 10 && exitValue >= 1e9) return 'Went public in ' + y + ' at ' + money(exitValue) + '. ' + mult(m) + ' on the check.';
    return 'Acquired in ' + y + ' for ' + money(exitValue) + '. ' + mult(m) + ' on the check.';
  }

  var MATTER = {
    team: ['The founding team was strong.', 'The team was the weak point.'],
    market: ['The market was big enough for a large outcome.', 'The market was too small for a venture outcome.'],
    product: ['Customers truly needed the product.', 'Customers never needed it badly enough.'],
    traction: ['The traction numbers were real.', 'Traction was weaker than it looked.'],
    moat: ['It was hard to copy.', 'Competitors could copy it quickly.'],
    risk: ['There were few ways for it to go wrong.', 'The risks in the memo were serious.']
  };
  function whatMattered(f, S, price, q, success, m) {
    var contrib = FACTORS.map(function (k) {
      var v = k === 'risk' ? (1 - f.risk) - .5 : f[k] - .5;
      return { k: k, v: S.w[k] * v };
    }).sort(function (a, b) { return Math.abs(b.v) - Math.abs(a.v); });
    var out = contrib.slice(0, 2).map(function (c) { return { factor: c.k, text: MATTER[c.k][c.v >= 0 ? 0 : 1] }; });
    if (price > 1.3 && m < 3) out.push({ factor: 'price', text: 'The high entry price cut the return.' });
    if (price < .8 && m >= 1) out.push({ factor: 'price', text: 'A low entry price made the return bigger.' });
    if (success && q < .45) out.push({ factor: 'luck', text: 'The fundamentals were weak. This one got lucky.' });
    if (!success && q > .58) out.push({ factor: 'luck', text: 'The fundamentals were strong and it still failed. Investing in it was a reasonable call.' });
    return out;
  }

  function generateTest(track, n) {
    var meta = testMeta(track, n);
    var r = makeRng('test:' + track + ':' + n);
    var used = {};
    var companies = [];
    for (var i = 0; i < COMPANIES_PER_TEST; i++) companies.push(makeCompany(r, meta, i, used));
    var months = companies.map(function () { return 1 + Math.floor(r() * 36); }).sort(function (a, b) { return a - b; });
    companies.forEach(function (c, k) { c.month = months[k]; });
    return { meta: meta, companies: companies };
  }

  // A short sample: six companies, analyst rules, feedback after each call.
  function generateExample() {
    var meta = testMeta('analyst', 3);
    meta.slots = 2; meta.credits = 2; meta.fundName = 'Example fund';
    var r = makeRng('example:v18');
    var used = {}, companies = [];
    for (var i = 0; i < 6; i++) companies.push(makeCompany(r, meta, i, used));
    companies.forEach(function (c, k) { c.month = 1 + k * 5; });
    return { meta: meta, companies: companies, example: true };
  }

  // ---------- Scoring ----------
  function percentileAgainstRandom(values, chosen, k, sims, seed) {
    if (!k) return 0;
    var r = makeRng(seed), better = 0;
    var target = chosen;
    for (var t = 0; t < sims; t++) {
      var idx = shuffle(r, values.map(function (_, i) { return i; })).slice(0, k);
      var avg = idx.reduce(function (s, i) { return s + values[i]; }, 0) / k;
      if (target > avg) better++; else if (target === avg) better += .5;
    }
    return Math.round(better / sims * 100);
  }

  function emphasis(companies, picked) {
    // How differently the user's picks looked on each visible signal.
    var out = {};
    FACTORS.forEach(function (k) {
      var a = 0, na = 0, b = 0, nb = 0;
      companies.forEach(function (c) {
        if (!c.inThesis) return;
        var v = c.hidden.signals[k];
        if (k === 'risk') v = 1 - v;
        if (picked[c.i]) { a += v; na++; } else { b += v; nb++; }
      });
      out[k] = na && nb ? a / na - b / nb : 0;
    });
    return out;
  }

  function scoreTest(test, state) {
    var meta = test.meta, cs = test.companies;
    var decisions = state.decisions || {};
    var picked = {};
    cs.forEach(function (c) { if (decisions[c.i] && decisions[c.i].yes) picked[c.i] = true; });
    var picks = cs.filter(function (c) { return picked[c.i]; });
    var valid = picks.filter(function (c) { return c.inThesis; });
    var thesisErrors = picks.length - valid.length;

    var evs = cs.map(function (c) { return c.inThesis ? c.hidden.ev : 0; });
    var userAvgEv = picks.length ? picks.reduce(function (s, c) { return s + (c.inThesis ? c.hidden.ev : 0); }, 0) / picks.length : 0;
    var judgment = percentileAgainstRandom(evs, userAvgEv, picks.length, 2000, 'judge:' + meta.track + meta.n);

    var winners = cs.filter(function (c) { return c.inThesis && c.hidden.multiple >= 3; });
    var caught = winners.filter(function (c) { return picked[c.i]; });
    var portfolioMultiple = valid.length ? valid.reduce(function (s, c) { return s + c.hidden.multiple; }, 0) / valid.length : 0;

    var stageW = STAGES[meta.stages[0]].w;
    var emph = emphasis(cs, picked);
    var res = {
      track: meta.track, n: meta.n, picks: picks.length, thesisErrors: thesisErrors,
      judgment: judgment, portfolioMultiple: portfolioMultiple,
      winners: winners.length, caught: caught.length,
      emphasis: emph, weights: stageW,
      dug: Object.keys(state.dug || {}).filter(function (k) { return state.dug[k]; }).length
    };

    if (meta.track === 'associate') {
      var byConv = { 1: [], 2: [], 3: [] };
      valid.forEach(function (c) { var cv = decisions[c.i].conviction || 2; byConv[cv].push(c.hidden.multiple); });
      res.conviction = {};
      [1, 2, 3].forEach(function (k) {
        var a = byConv[k];
        res.conviction[k] = a.length ? { count: a.length, multiple: a.reduce(function (s, x) { return s + x; }, 0) / a.length } : null;
      });
      res.avgPricePicked = valid.length ? valid.reduce(function (s, c) { return s + c.hidden.price; }, 0) / valid.length : 0;
    }

    if (meta.track === 'partner') {
      var f = state.followOns || {};
      var follows = picks.filter(function (c) { return f[c.i] === true; });
      var offered = picks.filter(function (c) { return f[c.i] === true || f[c.i] === false; });
      var deployed = picks.length * meta.check + follows.length * meta.followCheck;
      var proceeds = picks.reduce(function (s, c) { return s + meta.check * c.hidden.multiple; }, 0) +
                     follows.reduce(function (s, c) { return s + meta.followCheck * c.hidden.followMultiple; }, 0);
      var undeployed = Math.max(0, meta.investable - deployed);
      var fund = fundMath(meta, proceeds, deployed, undeployed);
      res.fund = fund;
      res.follows = follows.length;
      res.followMultiple = follows.length ? follows.reduce(function (s, c) { return s + c.hidden.followMultiple; }, 0) / follows.length : 0;
      res.offeredFollowMultiple = offered.length ? offered.reduce(function (s, c) { return s + c.hidden.followMultiple; }, 0) / offered.length : 0;
      res.fundPercentile = randomFunds(test, fund.netTvpi);
      res.by24 = picks.filter(function (c) { return c.month <= 24; }).length;
    }

    res.lessons = lessons(res, meta);
    return res;
  }

  function fundMath(meta, proceeds, deployed, undeployed) {
    var distributions = proceeds + undeployed;
    var profit = distributions - meta.fundSize;
    var carryRate = distributions > meta.fundSize * 3 ? meta.carryHigh : meta.carry;
    var carry = distributions > meta.fundSize * meta.hurdle ? carryRate * profit : 0;
    return {
      deployed: deployed, undeployed: undeployed, proceeds: proceeds,
      grossMoic: deployed ? proceeds / deployed : 0,
      carry: carry,
      netTvpi: (distributions - carry) / meta.fundSize
    };
  }

  function randomFunds(test, userNet) {
    var meta = test.meta, cs = test.companies, r = makeRng('funds:' + meta.n), better = 0, sims = 1000;
    for (var t = 0; t < sims; t++) {
      var picks = shuffle(r, cs).slice(0, meta.slots);
      var follows = shuffle(r, picks).slice(0, meta.followSlots);
      var proceeds = picks.reduce(function (s, c) { return s + meta.check * c.hidden.multiple; }, 0) +
                     follows.reduce(function (s, c) { return s + meta.followCheck * c.hidden.followMultiple; }, 0);
      var deployed = picks.length * meta.check + follows.length * meta.followCheck;
      var net = fundMath(meta, proceeds, deployed, Math.max(0, meta.investable - deployed)).netTvpi;
      if (userNet > net) better++; else if (userNet === net) better += .5;
    }
    return Math.round(better / sims * 100);
  }

  var MODULE_FOR = { team: 3, product: 4, traction: 5, market: 6, moat: 7, price: 8, risk: 9 };

  function lessons(res, meta) {
    var out = [];
    if (res.thesisErrors > 0) {
      out.push({ module: 2, text: 'You picked ' + res.thesisErrors + ' compan' + (res.thesisErrors === 1 ? 'y' : 'ies') + ' outside the fund\'s thesis. Those never reach a partner meeting, so each one wasted a slot. Check sector and location before reading the rest of the memo.' });
    }
    var w = res.weights, e = res.emphasis;
    var trueTop = FACTORS.slice().sort(function (a, b) { return w[b] - w[a]; })[0];
    var userTop = FACTORS.slice().sort(function (a, b) { return e[b] - e[a]; })[0];
    var userLow = FACTORS.slice().sort(function (a, b) { return e[a] - e[b]; })[0];
    if (userTop !== trueTop) {
      out.push({ module: MODULE_FOR[trueTop], text: 'Your picks leaned hardest on ' + FACTOR_LABEL[userTop].toLowerCase() + '. At the ' + STAGES[meta.stages[0]].label + ' stage, ' + FACTOR_LABEL[trueTop].toLowerCase() + ' predicts outcomes best.' });
    }
    if (w[userLow] >= .14 && userLow !== userTop && userLow !== trueTop) {
      out.push({ module: MODULE_FOR[userLow], text: 'Your picks were no better than the rest on ' + FACTOR_LABEL[userLow].toLowerCase() + ', even though it carries real weight at this stage.' });
    }
    if (res.avgPricePicked && res.avgPricePicked > 1.2) {
      out.push({ module: 8, text: 'You tended to pick expensive rounds. Paying up for quality is fine, but price came out of your returns.' });
    }
    if (res.conviction && res.conviction[3] && res.conviction[1] && res.conviction[3].multiple < res.conviction[1].multiple) {
      out.push({ module: 3, text: 'Your high-conviction picks did worse than your low-conviction ones. Write down what would change your mind before you rate conviction.' });
    }
    if (res.fund) {
      if (res.fund.undeployed > meta.investable * .1) out.push({ module: 10, text: 'You left ' + money(res.fund.undeployed) + ' uninvested. LPs still paid fees on it, which dragged net returns.' });
      if (res.follows && res.followMultiple <= res.offeredFollowMultiple) out.push({ module: 10, text: 'Your follow-on picks did no better than the average follow-on available. Portfolio updates carry information: back the companies whose numbers moved.' });
    }
    if (!out.length) out.push({ module: 11, text: 'Solid test. Look through the companies you let go that returned 3x or more, and ask what you would need to see to back them next time.' });
    return out.slice(0, 3);
  }

  return {
    TESTS_PER_TRACK: TESTS_PER_TRACK, COMPANIES_PER_TEST: COMPANIES_PER_TEST,
    TRACKS: TRACKS, STAGES: STAGES, FACTORS: FACTORS, FACTOR_LABEL: FACTOR_LABEL,
    fundSize: fundSize, stagesFor: stagesFor, testMeta: testMeta,
    generateTest: generateTest, generateExample: generateExample, scoreTest: scoreTest,
    money: money, mult: mult, pct: pct
  };
});
