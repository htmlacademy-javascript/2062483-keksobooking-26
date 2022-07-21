import {adForm} from './validation-ad-form.js';
import {FILE_TYPES} from './constants.js';


const avatarInput = adForm.querySelector('#avatar');
const avatarPreview = adForm.querySelector('.ad-form-header__preview img');

const photoInput = adForm.querySelector('#images');
const photoPreview = adForm.querySelector('.ad-form__photo');

const createPhoto = (photoUrl) => {
  const img = document.createElement('img');
  img.classList.add('ad-form__photo-preview');
  img.src = photoUrl;
  img.alt = 'Фото жилья';
  photoPreview.append(img);
};

const isTypeValid = (file) => {
  const fileName = file.name.toLowerCase();
  return FILE_TYPES.some((it) => fileName.endsWith(it));
};

const avatarInputChangeHandler = (evt) => {
  evt.preventDefault();
  const avatar = avatarInput.files[0];
  if (isTypeValid(avatar)) {
    avatarPreview.src = URL.createObjectURL(avatar);
  }
};

const photoInputChangeHandler = (evt) => {
  evt.preventDefault();
  const photo = photoInput.files[0];
  if (isTypeValid(photo)) {
    photoPreview.innerHTML = '';
    createPhoto(URL.createObjectURL(photo));
  }
};

avatarInput.addEventListener('change', avatarInputChangeHandler);
photoInput.addEventListener('change', photoInputChangeHandler);

const resetImages = () => {
  avatarPreview.src = 'img/muffin-grey.svg';
  photoPreview.innerHTML = '';
};

export {resetImages};
