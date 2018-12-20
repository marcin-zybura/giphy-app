const apiKey = "bK1AyekRNALJHvERutwtPCrOUqwHCGmW";
const apiUrl = "http://api.giphy.com/v1/gifs/search";
const searchValue = "";

// const row = `<div class="row"></div>`;
// const col = `<div class="col-sm"></div>`;

// fetch(`${apiUrl}?q=ryan+gosling&api_key=${apiKey}&limit=1`)
//   .then((response) => {
//     return response.json();
//   })
//   .then((myJson) => {
//     console.log(JSON.stringify(myJson));
//   });

const callApi = () => {
  fetch(`${apiUrl}?q=${getInputValue()}&api_key=${apiKey}&limit=3`)
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
  const gifImage = document.getElementsByClassName("gif-image");
  const columnsQuantity = 3;
  /**Zrobić tak, żeby przy osiągnięciu length większe niż wielokrotność 3 wstawiać nowy wiersz */
  // for (let el of myJson.data) {
  //   if (myJson.data.length ) {

  //   }
  // }
  const rowsNeeded = Math.ceil(myJson.data.length / columnsQuantity);
  const gifsContainer = document.querySelector(".gifs-container");
  // for (let el of myJson.data) {

  // }

  // for (let gif of gifImage) {
  //   gifImage.src = `${myJson.data[0].images.downsized_medium.url}`;
  // }

  for (let i = 0; i < rowsNeeded; i++) {
    const row = document.createElement("div");
    row.setAttribute("class", "row");
    console.log(row);
    gifsContainer.append(row);
    for (let i = 0; i < columnsQuantity; i++) {
      const cell = document.createElement("div");
      cell.setAttribute("class", "col-sm");
      console.log(cell);
      row.append(cell);
      const gifImage = document.createElement("img");
      gifImage.setAttribute("class", "gif-image");
      console.log(cell);
    }
  }

  [...gifImage].forEach((value, index) => {
    gifImage[index].src = `${myJson.data[index].images.downsized_medium.url}`;
    console.log(document.querySelectorAll("col-sm"));
    console.log(value);
    console.log(gifImage);
    console.log([...gifImage]);
  });
  

  myJson.data.forEach((el) => {
    console.log(el.images.downsized_medium.url);
    console.log(myJson.data.length);
  });
}

gifInput.addEventListener("keyup", keyUpApiCall);