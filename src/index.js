import {fetchBreeds} from "./cat-api.js";
import {fetchCatByBreed} from "./cat-api.js";

state = {
  images: [],
  breeds: [],
  selected_breed: 0
};

const breadSelect = document.querySelector('.breed-select');

function msgInCommingSoon() {
  document.querySelector('.loader').innerText =
    'Loading data, please wait...';
  document.querySelector('.error').innerText = '';
};
function msgError() {
  document.querySelector('.loader').setAttribute('Style', 'Display:none');
  document.querySelector('.error').innerText =
    'Oops! Something went wrong! Try reloading the page!';
};

function clear() {
  document.querySelector('.loader').innerText = ' ';
  document.querySelector('.error').innerText = ' ';
};

clear();
fetchBreeds(msgInCommingSoon, msgError, clear);

breadSelect.addEventListener('change', function handleChange() {
breedId = breadSelect.value;

 console.log("Breed Selected. ID:",breadSelect.value);
    setState({selected_breed:breadSelect.value});
    loadBreedImages();

console.log('breedSelect: ', breadSelect);
console.log('breedID: ', breedId);

});

function setState(obj) {
  const key = Object.keys(obj);
  const value = Object.values(obj);
  state[key] = value[0];
  console.log(`key: ${key} value: ${value}`);
  console.log('state: ', state);
}

 function getCatsImagesByBreed(breed_id, amount) {
      fetchCatByBreed(breed_id, render, setState, msgInCommingSoon, msgError, clear);
  }

function loadBreedImages() {
  console.log('Load Breed Images:', state.selected_breed)
  let breed_images = getCatsImagesByBreed(state.selected_breed, 5)
  console.log('breed_images: ', breed_images);
  setState({ images: breed_images });
}

function render(kitty) {

const fragment = document.createDocumentFragment();

    const catInfo = document.createElement('div');
    catInfo.setAttribute('class', 'cat-info');
    catInfo.setAttribute('Style', 'Display: inline-flex; ');

  //////////////////////////////////////////////////////////////////

   markupBoxText =  `<img src="${kitty.url}" width="640" height="640"></img>
                     <div Style="width: 550px; margin-left:20px">
                       <h1>${kitty.breeds[0].name}</h1>
                       <p>${kitty.breeds[0].description}</p>
                       <p><strong>Temperament: </strong>${kitty.breeds[0].temperament}</p>
                     </div>`



    catInfo.insertAdjacentHTML('beforeend',markupBoxText);
    fragment.append(catInfo);

    const box = document.querySelector('.cat-info');
    if (!catInfo.hasChildNodes()) {
      box.appendChild(fragment);
    }else {
      box.replaceWith(fragment);
    };
}
