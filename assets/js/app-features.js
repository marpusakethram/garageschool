// VentureSim app features: sign-up and log-in, founder home, LP reports, feedback,
// workshops with guided tours, the metrics guide, and the sector map.
(function () {
  'use strict';
  var A = window.VSApp, E = window.GarageEngine;
  if (!A) return;
  var esc = A.esc, money = A.money, mult = A.mult;
  var R = A.routes;

  var JOBS = [
    'Student (undergraduate)', 'Student (MBA or graduate)', 'Investment banking', 'Consulting', 'Private equity',
    'Venture capital (analyst or associate)', 'Venture capital (partner or principal)', 'Angel investor', 'Startup founder',
    'Startup employee or operator', 'Product manager', 'Software engineer', 'Sales or business development', 'Marketing',
    'Finance or accounting', 'Corporate development or strategy', 'Researcher or academic', 'Other'
  ];
  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  function phoneOk(p) { return (p.replace(/\D/g, '').length >= 7) && /^[0-9+()\-.\s]+$/.test(p); }
  function store() { return A.store(); }
  function val(id) { var el = document.getElementById(id); return el ? el.value.trim() : ''; }
  function setErr(msg, focusId) {
    var el = document.getElementById('form-error'); if (el) el.textContent = msg;
    if (focusId) { var f = document.getElementById(focusId); if (f) f.focus(); }
  }

  // ---------- Sign-up and log-in ----------
  var pending = null;   // { kind, uid, name, email, method }

  function authCard(inner, wide) {
    A.render('<div class="auth"><div class="auth-card' + (wide ? ' auth-wide' : '') + '">' + A.LOGO + inner + '</div></div>');
  }

  R.signup = function (parts) {
    document.title = 'Create account | VentureSim';
    var kind = parts[1] === 'founder' ? 'founder' : parts[1] === 'learner' ? 'learner' : null;
    if (!kind) {
      authCard('<h1>Create your account</h1><p>Tell us which describes you. You can use everything either way.</p>' +
        '<div class="choice-cards"><a class="choice-card" href="#/signup/learner" style="text-decoration:none"><b>I am learning venture capital</b><span>Take the tests, the VC course, and the workshops.</span></a>' +
        '<a class="choice-card" href="#/signup/founder" style="text-decoration:none"><b>I am a founder</b><span>Learn how investors think, get into an accelerator, and raise your first round.</span></a></div>' +
        '<p class="small muted" style="margin-top:20px">Already have an account? <a href="#/login">Log in</a>. Want a look first? <a href="#/example">Try the example test</a>.</p>', true);
      return;
    }
    pending = { kind: kind };
    methodScreen('signup');
  };

  R.login = function () {
    document.title = 'Log in | VentureSim';
    var s = store();
    if (!window.VSAuth.enabled()) {
      if (s.profile) {
        authCard('<h1>Welcome back, ' + esc(s.profile.name) + '</h1><p>Your progress is saved in this browser.</p><button class="btn btn-primary btn-lg" type="button" id="cont">Continue to your dashboard</button>');
        document.getElementById('cont').addEventListener('click', function () { s.signedOut = false; A.save(); A.go('#/'); });
      } else {
        authCard('<h1>Log in</h1><p>There is no VentureSim account in this browser yet. Accounts are saved on the device where you created them.</p>' +
          '<div class="form"><a class="btn btn-primary btn-lg" href="#/signup">Create an account</a>' +
          '<div><label for="import">Moved from another device? Import your progress file</label><input type="file" id="import" accept="application/json"></div>' +
          '<p class="form-error" id="form-error" role="alert"></p></div>');
        document.getElementById('import').addEventListener('change', A.importFile);
      }
      return;
    }
    pending = { kind: (s.profile && s.profile.kind) || 'learner' };
    methodScreen('login');
  };

  function methodScreen(mode) {
    var enabled = window.VSAuth.enabled(), prov = window.VSAuth.providers();
    var title = mode === 'login' ? 'Log in' : (pending.kind === 'founder' ? 'Create your founder account' : 'Create your account');
    var sso = '';
    if (enabled) {
      sso = '<div class="sso">' +
        (prov.indexOf('google') > -1 ? '<button class="btn btn-google" type="button" data-sso="google">Continue with Google</button>' : '') +
        (prov.indexOf('twitter') > -1 ? '<button class="btn btn-google" type="button" data-sso="twitter">Continue with X</button>' : '') +
        '</div><div class="divider">or use your email</div>' +
        '<form class="form" id="pw" novalidate style="max-width:none">' +
          '<div><label for="em">Email</label><input type="email" id="em" autocomplete="email"></div>' +
          '<div><label for="pass">Password</label><input type="password" id="pass" autocomplete="' + (mode === 'login' ? 'current-password' : 'new-password') + '"><p class="hint">' + (mode === 'login' ? '' : 'At least 8 characters.') + '</p></div>' +
          '<p class="form-error" id="form-error" role="alert"></p>' +
          '<button class="btn btn-primary btn-lg" type="submit">' + (mode === 'login' ? 'Log in' : 'Create account') + '</button></form>';
    } else {
      sso = '<p class="muted small" style="margin-bottom:16px">Your account and progress are saved in this browser.</p>';
    }
    var foot = mode === 'login'
      ? '<p class="small muted" style="margin-top:18px">New here? <a href="#/signup">Create an account</a>.</p>'
      : '<p class="small muted" style="margin-top:18px">Already have an account? <a href="#/login">Log in</a>. ' + (pending.kind === 'founder' ? '<a href="#/signup/learner">Sign up as a learner instead</a>.' : '<a href="#/signup/founder">Sign up as a founder instead</a>.') + '</p>';
    if (!enabled && mode === 'signup') return detailsScreen();
    authCard('<h1>' + title + '</h1><p>' + (mode === 'login' ? 'Welcome back.' : 'First, choose how you want to sign in.') + '</p>' + sso + foot, true);
    root().querySelectorAll('[data-sso]').forEach(function (b) {
      b.addEventListener('click', function () {
        setErr('');
        var fn = b.getAttribute('data-sso') === 'twitter' ? window.VSAuth.twitter : window.VSAuth.google;
        fn().then(function (u) { afterAuth(u, mode); }, function (e) { setErr(e.message); });
      });
    });
    var pw = document.getElementById('pw');
    if (pw) pw.addEventListener('submit', function (e) {
      e.preventDefault();
      var em = val('em'), pass = document.getElementById('pass').value;
      if (!EMAIL_RE.test(em)) return setErr('Enter a valid email address.', 'em');
      if (pass.length < 8) return setErr('Use a password with at least 8 characters.', 'pass');
      var fn = mode === 'login' ? window.VSAuth.emailSignIn : window.VSAuth.emailSignUp;
      fn(em, pass).then(function (u) { afterAuth(u, mode); }, function (err) { setErr(err.message); });
    });
  }

  function afterAuth(u, mode) {
    var s = store();
    if (s.profile && s.profile.uid === u.uid) { s.signedOut = false; A.save(); return A.go('#/'); }
    pending.uid = u.uid; pending.name = u.name; pending.email = u.email; pending.method = u.method;
    detailsScreen(mode === 'login');
  }

  function detailsScreen(fromLogin) {
    var founder = pending.kind === 'founder';
    var tracks = A.TRACK_IDS.map(function (t, k) {
      return '<label><input type="radio" name="track" value="' + t + '"' + (k === 0 ? ' checked' : '') + '><span><b>' + A.trackName(t) + '</b><span>' + esc(E.TRACKS[t].blurb) + '</span></span></label>';
    }).join('');
    var fields =
      '<div><label for="name">Your name</label><input type="text" id="name" autocomplete="name" value="' + esc(pending.name || '') + '"></div>' +
      '<div><label for="phone">Phone number</label><input type="tel" id="phone" autocomplete="tel" placeholder="+1 555 123 4567"></div>' +
      (founder || !pending.email ? '<div><label for="email">Email' + (founder ? '' : ' (optional)') + '</label><input type="email" id="email" autocomplete="email" value="' + esc(pending.email || '') + '"></div>' : '') +
      (founder
        ? '<div><label for="building">What are you building? (optional)</label><textarea id="building" placeholder="One or two sentences"></textarea></div>'
        : '<div><label for="role">What do you do now?</label><select id="role"><option value="">Choose one</option>' + JOBS.map(function (j) { return '<option>' + esc(j) + '</option>'; }).join('') + '</select></div>' +
          '<fieldset style="border:0;padding:0;margin:0"><legend style="font-weight:500;font-size:15px;margin-bottom:8px">Which track do you want to start with?</legend><div class="radio-cards">' + tracks + '</div></fieldset>');
    authCard('<h1>' + (fromLogin ? 'Finish setting up this device' : 'A few details') + '</h1><p>' + (founder ? 'So we can follow up on your questions and send you founder resources.' : 'So we can tailor VentureSim to where you are now.') + '</p>' +
      '<form class="form" id="details" novalidate style="max-width:none">' + fields +
      '<p class="consent">We save these details to contact you about VentureSim. We do not sell them or share them with anyone else.</p>' +
      '<p class="form-error" id="form-error" role="alert"></p>' +
      '<button class="btn btn-primary btn-lg" type="submit">' + (founder ? 'Create founder account' : 'Create account') + '</button></form>', true);
    document.getElementById('details').addEventListener('submit', function (e) {
      e.preventDefault();
      var name = val('name'), phone = val('phone'), email = val('email') || pending.email || '';
      if (!name) return setErr('Enter your name.', 'name');
      if (!phoneOk(phone)) return setErr('Enter a phone number with at least 7 digits.', 'phone');
      if (founder && !EMAIL_RE.test(email)) return setErr('Enter a valid email address so we can reply to you.', 'email');
      if (!founder && email && !EMAIL_RE.test(email)) return setErr('That email address does not look right. Fix it or leave it blank.', 'email');
      var profile = { kind: pending.kind, name: name, phone: phone, email: email, uid: pending.uid || null, method: pending.method || 'Browser only', createdAt: Date.now() };
      if (founder) { profile.building = val('building'); profile.track = 'analyst'; }
      else {
        profile.role = val('role');
        if (!profile.role) return setErr('Choose what you do now.', 'role');
        var t = document.querySelector('input[name=track]:checked'); profile.track = t ? t.value : 'analyst';
      }
      var s = store();
      s.profile = profile; s.signedOut = false; A.save();
      window.VSForms.send('signup', {
        'Account type': founder ? 'Founder' : 'Learner', 'Name': name, 'Phone number': phone, 'Email': email,
        'What they do now': founder ? 'Founder' : profile.role, 'What they are building': profile.building || '',
        'Sign-in method': profile.method, 'Starting track': founder ? '' : A.trackName(profile.track)
      });
      A.go('#/');
    });
  }
  function root() { return document.getElementById('root'); }

  // ---------- Founder home ----------
  R.founderHome = function () {
    var s = store(), p = s.profile;
    document.title = 'Dashboard | VentureSim';
    var lessons = A.COURSE.filter(function (m) { return m.course === 'founder'; });
    var next = lessons.filter(function (m) { return !s.course[m.slug]; })[0];
    var read = lessons.length - lessons.filter(function (m) { return !s.course[m.slug]; }).length;
    var list = lessons.map(function (m) {
      return '<li><span class="tick' + (s.course[m.slug] ? ' done' : '') + '" aria-hidden="true"></span><a href="#/course/' + m.slug + '">' + m.n + '. ' + esc(m.title) + '</a><span class="small muted">' + m.minutes + ' min</span></li>';
    }).join('');
    A.render(A.shell('home', A.page(A.pageHead('Welcome, ' + esc(p.name.split(' ')[0]), 'Your founder dashboard: the course, practice questions, and a direct line to ask us anything.'),
      (next ? '<div class="next-card"><div><h2>Next: ' + esc(next.title) + '</h2><p>' + esc(next.summary) + '</p></div><a class="btn btn-primary btn-lg" href="#/course/' + next.slug + '">Read lesson ' + next.n + '</a></div>'
            : '<div class="next-card"><div><h2>You finished the founder course</h2><p>Practice the interview questions again before your next meeting.</p></div><a class="btn btn-primary btn-lg" href="#/course/founder-interview-questions">Practice questions</a></div>') +
      '<div class="grid-2" style="margin-top:24px"><section class="panel"><div class="panel-head"><h2>Founder course</h2><span class="small muted">' + read + ' of ' + lessons.length + ' read</span></div><ul class="check-list">' + list + '</ul></section>' +
      '<div class="stack"><section class="panel panel-body"><h2 style="font:400 22px var(--serif)">Ask a question</h2><p class="muted" style="margin-top:6px">Stuck on your pitch, your terms, or which program to apply to? Send it and we will reply by email.</p><a class="btn btn-primary btn-sm" style="margin-top:12px" href="#/feedback/question">Ask a question</a></section>' +
      '<section class="panel panel-body"><h2 style="font:400 22px var(--serif)">See it from the other side</h2><p class="muted" style="margin-top:6px">Take an analyst test to read 50 deals the way investors do. It changes how you pitch.</p><a class="btn btn-secondary btn-sm" style="margin-top:12px" href="#/tests/analyst">Try an analyst test</a></section>' +
      '<section class="panel panel-body"><h2 style="font:400 22px var(--serif)">Know your metrics</h2><p class="muted" style="margin-top:6px">The numbers investors expect for your sector and subsector.</p><a class="btn btn-secondary btn-sm" style="margin-top:12px" href="#/metrics">Open the metrics guide</a></section></div></div>'
    )));
  };

  // ---------- Feedback ----------
  A.feedbackBox = function (slot, ctx) {
    if (!slot) return;
    var s = store(), sent = (s.feedback || {})[ctx.key];
    if (sent) { slot.innerHTML = '<section class="panel panel-body feedback-box"><p class="ok-msg">Thanks for your feedback on this test.</p></section>'; return; }
    slot.innerHTML = '<section class="panel feedback-box" aria-labelledby="fbh"><div class="panel-head"><h2 id="fbh">How was this test?</h2></div><div class="panel-body">' +
      '<form class="form" id="fbf" novalidate style="max-width:none"><div><label id="rate-l">Rate it from 1 to 5</label><div class="stars" role="group" aria-labelledby="rate-l">' +
      [1, 2, 3, 4, 5].map(function (n) { return '<button type="button" data-r="' + n + '" aria-pressed="false">' + n + '</button>'; }).join('') + '</div></div>' +
      '<div><label for="fbm">What should we improve? (optional)</label><textarea id="fbm" placeholder="Anything confusing, too easy, too hard, or missing"></textarea></div>' +
      '<p class="form-error" id="fb-err" role="alert"></p><div><button class="btn btn-primary" type="submit">Send feedback</button></div></form></div></section>';
    var rating = 0;
    slot.querySelectorAll('[data-r]').forEach(function (b) {
      b.addEventListener('click', function () { rating = +b.getAttribute('data-r'); slot.querySelectorAll('[data-r]').forEach(function (x) { x.setAttribute('aria-pressed', String(+x.getAttribute('data-r') <= rating)); }); });
    });
    slot.querySelector('#fbf').addEventListener('submit', function (e) {
      e.preventDefault();
      var msg = slot.querySelector('#fbm').value.trim();
      if (!rating && !msg) { slot.querySelector('#fb-err').textContent = 'Pick a rating or write a note.'; return; }
      var p = s.profile || {};
      window.VSForms.send('feedback', { 'Type': 'Test feedback', 'Name': p.name || '', 'Email': p.email || '', 'Phone number': p.phone || '', 'Rating (1 to 5)': rating || '', 'Where (test or page)': ctx.where, 'Message': msg });
      s.feedback = s.feedback || {}; s.feedback[ctx.key] = Date.now(); A.save();
      slot.innerHTML = '<section class="panel panel-body feedback-box"><p class="ok-msg" role="status">Sent. Thank you for helping us improve VentureSim.</p></section>';
    });
  };

  R.feedback = function (parts) {
    var question = parts[1] === 'question';
    document.title = (question ? 'Ask a question' : 'Send feedback') + ' | VentureSim';
    var p = store().profile || {};
    A.render(A.shell('feedback', A.page(A.pageHead(question ? 'Ask a question' : 'Send feedback', question ? 'Ask anything about raising money, accelerators, terms, or your pitch. We reply by email.' : 'Tell us what is working, what is not, or what you want next. It goes straight to the person who builds VentureSim.'),
      '<form class="form panel panel-body" id="gf" novalidate style="max-width:640px">' +
      '<div><label for="type">Type</label><select id="type">' + (question ? ['Founder question', 'General question'] : ['General feedback', 'Bug report', 'Feature idea', 'Founder question']).map(function (t) { return '<option>' + t + '</option>'; }).join('') + '</select></div>' +
      '<div class="grid-2"><div><label for="name">Name</label><input type="text" id="name" value="' + esc(p.name || '') + '"></div><div><label for="email">Email</label><input type="email" id="email" value="' + esc(p.email || '') + '"></div></div>' +
      '<div><label for="msg">' + (question ? 'Your question' : 'Your message') + '</label><textarea id="msg"></textarea></div>' +
      '<p class="form-error" id="form-error" role="alert"></p><div><button class="btn btn-primary" type="submit">' + (question ? 'Send question' : 'Send feedback') + '</button></div></form>')));
    document.getElementById('gf').addEventListener('submit', function (e) {
      e.preventDefault();
      var name = val('name'), email = val('email'), msg = val('msg');
      if (!msg) return setErr('Write your ' + (question ? 'question' : 'message') + ' first.', 'msg');
      if (!EMAIL_RE.test(email)) return setErr('Enter a valid email so we can reply.', 'email');
      window.VSForms.send('feedback', { 'Type': val('type'), 'Name': name, 'Email': email, 'Phone number': p.phone || '', 'Where (test or page)': 'App', 'Message': msg });
      this.outerHTML = '<div class="panel panel-body" style="max-width:640px"><p class="ok-msg" role="status">Sent. ' + (question ? 'We will reply to ' + esc(email) + '.' : 'Thank you.') + '</p><a class="btn btn-secondary btn-sm" style="margin-top:12px" href="#/">Back to the dashboard</a></div>';
    });
  };

  // ---------- LP report ----------
  function yearOf(t) { return 2026 + Math.floor(t); }
  function pctFmt(x) { return x == null ? 'n/a' : (x * 100).toFixed(1) + '%'; }
  function jCurve(years) {
    var w = 640, h = 220, pad = 36;
    var vals = years.map(function (y) { return y.cumulative; });
    var lo = Math.min(0, Math.min.apply(null, vals)), hi = Math.max(0, Math.max.apply(null, vals));
    var span = hi - lo || 1;
    var x = function (i) { return pad + i * (w - pad * 2) / (years.length - 1); };
    var y = function (v) { return h - pad - (v - lo) / span * (h - pad * 2); };
    var path = years.map(function (b, i) { return (i ? 'L' : 'M') + x(i).toFixed(1) + ' ' + y(b.cumulative).toFixed(1); }).join(' ');
    var zero = y(0);
    var labels = years.map(function (b, i) { return i % 2 === 0 ? '<text x="' + x(i) + '" y="' + (h - 10) + '" text-anchor="middle" font-size="11" fill="#8C877C">' + (2026 + b.year) + '</text>' : ''; }).join('');
    return '<svg viewBox="0 0 ' + w + ' ' + h + '" role="img" aria-label="Cumulative net cash flow to LPs by year"><line x1="' + pad + '" x2="' + (w - pad) + '" y1="' + zero + '" y2="' + zero + '" stroke="#CAC6B8" stroke-dasharray="4 4"/>' +
      '<text x="' + (pad - 6) + '" y="' + (zero + 4) + '" text-anchor="end" font-size="11" fill="#8C877C">0</text>' +
      '<path d="' + path + '" fill="none" stroke="#2350E8" stroke-width="2.5"/>' +
      years.map(function (b, i) { return '<circle cx="' + x(i) + '" cy="' + y(b.cumulative) + '" r="3" fill="#2350E8"/>'; }).join('') + labels + '</svg>';
  }
  function allocRows(rows, total) {
    return '<div class="alloc">' + rows.map(function (r) {
      return '<div class="alloc-row"><span>' + esc(r.name) + '</span><span class="track"><i style="width:' + (r.cost / total * 100).toFixed(1) + '%"></i></span><span>' + money(r.cost) + ', ' + mult(r.multiple) + '</span></div>';
    }).join('') + '</div>';
  }

  R.report = function (parts) {
    var track = parts[1], n = +parts[2];
    var st = A.testState(track, n);
    if (!st || st.status !== 'done') return A.go('#/tests/' + track);
    var test = A.getTest(track, n), rep = E.fundReport(test, st), meta = rep.meta, p = store().profile;
    document.title = meta.fundName + ' LP report | VentureSim';
    var best = rep.positions[0], worst = rep.positions.filter(function (x) { return x.status === 'Written off'; });
    var topThree = rep.positions.slice(0, 3);
    var top3share = rep.gross ? topThree.reduce(function (sum, x) { return sum + x.proceeds; }, 0) / rep.gross : 0;
    var good = rep.netTvpi >= 2, ok = rep.netTvpi >= 1;
    var letter = '<p>Dear limited partners,</p>' +
      '<p>' + esc(meta.fundName) + ' has now returned all of its capital. This is our final report. The fund invested ' + money(rep.deployed) + ' across ' + rep.positions.length + ' companies' + (meta.track === 'partner' && rep.positions.some(function (x) { return x.followOn; }) ? ', including follow-on investments in ' + rep.positions.filter(function (x) { return x.followOn; }).length + ' of them' : '') + '. ' +
      'Over its life, the fund returned ' + mult(rep.netTvpi) + ' of paid-in capital to you after fees and carried interest' + (rep.netIrr != null ? ', a net IRR of ' + pctFmt(rep.netIrr) : '') + '.</p>' +
      (best ? '<p>As expected in early-stage venture, a small number of companies drove the result. ' + esc(best.c.name) + ' returned ' + money(best.proceeds) + ' on ' + money(best.cost) + ' invested (' + mult(best.multiple) + '), and our three largest outcomes produced ' + Math.round(top3share * 100) + '% of all proceeds. ' +
        (worst.length ? worst.length + ' of ' + rep.positions.length + ' companies were written off.' : 'No company was written off entirely.') + '</p>' : '<p>The fund made no investments.</p>') +
      '<p>' + (good ? 'We are proud of this result and grateful for your trust.' : ok ? 'The fund returned your capital with a modest gain. We have studied where our judgment fell short and what we would do differently.' : 'The fund did not return your capital. We take full responsibility, and we have studied what went wrong in our selection and portfolio decisions.') +
      (rep.undeployed > meta.investable * 0.05 ? ' We left ' + money(rep.undeployed) + ' of investable capital undeployed and returned it to you; fees on that capital reduced net returns.' : '') + '</p>' +
      '<p>Sincerely,<br>' + esc(p ? p.name : 'The general partners') + ', General Partner</p>';
    var rows = rep.positions.map(function (x) {
      return '<tr><td><b>' + esc(x.c.name) + '</b><small>' + esc(x.c.sectorLabel) + ', ' + x.c.stageLabel + '</small></td><td>' + yearOf(x.t0) + '</td><td class="num">' + money(x.cost) + (x.followOn ? '<small>incl. follow-on</small>' : '') + '</td>' +
        '<td class="num">' + money(x.proceeds) + '</td><td class="num" style="color:' + (x.multiple >= 1 ? 'var(--good)' : 'var(--bad)') + '">' + mult(x.multiple) + '</td><td>' + x.status + ' (' + yearOf(x.exitT) + ')</td></tr>';
    }).join('');
    var yearRows = rep.years.filter(function (y) { return y.paidIn || y.distributed; }).map(function (y) {
      return '<tr><td>' + (2026 + y.year) + '</td><td class="num">' + money(y.paidIn) + '</td><td class="num">' + money(y.distributed) + '</td><td class="num">' + money(y.cumulative) + '</td></tr>';
    }).join('');
    A.render(A.shell('tests', '<div class="page report">' +
      '<p class="crumbs report-actions" style="margin:0 0 12px"><a href="#/results/' + track + '/' + n + '">Back to the debrief</a></p>' +
      '<div class="report-cover"><p class="kicker">Final report to limited partners, fiscal year ' + (2026 + Math.ceil(Math.max.apply(null, rep.positions.map(function (x) { return x.exitT; }).concat([10])))) + '</p><h1>' + esc(meta.fundName) + ', L.P.</h1>' +
        '<p>A ' + money(meta.fundSize) + ' ' + A.stageText(meta).toLowerCase() + ' fund, vintage 2026. Simulated for ' + A.trackName(track) + ' test ' + n + ' on VentureSim.</p></div>' +
      '<div class="report-actions"><button class="btn btn-primary" type="button" id="print">Print or save as PDF</button><a class="btn btn-secondary" href="#/results/' + track + '/' + n + '">Back to the debrief</a></div>' +
      '<h2>Letter from the general partner</h2><div class="letter">' + letter + '</div>' +
      '<h2>Fund at a glance</h2><dl class="kpis"><div><dt>Net TVPI</dt><dd>' + mult(rep.netTvpi) + '</dd></div><div><dt>DPI</dt><dd>' + mult(rep.dpi) + '</dd></div><div><dt>Net IRR</dt><dd>' + pctFmt(rep.netIrr) + '</dd></div><div><dt>Gross multiple</dt><dd>' + mult(rep.grossMoic) + '</dd></div>' +
        '<div><dt>Committed capital</dt><dd>' + money(meta.fundSize) + '</dd></div><div><dt>Invested</dt><dd>' + money(rep.deployed) + '</dd></div><div><dt>Total distributions</dt><dd>' + money(rep.lpDistributed) + '</dd></div><div><dt>Gross IRR</dt><dd>' + pctFmt(rep.grossIrr) + '</dd></div></dl>' +
      '<h2>Capital account</h2><div class="table-wrap"><table class="test-table"><tbody>' +
        '<tr><td>Commitments</td><td class="num">' + money(meta.fundSize) + '</td></tr>' +
        '<tr><td>Management fees and fund expenses</td><td class="num">' + money(rep.fees) + '</td></tr>' +
        '<tr><td>Capital invested in companies</td><td class="num">' + money(rep.deployed) + '</td></tr>' +
        '<tr><td>Uninvested capital returned</td><td class="num">' + money(rep.undeployed) + '</td></tr>' +
        '<tr><td>Proceeds from companies, before carry</td><td class="num">' + money(rep.gross) + '</td></tr>' +
        '<tr><td>Carried interest paid to the general partner</td><td class="num">' + money(rep.carry) + '</td></tr>' +
        '<tr><td><b>Total distributed to limited partners</b></td><td class="num"><b>' + money(rep.lpDistributed) + '</b></td></tr></tbody></table></div>' +
      '<h2>Cash flows to limited partners</h2><div class="chart">' + jCurve(rep.years) + '</div>' +
      '<p class="small muted" style="margin-top:8px">The early dip is the J-curve: fees and investments go out before companies return cash.</p>' +
      '<div class="table-wrap" style="margin-top:12px"><table class="test-table"><thead><tr><th>Year</th><th>Paid in</th><th>Distributed</th><th>Cumulative net</th></tr></thead><tbody>' + yearRows + '</tbody></table></div>' +
      '<h2>Portfolio</h2><div class="table-wrap"><table class="test-table result-table"><thead><tr><th>Company</th><th>First check</th><th>Invested</th><th>Realized</th><th>Multiple</th><th>Exit</th></tr></thead><tbody>' + rows + '</tbody></table></div>' +
      (rep.excluded ? '<p class="small muted" style="margin-top:8px">' + rep.excluded + ' compan' + (rep.excluded === 1 ? 'y was' : 'ies were') + ' outside the thesis and never reached the investment committee, so they are not in the portfolio.</p>' : '') +
      '<h2>Allocation by sector</h2>' + (rep.positions.length ? allocRows(rep.bySector, rep.deployed) : '<p class="muted">No investments.</p>') +
      '<h2>Allocation by stage</h2>' + (rep.positions.length ? allocRows(rep.byStage, rep.deployed) : '<p class="muted">No investments.</p>') +
      '<p class="fine-print">Basis of preparation: all positions are fully realized, so DPI equals TVPI and there is no remaining value. Management fees and fund expenses are spread evenly over the active life of the fund, which ends at its last exit. Carried interest is ' + Math.round(meta.carry * 100) + '% of profits (' + Math.round(meta.carryHigh * 100) + '% if the fund returns more than 3x) once distributions exceed about ' + meta.hurdle + 'x of commitments, a simplified stand-in for an 8% preferred return, and is taken from company proceeds. Uninvested capital is treated as returned at the end of the investment period. IRR uses the date of each investment and exit, and shows n/a when no single rate fits the cash flows. VentureSim is an educational simulation; companies and outcomes are fictional.</p>' +
      '</div>'));
    document.getElementById('print').addEventListener('click', function () { window.print(); });
  };

  // ---------- Guided tour ----------
  function tour(steps, done) {
    var i = 0, hole = document.createElement('div'), pop = document.createElement('div');
    hole.className = 'tour-hole'; pop.className = 'tour-pop';
    pop.setAttribute('role', 'dialog'); pop.setAttribute('aria-modal', 'true'); pop.setAttribute('aria-labelledby', 'tour-h');
    document.body.appendChild(hole); document.body.appendChild(pop);
    function place() {
      var st = steps[i], el = st.el ? document.querySelector(st.el) : null;
      if (el) {
        el.scrollIntoView({ block: 'center' });
        var r = el.getBoundingClientRect(), m = 6;
        hole.style.display = 'block';
        hole.style.left = (r.left - m) + 'px'; hole.style.top = (r.top - m) + 'px'; hole.style.width = (r.width + m * 2) + 'px'; hole.style.height = (r.height + m * 2) + 'px';
        var below = r.bottom + 16 + 220 < window.innerHeight;
        pop.style.top = (below ? r.bottom + 16 : Math.max(16, r.top - 16 - pop.offsetHeight)) + 'px';
        pop.style.left = Math.min(window.innerWidth - pop.offsetWidth - 16, Math.max(16, r.left)) + 'px';
      } else {
        hole.style.display = 'block'; hole.style.left = '50%'; hole.style.top = '50%'; hole.style.width = '0'; hole.style.height = '0';
        pop.style.top = '30%'; pop.style.left = Math.max(16, (window.innerWidth - pop.offsetWidth) / 2) + 'px';
      }
    }
    function draw() {
      var st = steps[i];
      pop.innerHTML = '<p class="count">Step ' + (i + 1) + ' of ' + steps.length + '</p><h3 id="tour-h">' + esc(st.title) + '</h3><p>' + st.text + '</p>' +
        '<div class="ws-actions"><button class="btn btn-link btn-sm" type="button" data-t="skip">Skip tour</button><span>' +
        (i ? '<button class="btn btn-secondary btn-sm" type="button" data-t="back">Back</button> ' : '') +
        '<button class="btn btn-primary btn-sm" type="button" data-t="next">' + (i === steps.length - 1 ? 'Start' : 'Next') + '</button></span></div>';
      place();
      setTimeout(place, 50);
      pop.querySelector('[data-t=next]').focus();
    }
    function end() { hole.remove(); pop.remove(); document.removeEventListener('keydown', onKey); window.removeEventListener('resize', place); if (done) done(); }
    function onKey(e) {
      if (e.key === 'Escape') end();
      else if (e.key === 'ArrowRight') { if (i < steps.length - 1) { i++; draw(); } else end(); }
      else if (e.key === 'ArrowLeft' && i) { i--; draw(); }
    }
    pop.addEventListener('click', function (e) {
      var b = e.target.closest('[data-t]'); if (!b) return;
      var t = b.getAttribute('data-t');
      if (t === 'skip') end(); else if (t === 'back') { i--; draw(); } else if (i < steps.length - 1) { i++; draw(); } else end();
    });
    document.addEventListener('keydown', onKey);
    window.addEventListener('resize', place);
    draw();
  }
  function maybeTour(kind, steps) {
    var s = store();
    s.tours = s.tours || {};
    var start = function () { tour(steps, function () { s.tours[kind] = true; A.save(); }); };
    var btn = document.getElementById('replay');
    if (btn) btn.addEventListener('click', start);
    if (!s.tours[kind]) setTimeout(start, 150);
  }

  // ---------- Workshops ----------
  var WS = {
    memo: { title: 'Investment memo', lesson: 'writing-a-memo', blurb: 'Write a memo on a real deal from your tests: recommendation, scenarios with probabilities, risks, and what must be true. Then see what happened.' },
    termsheet: { title: 'Term sheet', lesson: 'term-sheets', blurb: 'Draft a term sheet for a seed or Series A deal. Compute the post-money, ownership, price per share, and pool, then pick market-standard terms.' },
    captable: { title: 'Cap table', lesson: 'cap-tables', blurb: 'Build a cap table from founding through a SAFE, a seed round, and a Series A with a pool increase. Every number is checked.' }
  };
  R.workshops = function () {
    document.title = 'Workshops | VentureSim';
    var s = store(); s.ws = s.ws || {};
    A.render(A.shell('workshops', A.page(A.pageHead('Workshops', 'Optional practice for the analyst and associate tracks. Each one has a lesson to read first and a short guided tour before you start.'),
      '<div class="ws-cards">' + Object.keys(WS).map(function (k) {
        var w = WS[k], done = s.ws[k] && s.ws[k].completed;
        return '<article class="ws-card"><h3>' + w.title + '</h3><p>' + w.blurb + '</p>' + (done ? '<p class="small" style="color:var(--good)">Completed ' + done + ' time' + (done === 1 ? '' : 's') + '</p>' : '') +
          '<div class="ws-actions"><a class="btn btn-secondary btn-sm" href="#/course/' + w.lesson + '">Read the lesson</a><a class="btn btn-primary btn-sm" href="#/workshop/' + k + '">Start</a></div></article>';
      }).join('') + '</div>')));
  };
  R.workshop = function (parts) {
    var kind = parts[1];
    if (kind === 'captable') return capTable(+parts[2] || 0);
    if (kind === 'termsheet') return termSheet(+parts[2] || 0);
    if (kind === 'memo') return memo(parts[2]);
    A.go('#/workshops');
  };
  function wsDone(kind) { var s = store(); s.ws = s.ws || {}; s.ws[kind] = s.ws[kind] || {}; s.ws[kind].completed = (s.ws[kind].completed || 0) + 1; A.save(); }
  function wsHead(kind, sub) {
    var w = WS[kind];
    return A.pageHead(w.title + ' workshop', sub, '<a href="#/workshops">Workshops</a>') +
      '<div class="ws-actions" style="margin:-10px 0 20px"><button class="btn btn-secondary btn-sm" type="button" id="replay">Replay the tour</button><a class="btn btn-link btn-sm" href="#/course/' + w.lesson + '">Read the lesson</a></div>';
  }
  function num(v) { var x = parseFloat(String(v).replace(/[$,%\s]/g, '')); return isFinite(x) ? x : NaN; }
  function close(a, b, tol) { return isFinite(a) && Math.abs(a - b) <= tol; }
  function fmtShares(x) { return Math.round(x).toLocaleString('en-US'); }

  // Cap table
  function capTable(n) {
    var s = store(); s.ws = s.ws || {}; s.ws.captable = s.ws.captable || {};
    if (!n) n = s.ws.captable.n || 1;
    s.ws.captable.n = n; A.save();
    var ex = E.capTableExercise(n);
    document.title = 'Cap table workshop | VentureSim';
    var steps = ex.steps.map(function (st, k) {
      var rows = st.table.rows.map(function (row, r) {
        var given = row.holder === 'Founder A' || row.holder === 'Founder B' || (row.holder === 'Option pool' && st.key !== 'seriesA');
        return '<tr><td>' + esc(row.holder) + '</td><td class="num">' + (given ? fmtShares(row.shares) : '<span class="muted">you compute</span>') + '</td>' +
          '<td><input class="ws-input" data-step="' + k + '" data-row="' + r + '" inputmode="decimal" aria-label="' + esc(row.holder) + ' ownership after ' + esc(st.title) + ', percent" placeholder="%"></td></tr>';
      }).join('');
      var nums = st.numbers.map(function (q) {
        return '<label>' + esc(q.label) + '<input class="ws-input" data-step="' + k + '" data-num="' + q.key + '" inputmode="decimal" aria-label="' + esc(q.label) + '" placeholder="' + (q.kind === 'price' ? '$ per share' : 'shares') + '"></label>';
      }).join('');
      return '<section class="ws-step" data-k="' + k + '"><h3>Step ' + (k + 1) + ': ' + esc(st.title) + '</h3><p>' + esc(st.text) + '</p>' +
        (nums ? '<div class="ws-row"' + (k === 2 ? ' data-tour="numbers"' : '') + '>' + nums + '</div>' : '') +
        '<table class="ws-table"' + (k === 0 ? ' data-tour="table"' : '') + '><thead><tr><th>Holder</th><th>Shares</th><th>Ownership after this step</th></tr></thead><tbody>' + rows + '</tbody></table>' +
        '<div class="ws-actions"><button class="btn btn-primary btn-sm" type="button" data-check="' + k + '"' + (k === 0 ? ' data-tour="check"' : '') + '>Check step ' + (k + 1) + '</button><button class="btn btn-link btn-sm" type="button" data-show="' + k + '"' + (k === 0 ? ' data-tour="show"' : '') + '>Show the answer</button><span class="small" data-res="' + k + '" role="status"></span></div><div data-ans="' + k + '"></div></section>';
    }).join('');
    A.render(A.shell('workshops', A.page(wsHead('captable', 'Scenario ' + n + '. Work through five events in order. Track shares, then compute each holder\'s percentage to one decimal place.'),
      '<div class="scenario" data-tour="scenario"><p><b>The company.</b> Two founders, an option pool, one SAFE, a seed round, and a Series A. Shares you can see are given; shares marked "you compute" are yours to work out. Round percentages to one decimal.</p></div>' +
      '<div class="ws-steps" style="margin-top:18px">' + steps + '</div>' +
      '<div class="ws-actions" style="margin-top:20px"><span id="ct-score" class="small" role="status"></span><a class="btn btn-secondary" href="#/workshop/captable/' + (n + 1) + '">New scenario</a></div>')));
    var checked = {};
    function check(k) {
      var st = ex.steps[k], right = 0, total = 0;
      root().querySelectorAll('[data-step="' + k + '"][data-row]').forEach(function (inp) {
        total++; var row = st.table.rows[+inp.getAttribute('data-row')];
        var ok = close(num(inp.value), row.pct * 100, 0.15);
        inp.classList.toggle('right', ok); inp.classList.toggle('wrong', !ok); if (ok) right++;
      });
      root().querySelectorAll('[data-step="' + k + '"][data-num]').forEach(function (inp) {
        total++; var q = st.numbers.filter(function (x) { return x.key === inp.getAttribute('data-num'); })[0];
        var v = num(inp.value), ok = q.kind === 'price' ? close(v, q.value, Math.max(0.005, q.value * 0.005)) : close(v, q.value, Math.max(2, q.value * 0.005));
        inp.classList.toggle('right', ok); inp.classList.toggle('wrong', !ok); if (ok) right++;
      });
      root().querySelector('[data-res="' + k + '"]').textContent = right + ' of ' + total + ' correct.';
      checked[k] = right === total;
      var all = Object.keys(checked).length === ex.steps.length;
      if (all) {
        var full = ex.steps.every(function (_, j) { return checked[j]; });
        document.getElementById('ct-score').textContent = full ? 'Every step is correct. Nice work.' : 'Some steps still have mistakes. Use "Show the answer" to see the working.';
        if (full && !checked.counted) { checked.counted = true; wsDone('captable'); }
      }
    }
    function show(k) {
      var st = ex.steps[k], inp = ex.inputs, extra = '';
      if (st.key === 'safe') extra = 'SAFE percentage = ' + money(inp.safeAmt) + ' / ' + money(inp.safeCap) + ' = ' + (inp.safeAmt / inp.safeCap * 100).toFixed(1) + '%. Shares = existing shares times that percentage, divided by (1 minus it).';
      if (st.key === 'seed') extra = 'Price = pre-money / pre-money shares. New shares = investment / price.';
      if (st.key === 'seriesA') extra = 'Let N be total shares after the round. Investor = ' + (inp.aAmt / (inp.aPre + inp.aAmt) * 100).toFixed(1) + '% of N, pool = ' + Math.round(inp.poolTarget * 100) + '% of N, and everyone else keeps their shares. Solve for N, then price = pre-money / (N minus Series A shares).';
      root().querySelector('[data-ans="' + k + '"]').innerHTML = '<div class="answer">' + (extra ? '<p>' + extra + '</p>' : '') + '<p>' + st.table.rows.map(function (r) { return esc(r.holder) + ': ' + fmtShares(r.shares) + ' shares, ' + (r.pct * 100).toFixed(1) + '%'; }).join('<br>') + '</p>' +
        (st.numbers.length ? '<p>' + st.numbers.map(function (q) { return esc(q.label) + ': ' + (q.kind === 'price' ? '$' + q.value.toFixed(4) : fmtShares(q.value)); }).join('<br>') + '</p>' : '') + '</div>';
    }
    root().querySelector('.ws-steps').addEventListener('click', function (e) {
      var c = e.target.closest('[data-check]'), sh = e.target.closest('[data-show]');
      if (c) check(+c.getAttribute('data-check')); if (sh) show(+sh.getAttribute('data-show'));
    });
    maybeTour('captable', [
      { title: 'Welcome to the cap table workshop', text: 'You will build a company\'s ownership from founding to a Series A, one event at a time. This tour takes about a minute.' },
      { el: '[data-tour=scenario]', title: 'Read the scenario', text: 'Each step describes one event. The numbers change every time you start a new scenario, so you cannot memorize answers.' },
      { el: '[data-tour=table]', title: 'Fill in ownership', text: 'For every holder, type their percentage of the company after this step, to one decimal place. Percentages come from shares: holder shares divided by total shares.' },
      { el: '[data-tour=numbers]', title: 'Compute the key numbers', text: 'Some steps also ask for shares issued or the price per share. Work these out first; the percentages follow from them.' },
      { el: '[data-tour=check]', title: 'Check each step', text: 'Correct answers turn green and wrong ones red. Small rounding differences are accepted.' },
      { el: '[data-tour=show]', title: 'Stuck? See the working', text: 'Show the answer explains the formula and gives every number. Lesson 14 walks through the same steps in detail.' }
    ]);
  }

  // Term sheet
  function termSheet(n) {
    var s = store(); s.ws = s.ws || {}; s.ws.termsheet = s.ws.termsheet || {};
    if (!n) n = s.ws.termsheet.n || 1;
    s.ws.termsheet.n = n; A.save();
    var ts = E.termSheetExercise(n);
    document.title = 'Term sheet workshop | VentureSim';
    var ask = ts.boardAsk === 'control' ? 'The founders want to keep control of the board after this round.' : 'The investor and founders agree to add one independent director that both sides approve, with founders keeping two seats.';
    function sel(id, label, opts) { return '<div><label for="' + id + '">' + label + '</label><select id="' + id + '" class="select"><option value="">Choose</option>' + opts.map(function (o) { return '<option>' + esc(o) + '</option>'; }).join('') + '</select></div>'; }
    function inp(id, label, ph) { return '<div><label for="' + id + '">' + label + '</label><input class="ws-input" style="width:100%" id="' + id + '" inputmode="decimal" placeholder="' + ph + '"></div>'; }
    A.render(A.shell('workshops', A.page(wsHead('termsheet', 'Scenario ' + n + '. Draft the term sheet for this round, then check it against the math and market standard terms.'),
      '<div class="scenario" data-tour="scenario"><p><b>' + esc(ts.company) + ', ' + ts.round + '.</b> VentureSim Capital will invest ' + money(ts.amount) + ' at a ' + money(ts.pre) + ' pre-money valuation.</p>' +
      '<p>The company has ' + fmtShares(ts.fdShares) + ' fully diluted shares today, including an unused option pool of ' + fmtShares(ts.poolNow) + '. VentureSim Capital requires the unused pool to be ' + Math.round(ts.poolTarget * 100) + '% of the company after the round, created before the investment.</p><p>' + ask + ' Everything else should be market standard for an early-stage US round.</p></div>' +
      '<form class="form panel panel-body" id="tsf" novalidate style="max-width:none;margin-top:18px">' +
        '<h3 style="font:400 22px var(--serif)" data-tour="econ">Economics</h3><div class="grid-2">' +
        sel('security', 'Security', ['Common stock', 'Series Seed Preferred', 'Series A Preferred', 'Convertible note']) +
        inp('post', 'Post-money valuation ($)', 'e.g. 12000000') + inp('own', 'Investor ownership after the round (%)', 'e.g. 20') +
        inp('newpool', 'New options added to the pool', 'shares') + inp('price', 'Price per share ($)', 'e.g. 1.2345') + inp('effpre', 'Effective pre-money for existing holders ($)', 'after the pool increase') +
        sel('lp', 'Liquidation preference', ['1x non-participating', '1x participating', '2x non-participating']) +
        sel('div', 'Dividends', ['Non-cumulative, only if declared', '8% cumulative']) +
        sel('anti', 'Anti-dilution', ['Broad-based weighted average', 'Full ratchet', 'None']) +
        sel('prorata', 'Pro rata rights for major investors', ['Yes', 'No']) + '</div>' +
        '<h3 style="font:400 22px var(--serif);margin-top:12px" data-tour="control">Control</h3><div class="grid-2">' +
        sel('board', 'Board of directors', ['2 founders, 1 investor', '1 founder, 2 investors', '2 founders, 1 investor, 1 independent', 'Founders only']) +
        sel('prot', 'Protective provisions', ['Standard: sale, new senior shares, charter changes', 'Broad: also budgets, hiring, and spending over $50K']) +
        sel('vest', 'Founder vesting', ['4 years, 1-year cliff, credit for time worked', 'No vesting', '6 years, 2-year cliff']) +
        sel('noshop', 'No-shop period', ['30 days', '90 days', '180 days']) + '</div>' +
        '<p class="form-error" id="form-error" role="alert"></p><div class="ws-actions" data-tour="check"><button class="btn btn-primary" type="submit">Check my term sheet</button><a class="btn btn-secondary" href="#/workshop/termsheet/' + (n + 1) + '">New scenario</a></div></form>' +
      '<div id="ts-out" style="margin-top:20px"></div>')));
    var std = { security: ts.security, lp: '1x non-participating', div: 'Non-cumulative, only if declared', anti: 'Broad-based weighted average', prorata: 'Yes', board: ts.boardCorrect, prot: 'Standard: sale, new senior shares, charter changes', vest: '4 years, 1-year cliff, credit for time worked', noshop: '30 days' };
    var why = {
      security: 'Priced rounds issue preferred stock named for the round: ' + ts.security + '.',
      lp: 'Market standard is 1x non-participating. Anything more shifts value from founders and employees to investors.',
      div: 'Early-stage dividends are non-cumulative and only paid if the board declares them, which in practice means rarely.',
      anti: 'Broad-based weighted average is standard. A full ratchet can take a large part of the company in a down round.',
      prorata: 'Major investors normally get pro rata rights to keep their ownership in later rounds.',
      board: ts.boardAsk === 'control' ? 'Founders keep control with two of three seats.' : 'Two founders, one investor, and one independent director both sides approve.',
      prot: 'Standard protective provisions cover major events only, not day-to-day decisions.',
      vest: 'Four years with a one-year cliff, often with credit for time already worked, is standard.',
      noshop: 'A 30 to 45 day no-shop is standard. Long no-shops leave the company stuck if the deal falls apart.'
    };
    document.getElementById('tsf').addEventListener('submit', function (e) {
      e.preventDefault();
      var a = ts.answers, res = [];
      var checks = [
        ['post', 'Post-money valuation', close(num(val('post')), a.post, a.post * 0.002), money(a.post)],
        ['own', 'Investor ownership', close(num(val('own')), a.ownership * 100, 0.15), (a.ownership * 100).toFixed(1) + '%'],
        ['newpool', 'New options added to the pool', close(num(val('newpool')), a.newPool, Math.max(2, a.newPool * 0.01)), fmtShares(a.newPool)],
        ['price', 'Price per share', close(num(val('price')), a.price, a.price * 0.005), '$' + a.price.toFixed(4)],
        ['effpre', 'Effective pre-money', close(num(val('effpre')), a.effectivePre, a.effectivePre * 0.01), money(a.effectivePre)]
      ];
      checks.forEach(function (c) { var el = document.getElementById(c[0]); el.classList.toggle('right', c[2]); el.classList.toggle('wrong', !c[2]); res.push({ label: c[1], ok: c[2], note: 'Answer: ' + c[3] }); });
      Object.keys(std).forEach(function (k) {
        var ok = val(k) === std[k], el = document.getElementById(k);
        el.classList.toggle('right', ok); el.classList.toggle('wrong', !ok);
        res.push({ label: el.previousElementSibling.textContent, ok: ok, note: why[k] });
      });
      var score = res.filter(function (r) { return r.ok; }).length;
      if (score === res.length) wsDone('termsheet');
      var doc = '<div class="doc"><h2>Summary of terms</h2><p class="sub">' + esc(ts.company) + ', ' + ts.round + ' financing. Not legally binding except confidentiality and no-shop.</p><table>' +
        [['Issuer', esc(ts.company)], ['Security', esc(val('security') || 'n/a')], ['Amount', money(ts.amount)], ['Pre-money valuation', money(ts.pre)], ['Post-money valuation', money(a.post)],
         ['Option pool', Math.round(ts.poolTarget * 100) + '% unused pool after closing, created before the investment (' + fmtShares(a.newPool) + ' new options)'],
         ['Price per share', '$' + a.price.toFixed(4)], ['Liquidation preference', esc(val('lp') || 'n/a')], ['Dividends', esc(val('div') || 'n/a')], ['Anti-dilution', esc(val('anti') || 'n/a')],
         ['Pro rata rights', esc(val('prorata') || 'n/a')], ['Board', esc(val('board') || 'n/a')], ['Protective provisions', esc(val('prot') || 'n/a')], ['Founder vesting', esc(val('vest') || 'n/a')], ['No-shop', esc(val('noshop') || 'n/a')]]
        .map(function (r) { return '<tr><th>' + r[0] + '</th><td>' + r[1] + '</td></tr>'; }).join('') + '</table></div>';
      document.getElementById('ts-out').innerHTML = '<section class="panel"><div class="panel-head"><h2>' + score + ' of ' + res.length + ' correct</h2></div><div class="panel-body"><ul class="lessons">' +
        res.map(function (r) { return '<li style="border-left-color:' + (r.ok ? 'var(--good)' : 'var(--bad)') + '"><p><b>' + esc(r.label) + ':</b> ' + (r.ok ? 'correct.' : 'not quite.') + ' ' + esc(r.note) + '</p></li>'; }).join('') +
        '</ul></div></section><h2 style="font:400 24px var(--serif);margin:24px 0 12px">Your term sheet</h2>' + doc +
        '<div class="ws-actions"><button class="btn btn-secondary" type="button" id="tsprint">Print or save as PDF</button></div>';
      document.getElementById('tsprint').addEventListener('click', function () { window.print(); });
      document.getElementById('ts-out').scrollIntoView({ behavior: 'smooth' });
    });
    maybeTour('termsheet', [
      { title: 'Welcome to the term sheet workshop', text: 'You will draft the main terms of a funding round and check them against the math and market standard.' },
      { el: '[data-tour=scenario]', title: 'Read the deal', text: 'The scenario gives the amount, pre-money valuation, current share count, and the pool the investor requires. It also says what the founders want on control.' },
      { el: '[data-tour=econ]', title: 'Compute the economics', text: 'Work out the post-money, ownership, new pool options, price per share, and the effective pre-money after the pool increase. Lesson 13 shows the method.' },
      { el: '[data-tour=control]', title: 'Choose the control terms', text: 'Pick what is market standard for an early-stage US round, and match the board to what the scenario says.' },
      { el: '[data-tour=check]', title: 'Check and print', text: 'You get a score, an explanation for every term, and a formatted term sheet you can print or save as a PDF.' }
    ]);
  }

  // Investment memo
  var KEYWORDS = {
    team: ['team', 'founder', 'ceo', 'cto', 'hire', 'experience', 'reference'],
    market: ['market', 'tam', 'sam', 'customers', 'size', 'buyers'],
    product: ['customer', 'retention', 'churn', 'love', 'usage', 'product', 'need', 'pmf'],
    traction: ['revenue', 'arr', 'growth', 'traction', 'pilots', 'paying', 'nrr'],
    moat: ['competit', 'moat', 'copy', 'differentiat', 'switching', 'network'],
    risk: ['risk', 'runway', 'concentration', 'regulat', 'platform', 'dependen', 'margin'],
    price: ['valuation', 'price', 'expensive', 'multiple', 'ownership'],
    luck: []
  };
  var SECTION = { team: 'team', market: 'big', product: 'evidence', traction: 'evidence', moat: 'comp' };
  function memoCandidates() {
    var s = store(), out = [];
    Object.keys(s.tests || {}).forEach(function (k) {
      var st = s.tests[k]; if (st.status !== 'done') return;
      var t = A.getTest(st.track, st.n);
      t.companies.filter(function (c) { return c.inThesis; }).forEach(function (c) { out.push({ id: st.track + '-' + st.n + '-' + c.i, c: c, meta: t.meta, label: A.trackName(st.track) + ' test ' + st.n }); });
    });
    if (!out.length) {
      var ex = E.generateExample();
      ex.companies.forEach(function (c) { out.push({ id: 'example-' + c.i, c: c, meta: ex.meta, label: 'Example test' }); });
    }
    return out;
  }
  function memo(id) {
    document.title = 'Memo workshop | VentureSim';
    var cands = memoCandidates();
    var pickC = id ? cands.filter(function (x) { return x.id === id; })[0] : null;
    if (!pickC) {
      A.render(A.shell('workshops', A.page(wsHead('memo', 'Choose a company to write about. You will see what happened to it after you submit, so pick one you do not remember.'),
        '<div class="panel"><ul class="check-list">' + cands.slice(0, 60).map(function (x) {
          return '<li><a href="#/workshop/memo/' + x.id + '"><b>' + esc(x.c.name) + '</b><br><span class="small muted">' + esc(x.c.pitch) + '</span></a><span class="small muted">' + esc(x.label) + ', ' + x.c.stageLabel + '</span></li>';
        }).join('') + '</ul></div>' + (cands[0] && cands[0].label === 'Example test' ? '<p class="small muted" style="margin-top:10px">Finish a test to write memos on its companies. Until then, these come from the example test.</p>' : ''))));
      var b = document.getElementById('replay'); if (b) b.style.display = 'none';
      return;
    }
    var c = pickC.c, meta = pickC.meta, t = c.terms;
    var facts = [['Stage', c.stageLabel], ['Sector', c.sectorLabel], ['Location', c.location], ['Round', money(t.round)], ['Post-money', money(t.post)], ['Check', money(t.check)], ['Ownership', A.pct(t.ownership)]]
      .concat(c.traction).map(function (r) { return '<tr><th>' + esc(r[0]) + '</th><td>' + esc(r[1]) + '</td></tr>'; }).join('');
    var scen = [['Fails', 60, 0], ['Small exit', 25, 40], ['Strong exit', 12, 300], ['Market leader', 3, 2000]];
    A.render(A.shell('workshops', A.page(wsHead('memo', 'Write a memo on ' + esc(c.name) + ' for a ' + money(meta.fundSize) + ' fund. Keep each section short.'),
      '<div class="grid-2"><section class="panel panel-body" data-tour="deal"><h2 style="font:400 24px var(--serif)">' + esc(c.name) + '</h2><p style="margin-top:6px">' + esc(c.pitch) + '</p>' +
        '<p class="small muted" style="margin-top:8px">' + esc(c.team.text) + '</p><p class="small muted" style="margin-top:6px">' + esc(c.product.text) + ' ' + esc(c.market.text) + ' ' + esc(c.moat.text) + '</p>' +
        (c.risks.length ? '<p class="small" style="margin-top:6px"><b>Risks noted:</b> ' + esc(c.risks.join(' ')) + '</p>' : '') + '</section>' +
        '<section class="panel panel-body"><table class="ws-table" style="margin-top:0"><tbody>' + facts + '</tbody></table></section></div>' +
      '<form class="form panel panel-body memo-grid" id="mf" novalidate style="max-width:none;margin-top:18px">' +
        '<div data-tour="rec"><label for="rec">Recommendation</label><select id="rec" class="select"><option value="">Choose</option><option>Invest</option><option>Pass</option></select></div>' +
        '<div><label for="summary">Summary: the decision, the main reason, and the biggest risk</label><textarea id="summary"></textarea></div>' +
        '<div><label for="big">Why it could be very large</label><textarea id="big"></textarea></div>' +
        '<div class="grid-2"><div><label for="team">Team</label><textarea id="team"></textarea></div><div><label for="evidence">Evidence and traction</label><textarea id="evidence"></textarea></div></div>' +
        '<div><label for="comp">Competition and moat</label><textarea id="comp"></textarea></div>' +
        '<div data-tour="risks"><label>Top three risks, most serious first</label>' + [1, 2, 3].map(function (k) { return '<input type="text" id="risk' + k + '" class="ws-input" style="width:100%;margin-top:6px" placeholder="Risk ' + k + '">'; }).join('') + '</div>' +
        '<div><label for="mbt">What must be true (one per line)</label><textarea id="mbt"></textarea></div>' +
        '<div data-tour="scen"><label>Return scenarios</label><p class="hint">Your ownership today is ' + A.pct(t.ownership) + '. Assume it shrinks by the dilution below before exit. Probabilities must add up to 100%.</p>' +
          '<div class="ws-row"><label>Dilution before exit (%)<input class="ws-input" id="dil" value="40" inputmode="decimal"></label></div>' +
          '<div style="overflow-x:auto;margin-top:10px"><table class="scen"><thead><tr><th>Scenario</th><th>Probability (%)</th><th>Exit value ($M)</th><th>Your multiple</th><th>Weighted</th></tr></thead><tbody>' +
          scen.map(function (r, k) { return '<tr><td>' + r[0] + '</td><td><input class="ws-input" id="p' + k + '" value="' + r[1] + '" inputmode="decimal"></td><td><input class="ws-input" id="v' + k + '" value="' + r[2] + '" inputmode="decimal"></td><td class="num" id="m' + k + '"></td><td class="num" id="w' + k + '"></td></tr>'; }).join('') +
          '<tr><td><b>Total</b></td><td class="num" id="ptot"></td><td></td><td></td><td class="num"><b id="wtot"></b></td></tr></tbody></table></div></div>' +
        '<p class="form-error" id="form-error" role="alert"></p><div class="ws-actions" data-tour="submit"><button class="btn btn-primary" type="submit">Submit memo and see what happened</button><a class="btn btn-secondary" href="#/workshop/memo">Pick another company</a></div></form>' +
      '<div id="memo-out" style="margin-top:20px"></div>')));
    function calc() {
      var keep = 1 - (num(val('dil')) || 0) / 100, own = t.ownership * keep, tot = 0, wtot = 0;
      scen.forEach(function (_, k) {
        var p = num(val('p' + k)) || 0, v = (num(val('v' + k)) || 0) * 1e6, m = v * own / t.check;
        tot += p; wtot += p / 100 * m;
        document.getElementById('m' + k).textContent = mult(m); document.getElementById('w' + k).textContent = mult(p / 100 * m);
      });
      document.getElementById('ptot').textContent = tot + '%'; document.getElementById('wtot').textContent = mult(wtot);
      return { tot: tot, w: wtot, leaderProceeds: (num(val('v3')) || 0) * 1e6 * own };
    }
    root().querySelector('#mf').addEventListener('input', calc);
    calc();
    document.getElementById('mf').addEventListener('submit', function (e) {
      e.preventDefault();
      var r = calc(), rec = val('rec'), risks = [1, 2, 3].map(function (k) { return val('risk' + k); }).filter(Boolean);
      if (!rec) return setErr('Choose invest or pass.', 'rec');
      if (val('summary').length < 40) return setErr('Write a summary of at least a sentence or two.', 'summary');
      if (Math.abs(r.tot - 100) > 0.5) return setErr('Your scenario probabilities add up to ' + r.tot + '%. Make them add up to 100%.', 'p0');
      setErr('');
      var h = c.hidden, text = [val('summary'), val('big'), val('team'), val('evidence'), val('comp'), val('mbt')].concat(risks).join(' ').toLowerCase();
      var notes = [];
      notes.push(risks.length >= 3 ? { ok: true, t: 'You named three specific risks.' } : { ok: false, t: 'Name three risks. A memo with fewer looks one-sided to a partner.' });
      notes.push(r.leaderProceeds >= meta.fundSize ? { ok: true, t: 'Your market-leader scenario could return the whole ' + money(meta.fundSize) + ' fund.' } : { ok: false, t: 'Even your best scenario returns ' + money(r.leaderProceeds) + ', less than the ' + money(meta.fundSize) + ' fund. Venture funds need deals that can return the fund.' });
      if (rec === 'Invest' && r.w < 3) notes.push({ ok: false, t: 'You recommend investing, but your own scenarios give only ' + mult(r.w) + '. Either the scenarios or the recommendation should change.' });
      if (rec === 'Pass' && r.w > 10) notes.push({ ok: false, t: 'You recommend passing, but your scenarios give ' + mult(r.w) + '. Explain what makes you doubt your own numbers.' });
      var mattered = h.mattered.filter(function (x) { return KEYWORDS[x.factor] && KEYWORDS[x.factor].length; });
      mattered.forEach(function (x) {
        // A filled-in section on the topic counts, as do keywords anywhere in the memo.
        var hit = (SECTION[x.factor] && val(SECTION[x.factor]).length >= 25) || KEYWORDS[x.factor].some(function (k) { return text.indexOf(k) > -1; });
        notes.push({ ok: hit, t: (hit ? 'You discussed ' : 'You did not discuss ') + E.FACTOR_LABEL[x.factor].toLowerCase() + ', which turned out to matter: ' + x.text });
      });
      var call = (rec === 'Invest') === (h.ev >= 1.5);
      var score = notes.filter(function (x) { return x.ok; }).length;
      var s = store(); s.memos = s.memos || []; s.memos.push({ id: pickC.id, company: c.name, rec: rec, weighted: r.w, at: Date.now() }); A.save();
      wsDone('memo');
      var doc = '<div class="doc"><h2>Investment memo: ' + esc(c.name) + '</h2><p class="sub">' + esc(pickC.label) + ', ' + money(meta.fundSize) + ' fund. Recommendation: ' + esc(rec) + '.</p>' +
        [['Summary', val('summary')], ['Why it could be very large', val('big')], ['Team', val('team')], ['Evidence', val('evidence')], ['Competition and moat', val('comp')], ['Risks', risks.map(function (x, k) { return (k + 1) + '. ' + x; }).join('\n')], ['What must be true', val('mbt')]]
          .filter(function (x) { return x[1]; }).map(function (x) { return '<h3>' + x[0] + '</h3><p style="white-space:pre-line">' + esc(x[1]) + '</p>'; }).join('') +
        '<h3>Returns</h3><p>Probability-weighted multiple: ' + mult(r.w) + '.</p></div>';
      document.getElementById('memo-out').innerHTML = '<section class="panel"><div class="panel-head"><h2>What happened to ' + esc(c.name) + '</h2></div><div class="panel-body">' +
        '<p style="font:400 20px var(--serif)">' + esc(h.outcome) + '</p>' +
        '<p class="small muted" style="margin-top:6px">' + (call ? 'Your recommendation matched the strength of the evidence.' : 'The evidence pointed the other way from your recommendation.') + ' ' + (h.success !== (h.ev >= 1.5) ? 'Luck played a part in how this one turned out.' : '') + '</p>' +
        '<h3 style="font:600 15px var(--sans);margin:16px 0 8px">Feedback on your memo (' + score + ' of ' + notes.length + ')</h3><ul class="lessons">' +
        notes.map(function (x) { return '<li style="border-left-color:' + (x.ok ? 'var(--good)' : 'var(--bad)') + '"><p>' + esc(x.t) + '</p></li>'; }).join('') + '</ul></div></section>' +
        '<h2 style="font:400 24px var(--serif);margin:24px 0 12px">Your memo</h2>' + doc +
        '<div class="ws-actions"><button class="btn btn-secondary" type="button" id="mprint">Print or save as PDF</button><a class="btn btn-primary" href="#/workshop/memo">Write another</a></div>';
      document.getElementById('mprint').addEventListener('click', function () { window.print(); });
      document.getElementById('memo-out').scrollIntoView({ behavior: 'smooth' });
    });
    maybeTour('memo', [
      { title: 'Welcome to the memo workshop', text: 'You will write a short investment memo on one deal, then see what happened and get feedback on your reasoning.' },
      { el: '[data-tour=deal]', title: 'Read the deal', text: 'Everything you know about the company is here, the same information you had in the test.' },
      { el: '[data-tour=rec]', title: 'Lead with the decision', text: 'Choose invest or pass, then write a summary with your main reason and the biggest risk. Lesson 12 shows what a strong opening looks like.' },
      { el: '[data-tour=risks]', title: 'Name the real risks', text: 'Three specific risks, most serious first. "Execution risk" does not count.' },
      { el: '[data-tour=scen]', title: 'Put numbers on it', text: 'Set probabilities and exit values for four scenarios. VentureSim computes your multiple in each one and the probability-weighted total.' },
      { el: '[data-tour=submit]', title: 'Submit and learn', text: 'You will see the outcome, whether you covered the factors that mattered, and a formatted memo you can print.' }
    ]);
  }

  // ---------- Metrics guide and sector map ----------
  var SECTORS = window.VS_SECTORS || [], METRICS = window.VS_METRICS || {};
  R.metrics = function (parts) {
    var sid = parts[1] || (SECTORS[0] && SECTORS[0].id), sector = SECTORS.filter(function (x) { return x.id === sid; })[0] || SECTORS[0];
    document.title = 'Startup metrics guide | VentureSim';
    var tabs = '<nav class="sector-tabs" aria-label="Sectors">' + SECTORS.map(function (x) { return '<a href="#/metrics/' + x.id + '"' + (x.id === sector.id ? ' aria-current="page"' : '') + '>' + esc(x.name) + '</a>'; }).join('') + '</nav>';
    var subs = sector.subsectors.map(function (sub) {
      return '<section class="sub-block" id="sub-' + sub.id + '"><h3>' + esc(sub.name) + '</h3><p>' + esc(sub.about) + '</p><div class="metric-list">' +
        sub.metrics.map(function (id) { var m = METRICS[id]; return m ? '<div class="metric"><b>' + esc(m.name) + '</b><p>' + esc(m.what) + '</p><p><span class="lbl">How: </span>' + esc(m.how) + '</p><p><span class="lbl">Rough guide: </span>' + esc(m.good) + '</p></div>' : ''; }).join('') +
        '</div><p class="watch"><b>Watch for:</b> ' + esc(sub.watch) + '</p></section>';
    }).join('');
    A.render(A.shell('metrics', A.page(A.pageHead('Startup metrics guide', 'The numbers investors expect for each sector and subsector, what each one measures, how to calculate it, and a rough sense of what good looks like. Benchmarks move with markets, so treat them as starting points.') ,
      tabs + '<p class="muted" style="margin-bottom:16px"><b>' + esc(sector.name) + '.</b> ' + esc(sector.about) + ' <a href="#/sectors">See every sector and subsector</a>.</p>' + subs)));
    if (parts[2]) { var el = document.getElementById('sub-' + parts[2]); if (el) el.scrollIntoView(); }
  };
  R.sectors = function () {
    document.title = 'Sector map | VentureSim';
    A.render(A.shell('sectors', A.page(A.pageHead('Sector map', 'How startup sectors break down into subsectors. Every subsector links to the metrics investors use for it.'),
      '<div class="map-grid">' + SECTORS.map(function (x) {
        return '<article class="map-card"><h3>' + esc(x.name) + '</h3><p>' + esc(x.about) + '</p><ul>' + x.subsectors.map(function (sub) {
          return '<li><a href="#/metrics/' + x.id + '/' + sub.id + '">' + esc(sub.name) + '</a><span>' + esc(sub.about) + '</span></li>';
        }).join('') + '</ul></article>';
      }).join('') + '</div>')));
  };
})();
