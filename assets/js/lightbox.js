/* lightbox.js — full-screen image lightbox with slide navigation
   Usage: add [data-lightbox="<full-src>"] to any element.
   Optional [data-lightbox-alt="..."] for the img alt attribute.
   When triggered from inside .popup-slide or .sheet-slide, all sibling
   slides with images are collected and become navigable.
*/

(function () {
  var lb      = document.getElementById('lightbox');
  var img     = document.getElementById('lightbox-img');
  var pdf     = document.getElementById('lightbox-pdf');
  var close   = document.getElementById('lightbox-close');
  var btnPrev = document.getElementById('lightbox-prev');
  var btnNext = document.getElementById('lightbox-next');
  var counter = document.getElementById('lightbox-counter');

  if (!lb || !img) return;

  function _isPdf(src) {
    return src && src.toLowerCase().split('?')[0].endsWith('.pdf');
  }

  var _slides = [];  /* [{src, alt}] */
  var _idx    = 0;

  function _collectSlides(trigger) {
    /* Find parent track (.popup-slider-track or .sheet-track) */
    var track = trigger.closest('.popup-slider-track, .sheet-track');
    if (!track) return [{ src: trigger.dataset.lightbox, alt: trigger.dataset.lightboxAlt || '' }];

    var imgs = track.querySelectorAll('img[data-lightbox]');
    var list = [];
    imgs.forEach(function (el) {
      list.push({ src: el.dataset.lightbox, alt: el.dataset.lightboxAlt || '' });
    });
    return list.length ? list : [{ src: trigger.dataset.lightbox, alt: trigger.dataset.lightboxAlt || '' }];
  }

  function _updateUI() {
    var s = _slides[_idx];
    if (_isPdf(s.src)) {
      lb.classList.add('pdf-mode');
      if (pdf) pdf.src = s.src;
      img.src = '';
    } else {
      lb.classList.remove('pdf-mode');
      img.src = s.src;
      img.alt = s.alt || '';
      if (pdf) pdf.src = '';
    }

    var multi = _slides.length > 1;
    if (btnPrev) btnPrev.classList.toggle('hidden', !multi);
    if (btnNext) btnNext.classList.toggle('hidden', !multi);
    if (counter) {
      counter.style.display = multi ? '' : 'none';
      counter.textContent = (_idx + 1) + ' / ' + _slides.length;
    }
  }

  function open(trigger) {
    _slides = _collectSlides(trigger);
    /* Find index of tapped image */
    var tappedSrc = trigger.dataset.lightbox;
    _idx = 0;
    for (var i = 0; i < _slides.length; i++) {
      if (_slides[i].src === tappedSrc) { _idx = i; break; }
    }
    _updateUI();
    lb.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeLb() {
    lb.classList.remove('open', 'pdf-mode');
    document.body.style.overflow = '';
    img.src = '';
    if (pdf) pdf.src = '';
    _slides = [];
  }

  function prev() {
    if (_slides.length < 2) return;
    _idx = (_idx - 1 + _slides.length) % _slides.length;
    _updateUI();
  }

  function next() {
    if (_slides.length < 2) return;
    _idx = (_idx + 1) % _slides.length;
    _updateUI();
  }

  /* Trigger: any [data-lightbox] element */
  document.addEventListener('click', function (e) {
    var trigger = e.target.closest('[data-lightbox]');
    if (!trigger) return;
    /* Ignore clicks on the lightbox itself */
    if (trigger.closest('#lightbox')) return;
    e.preventDefault();
    open(trigger);
  });

  /* Close: overlay click */
  lb.addEventListener('click', function (e) {
    if (e.target === lb) closeLb();
  });

  /* Close button */
  if (close) close.addEventListener('click', closeLb);

  /* Arrow buttons */
  if (btnPrev) btnPrev.addEventListener('click', function (e) { e.stopPropagation(); prev(); });
  if (btnNext) btnNext.addEventListener('click', function (e) { e.stopPropagation(); next(); });

  /* Keyboard */
  document.addEventListener('keydown', function (e) {
    if (!lb.classList.contains('open')) return;
    if (e.key === 'Escape')      closeLb();
    if (e.key === 'ArrowLeft')   prev();
    if (e.key === 'ArrowRight')  next();
  });

  /* Touch swipe */
  var _touchX = 0;
  lb.addEventListener('touchstart', function (e) {
    _touchX = e.touches[0].clientX;
  }, { passive: true });
  lb.addEventListener('touchend', function (e) {
    var dx = e.changedTouches[0].clientX - _touchX;
    if (Math.abs(dx) > 40) { dx < 0 ? next() : prev(); }
  });
})();
