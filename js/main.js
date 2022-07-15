import {createOffers} from './data.js';
import {COUNT_OF_AD} from './constants.js';
import {initValidationAdForm} from './validation-ad-form.js';
import {setOfferMarkersOnMap} from './map.js';

initValidationAdForm();

const similarOffers = createOffers(COUNT_OF_AD);

setOfferMarkersOnMap(similarOffers);

