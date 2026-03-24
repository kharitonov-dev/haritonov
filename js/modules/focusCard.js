/* Модуль: всплывающие превью-карточки по наведению (desktop) и тапу (mobile) */

export function FocusCard() {
  const wrappers = document.querySelectorAll(".event-trigger-wrapper");
  if (wrappers.length === 0) return;

  const isTouchDevice = window.matchMedia("(hover: none)").matches;

  const backdrop = document.createElement("div");
  backdrop.className = "event-preview-backdrop";
  document.body.appendChild(backdrop);

  let currentOpenCard = null;

  function closeAll() {
    if (currentOpenCard) {
      currentOpenCard.classList.remove("visible");
      currentOpenCard = null;
    }
    backdrop.classList.remove("visible");
    document.body.classList.remove("modal-open");
  }

  backdrop.addEventListener("click", closeAll);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeAll();
  });

  wrappers.forEach((wrapper) => {
    const trigger = wrapper.querySelector(".event-trigger");
    const card = wrapper.querySelector(".event-preview");
    if (!trigger || !card) return;

    const closeBtn = document.createElement("button");
    closeBtn.className = "event-preview-close";
    const lang = document.documentElement.lang;
    closeBtn.setAttribute("aria-label", lang === "en" ? "Close" : "Закрыть");
    closeBtn.textContent = "×";
    card.prepend(closeBtn);
    closeBtn.addEventListener("click", closeAll);

    if (isTouchDevice) {
      // Мобильное поведение: тап открывает модал
      trigger.addEventListener("click", (e) => {
        if (card.classList.contains("visible")) {
          closeAll();
        } else {
          e.preventDefault(); // не переходим по ссылке — сначала показываем превью
          closeAll();
          card.classList.add("visible");
          backdrop.classList.add("visible");
          document.body.classList.add("modal-open");
          currentOpenCard = card;
        }
      });
    } else {
      // Desktop поведение: hover с задержками
      const OPEN_DELAY = 100;
      const CLOSE_DELAY = 300;

      let openTimer = null;
      let closeTimer = null;

      function clearOpenTimer() {
        if (openTimer) { clearTimeout(openTimer); openTimer = null; }
      }

      function clearCloseTimer() {
        if (closeTimer) { clearTimeout(closeTimer); closeTimer = null; }
      }

      function scheduleShow() {
        clearCloseTimer();
        if (card.classList.contains("visible")) return;
        clearOpenTimer();
        openTimer = setTimeout(() => {
          card.classList.add("visible");
          currentOpenCard = card;
          openTimer = null;
        }, OPEN_DELAY);
      }

      function scheduleHide() {
        clearOpenTimer();
        if (!card.classList.contains("visible")) return;
        clearCloseTimer();
        closeTimer = setTimeout(() => {
          card.classList.remove("visible");
          if (currentOpenCard === card) currentOpenCard = null;
          closeTimer = null;
        }, CLOSE_DELAY);
      }

      function cancelHideAndShow() {
        clearCloseTimer();
        if (!card.classList.contains("visible")) {
          clearOpenTimer();
          card.classList.add("visible");
          currentOpenCard = card;
        }
      }

      trigger.addEventListener("mouseenter", scheduleShow);
      trigger.addEventListener("mouseleave", scheduleHide);
      card.addEventListener("mouseenter", cancelHideAndShow);
      card.addEventListener("mouseleave", scheduleHide);

      document.addEventListener("click", (e) => {
        if (!wrapper.contains(e.target) && card.classList.contains("visible")) {
          card.classList.remove("visible");
          if (currentOpenCard === card) currentOpenCard = null;
        }
      });
    }
  });
}
