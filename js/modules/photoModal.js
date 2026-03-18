/* Модуль для модального окна с фото */

import { closeModal } from "../utils/helpers.js";

export function initPhotoModal() {
  const modal = document.getElementById("photoModal");
  const modalImg = document.getElementById("modalImage");
  const profilePhoto = document.getElementById("profilePhoto");

  // Если фото нет на странице (например, в английской версии пока нет) — выходим
  if (!profilePhoto) return;

  profilePhoto.addEventListener("click", function () {
    const fullSizeSrc = this.dataset.full;

    if (fullSizeSrc) {
      modal.style.display = "block";
      modalImg.src = fullSizeSrc;

      document.body.style.overflow = "hidden";
    }
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
