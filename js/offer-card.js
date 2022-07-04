import {
  declinationString
} from './util.js';

const housingType = {
  flat : 'Квартира',
  bungalow : 'Бунгало',
  house : 'Дом',
  palace : 'Дворец',
  hotel : 'Отель'
};

const declinationRoomStrings = ['комната', 'комнаты', 'комнат'];
const declinationGuestStrings = ['гостя', 'гостей'];

const mapCanvas = document.querySelector('#map-canvas');
const popupTemplate = document.querySelector('#card').content.querySelector('.popup');

const createOfferCard = (ad) => {
  const similarOffer = popupTemplate.cloneNode(true);

  const {offer: {title, address, price, type, rooms, guests, checkin, checkout, features, description, photos}, author: {avatar}} = ad;

  const featureTemplate = similarOffer.querySelector('.popup__features');
  const createFeaturesList = (listOfFeatures) => {
    if (features.length === 0) {
      featureTemplate.remove();
    }
    featureTemplate.innerHTML = '';
    listOfFeatures.forEach((feature, i) => {
      feature = document.createElement('li');
      feature.classList.add('popup__feature');
      feature.classList.add(`popup__feature--${listOfFeatures[i]}`);
      featureTemplate.appendChild(feature);
    });
  };
  createFeaturesList(features);

  const photoTemplate = similarOffer.querySelector('.popup__photos');
  const photosList = photoTemplate.querySelector('.popup__photo');
  const createPhotosList = (listOfPhotos) => {
    if (listOfPhotos.length === 0) {
      photoTemplate.remove();
    }
    listOfPhotos.forEach((photo) => {
      const photoItem = photosList.cloneNode(true);
      photoItem.src = photo;
      photoTemplate.appendChild(photoItem);
    });
    photoTemplate.children[0].remove();
  };
  createPhotosList(photos);

  const descriptionTemplate = similarOffer.querySelector('.popup__description');
  if (ad.offer.description.length === 0) {
    descriptionTemplate.remove();
  }
  descriptionTemplate.textContent = description;

  similarOffer.querySelector('.popup__title').textContent = title;
  similarOffer.querySelector('.popup__text--address').textContent = address;
  similarOffer.querySelector('.popup__text--price').textContent = `${price} ₽/ночь`;
  similarOffer.querySelector('.popup__type').textContent = housingType[type];
  similarOffer.querySelector('.popup__text--capacity').textContent = `${rooms} ${declinationString(rooms, declinationRoomStrings)} для ${guests} ${declinationString(guests, declinationGuestStrings)}.`;
  similarOffer.querySelector('.popup__text--time').textContent = `Заезд после ${checkin}, выезд до ${checkout}`;
  similarOffer.querySelector('.popup__avatar').src = avatar;

  mapCanvas.appendChild(similarOffer);
};

export {createOfferCard};
