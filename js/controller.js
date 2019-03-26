const NEXT_TRIAL_AUDIO_FILE = '../sounds/moveToNext.mp3';

//Set all onclick events for each button.
const setBtnEvents = () => {
   

    //Letter buttons.
    $('.letterBtns').click(function () {
        
        //Get clicked letter by user.
        const letter = $(this).attr('id');
        const search = searchWord(letter);
        const result = search.result;
        const index = search.index;
        const repeat = search.repeat;

        //When letter is found.
        if(result === true) {       
            
            //
            if(repeat === false) {
                Model.playSound('../sounds/correct.mp3');
                View.showLetter(index);
                Model.addScore();
                View.updateScore();
            } else {
                Model.playSound('../sounds/correct.mp3');
            }
           
        
        } else {
            
            Model.playSound('../sounds/wrong.mp3');
            Model.countMistake();
            View.changeHangCatImg();
        }
    });

    //Yes Button on the restart modal.
    $('#yes').click(function() {
        restartGame();
        hideModal('#restart_modal');
    });

    //Restart 
    $('#gameoverRestartBtn').click(function() {
        restartGame();
        hideModal('#gameover_modal');
    });
}

//Start Game.
const gameStart = () => {  
    quizArray = Model.createDataObjArray(hints, answers, 5);
    const current = Model.generateRandomNumber(quizArray.length);
    const curHint = quizArray[current].hint;
    const curAnswer = quizArray[current].answer;
    
    renderViews(curHint, curAnswer);
    lettersArray = splitWordIntoLetters(curAnswer);
    setBtnEvents();
    
}

//Restart Game.
const restartGame = () => {
    
    //Initialize score, trial, hangcat image.
    resetData();
    changeHangCatImg();

    //Update score & trial View.
    updateScore();
    updateTrial();
    
    //Create new hint & word.
    createNextTrial();
}

//Create new hint & word for next trial.
const createNextTrial = () => {
    const current = Model.generateRandomNumber(quizArray.length);
    const curHint = quizArray[current].hint;
    const curAnswer = quizArray[current].answer;

    //Make a sound.
    Model.playSound(NEXT_TRIAL_AUDIO_FILE);
    
    //Increment the number of trial & update trial view.
    countTrial();
    updateScore();
    
    //Remove hint & word form the last trial.
    removePreviousTrial();
    
    //Create a new hint & word.
    View.createHint(curHint);
    View.createWord(curAnswer);

    //Create a new array of answer letters & assign into variable.
    lettersArray = splitWordIntoLetters(curAnswer);
}

gameStart();



