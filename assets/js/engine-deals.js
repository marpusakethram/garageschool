// GarageSchool deal materials: company details, a demo day pitch deck, a demo day transcript, and
// scenario-based due diligence questions. Uses its own random seed per company, so it never changes
// which companies appear in a test or how they turn out.
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory;
  else factory(root.GarageEngine);
})(typeof self !== 'undefined' ? self : this, function (E) {
  'use strict';
  var I = E._internal, money = I.money, pct = I.pct, niceRound = I.niceRound;

  // ---------- Sector stories: what founders say about the problem and the business ----------
  var STORY = {
    fintech: { problem: '{C} lose hours every week to manual financial work, and mistakes cost real money.', why: 'Banks now open their systems through APIs, and AI can read invoices and statements reliably.', model: 'Software subscription plus a share of payment volume', price: [3000, 30000], unit: 'per customer per year' },
    insurance: { problem: '{C} are poorly served by insurance built decades ago, and buying a policy still takes days.', why: 'Insurers want new ways to reach customers, and AI can price risk and handle claims in minutes.', model: 'Commission on premiums, plus software fees', price: [200, 2000], unit: 'per policy per year' },
    vertical: { problem: '{C} run their business on spreadsheets, paper, and software built twenty years ago.', why: 'A new generation of owners expects modern software, and payments can now be built in.', model: 'Subscription per location, plus payments', price: [3000, 24000], unit: 'per location per year' },
    devtools: { problem: '{C} waste engineering hours on slow, fragile tooling that was not built for how they work today.', why: 'AI-written code means far more code to test, ship, and monitor.', model: 'Usage-based pricing with team plans', price: [10000, 120000], unit: 'per company per year' },
    ai: { problem: '{C} struggle to run AI reliably and affordably in production.', why: 'Open models are now good enough for many tasks, and costs matter as usage grows.', model: 'Usage-based pricing', price: [20000, 250000], unit: 'per customer per year' },
    aiapps: { problem: '{C} spend thousands of hours on repetitive work that follows clear rules.', why: 'AI models can now complete these tasks reliably, not just assist with them.', model: 'Priced per task completed', price: [10000, 150000], unit: 'per customer per year' },
    security: { problem: '{C} face more attacks every year with small security teams and too many alerts.', why: 'AI makes attacks cheaper to launch, and new rules make security a board-level issue.', model: 'Annual subscription', price: [15000, 150000], unit: 'per customer per year' },
    work: { problem: '{C} lose time to repetitive work that pulls people away from what matters.', why: 'AI can now draft, summarize, and coordinate work that used to need a person.', model: 'Per-seat subscription', price: [5000, 60000], unit: 'per team per year' },
    proptech: { problem: '{C} run properties and projects on spreadsheets, email, and paper.', why: 'Higher interest rates force owners and builders to run tighter operations.', model: 'Subscription per unit or project', price: [3000, 40000], unit: 'per customer per year' },
    health: { problem: '{C} get care that is slow, expensive, and hard to coordinate.', why: 'Payers now pay for outcomes, and remote care is covered by more plans.', model: 'Per member per month, paid by employers and health plans', price: [20000, 200000], unit: 'per customer per year' },
    climate: { problem: '{C} face rising energy costs and pressure to cut emissions, with few practical tools.', why: 'Clean technology costs have fallen, and new incentives pay for adoption.', model: 'Hardware or project sales plus software fees', price: [10000, 200000], unit: 'per site per year' },
    hardware: { problem: '{C} cannot hire enough people for repetitive, physical work.', why: 'Cheaper sensors and better AI make robots practical outside factories.', model: 'Robots as a monthly subscription', price: [20000, 120000], unit: 'per robot per year' },
    logistics: { problem: '{C} lose money to delays, errors, and poor visibility into shipments.', why: 'Shippers expect real-time tracking, and carriers now share data through APIs.', model: 'Transaction fees plus a software subscription', price: [5000, 80000], unit: 'per customer per year' },
    defense: { problem: '{C} need new capabilities faster and cheaper than traditional defense programs deliver.', why: 'Recent conflicts showed the value of cheap, numerous systems, and governments are buying from new companies.', model: 'Government contracts, from prototypes to production', price: [500000, 5000000], unit: 'per contract' },
    space: { problem: '{C} need data and services from space that used to cost far too much.', why: 'Launch costs have fallen sharply, making new satellites and services affordable.', model: 'Contracts and data subscriptions', price: [100000, 2000000], unit: 'per customer per year' },
    marketplace: { problem: '{C} struggle to find options they trust quickly, and good providers struggle to find them.', why: 'People now expect to book and pay for everything on their phones.', model: 'A commission on every transaction', price: [100, 1500], unit: 'in fees per customer per year' },
    consumer: { problem: '{C} want help, but existing apps feel generic and are easy to quit.', why: 'AI makes personal coaching affordable for the first time.', model: 'Monthly subscription', price: [60, 240], unit: 'per subscriber per year' },
    edtech: { problem: '{C} need skills faster than traditional programs can teach them.', why: 'Employers and schools now pay for results, and AI makes tutoring scale.', model: 'Annual contracts with schools or employers', price: [10000, 150000], unit: 'per customer per year' },
    gaming: { problem: '{C} want games built around playing together, and most games lose players within weeks.', why: 'New tools make it cheaper to build games and update them every week.', model: 'In-game purchases and subscriptions', price: [20, 120], unit: 'per paying player per year' }
  };
  var HARD = { hardware: 1, climate: 1, defense: 1, space: 1 };

  // ---------- Founders, consistent with the team text on the deal card ----------
  // TEAM_BIOS[tier][variant] lists [role, background] for each founder.
  var TEAM_BIOS = [
    [[['CEO', 'First-time founder, part time until this round closes'], ['CTO', 'Software engineer, first startup']],
     [['CEO', 'Recent graduate, first company'], ['CTO', 'Recent graduate, first company']],
     [['Founder and CEO', 'Product-focused engineer, first company, still looking for a cofounder']]],
    [[['CEO', 'Two years in a junior sales role in this industry'], ['CTO', 'Engineer, first startup']],
     [['CEO', 'Software engineer, met cofounder at a hackathon four months ago'], ['Head of design', 'Product designer']],
     [['CEO', 'Former management consultant who studied this market for a year'], ['COO', 'Former management consultant']]],
    [[['CEO', 'Six years as an engineer at a larger company in this space'], ['Head of sales', 'Commercial cofounder, joined last quarter']],
     [['CEO', 'Built a small business in this industry and sold it to a local competitor'], ['COO', 'Cofounded that same business']],
     [['CEO', 'Eight years as an operator in this industry'], ['CTO', 'Engineer at a well-known tech company']]],
    [[['CEO', 'Five years at the category leader in this market'], ['CTO', 'Five years at the same company, leading engineering']],
     [['CEO', 'Ran a business unit selling to these exact customers'], ['CTO', 'Led a team of 20 engineers']],
     [['CEO', 'Has shipped and sold a product with this team before'], ['CTO', 'Same team, leads engineering'], ['COO', 'Same team, leads operations']]],
    [[['CEO', 'Repeat founder, last company was acquired'], ['CPO', 'Led product at a market leader']],
     [['CEO', 'Built the leading product in an adjacent market'], ['CTO', 'Was the best engineer on that team']],
     [['CEO', 'Repeat founder who sold a company to these same customers'], ['CTO', 'Cofounded that company too']]]
  ];
  var TEAM_BIOS_LATE = [
    [['CEO', 'Founding CEO, leading a company this size for the first time'], ['CTO', 'Cofounder, leads engineering']],
    [['CEO', 'Founding CEO, strongest on product'], ['CTO', 'Cofounder, leads engineering']],
    [['CEO', 'Founding CEO'], ['COO', 'Joined from a larger company in this market']],
    [['CEO', 'Founding CEO who has scaled the company steadily'], ['CFO', 'Has scaled a company of this size before']],
    [['CEO', 'Founding CEO, widely seen as one of the best in the market'], ['President', 'Has taken a company public before']]
  ];
  var FIRST = ['Priya', 'Daniel', 'Amara', 'Lucas', 'Mei', 'Omar', 'Sofia', 'Kwame', 'Elena', 'Ravi', 'Hannah', 'Tomas', 'Aisha', 'Jonas', 'Leila', 'Mateo', 'Grace', 'Kenji', 'Nadia', 'Samuel',
    'Ines', 'Arjun', 'Chloe', 'Felix', 'Zainab', 'Marcus', 'Yuki', 'Rosa', 'Ethan', 'Fatima', 'Diego', 'Anya', 'Kofi', 'Lena', 'Rahul', 'Maya', 'Viktor', 'Noor', 'Isaac', 'Camila'];
  var LAST = ['Shah', 'Okafor', 'Lindqvist', 'Moreno', 'Chen', 'Haddad', 'Novak', 'Mensah', 'Rossi', 'Iyer', 'Becker', 'Silva', 'Abdi', 'Larsen', 'Kaur', 'Fischer', 'Tanaka', 'Mendes', 'Osei', 'Park',
    'Duarte', 'Nair', 'Dubois', 'Kowalski', 'Adeyemi', 'Reyes', 'Sato', 'Varga', 'Bauer', 'Hassan'];

  function rngFor(c, meta, salt) { return I.makeRng(salt + ':' + meta.track + ':' + meta.n + ':' + E.optsKey(meta) + ':' + c.i + ':' + c.name); }
  function pickR(r, a) { return a[Math.floor(r() * a.length)]; }
  function between(r, lo, hi) { return lo + (hi - lo) * r(); }
  function cap(s) { return s ? s.charAt(0).toUpperCase() + s.slice(1) : s; }
  function tierOf(table, text) {
    for (var t = 0; t < table.length; t++) { var v = table[t]; if (v === text || (v.indexOf && v.indexOf(text) > -1)) return t; }
    return 2;
  }
  function teamIndex(text) {
    for (var t = 0; t < I.TEAM.length; t++) { var k = I.TEAM[t].indexOf(text); if (k > -1) return [t, k]; k = I.TEAM_LATE[t].indexOf(text); if (k > -1) return [t, k, 1]; }
    return [2, 0];
  }
  function story(c) { return STORY[c.sector] || STORY.vertical; }
  function round2(x) { var m = Math.pow(10, Math.floor(Math.log10(x)) - 1); return Math.round(x / m) * m; }

  // ---------- Company details ----------
  function details(c, meta) {
    if (c._details) return c._details;
    var r = rngFor(c, meta, 'deal'), S = story(c), t = c.terms;
    var ti = teamIndex(c.team.text), bios = ti[2] ? TEAM_BIOS_LATE[ti[0]] : TEAM_BIOS[ti[0]][ti[1]], usedNames = {};
    var founders = bios.map(function (b) {
      var name;
      do { name = pickR(r, FIRST) + ' ' + pickR(r, LAST); } while (usedNames[name]);
      usedNames[name] = 1;
      return { name: name, role: b[0], bio: b[1] };
    });
    var yr = { preseed: [2025, 2026], seed: [2023, 2025], a: [2021, 2024], b: [2018, 2022], growth: [2014, 2019] }[c.stage];
    var founded = yr[0] + Math.floor(r() * (yr[1] - yr[0] + 1));
    var prior = {
      preseed: r() < .5 ? 'Nothing yet' : money(niceRound(t.round * between(r, .15, .3))) + ' from angels',
      seed: money(niceRound(t.round * between(r, .2, .35))) + ' pre-seed',
      a: money(niceRound(t.round * between(r, .25, .4))) + ' across pre-seed and seed',
      b: money(niceRound(t.round * between(r, .3, .5))) + ' through Series A',
      growth: money(niceRound(t.round * between(r, .4, .8))) + ' through Series B'
    }[c.stage];
    var price = round2(between(r, S.price[0], S.price[1]));
    var product = Math.round(between(r, 38, 55)), gtm = Math.round(between(r, 22, 38));
    var use = [[HARD[c.sector] ? 'Engineering and hardware' : 'Product and engineering', product], ['Sales and marketing', gtm], [HARD[c.sector] ? 'Manufacturing and testing' : 'Operations and hiring', 100 - product - gtm]];
    var milestone = {
      preseed: 'Turning pilots into paying customers and raising a seed round within 18 months',
      seed: 'Around $1M to $2M in annual revenue and a Series A within 24 months',
      a: 'A repeatable sales team and about three times the current revenue',
      b: 'Expansion into new customer segments and a path to profitability',
      growth: 'Profitability and readiness for an IPO or a large acquisition'
    }[c.stage];
    c._details = { founders: founders, founded: founded, prior: prior, model: S.model, price: price, priceText: money(price) + ' ' + S.unit, use: use, milestone: milestone };
    return c._details;
  }

  // ---------- Pitch deck (the founder's version) ----------
  var PRODUCT_SPIN_LATE = ['Customers are working with us on the next version of the product.', 'Trusted by a large base of customers who renew year after year.', 'Customers rely on us every week, and many are adopting a second product.', 'Customers grow with us every year, and most large accounts use several products.', 'The standard in our category. Customers build their processes on top of us.'];
  var PRODUCT_SPIN = ['Live with our first pilot users, learning every week.', 'Early users give us feedback every week and we ship weekly.', 'Customers use it every week for a core workflow.', 'Used daily. Customers are expanding to new teams on their own.', 'Customers tell us they could not run their work without it.'];
  var MOAT_SPIN = ['A better product at a fair price.', 'Designed around how {c} actually work.', 'Every customer adds workflow data that makes the product better.', 'Deep integrations and years of customer data make us hard to replace.', 'Every new customer makes the product better for all of them.'];
  var MARKET_SPIN = ['A focused market we can lead.', 'A market with clear demand and buyers who already pay for tools.', 'A large market growing every year.', 'A large market where spending is shifting quickly to new tools.', 'A very large market being reshaped right now.'];

  function productSpin(c) {
    var late = c.stage === 'b' || c.stage === 'growth';
    return (late ? PRODUCT_SPIN_LATE : PRODUCT_SPIN)[tierOf(late ? I.PRODUCT_LATE : I.PRODUCT, c.product.text)];
  }
  function tractionHeadline(c) {
    var rows = {}; c.traction.forEach(function (x) { rows[x[0]] = x[1]; });
    if (c.stage === 'preseed') {
      var paying = rows['Paying customers'] !== 'None yet';
      return { big: paying ? rows['Paying customers'] + ' paying customers' : rows['Pilots running'] + ' pilots running',
        points: [paying ? rows['Pilots running'] + ' more pilots running' : 'Converting pilots to paid contracts now', rows['Letters of intent'] + ' signed letters of intent'] };
    }
    if (c.stage === 'seed') {
      if (rows['Annual recurring revenue'] === 'Pre-revenue') return { big: rows['Customers'] + ' customers onboarded', points: ['Launching paid plans this quarter', 'Strong usage from early customers'] };
      return { big: rows['Annual recurring revenue'] + ' in annual recurring revenue', points: ['Growing ' + rows['Monthly growth'] + ' month over month', rows['Customers'] + ' customers'] };
    }
    var pts = ['Grew ' + rows['Growth, last 12 months'] + ' in the last 12 months', rows['Net revenue retention'] + ' net revenue retention', rows['Gross margin'] + ' gross margin'];
    return { big: rows['Annual recurring revenue'] + ' in annual recurring revenue', points: pts };
  }

  function deck(c, meta) {
    var d = details(c, meta), S = story(c), t = c.terms;
    var C = cap(c.customer || 'Our customers'), cust = c.customer || 'our customers';
    var tr = tractionHeadline(c);
    var count = round2(c.market.tam / d.price);
    var mi = tierOf(I.MARKET, c.market.text), oi = tierOf(I.MOAT, c.moat.text);
    return [
      { kind: 'cover', title: c.name, sub: c.pitch, foot: c.location + ', founded ' + d.founded + '. GarageSchool Demo Day.' },
      { kind: 'statement', label: 'The problem', title: S.problem.replace('{C}', C) },
      { kind: 'statement', label: 'Our solution', title: c.pitch, points: [productSpin(c)] },
      { kind: 'big', label: 'Traction', title: tr.big, points: tr.points },
      { kind: 'statement', label: 'Why now', title: S.why },
      { kind: 'big', label: 'Market', title: money(c.market.tam) + ' market', points: ['About ' + count.toLocaleString('en-US') + ' potential customers at around ' + money(d.price) + ' each', 'Growing ' + c.market.growth + '% a year', MARKET_SPIN[mi]] },
      { kind: 'statement', label: 'Business model', title: d.model, points: ['Average price: ' + d.priceText] },
      { kind: 'statement', label: 'Why we win', title: MOAT_SPIN[oi].replace('{c}', cust) },
      { kind: 'team', label: 'Team', founders: d.founders, foot: c.team.fullTime + ' full-time people' },
      { kind: 'ask', label: 'The ask', title: 'Raising ' + money(t.round), points: d.use.map(function (u) { return u[0] + ': ' + u[1] + '%'; }), foot: 'This round gets us to: ' + d.milestone + '.' }
    ];
  }

  function tractionSpoken(c) {
    var rows = {}; c.traction.forEach(function (x) { rows[x[0]] = x[1]; });
    if (c.stage === 'preseed') {
      return rows['Paying customers'] !== 'None yet'
        ? 'We have ' + rows['Paying customers'] + ' paying customers, ' + rows['Pilots running'] + ' more pilots running, and ' + rows['Letters of intent'] + ' signed letters of intent.'
        : 'We have ' + rows['Pilots running'] + ' pilots running and ' + rows['Letters of intent'] + ' signed letters of intent.';
    }
    if (c.stage === 'seed') {
      return rows['Annual recurring revenue'] === 'Pre-revenue'
        ? 'We have ' + rows['Customers'] + ' customers onboarded, and we launch paid plans this quarter.'
        : 'We have ' + rows['Annual recurring revenue'] + ' in annual recurring revenue from ' + rows['Customers'] + ' customers, growing ' + rows['Monthly growth'] + ' month over month.';
    }
    return 'We have ' + rows['Annual recurring revenue'] + ' in annual recurring revenue, up ' + rows['Growth, last 12 months'] + ' in the last year, with ' + rows['Net revenue retention'] + ' net revenue retention.';
  }
  function lower(s) { return /^[A-Z]{2}/.test(s) ? s : s.charAt(0).toLowerCase() + s.slice(1); } // keep acronyms like AI

  // ---------- Demo day transcript ----------
  function transcript(c, meta) {
    var d = details(c, meta), S = story(c), t = c.terms;
    var ceo = d.founders[0], others = d.founders.slice(1);
    var C = cap(c.customer || 'Our customers');
    var lines = [
      'Hi, I am ' + ceo.name.split(' ')[0] + ', ' + ceo.role + ' of ' + c.name + '. ' + c.pitch,
      S.problem.replace('{C}', C) + (c.stage === 'preseed' || c.stage === 'seed' ? ' We know because we have spent the last year talking to them.' : ' We have spent years working with them.'),
      'So we built ' + c.name + '. ' + productSpin(c),
      tractionSpoken(c),
      'Why now? ' + S.why,
      'This is a ' + money(c.market.tam) + ' market, growing ' + c.market.growth + '% a year. We charge about ' + d.priceText + '.',
      'Our team: ' + d.founders.map(function (f) { return f.name + ', ' + f.role + ' (' + lower(f.bio) + ')'; }).join(', and ') + '.' + (c.team.fullTime > d.founders.length ? ' We are ' + c.team.fullTime + ' people full time.' : ''),
      'We are raising ' + money(t.round) + '. It gets us to the next step: ' + lower(d.milestone) + '. I am ' + ceo.name.split(' ')[0] + ', and we are ' + c.name + '. Come talk to us.'
    ];
    return lines;
  }

  // ---------- Founder call summary: an analyst's 12 notes from the first call with the CEO ----------
  function callSummary(c, meta) {
    var d = details(c, meta), S = story(c), t = c.terms, r = rngFor(c, meta, 'call');
    var ceo = d.founders[0], C = cap(c.customer || 'Their customers');
    var heard = tractionSpoken(c).replace(/^We have/, 'They have').replace(/, and we launch/, ', and they launch');
    return [
      'Spoke with ' + ceo.name + ' (' + ceo.role + ') for about ' + (30 + Math.floor(r() * 5) * 5) + ' minutes.',
      c.name + ' was founded in ' + d.founded + ' and is based in ' + c.location + '. In one line: ' + lower(c.pitch),
      'Team: ' + d.founders.map(function (f) { return f.name + ', ' + f.role + ', ' + lower(f.bio); }).join('; ') + '.',
      'Our read on the team: ' + lower(c.team.text) + ' ' + c.team.fullTime + ' people work full time.',
      'The problem, in the founder\'s words: ' + lower(S.problem.replace('{C}', C)),
      'Product today: ' + lower(c.product.text),
      'Traction they shared: ' + lower(heard),
      'Business model: ' + lower(d.model) + ', at about ' + d.priceText + '.',
      'Market: ' + lower(c.market.text) + ' They size it at ' + money(c.market.tam) + ', growing ' + c.market.growth + '% a year.',
      'Competition: ' + lower(c.moat.text) + ' ' + c.moat.competitors + ' direct competitor' + (c.moat.competitors === 1 ? '' : 's') + '. Why now, they say: ' + lower(S.why),
      'The round: raising ' + money(t.round) + ' at ' + money(t.post) + ' post-money. Raised before: ' + lower(d.prior) + '. The money gets them to ' + lower(d.milestone) + '.',
      c.risks.length ? 'Open question to check before deciding: ' + lower(c.risks[0]) : 'Nothing alarming came up. Next step would be calls with two or three customers.'
    ];
  }

  // ---------- Due diligence: scenario and option questions ----------
  function shuffleOpts(r, opts, answer) {
    var idx = opts.map(function (_, i) { return i; });
    for (var i = idx.length - 1; i > 0; i--) { var j = Math.floor(r() * (i + 1)); var x = idx[i]; idx[i] = idx[j]; idx[j] = x; }
    return { options: idx.map(function (k) { return opts[k]; }), answer: idx.indexOf(answer) };
  }
  function q(r, prompt, opts, answer, explain, context) {
    // Numeric distractors can collide; keep the right answer and the first distinct alternatives.
    var seen = {}, clean = [];
    opts.forEach(function (o, k) { if (!seen[o] || k === answer) { seen[o] = 1; clean.push(o); } else if (k < answer) answer--; });
    opts = clean.slice(0, 4);
    var s = shuffleOpts(r, opts, answer);
    return { prompt: prompt, context: context || null, options: s.options, answer: s.answer, explain: explain };
  }

  var RISK_Q = [
    [/largest customer/, 'What is the best next step before the IC meeting?',
      ['Call the largest customer and review how long their contract runs and whether they plan to renew', 'Ignore it. Early companies always depend on a few customers', 'Ask the founders to drop that customer to reduce risk', 'Cut the valuation by the same percentage as the concentration'],
      'Concentration is normal early, but you need to know how likely the big customer is to stay. Their contract terms and their own words tell you most of what you need.'],
    [/depends on one platform/, 'How should you assess this risk?',
      ['Test how much of the product would still work without that platform, and whether customers would stay if the platform copied it', 'Assume the platform will never compete with a startup', 'Pass immediately. Platform risk always kills startups', 'Ask the founder to sign an exclusivity deal with the platform'],
      'Platform risk is serious but not always fatal. The question is what value the company adds beyond the platform and how customers would react to a copy.'],
    [/regulatory approval/, 'What matters most for this deal?',
      ['Whether the company has enough cash to reach approval, with room for delays', 'Whether the founders are confident about the approval date', 'How large the market will be ten years after approval', 'Whether competitors have already been approved'],
      'Approval timelines often slip. Make sure the round funds the company past the approval date with a buffer, or plan for a bridge.'],
    [/second company/, 'What should you ask for?',
      ['A clear plan and date for the CEO to work full time on this company, as a condition of investing', 'Nothing. Strong founders can run two companies', 'A larger board seat to keep watch', 'A lower valuation to compensate for the divided attention'],
      'Investors back founders who are fully committed. A divided CEO is a common reason early companies stall, so make full commitment a condition.'],
    [/months of runway/, 'How does this change your evaluation?',
      ['Check whether this round funds the company to its next milestone, because a short runway leaves little room for error', 'It does not matter, since this round adds cash', 'It shows the company is efficient', 'Pass, because short runway means the founders are careless'],
      'Low runway is normal before a raise, but the new money must reach a milestone that makes the next round possible. Check the plan against the cash.'],
    [/former cofounder/, 'What is the right response?',
      ['Ask how the equity will be restructured or bought back, because a large inactive holder can block future rounds and demotivate the team', 'Nothing. Cap tables sort themselves out later', 'Ask the former cofounder to join the board', 'Increase your own ownership to balance it'],
      'A departed cofounder holding 30% is a serious cap table problem. New investors often require it to be fixed before they invest.'],
    [/patent dispute/, 'What should diligence focus on?',
      ['Have counsel review the dispute and estimate the cost and the range of outcomes', 'Assume the startup will win because its product is better', 'Ask the founders to settle immediately at any price', 'Ignore it. Patent disputes rarely matter'],
      'Legal risk needs expert review. Know the worst case and its cost before IC, not after.'],
    [/Gross margins are under/, 'What would make you comfortable with this?',
      ['Evidence that margins improve as the company scales or switches to cheaper models', 'A higher price per customer next year, as promised by the founders', 'Nothing. Low margins are fine if revenue grows', 'Faster hiring to grow out of the problem'],
      'Low margins are acceptable early only if there is a clear path to improve them. Look for proof, such as margins already rising.']
  ];

  function diligence(c, meta) {
    if (c._dd) return c._dd;
    var r = rngFor(c, meta, 'dd'), out = [];
    var refT = I.REFS.indexOf(c.dig.refs), callT = I.CALLS.indexOf(c.dig.calls);
    var avg = (refT + callT) / 2;
    out.push(q(r, 'You ran reference and customer calls. How should they change your view of this deal?',
      ['They strengthen the case for investing', 'They are mixed. Look for more evidence before IC', 'They raise a serious concern. This is likely a drop'],
      avg >= 2.75 ? 0 : avg <= 1.25 ? 2 : 1,
      avg >= 2.75 ? 'Both references and customers are strongly positive. This is the kind of evidence that should raise conviction.' :
        avg <= 1.25 ? 'References or customers raised real problems. That evidence should outweigh a good pitch.' :
        'The calls are neither a clear yes nor a clear no. A good memo says what extra evidence would settle it.',
      'References: ' + c.dig.refs + ' Customers: ' + c.dig.calls));

    var risk = null;
    for (var k = 0; k < c.risks.length && !risk; k++) for (var j = 0; j < RISK_Q.length; j++) if (RISK_Q[j][0].test(c.risks[k])) { risk = [c.risks[k], RISK_Q[j]]; break; }
    if (risk) {
      out.push(q(r, risk[1][1], risk[1][2], 0, risk[1][3], 'The deal team flagged: ' + risk[0]));
    } else if (c.stage === 'preseed') {
      var rows = {}; c.traction.forEach(function (x) { rows[x[0]] = x[1]; });
      out.push(q(r, 'Which evidence would best show that customers truly need this product?',
        ['Pilots converting into paid contracts at a real price', 'More signed letters of intent', 'Growth in website visitors and sign-ups', 'A larger estimate of the market'],
        0, 'Letters of intent and sign-ups cost the customer nothing. Paying, and renewing, is the strongest proof of need.',
        'Traction: ' + rows['Paying customers'] + ' paying customers, ' + rows['Pilots running'] + ' pilots, ' + rows['Letters of intent'] + ' letters of intent.'));
    } else if (c.stage === 'seed') {
      out.push(q(r, 'Revenue is growing. What should you check first before IC?',
        ['Whether early customers renew and expand, using revenue by customer cohort', 'Whether the founders expect growth to speed up', 'How much the team plans to hire next year', 'Which logo is the most famous customer'],
        0, 'Growth from new customers can hide churn. Cohort retention shows whether the revenue will last.'));
    } else {
      var nrr = 0; c.traction.forEach(function (x) { if (x[0] === 'Net revenue retention') nrr = parseInt(x[1], 10); });
      out.push(q(r, 'Net revenue retention is ' + nrr + '%. What does that tell you?',
        nrr >= 100 ? ['Existing customers spend more each year, even after some leave', 'The company keeps exactly ' + nrr + '% of its customers', 'New customers make up for the ones who leave', 'Gross margin is ' + nrr + '%'] :
          ['Revenue from existing customers shrinks each year, so new sales must make up the gap', 'The company keeps ' + nrr + '% of its customers', 'Existing customers spend more each year', 'The company is profitable'],
        0, 'Net revenue retention compares revenue from a group of customers today with the same group a year ago, including expansion and churn. Above 100% means the base grows on its own.'));
    }

    var kind = pickR(r, c.terms.arrMultiple ? ['dilution', 'multiple', 'market'] : ['dilution', 'market']);
    if (kind === 'dilution') {
      var own = c.terms.ownership, sold = pickR(r, [.15, .2, .25]), after = own * (1 - sold);
      var f = function (x) { return (x * 100).toFixed(1) + '%'; };
      out.push(q(r, 'You will own ' + f(own) + ' after this round. If the next round sells ' + Math.round(sold * 100) + '% of the company and you do not invest, what will you own?',
        [f(after), f(own), f(own * sold), f(own * (1 - 2 * sold)), f(own * (1 + sold))], 0,
        'Your stake is multiplied by the share existing holders keep: ' + f(own) + ' times ' + Math.round((1 - sold) * 100) + '% is ' + f(after) + '. This is why funds plan reserves.'));
    } else if (kind === 'multiple') {
      var m = c.terms.arrMultiple;
      var fm = function (x) { return Math.round(x) + 'x'; };
      var arr = c.terms.post / m;
      out.push(q(r, 'The post-money valuation is ' + money(c.terms.post) + ' and annual recurring revenue is ' + money(arr) + '. What is the valuation to ARR multiple?',
        [fm(m), fm(m / 2), fm(m * 2), fm(m * 3), fm(m + 10)].slice(0, 5), 0,
        'Post-money divided by ARR: ' + money(c.terms.post) + ' / ' + money(arr) + ' is about ' + fm(m) + '. Compare it with similar rounds, which the deal notes do.'));
    } else {
      var d = details(c, meta), n = c.market.tam / d.price;
      var fmt = function (x) { return round2(x).toLocaleString('en-US'); };
      out.push(q(r, 'The founders size the market at ' + money(c.market.tam) + ' and charge about ' + d.priceText + '. How many paying customers does that market imply?',
        [fmt(n), fmt(n * 10), fmt(n / 10), fmt(n * 3), fmt(n / 3)], 0,
        'Market size divided by price per customer: ' + money(c.market.tam) + ' / ' + money(d.price) + ' is about ' + fmt(n) + '. Ask whether that many customers really exist and would pay.'));
    }
    c._dd = out;
    return out;
  }

  E.dealDetails = details;
  E.pitchDeck = deck;
  E.demoDayTranscript = transcript;
  E.founderCall = callSummary;
  E.dueDiligence = diligence;
  return E;
});
