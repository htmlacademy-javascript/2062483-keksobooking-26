function getRandomIntegerNumberFromRange (min, max) {
  const isRangeCorrect = min > max || min < 0 || max < 0;
  if (isRangeCorrect) {
    throw 'Некорректно задан диапазон';
  }
  if (min === max) {
    return min;
  }
  return Math.floor(Math.random() * (max - min)) + min;
}

getRandomIntegerNumberFromRange(1, 10);

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
getRandomNotIntegerNumberFromRange(1.1, 1.2, 7);
