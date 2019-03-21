const SCORE_TEXT = "Score : " + score;
const TRIAL_TEXT = "Trial : " + trial;
const RESET_BTN = "RESET";
const SAVE_BTN = "SAVE";

const navBar = () => {
    const $div = $('<div/>').attr({
        id : 'navBarContainer'
    });
    const $ul = $('<ul/>');

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

    $($div).append(signup, login, ranking);
    $('#navbar').append($div);
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
        class : 'col-12',
        id : 'currentHint'
    }).text(current_hint);

    $('#hint_container').append($div);
}

const word = (current_word) => {
    const $div = $('<div/>').attr({
        class : 'col-12'
    });
}

const letters = function() {
    for (let i = 'a'.charCodeAt(0); i <= 'z'.charCodeAt(0); i++) {
        const letter = String.fromCharCode(i);
        
        //Generate each letter img.
        const letterImg = $('<img/>').attr({
            src : 'images/letters/' + letter + '.png',
            class : 'letters',
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

const View = {
    createNavBar : navBar,
    createPlayData : playData,
    createHangImg : hangCatImg,
    createResetBtn : resetBtn,
    createHint : hint,
    createWord : word,
    createLetters : letters,
    createSaveBtn : saveBtn
};

View.createNavBar();
View.createPlayData();
View.createHangImg();
View.createResetBtn();
View.createHint();
View.createLetters();
View.createWord();
View.createLetters();
View.createSaveBtn();