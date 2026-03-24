/* Модуль для модального окна с фото */

import { closeModal } from "../utils/helpers.js";

export function PhotoModal() {
  const modal = document.getElementById("photoModal");
  const modalImg = document.getElementById("modalImage");
  const photos = document.querySelectorAll("[data-full-image]");

  if (photos.length === 0) return;

  photos.forEach((photo) => {
    photo.addEventListener("click", function () {
      const fullSizeSrc = this.dataset.fullImage;
      if (fullSizeSrc) {
        modal.style.display = "block";
        modalImg.src = fullSizeSrc;
        document.body.style.overflow = "hidden";
      }
    });
  });

  modal.addEventListener("click", function (e) {
    if (e.target === modal || e.target.classList.contains("modal-close")) {
      closeModal(modal);
    }
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && modal.style.display === "block") {
      closeModal(modal);
    }
  });
}
