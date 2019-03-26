const NEXT_TRIAL_AUDIO_FILE = '../sounds/moveToNext.mp3';

const render_views = (current_hint, current_question) => {
    View.showAppName();
    View.createNavBar();
    View.createPlayData();
    View.createHangImg();
    View.createRestartBtn();
    View.createHint(current_hint);
    View.createWord(current_question);
    View.createLetters();
    View.createSaveBtn();
    View.createSignUpModal();
    View.createLoginModal();
    View.createRestartModal();
    View.createGameOverModal();
} 

const game_start = () => {  
    quizArray = Model.createDataObjArray(hints, answers, 5);
    const current = Model.generateRandomNumber(quizArray.length);
    const curHint = quizArray[current].hint;
    const curAnswer = quizArray[current].answer;
    
    render_views(curHint, curAnswer);
    lettersArray = splitWordIntoLetters(curAnswer);
    setLetterBtnEvents();
    
}

const setLetterBtnEvents = () => {
    //When each letter button is clicked.
    $('.letterBtns').click(function () {
        
        //Get clicked letter by user.
        const letter = $(this).attr('id');
        const search = searchWord(letter);
        const result = search.result;
        const index = search.index;

        if(result === true) {       
           
            Model.playSound('../sounds/correct.mp3');
            View.showLetter(index);
            Model.addScore();
            View.updateScore();
        
        } else {
            
            Model.playSound('../sounds/wrong.mp3');
            Model.countMistake();
            View.changeHangCatImg();
        }
    });

    $('#yes').click(function() {
        restartGame();
        hideModal('#restart_modal');
    });

    $('#gameoverRestartBtn').click(function() {
        restartGame();
        hideModal('#gameover_modal');
    });
}

const restartGame = () => {
    resetData();
    updateScore();
    updateTrial();
    changeHangCatImg();
    startNextTrial();
}

const startNextTrial= () => {
    const current = Model.generateRandomNumber(quizArray.length);
    const curHint = quizArray[current].hint;
    const curAnswer = quizArray[current].answer;

    Model.playSound(NEXT_TRIAL_AUDIO_FILE);
    countTrial();
    
    //Remove Previously 
    removePreviousHintAndWord();
    
    //Create a new hint & word.
    View.createHint(curHint);
    View.createWord(curAnswer);

    //Create a new array of answer letters & assign into variable.
    lettersArray = splitWordIntoLetters(curAnswer);
}


game_start();
restartGame();


