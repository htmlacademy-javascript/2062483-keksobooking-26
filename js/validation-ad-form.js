import {
  MAX_TITLE_LENGTH,
  MIN_TITLE_LENGTH,
  MAX_PRICE_VALUE,
  RoomsCount,
  GuestsCount,
  minPriceDependingHousingType
} from './constants.js';

const adForm = document.querySelector('.ad-form');
const titleInput = adForm.querySelector('#title');
const priceInput = adForm.querySelector('#price');
const guestsInput = adForm.querySelector('#capacity');
const roomsInput = adForm.querySelector('#room_number');
const housingTypeInput = adForm.querySelector('#type');
const timeinInput = adForm.querySelector('#timein');
const timeoutInput = adForm.querySelector('#timeout');

const availableCountRoomsAndGuests = {
  [RoomsCount.ONE_ROOM] : [GuestsCount.ONE_GUEST],
  [RoomsCount.TWO_ROOMS] : [GuestsCount.ONE_GUEST, GuestsCount.TWO_GUESTS],
  [RoomsCount.THREE_ROOMS] : [GuestsCount.ONE_GUEST, GuestsCount.TWO_GUESTS, GuestsCount.THREE_GUESTS],
  [RoomsCount.HUNDRED_ROOMS] : [GuestsCount.UNAVAILABLE]
};

const changePriceDependingHousingType = (housingType) => {
  priceInput.placeholder = minPriceDependingHousingType[housingType];
  priceInput.min = minPriceDependingHousingType[housingType];
};
changePriceDependingHousingType(housingTypeInput.value);

const pristine = new Pristine(adForm, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'div',
  errorTextClass: 'ad-form__error-text'
}, true);

const validateTitle = (value) => value.length >= MIN_TITLE_LENGTH && value.length <= MAX_TITLE_LENGTH;

const validatePrice = (value) => value >= minPriceDependingHousingType[housingTypeInput.value] && value <= MAX_PRICE_VALUE;

const getPriceErrorMessage = () => priceInput.value >= MAX_PRICE_VALUE ? 'Слишком дорого' : 'Слишком дешево';

const validateRooms = () => availableCountRoomsAndGuests[roomsInput.value].includes(guestsInput.value);

const getGuestsErrorMessage = () => roomsInput.value === RoomsCount.HUNDRED_ROOMS ? 'Не для гостей' : 'Не достаточно места для размещения';

const initValidationAdForm = () => {
  pristine.addValidator(
    titleInput,
    validateTitle,
    'Длина заголовка должна быть от 30 до 100 символов'
  );
  pristine.addValidator(
    priceInput,
    validatePrice,
    getPriceErrorMessage,
    2,
    true
  );
  pristine.addValidator(
    guestsInput,
    validateRooms,
    getGuestsErrorMessage
  );
};

const roomsValueChange = () => pristine.validate(guestsInput);
const housingTypeChange = () => {
  changePriceDependingHousingType(housingTypeInput.value);
  pristine.validate(priceInput);
};
const timeinChange = () => {
  timeoutInput.value = timeinInput.value;
};
const timeoutChange = () => {
  timeinInput.value = timeoutInput.value;
};

roomsInput.addEventListener('change', (evt) => {
  evt.preventDefault();
  roomsValueChange();
});
housingTypeInput.addEventListener('change', (evt) =>{
  evt.preventDefault();
  housingTypeChange();
});
timeinInput.addEventListener('change', (evt) => {
  evt.preventDefault();
  timeinChange();
});
timeoutInput.addEventListener('change', (evt) => {
  evt.preventDefault();
  timeoutChange();
});

adForm.addEventListener('submit', (evt) => {
  if (!pristine.validate()) {
    evt.preventDefault();
  }
});

export {initValidationAdForm};
