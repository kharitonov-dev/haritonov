/* popup.js — hover popup (desktop) + bottom sheet (mobile) for .keyword keywords */

/* --------------------------------------------------------------------------
   DATA
   -------------------------------------------------------------------------- */
var DATA = {
  mobius: {
    title: "Mobius Conf 2025",
    desc: "Одна из крупнейших iOS-конференций в России. Доклад о жизненном цикле Accessibility-фичи в экосистеме МТС (MAU 30 млн, ~8 млн затронутых пользователей).",
    link: "https://mobiusconf.com/archive/2025%20Spring/persons/6012e40f19ea4956af6efd4992eeb454/",
    linkText: "→ профиль на Mobius",
    slides: [
      {
        cls: "gradient-mask-1",
        img: "/resources/Mobius/mobius-preview.jpg",
        l: "Mobius Conf 2025 · Москва",
      },
      {
        cls: "gradient-mask-2",
        img: "/resources/Mobius/photo-1.jpg",
        l: "Mobius Conf 2025 · Москва",
      },
      {
        cls: "gradient-mask-3",
        img: "/resources/Mobius/photo-2.jpg",
        l: "Mobius Conf 2025 · Москва",
      },
      {
        cls: "gradient-mask-4",
        img: "/resources/Mobius/photo-3.jpg",
        l: "Mobius Conf 2025 · Москва",
      },
      {
        cls: "gradient-mask-5",
        img: "/resources/Mobius/photo-4.jpg",
        l: "Mobius Conf 2025 · Москва",
      },
    ],
  },
  employee: {
    title: "Сотрудник года 2025",
    desc: "Номинация на премию «Сотрудник года» в MWS (ex. МТС Диджитал).",
    slides: [
      {
        cls: "gradient-edge",
        img: "/resources/employee-of-year.png",
        l: "Номинант · MWS (ex. МТС Диджитал)",
      },
    ],
  },
  marathon: {
    title: "Участник марафонов",
    desc: "Казанский национальный полумарафон в составе команды MWS. Баланс между работой и активной жизнью.",
    slides: [
      {
        cls: "gradient-radial-1",
        img: "/resources/marathon-2.jpg",
        l: "Казанский национальный полумарафон (TIMERMAN)",
      },
      {
        cls: "gradient-radial-2",
        img: "/resources/marathon-1.jpg",
        l: "Казанский национальный полумарафон (TIMERMAN)",
      },
      {
        cls: "gradient-radial-3",
        img: "/resources/marathon-participant.jpg",
        l: "Команда MWS · финиш",
      },
    ],
  },
  hockey: {
    title: "Играю в хоккей",
    desc: "Местная любительская команда в Казани. Путешествую с семьей и друзьями.",
    slides: [
      {
        cls: "gradient-shine-1",
        img: "/resources/hockey/photo-0.jpg",
        l: "На льду",
      },
      {
        cls: "gradient-shine-2",
        img: "/resources/hockey/photo-1.jpg",
        l: "На льду",
      },
      {
        cls: "gradient-shine-3",
        img: "/resources/hockey/photo-2.jpg",
        l: "На льду",
      },
      {
        cls: "gradient-shine-4",
        img: "/resources/hockey/photo-3.jpg",
        l: "На льду",
      },
      {
        cls: "gradient-shine-5",
        img: "/resources/hockey/photo-4.jpg",
        l: "На льду",
      },
      {
        cls: "gradient-shine-6",
        img: "/resources/hockey/photo-5.jpg",
        l: "На льду",
      },
    ],
  },
  tg: {
    title: "TG-канал @haritonovme",
    desc: "Про жизнь iOS-разработчика: путешествия, спорт, технологии и всё что между коммитами.",
    link: "https://t.me/haritonovme",
    linkText: "→ открыть канал",
    slides: [{ cls: "gradient-tag", e: "✈️", l: "Жизнь между коммитами" }],
  },
};

/* --------------------------------------------------------------------------
   DESKTOP POPUP
   -------------------------------------------------------------------------- */
var curId = null,
  curIdx = 0,
  hideTimer = null;

