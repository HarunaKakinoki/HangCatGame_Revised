let score = 0;
let mistake = 0;
let trial = 1;
let quizArray;
let currentHint;
let currentAnswer;
let lettersArray; /*current word split into a letter*/

const hints = [
    "Language for iOS development", 
    "JS library, maintained by Facebook",
    "Free, Interpretred, released in 1991 ",
    "Company provide AWS service",
    "Who created this game?(*'v'*)"
];

const answers = [
    "Swift",
    "React",
    "Python",
    "Amazon",
    "Haruna"
];

const dataObjArray = (hints, answers, data_size) => {
    let data_array = [];

    for(let i = 0; i < data_size; ++i) {
        
        const obj = {
            "hint": hints[i],
            "answer": answers[i],
            "flag": false /*flag for found or not*/
        };

        data_array.push(obj);
    }
    console.log(data_array)
    return data_array;
}

const splitWordIntoLetters = (current_answer) => {
    let lettersArray = [];
    const array = Array.from(current_answer);
    
    for(let i = 0; i < array.length; ++i) {
        const obj = {
            letter: array[i],
            flag: false /*Flag to indicate already found or not*/
        };
        lettersArray.push(obj);
    }

    return lettersArray;

}

const sound = (audio_file) => {
    const sound = new Audio(audio_file);
    sound.play();
}

const randomNumber = (data_size) => {
    //Return 0 to n(data_size) randomly.
    const randomNum = Math.floor((Math.random() * data_size) + 0);
    return randomNum;
}

//When user tap a letter button, search the letter from the current word.
function searchWord(selected_letter) { /*It should not bind "this", so not arrow function*/
    let flag = false; /*Indicates already found letter or not*/
    
    for(let i = 0; i < lettersArray.length; ++i) {
        
        //When the letter is found in the current word.
        if(selected_letter === lettersArray[i].letter.toLowerCase()) {
            
            if(lettersArray[i].flag === false) {
                lettersArray[i].flag = true;
                return {
                    result: true,
                    repeat: false,
                    index: i
                };
            
            } else {
                
                flag = true;
            
            }
        }
    }

    //When user tap a found letter again.
    if(flag === true) {
        return {
            result: true,
            repeat: true,
            index: i
        };
    }

    return false;
}

//Check whether the trial is end or not.
const isTrialEnd = () => {
    for(let i = 0; i < lettersArray.length; ++i) {
        if(lettersArray[i].flag === false) {
            return false;
        }
    }
    return true;
}


const addScore = () => {
    score++;
}

const countTrial = () => {
    trial++;
}

const countMistake = () => {
    mistake++;
}

const resetData= () => {
    score = 0;
    trial = 0;
    mistake = 0;
}

const Model = {
    createDataObjArray: dataObjArray,
    generateRandomNumber: randomNumber,
    splitWordIntoLetters: splitWordIntoLetters,
    playSound: sound,
    searchWord: searchWord,
    addScore: addScore,
    countTrial: countTrial,
    countMistake: countMistake
};
