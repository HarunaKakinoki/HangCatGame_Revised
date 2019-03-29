
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

    $('#loginSubmitBtn').click(function() {
        processLogin();
    });

    $('#logOut').click(function() {
        processLogOut();
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
            
            playSound(CORRECT_AUDIO_FILE);
            showLetter(index);
            addScore();
            updateScore();
            
            if(isTrialEnd()) {
                setTimeout(function() {
                    createNextTrial();
                }, 500);
            }
        
        } else {
            
            playSound(CORRECT_AUDIO_FILE);
        
        }
       
    //When a wrong letter is tapped.
    } else {

        playSound(WRONG_AUDIO_FILE);
        countMistake();
        if(isGameOver()) {
           gameOver();
        }
        changeHangCatImg();
    
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
    quizArray = createDataObjArray(hints, answers, 5);
    const current = generateRandomNumber(quizArray.length);
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

    //Update score & trial 
    updateScore();
    updateTrial();
    
    //Create new hint & word.
    createNextTrial();

    //Set click events for each button.
    //setBtnEvents();
}

//Create new hint & word for next trial.
const createNextTrial = () => {
    const current = generateRandomNumber(quizArray.length);
    const curHint = quizArray[current].hint;
    const curAnswer = quizArray[current].answer;

    //Make a sound.
    playSound(NEXT_TRIAL_AUDIO_FILE);
    
    //Increment the number of trial & update trial 
    countTrial();
    updateTrial();
    
    //Remove hint & word form the last trial.
    removePreviousTrial();
    
    //Create a new hint & word.
    createHint(curHint);
    createWord(curAnswer);

    //Create a new array of answer letters & assign into variable.
    lettersArray = splitWordIntoLetters(curAnswer);
}

//Sign up.
const processSignUp = () => {
    const userInputs = getUserInputs('.signUpInputs');
    const validateResult = validateUserInput(userInputs);

    //When user inputs has some errors.
    if(validateResult.length != 0) {
        
        for(let i = 0; i < validateResult.length; ++i) {
            
            //Display alerts.
            const alertId = validateResult[i];
            showAlert(alertId);
        
        }
       
    } else {
        
        hideAlerts('.inputAlerts');

        //Try to create account.
        const result = createUserAccount(userInputs);
        result.then(function (value) {
    
            //When account creation failed.
            if(value != true) {

                changeAlertMessage('#emailAlert', value); /* Error message will be returned*/
                changeViewOfButton('#signUpSubmitBtn', SUBMIT_ERROR_TEXT);
                removeInputs('.signUpInputs');
            
            } else {
               
                //Add user name to the account.
                addNameToAccount(userInputs);
                changeViewOfButton('#signUpSubmitBtn', SUBMIT_SUCESS_TEXT);
                hideModal('#signup_modal');
                //location.reload();
            }   
          

        }).catch(function (error) {
            
            console.log(error);
          
        });
    } 
}

//Log in.
const processLogin = () => {
    const userInputs = getUserInputs('.loginInputs');
    const validateResult = validateUserInput(userInputs);

     //When user inputs has some errors.
     if(validateResult.length != 0) {
        
        for(let i = 0; i < validateResult.length; ++i) {
            
            const alertId = validateResult[i];
            showAlert(alertId);
        
        }
       
    } else {
        
        //Try login.
        loginToAccount(userInputs).then(function (result) {
            let username;

            //Login success.
            if(result === true) {
                
                const user = firebase.auth().currentUser;
                console.log(user) 
                if(user.displayName != null) {
                    
                    username = user.displayName;    
                   
                } else {
                    
                    username  = 'No Name';
                }
                
                displayUserNameOnNavBar(username);
                displayUserNavBar();
                hideModal('#login_modal');
        
            //Login failed.
            } else {
                
                changeAlertMessage('#loginPasswordAlert', result); 
                changeViewOfButton('#loginSubmitBtn', SUBMIT_ERROR_TEXT);
            
            }
        })
    }
}

const processLogOut = () => {
    logOut();
    displayNavBar();
}

gameStart();



