// Light or dark. A saved choice wins; otherwise follow the system setting.
// Loaded in <head> without defer so the page never flashes the wrong theme.
(function () {
  'use strict';
  var KEY = 'garage.theme', root = document.documentElement;
  var media = window.matchMedia ? matchMedia('(prefers-color-scheme: dark)') : null;
  function saved() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function resolved() { var s = saved(); return s === 'light' || s === 'dark' ? s : (media && media.matches ? 'dark' : 'light'); }
  function sync() {
    var t = resolved();
    root.setAttribute('data-theme', t);
    var bs = document.querySelectorAll('[data-set-theme]');
    for (var i = 0; i < bs.length; i++) bs[i].setAttribute('aria-pressed', String(bs[i].getAttribute('data-set-theme') === t));
  }
  sync();
  document.addEventListener('click', function (e) {
    var b = e.target.closest && e.target.closest('[data-set-theme]');
    if (!b) return;
    try { localStorage.setItem(KEY, b.getAttribute('data-set-theme')); } catch (err) {}
    sync();
  });
  document.addEventListener('DOMContentLoaded', sync);
  if (media && media.addEventListener) media.addEventListener('change', sync);

  var SUN = '<svg viewBox="0 0 20 20" aria-hidden="true"><circle cx="10" cy="10" r="3.6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M10 1.8v2M10 16.2v2M1.8 10h2M16.2 10h2M4.2 4.2l1.4 1.4M14.4 14.4l1.4 1.4M4.2 15.8l1.4-1.4M14.4 5.6l1.4-1.4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>';
  var MOON = '<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M16.4 12.4A6.8 6.8 0 0 1 7.6 3.6a6.8 6.8 0 1 0 8.8 8.8z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>';
  // Markup for a switch; any page or render can drop it in, then call sync().
  window.GarageTheme = {
    sync: sync,
    switchHtml: function () {
      var t = resolved();
      return '<div class="theme-switch" role="group" aria-label="Theme">' +
        '<button type="button" data-set-theme="light" title="Light theme" aria-pressed="' + (t === 'light') + '">' + SUN + '<span class="sr-only">Light theme</span></button>' +
        '<button type="button" data-set-theme="dark" title="Dark theme" aria-pressed="' + (t === 'dark') + '">' + MOON + '<span class="sr-only">Dark theme</span></button></div>';
    }
  };
})();
