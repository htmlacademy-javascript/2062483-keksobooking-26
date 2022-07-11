const COUNT_OF_AD = 10;
const TYPE_OF_OFFER = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel'
];
const FEATURES_OF_OFFER = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];
const MAX_TITLE_LENGTH = 100;
const MIN_TITLE_LENGTH = 30;
const MAX_PRICE_VALUE = 100000;
const RoomsCount = {
  ONE_ROOM : '1',
  TWO_ROOMS : '2',
  THREE_ROOMS : '3',
  HUNDRED_ROOMS : '100'
};
const GuestsCount = {
  ONE_GUEST : '1',
  TWO_GUESTS: '2',
  THREE_GUESTS: '3',
  UNAVAILABLE: '0'
};
const MinPriceDependingHousingType = {
  bungalow : 0,
  flat : 1000,
  hotel : 3000,
  house : 5000,
  palace : 10000
};

export {
  COUNT_OF_AD,
  TYPE_OF_OFFER,
  FEATURES_OF_OFFER,
  MAX_TITLE_LENGTH,
  MIN_TITLE_LENGTH,
  MAX_PRICE_VALUE,
  RoomsCount,
  GuestsCount,
  MinPriceDependingHousingType
};
