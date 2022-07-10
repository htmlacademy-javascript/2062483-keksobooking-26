import {
  MAX_TITLE_LENGTH,
  MIN_TITLE_LENGTH,
  MAX_PRICE_VALUE,
  RoomsCount,
  GuestsCount
} from './constants.js';

const adForm = document.querySelector('.ad-form');
const titleInput = adForm.querySelector('#title');
const priceInput = adForm.querySelector('#price');
const guestsInput = adForm.querySelector('#capacity');
const roomsInput = adForm.querySelector('#room_number');

const availableCountRoomsAndGuests = {
  [RoomsCount.ONE_ROOM] : GuestsCount.ONE_GUEST,
  [RoomsCount.TWO_ROOMS] : [GuestsCount.ONE_GUEST, GuestsCount.TWO_GUESTS],
  [RoomsCount.THREE_ROOMS] : [GuestsCount.ONE_GUEST, GuestsCount.TWO_GUESTS, GuestsCount.THREE_GUESTS],
  [RoomsCount.HUNDRED_ROOMS] : GuestsCount.UNAVAILABLE
};

const pristine = new Pristine(adForm, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'div',
  errorTextClass: 'ad-form__error-text'
}, true);

const validateTitle = (value) => value.length >= MIN_TITLE_LENGTH && value.length <= MAX_TITLE_LENGTH;

const validatePrice = (value) => value <= MAX_PRICE_VALUE;

const validateRooms = () => (
  availableCountRoomsAndGuests[roomsInput.value].includes(guestsInput.value)
);

const getGuestsErrorMessage = () =>  {
  if (roomsInput.value === RoomsCount.HUNDRED_ROOMS) {
    return 'Не для достей';
  } else {
    return 'Не достаточно места для размещения';
  }
};

const getValidationAdForm = () => {
  pristine.addValidator(
    titleInput,
    validateTitle,
    'Длина заголовка должна быть от 30 до 100 символов'
  );
  pristine.addValidator(
    priceInput,
    validatePrice,
    'Слишком дорого'
  );
  pristine.addValidator(
    guestsInput,
    validateRooms,
    getGuestsErrorMessage
  );
};

adForm.addEventListener('submit', (evt) => {
  if (!pristine.validate()) {
    evt.preventDefault();
  }
});

export {getValidationAdForm};
