require('es6-promise').polyfill();
import 'nodelist-foreach-polyfill';

import calc from "./modules/calc";
import cards from "./modules/cards";
import forms from "./modules/forms";
import modals, {openModal} from "./modules/modals";
import slider from "./modules/slider";
import tabs from "./modules/tabs";
import timer from "./modules/timer";

document.addEventListener('DOMContentLoaded', () => {

    // timer for open modal
    const modalTimer = setTimeout(() => {
        openModal('[data-modal="modal"]', modalTimer);
    }, 20000);

    calc();
    cards();
    forms('form', modalTimer);
    modals('[data-modal="btn"]', '[data-modal="modal"]', modalTimer);
    slider({
        container: '[data-slider="slider"]',
        track: '[data-slider="track"]',
        wrapper: '[data-slider="wrapper"]',
        slide:'[data-slider="slide"]',
        nextArrow: '[data-slider="next"]',
        prevArrow: '[data-slider="prev"]',
        total: '[data-slider="total"]',
        current: '[data-slider="current"]'
    });
    tabs('.tabheader__item', '.tabcontent', 'active');
    timer('.timer', '2022-10-27');
});