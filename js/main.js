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

const getRandomArrayElement = (elements) => elements[getRandomIntegerNumberFromRange(0, elements.length - 1)];

const MAX_LAT_OF_OFFER = 35.70000;
const MIN_LAT_OF_OFFER = 35.65000;
const MAX_LNG_OF_OFFER = 139.80000;
const MIN_LNG_OF_OFFER = 139.70000;
const MIN_PRICE_OF_OFFER = 1000;
const MAX_PRICE_OF_OFFER = 10000;
const MIN_ROOMS_OF_OFFER = 1;
const MAX_ROOMS_OF_OFFER = 3;
const MIN_GUESTS_OF_OFFER = 1;
const MAX_GUESTS_OF_OFFER = 6;
const ADRESS_OF_OFFER = [
  `${getRandomNotIntegerNumberFromRange(MIN_LAT_OF_OFFER, MAX_LAT_OF_OFFER, 5)} ${getRandomNotIntegerNumberFromRange(MIN_LNG_OF_OFFER, MAX_LNG_OF_OFFER, 5)}`,
  `${getRandomNotIntegerNumberFromRange(MIN_LAT_OF_OFFER, MAX_LAT_OF_OFFER, 5)} ${getRandomNotIntegerNumberFromRange(MIN_LNG_OF_OFFER, MAX_LNG_OF_OFFER, 5)}`,
  `${getRandomNotIntegerNumberFromRange(MIN_LAT_OF_OFFER, MAX_LAT_OF_OFFER, 5)} ${getRandomNotIntegerNumberFromRange(MIN_LNG_OF_OFFER, MAX_LNG_OF_OFFER, 5)}`
];
const COUNT_OF_AD = 10;
const createAvatarsArray = (count) => {
  const avatars = [];
  for (let i = 1; i <= count; i++) {
    if (i < 10) {
      i = `0${i}`;
    }
    avatars.push(`img/avatars/user${i}.png`);
  }
  return avatars;
};
const AVATAR_OF_AUTHOR = createAvatarsArray(COUNT_OF_AD);

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


const createObj = (number) => ({
  author : {
    avatar : AVATAR_OF_AUTHOR[number],
  },
  offer : {
    title : getRandomArrayElement(TITLE_OF_OFFER),
    address : getRandomArrayElement(ADRESS_OF_OFFER),
    price : getRandomIntegerNumberFromRange(MIN_PRICE_OF_OFFER, MAX_PRICE_OF_OFFER),
    type : getRandomArrayElement(TYPE_OF_OFFER),
    rooms : getRandomIntegerNumberFromRange(MIN_ROOMS_OF_OFFER, MAX_ROOMS_OF_OFFER),
    guests : getRandomIntegerNumberFromRange(MIN_GUESTS_OF_OFFER, MAX_GUESTS_OF_OFFER),
    checkin : getRandomArrayElement(CHECIN_OF_OFFER),
    checkout : getRandomArrayElement(CHECKOUT_OF_OFFER),
    features : getRandomArrayElement(FEATURES_OF_OFFER),
    description : getRandomArrayElement(DESCRIPTION_OF_OFFER),
    photos : getRandomArrayElement(PHOTOS_OF_OFFER)
  },
  location : {
    lat : getRandomNotIntegerNumberFromRange(MIN_LAT_OF_OFFER, MAX_LAT_OF_OFFER, 5),
    lng : getRandomNotIntegerNumberFromRange(MIN_LNG_OF_OFFER, MAX_LNG_OF_OFFER, 5)
  }
});

const CreateArraySimilarAdsNearby = (count) => {
  const similarAds = [];
  for(let i = 0; i < count; i++) {
    similarAds.push(createObj(i));
  }
  return similarAds;
};

CreateArraySimilarAdsNearby(COUNT_OF_AD);

