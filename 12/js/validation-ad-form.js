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

const roomsValueChangeHandler = (evt) => {
  evt.preventDefault();
  pristine.validate(guestsInput);
};
const housingTypeChangeHandler = (evt) => {
  evt.preventDefault();
  changePriceDependingHousingType(housingTypeInput.value);
  updatePriceSliderSetting();
  updatePriceInputToMin();
  pristine.validate(priceInput);
};
const timeInChangeHandler = (evt) => {
  evt.preventDefault();
  timeOutInput.value = timeInInput.value;
};
const timeOutChangeHandler = (evt) => {
  evt.preventDefault();
  timeInInput.value = timeOutInput.value;
};
const priceInputChangeHandler = (evt) => {
  evt.preventDefault();
  sliderElement.noUiSlider.set(+(evt.target.value));
};
const priceSliderChangeHandler = () => {
  priceInput.value = sliderElement.noUiSlider.get();
  pristine.validate(priceInput);
};

roomsInput.addEventListener('change', roomsValueChangeHandler);
housingTypeInput.addEventListener('change', housingTypeChangeHandler);
timeInInput.addEventListener('change', timeInChangeHandler);
timeOutInput.addEventListener('change', timeOutChangeHandler);
priceInput.addEventListener('change', priceInputChangeHandler);
sliderElement.noUiSlider.on('change', priceSliderChangeHandler);

export {
  initValidationAdForm,
  getAdressInputValue,
  adForm,
  pristine,
  sliderElement
};
