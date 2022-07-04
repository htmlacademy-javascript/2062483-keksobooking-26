const adFormContainer = document.querySelector('.ad-form');
const adFormElements = Array.from(adFormContainer.children);
const adFormSliderElement = document.querySelector('.ad-form__slider');
const mapFiltersContainer = document.querySelector('.map__filters');
const mapFiltersElements = Array.from(mapFiltersContainer.children);

const disablePage = () => {
  adFormContainer.classList.add('ad-form--disabled');
  adFormElements.forEach((adItem) => {
    adItem.disabled = true;
  });
  adFormSliderElement.disabled = true;
  mapFiltersContainer.classList.add('map__filters--disabled');
  mapFiltersElements.forEach((mapItem) => {
    mapItem.disabled = true;
  });
};

const enablePage = () => {
  adFormContainer.classList.remove('ad-form--disabled');
  adFormElements.forEach((adItem) => {
    adItem.disabled = false;
  });
  adFormSliderElement.disabled = false;
  mapFiltersContainer.classList.remove('map__filters--disabled');
  mapFiltersElements.forEach((mapItem) => {
    mapItem.disabled = false;
  });
};

export {
  disablePage,
  enablePage
};
