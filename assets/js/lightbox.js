/* lightbox.js — image lightbox overlay
   Usage: add [data-lightbox="<full-src>"] to any element.
   Optional [data-lightbox-alt="..."] for the img alt attribute.
*/

(function () {
  var lb    = document.getElementById('lightbox');
  var img   = document.getElementById('lightbox-img');
  var close = document.getElementById('lightbox-close');

  if (!lb || !img) return;

  function open(src, alt) {
    img.src = src;
    img.alt = alt || '';
    lb.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeLb() {
    lb.classList.remove('open');
    document.body.style.overflow = '';
    img.src = '';
  }

  /* Trigger: any [data-lightbox] element */
  document.addEventListener('click', function (e) {
    var trigger = e.target.closest('[data-lightbox]');
    if (trigger) {
      e.preventDefault();
      open(trigger.dataset.lightbox, trigger.dataset.lightboxAlt);
    }
  });

  /* Close: overlay click */
  lb.addEventListener('click', function (e) {
    if (e.target === lb) closeLb();
  });

  /* Close: button */
  close.addEventListener('click', closeLb);

  /* Close: Escape */
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && lb.classList.contains('open')) closeLb();
  });
})();
