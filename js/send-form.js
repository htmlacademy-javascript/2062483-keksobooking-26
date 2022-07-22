
import {makeRequest} from './api.js';
import {isPressEscape} from './util.js';
import {mapFiltersContainer} from './map-filters.js';
import {resetImages} from './form-files.js';
import {
  adForm,
  sliderElement,
  pristine
} from './validation-ad-form.js';
import {
  resetMap,
  getDefaultCoordinatesInAdressInput
} from './map.js';


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

const resetFormInputsAndMap = () => {
  adForm.reset();
  sliderElement.noUiSlider.reset();
  resetMap();
  resetImages();
  mapFiltersContainer.reset();
  getDefaultCoordinatesInAdressInput();
  pristine.reset();
};

const onResetAdForm = (evt) => {
  evt.preventDefault();
  resetFormInputsAndMap();
};

const onSendSucces = () => {
  isBlockSubmitButton(false);
  resetFormInputsAndMap();
  showMessage(createMessage(successTemplate));
};

const onSendFail = () => {
  isBlockSubmitButton(false);
  showMessage(createMessage(errorTemplate));
};

const onSubmitAdForm = (evt) => {
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
  resetButton.addEventListener('click', onResetAdForm);
};

const setSubmitAdForm = () => {
  adForm.addEventListener('submit', onSubmitAdForm);
};

export {
  setResetAdForm,
  setSubmitAdForm
};

