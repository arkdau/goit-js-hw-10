import axios from "axios";

axios.defaults.headers.common["x-api-key"] = "live_EIPHxfR34sZzOcCVO0rpmULwIik4IBDGmy8a0OdkCG1dBCzOFDlmhGu8wTQ9aX1y";

// Constant URL value for Cat API
const CAT_API_URL = 'https://api.thecatapi.com/v1';

// Object with  authorization headers and Content-Type header
const CAT_API_REQUEST_HEADERS = {
   'Content-Type': 'application/json'
};

const config = {
   // method: 'get',
   maxBodyLength: Infinity,
   // url: `${CAT_API_URL}/breeds`,
   headers: CAT_API_REQUEST_HEADERS
};

// Making a GET request using an axios instance from a connected library

export function fetchCatByBreed(breedId, callback, callbckMsg, callbckError, callbckClear) {

  callbckMsg();
  axios.get(`${CAT_API_URL}/images/search?breed_ids=${breedId}`, config)
    .then(function (response) {
        // console.log(response);
        // console.log('data: ', response.data);
        // console.log('status: ', response.status);
        // console.log('status Text: ', response.statusText);
        // console.log('header:', response.headers);
        // console.log('config: ', response.config);
        callbckClear();
        // callbckState({ images: response.data[0] });
        callback(response.data[0]);
    })
    .catch(function (err) {
      callbckError();
      console.log('err: ', err);
  });
}

export function fetchBreeds(callbckMsg, callbckError, callbckClear) {
  callbckMsg();
  axios.get(`${CAT_API_URL}/breeds`, config)
    .then(function (response) {
      callbckClear();
      // console.log('data: ', response.data);
      // console.log('status: ', response.status);
      let data = response.data;
      //filter to only include those with an `image` object
      data = data.filter(img=> img.image?.url!=null);

      const breadSelect = document.querySelector('.breed-select');
      breadSelect.setAttribute('Style', 'display: block; margin-bottom: 20px');
      // let id=0;
      breadSelect.insertAdjacentHTML('beforeend',
        data.map(function (breed) {
           return (
             `<option value="${breed.id}">${breed.name}</option>`
           );
        }).join(''));
      })
    .catch(function (err) {
      callbckError();
      console.log('err: ', err);
  });
}