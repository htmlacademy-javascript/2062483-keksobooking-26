import {
  adForm,
  sliderElement,
  pristine
} from './validation-ad-form.js';
import {makeRequest} from './api.js';
import {resetMap} from './map.js';
import {isPressEscape} from './util.js';
import {mapFiltersContainer} from './map-filters.js';
import {resetImages} from './form-files.js';

const submitButton = adForm.querySelector('.ad-form__submit');
const resetButton = adForm.querySelector('.ad-form__reset');
const successTemplate = document.querySelector('#success').content.querySelector('.success');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');

const createMessage = (stateTemplate) => {
  const message = stateTemplate.cloneNode(true);
  return message;
};

const onMessageClick = (evt) => {
  evt.preventDefault();
  closeMessage();
};

const onMessageEscKeydown = (evt) => {
  if (isPressEscape(evt)) {
    closeMessage();
  }
};

const showMessage = (state) => {
  document.body.append(state);
  document.addEventListener('keydown', onMessageEscKeydown);
  document.addEventListener('click', onMessageClick);
};

function closeMessage () {
  document.body.lastChild.remove();
  document.removeEventListener('keydown', onMessageEscKeydown);
  document.removeEventListener('click', onMessageClick);
}

const isBlockSubmitButton = (state) => {
  submitButton.disabled = state;
};

const resetAdForm = () => {
  adForm.reset();
  sliderElement.noUiSlider.reset();
  resetMap();
  resetImages();
  pristine.reset();
};

const onSendSucces = () => {
  isBlockSubmitButton(false);
  resetAdForm();
  resetMap();
  mapFiltersContainer.reset();
  showMessage(createMessage(successTemplate));
};

const onSendFail = () => {
  isBlockSubmitButton(false);
  showMessage(createMessage(errorTemplate));
};

const submitAdForm = (evt) => {
  evt.preventDefault();
  if (pristine.validate()) {
    isBlockSubmitButton(true);
    makeRequest(
      onSendSucces,
      onSendFail,
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

export {
  setResetAdForm,
  setSubmitAdForm
};

