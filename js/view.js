const SCORE_TEXT = "Score : " + score;
const TRIAL_TEXT = "Trial : " + trial;
const RESET_BTN = "RESET";
const SAVE_BTN = "SAVE";
const APP_NAME = "HangCat Game";
const SIGNUP_TEXT = "Sign up";
const LOGIN_TEXT = "Log in";
const RANKING_TEXT = "Ranking"
const SUBMIT_BTN = "SUBMIT";
const NAME_ALERT_TEXT = "Please enter valid user name.";
const EMAIL_ALERT_TEXT = "Please enter valid email address.";
const PASSWORD_ALERT_TEXT = "Please enter valid password.";

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
        'data-target': '#signup_modal'
    })
    .text(SIGNUP_TEXT)
    .click(function() {
        openModal('#signUp')
    });
    
    const login = $('<a/>')
    . attr({
        class : 'navLinks',
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

const playData = () => {
    const score = $('<span/>').attr('id', 'score')
                    .text(SCORE_TEXT); 

    const trial = $('<span/>').attr('id', 'trial')
                    .text(TRIAL_TEXT);

    $('#playdata').append(score, trial);
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

const resetBtn = () => {
    const btn = $('<button/>')
    .attr({
        class : 'btn btn-danger buttons',
        id : 'restBtn',
    }).text(RESET_BTN);

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
        class: 'modal-body',
        id : modal_name + '_content' /* Eg: signup_content */
    });

    //Modal Footer.
    const footer = $('<div/>').attr({
        class: 'modal-footer',
        id: modal_name + '_footer'
    });
   
    
   $($div).append(header, content, footer);
   $(header).append(closeBtnTop, title);
   $('#' + modal_name + '_body').append($div);
}

const signUp = () => {
    const modalName = 'signup';
   
    //Create a framework of a modal window.
    modal(modalName);

    const title = $('<div/>').attr('class', 'modalHeaders')
                    .text(SIGNUP_TEXT);
    
    //Name input field.
    const name = $('<input/>').attr({
        type : 'text',
        class : 'modalInputs',
        placeholder : 'User name'
    });
    const nameAlert = $('<p/>').attr('class', 'inputAlerts')
                        .text(NAME_ALERT_TEXT);
    //Email input field.
    const email = $('<input/>').attr({
        type : 'text',
        class : 'modalInputs',
        placeholder : 'E-mail address'
    });
    const emailAlert = $('<p/>').attr('class', 'inputAlerts')
                        .text(EMAIL_ALERT_TEXT);
    //Password input field.
    const password = $('<input/>').attr({
        type : 'text',
        class : 'modalInputs',
        placeholder : 'Password'
    });
    const passwordAlert = $('<p/>').attr('class', 'inputAlerts')
                        .text(PASSWORD_ALERT_TEXT);

    const submit = $('<button/>').attr('class', 'btn btn-primary')
                    .text(SUBMIT_BTN);

    $('#' + modalName + '_title').append(title);
    $('#' + modalName + '_content').append(nameAlert, name, emailAlert, email, passwordAlert, password);
    $('#' + modalName + '_footer').append(submit);
}

const logIn = () => {

}

const openModal = (modal_id) => {
    //$(modal_id).show();
}

const View = {
    showAppName : appName,
    createNavBar : navBar,
    createPlayData : playData,
    createHangImg : hangCatImg,
    createResetBtn : resetBtn,
    createHint : hint,
    createWord : word,
    createLetters : letters,
    createSaveBtn : saveBtn,
    createSignUpModal : signUp
};

