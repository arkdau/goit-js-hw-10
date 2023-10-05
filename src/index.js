import {fetchBreeds} from "./cat-api.js";
import {fetchCatByBreed} from "./cat-api.js";

// const state = {
//   images: [],
//   breeds: [],
//   selected_breed: 0
// };

const breadSelect = document.querySelector('.breed-select');

function msgInCommingSoon() {
    document.querySelector('.loader').setAttribute('Style', 'Display: block');
    document.querySelector('.error').setAttribute('Style', 'Display: none');
};

function msgError() {
    document.querySelector('.loader').setAttribute('Style', 'Display: none');
    document.querySelector('.error').setAttribute('Style', 'Display: block');
};

function clear() {
   document.querySelector('.loader').setAttribute('Style', 'Display: none');
   document.querySelector('.error').setAttribute('Style', 'Display: none');
};

clear();

//////////////////////////////////////////////////////////////////////////
//
//  Download data from the server (list of cat breeds) and create <select>
//
///////
fetchBreeds(msgInCommingSoon, msgError, clear);


///////////////////////////////////////////////////////////////////////////
//
//  Download data from the server (selected cat) and display.
//
///////
breadSelect.addEventListener('change', function handleChange() {
   breedId = breadSelect.value;

   // setState({selected_breed:breadSelect.value});
   fetchCatByBreed(breedId, render, msgInCommingSoon, msgError, clear);
});

// function setState(obj) {
//   const key = Object.keys(obj);
//   const value = Object.values(obj);
//   state[key] = value[0];
//   console.log(`key: ${key} value: ${value}`);
//   console.log('state: ', state);
// }

////////////////////////////////////////////////////////////////////////////
//
//  Render markup with updated data and display.
//
///////
function render(kitty) {

  const fragment = document.createDocumentFragment();

    const catInfo = document.createElement('div');
    catInfo.setAttribute('class', 'cat-info');
    catInfo.setAttribute('Style', 'Display: inline-flex; ');

     markupBoxText = `<img src="${kitty.url}" width="640" height="640"></img>
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