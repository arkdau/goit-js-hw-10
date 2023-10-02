import {fetchBreeds} from "./cat-api.js";
import {fetchCatByBreed} from "./cat-api.js";

let storedBreeds = []
let kitty;
let image;
let breedId;
let breedsHeader;
let breedsDesc;
let breedsTemperament;
let breedsSpan;







const  catInfo = document.querySelector('.cat-info');
const breadSelect = document.querySelector('.breed-select');
const loaderMsg = document.querySelector('.loader');
const errorMsg =  document.querySelector('.error') ;

loaderMsg.innerHTML = 'Loading data, please wait...';
errorMsg.innerHTML = '';

fetchBreeds()
    .then((response) => {
        loaderMsg.innerHTML = '';
        // return response.json();
        return response.data;
    })
    .then((data) => {

      //filter to only include those with an `image` object
      data = data.filter(img=> img.image?.url!=null)

      storedBreeds = data;

      for (let i = 0; i < storedBreeds.length; i++) {
        const breed = storedBreeds[i];
        let option = document.createElement('option');

        //skip any breeds that don't have an image
        if(!breed.image)continue

        //use the current array index
        option.value = i;
        option.innerHTML = `${breed.name}`;
        document.querySelector('.breed-select').appendChild(option);
      }
    })
    .catch((error) => {
       loaderMsg.innerHTML = '';
       errorMsg.innerHTML = 'Oops! Something went wrong! Try reloading the page!';
       console.log('fetch Breeds: ',error);
    });

breadSelect.addEventListener('change', function handleChange() {
  breedId = storedBreeds[breadSelect.selectedIndex].id;
  if (image !== undefined) {
    clearImage();
    loaderMsg.innerHTML = 'Loading data, please wait...';
    errorMsg.innerHTML = '';
  };

  fetchCatByBreed(breedId)
     .then((response) => {
         loaderMsg.innerHTML = '';
         // return response.json();
         return response.data;
     })
     .then((data) => {
       kitty = data[0];
       showImage(kitty);
     })
     .catch((error) => {
        // clearImage();
        loaderMsg.innerHTML = '';
        errorMsg.innerHTML = 'Oops! Something went wrong! Try reloading the page!';
     });
});


function showImage(kitty) {
  loaderMsg.innerHTML = '';
  errorMsg.innerHTML = '';
  catInfo.setAttribute('Style', 'Display: inline-flex');

if (image === undefined) {
  image = document.createElement("img");
  image.setAttribute('width', '640');
  image.setAttribute('height', '640');
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
}
    if (image.style.visibility === "hidden") {
      image.style.visibility = "visible";
    };
  // image.hiden=false;
  image.src = kitty.url;
  breedsHeader.innerText = kitty.breeds[0].name;
  breedsDesc.innerText = kitty.breeds[0].description;
  breedsSpan.innerText = 'Temperament: ';
  breedsTemperament.innerText =kitty.breeds[0].temperament;
}

function clearImage() {

  // image.style.visibility = (image.style.visibility === "hidden") ? '' : "hidden";
image.style.visibility = "hidden"
breedsHeader.innerHTML = '' ;
breedsDesc.innerHTML = '';
breedsTemperament.innerHTML = '';
breedsSpan.innerHTML = '';
}