//Set all onclick events for each button.
const setBtnEvents = () => {
   
    //Letter buttons.
    $('.letterBtns').click(function () {
        
        //Get clicked letter by user.
        const letter = $(this).attr('id');
        processLetterBtnEvent(letter);
    });

    //Sign up link on navbar.
    $('#signup').click(function() {
        clearModal('.signUpInputs');
        showModal('#signup_modal');
    });

    //Login link on navbar.
    $('#login').click(function() {
        clearModal('.loginInputs');
        showModal('#login_modal');
    });

    //Logout link on authenticated user navbar.
    $('#logoutLink').click(function() {
        processLogout();
    });

    //Submit button on Sign up modal.
    $('#signUpSubmitBtn').click(function() {
        processSignUp();
    });

    //Login button on Sign up modal.
    $('#loginSubmitBtn').click(function() {
        processLogin();
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

//Process when user tap a letter button.
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
            saveUserDataToStorage();
            
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
    const current = generateRandomNumber(questionArray.length);
    const curHint = questionArray[current].hint;
    const curAnswer = questionArray[current].answer;

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
            
            } else {
               
                changeViewOfButton('#signUpSubmitBtn', SUBMIT_SUCESS_TEXT);
                //Add user name to the account.()
                addNameToAccount(userInputs).then(function(username) {
                    displayUserNameOnNavBar(username);
                    displayUserNavBar();
                    hideModal('#signup_modal');
                });
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
        
        hideAlerts('.inputAlerts');

        //Try login.
        loginToAccount(userInputs).then(function (result) {
            let username;

            //Login success.
            if(result === true) {
                
                const user = firebase.auth().currentUser;
                
                if(user.displayName != null) {
                    
                    username = user.displayName;    
                   
                } else {
                    
                    username  = 'No Name';
                }
                
                displayUserNameOnNavBar(username);
                displayUserNavBar();
                changeViewOfButton('#loginSubmitBtn', LOGIN_TEXT);
                hideModal('#login_modal');
        
            //Login failed.
            } else {
                
                changeAlertMessage('#loginPasswordAlert', result); 
                changeViewOfButton('#loginSubmitBtn', SUBMIT_ERROR_TEXT);
            
            }
        })
    }
}

//Log out.
const processLogout = () => {
    logout();

    //Display normal nav bar.
    displayNavBar();

    //Set balloon on save button.
    setBalloon('#saveBtn', BALLOON_TEXT);

    //Disable functions belong to save button.
    $('#saveBtn').prop('onclick', null).off('click');
}

//Start Game.
const gameInit = () => {  
    questionArray = createDataObjArray(hints, answers, QUESTION_SIZE);
    const current = generateRandomNumber(questionArray.length);
    const curHint = questionArray[current].hint;
    const curAnswer = questionArray[current].answer;
    previousIndex = current;
    
    renderIndexViews(curHint, curAnswer);
    firebase.auth().onAuthStateChanged(function(user) {
       
        if (user) {

            if(user.displayName != null) {
                displayUserNameOnNavBar(user.displayName);
                displayUserNavBar();
            }

            hideBalloon('#saveBtn');
            $('#saveBtn').click(function() {
                saveUserDataToDatabase();
                showToast();
            });

        } else {
            displayNavBar();     
        }
    });

    lettersArray = splitWordIntoLetters(curAnswer);
    setBtnEvents(); 
}

const rankInit = () => {
    const user = getUserDataFromStorage();
    renderRankViews(user);
    $('#rank_summary').fadeIn();
    getUsersDataFromDatabase().then(function(usersArray) {
        
        createRankTable(usersArray);
        $('#tableField').fadeIn();
    
    }).catch(function(error) {
        
        console.log(error);
    
    });

    firebase.auth().onAuthStateChanged(function(user) {
       
        if (user) {

            if(user.displayName != null) {
                displayUserNameOnNavBar(user.displayName);
                displayUserNavBar();
            }

        } else {
            displayNavBar();     
        }
    });

    setBtnEvents(); 
}



