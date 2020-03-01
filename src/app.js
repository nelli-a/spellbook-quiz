document.addEventListener("DOMContentLoaded", function() {
  buttvar = document.querySelector("button.get-started")
  buttvar.addEventListener("click", function(){
    iv = document.querySelector(".introview")
    iv.classList.add("hidden")
    qv = document.querySelector(".questionview")
    qv.classList.remove("hidden")
  });
  buttvar2 = document.querySelectorAll("button.answer")
  var i;
  for (i = 0; i < buttvar2.length; i++) {
  selectAnswer = buttvar2[i];
  selectAnswer.addEventListener("click", function(){
    qv.classList.add("hidden")
    qv2 = document.querySelector(".questionview2")
    qv2.classList.remove("hidden")
    });
  };
  // Handler when the DOM is fully loaded.

});
function setHouse(backgroundHouse){
  var backgroundTag = document.querySelector(".background");
  backgroundTag.classList.add(backgroundHouse);
  //backgroundTag.classList.remove("background");
};
