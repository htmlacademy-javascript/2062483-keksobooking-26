import {adForm} from './validation-ad-form.js';
import {FILE_TYPES} from './constants.js';
import {createPhoto} from './util.js';


const avatarInput = adForm.querySelector('#avatar');
const avatarPreview = adForm.querySelector('.ad-form-header__preview img');

const photoInput = adForm.querySelector('#images');
const photoPreview = adForm.querySelector('.ad-form__photo');

const isTypeValid = (file) => {
  const fileName = file.name.toLowerCase();
  return FILE_TYPES.some((it) => fileName.endsWith(it));
};

const getImageFromInput = (imageInput) => imageInput.files[0];

const onAvatarInputChange = (evt) => {
  evt.preventDefault();
  const avatar = getImageFromInput(avatarInput);
  if (isTypeValid(avatar)) {
    avatarPreview.src = URL.createObjectURL(avatar);
  }
};

const onPhotoInputChange = (evt) => {
  evt.preventDefault();
  const photo = getImageFromInput(photoInput);
  if (isTypeValid(photo)) {
    photoPreview.innerHTML = '';
    createPhoto(URL.createObjectURL(photo), photoPreview);
  }
};

avatarInput.addEventListener('change', onAvatarInputChange);
photoInput.addEventListener('change', onPhotoInputChange);

const resetImages = () => {
  avatarPreview.src = 'img/muffin-grey.svg';
  photoPreview.innerHTML = '';
};

export {resetImages};
