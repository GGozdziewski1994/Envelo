import showSuccess from "./showSuccess.js";
import isRequired from "./isRequired.js";
import isEqual from "./isEqual.js";
import { PHONE, CODE, PHONE_LENGTH, CODE_LENGTH } from './constants.js';
import renderSpinner from "./renderSpinner.js";
import closeModal from "./closeModal.js";

const containerText = document.querySelector('.container__text');
const pickUpBtns = document.querySelectorAll('.pick-up');
const formContainer = document.querySelector('.form');
const sendFormBtn = document.querySelector('.submit--form');
const inputPhone = document.getElementById('phone');
const inputCode = document.getElementById('code');
const modal = document.querySelector('.container__modal');
const backToStartBtn = document.querySelector('.back-to-start');
const modalSubtitle = document.querySelector('.modal__subtitle');
const backdrop = document.querySelector('.backdrop');

let startTime = null;
let elapsedTime = 0;

pickUpBtns.forEach(btn => btn.addEventListener('click', event => {
    formContainer.classList.remove('hidden');
    if(event.target.classList.contains('container__button')) event.target.classList.add('hidden');  
    if(!modal.classList.contains('hidden')) modal.classList.add('hidden');

    startTime = Date.now();
}));

let isValidPhone = false;
let isValidCode = false;

const showError = (input, message, isValid) => {
    input.classList.add("field-error");

    const formInputText = input.parentElement;

    const error = formInputText.querySelector('.form-error-text');
    error.textContent = message;

    if(isValid === PHONE) isValidPhone = false;
    if(isValid === CODE) isValidCode = false;
    
    sendFormBtn.disabled = true;
};

const checkBlur = (input, inputLength, isValid) => {
    const value = input.value.trim();
    
    if(!isRequired(value)) {
        showError(input, 'Pole nie może być puste', isValid);
    }
    
    if(!isEqual(value, inputLength)) {
        showError(input, `Pole musi zawierać ${inputLength} znaków`, isValid);
    }
    
    if(isEqual(value, inputLength)) {
        showSuccess(input);
    }
};

const checkInput = (input, inputLength, isValid) => {
    const value = input.value.trim();

    if(!isEqual(value, inputLength)) {
        if(isValid === PHONE) isValidPhone = false;
        if(isValid === CODE) isValidCode = false;

        if(!sendFormBtn.hasAttribute('disabled')) sendFormBtn.disabled = true;
    }

    if(isEqual(value, inputLength)) {
        showSuccess(input);

        if(isValid === PHONE) isValidPhone = true;
        if(isValid === CODE) isValidCode = true;
    }

    if(isValidPhone === true && isValidCode === true) sendFormBtn.removeAttribute('disabled');
};

inputPhone.addEventListener('input', event => checkInput(event.target, PHONE_LENGTH, PHONE));
inputPhone.addEventListener('blur', event => checkBlur(event.target, PHONE_LENGTH, PHONE));

inputCode.addEventListener('input', event => checkInput(event.target, CODE_LENGTH, CODE));
inputCode.addEventListener('blur', event => checkBlur(event.target, CODE_LENGTH, CODE));

formContainer.addEventListener('submit', event => {
    event.preventDefault();

    renderSpinner();

    const phone = inputPhone.value;
    const code = inputCode.value;

    setTimeout(() => {
        elapsedTime = Date.now() - startTime;
        modal.classList.remove('hidden');

        inputPhone.value = '';
        inputCode.value = '';
        sendFormBtn.disabled = true;
        isValidPhone = false;
        isValidCode = false;

        let time = Math.ceil(elapsedTime / 1000);
        modalSubtitle.textContent = `Zrobiłeś to w czasie ${time} sekund! Czy możemy zrobić dla Ciebie coś jeszcze?`;

        startTime = null;
        elapsedTime = 0;

        document.querySelector('.hollow-dots-spinner').remove();;
        
        containerText.classList.remove('hidden');
    }, 2000); 
});

backToStartBtn.addEventListener('click', closeModal);
backdrop.addEventListener('click', closeModal);