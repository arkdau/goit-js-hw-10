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

export function fetchCatByBreed(breedId, callbckError) {

  // callbckMsg();
return  axios.get(`${CAT_API_URL}/images/search?breed_ids=${breedId}`, config)
    .then(function (response) {
      // console.log('2', response.data);
        return response.data;
    })
    .catch(function (err) {
      callbckError();
      console.log('err: ', err);
  });
}

export function fetchBreeds(callbckError) {
  // callbckMsg();
  return axios.get(`${CAT_API_URL}/breeds`, config)
    .then(function (response) {
      console.log('return: ', response.data);
      return response.data;
      })
    .catch(function (err) {
      callbckError();
      console.log('err: ', err);
  });
}