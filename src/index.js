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
function  getBreeds() {
  clear();
    fetchBreeds(msgError)
      .then((value) => {
        console.log('promise: ', value);

        //filter to only include those with an `image` object
        data = value.filter(img=> img.image?.url!=null);

        const breadSelect = document.querySelector('.breed-select');
        breadSelect.setAttribute('Style', 'display: block; margin-bottom: 20px');
        breadSelect.insertAdjacentHTML('beforeend',
        data.map(function (breed) {
          return (
            `<option value="${breed.id}">${breed.name}</option>`
          );
        }).join(''));
      })
     .catch( (error) => {
       msgError();
       console.log('error: ', error);
     });
}

getBreeds();

///////////////////////////////////////////////////////////////////////////
//
//  Download data from the server (selected cat) and display.
//
///////
breadSelect.addEventListener('change', function handleChange() {
   const breedId = breadSelect.value;
    msgInCommingSoon();
   // setState({selected_breed:breadSelect.value});
   fetchCatByBreed(breedId, clear)
     .then((value) => {
       console.log('3: ', value[0].breeds);
      render(value[0]);
     })
     .catch((error) => {
       msgError();
       console.log(error);
    });
});

////////////////////////////////////////////////////////////////////////////
//
//  Render markup with updated data and display.
//
///////
function render(kitty) {

  clear();
  const fragment = document.createDocumentFragment();

    const catInfo = document.createElement('div');
    catInfo.setAttribute('class', 'cat-info');
    catInfo.setAttribute('Style', 'Display: inline-flex; ');

     const markupBoxText = `<img src="${kitty.url}" width="640" height="640"></img>
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