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
function createQuestions(spellData){
  var i = 0;
  while (i <= 9) {
    var rN = randomNumber(spellData);
    questions[i] = spellData[rN];
    i++;
    //while (n <=3 )
        //rW = randomNumber(spellData);
        //if (rW !== rN)
  };
  //create 3 wrong effects, it already has the correct effect
  console.log(questions);
//[
 //{
//   questionText: 'Unlocks door',
//   wrongAnswers: ['spell1', 'spell2', 'spell3']
//   correctAnswer: 'spell4'
// }
//]
}
fetch('https://www.potterapi.com/v1/spells?key=$2a$10$6eUG7nLXoZX8bCzCYKjSVORXej7pITLm8RSnSc41c2PoB7YaO9.GG')
.then(response => {
  return response.json();
})
.then(data => {
  console.log(data);
  var finalQuestions = createQuestions(data);
})
