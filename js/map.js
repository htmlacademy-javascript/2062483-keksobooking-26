import {CoordinatesOfTokyo} from './constants.js';
import {getAdressInputValue} from './validation-ad-form.js';
import {getCoordinatesString, showError} from './util.js';
import {createOfferCard} from './offer-card.js';
import {changeFormsState} from './toggle-status-page.js';
import {COUNT_OF_AD} from './constants.js';
import {makeRequest} from './api.js';

let offersData = [];


const MapAndMarkersSettings = {
  LAYER : 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  ATTRIBUTION: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  MAIN_PIN : {
    iconUrl : './img/main-pin.svg',
    iconSyze : [52, 52],
    iconAnchor : [26, 52]
  },
  PIN : {
    iconUrl : './img/pin.svg',
    iconSize : [40, 40],
    iconAnchor : [20, 40],
  }
};

const map = L.map('map-canvas');

L.tileLayer(
  MapAndMarkersSettings.LAYER,
  {
    attribution : MapAndMarkersSettings.ATTRIBUTION,
  }
).addTo(map);

const markerGroup = L.layerGroup().addTo(map);

const mainPinIcon = L.icon(MapAndMarkersSettings.MAIN_PIN);

const pinIcon = L.icon(MapAndMarkersSettings.PIN);

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

const onSuccessGetData = (data) => {
  offersData = data.slice();
  setOfferMarkersOnMap(offersData.slice(0, COUNT_OF_AD));
};

const onFailGetData = () => {
  showError();
};

const getMap = () => {
  makeRequest(
    (data) => onSuccessGetData(data),
    () => onFailGetData(),
    'GET'
  );
};

const loadMap = () => {
  changeFormsState(true);
  map.on('load', getMap)
    .setView({
      lat : CoordinatesOfTokyo.lat,
      lng : CoordinatesOfTokyo.lng
    }, CoordinatesOfTokyo.scale);
};

const resetMainPin = () => {
  marker.setLatLng({
    lat: CoordinatesOfTokyo.lat,
    lng: CoordinatesOfTokyo.lng,
  });
};

const resetMarkerGroup = () => {
  markerGroup.clearLayers();
  markerGroup.closePopup();
};

const resetMap = () => {
  map.setView({
    lat: CoordinatesOfTokyo.lat,
    lng: CoordinatesOfTokyo.lng,
  }, CoordinatesOfTokyo.scale);
  resetMainPin();
  resetMarkerGroup();
  setOfferMarkersOnMap(offersData.slice(0, COUNT_OF_AD));
};

export {
  loadMap,
  resetMap
};
