const SCORE_TEXT = "Score : " + score;
const TRIAL_TEXT = "Trial : " + trial;

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
        src : 'images/hang_0.png',
        alt : 'hang-cat-image',
        id : 'hangCatImg'
    });

    $($div).append(img);
    $('#img_container').append($div);
}

const resetBtn = () => {
    const btn = $('<button/>').attr({
        class : 'btn btn-primary',
        id : 'restBtn',
        value : 'RESET'
    })

    $('#rest_btn_container').append(btn);
}

/******************************************/
const hint = (current_hint) => {
    const $div = $('<div/>').attr({
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

/******************************************/

const letters = () => {
    for (let i = 'a'.charCodeAt(0); i <= 'z'.charCodeAt(0); i++) {
        const letter = String.fromCharCode(i);
        
        //Generate each letter img.
        const letterImg = $('<img/>').attr({
            src : 'images/letters/' + letter + '.png',
            class : 'letters',
            id : letter, /*Eg : 'a' */
            alt : 'letter-img-' + letter
        }).onclick(function() {
            const letter_id = this.id;
        });

        $('#letters_container').append(letterImg);
    }
}

const saveBtn = () => {
    const btn = $('<button/>').attr({
        class : 'btn btn-danger',
        id : 'saveBtn',
        value : 'SAVE'
    });

    $('#save_btn_container').append(btn);
}