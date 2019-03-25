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

        if(result == true) {       
           
            Model.playSound('../sounds/correct.mp3');
            showLetter(index);
        
        } else {
            
            Model.playSound('../sounds/wrong.mp3')
        
        }
    });
}

game_start();


