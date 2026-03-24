/* Модуль для кнопки "Показать больше" - work_experience */

export function ShowMore() {
  "use strict";

  const btn = document.getElementById("showMoreBtn");
  const extra = document.getElementById("extra-work");

  if (!btn || !extra) {
    return;
  }

  const isEn = document.documentElement.lang === "en";
  const textExpanded = isEn
    ? '<span class="prompt">↑</span> Hide'
    : '<span class="prompt">↑</span> Скрыть';
  const textCollapsed = isEn
    ? '<span class="prompt">↓</span> Show more experience'
    : '<span class="prompt">↓</span> Показать больше опыта';

  extra.style.overflow = "hidden";
  extra.style.transition = "height 0.3s ease";
  extra.style.height = "0";

  let isExpanded = false;

  btn.addEventListener("click", function (e) {
    e.preventDefault();

    if (!isExpanded) {
      const targetHeight = extra.scrollHeight;

      if (targetHeight === 0) {
        return;
      }

      extra.style.height = targetHeight + "px";
      btn.innerHTML = textExpanded;
      isExpanded = true;
    } else {
      extra.style.height = "0";
      btn.innerHTML = textCollapsed;
      isExpanded = false;
    }
  });
}
