const SCORE_TEXT = "Score : " + score;
const TRIAL_TEXT = "Trial : " + trial;
const RESET_BTN = "RESET";
const SAVE_BTN = "SAVE";
const APP_NAME = "HangCat Game";
const MODAL_SIGNUP_TEXT = "Sign up";
const MODAL_LOGIN_TEXT = "Sign up";

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
        href : '#'
    })
    .text('Sign up');
    
    const login = $('<a/>')
    . attr({
        class : 'navLinks',
        href : '#'
    })
    .text('Log in');

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
        class : 'btn btn-danger',
        id : 'restBtn',
    }).text(RESET_BTN);

    $('#reset_btn_container').append(btn);
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
        class : 'btn btn-primary',
        id : 'saveBtn'
    }).text(SAVE_BTN);

    $('#save_btn_container').append(btn);
}

const modal = () => {
    //Create Main container.
    const $div = $('<div/>').attr({
        class: "modal fade",
        id: "modalMainContainer"
    });

    //Create sub container.
    const $div2 = $('<div/>').attr('class', 'modal-dialog');

    //Create content container.
    const $div3 = $('<div/>').attr('class', 'modal-content');

    //Create contents.
    const header = $('<div/>').attr('class', 'modal-header');
    const closeBtn = $('<button/>').attr({
        class: "close",
        id: "modalClose",
        'data-dismiss': 'modal'
    }).text('x');
    const middle = $('<div/>').attr('class', 'modal-header');
    const form =  $('<div/>').attr('role', 'form');
    const formContent = $('<div/>').attr({
        class: "form-group",
        id: "formContainer"
    });

    //Container for assertion.
    const $div4 = $('<div/>').attr({
        class: "modal-header",
        id: "assertionContainer"
    }); /*This is hidden by default (Set in CSS)*/

    const assertion = $('<p/>').attr({
        class: "assertions",
        id: "assertion"
    });
    
    const footer = $('<div/>').attr('class', 'modal-footer');

    $($div).append($div2);
    $($div2).append($div3);
    $($div3).append(header, middle, form, $div4, $footer);
    $(header).append(closeBtn);
    $(form).append(formContent);
    $($div4).append(assertion);
    $('#main_body').append($div);
}

const signUp = () => {
    const header = $('<div/>').attr('class', 'modalHeaders')
                    .text(MODAL_SIGNUP_TEXT);
    const name = $('<input/>').attr({
        type : 'text',
        class : 'modalInputs',
        placeholder : 'User name'
    });
    const email = $('<input/>').attr({
        type : 'text',
        class : 'modalInputs',
        placeholder : 'E-mail address'
    });
    const password = $('<input/>').attr({
        type : 'text',
        class : 'modalInputs',
        placeholder : 'Password'
    });

}

const logIn = () => {

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
    createModal : modal
};

