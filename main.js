const apiKey = "bK1AyekRNALJHvERutwtPCrOUqwHCGmW";
const apiUrl = "http://api.giphy.com/v1/gifs/search";
const apiLimit = 15;
const searchValue = "";
const gifInput = document.getElementById("gifInput");
const gifsContainer = document.querySelector(".gifs-container");

const callApi = () => {
  clearGifs();
  fetch(`${apiUrl}?q=${getInputValue()}&api_key=${apiKey}&limit=${apiLimit}`)
  .then((response) => {
    return response.json();
  })
  .then((myJson) => {
    insertGif(myJson);
    return myJson;
  })
  .catch(err => console.log(err));
}

const getInputValue = () => {
  return gifInput.value;
}

const clearGifs = () => {
  gifsContainer.innerHTML = "";
}

const addRows = (rowsNeeded, columnsQuantity) => {
  // const gifsContainer = document.querySelector(".gifs-container");
  for (let i = 0; i < rowsNeeded; i++) {
    const row = document.createElement("div");
    row.setAttribute("class", "row");
    gifsContainer.append(row);

    for (let i = 0; i < columnsQuantity; i++) {
      const cell = document.createElement("div");
      cell.setAttribute("class", "col-sm");
      row.append(cell);
      const gifImage = document.createElement("img");
      gifImage.setAttribute("class", "gif-image");
      cell.append(gifImage);
    }
  }
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

const keyUpApiCall = debounce(() => {
  // clearGifs();
  callApi();
}, 300);

const insertGif = (myJson) => {
  const columnsQuantity = 4;
  const rowsNeeded = Math.ceil(myJson.data.length / columnsQuantity);

  addRows(rowsNeeded, columnsQuantity);

  const gifImage = document.getElementsByClassName("gif-image");

  [...gifImage].forEach((value, index) => {
    gifImage[index].src = `${myJson.data[index].images.original.url}`;
    gifImage[index].alt = `${myJson.data[index].title}`;
  });
}

// gifInput.addEventListener("keydown", keyUpApiCall);
gifInput.addEventListener("keyup", keyUpApiCall);
// gifInput.addEventListener("keyup", (e) => {
//   if (e.which == 8) {

//   }
// });