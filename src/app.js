//Global Variables
var spellQuestion = [];
var effectAnswers = [];
var finalTest;
var housePlacement; //the house the user is in
var questionLimit = 10; //the number of questions for the quiz
var questions = [];

//Script
document.addEventListener("DOMContentLoaded", function() {
  houseButton = document.querySelector("button.houses");
  getStarted = document.querySelector("button.get-started");
  getStarted.addEventListener("click", function(){
    bgn = document.querySelector(".beginning");
    bgn.classList.add("hidden");
    qtn2 = document.querySelector(".questionview");
    qtn2.classList.remove("hidden");
  });

  callTheAPI()
  .then(response => {
    return response.json();
  })
  .then(data => {
    finalTest = createQuestions(data);
    console.log(finalTest);
    var l = 0;
    while (l < 10) {
      console.log(finalTest[l].spell);
      spellQuestion.push(finalTest[l].spell);
      console.log(finalTest[l].effect);
      effectAnswers.push(finalTest[l].wrong_effects);
      effectAnswers.push(finalTest[l].effect);
      document.getElementById('answer1').innerHTML = effectAnswers[1];
      l++;
    }
    console.log(effectAnswers);
    var qstnNumber = 0;
    document.getElementById('questionLabel').innerHTML = finalTest[3].spell;
  })
})

function callTheAPI() {
  return fetch('https://www.potterapi.com/v1/spells?key=$2a$10$6eUG7nLXoZX8bCzCYKjSVORXej7pITLm8RSnSc41c2PoB7YaO9.GG');
}

/*
The function sets the background of the webpage based on the house the user chooses
It then stores the value that was chosen in a global variable
backgroundHouse is a CSS function that sets the background
hoPl  is the var for the HTML houseplace View
bgn is the var for the HTML beginning View
*/
function setHouse(backgroundHouse){
  var backgroundTag = document.querySelector(".background");
  backgroundTag.classList.add(backgroundHouse);
  hoPl = document.querySelector(".houseplace");
  hoPl.classList.add("hidden");
  bgn = document.querySelector(".beginning");
  bgn.classList.remove("hidden");
  if (backgroundHouse == 'background-gryffindor'){
    housePlacement = "Gryffindor";
  }
  else if (backgroundHouse == 'background-slytherin') {
    housePlacement = "Slytherin";
  }
  else if (backgroundHouse == 'background-ravenclaw') {
    housePlacement = "Ravenclaw";
  }
  else if (backgroundHouse == 'background-hufflepuff') {
    housePlacement = "Hufflepuff";
  }
  //console.log(housePlacement);
}

/*
Generates a random number within an object
arrayObj is the object passed to the function
randomIndex is the random integer generated
*/
function randomNumber(arrayObj){
  var randomIndex = Math.round(Math.random()*(arrayObj.length-1));
  return randomIndex;
}


/*
createEffects is a function that creates an array with all the effects
It is used to create randomised wrong effects in createQuestions function
spellData is the data set that is passed to the function (PotterAPI)
allEffects is an array with all the effects
*/
function createEffects(spellData){
  var allEffects = [];
  var e = 0;
  spellData.map(spellData => {
    var newEffect = spellData.effect;
    allEffects.push(newEffect);
  })
  return allEffects;
}

//creates an array with all the questions, effects and wrong effects
function createQuestions(spellData){
  var finalQuestion = {};
  var i = 0;
  while (i < questionLimit) {
    var rN = randomNumber(spellData);
    questions[i] = spellData[rN];
    var wrongEffects = [];
    var n = 0;
    while (n <= 2) {
      rW = randomNumber(spellData);
      wrongEffects[n] = createEffects(spellData)[rW];
      n++;
    }
    effectsObj = {
      wrong_effects: wrongEffects
    };
    var fullQuestion = {...questions[i], ...effectsObj};
    finalQuestion[i] = fullQuestion;
    i++;
  };
  return finalQuestion;
}
