
const appName = () => {
    const appName = $('<a/>').attr({
        href : 'index.html',
        id : 'appName'
    }).html(APP_NAME);
    $('#appName_container').append(appName);
}

const navBar = () => {
    //Navbar links.
    const signup = $('<a/>')
    . attr({
        class : 'navLinks',
        href : '#',
        'data-toggle': 'modal',
        'data-target': '#signup_modal' /*Trigger signup modal window*/
    })
    .text(SIGNUP_TEXT);

    const login = $('<a/>')
    . attr({
        class : 'navLinks',
        href : '#',
        'data-toggle': 'modal',
        'data-target': '#login_modal' /*Trigger login modal window*/
    })
    .text(LOGIN_TEXT);

    const ranking = $('<a/>')
    .attr({
        class : 'navLinks',
        href : 'rank.html'
    })
    .text('Ranking');

    $('#navbar').append(signup, login, ranking);
}

const playData = () => {
    const scoreHeader = $('<span/>').attr('class', 'playdataHeaders')
                        .text(SCORE_TEXT); 
    const userScore = $('<span/>').attr('id', 'score')
                    .text(score);

    const trialHeader = $('<span/>').attr('class', 'playdataHeaders')
                        .text(TRIAL_TEXT);
    const numOfTrial = $('<span/>').attr('id', 'trial')
                    .text(trial);
    
    $('#playdata').append(scoreHeader, userScore,  trialHeader, numOfTrial);
}

const hangCatImg = () => {
    const $div = $('<div/>').attr({
        class : '',
        id : 'hangCatImg_container'
    });

    const img = $('<img/>').attr({
        src : 'images/hangCat/hanged0.png',
        alt : 'hang-cat-image',
        id : 'hangCatImg'
    });

    $($div).append(img);
    $('#img_container').append($div);
}

const restartBtn = () => {
    const btn = $('<button/>')
    .attr({
        class : 'btn btn-danger buttons',
        id : 'restartBtn',
        'data-toggle': 'modal',
        'data-target': '#restart_modal' /*Trigger restart confirmation modal window*/
    }).text(RESTART_BTN);

    $('#buttons_container').append(btn);
}

const hint = (current_hint) => {
    const $div = $('<div/>')
    .attr({
        id : 'hint'
    }).text(current_hint);

    $('#hint_container').append($div);
}

const word = (current_word) => {
    const $div = $('<div/>').attr({
        class : 'col-12',
        id : 'curWordField'
    });

    for(let i = 0; i < current_word.length; ++i) {
        const $p = $('<p/>').attr({
            class : 'answerLetterContainers',
            id : 'answer' + i + 'con'
        });

        const letter = $('<span/>').attr({
            class : 'answerLetters',
            id : 'answer' + i
        }).text(current_word[i]);

        $($p).append(letter);
        $($div).append($p);
        $('#word_container').append($div);
    }
}

const letters = function() {
    for (let i = 'a'.charCodeAt(0); i <= 'z'.charCodeAt(0); i++) {
        const letter = String.fromCharCode(i);
        
        //Generate each letter img.
        const letterImg = $('<img/>').attr({
            src : 'images/letters/' + letter + '.png',
            class : 'letterBtns',
            id : letter, /*Eg : 'a' */
            alt : 'letter-img-' + letter
        }).click(function() {
            const letter_id = this.id;
        });

        $('#letters_container').append(letterImg);
    }
}

const saveBtn = () => {
    const btn = $('<button/>').attr({
        class : 'btn btn-primary buttons',
        id : 'saveBtn'
    }).text(SAVE_BTN);

    $('#buttons_container').append(btn);
}

//Create Modal window framework.
const modal = (modal_name) => {
    const $div = $('<div/>').attr('class', 'modal-content');
    
    //Modal Header.
    const header = $('<div/>').attr('class', 'modal-header');
    const closeBtnTop = $('<button/>').attr({
        type: 'button',
        class: 'close',
        'data-dismiss': 'modal'
    }).html('&times;');
    const title = $('<h4/>').attr({
        class: 'modal-title',
        id: modal_name + '_title' /* Eg: signup_title*/
    });
    
    //Modal content.
    const content = $('<div/>').attr({
        class: 'modal-body modalContents',
        id : modal_name + '_content' /* Eg: signup_content */
    });

    //Modal Footer.
    const footer = $('<div/>').attr({
        class: 'modal-footer',
        id: modal_name + '_footer'
    });
   
    
   $($div).append(header, content, footer);
   $(header).append(title, closeBtnTop);
   $('#' + modal_name + '_body').append($div);
}

const signUp = () => {
    const modalName = 'signup';
   
    //Create a framework of a modal window.
    modal(modalName);

    const title = $('<div/>').attr('class', 'modalTitles')
                    .text(SIGNUP_TEXT);
    
    //Name input field.
    const name = $('<input/>').attr({
        type : 'text',
        class : 'signUpInputs',
        placeholder : 'User name'
    });
    const nameAlert = $('<p/>').attr({
        class: 'inputAlerts',
        id: 'nameAlert'
    })
    .text(NAME_ALERT_TEXT);
    
    //Email input field.
    const email = $('<input/>').attr({
        type : 'email',
        class : 'signUpInputs',
        placeholder : 'E-mail address'
    });
    const emailAlert = $('<p/>').attr({
        class: 'inputAlerts',
        id: 'emailAlert'
    })
    .text(EMAIL_ALERT_TEXT);
    
    //Password input field.
    const password = $('<input/>').attr({
        type : 'password',
        class : 'signUpInputs',
        placeholder : 'Password'
    });
    const passwordAlert = $('<p/>').attr({
        class: 'inputAlerts',
        id: 'passwordAlert'
    })
    .text(PASSWORD_ALERT_TEXT);

    const submit =  $('<button/>').attr({
        class: 'btn btn-primary modalBtns',
        id: 'signUpSubmitBtn'
    })
    .text(SUBMIT_BTN);

    $('#' + modalName + '_title').append(title);
    $('#' + modalName + '_content').append(nameAlert, name, emailAlert, email, passwordAlert, password);
    $('#' + modalName + '_footer').append(submit);
}

