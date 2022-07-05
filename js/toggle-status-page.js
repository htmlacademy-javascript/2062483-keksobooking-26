const adFormContainer = document.querySelector('.ad-form');
const mapFiltersContainer = document.querySelector('.map__filters');
const elementsForDisabling = document.querySelectorAll('fieldset , select.map__filter');

const changeFormsState = (state) => {
  if (!state) {
    adFormContainer.classList.add('ad-form--disabled');
    mapFiltersContainer.classList.add('map__filters--disabled');
  } else {
    adFormContainer.classList.remove('ad-form--disabled');
    mapFiltersContainer.classList.remove('map__filters--disabled');
  }
  elementsForDisabling.forEach((item) => {
    item.disabled = !state;
  });
};

export {changeFormsState};
