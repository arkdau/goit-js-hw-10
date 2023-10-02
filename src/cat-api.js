import axios from "axios";

axios.defaults.headers.common["x-api-key"] = "live_EIPHxfR34sZzOcCVO0rpmULwIik4IBDGmy8a0OdkCG1dBCzOFDlmhGu8wTQ9aX1y";

// Constant URL value for Cat API
const CAT_API_URL = 'https://api.thecatapi.com/v1';

// Object with RapidAPI authorization headers and Content-Type header
const CAT_API_REQUEST_HEADERS = {
   'Content-Type': 'application/json'
};


export function fetchBreeds() {
  // Making a GET request using an axios instance from a connected library
  return axios.get(`${CAT_API_URL}/breeds`, { headers: CAT_API_REQUEST_HEADERS });
}


export function fetchCatByBreed(breedId) {
  // console.log('fetchCatByBreed:', breedId);
  // console.log(`${CAT_API_URL}/images/search?breed_ids=${breedId}`);
  // Making a GET request using an axios instance from a connected library
  return axios.get(`${CAT_API_URL}/images/search?breed_ids=${breedId}`, { headers: CAT_API_REQUEST_HEADERS });

}