const apiKey = "bK1AyekRNALJHvERutwtPCrOUqwHCGmW";
const apiUrl = "http://api.giphy.com/v1/gifs/search";
const searchValue = "";

// fetch(`${apiUrl}?q=ryan+gosling&api_key=${apiKey}&limit=1`)
//   .then((response) => {
//     return response.json();
//   })
//   .then((myJson) => {
//     console.log(JSON.stringify(myJson));
//   });

const callApi = () => {
  fetch(`${apiUrl}?q=${getInputValue()}&api_key=${apiKey}&limit=5`)
  .then((response) => {
    return response.json();
  })
  .then((myJson) => {
    console.log(JSON.stringify(myJson));
    insertGif(myJson);
    return myJson;
  });
}

const getInputValue = () => {
  return gifInput.value;
}

const debounce = (func, wait, immediate) => {
  var timeout;
  
  return function executedFunction() {
    var context = this;
    var args = arguments;
    
    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };

    var callNow = immediate && !timeout;
    
    clearTimeout(timeout);
    
    timeout = setTimeout(later, wait);
    
    if (callNow) func.apply(context, args);
  };
};

const keyUpApiCall = debounce(function() {
  const gifInput = document.getElementById("gifInput");
  callApi();
}, 300);

const insertGif = (myJson) => {
  const gifImage = document.querySelector(".gif-image");
  gifImage.src = `${myJson.data[0].images.downsized_medium.url}`;
  console.log(myJson);
  const columnsQuantity = 3;
  /**Zrobić tak, żeby przy osiągnięciu length większe niż wielokrotność 3 wstawiać nowy wiersz */
  // for (i = 0; i < myJson.data.length) {

  // }

  myJson.data.forEach((el) => {
    console.log(el.images.downsized_medium.url);
    console.log(myJson.data.length);
  });
}

const row = `<div class="row"></div>`;
const col = `<div class="col-sm"></div>`;

gifInput.addEventListener("keyup", keyUpApiCall);