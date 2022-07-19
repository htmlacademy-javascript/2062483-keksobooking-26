import {
  adForm,
  sliderElement,
  pristine
} from './validation-ad-form.js';
import {makeRequest} from './api.js';

const submitButton = adForm.querySelector('.ad-form__submit');
const resetButton = adForm.querySelector('.ad-form__reset');
const successTemplate = document.querySelector('#success').content.querySelector('.success');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');

const createMessage = (stateTemplate) => {
  const message = stateTemplate.cloneNode(true);
  return message;
};

const closeMessage = () => {
  document.body.lastChild.remove();
};

const onMessageClick = (evt) => {
  evt.preventDefault();
  closeMessage();
};

const onMessageEscKeydown = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeMessage();
  }
};

const showMessage = (state) => {
  document.body.append(state);
  document.addEventListener('keydown', onMessageEscKeydown);
  document.addEventListener('click', onMessageClick);
};

const blockSubmitButton = () => {
  submitButton.setAttribute('disabled', true);
};

const unblockSubmitButton = () => {
  submitButton.removeAttribute('disabled');
};

const resetAdForm = () => {
  adForm.reset();
  sliderElement.noUiSlider.reset();
  pristine.reset();
};

const submitAdForm = (evt) => {
  evt.preventDefault();
  if (pristine.validate()) {
    blockSubmitButton();
    makeRequest(
      () => {
        unblockSubmitButton();
        resetAdForm();
        showMessage(createMessage(successTemplate));
      },
      () => {
        unblockSubmitButton();
        showMessage(createMessage(errorTemplate));
      },
      'POST',
      new FormData(evt.target)
    );
  }
};

const setResetAdForm = () => {
  resetButton.addEventListener('click', resetAdForm);
};

const setSubmitAdForm = () => {
  adForm.addEventListener('submit', submitAdForm);
};

export {setResetAdForm, setSubmitAdForm};

