const SCORE_TEXT = "Score : " + score;
const TRIAL_TEXT = "Trial : " + trial;

const View = {
    showPlayData: playData()
};

function playData() {
    const $div = $('<div/>').attr({
        id: 'playdata_container'
    });

    const $score = $('<span/>').attr('id', 'score')
                    .text(SCORE_TEXT); 

    const $trial = $('<span/>').attr('id', 'trial')
                    .text(TRIAL_TEXT);

    $($div).append($score, $trial);
    $('#playdata').append($div);
}

View.showPlayData();