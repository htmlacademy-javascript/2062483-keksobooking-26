import {
  MAX_TITLE_LENGTH,
  MIN_TITLE_LENGTH,
  MAX_PRICE_VALUE,
  RoomsCount,
  GuestsCount,
  MinPriceDependingHousingType
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
  switch(housingType) {
    case 'bungalow' :
      priceInput.placeholder = MinPriceDependingHousingType.bungalow;
      break;
    case 'flat' :
      priceInput.placeholder = MinPriceDependingHousingType.flat;
      break;
    case 'hotel' :
      priceInput.placeholder = MinPriceDependingHousingType.hotel;
      break;
    case 'house' :
      priceInput.placeholder = MinPriceDependingHousingType.house;
      break;
    case 'palace' :
      priceInput.placeholder = MinPriceDependingHousingType.palace;
      break;
  }
};
changePriceDependingHousingType(housingTypeInput.value);

const pristine = new Pristine(adForm, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'div',
  errorTextClass: 'ad-form__error-text'
}, true);

const validateTitle = (value) => value.length >= MIN_TITLE_LENGTH && value.length <= MAX_TITLE_LENGTH;

const validatePrice = (value) => value >= MinPriceDependingHousingType[housingTypeInput.value] && value <= MAX_PRICE_VALUE;

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
    getPriceErrorMessage
  );
  pristine.addValidator(
    guestsInput,
    validateRooms,
    getGuestsErrorMessage
  );
};

roomsInput.addEventListener('change', (evt) => {
  evt.preventDefault();
  pristine.validate(guestsInput);
});

housingTypeInput.addEventListener('change', (evt) =>{
  evt.preventDefault();
  changePriceDependingHousingType(housingTypeInput.value);
  pristine.validate(priceInput);
});

timeinInput.addEventListener('change', (evt) => {
  evt.preventDefault();
  timeoutInput.value = timeinInput.value;
});

timeoutInput.addEventListener('change', (evt) => {
  evt.preventDefault();
  timeinInput.value = timeoutInput.value;
});

adForm.addEventListener('submit', (evt) => {
  if (!pristine.validate()) {
    evt.preventDefault();
  }
});

export {initValidationAdForm};
