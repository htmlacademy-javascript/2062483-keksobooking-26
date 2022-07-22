import {CoordinatesOfTokyo} from './constants.js';
import {getAdressInputValue} from './validation-ad-form.js';
import {createOfferCard} from './offer-card.js';
import {changeFormsState} from './toggle-status-page.js';
import {makeRequest} from './api.js';
import {
  getCoordinatesString,
  showError,
  debounce,
  cutOffersListToMaxCount
} from './util.js';
import {
  COUNT_OF_AD,
  RERENDER_DELAY
} from './constants.js';
import {
  mapFiltersContainer,
  filterOffers
} from './map-filters.js';

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

const onCoordinatesMainPin = ({target}) => {
  getAdressInputValue(getCoordinatesString(target.getLatLng()));
};

const getDefaultCoordinatesInAdressInput = () => {
  getAdressInputValue(getCoordinatesString(CoordinatesOfTokyo));
};

const setCoordinatesInAdressInput = () => marker.on('moveend', onCoordinatesMainPin);

const resetAdsMarkers = () => {
  markerGroup.clearLayers();
  markerGroup.closePopup();
};

const onSuccessGetData = (data) => {
  offersData = data.slice();
  setOfferMarkersOnMap(cutOffersListToMaxCount(offersData, COUNT_OF_AD));

  mapFiltersContainer.addEventListener('change', debounce(() => {
    resetAdsMarkers();
    setOfferMarkersOnMap(cutOffersListToMaxCount(filterOffers(data), COUNT_OF_AD));
  }, RERENDER_DELAY));
};

const onFailGetData = () => {
  showError();
};

const getOffers = () => {
  makeRequest(
    (data) => onSuccessGetData(data),
    () => onFailGetData(),
    'GET'
  );
};

const loadMap = () => {
  changeFormsState(true);
  getDefaultCoordinatesInAdressInput();
  setCoordinatesInAdressInput();
  map.on('load', getOffers)
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

const resetMap = () => {
  map.setView({
    lat: CoordinatesOfTokyo.lat,
    lng: CoordinatesOfTokyo.lng,
  }, CoordinatesOfTokyo.scale);
  resetMainPin();
  resetAdsMarkers();
  setOfferMarkersOnMap(offersData.slice(0, COUNT_OF_AD));
};

export {
  loadMap,
  resetMap,
  setOfferMarkersOnMap,
  getDefaultCoordinatesInAdressInput
};