var slideHeights = {};
var POPUP_W = 252,
  DEFAULT_H = 128,
  MIN_H = 80,
  MAX_H = 240;

function setSliderHeight(h) {
  var slider = document.querySelector(".popup-slider");
  if (slider) slider.style.height = h + "px";
}

function preloadSlideHeights(id) {
  var d = DATA[id];
  if (!slideHeights[id]) {
    slideHeights[id] = d.slides.map(function (s) {
      return s.img ? null : DEFAULT_H;
    });
  }
  d.slides.forEach(function (s, i) {
    if (s.img && slideHeights[id][i] === null) {
      (function (idx) {
        var img = new Image();
        img.onload = function () {
          var h = Math.round(POPUP_W * (img.naturalHeight / img.naturalWidth));
          h = Math.max(MIN_H, Math.min(h, MAX_H));
          slideHeights[id][idx] = h;
          if (curId === id && curIdx === idx) setSliderHeight(h);
        };
        img.onerror = function () {
          slideHeights[id][idx] = DEFAULT_H;
        };
        img.src = s.img;
      })(i);
    }
  });
}

function buildPopup(id) {
  var d = DATA[id];
  curIdx = 0;
  var track = document.getElementById("popup-track"),
    nav = document.getElementById("popup-nav");
  track.innerHTML = "";
  nav.innerHTML = "";
  d.slides.forEach(function (s, i) {
    var div = document.createElement("div");
    div.className = "popup-slide " + s.cls;
    var inner = s.img
      ? '<img src="' +
        s.img +
        '" data-lightbox="' +
        (s.fullImg || s.img) +
        '" data-lightbox-alt="' +
        s.l.replace(/"/g, "&quot;") +
        '" style="width:100%;height:100%;object-fit:cover;position:absolute;inset:0;">'
      : '<span class="popup-slide-emoji">' + s.e + "</span>";
    div.innerHTML = inner + '<div class="popup-slide-label">' + s.l + "</div>";
    track.appendChild(div);
    var dot = document.createElement("div");
    dot.className = "popup-dot" + (i === 0 ? " on" : "");
    dot.dataset.i = i;
    dot.onmousedown = function (e) {
      e.stopPropagation();
      goSlide(+this.dataset.i);
    };
    nav.appendChild(dot);
  });
  track.style.transform = "translateX(0)";
  preloadSlideHeights(id);
  var h0 =
    slideHeights[id] && slideHeights[id][0] != null
      ? slideHeights[id][0]
      : DEFAULT_H;
  setSliderHeight(h0);
  document.getElementById("popup-title").textContent = d.title;
  document.getElementById("popup-desc").textContent = d.desc;
  var lnk = document.getElementById("popup-link");
  if (d.link) {
    lnk.href = d.link;
    lnk.textContent = d.linkText;
    lnk.style.display = "";
  } else {
    lnk.style.display = "none";
  }
  var pl = document.getElementById("popup-arrow-left"),
    pr = document.getElementById("popup-arrow-right");
  pl.style.display = d.slides.length < 2 ? "none" : "";
  pr.style.display = d.slides.length < 2 ? "none" : "";
}

function goSlide(i) {
  var d = DATA[curId];
  curIdx = (i + d.slides.length) % d.slides.length;
  document.getElementById("popup-track").style.transform =
    "translateX(-" + curIdx * 100 + "%)";
  var h =
    slideHeights[curId] && slideHeights[curId][curIdx] != null
      ? slideHeights[curId][curIdx]
      : DEFAULT_H;
  setSliderHeight(h);
  document
    .querySelectorAll("#popup-nav .popup-dot")
    .forEach(function (dot, idx) {
      dot.className = "popup-dot" + (idx === curIdx ? " on" : "");
    });
}

function posPopup(t) {
  var tr = t.getBoundingClientRect(),
    pw = 252,
    gap = 10,
    sY = window.scrollY || 0;
  var left = tr.left + tr.width / 2 - pw / 2;
  left = Math.max(8, Math.min(left, window.innerWidth - pw - 8));
  var popup = document.getElementById("popup");
  popup.style.left = left + "px";
  popup.style.top = tr.top + sY - gap + "px";
  popup.style.transform = "translateY(-100%)";
  var tx = tr.left + tr.width / 2 - left;
  tx = Math.max(16, Math.min(tx, pw - 28));
  var tail = document.getElementById("popup-tail");
  tail.style.paddingLeft = tx - 6 + "px";
  tail.style.justifyContent = "flex-start";
}

function showPopup(id, t) {
  clearTimeout(hideTimer);
  if (curId !== id) {
    curId = id;
    buildPopup(id);
  }
  posPopup(t);
  document.getElementById("popup").classList.add("on");
  document.querySelectorAll(".keyword").forEach(function (k) {
    k.classList.remove("keyword-active");
  });
  t.classList.add("keyword-active");
}

function scheduleHide() {
  hideTimer = setTimeout(function () {
    document.getElementById("popup").classList.remove("on");
    document.querySelectorAll(".keyword").forEach(function (k) {
      k.classList.remove("keyword-active");
    });
    curId = null;
  }, 80);
}

/* Prev / Next arrows */
document.getElementById("popup-arrow-left").onmousedown = function (e) {
  e.stopPropagation();
  goSlide(curIdx - 1);
};
document.getElementById("popup-arrow-right").onmousedown = function (e) {
  e.stopPropagation();
  goSlide(curIdx + 1);
};

/* Popup hover bridge */
document.getElementById("popup").addEventListener("mouseenter", function () {
  clearTimeout(hideTimer);
});
document.getElementById("popup").addEventListener("mouseleave", function () {
  scheduleHide();
});

/* --------------------------------------------------------------------------
   MOBILE BOTTOM SHEET
   -------------------------------------------------------------------------- */
var shCurId = null,
  shCurIdx = 0;

var shSlideHeights = {};
var DEFAULT_SH = 180,
  MIN_SH = 100,
  MAX_SH = 320;

function setSheetSliderHeight(h) {
  var slider = document.querySelector(".sheet-slider");
  if (slider) slider.style.height = h + "px";
}

function preloadSheetHeights(id) {
  var d = DATA[id];
  if (!shSlideHeights[id]) {
    shSlideHeights[id] = d.slides.map(function (s) {
      return s.img ? null : DEFAULT_SH;
    });
  }
  var sliderW =
    document.querySelector(".sheet-slider").offsetWidth || window.innerWidth;
  d.slides.forEach(function (s, i) {
    if (s.img && shSlideHeights[id][i] === null) {
      (function (idx) {
        var img = new Image();
        img.onload = function () {
          var h = Math.round(sliderW * (img.naturalHeight / img.naturalWidth));
          h = Math.max(MIN_SH, Math.min(h, MAX_SH));
          shSlideHeights[id][idx] = h;
          if (shCurId === id && shCurIdx === idx) setSheetSliderHeight(h);
        };
        img.onerror = function () {
          shSlideHeights[id][idx] = DEFAULT_SH;
        };
        img.src = s.img;
      })(i);
    }
  });
}

function openSheet(id) {
  var d = DATA[id];
  shCurId = id;
  shCurIdx = 0;
  var track = document.getElementById("sheet-track"),
    nav = document.getElementById("sheet-nav");
  track.innerHTML = "";
  nav.innerHTML = "";
  d.slides.forEach(function (s, i) {
    var div = document.createElement("div");
    div.className = "sheet-slide " + s.cls;
    var shInner = s.img
      ? '<img src="' +
        s.img +
        '" data-lightbox="' +
        (s.fullImg || s.img) +
        '" data-lightbox-alt="' +
        s.l.replace(/"/g, "&quot;") +
        '" style="width:100%;height:100%;object-fit:cover;position:absolute;inset:0;">'
      : '<span class="sheet-slide-emoji">' + s.e + "</span>";
    div.innerHTML =
      shInner + '<div class="sheet-slide-label">' + s.l + "</div>";
    track.appendChild(div);
    var dot = document.createElement("div");
    dot.className = "sheet-dot" + (i === 0 ? " on" : "");
    dot.onclick = (function (idx) {
      return function () {
        shGoTo(idx);
      };
    })(i);
    nav.appendChild(dot);
  });
  track.style.transform = "translateX(0)";
  preloadSheetHeights(id);
  var sh0 =
    shSlideHeights[id] && shSlideHeights[id][0] != null
      ? shSlideHeights[id][0]
      : DEFAULT_SH;
  setSheetSliderHeight(sh0);
  document.getElementById("sheet-title").textContent = d.title;
  document.getElementById("sheet-desc").textContent = d.desc;
  var lnk = document.getElementById("sheet-link");
  if (d.link) {
    lnk.href = d.link;
    lnk.textContent = d.linkText;
    lnk.style.display = "";
  } else {
    lnk.style.display = "none";
  }
  var arrows = document.querySelectorAll(".sheet-arrows");
  arrows.forEach(function (a) {
    a.style.display = d.slides.length < 2 ? "none" : "";
  });
  document.getElementById("overlay").classList.add("on");
  document.getElementById("sheet").classList.add("on");
  document.body.style.overflow = "hidden";
  document.querySelectorAll(".keyword").forEach(function (k) {
    k.classList.remove("keyword-active");
  });
  var keyword = document.querySelector('.keyword[data-id="' + id + '"]');
  if (keyword) keyword.classList.add("keyword-active");
}

function closeSheet() {
  document.getElementById("overlay").classList.remove("on");
  document.getElementById("sheet").classList.remove("on");
  document.body.style.overflow = "";
  document.querySelectorAll(".keyword").forEach(function (k) {
    k.classList.remove("keyword-active");
  });
}

/* Swipe-down to close — entire sheet */
(function () {
  var sheet = document.getElementById("sheet");
  if (!sheet) return;
  var startY = 0,
    isDragging = false;

  sheet.addEventListener(
    "touchstart",
    function (e) {
      startY = e.touches[0].clientY;
      isDragging = true;
      sheet.style.transition = "none";
    },
    { passive: true },
  );

  sheet.addEventListener(
    "touchmove",
    function (e) {
      if (!isDragging) return;
      var dy = e.touches[0].clientY - startY;
      if (dy > 0) sheet.style.transform = "translateY(" + dy + "px)";
    },
    { passive: true },
  );

  sheet.addEventListener("touchend", function (e) {
    if (!isDragging) return;
    isDragging = false;
    sheet.style.transition = "";
    var dy = e.changedTouches[0].clientY - startY;
    if (dy > 80) {
      sheet.style.transform = "";
      closeSheet();
    } else {
      sheet.style.transform = "";
    }
  });
})();

function shGoTo(i) {
  var d = DATA[shCurId];
  shCurIdx = (i + d.slides.length) % d.slides.length;
  document.getElementById("sheet-track").style.transform =
    "translateX(-" + shCurIdx * 100 + "%)";
  var sh =
    shSlideHeights[shCurId] && shSlideHeights[shCurId][shCurIdx] != null
      ? shSlideHeights[shCurId][shCurIdx]
      : DEFAULT_SH;
  setSheetSliderHeight(sh);
  document
    .querySelectorAll("#sheet-nav .sheet-dot")
    .forEach(function (dot, idx) {
      dot.className = "sheet-dot" + (idx === shCurIdx ? " on" : "");
    });
}

function shSlide(dir) {
  shGoTo(shCurIdx + dir);
}

/* Sheet overlay close */
document.getElementById("overlay").addEventListener("click", closeSheet);

/* --------------------------------------------------------------------------
   .keyword LISTENERS — desktop: hover popup / mobile: tap sheet
   -------------------------------------------------------------------------- */
document.querySelectorAll(".keyword").forEach(function (el) {
  if (!el.dataset.id || !DATA[el.dataset.id]) return;
  /* Desktop */
  el.addEventListener("mouseenter", function () {
    showPopup(this.dataset.id, this);
  });
  el.addEventListener("mouseleave", function () {
    scheduleHide();
  });
  /* Mobile — touch devices only */
  el.addEventListener("click", function (e) {
    if (!window.matchMedia("(pointer: coarse)").matches) return;
    e.stopPropagation();
    openSheet(this.dataset.id);
  });
});
