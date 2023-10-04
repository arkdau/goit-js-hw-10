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
        console.log('data: ', response.data);
        console.log('status: ', response.status);
        console.log('status Text: ', response.statusText);
        console.log('header:', response.headers);
        console.log('config: ', response.config);
        // breeds.id = response.data[0].id;
        // breeds.name = response.data[0].name;
        // breeds.description = response.data[0].description;
        // breeds.temperament = response.data[0].temperament;
        // breeds.url = response.data[0].url;
        // return (response.data);
        callbckClear();
        callback(response.data[0]);
    })
    .catch(function (err) {
    // document.getElementById('people').innerHTML = '<li class="text-danger">' + err.message + '</li>';
      callbckError();
      console.log('err: ', err);
  });
}

export function fetchBreeds(callbckMsg, callbckError, callbckClear) {
  callbckMsg();
  axios.get(`${CAT_API_URL}/breeds`, config)
    .then(function (response) {
      callbckClear();
      console.log('data: ', response.data);
      console.log('status: ', response.status);

      const breadSelect = document.querySelector('.breed-select');
      // let id=0;
      breadSelect.insertAdjacentHTML('beforeend',
      response.data.map(function (breed) {
        return (
          `<option value="${breed.id}">${breed.name}</option>`
        );
      }).join(''));
    })
    .catch(function (err) {
    // document.getElementById('people').innerHTML = '<li class="text-danger">' + err.message + '</li>';
      callbckError();
      console.log('err: ', err);
  });
}