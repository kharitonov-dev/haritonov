/* Вспомогательный js-код */

export function closeModal(modal) {
  if (modal) {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
  }
}
