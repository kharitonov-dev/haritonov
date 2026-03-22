/**
 * @fileoverview Главный модуль приложения
 * @module main
 */

import { PhotoModal } from "./modules/photoModal.js";
import { FocusCard } from "./modules/focusCard.js";
import { ShowMore } from "./modules/showMore.js";
import { Slider } from "./modules/slider.js";

document.addEventListener("DOMContentLoaded", () => {
  PhotoModal();
  FocusCard();
  ShowMore();
  Slider();
});
