const COUNT_OF_AD = 10;
const coordinatesOfOffer = {
  MAXLAT : 35.70000,
  MINLAT : 35.65000,
  MAXLNG : 139.80000,
  MINLNG : 139.70000,
  NUMBER_OF_DIGITS_AFTER_COMMA : 5
};
const priceOfOffer = {
  MIN_PRICE : 1000,
  MAX_PRICE : 10000
};
const roomsOfOffer = {
  MIN_COUNT_OF_ROOMS : 1,
  MAX_COUNT_OF_ROOMS : 3
};
const guestsOfOffer =  {
  MIN_COUNT_OF_GUESTS : 1,
  MAX_COUNT_OF_GUESTS: 6
};
const TITLE_OF_OFFER = [
  'My flat for you',
  'Be happy here',
];
const TYPE_OF_OFFER = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel'
];
const CHECIN_OF_OFFER = [
  '12:00',
  '13:00',
  '14:00'
];
const CHECKOUT_OF_OFFER = [
  '12:00',
  '13:00',
  '14:00'
];
const FEATURES_OF_OFFER = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];
const DESCRIPTION_OF_OFFER = [
  'Very good',
  'Good'
];
const PHOTOS_OF_OFFER = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'
];

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
const getAvatars = (count) => {
  const avatars = new Array(count).fill('').map((item, i) => `img/avatars/user${String(i+1).padStart(2, '0')}.png`);
  return avatars;
};
const AVATARS_OF_AUTHOR = getAvatars(COUNT_OF_AD);

const getNewSetOfValues = (values) => {
  const setOfValues = [...values];
  setOfValues.sort(() => Math.random() - 0.5);
  return setOfValues.slice(0, getRandomIntegerNumberFromRange(1, values.length));
};

const createAds = (number) => {
  const latOfOffer = getRandomNotIntegerNumberFromRange(coordinatesOfOffer.MINLAT, coordinatesOfOffer.MAXLAT, coordinatesOfOffer.NUMBER_OF_DIGITS_AFTER_COMMA);
  const lngOfOffer = getRandomNotIntegerNumberFromRange(coordinatesOfOffer.MINLNG, coordinatesOfOffer.MAXLNG, coordinatesOfOffer.NUMBER_OF_DIGITS_AFTER_COMMA);
  return {
    author : {
      avatar : AVATARS_OF_AUTHOR[number],
    },
    offer : {
      title : getRandomArrayElement(TITLE_OF_OFFER),
      address : `${latOfOffer}, ${lngOfOffer}`,
      price : getRandomIntegerNumberFromRange(priceOfOffer.MIN_PRICE, priceOfOffer.MAX_PRICE),
      type : getRandomArrayElement(TYPE_OF_OFFER),
      rooms : getRandomIntegerNumberFromRange(roomsOfOffer.MIN_COUNT_OF_ROOMS, roomsOfOffer.MAX_COUNT_OF_ROOMS),
      guests : getRandomIntegerNumberFromRange(guestsOfOffer.MIN_COUNT_OF_GUESTS, guestsOfOffer.MAX_COUNT_OF_GUESTS),
      checkin : getRandomArrayElement(CHECIN_OF_OFFER),
      checkout : getRandomArrayElement(CHECKOUT_OF_OFFER),
      features : getNewSetOfValues(FEATURES_OF_OFFER),
      description : getRandomArrayElement(DESCRIPTION_OF_OFFER),
      photos : getNewSetOfValues(PHOTOS_OF_OFFER)
    },
    location : {
      lat : latOfOffer,
      lng : lngOfOffer
    }
  };
};

const CreateArraySimilarAdsNearby = (count) => {
  const similarAds = new Array(count).fill('').map((item, i) => createAds(i));
  return similarAds;
};

CreateArraySimilarAdsNearby(COUNT_OF_AD);

