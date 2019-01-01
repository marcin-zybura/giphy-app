const apiKey = "bK1AyekRNALJHvERutwtPCrOUqwHCGmW";
const apiUrl = "http://api.giphy.com/v1/gifs/search";
let apiLimit = 24;
const searchValue = "";
const gifInput = document.getElementById("gifInput");
const gifsContainer = document.getElementById("gifs-container");
const giphyForm = document.getElementById("giphy-form");

const callApi = (apiTimeout = 100) => {
  const loader = document.getElementById("loader");
  if (loader.classList.contains("hidden")) {
    loader.classList.remove("hidden");
    gifsContainer.style.backgroundColor = "rgba(33, 33, 33, 0.5)";
  }
  setTimeout(() => {
    fetch(`${apiUrl}?q=${getInputValue()}&api_key=${apiKey}&limit=${apiLimit}`)
    .then((response) => {
      return response.json();
    })
    .then((myJson) => {
      loader.classList.add("hidden");
      gifsContainer.style.backgroundColor = "transparent";
      insertGif(myJson);
      return myJson;
    })
    .catch(err => console.log(err));
  }, apiTimeout);
}

const getInputValue = () => {
  return gifInput.value;
}

const removeGifImagesOnEmptyInput = () => {
  if (getInputValue() === '') {
    document.getElementsByClassName("gif-image").forEach((el) => {
      el.remove();
    });
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

// Calls API after timeout on keyup
const keyUpApiCall = debounce(() => {
  callApi(200);
}, 100);

const insertGif = (myJson) => {
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

// Call API on keyup (event listener)
gifInput.addEventListener("keyup", () => {
  keyUpApiCall();
  if (getInputValue() === '') {
    while (document.getElementsByClassName("gif-image").length > 0) {
      document.getElementsByClassName("gif-image")[0].parentNode.removeChild(document.getElementsByClassName("gif-image")[0]);
    }
  }
});

// Prevent form submit on ENTER
giphyForm.addEventListener("keydown", (e) => {
  if (e.keyCode == 13) {
    e.preventDefault();
    return false;
  }
});

  // Load more gifs when scroll to bottom
window.addEventListener("scroll", () => {
  if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
    apiLimit += 8;
    callApi(10);
  }
});