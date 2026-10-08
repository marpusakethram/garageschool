// VentureSim app: dashboard, tests, course, library. Progress is stored in this browser.
(function () {
  'use strict';

  var E = window.GarageEngine;
  var COURSE = window.GARAGE_COURSE || [];
  var GLOSS = window.GARAGE_GLOSSARY || [];
  var LIB = window.GARAGE_LIBRARY || [];
  var KEY = 'garage.v1';
  var root = document.getElementById('root');
  var TRACK_IDS = ['analyst', 'associate', 'partner'];

  // ---------- Storage ----------
  var storageOk = true;
  function load() {
    try { return JSON.parse(localStorage.getItem(KEY)); } catch (e) { storageOk = false; return null; }
  }
  var store = load() || { profile: null, tests: {}, course: {} };
  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(store)); storageOk = true; } catch (e) { storageOk = false; }
  }

  // ---------- Helpers ----------
  function esc(s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
  var money = E.money, mult = E.mult;
  function pct(x) { return (x * 100 < 10 ? (x * 100).toFixed(1) : Math.round(x * 100)) + '%'; }
  function go(hash) { if (location.hash === hash) route(); else location.hash = hash; }
  function key(track, n) { return track + '-' + n; }
  var cache = {};
  // A started test keeps the generator version and sectors it began with. New tests use version 2 and the current sector focus.
  function testOpts(track, n) {
    var st = store.tests[key(track, n)];
    if (st) return { gen: st.gen || 1, focus: st.focus || null };
    return { gen: 2, focus: store.focus || null };
  }
  function getTest(track, n) { var o = testOpts(track, n), k = key(track, n) + '|' + E.optsKey(o); return cache[k] || (cache[k] = E.generateTest(track, n, o)); }
  function metaFor(track, n) { return E.testMeta(track, n, testOpts(track, n)); }
  function focusText(focus) { return focus && focus.length ? focus.map(E.sectorLabel).join(', ') : 'All sectors'; }
  function testState(track, n) { return store.tests[key(track, n)] || null; }
  function isUnlocked(track, n) { return n === 1 || (testState(track, n - 1) || {}).status === 'done'; }
  function doneCount(track) { var c = 0; for (var n = 1; n <= E.TESTS_PER_TRACK; n++) if ((testState(track, n) || {}).status === 'done') c++; return c; }
  function nextTest(track) { for (var n = 1; n <= E.TESTS_PER_TRACK; n++) if ((testState(track, n) || {}).status !== 'done') return n; return null; }
  function stageText(meta) { return meta.stages.map(function (s) { return E.STAGES[s].label; }).join(' and '); }
  function trackName(t) { return E.TRACKS[t].name; }
  function lessonBySlug(slug) { return COURSE.filter(function (m) { return m.slug === slug; })[0]; }
  function lessonById(id) { return COURSE.filter(function (m) { return m.id === id; })[0]; }

  var ICONS = {
    home: '<path d="M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/>',
    tests: '<rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 8h8M8 12h8M8 16h5"/>',
    course: '<path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2z"/><path d="M4 19V5"/>',
    play: '<circle cx="12" cy="12" r="9"/><path d="M10 8.5v7l6-3.5z"/>',
    library: '<path d="M4 4h5v16H4zM10 4h5v16h-5z"/><path d="M16 5l4 1-3 14-4-1z"/>',
    glossary: '<path d="M4 6h16M4 12h10M4 18h13"/>',
    compass: '<circle cx="12" cy="12" r="9"/><path d="M15.5 8.5l-2 5-5 2 2-5z"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6"/>',
    tool: '<path d="M14.5 6.5a4 4 0 0 0 5 5L12 19a2.1 2.1 0 0 1-3-3z"/><path d="M14.5 6.5L17 4l3 3-2.5 2.5"/>',
    chart: '<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',
    map: '<path d="M9 4l-6 2v14l6-2 6 2 6-2V4l-6 2z"/><path d="M9 4v14M15 6v14"/>',
    spark: '<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/>',
    chat: '<path d="M4 5h16v11H9l-5 4z"/>',
    rocket: '<path d="M5 15c-1 1-1.5 3.5-1.5 3.5S6 18 7 17"/><path d="M9 15l-3-3c2-6 7-9 13-9 0 6-3 11-9 13z"/><circle cx="14.5" cy="9.5" r="1.5"/>'
  };
  function icon(name) { return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + ICONS[name] + '</svg>'; }
  var GMARK = '<svg class="brand-mark" viewBox="0 0 32 32" aria-hidden="true"><circle cx="16" cy="16" r="15.5" fill="#1A3EBC"/><circle cx="16" cy="16" r="13.3" fill="#2350E8"/><circle cx="16" cy="16" r="11.3" fill="none" stroke="#fff" stroke-opacity=".35" stroke-width="1"/><path d="M9.6 10.2h3.5l2.9 7.4 2.9-7.4h3.5l-4.8 12.1h-3.2z" fill="#fff"/></svg>';
  var LOGO = '<a class="logo" href="index.html">' + GMARK + 'VentureSim</a>';

  // ---------- Layout ----------
  function shell(active, html) {
    var founder = store.profile && store.profile.kind === 'founder';
    var nav = founder ? [
      ['home', '#/', 'Dashboard', 'home'],
      ['course', '#/courses/founder', 'Founder course', 'rocket'],
      ['course-vc', '#/course', 'VC course', 'course'],
      ['tests', '#/tests', 'Tests', 'tests']
    ] : [
      ['home', '#/', 'Dashboard', 'home'],
      ['tests', '#/tests', 'Tests', 'tests'],
      ['course', '#/course', 'Course', 'course'],
      ['workshops', '#/workshops', 'Workshops', 'tool'],
      ['walkthrough', '#/walkthrough', 'Walkthrough', 'play']
    ];
    var res = [
      ['metrics', '#/metrics', 'Metrics guide', 'chart'],
      ['sectors', '#/sectors', 'Sector map', 'map'],
      ['glossary', '#/glossary', 'Glossary', 'glossary'],
      ['library', '#/library', 'Library', 'library']
    ];
    function li(n) { return '<li><a href="' + n[1] + '"' + (active === n[0] ? ' aria-current="page"' : '') + '>' + icon(n[3]) + n[2] + '</a></li>'; }
    var links = nav.map(li).join('');
    var resLinks = res.map(li).join('');
    var user = store.profile && !store.signedOut
      ? '<div class="side-user"><b>' + esc(store.profile.name) + '</b><a href="#/profile">Profile and progress</a></div>'
      : '<div class="side-user"><b>Not signed in</b><a href="#/signup">Create an account</a> or <a href="#/login">log in</a>.</div>';
    return '<div class="app" id="app">' +
      '<aside class="sidebar">' + LOGO +
        '<nav aria-label="App"><ul class="side-nav">' + links + '</ul></nav>' +
        '<nav aria-label="Resources"><p class="side-label">Resources</p><ul class="side-nav">' + resLinks +
          '<li><a href="ai-tools.html">' + icon('spark') + 'AI tools for VCs</a></li>' +
          '<li><a href="founders.html">' + icon('rocket') + 'For founders</a></li>' +
          '<li><a href="break-into-vc.html">' + icon('compass') + 'Break into VC</a></li></ul></nav>' +
        '<nav aria-label="You"><p class="side-label">You</p><ul class="side-nav">' +
          li(['feedback', '#/feedback', 'Send feedback', 'chat']) +
          '<li><a href="#/profile"' + (active === 'profile' ? ' aria-current="page"' : '') + '>' + icon('user') + 'Profile</a></li></ul></nav>' +
        user + '</aside>' +
      '<div class="main"><div class="app-top">' + LOGO + '<button class="btn btn-secondary btn-sm" type="button" data-act="menu" aria-expanded="false">Menu</button></div>' +
      (storageOk ? '' : '<p class="feedback bad" role="alert">This browser is blocking storage, so your progress will not be saved. Try a normal (not private) window.</p>') +
      '<main id="main">' + html + '</main></div></div>';
  }
  function page(head, body) {
    return '<div class="page">' + head + body + '</div>';
  }
  function pageHead(title, sub, crumbs) {
    return '<header class="page-head">' + (crumbs ? '<p class="crumbs">' + crumbs + '</p>' : '') + '<h1>' + title + '</h1>' + (sub ? '<p>' + sub + '</p>' : '') + '</header>';
  }
  function render(html, focusMain) {
    root.innerHTML = html;
    if (window.GaragePlayers) window.GaragePlayers(root);
    if (focusMain !== false) {
      var h = root.querySelector('h1');
      if (h) { h.setAttribute('tabindex', '-1'); h.focus({ preventScroll: true }); }
      window.scrollTo(0, 0);
    }
  }

  // ---------- Router ----------
  var keyHandler = null;
  var REASONS = [['team', 'Team'], ['market', 'Market'], ['product', 'Product'], ['traction', 'Traction'], ['moat', 'Competition'], ['price', 'Price'], ['risk', 'Risks'], ['thesis', 'Thesis fit']];
  function setKeys(fn) {
    if (keyHandler) document.removeEventListener('keydown', keyHandler);
    // Shortcuts never fire while a dialog, such as the pitch deck, is open.
    keyHandler = fn ? function (e) { if (document.querySelector('dialog[open]')) return; fn(e); } : null;
    if (keyHandler) document.addEventListener('keydown', keyHandler);
  }
  var scrollHandler = null;
  function setScroll(fn) {
    if (scrollHandler) window.removeEventListener('scroll', scrollHandler);
    scrollHandler = fn;
    if (fn) { window.addEventListener('scroll', fn, { passive: true }); fn(); }
  }
  function route() {
    setKeys(null);
    setScroll(null);
    var rb = document.querySelector('.reading-bar'); if (rb) rb.remove();
    var parts = location.hash.replace(/^#\/?/, '').split('/').filter(Boolean);
    var p0 = parts[0] || '';
    document.title = 'VentureSim';
    var needsAccount = { '': 1, tests: 1, test: 1, results: 1, report: 1, profile: 1 };
    if (needsAccount[p0] && (!store.profile || store.signedOut)) return go(store.profile ? '#/login' : '#/signup');
    if (VSApp.routes[p0]) return VSApp.routes[p0](parts);
    switch (p0) {
      case '': return viewDashboard();
      case 'signup': return viewSignup();
      case 'login': return viewLogin();
      case 'tests': return viewTracks(parts[1] || (store.profile && store.profile.track) || 'analyst');
      case 'test': return viewTest(parts[1], +parts[2], parts[3]);
      case 'results': return viewResults(parts[1], +parts[2]);
      case 'example': return viewExample();
      case 'course': return parts[1] ? viewLesson(parts[1]) : viewCourse('vc');
      case 'courses': return viewCourse(parts[1]);
      case 'walkthrough': return viewWalkthrough();
      case 'library': return viewLibrary();
      case 'glossary': return viewGlossary();
      case 'profile': return viewProfile();
      default: return render(shell('', page(pageHead('Page not found', 'That address does not match anything in VentureSim.'), '<a class="btn btn-primary" href="#/">Go to the dashboard</a>')));
    }
  }
  window.addEventListener('hashchange', route);

  // Global clicks: mobile menu, close menu on navigation.
  document.addEventListener('click', function (e) {
    var t = e.target.closest('[data-act="menu"]');
    var app = document.getElementById('app');
    if (t && app) {
      var open = app.classList.toggle('nav-open');
      t.setAttribute('aria-expanded', String(open));
      return;
    }
    if (app && app.classList.contains('nav-open') && e.target.closest('.sidebar a')) app.classList.remove('nav-open');
  });

  // ---------- Auth (local) ----------
  function viewSignup(note) {
    document.title = 'Create account | VentureSim';
    var tracks = TRACK_IDS.map(function (t, k) {
      return '<label><input type="radio" name="track" value="' + t + '"' + (k === 0 ? ' checked' : '') + '><span><b>' + trackName(t) + '</b><span>' + esc(E.TRACKS[t].blurb) + '</span></span></label>';
    }).join('');
    render('<div class="auth"><div class="auth-card">' + LOGO +
      '<h1>Create your account</h1><p>' + esc(note || 'Your account and test progress are saved in this browser.') + '</p>' +
      '<form class="form" id="signup" novalidate>' +
        '<div><label for="name">Your name</label><input type="text" id="name" name="name" autocomplete="name" required></div>' +
        '<div><label for="email">Email (optional)</label><input type="email" id="email" name="email" autocomplete="email"></div>' +
        '<fieldset style="border:0;padding:0;margin:0"><legend style="font-weight:600;font-size:15px;margin-bottom:8px">Which track do you want to start with?</legend><div class="radio-cards">' + tracks + '</div></fieldset>' +
        '<p class="form-error" id="form-error" role="alert"></p>' +
        '<button class="btn btn-primary btn-lg" type="submit">Create account</button>' +
        '<p class="small muted">Already have an account in this browser? <a href="#/login">Log in</a>. Want a look first? <a href="#/example">Try the example test</a>.</p>' +
      '</form></div></div>');
    document.getElementById('signup').addEventListener('submit', function (e) {
      e.preventDefault();
      var name = this.name.value.trim(), email = this.email.value.trim();
      var err = document.getElementById('form-error');
      if (!name) { err.textContent = 'Enter your name to create an account.'; this.name.focus(); return; }
      if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { err.textContent = 'That email address does not look right. Fix it or leave it blank.'; this.email.focus(); return; }
      store.profile = { name: name, email: email, track: this.track.value, createdAt: Date.now() };
      save();
      go('#/');
    });
  }

  function viewLogin() {
    document.title = 'Log in | VentureSim';
    var body = store.profile
      ? '<h1>Welcome back, ' + esc(store.profile.name) + '</h1><p>Your progress is saved in this browser.</p><a class="btn btn-primary btn-lg" href="#/">Continue to your dashboard</a>'
      : '<h1>Log in</h1><p>There is no VentureSim account in this browser yet. Accounts are saved on the device where you created them.</p>' +
        '<div class="form"><a class="btn btn-primary btn-lg" href="#/signup">Create an account</a>' +
        '<div><label for="import">Moved from another device? Import your progress file</label><input type="file" id="import" accept="application/json"></div>' +
        '<p class="form-error" id="form-error" role="alert"></p></div>';
    render('<div class="auth"><div class="auth-card">' + LOGO + body + '</div></div>');
    var inp = document.getElementById('import');
    if (inp) inp.addEventListener('change', importFile);
  }

  function importFile(e) {
    var file = e.target.files[0];
    if (!file) return;
    var reader = new FileReader();
    reader.onload = function () {
      try {
        var data = JSON.parse(reader.result);
        if (!data || !data.profile || typeof data.tests !== 'object') throw new Error('shape');
        store = { profile: data.profile, tests: data.tests || {}, course: data.course || {} };
        save();
        go('#/');
      } catch (err) {
        var el = document.getElementById('form-error');
        if (el) el.textContent = 'That file is not a VentureSim progress file. Export one from Profile on your other device.';
      }
    };
    reader.readAsText(file);
  }

  // ---------- Dashboard ----------
  function viewDashboard() {
    document.title = 'Dashboard | VentureSim';
    var p = store.profile;
    if (p.kind === 'founder' && VSApp.routes.founderHome) return VSApp.routes.founderHome();
    var active = null;
    Object.keys(store.tests).forEach(function (k) { var s = store.tests[k]; if (s.status === 'active' && (!active || s.updatedAt > active.updatedAt)) active = s; });
    var main = p.track, n = nextTest(main);
    var next;
    if (active) {
      next = '<div class="next-card"><div><h2>Continue ' + trackName(active.track) + ' test ' + active.n + '</h2><p>' + (active.stage === 'diligence' ? 'You are doing due diligence on your shortlist' : active.stage === 'ic' ? 'Your IC memo is next' : 'You are on company ' + Math.min(active.pos + 1, 50) + ' of 50') + ' in a ' + money(metaFor(active.track, active.n).fundSize) + ' fund.</p></div><a class="btn btn-primary btn-lg" href="#/test/' + active.track + '/' + active.n + '/play">Continue test</a></div>';
    } else if (n) {
      var meta = metaFor(main, n);
      next = '<div class="next-card"><div><h2>Next up: ' + trackName(main) + ' test ' + n + '</h2><p>' + money(meta.fundSize) + ' fund, ' + stageText(meta) + ' companies. 50 startups to review.</p></div><a class="btn btn-primary btn-lg" href="#/test/' + main + '/' + n + '">Open the fund brief</a></div>';
    } else {
      next = '<div class="next-card"><div><h2>You finished every ' + trackName(main) + ' test</h2><p>Try another track to practice a different job.</p></div><a class="btn btn-primary btn-lg" href="#/tests">See all tracks</a></div>';
    }

    var tracks = TRACK_IDS.map(function (t) {
      var d = doneCount(t), scores = [];
      for (var k = 1; k <= 50; k++) { var s = testState(t, k); if (s && s.result) scores.push(s.result.judgment); }
      var avg = scores.length ? Math.round(scores.reduce(function (a, b) { return a + b; }, 0) / scores.length) : null;
      return '<div class="track-row"><div><h3><a href="#/tests/' + t + '">' + trackName(t) + '</a></h3><p>' + d + ' of 50 tests done' + (avg != null ? ', average judgment ' + avg : '') + '</p></div>' +
        '<a class="btn btn-secondary btn-sm" href="#/tests/' + t + '">' + (d ? 'View tests' : 'Start') + '</a><div class="bar" aria-hidden="true"><i style="width:' + (d / 50 * 100) + '%"></i></div></div>';
    }).join('');

    var lessons = COURSE.filter(function (m) { return m.course === 'vc'; }).map(function (m) {
      return '<li><span class="tick' + (store.course[m.slug] ? ' done' : '') + '" aria-hidden="true"></span><a href="#/course/' + m.slug + '">' + m.n + '. ' + esc(m.title) + '</a><span class="small muted">' + m.minutes + ' min</span>' +
        (store.course[m.slug] ? '<span class="sr-only">Read</span>' : '') + '</li>';
    }).join('');
    var vcCourse = COURSE.filter(function (m) { return m.course === 'vc'; });
    var read = vcCourse.filter(function (m) { return store.course[m.slug]; }).length;

    var recent = Object.keys(store.tests).map(function (k) { return store.tests[k]; }).filter(function (s) { return s.status === 'done'; })
      .sort(function (a, b) { return b.finishedAt - a.finishedAt; }).slice(0, 5);
    var recentHtml = recent.length
      ? '<table class="test-table"><thead><tr><th>Test</th><th>Judgment</th><th class="hide-sm">Return</th><th></th></tr></thead><tbody>' + recent.map(function (s) {
          return '<tr><td>' + trackName(s.track) + ' ' + s.n + '</td><td>' + s.result.judgment + '</td><td class="hide-sm">' + (s.result.fund ? mult(s.result.fund.netTvpi) + ' net' : mult(s.result.portfolioMultiple)) + '</td><td><a href="#/results/' + s.track + '/' + s.n + '">Debrief</a></td></tr>';
        }).join('') + '</tbody></table>'
      : '<p class="empty">Finish a test to see your results here.</p>';

    render(shell('home', page(
      pageHead('Welcome, ' + esc(p.name.split(' ')[0]), 'Pick up where you left off, or read a lesson before your next test.'),
      next +
      '<div class="grid-2" style="margin-top:24px">' +
        '<section class="panel" aria-labelledby="tr-h"><div class="panel-head"><h2 id="tr-h">Your tracks</h2><a class="small" href="#/tests">All tests</a></div>' + tracks + '</section>' +
        '<section class="panel" aria-labelledby="re-h"><div class="panel-head"><h2 id="re-h">Recent results</h2></div>' + recentHtml + '</section>' +
      '</div>' +
      '<section class="panel" aria-labelledby="co-h" style="margin-top:20px"><div class="panel-head"><h2 id="co-h">Course</h2><span class="small muted">' + read + ' of ' + vcCourse.length + ' read</span></div><ul class="check-list">' + lessons + '</ul></section>' +
      '<div class="grid-2" style="margin-top:20px">' +
        '<a class="panel panel-body module-card" href="#/walkthrough"><span class="n">Video</span><h3>How a test works</h3><p>The full walkthrough, from the fund brief to the debrief.</p></a>' +
        '<a class="panel panel-body module-card" href="break-into-vc.html"><span class="n">Guide</span><h3>Break into VC</h3><p>The paths in, the interview process, and a 90-day plan.</p></a>' +
      '</div>'
    )));
  }

  // ---------- Track lists ----------
  function viewTracks(track) {
    if (!E.TRACKS[track]) track = 'analyst';
    document.title = trackName(track) + ' tests | VentureSim';
    var tabs = '<nav class="tabs" aria-label="Tracks">' + TRACK_IDS.map(function (t) {
      return '<a href="#/tests/' + t + '"' + (t === track ? ' aria-current="page"' : '') + '>' + trackName(t) + ' (' + doneCount(t) + '/50)</a>';
    }).join('') + '</nav>';
    var rows = '';
    for (var n = 1; n <= E.TESTS_PER_TRACK; n++) {
      var meta = metaFor(track, n), st = testState(track, n), open = isUnlocked(track, n);
      var status, action;
      if (st && st.status === 'done') {
        status = '<span class="pill good">Judgment ' + st.result.judgment + '</span>';
        action = '<a class="btn btn-secondary btn-sm" href="#/results/' + track + '/' + n + '">Debrief</a>';
      } else if (st && st.status === 'active') {
        status = '<span class="pill warn">' + (st.stage === 'diligence' ? 'Due diligence' : st.stage === 'ic' ? 'IC memo' : 'In progress, ' + st.pos + '/50') + '</span>';
        action = '<a class="btn btn-primary btn-sm" href="#/test/' + track + '/' + n + '/play">Continue</a>';
      } else if (open) {
        status = '<span class="pill accent">Ready</span>';
        action = '<a class="btn btn-primary btn-sm" href="#/test/' + track + '/' + n + '">Start</a>';
      } else {
        status = '<span class="pill">Locked</span>';
        action = '<span class="small muted">Finish test ' + (n - 1) + '</span>';
      }
      rows += '<tr' + (!open && !st ? ' class="locked"' : '') + '><td><b>Test ' + n + '</b></td><td class="num">' + money(meta.fundSize) + '</td><td class="hide-sm">' + stageText(meta) + '</td>' +
        '<td class="hide-sm">' + (track === 'partner' ? meta.slots + ' initial, ' + meta.followSlots + ' follow-ons' + (meta.thesis.focus ? '<br><span class="small muted">' + esc(meta.thesis.text) + '</span>' : '') : esc(meta.thesis.text)) + '</td><td>' + status + '</td><td>' + action + '</td></tr>';
    }
    render(shell('tests', page(
      pageHead('Tests', esc(E.TRACKS[track].blurb) + ' Each test has 50 startups and a bigger fund than the one before. Finish a test to unlock the next.'),
      tabs + focusPanel() + '<div class="table-wrap"><table class="test-table"><thead><tr><th>Test</th><th>Fund</th><th class="hide-sm">Stage</th><th class="hide-sm">' + (track === 'partner' ? 'Portfolio' : 'Thesis') + '</th><th>Status</th><th></th></tr></thead><tbody>' + rows + '</tbody></table></div>'
    )));
    bindFocus();
  }

  function focusPanel() {
    var cur = store.focus || [];
    var groups = E.SECTOR_CHOICES.map(function (g) {
      return '<fieldset class="focus-group"><legend>' + esc(g.label.charAt(0).toUpperCase() + g.label.slice(1)) + '</legend>' + g.sectors.map(function (x) {
        return '<label class="chip-check"><input type="checkbox" value="' + x.id + '"' + (cur.indexOf(x.id) > -1 ? ' checked' : '') + '><span>' + esc(x.label) + '</span></label>';
      }).join('') + '</fieldset>';
    }).join('');
    return '<section class="focus-box" id="focus-box"><div class="focus-head"><div><h2>Sector focus: ' + esc(focusText(store.focus)) + '</h2>' +
      '<p class="small muted">Choose the sectors your tests draw companies from, or keep all sectors. Applies to tests you start from now on. Tests already started keep their companies.</p></div>' +
      '<button class="btn btn-secondary btn-sm" type="button" id="focus-toggle" aria-expanded="false" aria-controls="focus-form">Choose sectors</button></div>' +
      '<form id="focus-form" hidden><div class="focus-groups">' + groups + '</div><div class="focus-actions"><button class="btn btn-primary btn-sm" type="submit">Save sectors</button>' +
      '<button class="btn btn-secondary btn-sm" type="button" id="focus-all">Use all sectors</button><span class="small muted" id="focus-count"></span></div></form></section>';
  }
  function bindFocus() {
    var box = document.getElementById('focus-box'); if (!box) return;
    var form = document.getElementById('focus-form'), tog = document.getElementById('focus-toggle'), count = document.getElementById('focus-count');
    function upd() { var n = form.querySelectorAll('input:checked').length; count.textContent = n ? n + ' selected' : 'None selected means all sectors'; }
    tog.addEventListener('click', function () { form.hidden = !form.hidden; tog.setAttribute('aria-expanded', String(!form.hidden)); upd(); });
    form.addEventListener('change', upd);
    document.getElementById('focus-all').addEventListener('click', function () { store.focus = null; save(); route(); });
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var sel = Array.prototype.map.call(form.querySelectorAll('input:checked'), function (i) { return i.value; });
      store.focus = sel.length ? sel : null; save(); route();
    });
  }

  // ---------- Test brief ----------
  function viewTest(track, n, mode) {
    if (!E.TRACKS[track] || !(n >= 1 && n <= E.TESTS_PER_TRACK)) return go('#/tests');
    var st = testState(track, n);
    if (st && st.status === 'done') return go('#/results/' + track + '/' + n);
    if (!isUnlocked(track, n) && !st) return go('#/tests/' + track);
    if (mode === 'play' && st) return viewRunner(track, n);
    if (mode === 'play' && !st) return go('#/test/' + track + '/' + n);
    var meta = metaFor(track, n), T = E.TRACKS[track];
    document.title = trackName(track) + ' test ' + n + ' | VentureSim';
    var facts = [['Fund', meta.fundName], ['Fund size', money(meta.fundSize)], ['Stage', stageText(meta)], ['Sectors', (meta.gen >= 2 ? focusText(meta.focus) : 'All sectors')]];
    var rules;
    if (track === 'partner') {
      facts = facts.concat([
        ['Fees and expenses, 10 years', money(meta.fees)], ['Capital to invest', money(meta.investable)],
        ['Initial investments', meta.slots + ' at ' + money(meta.check)], ['Follow-on investments', meta.followSlots + ' at ' + money(meta.followCheck)],
        ['Carry', '20%, or 25% above 3x'], ['Preferred return', 'About 8% a year'], ['Investment period', '36 months'], ['Diligence calls', String(meta.credits)]
      ]);
      rules = [
        'You are a general partner. 50 companies will be presented over 36 months, already screened to fit the fund.',
        'Make up to ' + meta.slots + ' initial investments of ' + money(meta.check) + '. Capital you do not invest still pays fees.',
        'Every 10 companies, your portfolio companies send updates. Decide which ones get one of your ' + meta.followSlots + ' follow-on checks of ' + money(meta.followCheck) + '.',
        'Your fund is judged on what LPs receive after fees and carry, compared with 1,000 random funds built from the same deals.',
        'Every decision is final. You can save and come back at any point.'
      ];
    } else {
      facts = facts.concat([
        ['Your check per company', money(meta.check)], [track === 'analyst' ? 'Companies to advance' : 'Investments to make', String(meta.slots)], ['Diligence calls', String(meta.credits)]
      ]);
      rules = track === 'analyst' ? [
        'You are an analyst. Read 50 deals and advance the ' + meta.slots + ' that deserve a partner meeting.',
        'Deals outside the thesis will never be approved. Advancing one wastes a slot.',
        'Diligence calls give you reference and customer calls on a company. You have ' + meta.credits + ' for the whole test.',
        'Give a reason for every call. After the 50 deals, you run due diligence on your shortlist and write a one-page memo for the investment committee.',
        'Every decision is final. You can save and come back at any point, at any stage.'
      ] : [
        'You are an associate. Choose ' + meta.slots + ' companies to invest in and rate your conviction in each one.',
        'Price matters. The same company can be a good deal at one valuation and a bad one at another.',
        'Diligence calls give you reference and customer calls on a company. You have ' + meta.credits + ' for the whole test.',
        'Give a reason for every call. After the 50 deals, you run due diligence on your investments and write a one-page memo for the investment committee.',
        'Every decision is final. You can save and come back at any point, at any stage.'
      ];
    }
    var factsHtml = '<dl class="facts">' + facts.map(function (f) { return '<div><dt>' + f[0] + '</dt><dd>' + esc(f[1]) + '</dd></div>'; }).join('') + '</dl>';
    var scoring = '<ul class="rules">' +
      '<li><b>Judgment</b> compares your picks with 2,000 random sets of the same size, using each company\'s expected return given what was knowable. Luck does not count, so a strong company that failed still counts in your favor.</li>' +
      '<li><b>Return</b> is what your picks actually earned, luck included.</li>' +
      (track === 'partner' ? '<li><b>Net TVPI</b> is what LPs get back for every dollar, after fees and carry.</li>' : '<li><b>Winners caught</b> counts the companies that returned 3x or more that you picked.</li>') +
      '</ul>';
    render(shell('tests', page(
      pageHead(trackName(track) + ' test ' + n, null, '<a href="#/tests/' + track + '">' + trackName(track) + ' tests</a>'),
      factsHtml +
      ((meta.thesis.groups || meta.thesis.focus) ? '<div class="thesis-box" style="margin-top:20px"><h3>Fund thesis</h3><p>' + esc(meta.thesis.text) + ' ' + stageText(meta) + ' rounds.</p></div>' : '') +
      (st ? '' : '<p class="small muted" style="margin-top:12px">Want different sectors? <a href="#/tests/' + track + '">Change your sector focus</a> before you start.</p>') +
      '<div class="grid-2" style="margin-top:24px"><section class="panel"><div class="panel-head"><h2>How this test works</h2></div><div class="panel-body"><ul class="rules">' + rules.map(function (r) { return '<li>' + esc(r) + '</li>'; }).join('') + '</ul></div></section>' +
      '<section class="panel"><div class="panel-head"><h2>How you are scored</h2></div><div class="panel-body">' + scoring + '</div></section></div>' +
      '<div style="margin-top:28px;display:flex;gap:12px;flex-wrap:wrap"><button class="btn btn-primary btn-lg" type="button" id="start">Start the test</button><a class="btn btn-secondary btn-lg" href="#/walkthrough">Watch the walkthrough first</a></div>'
    )));
    document.getElementById('start').addEventListener('click', function () {
      store.tests[key(track, n)] = { track: track, n: n, gen: 2, focus: store.focus || null, status: 'active', pos: 0, decisions: {}, dug: {}, followOns: {}, credits: meta.credits, checkpoint: false, startedAt: Date.now(), updatedAt: Date.now() };
      save();
      go('#/test/' + track + '/' + n + '/play');
    });
  }

  // ---------- Company card ----------
  function block(title, inner, wide) { return '<section class="co-block' + (wide ? ' wide' : '') + '"><h3>' + title + '</h3>' + inner + '</section>'; }
  function kv(rows) { return '<dl class="kv">' + rows.map(function (r) { return '<dt>' + esc(r[0]) + '</dt><dd>' + esc(r[1]) + '</dd>'; }).join('') + '</dl>'; }
  function companyHtml(c, meta, dug) {
    var t = c.terms;
    var terms = [['Round size', money(t.round)], ['Post-money valuation', money(t.post)], ['Your check', money(t.check)], ['Your ownership', pct(t.ownership)]];
    if (t.arrMultiple) terms.push(['Valuation to ARR', Math.round(t.arrMultiple) + 'x']);
    var d = E.dealDetails ? E.dealDetails(c, meta) : null;
    if (d) terms.push(['Raised before this round', d.prior]);
    var founders = d ? '<ul class="founders">' + d.founders.map(function (f) { return '<li><b>' + esc(f.name) + '</b>, ' + esc(f.role) + '<span>' + esc(f.bio) + '</span></li>'; }).join('') + '</ul>' : '';
    var deckBar = d ? '<div class="deck-bar"><button class="btn btn-secondary btn-sm" type="button" data-act="deck">View pitch deck</button><button class="btn btn-secondary btn-sm" type="button" data-act="talk">Read demo day transcript</button>' +
      '<span class="small muted">The founders\' own version. Compare it with the diligence notes.</span></div>' : '';
    return '<div class="co-head"><div><h2 id="co-name">' + esc(c.name) + '</h2><div class="co-tags"><span class="pill accent">' + c.stageLabel + '</span><span class="pill">' + esc(c.sectorLabel) + '</span><span class="pill">' + esc(c.location) + '</span></div></div>' +
      '<p class="co-month">Month ' + c.month + ' of 36</p></div>' +
      '<p class="co-pitch">' + esc(c.pitch) + '</p>' + deckBar +
      '<div class="co-grid">' +
        block('Team', '<p>' + esc(c.team.text) + '</p>' + founders + '<p class="small muted">' + c.team.fullTime + ' full-time people</p>') +
        (d ? block('Company', kv([['Founded', String(d.founded)], ['Business model', d.model], ['Typical price', d.priceText], ['Use of this round', d.use.map(function (u) { return u[0].toLowerCase() + ' ' + u[1] + '%'; }).join(', ')]])) : '') +
        block('Market', '<p>' + esc(c.market.text) + '</p>' + kv([['Market size estimate', money(c.market.tam)], ['Market growth per year', c.market.growth + '%']])) +
        block('Product and customers', '<p>' + esc(c.product.text) + '</p>') +
        block('Traction', kv(c.traction)) +
        block('Competition', '<p>' + esc(c.moat.text) + '</p><p class="small muted">' + c.moat.competitors + ' direct competitor' + (c.moat.competitors === 1 ? '' : 's') + '</p>') +
        block('Risks', c.risks.length ? '<ul class="risk-list">' + c.risks.map(function (r) { return '<li>' + esc(r) + '</li>'; }).join('') + '</ul>' : '<p class="muted">No major concentration, legal, or dependency risks found.</p>') +
        block('Round and terms', kv(terms)) +
        block('Notes from the diligence team', '<ul class="notes">' + c.notes.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</ul>') +
      '</div>' +
      (dug ? '<section class="co-block dig"><h3>Diligence calls</h3><p><b>References:</b> ' + esc(c.dig.refs) + '</p><p><b>Customers:</b> ' + esc(c.dig.calls) + '</p></section>' : '');
  }

  // ---------- Runner ----------
  function picksOf(st) { return Object.keys(st.decisions).filter(function (i) { return st.decisions[i].yes; }).map(Number); }

  function viewRunner(track, n) {
    var test = getTest(track, n), meta = test.meta, T = E.TRACKS[track];
    var st = testState(track, n);
    setKeys(null);
    document.title = trackName(track) + ' test ' + n + ' | VentureSim';
    if (st.checkpoint) return viewCheckpoint(track, n);
    if (st.pos >= 50) {
      if (track !== 'partner' && VSApp.dealStage) return VSApp.dealStage(track, n);
      return finishTest(track, n);
    }
    var c = test.companies[st.pos];
    var needReason = track !== 'partner';
    var picks = picksOf(st), full = picks.length >= meta.slots;
    var follows = Object.keys(st.followOns).filter(function (i) { return st.followOns[i] === true; }).length;
    var left = 50 - st.pos;

    var metaBar = '<span>Company <b>' + (st.pos + 1) + '</b> of 50</span><span>' + (track === 'analyst' ? 'Advanced' : 'Invested') + ' <b>' + picks.length + '</b> of ' + meta.slots + '</span>' +
      (track === 'partner' ? '<span>Follow-ons <b>' + follows + '</b> of ' + meta.followSlots + '</span>' : '') +
      '<span>Diligence calls left <b>' + st.credits + '</b></span>';
    var conv = T.conviction ? '<label id="conv-l">Conviction</label><div class="conv" role="radiogroup" aria-labelledby="conv-l">' +
      [[1, 'Low'], [2, 'Medium'], [3, 'High']].map(function (o) { return '<input type="radio" name="conv" id="cv' + o[0] + '" value="' + o[0] + '"' + (o[0] === 2 ? ' checked' : '') + '><label for="cv' + o[0] + '">' + o[1] + '</label>'; }).join('') + '</div>' : '';
    var pace = !full && left <= meta.slots - picks.length ? '<p class="small" style="color:var(--warn);margin-top:10px">Only ' + left + ' companies left for ' + (meta.slots - picks.length) + ' open slots.</p>' : '';
    var fullNote = full ? '<p class="small muted" style="margin-top:10px">All ' + meta.slots + ' slots are used. Let go of the remaining companies, or finish now.</p><button class="btn btn-secondary btn-sm" type="button" data-act="rest" style="margin-top:8px">Let go of the rest and finish</button>' : '';
    var picksList = picks.length ? '<ul class="picked-list">' + picks.map(function (i) { return '<li>' + esc(test.companies[i].name) + ' <span class="muted">' + esc(test.companies[i].sectorLabel) + '</span></li>'; }).join('') + '</ul>' : '<p class="small muted">None yet.</p>';

    root.innerHTML = '<div class="runner-bar"><div class="inner"><h1 tabindex="-1">' + trackName(track) + ' test ' + n + ': ' + money(meta.fundSize) + ' fund</h1><div class="meta">' + metaBar + '</div>' +
      '<a class="btn btn-secondary btn-sm" href="#/tests/' + track + '">Save and exit</a></div><div class="progress" aria-hidden="true"><i style="width:' + (st.pos / 50 * 100) + '%"></i></div></div>' +
      '<main id="main" class="runner">' +
        '<article aria-labelledby="co-name">' + companyHtml(c, meta, st.dug[c.i]) + '</article>' +
        '<aside class="decide" aria-label="Your decision">' +
          '<div class="decide-box"><h2>Your call</h2>' + conv +
            '<div class="decide-buttons" style="margin-top:' + (T.conviction ? '14px' : '0') + '"><button class="btn btn-bad" type="button" data-act="no">' + T.no + '</button>' +
            '<button class="btn btn-good" type="button" data-act="yes"' + (full ? ' disabled' : '') + '>' + T.yes + '</button></div>' + pace + fullNote +
            '<fieldset class="reasons"><legend>Main reason' + (needReason ? ' (pick at least one)' : ' (optional)') + '</legend>' +
              REASONS.map(function (x, k) { return '<label class="chip-check"><input type="checkbox" name="why" value="' + x[0] + '"><span>' + x[1] + ' <kbd>' + (k + 1) + '</kbd></span></label>'; }).join('') + '</fieldset>' +
            '<p class="form-error" id="reason-err" role="alert"></p>' +
            '<label for="reason">Notes (optional, shown in your debrief)</label><textarea id="reason" maxlength="500"></textarea>' +
            '<p class="keys"><kbd>Y</kbd> ' + T.yes.toLowerCase() + ', <kbd>N</kbd> ' + T.no.toLowerCase() + ', <kbd>1</kbd> to <kbd>8</kbd> reasons, <kbd>D</kbd> diligence calls</p></div>' +
          '<div class="decide-box"><h2>Diligence calls</h2><p class="small muted">Reference and customer calls give a clearer read on the team and the product. ' + st.credits + ' left for this test.</p>' +
            '<button class="btn btn-secondary btn-sm" type="button" data-act="dig" style="margin-top:10px"' + (st.dug[c.i] || st.credits < 1 ? ' disabled' : '') + '>' + (st.dug[c.i] ? 'Calls done for this company' : 'Make calls (uses 1)') + '</button></div>' +
          ((meta.thesis.groups || meta.thesis.focus) ? '<div class="thesis-box"><h3>Fund thesis</h3><p>' + esc(meta.thesis.text) + '</p><p class="small muted">' + stageText(meta) + ' rounds</p></div>' : '') +
          '<div class="decide-box"><h2>Your picks</h2>' + picksList + '</div>' +
        '</aside></main>';
    root.querySelector('.runner-bar h1').focus({ preventScroll: true });
    window.scrollTo(0, 0);

    function decide(yes) {
      if (yes && picksOf(st).length >= meta.slots) return;
      var d = { yes: yes };
      var whys = Array.prototype.map.call(root.querySelectorAll('input[name=why]:checked'), function (i) { return i.value; });
      if (needReason && !whys.length) {
        document.getElementById('reason-err').textContent = 'Pick at least one reason for ' + (yes ? (track === 'analyst' ? 'advancing' : 'investing in') : 'letting go of') + ' ' + c.name + '.';
        root.querySelector('input[name=why]').focus();
        return;
      }
      if (whys.length) d.reasons = whys;
      var r = document.getElementById('reason').value.trim();
      if (r) d.reason = r;
      if (yes && T.conviction) { var cv = root.querySelector('input[name=conv]:checked'); d.conviction = cv ? +cv.value : 2; }
      st.decisions[c.i] = d;
      st.pos++;
      st.updatedAt = Date.now();
      if (track === 'partner' && st.pos % 10 === 0 && eligibleUpdates(test, st).length) st.checkpoint = true;
      save();
      viewRunner(track, n);
    }
    root.querySelector('.runner').addEventListener('click', function (e) {
      var b = e.target.closest('[data-act]');
      if (!b || b.disabled) return;
      var act = b.getAttribute('data-act');
      if (act === 'yes') decide(true);
      else if (act === 'no') decide(false);
      else if (act === 'deck' || act === 'talk') { if (VSApp.openDeck) VSApp.openDeck(c, meta, act); }
      else if (act === 'dig') {
        if (st.credits < 1 || st.dug[c.i]) return;
        st.credits--; st.dug[c.i] = true; save();
        var reason = document.getElementById('reason').value;
        viewRunner(track, n);
        document.getElementById('reason').value = reason;
        var dig = root.querySelector('.dig'); if (dig) dig.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } else if (act === 'rest') {
        if (!confirm('Let go of the remaining ' + left + ' companies? This cannot be undone.')) return;
        for (var i = st.pos; i < 50; i++) st.decisions[test.companies[i].i] = { yes: false, reasons: ['slots'] };
        st.pos = 50;
        if (track === 'partner' && eligibleUpdates(test, st).length) st.checkpoint = true;
        save();
        viewRunner(track, n);
      }
    });
    setKeys(function (e) {
      if (e.target.closest && e.target.closest('textarea, input:not([type=checkbox]):not([type=radio]), select')) return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      var k = e.key.toLowerCase();
      if (/^[1-8]$/.test(k)) { var cb = root.querySelectorAll('input[name=why]')[+k - 1]; if (cb) { e.preventDefault(); cb.checked = !cb.checked; } return; }
      if (k === 'y') { e.preventDefault(); if (!full) decide(true); }
      else if (k === 'n') { e.preventDefault(); decide(false); }
      else if (k === 'd') { var b = root.querySelector('[data-act=dig]'); if (b && !b.disabled) { e.preventDefault(); b.click(); } }
    });
  }

  function eligibleUpdates(test, st) {
    var final = st.pos >= 50;
    return picksOf(st).filter(function (i) { return st.followOns[i] === undefined && (final || i < st.pos - 3); });
  }

  function viewCheckpoint(track, n) {
    var test = getTest(track, n), meta = test.meta, st = testState(track, n);
    var list = eligibleUpdates(test, st);
    if (!list.length) { st.checkpoint = false; save(); return viewRunner(track, n); }
    var used = Object.keys(st.followOns).filter(function (i) { return st.followOns[i] === true; }).length;
    var leftSlots = meta.followSlots - used;
    var month = st.pos >= 50 ? 36 : test.companies[Math.min(st.pos, 49)].month;
    var choices = st.pendingFollow || {};
    var chosenYes = Object.keys(choices).filter(function (i) { return choices[i] === true; }).length;
    var cards = list.map(function (i) {
      var c = test.companies[i], u = c.hidden.update, ch = choices[i];
      var canYes = ch === true || chosenYes < leftSlots;
      return '<article class="update-card"><div><h3>' + esc(c.name) + ' <span class="pill">' + c.stageLabel + '</span></h3><ul><li>' + esc(u.revenue) + '</li><li>' + esc(u.news) + '</li><li>' + esc(u.round) + '</li></ul></div>' +
        '<div class="choice" role="group" aria-label="Follow-on for ' + esc(c.name) + '">' +
          '<button class="btn btn-sm ' + (ch === false ? 'btn-primary' : 'btn-secondary') + '" type="button" data-f="' + i + '" data-v="0" aria-pressed="' + (ch === false) + '">No follow-on</button>' +
          '<button class="btn btn-sm ' + (ch === true ? 'btn-good' : 'btn-secondary') + '" type="button" data-f="' + i + '" data-v="1" aria-pressed="' + (ch === true) + '"' + (canYes ? '' : ' disabled') + '>Follow on ' + money(meta.followCheck) + '</button></div></article>';
    }).join('');
    var allChosen = list.every(function (i) { return choices[i] !== undefined; });
    root.innerHTML = '<div class="runner-bar"><div class="inner"><h1 tabindex="-1">Portfolio update, month ' + month + '</h1><div class="meta"><span>Follow-on checks left <b>' + (leftSlots - chosenYes) + '</b> of ' + meta.followSlots + '</span></div>' +
      '<a class="btn btn-secondary btn-sm" href="#/tests/' + track + '">Save and exit</a></div><div class="progress" aria-hidden="true"><i style="width:' + (st.pos / 50 * 100) + '%"></i></div></div>' +
      '<main id="main" class="page"><p class="muted" style="margin-bottom:20px">These portfolio companies are raising their next round. Decide which ones get a follow-on check. Updates are the best information you will get on how a company is really doing.</p>' +
      cards + '<div style="margin-top:24px"><button class="btn btn-primary btn-lg" type="button" id="cont"' + (allChosen ? '' : ' disabled') + '>' + (st.pos >= 50 ? 'Finish the test' : 'Back to the pipeline') + '</button>' +
      (allChosen ? '' : '<p class="small muted" style="margin-top:8px">Make a call on every company to continue.</p>') + '</div></main>';
    root.querySelector('h1').focus({ preventScroll: true });
    root.querySelector('main').addEventListener('click', function (e) {
      var b = e.target.closest('[data-f]');
      if (b && !b.disabled) {
        st.pendingFollow = st.pendingFollow || {};
        st.pendingFollow[b.getAttribute('data-f')] = b.getAttribute('data-v') === '1';
        save();
        var y = window.scrollY; viewCheckpoint(track, n); window.scrollTo(0, y);
        var again = root.querySelector('[data-f="' + b.getAttribute('data-f') + '"][data-v="' + b.getAttribute('data-v') + '"]'); if (again) again.focus();
      }
    });
    document.getElementById('cont').addEventListener('click', function () {
      list.forEach(function (i) { st.followOns[i] = !!(st.pendingFollow || {})[i]; });
      st.pendingFollow = {};
      st.checkpoint = false;
      st.updatedAt = Date.now();
      save();
      viewRunner(track, n);
    });
  }

  function finishTest(track, n) {
    var test = getTest(track, n), st = testState(track, n);
    var res = E.scoreTest(test, st);
    if (VSApp.extendResult) VSApp.extendResult(res, test, st);
    st.result = res;
    st.status = 'done';
    st.finishedAt = Date.now();
    save();
    go('#/results/' + track + '/' + n);
  }

  // ---------- Results ----------
  function viewResults(track, n) {
    var st = testState(track, n);
    if (!st || st.status !== 'done') return go('#/tests/' + track);
    var test = getTest(track, n), meta = test.meta, r = st.result, T = E.TRACKS[track];
    document.title = trackName(track) + ' test ' + n + ' debrief | VentureSim';
    var scores;
    if (track === 'partner') {
      scores = [
        ['Judgment', r.judgment, 'Better picks than ' + r.judgment + '% of random sets'],
        ['Net TVPI to LPs', mult(r.fund.netTvpi), 'Beat ' + r.fundPercentile + '% of 1,000 random funds'],
        ['Gross multiple', mult(r.fund.grossMoic), money(r.fund.deployed) + ' invested'],
        ['Follow-on return', r.follows ? mult(r.followMultiple) : 'None', 'Average available: ' + mult(r.offeredFollowMultiple)]
      ];
    } else {
      scores = [
        ['Judgment', r.judgment, 'Better picks than ' + r.judgment + '% of random sets'],
        ['Return on picks', mult(r.portfolioMultiple), 'Average multiple, luck included'],
        ['Winners caught', r.caught + ' of ' + r.winners, 'Companies that returned 3x or more'],
        track === 'associate' ? ['Thesis errors', r.thesisErrors, r.thesisErrors ? 'Picks outside the thesis' : 'All picks inside the thesis'] : ['Thesis errors', r.thesisErrors, r.thesisErrors ? 'Advanced outside the thesis' : 'All picks inside the thesis']
      ];
    }
    var scoreHtml = '<dl class="score-row">' + scores.map(function (s) { return '<div class="score"><dt>' + s[0] + '</dt><dd>' + s[1] + '</dd><small>' + s[2] + '</small></div>'; }).join('') + '</dl>';

    var lessons = '<ul class="lessons">' + r.lessons.map(function (l) {
      var m = lessonById(l.module);
      return '<li><p>' + esc(l.text) + '</p>' + (m ? '<a href="#/course/' + m.slug + '">Read lesson ' + m.id + ': ' + esc(m.title) + '</a>' : '') + '</li>';
    }).join('') + '</ul>';

    // Signals: what you leaned on vs what mattered at this stage.
    var maxE = Math.max.apply(null, E.FACTORS.map(function (f) { return Math.abs(r.emphasis[f]); })) || 1;
    var maxW = Math.max.apply(null, E.FACTORS.map(function (f) { return r.weights[f]; }));
    var signals = '<table class="test-table"><thead><tr><th>Signal</th><th>How much it mattered at this stage</th><th>How much your picks leaned on it</th></tr></thead><tbody>' +
      E.FACTORS.map(function (f) {
        var w = r.weights[f] / maxW * 100, e = r.emphasis[f] / maxE * 100;
        return '<tr><td>' + E.FACTOR_LABEL[f] + '</td><td><div class="bar" style="max-width:220px"><i style="width:' + w.toFixed(0) + '%"></i></div></td>' +
          '<td><div class="bar" style="max-width:220px"><i style="width:' + Math.max(0, e).toFixed(0) + '%;background:' + (e < 0 ? 'var(--bad)' : 'var(--good)') + '"></i></div>' + (e < 0 ? '<span class="small muted">Your picks were weaker here than the ones you let go</span>' : '') + '</td></tr>';
      }).join('') + '</tbody></table>';

    var rows = test.companies.map(function (c) {
      var d = st.decisions[c.i] || { yes: false };
      var h = c.hidden, follow = st.followOns[c.i];
      var tags = [];
      if (!c.inThesis) tags.push('outside thesis');
      if (h.multiple >= 3 && c.inThesis && !d.yes) tags.push('missed');
      return { c: c, d: d, html: '<tr data-pick="' + (d.yes ? 1 : 0) + '" data-missed="' + (tags.indexOf('missed') > -1 ? 1 : 0) + '" data-off="' + (c.inThesis ? 0 : 1) + '">' +
        '<td><b>' + esc(c.name) + '</b><small>' + c.stageLabel + ', ' + esc(c.sectorLabel) + (c.inThesis ? '' : ', outside thesis') + '</small></td>' +
        '<td>' + (d.yes ? '<span class="pill good">' + T.past.yes + (d.conviction ? ', ' + ['', 'low', 'medium', 'high'][d.conviction] : '') + '</span>' : '<span class="pill">' + T.past.no + '</span>') +
          (follow === true ? '<small>Followed on</small>' : follow === false ? '<small>No follow-on</small>' : '') + (d.dropped ? '<small>Dropped after due diligence</small>' : '') +
          (d.reasons ? '<small>Reasons: ' + d.reasons.map(function (x) { return x === 'slots' ? 'slots were full' : (REASONS.filter(function (y) { return y[0] === x; })[0] || [0, x])[1].toLowerCase(); }).join(', ') + '</small>' : '') +
          (d.reason ? '<small>"' + esc(d.reason) + '"</small>' : '') + '</td>' +
        '<td>' + esc(h.outcome) + '</td>' +
        '<td class="mult" style="color:' + (h.multiple >= 1 ? 'var(--good)' : 'var(--bad)') + '">' + mult(h.multiple) + '</td>' +
        '<td><details><summary>Why</summary>' + h.mattered.map(function (x) { return '<p>' + esc(x.text) + '</p>'; }).join('') + '</details></td></tr>' };
    });
    var table = '<div class="filter" role="group" aria-label="Filter companies">' +
      '<button type="button" data-filter="all" aria-pressed="true">All 50</button><button type="button" data-filter="pick" aria-pressed="false">Your picks</button>' +
      '<button type="button" data-filter="missed" aria-pressed="false">Missed winners</button>' + ((meta.thesis.groups || (meta.thesis.focus && track !== 'partner')) ? '<button type="button" data-filter="off" aria-pressed="false">Outside thesis</button>' : '') + '</div>' +
      '<div class="table-wrap"><table class="test-table result-table"><thead><tr><th>Company</th><th>Your call</th><th>What happened</th><th>Multiple</th><th>Why</th></tr></thead><tbody>' +
      rows.map(function (x) { return x.html; }).join('') + '</tbody></table></div>';

    var nextN = n < 50 ? n + 1 : null;
    var actions = '<div style="display:flex;gap:12px;flex-wrap:wrap;margin-top:28px">' + (nextN ? '<a class="btn btn-primary btn-lg" href="#/test/' + track + '/' + nextN + '">Next: test ' + nextN + ', ' + money(E.fundSize(nextN)) + ' fund</a>' : '') +
      '<a class="btn btn-secondary btn-lg" href="#/report/' + track + '/' + n + '">Read the LP report</a>' +
      '<a class="btn btn-secondary btn-lg" href="#/tests/' + track + '">Back to ' + trackName(track) + ' tests</a></div>';

    render(shell('tests', page(
      pageHead(trackName(track) + ' test ' + n + ' debrief', money(meta.fundSize) + ' fund, ' + stageText(meta) + '. You ' + (track === 'analyst' ? 'advanced ' : 'invested in ') + r.picks + ' of 50 companies' + (r.dug ? ' and made diligence calls on ' + r.dug : '') + '.', '<a href="#/tests/' + track + '">' + trackName(track) + ' tests</a>'),
      scoreHtml + (VSApp.resultExtras ? VSApp.resultExtras(track, n, test, st) : '') +
      (r.conviction ? '<p class="small muted" style="margin-top:12px">By conviction: ' + [3, 2, 1].map(function (k) { var c = r.conviction[k]; return ['', 'low', 'medium', 'high'][k] + ' ' + (c ? c.count + ' picks returned ' + mult(c.multiple) : 'no picks'); }).join(', ') + '.</p>' : '') +
      (r.fund ? '<p class="small muted" style="margin-top:12px">Carry paid to the GPs: ' + money(r.fund.carry) + '. Capital left uninvested: ' + money(r.fund.undeployed) + '. Initial investments made by month 24: ' + r.by24 + ' of ' + meta.slots + '.</p>' : '') +
      '<section class="panel" style="margin-top:24px"><div class="panel-head"><h2>What to work on</h2></div><div class="panel-body">' + lessons + '</div></section>' +
      '<section class="panel" style="margin-top:20px"><div class="panel-head"><h2>Signals</h2></div><div class="panel-body"><p class="small muted" style="margin-bottom:12px">Left: how much each signal predicted outcomes at the ' + E.STAGES[meta.stages[0]].label + ' stage. Right: how much stronger your picks were on that signal than the companies you let go.</p>' + signals + '</div></section>' +
      '<section style="margin-top:28px"><h2 style="font-size:20px;margin-bottom:12px">Every company</h2>' + table + '</section>' + actions +
      '<div id="fb-slot" style="margin-top:28px"></div>'
    )));
    if (VSApp.feedbackBox) VSApp.feedbackBox(document.getElementById('fb-slot'), { where: trackName(track) + ' test ' + n, key: key(track, n) });
    root.querySelector('.filter').addEventListener('click', function (e) {
      var b = e.target.closest('[data-filter]'); if (!b) return;
      var f = b.getAttribute('data-filter');
      this.querySelectorAll('button').forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); });
      root.querySelectorAll('.result-table tbody tr').forEach(function (tr) {
        tr.hidden = f === 'all' ? false : tr.getAttribute('data-' + f) !== '1';
      });
    });
  }

  // ---------- Example (no account, instant feedback) ----------
  function viewExample() {
    document.title = 'Example test | VentureSim';
    var test = E.generateExample(), meta = test.meta, T = E.TRACKS.analyst;
    var st = { pos: 0, decisions: {}, dug: {}, credits: meta.credits, picks: 0, right: 0 };
    // The strongest cases are the two in-thesis companies with the best expected return.
    var strong = {};
    test.companies.filter(function (c) { return c.inThesis; }).sort(function (a, b) { return b.hidden.ev - a.hidden.ev; })
      .slice(0, meta.slots).forEach(function (c) { strong[c.i] = true; });
    function draw(feedback) {
      if (st.pos >= test.companies.length) return done();
      var c = test.companies[st.pos];
      var full = st.picks >= meta.slots;
      render(shell('tests', '<div class="runner-bar"><div class="inner"><h1>Example test: 6 startups, ' + money(meta.fundSize) + ' fund</h1><div class="meta"><span>Company <b>' + (st.pos + 1) + '</b> of 6</span><span>Advanced <b>' + st.picks + '</b> of ' + meta.slots + '</span><span>Diligence calls left <b>' + st.credits + '</b></span></div></div></div>' +
        '<div class="runner"><article>' + companyHtml(c, meta, st.dug[c.i]) + (feedback || '') + '</article>' +
        '<aside class="decide" aria-label="Your decision"><div class="decide-box"><h2>Your call</h2>' +
          (feedback ? '<p class="small muted">Decision made. See what happened on the left.</p>' :
          '<div class="decide-buttons"><button class="btn btn-bad" type="button" data-act="no">' + T.no + '</button><button class="btn btn-good" type="button" data-act="yes"' + (full ? ' disabled' : '') + '>' + T.yes + '</button></div>' +
          (full ? '<p class="small muted" style="margin-top:10px">Both slots are used.</p>' : '')) +
          '<p class="keys">In a real test you only see outcomes in the debrief. The example shows them right away.</p></div>' +
          '<div class="decide-box"><h2>Diligence calls</h2><button class="btn btn-secondary btn-sm" type="button" data-act="dig"' + (st.dug[c.i] || st.credits < 1 || feedback ? ' disabled' : '') + '>' + (st.dug[c.i] ? 'Calls done' : 'Make calls (uses 1)') + '</button></div>' +
          '<div class="thesis-box"><h3>Fund thesis</h3><p>' + esc(meta.thesis.text) + '</p><p class="small muted">Advance 2 of these 6 companies.</p></div></aside></div>'), false);
      window.scrollTo(0, 0);
      root.querySelector('.runner').addEventListener('click', function (e) {
        var b = e.target.closest('[data-act]'); if (!b || b.disabled) return;
        var a = b.getAttribute('data-act');
        if (a === 'dig') { st.credits--; st.dug[c.i] = true; draw(); return; }
        if (a === 'next') { st.pos++; draw(); return; }
        var yes = a === 'yes', h = c.hidden;
        if (yes) st.picks++;
        var won = h.multiple >= 1, verdict, good;
        if (!c.inThesis) { good = !yes; verdict = yes ? 'Outside the thesis.' : 'Good call. It was outside the thesis.'; }
        else if (yes) { good = strong[c.i]; verdict = good ? (won ? 'Good call.' : 'Reasonable call. It did not work out.') : (won ? 'Lucky call. The case for it was weak.' : 'Missed it.'); }
        else { good = !strong[c.i]; verdict = good ? (h.multiple >= 1.5 ? 'Reasonable to let it go. It got lucky.' : 'Good call to let it go.') : (won ? 'Missed it.' : 'The case for it was strong, even though it failed.'); }
        if (good) st.right++;
        var why = !c.inThesis ? '<p><b>' + esc(c.miss) + '</b> This fund could never invest, whatever the outcome.</p>' : '';
        draw('<div class="feedback ' + (good ? 'good' : 'bad') + '" role="status"><h3>' + verdict + '</h3><p>' + esc(h.outcome) + '</p>' + why +
          h.mattered.map(function (x) { return '<p>' + esc(x.text) + '</p>'; }).join('') +
          '<button class="btn btn-primary" type="button" data-act="next">' + (st.pos === test.companies.length - 1 ? 'See your summary' : 'Next company') + '</button></div>');
        var fb = root.querySelector('.feedback'); if (fb) { fb.scrollIntoView({ behavior: 'smooth', block: 'center' }); fb.querySelector('button').focus({ preventScroll: true }); }
      });
    }
    function done() {
      render(shell('tests', page(pageHead('Example finished', 'You made ' + st.right + ' good calls out of 6.'),
        '<p style="max-width:40em">A good call is about the evidence, not the outcome. A strong company can still fail, and a weak one can get lucky. A real test has 50 companies, a fund that grows with every test, and a full debrief: your judgment compared with random picks, the companies you missed, and which signals you leaned on. You will not see outcomes until the end, just like a real fund.</p>' +
        '<div style="display:flex;gap:12px;flex-wrap:wrap;margin-top:24px">' + (store.profile ? '<a class="btn btn-primary btn-lg" href="#/tests">Go to your tests</a>' : '<a class="btn btn-primary btn-lg" href="#/signup">Create account</a>') + '<a class="btn btn-secondary btn-lg" href="#/example" id="again">Try the example again</a></div>')));
      document.getElementById('again').addEventListener('click', function (e) { e.preventDefault(); viewExample(); });
    }
    draw();
  }

  // ---------- Course ----------
  var COURSE_INFO = {
    vc: { name: 'VC course', path: '#/course', sub: 'Fourteen lessons on the 20% of venture capital that does most of the work. Eleven on theory, then three where you build a memo, a term sheet, and a cap table yourself.' },
    founder: { name: 'Founder course', path: '#/courses/founder', sub: 'Eight lessons for founders: how investors think, getting VC ready, getting into accelerators and residencies, raising your first round, and practice interview questions.' },
    portfolio: { name: 'Portfolio management course', path: '#/courses/portfolio', sub: 'Nine lessons on the work after the check: boards, monitoring, reserves and follow-ons, helping founders, hard times, and LP reporting. Plus the portfolio, platform, and community roles at venture firms.' }
  };
  function viewCourse(which) {
    which = COURSE_INFO[which] ? which : 'vc';
    var info = COURSE_INFO[which];
    document.title = info.name + ' | VentureSim';
    var list = COURSE.filter(function (m) { return m.course === which; });
    var parts = [];
    list.forEach(function (m) { if (parts.indexOf(m.part) === -1) parts.push(m.part); });
    var body = parts.map(function (part) {
      return '<h2 style="font:400 24px var(--serif);margin:28px 0 12px">' + esc(part) + '</h2><section class="panel"><ul class="check-list course-list">' +
        list.filter(function (m) { return m.part === part; }).map(function (m) {
          return '<li><span class="tick' + (store.course[m.slug] ? ' done' : '') + '" aria-hidden="true" style="margin-top:6px"></span><a href="#/course/' + m.slug + '"><b>' + m.n + '. ' + esc(m.title) + '</b><br><span class="small muted">' + esc(m.summary) + '</span></a><span class="small muted" style="white-space:nowrap">' + m.minutes + ' min</span></li>';
        }).join('') + '</ul></section>';
    }).join('');
    var tabs = '<nav class="tabs" aria-label="Courses"><a href="#/course"' + (which === 'vc' ? ' aria-current="page"' : '') + '>VC course</a><a href="#/courses/founder"' + (which === 'founder' ? ' aria-current="page"' : '') + '>Founder course</a><a href="#/courses/portfolio"' + (which === 'portfolio' ? ' aria-current="page"' : '') + '>Portfolio management</a></nav>';
    render(shell(which === 'founder' && !(store.profile && store.profile.kind === 'founder') ? 'course' : (which === 'vc' && store.profile && store.profile.kind === 'founder' ? 'course-vc' : 'course'),
      page(pageHead(info.name, info.sub), tabs + body)));
  }

  function loadLesson(slug, cb) {
    var have = window.GARAGE_LESSONS && window.GARAGE_LESSONS[slug];
    if (have) return cb(have);
    var s = document.createElement('script');
    s.src = 'assets/js/course/' + slug + '.js';
    s.onload = function () { cb((window.GARAGE_LESSONS || {})[slug] || null); };
    s.onerror = function () { cb(null); };
    document.head.appendChild(s);
  }

  function slugify(t) { return t.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''); }

  function viewLesson(slug) {
    var m = lessonBySlug(slug);
    if (!m) return go('#/course');
    document.title = m.title + ' | VentureSim';
    if (VSApp.lastLesson) VSApp.lastLesson(m);
    var siblings = COURSE.filter(function (x) { return x.course === m.course; });
    var info = COURSE_INFO[m.course];
    var head = '<header class="lesson-head"><p class="crumbs"><a href="' + info.path + '">' + info.name + '</a> / Lesson ' + m.n + ' of ' + siblings.length + ', ' + m.minutes + ' min read</p><h1>' + esc(m.title) + '</h1><p>' + esc(m.summary) + '</p></header>';
    render(shell('course', page('', head + '<p class="muted">Loading the lesson...</p>')));
    var wanted = location.hash;
    loadLesson(slug, function (L) {
      if (location.hash !== wanted) return;
      if (!L) { render(shell('course', page('', head + '<p class="feedback bad">This lesson could not be loaded. Check that the assets/js/course folder is next to app.html.</p>'))); return; }
      var at = siblings.indexOf(m), prev = siblings[at - 1], next = siblings[at + 1], read = !!store.course[m.slug];
      var shortHtml = '<section class="short-version" aria-labelledby="sv-h"><h2 id="sv-h">The short version</h2><ol>' + L.short.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</ol></section>';
      var body = document.createElement('div');
      body.innerHTML = L.body;
      var toc = [];
      body.querySelectorAll('h2').forEach(function (h) { h.id = 'l-' + slugify(h.textContent); toc.push([h.id, h.textContent]); });
      var tocHtml = '<nav class="lesson-toc" aria-label="On this page"><p>On this page</p><ol>' + toc.map(function (t) { return '<li><a href="#' + t[0] + '" data-jump="' + t[0] + '">' + esc(t[1]) + '</a></li>'; }).join('') + '</ol></nav>';
      var nav = '<div class="lesson-nav"><div>' + (prev ? '<a class="btn btn-secondary" href="#/course/' + prev.slug + '">Lesson ' + prev.n + '</a>' : '') + '</div>' +
        (store.profile ? '<button class="btn ' + (read ? 'btn-secondary' : 'btn-primary') + '" type="button" id="mark">' + (read ? 'Marked as read' : 'Mark as read') + '</button>' : '<a class="btn btn-primary" href="#/signup">Create an account to track progress</a>') +
        '<div>' + (next ? '<a class="btn btn-secondary" href="#/course/' + next.slug + '">Lesson ' + next.n + ': ' + esc(next.title) + '</a>' : (m.course === 'founder' ? '<a class="btn btn-secondary" href="founders.html#ask">Ask us a question</a>' : m.course === 'portfolio' ? '<a class="btn btn-secondary" href="break-into-vc.html#roles">Roles at a venture firm</a>' : '<a class="btn btn-secondary" href="#/workshops">Go to the workshops</a>')) + '</div></div>';
      var ws = m.workshop ? '<div class="scenario" style="margin-top:32px"><p><b>Practice it.</b> The ' + esc(m.title.toLowerCase()) + ' workshop starts with a short guided tour, then gives you a scenario to work through.</p><a class="btn btn-primary btn-sm" style="margin-top:10px" href="#/workshop/' + m.workshop + '">Open the workshop</a></div>' : '';
      render(shell('course', page('', head + '<div class="lesson-wrap"><div>' + shortHtml + '<article class="lesson">' + body.innerHTML + '</article>' + ws + nav + '</div>' + tocHtml + '</div>')));
      var bar = document.createElement('div');
      bar.className = 'reading-bar';
      bar.setAttribute('aria-hidden', 'true');
      document.body.appendChild(bar);
      var art = root.querySelector('.lesson'), links = root.querySelectorAll('.lesson-toc a');
      setScroll(function () {
        var r = art.getBoundingClientRect(), total = art.offsetHeight - window.innerHeight;
        bar.style.width = Math.max(0, Math.min(100, (-r.top / Math.max(total, 1)) * 100)) + '%';
        var current = null;
        toc.forEach(function (t) { var el = document.getElementById(t[0]); if (el && el.getBoundingClientRect().top < 140) current = t[0]; });
        links.forEach(function (a) { a.classList.toggle('on', a.getAttribute('data-jump') === current); });
      });
      root.querySelector('.lesson-toc').addEventListener('click', function (e) {
        var a = e.target.closest('[data-jump]');
        if (!a) return;
        e.preventDefault();
        var el = document.getElementById(a.getAttribute('data-jump'));
        if (el) { el.scrollIntoView({ behavior: 'smooth', block: 'start' }); el.setAttribute('tabindex', '-1'); el.focus({ preventScroll: true }); }
      });
      var mark = document.getElementById('mark');
      if (mark) mark.addEventListener('click', function () {
        store.course[m.slug] = !store.course[m.slug]; save();
        mark.textContent = store.course[m.slug] ? 'Marked as read' : 'Mark as read';
        mark.className = 'btn ' + (store.course[m.slug] ? 'btn-secondary' : 'btn-primary');
      });
    });
  }


  // ---------- Walkthrough ----------
  function viewWalkthrough() {
    document.title = 'Walkthrough | VentureSim';
    var steps = [
      ['Read the fund brief', 'Every test opens with the fund: its size, its thesis, how many companies you can pick, and the size of each check. Fund size rises with every test, so the stage of the companies changes as you go.'],
      ['Read each deal', 'Each company shows its pitch, team, market, product and customers, traction, competition, risks, and terms. Notes from the diligence team point out what stood out. There are no scores to lean on, so you read the evidence yourself.'],
      ['Use diligence calls carefully', 'You get a few diligence calls per test. Each one gives you reference calls on the founders and calls with customers, which are a clearer read than the pitch. Spend them on the close calls.'],
      ['Make the call', 'Advance or invest, or let it go. Associates also rate their conviction. Decisions are final, so think before you click. Keyboard shortcuts: Y, N, and D.'],
      ['Partners: manage the portfolio', 'Every 10 companies, the companies you backed send updates and ask for follow-on money. You have a fixed number of follow-on checks, so back the ones whose numbers moved.'],
      ['Read the debrief', 'At the end you see what happened to all 50 companies, your judgment score compared with random picks, what your picks actually returned, the winners you missed, and which signals you leaned on compared with what mattered. Each lesson links to the part of the course that covers it.']
    ];
    render(shell('walkthrough', page(pageHead('How a test works', 'Watch the walkthrough, or read the six steps below.'),
      '<div class="player" data-src="media/venturesim-walkthrough.mp4" data-poster="media/venturesim-walkthrough-poster.jpg"><button class="poster" type="button" aria-label="Play the walkthrough video"><span><span class="play-icon" aria-hidden="true"></span><b>Walkthrough: one full test</b><small>From the fund brief to the debrief</small></span></button></div>' +
      '<ol class="check-list panel" style="margin-top:28px">' + steps.map(function (s, k) { return '<li style="align-items:flex-start"><span class="pill accent">' + (k + 1) + '</span><div><b>' + s[0] + '</b><p class="muted small" style="margin-top:4px">' + s[1] + '</p></div></li>'; }).join('') + '</ol>' +
      '<div style="display:flex;gap:12px;flex-wrap:wrap;margin-top:24px"><a class="btn btn-primary" href="#/example">Try the example test</a><a class="btn btn-secondary" href="#/tests">Go to the tests</a></div>')));
  }

  // ---------- Library and glossary ----------
  function viewLibrary() {
    document.title = 'Library | VentureSim';
    var items = LIB.length ? LIB.map(function (d) {
      return '<div class="pdf-card"><div class="pdf-icon" aria-hidden="true">PDF</div><div><h3>' + esc(d.title) + '</h3><p>' + esc(d.source) + (d.pages ? ', ' + d.pages + ' pages' : '') + '</p><p>' + esc(d.about) + '</p></div>' +
        '<a class="btn btn-secondary btn-sm" href="' + esc(d.file) + '" target="_blank" rel="noopener">Open PDF</a></div>';
    }).join('') : '<p class="empty">No PDFs yet.</p>';
    render(shell('library', page(pageHead('Library', 'PDFs and references to keep. Open them in a new tab or save them for later.'),
      '<section class="panel">' + items + '</section>' +
      '<section class="panel" style="margin-top:20px"><div class="panel-body"><h2 style="font-size:18px">Searchable glossary</h2><p class="muted" style="margin-top:6px">Look up any term from the tests or the course.</p><a class="btn btn-secondary btn-sm" style="margin-top:12px" href="#/glossary">Open the glossary</a></div></section>' +
      '<p class="small muted" style="margin-top:20px">Adding a PDF: put the file in the <code>library</code> folder and add one entry to <code>library/library.js</code>. Only add files you have the right to share.</p>')));
  }

  function viewGlossary() {
    document.title = 'Glossary | VentureSim';
    render(shell('glossary', page(pageHead('Glossary', GLOSS.length + ' terms used in the tests and the course.'),
      '<label class="sr-only" for="q">Search the glossary</label><input class="search" id="q" type="search" placeholder="Search terms, for example dilution" autocomplete="off">' +
      '<dl class="gloss" id="gloss"></dl><p class="empty" id="none" hidden>No terms match that search.</p>')));
    var list = document.getElementById('gloss'), none = document.getElementById('none');
    function draw(q) {
      q = (q || '').toLowerCase().trim();
      var hits = GLOSS.filter(function (g) { return !q || g[0].toLowerCase().indexOf(q) > -1 || g[1].toLowerCase().indexOf(q) > -1; });
      list.innerHTML = hits.map(function (g) { return '<div><dt>' + esc(g[0]) + '</dt><dd>' + esc(g[1]) + '</dd></div>'; }).join('');
      none.hidden = hits.length > 0;
    }
    document.getElementById('q').addEventListener('input', function () { draw(this.value); });
    draw('');
  }

  // ---------- Profile ----------
  function viewProfile() {
    document.title = 'Profile | VentureSim';
    var p = store.profile;
    var done = TRACK_IDS.reduce(function (s, t) { return s + doneCount(t); }, 0);
    render(shell('profile', page(pageHead('Profile and progress', 'Your account and progress are saved in this browser on this device.'),
      '<form class="form panel panel-body" id="pf" style="max-width:none"><div class="grid-2"><div><label for="name">Name</label><input type="text" id="name" value="' + esc(p.name) + '" required></div>' +
      '<div><label for="email">Email</label><input type="email" id="email" value="' + esc(p.email || '') + '"></div>' +
      '<div><label for="phone">Phone number</label>' + (VSApp.phone ? VSApp.phone.html('phone', p.phone || '', p.phoneIso) : '<input type="text" id="phone" value="' + esc(p.phone || '') + '">') + '</div>' +
      '<div><label for="org">Organization</label><input type="text" id="org" value="' + esc(p.org || '') + '" placeholder="Type n/a if none"></div>' +
      '<div><label for="role">' + (p.kind === 'founder' ? 'What you are building' : 'What you do now') + '</label><input type="text" id="role" value="' + esc(p.kind === 'founder' ? (p.building || '') : (p.role || '')) + '"></div></div>' +
      '<div><label for="track">Main track</label><select id="track" class="search">' + TRACK_IDS.map(function (t) { return '<option value="' + t + '"' + (p.track === t ? ' selected' : '') + '>' + trackName(t) + '</option>'; }).join('') + '</select></div>' +
      '<p class="form-error" id="pf-msg" role="status"></p><div><button class="btn btn-primary" type="submit">Save changes</button></div></form>' +
      '<section class="panel" style="margin-top:20px"><div class="panel-head"><h2>Your data</h2></div><div class="panel-body stack">' +
        '<p>' + done + ' tests finished. Export a copy to move your progress to another device or keep a backup.</p>' +
        '<div style="display:flex;gap:12px;flex-wrap:wrap"><button class="btn btn-secondary" type="button" id="export">Export progress</button>' +
        '<label class="btn btn-secondary" for="import">Import progress</label><input type="file" id="import" accept="application/json" class="sr-only"></div><p class="form-error" id="form-error" role="alert"></p>' +
        '<hr style="border:0;border-top:1px solid var(--line)"><p><b>Sign out.</b> Your progress stays saved in this browser for when you log back in.</p><div><button class="btn btn-secondary" type="button" id="signout">Sign out</button></div>' +
        '<hr style="border:0;border-top:1px solid var(--line)"><p><b>Reset everything.</b> Deletes your account, all test results, and course progress from this browser.</p>' +
        '<div><button class="btn btn-bad" type="button" id="reset">Delete my progress</button></div></div></section>')));
    if (VSApp.phone) VSApp.phone.bind('phone');
    document.getElementById('pf').addEventListener('submit', function (e) {
      e.preventDefault();
      var name = document.getElementById('name').value.trim(), msg = document.getElementById('pf-msg');
      if (!name) { msg.textContent = 'Name cannot be empty.'; return; }
      p.name = name; p.email = document.getElementById('email').value.trim(); p.track = document.getElementById('track').value;
      if (VSApp.phone) { var ph = VSApp.phone.get('phone'); if (document.getElementById('phone').value.trim()) { p.phone = ph.value; p.phoneIso = ph.iso; } else p.phone = ''; }
      else p.phone = document.getElementById('phone').value.trim();
      p.org = document.getElementById('org').value.trim();
      if (p.kind === 'founder') p.building = document.getElementById('role').value.trim(); else p.role = document.getElementById('role').value.trim();
      save(); msg.style.color = 'var(--good)'; msg.textContent = 'Changes saved.';
    });
    document.getElementById('export').addEventListener('click', function () {
      var blob = new Blob([JSON.stringify(store, null, 2)], { type: 'application/json' });
      var a = document.createElement('a');
      a.href = URL.createObjectURL(blob); a.download = 'venturesim-progress.json';
      document.body.appendChild(a); a.click(); a.remove();
      setTimeout(function () { URL.revokeObjectURL(a.href); }, 1000);
    });
    document.getElementById('import').addEventListener('change', function (e) {
      if (!confirm('Importing replaces the progress saved in this browser. Continue?')) { e.target.value = ''; return; }
      importFile(e);
    });
    document.getElementById('signout').addEventListener('click', function () {
      var done = function () { store.signedOut = true; save(); location.href = 'index.html'; };
      if (window.VSAuth) window.VSAuth.signOut().then(done, done); else done();
    });
    document.getElementById('reset').addEventListener('click', function () {
      if (!confirm('Delete your account and all progress from this browser? This cannot be undone.')) return;
      store = { profile: null, tests: {}, course: {} }; save();
      location.href = 'index.html';
    });
  }

  window.VSApp = {
    routes: {},
    store: function () { return store; },
    setStore: function (s2) { store = s2; save(); },
    save: save, esc: esc, shell: shell, page: page, pageHead: pageHead, render: render, go: go, route: route,
    getTest: getTest, testState: testState, metaFor: metaFor, focusText: focusText, finishTest: finishTest, picksOf: picksOf, companyHtml: companyHtml, REASONS: REASONS, trackName: trackName, stageText: stageText, icon: icon, LOGO: LOGO,
    money: money, mult: mult, pct: pct, setKeys: setKeys, setScroll: setScroll, importFile: importFile,
    lessonBySlug: lessonBySlug, COURSE: COURSE, TRACK_IDS: TRACK_IDS, doneCount: doneCount, nextTest: nextTest
  };
  document.addEventListener('DOMContentLoaded', route);
})();
