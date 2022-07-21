const getRandomIntegerNumberFromRange = (min, max) => {
  const isRangeCorrect = min > max || min < 0 || max < 0;
  if (isRangeCorrect) {
    throw new RangeError('Некорректно задан диапазон');
  }
  if (min === max) {
    return min;
  }
  return Math.round(Math.random() * (max - min)) + min;
};
const getRandomNotIntegerNumberFromRange = (min, max, simbolsNumberAfterComma) => {
  const isRangeCorrect = min > max || min < 0 || max < 0;
  if (isRangeCorrect) {
    throw new RangeError('Некорректно задан диапазон');
  }
  if (min === max) {
    return min;
  }
  return +(((Math.random() * (max - min)) + min).toFixed(simbolsNumberAfterComma));
};
const getRandomArrayElement = (elements) => elements[getRandomIntegerNumberFromRange(0, elements.length - 1)];
const getNewSetOfValues = (values) => {
  const setOfValues = [...values];
  setOfValues.sort(() => Math.random() - 0.5);
  return setOfValues.slice(0, getRandomIntegerNumberFromRange(1, values.length));
};

const declinationString = (number, words) => {
  const value = number % 100;
  if (value % 10 === 1) {
    return words[0];
  }
  if (value % 10 > 1 && value % 10 < 5 || words[2] === undefined) {
    return words[1];
  }
  if (value > 10 && value < 20){
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

const debounce = (callback, timeoutDelay = 500) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export {
  getRandomIntegerNumberFromRange,
  getRandomNotIntegerNumberFromRange,
  getRandomArrayElement,
  getNewSetOfValues,
  declinationString,
  getCoordinatesString,
  showError,
  isPressEscape,
  debounce,
  cutOffersListToMaxCount
};
