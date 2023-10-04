import {fetchBreeds} from "./cat-api.js";
import {fetchCatByBreed} from "./cat-api.js";

// let storedBreeds = [];
// let kitty;
let image;
let breedId;
// let breedsHeader;
// let breedsDesc;
// let breedsTemperament;
// let breedsSpan;
// let boxText;

state = {
  images: [],
  breeds: [],
  selected_breed: 0
};



const breadSelect = document.querySelector('.breed-select');
// const loaderMsg = document.querySelector('.loader');
// const errorMsg =  document.querySelector('.error') ;
//
// loaderMsg.innerHTML = 'Loading data, please wait...';
// errorMsg.innerHTML = '';

function msgInCommingSoon() {
  document.querySelector('.loader').innerText =
    'Loading data, please wait...';
  document.querySelector('.error').innerText = '';
};
function msgError() {
  document.querySelector('.loader').setAttribute('Style', 'Display:none');
  document.querySelector('.error').innerText =
    'Oops! Something went wrong! Try reloading the page!';
  // document.querySelector('.').setAttribute('Style', 'Display:none');
};

function clear() {
  document.querySelector('.loader').innerText = ' ';
  document.querySelector('.error').innerText = ' ';
};

clear();
fetchBreeds(msgInCommingSoon, msgError, clear);
    // .then((response) => {
//         loaderMsg.innerHTML = '';
//         // return response.json();
//         return response.data;
//     })
//     .then((data) => {
//
//       //filter to only include those with an `image` object
//       data = data.filter(img=> img.image?.url!=null);
//
//       storedBreeds = data;
//
//       for (let i = 0; i < storedBreeds.length; i++) {
//         const breed = storedBreeds[i];
//         let option = document.createElement('option');
//
//         //skip any breeds that don't have an image
//         if(!breed.image)continue;
//
//         //use the current array index
//         option.value = i;
//         option.innerHTML = `${breed.name}`;
//         document.querySelector('.breed-select').appendChild(option);
//       }
//     })
//     .catch((error) => {
//        loaderMsg.innerHTML = '';
//        errorMsg.innerHTML = 'Oops! Something went wrong! Try reloading the page!';
//        console.log('fetch Breeds: ',error);
//     });
//
breadSelect.addEventListener('change', function handleChange() {
breedId = breadSelect.value;

 console.log("Breed Selected. ID:",breadSelect.value);
    setState({selected_breed:breadSelect.value});
    loadBreedImages();

  // breedId = storedBreeds[breadSelect.selectedIndex].id;
  // if (image !== undefined) {
    // clearImage();
    // loaderMsg.innerHTML = 'Loading data, please wait...';
    // errorMsg.innerHTML = '';
  // };
console.log('breedSelect: ', breadSelect);
console.log('breedID: ', breedId);
// fetchCatByBreed(breedId, showImage, msgInCommingSoon, msgError, clear);


  // fetchCatByBreed(breedId)
  //    .then((response) => {
  //        loaderMsg.innerHTML = '';
  //        // return response.json();
  //        return response.data;
  //    })
  //    .then((data) => {
  //      kitty = data[0];
  //      showImage(kitty);
  //    })
  //    .catch((error) => {
  //       // clearImage();
  //       loaderMsg.innerHTML = '';
  //       errorMsg.innerHTML = 'Oops! Something went wrong! Try reloading the page!';
  //       console.log('fetch Cat: ', error);
  //    });
});


function setState(obj) {
  const key = Object.keys(obj);
  const value = Object.values(obj);
  state[key] = value[0];
  console.log(`key: ${key} value: ${value}`);
  console.log('state: ', state);
}


 function getCatsImagesByBreed(breed_id, amount) {
      //const res = await axios('/images/search?breed_ids='+breed_id + "&limit="+ amount);
      fetchCatByBreed(breed_id, render, setState, msgInCommingSoon, msgError, clear);
      // console.table('res:', res);
      // return res;
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

    // const catInfo = document.querySelector('cat-info');

    image = document.createElement("img");
    image.setAttribute('width', '640');
    image.setAttribute('height', '640');
    image.src = kitty.url;

    boxText = document.createElement("div");
    boxText.setAttribute('Style', 'width: 550px; margin-left:20px');

    breedsHeader = document.createElement("h1");
    breedsDesc = document.createElement("p");

    breedsTemperament = document.createElement("p");
    breedsTemperament.setAttribute('Style', 'Display: inline;');
    breedsSpan = document.createElement("strong");

breedsHeader.innerText = kitty.breeds[0].name;
breedsDesc.innerText = kitty.breeds[0].description;
breedsSpan.innerText = 'Temperament: ';
breedsTemperament.innerText =kitty.breeds[0].temperament;

    fragment.appendChild(catInfo);

    catInfo.appendChild(image);
    catInfo.appendChild(boxText);
    boxText.appendChild(breedsHeader);
    boxText.appendChild(breedsDesc);
    boxText.append(breedsSpan);
    boxText.appendChild(breedsTemperament);



    const box = document.querySelector('.cat-info');
    if (!catInfo.hasChildNodes()) {
      box.appendChild(fragment);
    }else {
      box.replaceWith(fragment);
    };







}








