/* tabbar.js — mobile tab bar navigation + scroll-based active state */

var _tabScrolling = false;

function tabNav(btn, id) {
    document.querySelectorAll('.tab-item').forEach(function (t) { t.classList.remove('active'); });
    btn.classList.add('active');
    _tabScrolling = true;
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
    setTimeout(function () { _tabScrolling = false; }, 800);
}

function _setActiveTab(id) {
    document.querySelectorAll('.tab-item').forEach(function (btn) {
        var matches = btn.getAttribute('onclick') && btn.getAttribute('onclick').indexOf("'" + id + "'") !== -1;
        btn.classList.toggle('active', matches);
    });
}

var _tabObserver = new IntersectionObserver(function (entries) {
    if (_tabScrolling) return;
    entries.forEach(function (entry) {
        if (entry.isIntersecting) _setActiveTab(entry.target.id);
    });
}, { rootMargin: "-40% 0px -55% 0px", threshold: 0 });

['about', 'work', 'skills', 'connect'].forEach(function (id) {
    var el = document.getElementById(id);
    if (el) _tabObserver.observe(el);
});
