const apiKey = "bK1AyekRNALJHvERutwtPCrOUqwHCGmW";
const apiUrl = "http://api.giphy.com/v1/gifs/search";
let apiLimit = 24;
const searchValue = "";
const gifInput = document.getElementById("gifInput");
const gifsContainer = document.querySelector(".gifs-container");
const giphyForm = document.getElementById("giphy-form");

const callApi = () => {
  // clearGifs();
  const loader = document.getElementById("loader");
  if (loader.classList.contains("hidden")) {
    loader.classList.remove("hidden");
  }
  // loader.setAttribute("class", "loader");
  // gifsContainer.appendChild(loader);
  setTimeout(() => {
    fetch(`${apiUrl}?q=${getInputValue()}&api_key=${apiKey}&limit=${apiLimit}`)
    .then((response) => {
      // gifsContainer.removeChild(loader);
      return response.json();
    })
    .then((myJson) => {
      loader.classList.add("hidden");
      insertGif(myJson);
      return myJson;
    })
    .catch(err => console.log(err));
  }, 1000);
  
  // fetch(`${apiUrl}?q=${getInputValue()}&api_key=${apiKey}&limit=${apiLimit}`)
  // .then((response) => {
  //   // gifsContainer.removeChild(loader);
  //   return response.json();
  // })
  // .then((myJson) => {
  //   loader.classList.add("hidden");
  //   insertGif(myJson);
  //   return myJson;
  // })
  // .catch(err => console.log(err));
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
    gifsContainer.appendChild(row);

    for (let i = 0; i < columnsQuantity; i++) {
      const cell = document.createElement("div");
      cell.setAttribute("class", "col-sm column__cell");
      row.appendChild(cell);
      const gifImage = document.createElement("img");
      gifImage.setAttribute("class", "gif-image");
      cell.appendChild(gifImage);
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
  // console.log(document.getElementById("loader"));
  callApi();
}, 200);

const insertGif = (myJson) => {
  const columnsQuantity = 4;
  const rowsNeeded = Math.ceil(myJson.data.length / columnsQuantity);

  // addRows(rowsNeeded, columnsQuantity);
  for (let i = 0; i < myJson.data.length; i++) {
    const gifImage = document.createElement("img");
    gifImage.setAttribute("class", "gif-image");
    gifsContainer.appendChild(gifImage);
  }

  const gifImage = document.getElementsByClassName("gif-image");

  [...gifImage].forEach((value, index) => {
    gifImage[index].src = `${myJson.data[index].images.fixed_height_downsampled.webp}`;
    gifImage[index].alt = `${myJson.data[index].title}`;
  });
}

gifInput.addEventListener("keyup", keyUpApiCall);
giphyForm.addEventListener("keydown", (e) => {
  if (e.keyCode == 13) {
    e.preventDefault();
    return false;
  }
});

window.addEventListener("scroll", () => {
  if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
    apiLimit += 4;
    callApi();
  }
});