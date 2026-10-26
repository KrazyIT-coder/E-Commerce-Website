// Find all the cards on the page
var cards = document.querySelectorAll(".card");

// Do the same thing for every card
cards.forEach(function (card) {

  var photoBox = card.querySelector(".photo");
  var photos = card.dataset.photos.split(",").map(function (p) {
    return p.trim();
  });
  var leftArrow = card.querySelector(".left");
  var rightArrow = card.querySelector(".right");
  var colorButtons = card.querySelectorAll(".color");

  // Which photo are we showing? 0 = the first one
  var current = 0;

  // Show the current photo, and highlight its color button
  function showPhoto() {
    photoBox.style.backgroundImage = 'url("' + photos[current] + '")';

    colorButtons.forEach(function (button, index) {
      var isActive = index === current;
      button.classList.toggle("active", isActive);
      if (isActive) {
        card.style.background = button.dataset.cardColor;
      }
    });
  }

  // Right arrow: go to the next photo
  rightArrow.onclick = function () {
    current = current + 1;
    if (current >= photos.length) {
      current = 0;
    }
    showPhoto();
  };

  // Left arrow: go to the previous photo
  leftArrow.onclick = function () {
    current = current - 1;
    if (current < 0) {
      current = photos.length - 1;
    }
    showPhoto();
  };

  // Color buttons: the 1st button shows photo 1, the 2nd shows photo 2
  colorButtons.forEach(function (button, index) {
    button.onclick = function () {
      current = index;
      showPhoto();
    };
  });

  showPhoto();
});
