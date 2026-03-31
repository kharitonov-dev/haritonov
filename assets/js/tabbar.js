/* tabbar.js — mobile tab bar navigation + scroll-based active state */

var _tabScrolling = false;
var _tabSections = [];

function tabNav(btn, id) {
    document.querySelectorAll('.tab-item').forEach(function (t) { t.classList.remove('active'); });
    btn.classList.add('active');
    _tabScrolling = true;
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
    setTimeout(function () { _tabScrolling = false; }, 1000);
}

function _setActiveTab(id) {
    document.querySelectorAll('.tab-item').forEach(function (btn) {
        var matches = btn.getAttribute('onclick') && btn.getAttribute('onclick').indexOf("'" + id + "'") !== -1;
        btn.classList.toggle('active', matches);
    });
}

function _onScroll() {
    if (_tabScrolling) return;
    var scrollY = window.scrollY || window.pageYOffset;
    var trigger = scrollY + window.innerHeight * 0.25;
    var active = _tabSections[0] ? _tabSections[0].id : null;
    for (var i = 0; i < _tabSections.length; i++) {
        var top = _tabSections[i].el.getBoundingClientRect().top + scrollY;
        if (top <= trigger) active = _tabSections[i].id;
    }
    if (active) _setActiveTab(active);
}

['about', 'work', 'skills', 'connect'].forEach(function (id) {
    var el = document.getElementById(id);
    if (el) _tabSections.push({ id: id, el: el });
});

window.addEventListener('scroll', _onScroll, { passive: true });
_onScroll();
