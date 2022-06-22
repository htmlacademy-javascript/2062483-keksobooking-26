function getRandomIntegerNumberFromRange (min, max) {
  const isRangeCorrect = min > max || min < 0 || max < 0;
  if (isRangeCorrect) {
    throw 'Некорректно задан диапазон';
  }
  if (min === max) {
    return min;
  }
  return Math.round(Math.random() * (max - min)) + min;
}
function getRandomNotIntegerNumberFromRange (min, max, simbolsNumberAfterComma) {
  const isRangeCorrect = min > max || min < 0 || max < 0;
  if (isRangeCorrect) {
    throw 'Некорректно задан диапазон';
  }
  if (min === max) {
    return min;
  }
  return +(((Math.random() * (max - min)) + min).toFixed(simbolsNumberAfterComma));
}
const getRandomArrayElement = (elements) => elements[getRandomIntegerNumberFromRange(0, elements.length - 1)];

export {
  getRandomIntegerNumberFromRange,
  getRandomNotIntegerNumberFromRange,
  getRandomArrayElement
};