const logIn = () => {
    const modalName = 'login';
   
    //Create a framework of a modal window.
    modal(modalName);

    const title = $('<div/>').attr('class', 'modalTitles')
                    .text(LOGIN_TEXT);
    
    //Email input field.
    const email = $('<input/>').attr({
        type : 'email',
        class : 'loginInputs',
        placeholder : 'E-mail address'
    });
    const emailAlert = $('<p/>').attr({
        class: 'inputAlerts',
        id: 'loginEmailAlert'
    })
    .text(EMAIL_ALERT_TEXT);

    //Password input field.
    const password = $('<input/>').attr({
        type : 'password',
        class : 'loginInputs',
        placeholder : 'Password'
    });
    const passwordAlert = $('<p/>').attr({
        class: 'inputAlerts',
        id: 'loginPasswordAlert'
    })
    .text(PASSWORD_ALERT_TEXT);

    const submit = $('<button/>').attr({
        class: 'btn btn-primary modalBtns',
        id: 'loginSubmitBtn'
    })
    .text(SUBMIT_BTN);

    $('#' + modalName + '_title').append(title);
    $('#' + modalName + '_content').append(emailAlert, email, passwordAlert, password);
    $('#' + modalName + '_footer').append(submit);
}

const restart = () => {
    const modalName = 'restart';
    
    //Create a framwork of a modal window.
    modal(modalName);

    const title = $('<div/>').attr('class', 'modalTitles')
    .text(RESTART_TITLE);
    
    const message = $('<div/>').attr('id', 'restartMessage' )
                    .html(RESTART_BODY);
    
    const $img = $('<img/>').attr({
        src: 'images/worryCat.png',
        id: 'restartImg',
        alt: 'cat-worry-restarting-image'
    });

    const  yesBtn = $('<button/>').attr({
        type: 'button',
        id: 'yes',
        class: 'btn btn-primary modalBtns'
    })
    .text('YES');

    const  noBtn = $('<button/>').attr({
        type: 'button',
        class: 'btn btn-danger modalBtns',
        'data-dismiss': 'modal'
    })
    .text('NO');

    $('#' + modalName + '_title').append(title);
    $('#' + modalName + '_content').append(message, $img);
    $('#' + modalName + '_footer').append(yesBtn, noBtn);
}

const gameover = () => {
    const modalName = 'gameover';
    
    //Create a framwork of a modal window.
    modal(modalName);

    const title = $('<div/>').attr('class', 'modalTitles')
    .text(GAME_OVER_TITLE);
    
    const message = $('<div/>').attr('id', 'restartMessage' )
                    .html(GAME_OVER_BODY);
    const $img = $('<img/>').attr({
        src: 'images/angelCat.png',
        id: 'gameOverImg',
        alt: 'angel-cat-image'
    })
    
    const  restartBtn = $('<button/>').attr({
        type: 'button',
        id: 'gameoverRestartBtn',
        class: 'btn btn-primary modalBtns'
    })
    .text(RESTART_BTN);

    $('#' + modalName + '_title').append(title);
    $('#' + modalName + '_content').append(message, $img);
    $('#' + modalName + '_footer').append(restartBtn);
}

const showLetter = (index) => {
    $('#answer' + index).css('visibility', 'visible');
}

const changeHangCatImg = () => {
    
    if(mistake > 6) {
        

        
    }
    $('#hangCatImg').attr('src', '../images/hangCat/hanged' + mistake + '.png');
}

const fadeOutHangCatImg = () => {
    $('#hangCatImg').css({
        'visibility': 'hidden',
        'opacity': 0,
        'transition': 'visibility 0s 1s, opacity 1s linear'
    });
}

const removeFadeOutOfHangCatImg = () => {
    $('#hangCatImg').css({
        'visibility': 'visible',
        'opacity': 1,
        'transition': 'visibility 0s, opacity 0s linear'
    });
}

const updateScore = () => {
    $('#score').text(score);
}

const updateTrial = () => {
    $('#trial').text(trial);
}

const showAlert = (inputField_id) => {
    $(inputField_id).css('visibility', 'visible');
}

const removePreviousTrial = () => {
    $('#hint').remove();
    $('#curWordField').remove();
}

const showModal = (modal_id) => {
    $('#gameover_modal').modal('show');
}

const hideModal = (modal_id) => {
    $(modal_id).modal('hide');
}

const changeViewOfButton = (button_id, text) => {
    $(button_id).text(text);
}

//When page is loaded, rengder all components in the page.
const renderViews = (current_hint, current_question) => {
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

const View = {
    showAppName : appName,
    createNavBar : navBar,
    createPlayData : playData,
    createHangImg : hangCatImg,
    createRestartBtn : restartBtn,
    createHint : hint,
    createWord : word,
    createLetters : letters,
    createSaveBtn : saveBtn,
    createSignUpModal : signUp,
    createLoginModal : logIn,
    createRestartModal : restart,
    createGameOverModal : gameover,
    showLetter: showLetter,
    showAlert: showAlert,
    changeHangCatImg: changeHangCatImg,
    updateScore: updateScore
};

