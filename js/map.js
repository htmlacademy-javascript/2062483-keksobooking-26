import {CoordinatesOfTokyo} from './constants.js';
import {getAdressInputValue} from './validation-ad-form.js';
import {getCoordinatesString} from './util.js';
import {createOfferCard} from './offer-card.js';

const map = L.map('map-canvas')
  .setView({
    lat : CoordinatesOfTokyo.lat,
    lng : CoordinatesOfTokyo.lng
  }, CoordinatesOfTokyo.scale);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const markerGroup = L.layerGroup().addTo(map);

const mainPinIcon = L.icon({
  iconUrl : './img/main-pin.svg',
  iconSyze : [52, 52],
  iconAnchor : [26, 52]
});

const pinIcon = L.icon({
  iconUrl : './img/pin.svg',
  iconSize : [40, 40],
  iconAnchor : [20, 40],
});

const marker = L.marker(
  {
    lat : CoordinatesOfTokyo.lat,
    lng : CoordinatesOfTokyo.lng,
  },{
    draggable : true,
    icon : mainPinIcon
  }
);
marker.addTo(map);

const createOfferMarker = (offer) => {
  L.marker({
    lat : offer.location.lat,
    lng : offer.location.lng
  },{
    draggable : false,
    icon : pinIcon,
  }).addTo(markerGroup)
    .bindPopup(createOfferCard(offer));
};

const setOfferMarkersOnMap = (similarOffers) => {
  similarOffers.forEach((offer) => {
    createOfferMarker(offer);
  });
};

marker.on('moveend', (evt) =>  getAdressInputValue(getCoordinatesString(evt.target.getLatLng())));

export {setOfferMarkersOnMap};
