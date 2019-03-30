//Display Application name on the left top of the page.
const showAppName = () => {
    const appName = $('<a/>').attr({
        href : 'index.html',
        id : 'appName'
    }).html(APP_NAME);
    $('#appName_container').append(appName);
}

//Navigation bar.
const createNavBar = () => {
    //Navbar links.
    const signup = $('<a/>')
    . attr({
        class : 'navLinks',
        id : 'signup',
        href : '#'
    })
    .text(SIGNUP_TEXT);

    const login = $('<a/>')
    . attr({
        class : 'navLinks',
        id : 'login',
        href : '#'
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

//Nav bar for user page.(After login)
const createUserNavbar = () => {
    const loginAs = $('<span/>')
    . attr({
        class : 'navLinks',
        id : 'userName'
    });

    const logout = $('<a/>')
    .attr({
        class : 'navLinks',
        id : 'logoutLink',
        href : '#'
    })
    .text('Log out');

    const ranking = $('<a/>')
    .attr({
        class : 'navLinks',
        href : 'rank.html'
    })
    .text('Ranking');

    $('#userNavbar').append(loginAs, logout, ranking);
}

//User's play data on index.html.
const createPlayData = () => {
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

//Create hangCat image.
const createHangCatImg = () => {
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

//Create Restart button.
const createRestartBtn = () => {
    const btn = $('<button/>')
    .attr({
        class : 'btn btn-danger buttons',
        id : 'restartBtn',
        'data-toggle': 'modal',
        'data-target': '#restart_modal' /*Trigger restart confirmation modal window*/
    }).text(RESTART_BTN);

    $('#buttons_container').append(btn);
}

//Create current hint.
const createHint = (current_hint) => {
    const $div = $('<div/>')
    .attr({
        id : 'hint'
    }).text(current_hint);

    $('#hint_container').append($div);
}

//Create current word.
const createWord = (current_word) => {
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

//Create letter buttons(a to z).
const createLetters = function() {
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

//Create Save button.
const createSaveBtn = () => {
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

//Create sign up modal.
const createSignUpModal = () => {
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
        class: 'btn btn-primary modalBtns authButtons',
        id: 'signUpSubmitBtn'
    })
    .text(SUBMIT_BTN);

    $('#' + modalName + '_title').append(title);
    $('#' + modalName + '_content').append(nameAlert, name, emailAlert, email, passwordAlert, password);
    $('#' + modalName + '_footer').append(submit);
}

//Create login modal.
const createLoginModal = () => {
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
        class: 'btn btn-primary modalBtns authButtons',
        id: 'loginSubmitBtn'
    })
    .text(SUBMIT_BTN);

    $('#' + modalName + '_title').append(title);
    $('#' + modalName + '_content').append(emailAlert, email, passwordAlert, password);
    $('#' + modalName + '_footer').append(submit);
}

//Create a modal for confirm restarting.
const createRestartModal = () => {
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

//Create a modal appearing when gameover.
const createGameOverModal = () => {
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

//Display a letter of a current word.
const showLetter = (index) => {
    $('#answer' + index).css('visibility', 'visible');
}

//Change hang cat image(according to user's mistake.)
const changeHangCatImg = () => {
    $('#hangCatImg').attr('src', '../images/hangCat/hanged' + mistake + '.png');
}

//Hang cat Image will be faded out.
const fadeOutHangCatImg = () => {
    $('#hangCatImg').css({
        'visibility': 'hidden',
        'opacity': 0,
        'transition': 'visibility 0s 1s, opacity 1s linear'
    });
}

//Remove fade out effect from the image.
const removeFadeOutOfHangCatImg = () => {
    $('#hangCatImg').css({
        'visibility': 'visible',
        'opacity': 1,
        'transition': 'visibility 0s, opacity 0s linear'
    });
}

//Change the display of score.
const updateScore = () => {
    $('#score').text(score);
}

//Change the display of the number of trials.
const updateTrial = () => {
    $('#trial').text(trial);
}

//Display alert on signup or login modal.
const showAlert = (inputField_id) => {
    $(inputField_id).css('visibility', 'visible');
}

//Hide all alerts.
const hideAlerts = (input_className) => {
    $(input_className).css('visibility', 'hidden');
}

//Change alert message on signup or login modal.
const changeAlertMessage = (div_id, message) => {
    $(div_id).text(message)
             .css('visibility', 'visible');
}

//Remove previous hint & word.
const removePreviousTrial = () => {
    $('#hint').remove();
    $('#curWordField').remove();
}

//Open modal window.
const showModal = (modal_id) => {
    $(modal_id).modal('show');
}

//Hide modal window.
const hideModal = (modal_id) => {
    $(modal_id).modal('hide');
}

//Change the text of a button.
const changeViewOfButton = (button_id, text) => {
    $(button_id).text(text);
}

//Clear all inputs & alerts displayed on a modal.
const clearModal = (input_className) => {
    //Clear all input values.
    $(input_className).each(function() {
      $(this).val('');
    });

    //Hide alerts.
    hideAlerts('.inputAlerts');

    //Change the text of submit button.
    $('.authButtons').text(SUBMIT_BTN);
}

//Dispaly user navbar & hide default navbar.
const displayUserNavBar = () => {
    $('#navbar').css('display', 'none');
    $('#userNavbar').css('display', 'inline-block');
}

//Dispaly user navbar & hide default navbar.
const displayNavBar = () => {
    $('#userNavbar').css('display', 'none');
    $('#navbar').css('display', 'inline-block');
}

const displayUserNameOnNavBar = (name) => {
    $('#userName').text('Login as : ' + name);
} 

//Balloon on a save button.
const setBalloon = (element_id, balloon_text) => {
    $(element_id).attr({
        'data-balloon':  balloon_text,
        'data-balloon-pos' : 'up'
    });
}

const hideBalloon = (element_id) => {
    $(element_id).removeAttr(
        'data-balloon',
        'data-balloon-pos'
    );
}

const showToast = () => {
    toastr.options = {
        "closeButton": true,
        "debug": false,
        "positionClass": "toast-bottom-center",
        "onclick": null,
        "showDuration": "1000",
        "hideDuration": "0",
        "timeOut": "0",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut",
        "preventDuplicates": true
    };
    toastr.success(TOAST_TEXT);
    setTimeout(function() {toastr.clear();}, 1000);
}

//When page is loaded, rengder all components in the page.
const renderIndexViews = (current_hint, current_question) => {
    showAppName();
    createNavBar();
    createUserNavbar();
    createPlayData();
    createHangCatImg();
    createRestartBtn();
    createHint(current_hint);
    createWord(current_question);
    createLetters();
    createSaveBtn();
    createSignUpModal();
    createLoginModal();
    createRestartModal();
    createGameOverModal();
    setBalloon('#saveBtn', BALLOON_TEXT);
} 

const createRankTable = (users_array) => {
    const $div = $('<div/>').attr({
        class : 'table-responsive',
        id : 'tableField'
    });

    const $table = $('<table/>').attr({
        class : 'table table-striped',
        id : 'table'
    });

    const $thead = $('<thead/>');
    const $tr = $('<tr/>');
    const rankHeader = $('<th/>').attr('class', 'tableHeaders')
                        .text(RANK_HEADER);
    const nameHeader = $('<th/>').attr('class', 'tableHeaders')
                        .text(NAME_HEADER);
    const trialHeader = $('<th/>').attr('class', 'tableHeaders')
                        .text(TRIAL_HEADER);
    const scoreHeader = $('<th/>').attr('class', 'tableHeaders')
                        .text(SCORE_HEADER);
    const $tbody = $('<tbody/>');   

    //Process all user data.
    for(let i = 0; i < users_array.length; ++i) {
        const $tr = $('<tr/>');
        const rank = $('<td/>').text(i + 1);
        const name = $('<td/>').text(users_array[i].name);
        const trial = $('<td/>').text(users_array[i].trial);
        const score = $('<td/>').text(users_array[i].score);
        $($tr).append(rank, name, trial, score);
        $($tbody).append($tr);
    }

    $($div).append($table);
    $($table).append($thead, $tbody);
    $($thead).append($tr);
    $($tr).append(rankHeader, nameHeader, trialHeader, scoreHeader);
    $('#rank_table').append($div);
}

const renderRankViews = () => {
    
}


