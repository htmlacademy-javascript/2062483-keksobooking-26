import {createOffers} from './data.js';
import {COUNT_OF_AD} from './constants.js';
import {createOfferCard} from './offer-card.js';
import {
  disablePage,
  enablePage
} from './form-activity-state.js';

disablePage();
const similarOffers = createOffers(COUNT_OF_AD);

createOfferCard(similarOffers[0]);
enablePage();
