/* Модуль: слайдер внутри превью-карточек */

export function Slider() {
  const sliders = document.querySelectorAll("[data-slider]");
  if (sliders.length === 0) return;

  sliders.forEach((slider) => {
    const track = slider.querySelector(".slider-track");
    const slides = slider.querySelectorAll(".slider-slide");
    const prevBtn = slider.querySelector(".slider-prev");
    const nextBtn = slider.querySelector(".slider-next");
    const dotsContainer = slider.querySelector(".slider-dots");

    if (!track || slides.length === 0) return;

    const total = slides.length;
    let current = 0;

    if (total <= 1) {
      prevBtn?.remove();
      nextBtn?.remove();
      dotsContainer?.remove();
      slides[0].classList.add("active");
      return;
    }

    const lang = document.documentElement.lang;
    const dots = Array.from({ length: total }, (_, i) => {
      const dot = document.createElement("button");
      dot.className = "slider-dot";
      dot.setAttribute("aria-label", lang === "en" ? `Slide ${i + 1}` : `Слайд ${i + 1}`);
      dot.addEventListener("click", () => goTo(i));
      dotsContainer.appendChild(dot);
      return dot;
    });

    function stopMedia(slide) {
      const video = slide.querySelector("video");
      const iframe = slide.querySelector("iframe");
      if (video) video.pause();
      if (iframe) iframe.src = iframe.src;
    }

    function goTo(index) {
      slides[current].classList.remove("active");
      stopMedia(slides[current]);
      current = (index + total) % total;
      slides[current].classList.add("active");
      dots.forEach((dot, i) => dot.classList.toggle("active", i === current));
    }

    prevBtn?.addEventListener("click", () => goTo(current - 1));
    nextBtn?.addEventListener("click", () => goTo(current + 1));

    // Свайп на тач-устройствах
    let touchStartX = 0;
    slider.addEventListener(
      "touchstart",
      (e) => {
        touchStartX = e.touches[0].clientX;
      },
      { passive: true },
    );
    slider.addEventListener("touchend", (e) => {
      const diff = touchStartX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 40) goTo(diff > 0 ? current + 1 : current - 1);
    });

    goTo(0);
    slider.querySelector(".slider-loader")?.remove();
    slider.setAttribute("data-ready", "");
  });
}
