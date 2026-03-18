/**
 * @fileoverview Главный модуль приложения
 * @module main
 */

import { initShowMore } from "./modules/showMore.js";
import { initPhotoModal } from "./modules/photoModal.js";

document.addEventListener("DOMContentLoaded", () => {
  initShowMore();
  initPhotoModal();
});
