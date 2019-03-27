
//Set all onclick events for each button.
const setBtnEvents = () => {
   
    //Letter buttons.
    $('.letterBtns').click(function () {
        
        //Get clicked letter by user.
        const letter = $(this).attr('id');
        processLetterBtnEvent(letter);
    });

    $('#signUpSubmitBtn').click(function() {
        processSignUp();
    });

    //Yes Button on the restart modal.
    $('#yes').click(function() {

        if(gameOverFlag === true) {
            $('.letterBtns').click(function () {
                //Get clicked letter by user.
                const letter = $(this).attr('id');
                processLetterBtnEvent(letter);
            });        
        } 

        restartGame();
        hideModal('#restart_modal');

    });

    //Restart button on the gameover modal.
    $('#gameoverRestartBtn').click(function() {
        $('.letterBtns').click(function () {
        
            //Get clicked letter by user.
            const letter = $(this).attr('id');
            processLetterBtnEvent(letter);
        });
        
        restartGame();
        hideModal('#gameover_modal');
    });
}

const processLetterBtnEvent = (letter) => {
    //Search the letter from a word by calling function & 
    //get the return values.
    const search = searchWord(letter);
        
    //Values returned by searchWord() function.
    const result = search.result;
    const index = search.index;
    const repeat = search.repeat;

    //When a correct letter is tapped.
    if(result === true) {       
        
        //When the letter is not found yet.
        if(repeat === false) {
            
            Model.playSound(CORRECT_AUDIO_FILE);
            View.showLetter(index);
            Model.addScore();
            View.updateScore();
            
            if(isTrialEnd()) {
                setTimeout(function() {
                    createNextTrial();
                }, 500);
            }
        
        } else {
            
            Model.playSound(CORRECT_AUDIO_FILE);
        
        }
       
    //When a wrong letter is tapped.
    } else {

        Model.playSound(WRONG_AUDIO_FILE);
        Model.countMistake();
        if(isGameOver()) {
           gameOver();
        }
        View.changeHangCatImg();
    
    }
}

//Game over.
const gameOver = () => {
    //Fade out hang cat image.
    fadeOutHangCatImg();

    //Disable letter buttons.
    $('.letterBtns').off('click');
    
    //Show gameover modal.
    showModal('#gameover_modal');

    //Set flag.
    setGameOverFlag();

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
    removeFadeOutOfHangCatImg(); /*Make it visible*/

    //Update score & trial View.
    updateScore();
    updateTrial();
    
    //Create new hint & word.
    createNextTrial();

    //Set click events for each button.
    //setBtnEvents();
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
    updateTrial();
    
    //Remove hint & word form the last trial.
    removePreviousTrial();
    
    //Create a new hint & word.
    View.createHint(curHint);
    View.createWord(curAnswer);

    //Create a new array of answer letters & assign into variable.
    lettersArray = splitWordIntoLetters(curAnswer);
}

const processSignUp = () => {
    const userInputs = getUserInputs('.signUpInputs');
    const validateResult = validateUserInput(userInputs);

    //When user inputs has some errors.
    if(validateResult.length != 0) {
        
        for(let i = 0; i < validateResult.length; ++i) {
            
            const alertId = validateResult[i];
            showAlert(alertId);
        
        }
       
    } else {
        
        //When account creation was not sucessful.
        if(createUserAccount(userInputs) === false) {
            
            changeViewOfButton('#signUpSubmitBtn', SUBMIT_ERROR_TEXT);
        
        } else {
            
            hideModal('#signup_modal');
            location.reload();
        
        }

    } 
    
}

gameStart();



