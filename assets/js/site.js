// Public pages: mobile menu, syllabus, the 50-startup explorer, video players.
(function () {
  'use strict';

  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }

  var head = document.querySelector('.site-head');
  var toggle = document.querySelector('.nav-toggle');
  if (head && toggle) {
    toggle.addEventListener('click', function () {
      var open = head.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
      toggle.textContent = open ? 'Close' : 'Menu';
    });
  }

  // Course syllabus lists (home page and founders page).
  function syllabus(el, course, extra) {
    if (!el || !window.GARAGE_COURSE) return;
    el.innerHTML = window.GARAGE_COURSE.filter(function (m) { return m.course === course; }).map(function (m) {
      return '<li><a href="app.html#/course/' + m.slug + '"><span class="n" aria-hidden="true">' + m.n + '</span>' +
        '<h3>' + esc(m.title) + '</h3><span class="meta">' + (m.part === 'Build it yourself' ? 'Build it yourself, ' : '') + m.minutes + ' min read</span><p>' + esc(m.summary) + '</p></a></li>';
    }).join('') + (extra || '');
  }
  syllabus(document.getElementById('syllabus'), 'vc',
    '<li><a href="break-into-vc.html"><span class="n" aria-hidden="true">+</span><h3>How to break into venture capital</h3>' +
    '<span class="meta">Guide</span><p>The paths in, what firms look for, how interviews work, and a 90-day plan.</p></a></li>');
  syllabus(document.getElementById('founder-syllabus'), 'founder');

  // Founders page: ask a question. Goes to the feedback Google Form, which emails the team.
  var ask = document.getElementById('ask-form');
  if (ask) {
    ask.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = document.getElementById('ask-name').value.trim(), email = document.getElementById('ask-email').value.trim(), q = document.getElementById('ask-q').value.trim();
      var err = document.getElementById('ask-err');
      if (!q) { err.textContent = 'Write your question first.'; document.getElementById('ask-q').focus(); return; }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { err.textContent = 'Enter a valid email so we can reply.'; document.getElementById('ask-email').focus(); return; }
      err.textContent = '';
      var btn = ask.querySelector('button'); btn.disabled = true; btn.textContent = 'Sending...';
      window.VSForms.send('feedback', { 'Type': 'Founder question', 'Name': name, 'Email': email, 'Where (test or page)': 'Founders page', 'Message': q }).then(function () {
        ask.innerHTML = '<p style="font:400 22px var(--serif);color:#fff" role="status">Thanks. We will reply to ' + esc(email) + '.</p>';
      });
    });
  }

  // Residency page: join the list. Goes to the feedback Google Form, which emails the team.
  var rf = document.getElementById('res-form');
  if (rf) {
    rf.addEventListener('submit', function (e) {
      e.preventDefault();
      var v = function (id) { return document.getElementById(id).value.trim(); };
      var err = document.getElementById('res-err');
      if (!v('res-name')) { err.textContent = 'Enter your name.'; return document.getElementById('res-name').focus(); }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v('res-email'))) { err.textContent = 'Enter a valid email so we can reach you.'; return document.getElementById('res-email').focus(); }
      if (!v('res-role')) { err.textContent = 'Choose whether you are a founder, an investor, or both.'; return document.getElementById('res-role').focus(); }
      err.textContent = '';
      var btn = rf.querySelector('button'), email = v('res-email'); btn.disabled = true; btn.textContent = 'Sending...';
      window.VSForms.send('feedback', { 'Type': 'Residency interest', 'Name': v('res-name'), 'Email': v('res-email'), 'Where (test or page)': 'Residency page: ' + v('res-role'), 'Message': v('res-note') || '(no note)' }).then(function () {
        rf.innerHTML = '<p class="res-thanks" role="status">You are on the list. We will email ' + esc(email) + ' when details are ready.</p>';
      });
    });
  }

  // One test, fifty startups: every company from Analyst test 1 as a dot.
  var dotsEl = document.getElementById('dots');
  var card = document.getElementById('deal-card');
  if (dotsEl && card && window.GarageEngine) {
    var E = window.GarageEngine;
    var test = E.generateTest('analyst', 1);
    var cs = test.companies;
    dotsEl.innerHTML = cs.map(function (c) {
      var m = c.hidden.multiple;
      var cls = m >= 3 ? 'win' : m >= 1 ? 'mid' : '';
      var size = m >= 3 ? Math.min(30, 16 + 5 * Math.log2(m / 3 + 1)) : m >= 1 ? 13 : 9;
      return '<button class="dot ' + cls + '" type="button" data-i="' + c.i + '" aria-pressed="false" aria-label="' + esc(c.name) + ', returned ' + E.mult(m) + '">' +
        '<i style="--s:' + size.toFixed(0) + 'px"></i></button>';
    }).join('');

    var show = function (i) {
      var c = cs[i], h = c.hidden, t = c.terms;
      var rows = c.traction.slice(0, 2).concat([['Post-money', E.money(t.post)], ['Your check', E.money(t.check)]]);
      card.innerHTML =
        '<div class="deal-top"><p class="deal-kicker">The deal, month ' + c.month + ' of 36</p><h3>' + esc(c.name) + '</h3>' +
        '<p class="tags">' + c.stageLabel + ', ' + esc(c.sectorLabel) + ', ' + esc(c.location) + (c.inThesis ? '' : '. Outside the fund\'s thesis') + '</p>' +
        '<p class="pitch">' + esc(c.pitch) + '</p>' +
        '<dl>' + rows.map(function (r) { return '<div><dt>' + esc(r[0]) + '</dt><dd>' + esc(r[1]) + '</dd></div>'; }).join('') + '</dl></div>' +
        '<div class="deal-bottom"><p class="big ' + (h.multiple >= 1 ? 'good' : '') + '">' + E.mult(h.multiple) + '</p>' +
        '<div><p class="outcome">' + esc(h.outcome) + '</p><ul>' + h.mattered.map(function (x) { return '<li>' + esc(x.text) + '</li>'; }).join('') + '</ul></div></div>';
      dotsEl.querySelectorAll('.dot').forEach(function (b) { b.setAttribute('aria-pressed', String(+b.getAttribute('data-i') === i)); });
    };
    dotsEl.addEventListener('click', function (e) { var b = e.target.closest('.dot'); if (b) show(+b.getAttribute('data-i')); });
    // Start on the biggest winner.
    show(cs.reduce(function (a, c) { return c.hidden.multiple > a.hidden.multiple ? c : a; }).i);
  }

  // YouTube embeds load only when someone presses play, from the no-cookie domain.
  document.querySelectorAll('.yt').forEach(function (fig) {
    var btn = fig.querySelector('.yt-play');
    btn.addEventListener('click', function () {
      var f = document.createElement('iframe');
      f.src = 'https://www.youtube-nocookie.com/embed/' + fig.getAttribute('data-yt') + '?autoplay=1&rel=0';
      f.title = fig.getAttribute('data-title');
      f.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
      f.allowFullscreen = true;
      btn.replaceWith(f);
      f.focus();
    });
  });

  // Prompt library: copy a prompt to the clipboard.
  document.querySelectorAll('.prompt-copy').forEach(function (b) {
    b.addEventListener('click', function () {
      var text = document.getElementById(b.getAttribute('data-copy')).textContent;
      var done = function () { b.textContent = 'Copied'; setTimeout(function () { b.textContent = 'Copy prompt'; }, 1800); };
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(done, function () { fallback(); });
      else fallback();
      function fallback() {
        var r = document.createRange(), el = document.getElementById(b.getAttribute('data-copy'));
        r.selectNodeContents(el); var sel = getSelection(); sel.removeAllRanges(); sel.addRange(r);
        b.textContent = 'Press Ctrl+C to copy';
      }
    });
  });

  window.GaragePlayers = function (scope) {
    (scope || document).querySelectorAll('.player').forEach(function (player) {
      if (player.dataset.ready) return;
      player.dataset.ready = '1';
      var poster = player.querySelector('.poster');
      var img = player.getAttribute('data-poster');
      if (img) {
        var probe = new Image();
        probe.onload = function () { poster.style.backgroundImage = 'url("' + img + '")'; poster.classList.add('has-image'); };
        probe.src = img;
      }
      poster.addEventListener('click', function () {
        var old = player.querySelector('.player-msg');
        if (old) old.remove();
        var video = document.createElement('video');
        video.src = player.getAttribute('data-src');
        video.controls = true;
        video.autoplay = true;
        video.playsInline = true;
        if (img) video.poster = img;
        video.addEventListener('error', function () {
          video.remove();
          poster.hidden = false;
          var msg = document.createElement('p');
          msg.className = 'player-msg';
          msg.setAttribute('role', 'status');
          msg.textContent = 'This video is not available yet. Try the example test in the meantime.';
          player.appendChild(msg);
        });
        poster.hidden = true;
        player.appendChild(video);
        video.focus();
      });
    });
  };
  window.GaragePlayers();
})();
