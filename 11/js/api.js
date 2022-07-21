import {Urls} from './constants.js';

const makeRequest = (onSuccess, onFail, method, body) => {
  fetch(
    Urls[method],
    {
      method : method,
      body : body
    }
  )
    .then((response) => response.json())
    .then((data) => onSuccess(data))
    .catch(() => onFail());
};

export {makeRequest};
