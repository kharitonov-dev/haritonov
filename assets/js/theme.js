/* theme.js — light/dark theme toggle + localStorage persistence
   The no-flash inline script (placed before first paint in <head>) reads
   localStorage and sets [data-theme="light"] if needed. This file handles
   the interactive toggle button (.nav-theme) after the page loads.

   Default (no attribute on <html>) = dark.
   [data-theme="light"]             = light.
*/

function toggleTheme() {
  var html  = document.documentElement;
  var isDark = html.getAttribute('data-theme') !== 'light';
  var next  = isDark ? 'light' : 'dark';

  /* Hide orbs for 2 frames to prevent backdrop-filter colour flash.
     During the switch the orb gradient vars change instantly but the
     compositing pipeline can sample the old colours through the glass
     panels before the repaint, producing a vivid green/teal burst. */
  var orbs = document.querySelectorAll('.orb');
  orbs.forEach(function(o) { o.style.visibility = 'hidden'; });

  html.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  _syncThemeBtn();

  requestAnimationFrame(function() {
    requestAnimationFrame(function() {
      orbs.forEach(function(o) { o.style.visibility = ''; });
    });
  });
}

function _syncThemeBtn() {
  var btn = document.getElementById('nav-theme-btn');
  if (!btn) return;
  var isLight = document.documentElement.getAttribute('data-theme') === 'light';
  btn.textContent = isLight ? '🌙' : '☀️';
  btn.setAttribute('aria-label', isLight ? 'Тёмная тема' : 'Светлая тема');
}

/* Sync button icon immediately (script runs after DOM, at bottom of <body>) */
_syncThemeBtn();
