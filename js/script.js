const hourHand = document.querySelector("#hour");
const minuteHand = document.querySelector("#minute");
const secondHand = document.querySelector("#second");
const number = document.querySelectorAll(".clock-wrapper .number");
const month = document.querySelector(".month");
const day = document.querySelector(".day");
const year = document.querySelector(".year");
const backgroundImage = document.querySelector(".container");

const imageCanvas = document.querySelector(".background-img");

{
  // set canvas dpi
  let dpi = window.devicePixelRatio;
  let style_height = +getComputedStyle(imageCanvas)
    .getPropertyValue("height")
    .slice(0, -2);
  //get CSS width
  let style_width = +getComputedStyle(imageCanvas)
    .getPropertyValue("width")
    .slice(0, -2);
  //scale the canvas
  imageCanvas.setAttribute("height", style_height * dpi);
  imageCanvas.setAttribute("width", style_width * dpi);
}

const clock = new Clock();
window.onload = clock.start();

// const setBackgroundImage = () => {
//   const setImg = () => {
//     backgroundImage.attr.src = "https://source.unsplash.com/random/";
//   };
//   setInterval(() => setImg(), 1000);
// };

// setBackgroundImage();

// control the auto refresh rate -> 1000 = 1 second
var refreshRate = 5000; // 10 seconds

let refreshFunc = function () {
  //backgroundImage.style.backgroundImage =
  //  "url(https://source.unsplash.com/random/)";

  // window.location.reload();

  // create new image object every iteration to force url reload
  //testImage.src = "https://source.unsplash.com/random/#" + new Date().getTime();

  let imageObject = new Image();
  imageObject.onload = () => {
    // draw to canvas
    let canvasContext = imageCanvas.getContext("2d");
    canvasContext.drawImage(
      imageObject,
      0,
      0,
      imageCanvas.width,
      imageCanvas.height
    );
  };

  imageObject.src =
    "https://source.unsplash.com/random/1920x1080/#" + new Date().getTime();
};

refreshFunc();

// Automatically reload the browser
setInterval(refreshFunc, refreshRate);

// Hide the images on load
// backgroundImage.style.display = "none";

// Get a random image from Unsplash and fade it in on load
//backgroundImage.style.backgroundImage =
//  "url(https://source.unsplash.com/random/)";
