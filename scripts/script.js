// Button "Show More" (work_experience)
(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    const btn = document.getElementById("showMoreBtn");
    const extra = document.getElementById("extra-work");

    if (!btn || !extra) {
      console.error("Элементы не найдены!");
      return;
    }

    extra.style.overflow = "hidden";
    extra.style.transition = "height 0.3s ease";
    extra.style.height = "0";

    let isExpanded = false;

    btn.addEventListener("click", function (e) {
      e.preventDefault();

      if (!isExpanded) {
        const targetHeight = extra.scrollHeight;

        if (targetHeight === 0) {
          console.error("scrollHeight = 0! В блоке нет контента");
          return;
        }

        extra.style.height = targetHeight + "px";
        btn.innerHTML = '<span class="prompt">↑</span> Скрыть';
        isExpanded = true;
      } else {
        extra.style.height = "0";
        btn.innerHTML = '<span class="prompt">↓</span> Показать больше опыта';
        isExpanded = false;
      }
    });
  });
})();
