import {createOffers} from './data.js';
import {COUNT_OF_AD} from './constants.js';
import {changeFormsState} from './toggle-status-page.js';
import {initValidationAdForm} from './validation-ad-form.js';
import {setOfferMarkersOnMap} from './map.js';

initValidationAdForm();

changeFormsState(false);

const similarOffers = createOffers(COUNT_OF_AD);

setOfferMarkersOnMap(similarOffers);

changeFormsState(true);