function render_1(kitty) {
  let markup;
  const catInfo = document.querySelector('.cat-info');
  catInfo.setAttribute('Style', 'Display: inline-flex; ');

  console.log('node-1: ', catInfo.hasChildNodes());

  if (!catInfo.hasChildNodes()) {
    markup =`<img class="image" src=${kitty.url}  width="640", height="640"></img>`;
    catInfo.insertAdjacentHTML('beforeend', markup);
    markup = `<div class="box text" 'width: 550px; margin-left:20px'>
                      <h1 class="header">HEADER</h1>
                      <p class="description">description</p>
                      <p class="temperament"><strong>Temperament: </strong>temperament tekst</p>
                    </div>`
  }else {

    // boxText.remove();
    const image = document.querySelector('.image');
    image.src = `${kitty.url}`;
    // catInfo.insertAdjacentHTML('beforeend',
    markup = `<div class="temp" 'width: 550px; margin-left:20px'>
                      <h1 class="header">HEADER</h1>
                      <p class="description">description</p>
                      <p class="temperament"><strong>Temperament: </strong>temperament tekst</p>
                    </div>`

  // catInfo.replaceWith(boxText);
  }
const temp = document.querySelector('.temp');

  catInfo.insertAdjacentHTML('beforeend', markup);
  const temp_1 = document.querySelector('.temp');
  // document.renameNode(temp, null, "boxText");
  // boxText.remove();
  temp.replaceWith(temp_1);

  const fragment = document.createDocumentFragment();








    // const new_markup =`<img  class ="new image" src=${kitty.url}  width="640", height="640"></img>`
    // catInfo.insertAdjacentHTML('beforeend', new_markup);
    // const newImage = document.querySelector('.new image');
    // image.replaceWith(newImage);


console.log('node-2: ', catInfo.hasChildNodes());
  console.log('render',kitty);

}



function showImage(kitty) {


  const catInfo = document.querySelector('.cat-info');
  catInfo.setAttribute('Style', 'Display: inline-flex; ');

  // loaderMsg.setAttribute('Style', 'Display: none;');
  // errorMsg.setAttribute('Style', 'Display: none');


  if (image === undefined) {
    image = document.createElement("img");
    image.setAttribute('width', '640');
    image.setAttribute('height', '640');
    // catInfo. document.querySelector('cat-info');
    catInfo.appendChild(image);
      boxText = document.createElement("div");
      boxText.setAttribute('Style', 'width: 550px; margin-left:20px');
    breedsHeader = document.createElement("h1");
    breedsDesc = document.createElement("p");
    breedsTemperament = document.createElement("p");
    breedsTemperament.setAttribute('Style', 'Display: inline;');
    breedsSpan = document.createElement("strong");
    catInfo.appendChild(boxText);
    boxText.appendChild(breedsHeader);
    boxText.appendChild(breedsDesc);
    boxText.append(breedsSpan);
    boxText.appendChild(breedsTemperament);
  };

  image.src = kitty.url;

  if (image.style.visibility === "hidden") {
    image.style.visibility = "visible";
  };
  // image.hiden=false;
  breedsHeader.innerText = kitty.breeds[0].name;
  breedsDesc.innerText = kitty.breeds[0].description;
  breedsSpan.innerText = 'Temperament: ';
  breedsTemperament.innerText =kitty.breeds[0].temperament;
// }

// function clearImage() {
//   image.style.visibility = "hidden";
//   breedsHeader.innerHTML = '';
//   breedsDesc.innerHTML = '';
//   breedsTemperament.innerHTML = '';
//   breedsSpan.innerHTML = '';
}