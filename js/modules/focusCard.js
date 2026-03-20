/* Модуль: при наведении на кнопку показать всплывающую карточку (Подробнее) */

export function FocusCard() {
  const wrappers = document.querySelectorAll(".event-trigger-wrapper");

  if (wrappers.length === 0) return;

  wrappers.forEach((wrapper) => {
    const trigger = wrapper.querySelector(".event-trigger");
    const card = wrapper.querySelector(".event-preview");

    if (!trigger || !card) return;

    const OPEN_DELAY = 100;
    const CLOSE_DELAY = 300;

    trigger.removeEventListener("mouseenter", scheduleShow);
    trigger.removeEventListener("mouseleave", scheduleHide);
    card.removeEventListener("mouseenter", cancelHideAndShow);
    card.removeEventListener("mouseleave", scheduleHide);

    let openTimer = null;
    let closeTimer = null;

    function clearOpenTimer() {
      if (openTimer) {
        clearTimeout(openTimer);
        openTimer = null;
      }
    }

    function clearCloseTimer() {
      if (closeTimer) {
        clearTimeout(closeTimer);
        closeTimer = null;
      }
    }

    function scheduleShow() {
      clearCloseTimer();
      if (card.classList.contains("visible")) return;

      clearOpenTimer();
      openTimer = setTimeout(() => {
        card.classList.add("visible");
        openTimer = null;
      }, OPEN_DELAY);
    }

    function scheduleHide() {
      clearOpenTimer();
      if (!card.classList.contains("visible")) return;

      clearCloseTimer();
      closeTimer = setTimeout(() => {
        card.classList.remove("visible");
        closeTimer = null;
      }, CLOSE_DELAY);
    }

    function cancelHideAndShow() {
      clearCloseTimer();

      if (!card.classList.contains("visible")) {
        clearOpenTimer();
        card.classList.add("visible");
      }
    }

    trigger.addEventListener("mouseenter", scheduleShow);
    trigger.addEventListener("mouseleave", scheduleHide);

    card.addEventListener("mouseenter", cancelHideAndShow);
    card.addEventListener("mouseleave", scheduleHide);
  });
}
