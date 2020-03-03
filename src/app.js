document.addEventListener("DOMContentLoaded", function() {
  houseButton = document.querySelector("button.houses");
  getStarted = document.querySelector("button.get-started");
  getStarted.addEventListener("click", function(){
    bgn = document.querySelector(".beginning");
    bgn.classList.add("hidden");
    qtn2 = document.querySelector(".questionview2");
    qtn2.classList.remove("hidden");
  });
})

  // Handler when the DOM is fully loaded.

function setHouse(backgroundHouse){
  var backgroundTag = document.querySelector(".background");
  backgroundTag.classList.add(backgroundHouse);
  hoPl = document.querySelector(".houseplace");
  hoPl.classList.add("hidden");
  bgn = document.querySelector(".beginning");
  bgn.classList.remove("hidden");
  //backgroundTag.classList.remove("background");
}

function randomNumber(arrayObj){
  var randomIndex = Math.round(Math.random()*(arrayObj.length-1));
  return randomIndex;
}
var questionLimit = 10;
var questions = [];

function createEffects(spellData){
  var effectAll = [];
  var e = 0;
  spellData.map(spellData => {
    var newEffect = spellData.effect;
    effectAll.push(newEffect);
  })
  return effectAll;
}
function createQuestions(spellData){
  var i = 0;
  while (i < questionLimit) {
    var rN = randomNumber(spellData);
    questions[i] = spellData[rN];
    i++;
    var wrongEffects = [];
    var n = 0;
    while (n <= 2) {
      rW = randomNumber(spellData);
      wrongEffects[n] = createEffects(spellData)[rW];
      n++;
    }
    console.log(wrongEffects);
//    while (n <= 2) {
//      rW = randomNumber(spellData);
//      var effectArray = [];
//      effectArray = spellData.effect;
//      console.log("My effect array:", effectArray);
//      if (rW !== rN) {
//        console.log("Yes");
//        n++;
//        }
//       else {
//        continue;
//      }
//      console.log(wrongEffect);
};
  console.log(questions);
};
fetch('https://www.potterapi.com/v1/spells?key=$2a$10$6eUG7nLXoZX8bCzCYKjSVORXej7pITLm8RSnSc41c2PoB7YaO9.GG')
.then(response => {
  return response.json();
})
.then(data => {
  console.log(data);
  var finalQuestions = createQuestions(data);
  var effects = createEffects(data);
})
