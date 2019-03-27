let score = 0;
let mistake = 0;
let trial = 1;
let quizArray;
let currentHint;
let currentAnswer;
let lettersArray; /*current word split into a letter*/
let gameOverFlag = false;

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

const resetData = () => {
    score = 0;
    trial = 0;
    mistake = 0;
    gameOverFlag = false;
}

const isGameOver = () => {
    
    if(mistake > 6) {
        return true;
    } 

    return false;
}

const setGameOverFlag = () => {
    gameOverFlag = true;
}

const getUserInputs = (input_className) => {
    let userInputArray = [];
    
    $(input_className).each(function() {
       userInputArray.push($(this).val());
    });
    
    return userInputArray;

}

const validateUserInput = (userInputs) => {
    let alertArray = [];
    const emailRegex = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    const passwordRegex = new RegExp(/^(?=.{6,})/);

    //For Sign up.
    if(userInputs.length === 3) {
        const name = userInputs[0];
        const email = userInputs[1];
        const password = userInputs[2];

        //When Name is Null.
        if(name === "") {
            alertArray.push('#nameAlert');
        }

        if(email === "" || !emailRegex.test(email)) {
            alertArray.push('#emailAlert');
        }

        if(password === "" || !passwordRegex.test(password)) {
            alertArray.push('#passwordAlert');
        }

    } else {
        const email = userInputs[0];
        const password = userInputs[1];

        if(email === "" || !emailRegex.test(email)) {
            alertArray.push('#loginEmailAlert');
        }

        if(password === "" || !passwordRegex.test(password)) {
            alertArray.push('#loginPasswordAlert');
        }
    }

    return alertArray;

}

const createUserAccount = (userInputs) => {
    const name = userInputs[0];
    const email = userInputs[1];
    const password = userInputs[2];
    let errorCode;
    let errorMessage;

    //Create user with email & password on Firebase.
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
        //Error Handling.
        errorCode = error.code;
        errorMessage = error.message;
        alert(errorMessage)
        return false;
    });

    //Log in automatically after the registration.
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
        //Error Handling.
        errorCode = error.code;
        errorMessage = error.message;
    });

    //Add user name to the account.
    firebase.auth().onAuthStateChanged(function (user) {
        
        if (user) {
            
            user.updateProfile({
                
                displayName: name.toString()
            
            }).then(function () {

              return true;
            
            });
        }
    });
}

const loginToAccount = (userInputs) => {
    const email = userInputs[0];
    const password = userInputs[1];
    let errorCode;
    let errorMessage;

    //Log in.
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
        //Error Handling.
        //errorCode = error.code;
        //errorMessage = error.message;
        return false;
    });

    firebase.auth().onAuthStateChanged(function (user) {

        //If login successful.
        if (user) {
            return true;
            document.getElementById('saveBtn').onclick = function (event) {
                saveScore(totalScore);
            };
        }
    });
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
