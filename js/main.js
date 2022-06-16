const COUNT_OF_AD = 10;
const COORDINATES_OF_OFFER = {
  maxLat : 35.70000,
  minLat : 35.65000,
  maxLng : 139.80000,
  minLng : 139.70000,
  numberOfDigitsAfterComma : 5
};
const PRICE_OF_OFFER = {
  minPrice : 1000,
  maxPrice : 10000
};
const ROOMS_OF_OFFER = {
  minCountOfRooms : 1,
  maxCountOfRooms : 3
};
const GUESTS_OF_OFFER =  {
  minCountOfGuests : 1,
  maxCountOfGuests : 6
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
  const avatars = [...Array(count)];
  avatars.fill('').forEach((item, i) => {
    avatars[i] = `img/avatars/user${String(i+1).padStart(2, '0')}.png`;
  });
  return avatars;
};
const AVATARS_OF_AUTHOR = getAvatars(COUNT_OF_AD);

const getFeatures = (features) => {
  const setOfFeaturesLength = getRandomIntegerNumberFromRange(1, features.length);
  const setOfFeatures = [...Array(setOfFeaturesLength)];
  const unicumFeatures = [...features];
  setOfFeatures.filter((item, i) => {
    const randomIndexUnicumFeatures = getRandomIntegerNumberFromRange(0, unicumFeatures.length - 1);
    setOfFeatures[i] = unicumFeatures[randomIndexUnicumFeatures];
    unicumFeatures.splice(randomIndexUnicumFeatures, 1);
  });
  return setOfFeatures;
};

const getPhotos = (photos) => {
  const setOfPhotosLength = getRandomIntegerNumberFromRange(1, photos.length);
  const setOfPhotos = [...Array(setOfPhotosLength)];
  setOfPhotos.filter((item, i) => {
    setOfPhotos[i] = photos[getRandomIntegerNumberFromRange(0, photos.length - 1)];
  });
  return setOfPhotos;
};

const createAds = (number) => {
  const latOfOffer = getRandomNotIntegerNumberFromRange(COORDINATES_OF_OFFER.minLat, COORDINATES_OF_OFFER.maxLat, COORDINATES_OF_OFFER.numberOfDigitsAfterComma);
  const lngOfOffer = getRandomNotIntegerNumberFromRange(COORDINATES_OF_OFFER.minLng, COORDINATES_OF_OFFER.maxLng, COORDINATES_OF_OFFER.numberOfDigitsAfterComma);
  return {
    author : {
      avatar : AVATARS_OF_AUTHOR[number],
    },
    offer : {
      title : getRandomArrayElement(TITLE_OF_OFFER),
      address : `${latOfOffer}, ${lngOfOffer}`,
      price : getRandomIntegerNumberFromRange(PRICE_OF_OFFER.minPrice, PRICE_OF_OFFER.maxPrice),
      type : getRandomArrayElement(TYPE_OF_OFFER),
      rooms : getRandomIntegerNumberFromRange(ROOMS_OF_OFFER.minCountOfRooms, ROOMS_OF_OFFER.maxCountOfRooms),
      guests : getRandomIntegerNumberFromRange(GUESTS_OF_OFFER.minCountOfGuests, GUESTS_OF_OFFER.maxCountOfGuests),
      checkin : getRandomArrayElement(CHECIN_OF_OFFER),
      checkout : getRandomArrayElement(CHECKOUT_OF_OFFER),
      features : getFeatures(FEATURES_OF_OFFER),
      description : getRandomArrayElement(DESCRIPTION_OF_OFFER),
      photos : getPhotos(PHOTOS_OF_OFFER)
    },
    location : {
      lat : latOfOffer,
      lng : lngOfOffer
    }
  };
};

const CreateArraySimilarAdsNearby = (count) => {
  const similarAds = [...Array(count)];
  similarAds.fill('').forEach((item, i) => {
    similarAds[i] = createAds(i);
  });
  return similarAds;
};

CreateArraySimilarAdsNearby(COUNT_OF_AD);

