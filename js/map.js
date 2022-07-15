import {CoordinatesOfTokyo} from './constants.js';
import {getAdressInputValue} from './validation-ad-form.js';
import {getCoordinatesString} from './util.js';
import {createOfferCard} from './offer-card.js';
import {changeFormsState} from './toggle-status-page.js';

const MapAndMarkersSettings = {
  layer : 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  mainPin : {
    iconUrl : './img/main-pin.svg',
    iconSyze : [52, 52],
    iconAnchor : [26, 52]
  },
  pin : {
    iconUrl : './img/pin.svg',
    iconSize : [40, 40],
    iconAnchor : [20, 40],
  }
};

const map = L.map('map-canvas');

map.on('load', () => changeFormsState(true))
  .setView({
    lat : CoordinatesOfTokyo.lat,
    lng : CoordinatesOfTokyo.lng
  }, CoordinatesOfTokyo.scale);

L.tileLayer(
  MapAndMarkersSettings.layer,
  {
    attribution : MapAndMarkersSettings.attribution,
  }
).addTo(map);

const markerGroup = L.layerGroup().addTo(map);

const mainPinIcon = L.icon(MapAndMarkersSettings.mainPin);

const pinIcon = L.icon(MapAndMarkersSettings.pin);

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

const coordinatesMainPinHandler = ({target}) => {
  getAdressInputValue(getCoordinatesString(target.getLatLng()));
};

marker.on('moveend', coordinatesMainPinHandler);

export {setOfferMarkersOnMap};
