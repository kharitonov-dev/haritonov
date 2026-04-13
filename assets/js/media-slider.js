/* media-slider.js — Media slider with thumbnails carousel
   Requires: #slider-track, #slider-thumbs, #slider-prev, #slider-next,
             #thumb-prev, #thumb-next in DOM.
   Photo slides open lightbox via 'open-lightbox' custom event.
   Video slides play inline (no lightbox).
*/

(function () {
    var track = document.getElementById('slider-track');
    var thumbsWrap = document.getElementById('slider-thumbs');
    if (!track || !thumbsWrap) return;

    var slides = track.querySelectorAll('.slider-slide');
    var thumbs = thumbsWrap.querySelectorAll('.slider-thumb');
    var total = slides.length;
    var cur = 0;

    function goTo(i) {
        cur = Math.max(0, Math.min(i, total - 1));
        track.style.transform = 'translateX(-' + (cur * 100) + '%)';
        thumbs.forEach(function (t, idx) {
            t.classList.toggle('active', idx === cur);
        });
        var activeThumb = thumbs[cur];
        if (activeThumb) {
            var wrapRect = thumbsWrap.getBoundingClientRect();
            var thumbRect = activeThumb.getBoundingClientRect();
            if (thumbRect.left < wrapRect.left || thumbRect.right > wrapRect.right) {
                activeThumb.scrollIntoView({ inline: 'center', block: 'nearest', behavior: 'smooth' });
            }
        }
    }

    // Main arrows
    var prevBtn = document.getElementById('slider-prev');
    var nextBtn = document.getElementById('slider-next');
    if (prevBtn) prevBtn.addEventListener('click', function () { goTo(cur - 1); });
    if (nextBtn) nextBtn.addEventListener('click', function () { goTo(cur + 1); });

    // Thumb clicks
    thumbs.forEach(function (t) {
        t.addEventListener('click', function () { goTo(parseInt(t.dataset.index)); });
    });

    // Thumb arrows (scroll carousel)
    var thumbPrev = document.getElementById('thumb-prev');
    var thumbNext = document.getElementById('thumb-next');
    if (thumbPrev) thumbPrev.addEventListener('click', function () { thumbsWrap.scrollBy({ left: -200, behavior: 'smooth' }); });
    if (thumbNext) thumbNext.addEventListener('click', function () { thumbsWrap.scrollBy({ left: 200, behavior: 'smooth' }); });

    // Swipe on main slider
    var sx = 0;
    track.addEventListener('touchstart', function (e) { sx = e.touches[0].clientX; }, { passive: true });
    track.addEventListener('touchend', function (e) {
        var dx = e.changedTouches[0].clientX - sx;
        if (Math.abs(dx) > 40) { dx < 0 ? goTo(cur + 1) : goTo(cur - 1); }
    });

    // Click on photo slide → open lightbox
    slides.forEach(function (s) {
        if (s.dataset.type === 'photo') {
            s.addEventListener('click', function () {
                if (s.dataset.lightbox) {
                    document.dispatchEvent(new CustomEvent('open-lightbox', { detail: { trigger: s } }));
                }
            });
        }
    });

    // Keyboard (only when lightbox is closed)
    document.addEventListener('keydown', function (e) {
        var lb = document.getElementById('lightbox');
        if (lb && lb.classList.contains('open')) return;
        if (e.key === 'ArrowLeft') goTo(cur - 1);
        if (e.key === 'ArrowRight') goTo(cur + 1);
    });
})();
