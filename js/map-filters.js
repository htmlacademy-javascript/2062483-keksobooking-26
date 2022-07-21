const DEFAULT_VALUE = 'any';
const PriceRangeInMapFilter = {
  ANY : {
    minPrice : 0,
    maxPrice : 100000
  },
  LOW : {
    minPrice : 0,
    maxPrice : 10000
  },
  MIDDLE : {
    minPrice : 10000,
    maxPrice : 50000
  },
  HIGH : {
    minPrice : 50000,
    maxPrice : 100000
  }
};

const mapFiltersContainer = document.querySelector('.map__filters');

const checkMapFilters = (ad) => {

  const {offer: {price, type, rooms, guests, features}} = ad;
  const typeFilterValue = mapFiltersContainer.querySelector('#housing-type').value;
  const priceFilterValue = mapFiltersContainer.querySelector('#housing-price').value;
  const roomsFilterValue = mapFiltersContainer.querySelector('#housing-rooms').value;
  const guestsFilterValue = mapFiltersContainer.querySelector('#housing-guests').value;
  const featuresFilterValue = Array.from(mapFiltersContainer.querySelector('#housing-features').querySelectorAll('input:checked'));

  const checkType = () => type === typeFilterValue || typeFilterValue === DEFAULT_VALUE;
  const checkPrice = () => price >= PriceRangeInMapFilter[priceFilterValue.toUpperCase()].minPrice && price <= PriceRangeInMapFilter[priceFilterValue.toUpperCase()].maxPrice;
  const checkRooms = () => String(rooms) === roomsFilterValue || roomsFilterValue === DEFAULT_VALUE;
  const checkGuests = () => String(guests) === guestsFilterValue || guestsFilterValue === DEFAULT_VALUE;
  const checkFeatures = () => {
    if (featuresFilterValue.length) {
      if (features) {
        return featuresFilterValue.every((checkbox) => features.includes(checkbox.value));
      }
    } else {
      return featuresFilterValue.length === 0;
    }
  };

  const allChecks = [checkType, checkPrice, checkRooms, checkGuests, checkFeatures];

  return allChecks.every((check) => check());
};

const filterOffers = (data) => data.slice().filter(checkMapFilters);

export {
  filterOffers,
  mapFiltersContainer
};
