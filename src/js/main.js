import modal from './modules/modal';
import sliders from './modules/slider';
import forms from './modules/forms';
import mask from './modules/mask';
import checkTextInputs from './modules/checkTextInputs';
import showMoreStyles from './modules/showMoreStyles';
import calc from './modules/calc';
import changeCalcState from './modules/changeCalcState';
import filter from './modules/filter';
import pictureSize from './modules/pictureSize';
import accordion from './modules/accordion';
import burger from './modules/burger';
import scrolling from './modules/scrolling';

window.addEventListener('DOMContentLoaded', function() {
    "use strict";

    let calcState = {};
    // const sizeBlock = document.querySelector('#size');
    // sizeBlock.addEventListener('change', () => {
    //     calcState['sizeBlock'] = sizeBlock.textContent;
    //         console.log(calcState);
    //     });


    changeCalcState(calcState, '#size', '#material', '#options', '.promocode', '.calc-price');


    modal();
    sliders('.feedback-slider-item', '', '.main-prev-btn', '.main-next-btn');
    sliders('.main-slider-item', 'vertical');
    forms(calcState);
    mask('[name="phone"]');
    checkTextInputs('[name="name"]');
    checkTextInputs('[name="message"]');
    showMoreStyles('.button-styles', '#styles .row');
    calc(calcState, '#size', '#material', '#options', '.promocode', '.calc-price');
    filter('.portfolio-menu > li', '.portfolio-block', '.portfolio-menu', 'active', 'grandmother', 'granddad');
    pictureSize();
    accordion('.accordion-heading', '.accordion-block');
    burger('.burger-menu', '.burger');
    scrolling('.pageup');
});
