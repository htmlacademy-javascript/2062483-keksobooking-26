import {
  getRandomIntegerNumberFromRange,
  getRandomNotIntegerNumberFromRange,
  getRandomArrayElement,
  getNewSetOfValues
} from './util.js';
import {
  COUNT_OF_AD,
  TYPE_OF_OFFER,
  FEATURES_OF_OFFER
} from './constants.js';

const CoordinatesOfOffer = {
  MAXLAT : 35.70000,
  MINLAT : 35.65000,
  MAXLNG : 139.80000,
  MINLNG : 139.70000,
  NUMBER_OF_DIGITS_AFTER_COMMA : 5
};
const PriceOfOffer = {
  MIN_PRICE : 1000,
  MAX_PRICE : 10000
};
const RoomsOfOffer = {
  MIN_COUNT_OF_ROOMS : 1,
  MAX_COUNT_OF_ROOMS : 10
};
const GuestsOfOffer =  {
  MIN_COUNT_OF_GUESTS : 1,
  MAX_COUNT_OF_GUESTS: 6
};
const TITLE_OF_OFFER = [
  'My flat for you',
  'Be happy here',
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
const DESCRIPTION_OF_OFFER = [
  'Very good',
  'Good'
];
const PHOTOS_OF_OFFER = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'
];
const getAvatars = (count) => {
  const avatars = new Array(count).fill('').map((_, i) => `img/avatars/user${String(i+1).padStart(2, '0')}.png`);
  return avatars;
};
const AVATARS_OF_AUTHOR = getAvatars(COUNT_OF_AD);

const createAds = (number) => {
  const latOfOffer = getRandomNotIntegerNumberFromRange(CoordinatesOfOffer.MINLAT, CoordinatesOfOffer.MAXLAT, CoordinatesOfOffer.NUMBER_OF_DIGITS_AFTER_COMMA);
  const lngOfOffer = getRandomNotIntegerNumberFromRange(CoordinatesOfOffer.MINLNG, CoordinatesOfOffer.MAXLNG, CoordinatesOfOffer.NUMBER_OF_DIGITS_AFTER_COMMA);
  return {
    author : {
      avatar : AVATARS_OF_AUTHOR[number],
    },
    offer : {
      title : getRandomArrayElement(TITLE_OF_OFFER),
      address : `${latOfOffer}, ${lngOfOffer}`,
      price : getRandomIntegerNumberFromRange(PriceOfOffer.MIN_PRICE, PriceOfOffer.MAX_PRICE),
      type : getRandomArrayElement(TYPE_OF_OFFER),
      rooms : getRandomIntegerNumberFromRange(RoomsOfOffer.MIN_COUNT_OF_ROOMS, RoomsOfOffer.MAX_COUNT_OF_ROOMS),
      guests : getRandomIntegerNumberFromRange(GuestsOfOffer.MIN_COUNT_OF_GUESTS, GuestsOfOffer.MAX_COUNT_OF_GUESTS),
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

const createOffers = (count) => new Array(count).fill('').map((_, i) => createAds(i));

export {createOffers};
