/* Модуль для кнопки "Показать больше" - work_experience */

export function ShowMore() {
  "use strict";

  const btn = document.getElementById("showMoreBtn");
  const extra = document.getElementById("extra-work");

  if (!btn || !extra) {
    console.error("Elements not found!");
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
        console.error("scrollHeight = 0! No content in block");
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
}
