import {
  MAX_TITLE_LENGTH,
  MIN_TITLE_LENGTH,
  MAX_PRICE_VALUE,
  RoomsCount,
  GuestsCount,
  minPriceDependingHousingType,
  ErrorMessagesInForm
} from './constants.js';

const adForm = document.querySelector('.ad-form');
const titleInput = adForm.querySelector('#title');
const priceInput = adForm.querySelector('#price');
const guestsInput = adForm.querySelector('#capacity');
const roomsInput = adForm.querySelector('#room_number');
const housingTypeInput = adForm.querySelector('#type');
const timeInInput = adForm.querySelector('#timein');
const timeOutInput = adForm.querySelector('#timeout');
const adressInput = adForm.querySelector('#address');
const sliderElement = adForm.querySelector('.ad-form__slider');

const pristine = new Pristine(adForm, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'div',
  errorTextClass: 'ad-form__error-text'
}, true);

const getAdressInputValue = (value) => {
  adressInput.value = value;
};

const changePriceDependingHousingType = (housingType) => {
  priceInput.placeholder = minPriceDependingHousingType[housingType];
  priceInput.min = minPriceDependingHousingType[housingType];
};
changePriceDependingHousingType(housingTypeInput.value);

const isPriceLessThanMin = priceInput.value <= +(priceInput.min);

const updatePriceInputToMin = () => {
  if(isPriceLessThanMin) {
    priceInput.value = +(priceInput.min);
  }
};

const getStartPriceSlider = () => (isPriceLessThanMin) ? +(priceInput.min) : priceInput.value;

const setPriceSlider = () => {
  noUiSlider.create(sliderElement, {
    range : {
      min : +(priceInput.min),
      max : MAX_PRICE_VALUE,
    },
    start : getStartPriceSlider(),
    step : 100,
    format: {
      to : (value) => value.toFixed(0),
      from : (value) => +(value)
    },
  });
};
setPriceSlider();

const updatePriceSliderSetting = () => {
  sliderElement.noUiSlider.updateOptions(
    {
      range : {
        min : +(priceInput.min),
        max : MAX_PRICE_VALUE,
      },
      start : getStartPriceSlider()
    }
  );
};

const availableCountRoomsAndGuests = {
  [RoomsCount.ONE_ROOM] : [GuestsCount.ONE_GUEST],
  [RoomsCount.TWO_ROOMS] : [GuestsCount.ONE_GUEST, GuestsCount.TWO_GUESTS],
  [RoomsCount.THREE_ROOMS] : [GuestsCount.ONE_GUEST, GuestsCount.TWO_GUESTS, GuestsCount.THREE_GUESTS],
  [RoomsCount.HUNDRED_ROOMS] : [GuestsCount.UNAVAILABLE]
};

const validateTitle = (value) => value.length >= MIN_TITLE_LENGTH && value.length <= MAX_TITLE_LENGTH;

const validatePrice = (value) => value >= minPriceDependingHousingType[housingTypeInput.value] && value <= MAX_PRICE_VALUE;

const getPriceErrorMessage = () => priceInput.value >= MAX_PRICE_VALUE ? ErrorMessagesInForm.PRISE_INPUT_MESSAGE.maxPriceError : ErrorMessagesInForm.PRISE_INPUT_MESSAGE.minPriceError;

const validateRooms = () => availableCountRoomsAndGuests[roomsInput.value].includes(guestsInput.value);

const getGuestsErrorMessage = () => roomsInput.value === RoomsCount.HUNDRED_ROOMS ? ErrorMessagesInForm.GUESTS_INPUT_MESSAGE.notForGuests : ErrorMessagesInForm.GUESTS_INPUT_MESSAGE.notEnoughPlace;

const initValidationAdForm = () => {
  pristine.addValidator(
    titleInput,
    validateTitle,
    ErrorMessagesInForm.TITLE_INPUT_MESSAGE
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

const onRoomsValueChange = (evt) => {
  evt.preventDefault();
  pristine.validate(guestsInput);
};
const onHousingTypeChange = (evt) => {
  evt.preventDefault();
  changePriceDependingHousingType(housingTypeInput.value);
  updatePriceSliderSetting();
  updatePriceInputToMin();
  pristine.validate(priceInput);
};
const onTimeInChange = (evt) => {
  evt.preventDefault();
  timeOutInput.value = timeInInput.value;
};
const onTimeOutChange = (evt) => {
  evt.preventDefault();
  timeInInput.value = timeOutInput.value;
};
const onPriceInputChange = (evt) => {
  evt.preventDefault();
  sliderElement.noUiSlider.set(+(evt.target.value));
};
const onPriceSliderChange = () => {
  priceInput.value = sliderElement.noUiSlider.get();
  pristine.validate(priceInput);
};

roomsInput.addEventListener('change', onRoomsValueChange);
housingTypeInput.addEventListener('change', onHousingTypeChange);
timeInInput.addEventListener('change', onTimeInChange);
timeOutInput.addEventListener('change', onTimeOutChange);
priceInput.addEventListener('change', onPriceInputChange);
sliderElement.noUiSlider.on('change', onPriceSliderChange);

export {
  initValidationAdForm,
  getAdressInputValue,
  adForm,
  pristine,
  sliderElement
};
