let score = 0;
let trial = 0;
let quizArray;
let currentHint;
let currentAnswer;
let lettersArray; /*current word split into a letter*/

const hints = [
    "Language for iOS development", 
    "JS library, maintained by Facebook",
    "Free, Interpretred, released in 1991 ",
    "Company provide AWS service"
];

const answers = [
    "Swift",
    "React",
    "Python",
    "Amazon"
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

function searchWord(selected_letter) { /*It should not bind "this", so not arrow function*/
    for(let i = 0; i < lettersArray.length; ++i) {
        if(selected_letter === lettersArray[i].letter) {
            if(lettersArray[i].flag == false) {
                return {
                    result: true,
                    index: i
                };
            }
        }
    }
    return false;
}



const Model = {
    createDataObjArray: dataObjArray,
    playSound: sound,
    generateRandomNumber: randomNumber,
    splitWordIntoLetters: splitWordIntoLetters
};
