import {DELAY} from './constants.js';

const RemaindersOfDivision= {
  ONE : 1,
  FIVE : 5
};

const RangeWhenUseThirdWord = {
  FROM : 10,
  TO : 20
};

const declinationString = (number, words) => {
  const value = number % 100;
  if (value % 10 === RemaindersOfDivision.ONE) {
    return words[0];
  }
  if (value % 10 > RemaindersOfDivision.ONE && value % 10 < RemaindersOfDivision.FIVE || words[2] === undefined) {
    return words[1];
  }
  if (value > RangeWhenUseThirdWord.FROM && value < RangeWhenUseThirdWord.TO){
    return words[2];
  }
  return words[2];
};

const getCoordinatesString = ({ lat, lng }) => (
  `${lat.toFixed(5)}, ${lng.toFixed(5)}`
);

const showError = () => {
  const messageContainer = document.createElement('div');
  const message = document.createElement('div');
  message.textContent = 'Сервер временно не доступен. Объявления на карте не загрузились. Попробуйте позже';
  messageContainer.classList.add('ad-form-server__error');
  message.classList.add('ad-form__message-error');
  document.body.append(messageContainer);
  messageContainer.append(message);
};

const isPressEscape = (evt) => evt.key === 'Escape';

const cutOffersListToMaxCount = (offers, maxCount) => offers.slice(0, maxCount);

const debounce = (callback, timeoutDelay = DELAY) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

const createPhoto = (photoUrl, photoContainer) => {
  const img = document.createElement('img');
  img.classList.add('ad-form__photo-preview');
  img.src = photoUrl;
  img.alt = 'Фото жилья';
  photoContainer.append(img);
};

export {
  declinationString,
  getCoordinatesString,
  showError,
  isPressEscape,
  debounce,
  cutOffersListToMaxCount,
  createPhoto
};
