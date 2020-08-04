$( document ).ready(function() {
  //Global Variables
  var fullData = [];
  var finalTest = [];
  var housePlacement; //the house the user is in
  var questionLimit = 10; //the number of questions for the quiz
  var questionNumber = 0;
  var chosenOption = [];
  window.questionView = $('#questions');

  houseButton = document.querySelector("button.houses");
  getStarted = document.querySelector("button.get-started");
  qzQuestions = document.querySelector(".quizQuestions");
  getStarted.addEventListener("click", function(){
    bgn = document.querySelector(".beginning");
    bgn.classList.add("hidden");
    qzQuestions.classList.remove("hidden");
  });

  callTheAPI()
  .then(response => {
    return response.json();
  })
  .then(data => {
    finalTest = createQuestions(data);
    nextQuestion();

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
  window.setHouse = function setHouse(backgroundHouse){
    var backgroundTag = document.querySelector(".background");
    backgroundTag.classList.add(backgroundHouse);
    hoPl = document.querySelector(".houseplace");
    hoPl.classList.add("hidden");
    bgn = document.querySelector(".beginning");
    bgn.classList.remove("hidden");
    //the if-else statement stored the house name based on the one chosen
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
  function randomNumber(arrayObjLength){
    var randomIndex = Math.round(Math.random()*(arrayObjLength-1));
    return randomIndex;
  }

  /*
  This function will produce an array of random numbers and makes sure that none of them repeat
  arrayLength is an integer that shows how many random numbers are needed
  randomNumberLength is an integer that shows the maximum integer for the choice of randomNumbers
  notEqual is an optional integer that is checked it makes sure that array doesn't have values as
  the not Equal integer
  */

  function randomArray (arrayLength, randomNumberLength, notEqual) {
    var randomArray = [];
    randomArray[0] = randomNumber(randomNumberLength);
    var i = 1;
    while (i < arrayLength) {
      var newIndex = randomNumber(randomNumberLength);
      var y = 0;
      while (y < randomArray.length) {
        /*needs an y++*/
        console.log("y is " + y + "; i is " + i);
        console.log(randomArray[0]);
        if (newIndex == randomArray[i-y]){
          console.log("The new index equalled some array num")
          newIndex = randomNumber(randomNumberLength);
          y = 1;
          continue;
        }
        else if (newIndex == notEqual) {
          console.log("new index equalled the correct index")
          newIndex = randomNumber(randomNumberLength);
          y=1;
        }
        else{
          randomArray[i] = newIndex;
          i++;
        }
      }
    }
    return randomArray;
  }


  /*
  allEffects is a function that creates an array with all the effects
  It is used to create randomised wrong effects in createQuestions function
  spellData is the data set that is passed to the function (PotterAPI)
  allEffects is an array with all the effects
  */
  function allEffects(spellData){
    var allEffects = [];
    var e = 0;
    spellData.map(spellData => {
      var newEffect = spellData.effect;
      allEffects.push(newEffect);
    })
    return allEffects;
  }

  /*
  createQuestions is designed to create the final data set of arrays, each has a spell, effects (3 wrong
  and 1 right), the index of the correct answer, the type, etc. It is based on the question limit provided.
  spellData is the API given
  finalQuestion is the final sorted data set that will be used for the quiz
  */
  function createQuestions(spellData){
    fullData = spellData;
    var finalQuestion = [];
    var questions = [];
    var questionRandoms = randomArray(questionLimit, spellData.length);
    console.log(questionRandoms);
    var i = 0;
    while (i < questionLimit) {
      newQuestionIndex = questionRandoms[i];
      questions[i] = spellData[newQuestionIndex];
      var effectRandoms = randomArray(3, spellData.length, newQuestionIndex);
      var effects = [];
      var n = 0;
      //Create an array of wrong effects
      while (n <= 2) {
        newEffectIndex = effectRandoms[n];
        effects[n] = allEffects(spellData)[newEffectIndex];
        n++;
      }
      //Adding the correct effect to the wrong effects
      var correctAnswerIndex = randomNumber(effects.length)+1;
      effects.splice(correctAnswerIndex,0,allEffects(spellData)[newQuestionIndex]);
      effectsObj = {
        effects: effects
      };
      correctAnswer = {
        correct_answer: correctAnswerIndex
      };
      var fullQuestion = {...questions[i], ...effectsObj, ...correctAnswer};
      finalQuestion[i] = fullQuestion;
      i++;
    };
    return finalQuestion;
  }

  function questionElement(questionCount){
    var qstnView = $('<div>', {id: 'questionId'});
    var qstn = $('<h1 class = "hp title">').append(finalTest[questionCount].spell);
    qstnView.append(qstn);
    var buttonAnswers = displayAnswers(questionCount);
    qstnView.append(buttonAnswers);
    return qstnView;
  }

  function displayAnswers(questionCount){
    var buttons = $('<div>');
    for (var i = 0; i < finalTest[questionCount].effects.length; i++){
      var insideButton = '<button data-id = ' + i + ' class = "answer">'
      var buttonInput = $(insideButton).append(finalTest[questionCount].effects[i]);
      buttons.append(buttonInput);
    }

    return buttons;
  }

  function nextQuestion(){
    $('#questionId').remove();
    if(questionNumber < finalTest.length) {
      window.nextQstn = questionElement(questionNumber);
      questionView.append(nextQstn);
      window.answerButton = document.querySelectorAll("button.answer");
      for (var y = 0; y<4; y++){
        answerButton[y].addEventListener("click", function(event){
          chosenOption[questionNumber] = finalTest[questionNumber].correct_answer==event.target.dataset.id;
          questionNumber++;
          delete(answerButton);
          nextQuestion();
      });
      }
    }
    else{
      finalDisplay();
    }
  }

  function finalDisplay(){
    var theFinalSay = $('<div>');
    var rightAnswers = chosenOption.filter(Boolean).length;
    var finalWords = $('<h1 class="hp title">');
    finalWords.append(rightAnswers + " points to " + housePlacement);
    theFinalSay.append(finalWords);
    var finalTestScore = $('<h2>');
    finalTestScore.append("You final score is " + rightAnswers + "/10");
    if (rightAnswers <= 5) {
      finalTestScore.append('<br>' + "How disappointing");
    }
    else if (rightAnswers < 8) {
      finalTestScore.append('<br>' + "Not bad, not bad at all");
    }
    else if (rightAnswers < 10) {
      finalTestScore.append('<br>' + "You are leading" + housePlacement + "towards victory");
    }
    else {
      finalTestScore.append('<br>' + "You'd make your housemates proud!");
    }
    theFinalSay.append(finalTestScore);
    questionView.append(theFinalSay);
  }

})
