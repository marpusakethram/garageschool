// GarageSchool deal flow extras: pitch deck and demo day transcript viewer, the due diligence stage,
// the one-page IC memo, and how both show up in the debrief.
(function () {
  'use strict';
  var A = window.VSApp, E = window.GarageEngine;
  if (!A || !E || !E.pitchDeck) return;
  var esc = A.esc, money = A.money, mult = A.mult;

  // ---------- Pitch deck and transcript ----------
  function slideHtml(s, c) {
    var pts = s.points ? '<ul>' + s.points.map(function (p) { return '<li>' + esc(p) + '</li>'; }).join('') + '</ul>' : '';
    if (s.kind === 'cover') return '<div class="slide cover"><p class="s-mark">' + esc(c.name.charAt(0)) + '</p><h3>' + esc(s.title) + '</h3><p class="s-sub">' + esc(s.sub) + '</p><p class="s-foot">' + esc(s.foot) + '</p></div>';
    if (s.kind === 'team') return '<div class="slide"><p class="s-label">' + esc(s.label) + '</p><div class="s-team">' + s.founders.map(function (f) {
      var ini = f.name.split(' ').map(function (x) { return x.charAt(0); }).join('');
      return '<div><span class="s-avatar" aria-hidden="true">' + esc(ini) + '</span><b>' + esc(f.name) + '</b><span>' + esc(f.role) + '</span><p>' + esc(f.bio) + '</p></div>';
    }).join('') + '</div><p class="s-foot">' + esc(s.foot) + '</p></div>';
    return '<div class="slide ' + s.kind + '"><p class="s-label">' + esc(s.label) + '</p><h3>' + esc(s.title) + '</h3>' + pts + (s.foot ? '<p class="s-foot">' + esc(s.foot) + '</p>' : '') + '</div>';
  }

  A.openDeck = function (c, meta, which) {
    var slides = E.pitchDeck(c, meta), lines = E.demoDayTranscript(c, meta), call = E.founderCall(c, meta), at = 0;
    var dlg = document.createElement('dialog');
    dlg.className = 'deck-dialog';
    dlg.setAttribute('aria-label', c.name + ' pitch materials');
    dlg.innerHTML =
      '<div class="deck-top"><nav class="deck-tabs" aria-label="Pitch materials"><button type="button" data-tab="deck">Pitch deck</button><button type="button" data-tab="talk">Demo day transcript</button><button type="button" data-tab="call">Founder call summary</button></nav>' +
      '<button type="button" class="deck-close" data-close aria-label="Close">Close</button></div>' +
      '<div class="deck-pane" data-pane="deck"><div class="deck-stage" aria-live="polite"></div>' +
        '<div class="deck-nav"><button class="btn btn-secondary btn-sm" type="button" data-step="-1">Previous</button><span class="deck-count"></span><button class="btn btn-secondary btn-sm" type="button" data-step="1">Next</button></div>' +
        '<p class="small muted deck-note">This is the founders\' pitch. Founders present their best case, so check every claim against the deal card and the diligence notes.</p></div>' +
      '<div class="deck-pane" data-pane="talk" hidden><div class="talk"><p class="small muted">Demo day, about one minute. ' + esc(c.name) + ', ' + esc(c.stageLabel) + ', ' + esc(c.location) + '.</p>' +
        lines.map(function (l) { return '<p>' + esc(l) + '</p>'; }).join('') + '</div></div>' +
      '<div class="deck-pane" data-pane="call" hidden><div class="talk"><p class="small muted">Notes from the first call with the founders, written up by an analyst at the fund. Use them for background; check the numbers against the deal card.</p>' +
        '<ol class="call-notes">' + call.map(function (l) { return '<li>' + esc(l) + '</li>'; }).join('') + '</ol></div></div>';
    document.body.appendChild(dlg);
    var stage = dlg.querySelector('.deck-stage'), count = dlg.querySelector('.deck-count');
    function show(k) {
      at = Math.max(0, Math.min(slides.length - 1, k));
      stage.innerHTML = slideHtml(slides[at], c);
      count.textContent = 'Slide ' + (at + 1) + ' of ' + slides.length;
      dlg.querySelector('[data-step="-1"]').disabled = at === 0;
      dlg.querySelector('[data-step="1"]').disabled = at === slides.length - 1;
    }
    function tab(t) {
      dlg.querySelectorAll('[data-tab]').forEach(function (b) { b.setAttribute('aria-pressed', String(b.getAttribute('data-tab') === t)); });
      dlg.querySelectorAll('[data-pane]').forEach(function (p) { p.hidden = p.getAttribute('data-pane') !== t; });
    }
    dlg.addEventListener('click', function (e) {
      if (e.target === dlg || e.target.closest('[data-close]')) return dlg.close();
      var st = e.target.closest('[data-step]'); if (st) show(at + +st.getAttribute('data-step'));
      var tb = e.target.closest('[data-tab]'); if (tb) tab(tb.getAttribute('data-tab'));
    });
    dlg.addEventListener('keydown', function (e) {
      if (dlg.querySelector('[data-pane=deck]').hidden) return;
      if (e.key === 'ArrowRight') { e.preventDefault(); show(at + 1); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); show(at - 1); }
    });
    dlg.addEventListener('close', function () { dlg.remove(); });
    var first = which === 'talk' || which === 'call' ? which : 'deck';
    show(0); tab(first);
    dlg.showModal();
    dlg.querySelector('[data-tab="' + first + '"]').focus();
  };

  // ---------- Due diligence and IC memo ----------
  function head(track, n, meta, step) {
    var steps = ['Screen 50 deals', 'Due diligence', 'IC memo'];
    return '<ol class="stage-steps" aria-label="Test stages">' + steps.map(function (s, k) {
      return '<li class="' + (k < step ? 'done' : k === step ? 'now' : '') + '"' + (k === step ? ' aria-current="step"' : '') + '>' + s + '</li>';
    }).join('') + '</ol>';
  }
  function shortlist(st) {
    if (!st.shortlist) st.shortlist = A.picksOf(st);
    return st.shortlist;
  }
  function ddState(st, i) { st.dd = st.dd || {}; st.dd[i] = st.dd[i] || { a: [] }; return st.dd[i]; }
  function complete(test, meta, st, i) {
    var s = ddState(st, i), qs = E.dueDiligence(test.companies[i], meta);
    return s.a.filter(function (x) { return x != null; }).length === qs.length && (s.keep === true || s.keep === false);
  }

  A.dealStage = function (track, n) {
    var st = A.testState(track, n), test = A.getTest(track, n), meta = test.meta;
    var list = shortlist(st);
    if (!list.length) { st.stage = null; A.save(); return A.finishTest(track, n); }
    if (!st.stage) { st.stage = 'diligence'; st.updatedAt = Date.now(); A.save(); }
    if (st.stage === 'ic') return viewIC(track, n);
    return viewDD(track, n);
  };

  function viewDD(track, n) {
    var st = A.testState(track, n), test = A.getTest(track, n), meta = test.meta, list = shortlist(st);
    A.setKeys(null);
    document.title = 'Due diligence, ' + A.trackName(track) + ' test ' + n + ' | GarageSchool';
    var done = list.filter(function (i) { return complete(test, meta, st, i); }).length;
    var firstOpen = list.filter(function (i) { return !complete(test, meta, st, i); })[0];
    var cards = list.map(function (i) {
      var c = test.companies[i], s = ddState(st, i), qs = E.dueDiligence(c, meta), ok = complete(test, meta, st, i);
      var qHtml = qs.map(function (q, k) {
        var ans = s.a[k];
        return '<fieldset class="dd-q"><legend>' + (k + 1) + '. ' + esc(q.prompt) + '</legend>' + (q.context ? '<p class="dd-context">' + esc(q.context) + '</p>' : '') +
          q.options.map(function (o, j) {
            var cls = ans == null ? '' : j === q.answer ? ' right' : j === ans ? ' wrong' : '';
            return '<label class="dd-opt' + cls + '"><input type="radio" name="q-' + i + '-' + k + '" value="' + j + '" data-i="' + i + '" data-k="' + k + '"' + (ans === j ? ' checked' : '') + (ans != null ? ' disabled' : '') + '><span>' + esc(o) + '</span></label>';
          }).join('') +
          (ans != null ? '<p class="dd-explain ' + (ans === q.answer ? 'good' : 'bad') + '"><b>' + (ans === q.answer ? 'Correct.' : 'Not quite.') + '</b> ' + esc(q.explain) + '</p>' : '') + '</fieldset>';
      }).join('');
      var d = st.decisions[c.i] || {};
      return '<details class="dd-card' + (ok ? ' complete' : '') + '"' + (i === firstOpen ? ' open' : '') + ' id="dd-' + i + '"><summary><span class="dd-title"><b>' + esc(c.name) + '</b><span class="small muted">' + esc(c.stageLabel) + ', ' + esc(c.sectorLabel) + ', ' + money(c.terms.post) + ' post-money</span></span>' +
        '<span class="pill ' + (s.keep === true ? 'good' : s.keep === false ? 'bad' : '') + '">' + (s.keep === true ? 'Keep for IC' : s.keep === false ? 'Dropped' : (s.a.filter(function (x) { return x != null; }).length + ' of ' + qs.length + ' answered')) + '</span></summary>' +
        '<div class="dd-body"><p class="co-pitch" style="margin:0 0 10px">' + esc(c.pitch) + '</p>' +
          (d.reasons ? '<p class="small muted">Why you picked it: ' + d.reasons.map(function (x) { return (A.REASONS.filter(function (y) { return y[0] === x; })[0] || [0, x])[1]; }).join(', ') + (d.reason ? '. "' + esc(d.reason) + '"' : '') + '</p>' : '') +
          '<div class="deck-bar"><button class="btn btn-secondary btn-sm" type="button" data-deck="' + i + '">View pitch deck</button><button class="btn btn-secondary btn-sm" type="button" data-talk="' + i + '">Demo day transcript</button><button class="btn btn-secondary btn-sm" type="button" data-call="' + i + '">Founder call summary</button><button class="btn btn-link btn-sm" type="button" data-card="' + i + '">Show the full deal card</button></div>' +
          '<div class="dd-full" id="full-' + i + '" hidden></div>' + qHtml +
          '<div class="dd-decide"><p><b>Your decision after diligence</b></p><div class="decide-buttons"><button class="btn ' + (s.keep === false ? 'btn-bad' : 'btn-secondary') + '" type="button" data-keep="0" data-i="' + i + '">Drop</button>' +
          '<button class="btn ' + (s.keep === true ? 'btn-good' : 'btn-secondary') + '" type="button" data-keep="1" data-i="' + i + '">Keep for IC</button></div></div></div></details>';
    }).join('');
    var allDone = done === list.length;
    A.render(A.shell('tests', A.page(
      A.pageHead('Due diligence: ' + A.trackName(track) + ' test ' + n, 'You ' + (track === 'analyst' ? 'advanced ' : 'chose to invest in ') + list.length + ' companies. Now dig in. For each one, work through the scenarios, then keep it for the investment committee or drop it. Your progress saves as you go.', '<a href="#/tests/' + track + '">' + A.trackName(track) + ' tests</a>'),
      head(track, n, meta, 1) +
      '<div id="dd-wrap"><p class="dd-progress"><b>' + done + ' of ' + list.length + '</b> companies reviewed</p>' + cards +
      '<div class="dd-foot"><button class="btn btn-primary btn-lg" type="button" id="to-ic"' + (allDone ? '' : ' disabled') + '>Continue to the IC memo</button><a class="btn btn-secondary btn-lg" href="#/tests/' + track + '">Save and exit</a>' +
      (allDone ? '' : '<span class="small muted">Answer every scenario and decide on every company to continue.</span>') + '</div></div>'
    )));
    // Listen on the wrapper, which is replaced on every render, so handlers never stack up.
    var wrap = document.getElementById('dd-wrap');
    wrap.addEventListener('change', function (e) {
      var r = e.target.closest('input[type=radio][data-i]'); if (!r) return;
      var i = +r.getAttribute('data-i'), k = +r.getAttribute('data-k');
      ddState(st, i).a[k] = +r.value; st.updatedAt = Date.now(); A.save();
      rerender(i);
    });
    wrap.addEventListener('click', function (e) {
      var b = e.target.closest('[data-keep],[data-deck],[data-talk],[data-call],[data-card],[data-act],#to-ic'); if (!b) return;
      if (b.hasAttribute('data-act')) {
        var card = b.closest('.dd-card'), act = b.getAttribute('data-act');
        if (card && (act === 'deck' || act === 'talk')) A.openDeck(test.companies[+card.id.slice(3)], meta, act);
        return;
      }
      if (b.id === 'to-ic') { st.stage = 'ic'; st.updatedAt = Date.now(); A.save(); return viewIC(track, n); }
      if (b.hasAttribute('data-deck')) return A.openDeck(test.companies[+b.getAttribute('data-deck')], meta, 'deck');
      if (b.hasAttribute('data-call')) return A.openDeck(test.companies[+b.getAttribute('data-call')], meta, 'call');
      if (b.hasAttribute('data-talk')) return A.openDeck(test.companies[+b.getAttribute('data-talk')], meta, 'talk');
      if (b.hasAttribute('data-card')) {
        var ci = +b.getAttribute('data-card'), box = document.getElementById('full-' + ci);
        if (box.hidden && !box.innerHTML) box.innerHTML = A.companyHtml(test.companies[ci], meta, true);
        box.hidden = !box.hidden; b.textContent = box.hidden ? 'Show the full deal card' : 'Hide the full deal card';
        return;
      }
      var i = +b.getAttribute('data-i'), keep = b.getAttribute('data-keep') === '1';
      var qs = E.dueDiligence(test.companies[i], meta), s = ddState(st, i);
      if (s.a.filter(function (x) { return x != null; }).length < qs.length) { alert('Answer every scenario for this company first.'); return; }
      s.keep = keep;
      var d = st.decisions[test.companies[i].i];
      if (keep) { d.yes = true; delete d.dropped; } else { d.yes = false; d.dropped = true; }
      st.updatedAt = Date.now(); A.save();
      rerender(null);
    });
    function rerender(focusI) {
      var y = window.scrollY;
      viewDD(track, n);
      window.scrollTo(0, y);
      if (focusI != null) { var card = document.getElementById('dd-' + focusI); if (card) card.open = true; }
    }
  }

  var MEMO_FIELDS = [
    ['thesis', 'Investment thesis in one or two sentences', 'textarea', 'What this company is, and why it could be very large.'],
    ['r1', 'Reason to invest 1', 'input'], ['r2', 'Reason to invest 2', 'input'], ['r3', 'Reason to invest 3 (optional)', 'input'],
    ['k1', 'Key risk 1, and how you would reduce it', 'input'], ['k2', 'Key risk 2, and how you would reduce it', 'input'], ['k3', 'Key risk 3 (optional)', 'input'],
    ['dd', 'What due diligence found', 'textarea', 'Calls, numbers you checked, and anything that changed your mind.'],
    ['terms', 'Valuation and terms', 'textarea', 'Is the price fair for the stage and the evidence? What ownership do you get?'],
    ['mbt', 'What must be true for this to return the fund', 'textarea']
  ];
  function words(t) { return (t.match(/\S+/g) || []).length; }

  function viewIC(track, n) {
    var st = A.testState(track, n), test = A.getTest(track, n), meta = test.meta;
    var kept = shortlist(st).filter(function (i) { return st.dd && st.dd[i] && st.dd[i].keep === true; });
    A.setKeys(null);
    document.title = 'IC memo, ' + A.trackName(track) + ' test ' + n + ' | GarageSchool';
    var m = st.memo = st.memo || {};
    if (!kept.length) {
      A.render(A.shell('tests', A.page(A.pageHead('IC memo: ' + A.trackName(track) + ' test ' + n, null), head(track, n, meta, 2) +
        '<section class="panel"><div class="panel-body"><p>You dropped every company after diligence, so there is nothing to take to the investment committee. That can be the right call. Your debrief shows how each company turned out.</p>' +
        '<div class="dd-foot"><button class="btn btn-primary btn-lg" type="button" id="finish">See the debrief</button><button class="btn btn-secondary btn-lg" type="button" id="back-dd">Back to due diligence</button></div></div></section>')));
      document.getElementById('finish').addEventListener('click', function () { st.stage = null; A.finishTest(track, n); });
      document.getElementById('back-dd').addEventListener('click', function () { st.stage = 'diligence'; A.save(); viewDD(track, n); });
      return;
    }
    if (m.company == null || kept.indexOf(m.company) === -1) {
      var conv = kept.slice().sort(function (a, b) { return ((st.decisions[test.companies[b].i] || {}).conviction || 2) - ((st.decisions[test.companies[a].i] || {}).conviction || 2); });
      m.company = conv[0];
    }
    var c = test.companies[m.company];
    var fields = MEMO_FIELDS.map(function (f) {
      var v = esc(m[f[0]] || '');
      return '<div class="memo-f' + (f[2] === 'textarea' ? ' wide' : '') + '"><label for="m-' + f[0] + '">' + f[1] + '</label>' + (f[3] ? '<p class="hint">' + f[3] + '</p>' : '') +
        (f[2] === 'textarea' ? '<textarea id="m-' + f[0] + '" rows="3">' + v + '</textarea>' : '<input type="text" id="m-' + f[0] + '" value="' + v + '">') + '</div>';
    }).join('');
    A.render(A.shell('tests', A.page(
      A.pageHead('IC memo: ' + A.trackName(track) + ' test ' + n, 'Write a one-page memo for the investment committee on the company you would fight for. Keep it to one page, about 450 words. Your draft saves as you type.', '<a href="#/tests/' + track + '">' + A.trackName(track) + ' tests</a>'),
      head(track, n, meta, 2) +
      '<form class="form panel panel-body memo-form" id="icf" novalidate style="max-width:none">' +
        '<div class="memo-top"><div><label for="m-company">Company</label><select id="m-company">' + kept.map(function (i) { return '<option value="' + i + '"' + (i === m.company ? ' selected' : '') + '>' + esc(test.companies[i].name) + '</option>'; }).join('') + '</select></div>' +
        '<div><label for="m-rec">Recommendation</label><select id="m-rec"><option value="">Choose</option>' + ['Invest', 'Pass'].map(function (x) { return '<option' + (m.rec === x ? ' selected' : '') + '>' + x + '</option>'; }).join('') + '</select></div>' +
        '<div class="memo-co"><b>' + esc(c.name) + '</b><span class="small muted">' + esc(c.pitch) + ' ' + money(c.terms.check) + ' for ' + A.pct(c.terms.ownership) + ' at ' + money(c.terms.post) + ' post-money.</span>' +
        '<span class="deck-bar" style="margin:6px 0 0"><button class="btn btn-secondary btn-sm" type="button" data-deck>Pitch deck</button><button class="btn btn-secondary btn-sm" type="button" data-card>Deal card</button></span></div></div>' +
        '<div class="dd-full" id="ic-card" hidden></div>' +
        '<div class="memo-fields">' + fields + '</div>' +
        '<p class="small muted" id="m-words"></p><p class="form-error" id="form-error" role="alert"></p>' +
        '<div class="dd-foot"><button class="btn btn-primary btn-lg" type="submit">Submit to the investment committee</button><button class="btn btn-secondary btn-lg" type="button" id="back-dd">Back to due diligence</button></div>' +
      '</form>')));
    var form = document.getElementById('icf');
    function collect() {
      m.company = +document.getElementById('m-company').value; m.rec = document.getElementById('m-rec').value;
      MEMO_FIELDS.forEach(function (f) { m[f[0]] = document.getElementById('m-' + f[0]).value.trim(); });
    }
    function count() {
      var w = MEMO_FIELDS.reduce(function (s, f) { return s + words(document.getElementById('m-' + f[0]).value); }, 0);
      var el = document.getElementById('m-words');
      el.textContent = w + ' words' + (w > 500 ? '. Over one page: cut it to about 450.' : '.');
      el.style.color = w > 500 ? 'var(--bad)' : '';
      return w;
    }
    var timer;
    form.addEventListener('input', function () { count(); clearTimeout(timer); timer = setTimeout(function () { collect(); st.updatedAt = Date.now(); A.save(); }, 400); });
    count();
    document.getElementById('m-company').addEventListener('change', function () { collect(); A.save(); viewIC(track, n); });
    form.querySelector('[data-deck]').addEventListener('click', function () { A.openDeck(c, meta, 'deck'); });
    document.getElementById('ic-card').addEventListener('click', function (e) { var b = e.target.closest('[data-act]'); if (b && (b.getAttribute('data-act') === 'deck' || b.getAttribute('data-act') === 'talk')) A.openDeck(c, meta, b.getAttribute('data-act')); });
    form.querySelector('[data-card]').addEventListener('click', function () { var b = document.getElementById('ic-card'); if (!b.innerHTML) b.innerHTML = A.companyHtml(c, meta, true); b.hidden = !b.hidden; });
    document.getElementById('back-dd').addEventListener('click', function () { collect(); st.stage = 'diligence'; A.save(); viewDD(track, n); });
    form.addEventListener('submit', function (e) {
      e.preventDefault(); collect();
      var err = function (msg, id) { document.getElementById('form-error').textContent = msg; var f = document.getElementById(id); if (f) f.focus(); };
      if (!m.rec) return err('Choose invest or pass.', 'm-rec');
      if ((m.thesis || '').length < 25) return err('Write your thesis in at least a full sentence.', 'm-thesis');
      if (!m.r1 || !m.r2) return err('Give at least two reasons.', m.r1 ? 'm-r2' : 'm-r1');
      if (!m.k1 || !m.k2) return err('Name at least two risks and how you would reduce them.', m.k1 ? 'm-k2' : 'm-k1');
      if ((m.dd || '').length < 20) return err('Summarize what due diligence found.', 'm-dd');
      if (count() > 600) return err('The memo is well over one page. Cut it down before submitting.', 'm-thesis');
      m.submittedAt = Date.now(); st.stage = null; A.save();
      A.finishTest(track, n);
    });
  }

  // ---------- Debrief ----------
  A.extendResult = function (res, test, st) {
    if (!st.shortlist || !st.dd) return;
    var meta = test.meta, right = 0, total = 0, drops = [];
    st.shortlist.forEach(function (i) {
      var c = test.companies[i], s = st.dd[i] || { a: [] }, qs = E.dueDiligence(c, meta);
      qs.forEach(function (q, k) { if (s.a[k] != null) { total++; if (s.a[k] === q.answer) right++; } });
      if (s.keep === false) drops.push({ name: c.name, multiple: c.hidden.multiple, ev: c.hidden.ev });
    });
    res.dd = { right: right, total: total, shortlisted: st.shortlist.length, drops: drops,
      goodDrops: drops.filter(function (x) { return x.multiple < 1; }).length, badDrops: drops.filter(function (x) { return x.multiple >= 3; }).length };
    var m = st.memo;
    if (m && m.submittedAt != null && m.company != null) {
      var c = test.companies[m.company], h = c.hidden;
      var checks = [
        [!!(m.r3 || '').trim(), 'Gave three reasons to invest'],
        [!!(m.k3 || '').trim(), 'Named three risks'],
        [/\d/.test(m.terms || '') , 'Used numbers on valuation and terms'],
        [(m.mbt || '').length > 30, 'Said what must be true'],
        [(m.rec === 'Invest') === (h.ev >= 1.5), 'Recommendation matched the strength of the evidence']
      ];
      res.memo = { company: c.name, rec: m.rec, outcome: h.outcome, multiple: h.multiple, checks: checks.map(function (x) { return { ok: x[0], text: x[1] }; }), score: checks.filter(function (x) { return x[0]; }).length, of: checks.length };
    }
  };

  A.resultExtras = function (track, n, test, st) {
    var r = st.result; if (!r || !r.dd) return '';
    var dd = r.dd, m = r.memo, memoDoc = '';
    if (m && st.memo) {
      var M = st.memo;
      var sec = function (t, v) { return v ? '<h3>' + t + '</h3><p style="white-space:pre-line">' + esc(v) + '</p>' : ''; };
      memoDoc = '<div class="doc"><h2>IC memo: ' + esc(m.company) + '</h2><p class="sub">' + esc(A.trackName(track)) + ' test ' + n + '. Recommendation: ' + esc(m.rec) + '.</p>' +
        sec('Thesis', M.thesis) + sec('Reasons to invest', [M.r1, M.r2, M.r3].filter(Boolean).map(function (x, k) { return (k + 1) + '. ' + x; }).join('\n')) +
        sec('Key risks', [M.k1, M.k2, M.k3].filter(Boolean).map(function (x, k) { return (k + 1) + '. ' + x; }).join('\n')) +
        sec('Due diligence findings', M.dd) + sec('Valuation and terms', M.terms) + sec('What must be true', M.mbt) + '</div>';
    }
    return '<section class="panel" style="margin-top:20px"><div class="panel-head"><h2>Due diligence and IC</h2></div><div class="panel-body">' +
      '<dl class="score-row"><div class="score"><dt>Diligence scenarios</dt><dd>' + dd.right + ' of ' + dd.total + '</dd><small>Answered correctly</small></div>' +
      '<div class="score"><dt>Dropped after diligence</dt><dd>' + dd.drops.length + ' of ' + dd.shortlisted + '</dd><small>' + (dd.drops.length ? dd.goodDrops + ' returned under 1x, ' + dd.badDrops + ' returned 3x or more' : 'You kept every company') + '</small></div>' +
      (m ? '<div class="score"><dt>IC memo</dt><dd>' + m.score + ' of ' + m.of + '</dd><small>' + esc(m.company) + ': ' + mult(m.multiple) + '</small></div>' : '') + '</dl>' +
      (dd.drops.length ? '<p class="small muted" style="margin-top:12px">Dropped: ' + dd.drops.map(function (x) { return esc(x.name) + ' (' + mult(x.multiple) + ')'; }).join(', ') + '.</p>' : '') +
      (m ? '<h3 style="font:600 15px var(--sans);margin:16px 0 8px">Memo feedback</h3><ul class="lessons">' + m.checks.map(function (x) { return '<li style="border-left-color:' + (x.ok ? 'var(--good)' : 'var(--bad)') + '"><p>' + esc(x.text) + (x.ok ? '.' : ': not yet.') + '</p></li>'; }).join('') +
        '<li style="border-left-color:var(--line-strong)"><p>What happened to ' + esc(m.company) + ': ' + esc(m.outcome) + '</p></li></ul>' +
        '<details style="margin-top:14px"><summary>Read your memo</summary>' + memoDoc + '</details>' : '') +
      '</div></section>';
  };
})();
