document.addEventListener("DOMContentLoaded", function() {
  houseButton = document.querySelector("button.houses");
  getStarted = document.querySelector("button.get-started");
  getStarted.addEventListener("click", function(){
    bgn = document.querySelector(".beginning");
    bgn.classList.add("hidden");
    qtn2 = document.querySelector(".questionview2");
    qtn2.classList.remove("hidden");
  });
});

  // Handler when the DOM is fully loaded.

function setHouse(backgroundHouse){
  var backgroundTag = document.querySelector(".background");
  backgroundTag.classList.add(backgroundHouse);
  hoPl = document.querySelector(".houseplace");
  hoPl.classList.add("hidden");
  bgn = document.querySelector(".beginning");
  bgn.classList.remove("hidden");
  //backgroundTag.classList.remove("background");
};
