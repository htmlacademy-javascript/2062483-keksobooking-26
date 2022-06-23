function getRandomIntegerNumberFromRange (min, max) {
  const isRangeCorrect = min > max || min < 0 || max < 0;
  if (isRangeCorrect) {
    throw new RangeError('Некорректно задан диапазон');
  }
  if (min === max) {
    return min;
  }
  return Math.round(Math.random() * (max - min)) + min;
}
function getRandomNotIntegerNumberFromRange (min, max, simbolsNumberAfterComma) {
  const isRangeCorrect = min > max || min < 0 || max < 0;
  if (isRangeCorrect) {
    throw new RangeError('Некорректно задан диапазон');
  }
  if (min === max) {
    return min;
  }
  return +(((Math.random() * (max - min)) + min).toFixed(simbolsNumberAfterComma));
}
const getRandomArrayElement = (elements) => elements[getRandomIntegerNumberFromRange(0, elements.length - 1)];
const getNewSetOfValues = (values) => {
  const setOfValues = [...values];
  setOfValues.sort(() => Math.random() - 0.5);
  return setOfValues.slice(0, getRandomIntegerNumberFromRange(1, values.length));
};

export {
  getRandomIntegerNumberFromRange,
  getRandomNotIntegerNumberFromRange,
  getRandomArrayElement,
  getNewSetOfValues
};
