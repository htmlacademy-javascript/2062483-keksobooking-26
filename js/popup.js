import {createOffers} from './data.js';
import {COUNT_OF_AD} from './constants.js';
const similarOffers = createOffers(COUNT_OF_AD);

const HousingType = {
  flat : 'Квартира',
  bungalow : 'Бунгало',
  house : 'Дом',
  palace : 'Дворец',
  hotel : 'Отель'
};

const mapCanvas = document.querySelector('#map-canvas');
const popupTemplate = document.querySelector('#card').content.querySelector('.popup');

similarOffers.forEach((element) => {
  const similarOffer = popupTemplate.cloneNode(true);

  const featuresList = similarOffer.querySelectorAll('.popup__feature');
  const featureTemplate = similarOffer.querySelector('.popup__features');
  if (element.offer.features.length === 0) {
    featureTemplate.remove();
  }
  const modifiers = element.offer.features.map((feature) => `popup__feature--${feature}`);
  featuresList.forEach((featureItem) => {
    const modifier = featureItem.classList[1];
    if (!modifiers.includes(modifier)) {
      featureItem.remove();
    }
  });

  const photosList = similarOffer.querySelector('.popup__photos');
  const photoTemplate = photosList.querySelector('.popup__photo');
  if (element.offer.photos.length === 0) {
    photosList.remove();
  }
  element.offer.photos.forEach((item) => {
    const photo = photoTemplate.cloneNode(true);
    photo.src = item;
    photosList.appendChild(photo);
  });
  photosList.children[0].remove();

  const descriptionTemplate = similarOffer.querySelector('.popup__description');
  if (element.offer.description.length === 0) {
    descriptionTemplate.remove();
  }
  descriptionTemplate.textContent = element.offer.description;

  similarOffer.querySelector('.popup__title').textContent = element.offer.title;
  similarOffer.querySelector('.popup__text--address').textContent = element.offer.address;
  similarOffer.querySelector('.popup__text--price').textContent = `${element.offer.price} ₽/ночь`;
  similarOffer.querySelector('.popup__type').textContent = HousingType[element.offer.type];
  similarOffer.querySelector('.popup__text--capacity').textContent = `${element.offer.rooms} комнаты для ${element.offer.guests} гостей`;
  similarOffer.querySelector('.popup__text--time').textContent = `Заезд после ${element.offer.checkin}, выезд до ${element.offer.checkout}`;
  similarOffer.querySelector('.popup__avatar').src = element.author.avatar;

  mapCanvas.appendChild(similarOffer);
});
