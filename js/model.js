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

const createDataObjArray = (hints, answers, data_size) => {
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

const playSound = (audio_file) => {
    const sound = new Audio(audio_file);
    sound.play();
}

const generateRandomNumber = (data_size) => {
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
    const email = userInputs[1];
    const password = userInputs[2];
    let result = true;

    //Create user with email & password on Firebase.
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .catch(function (error) {
        //Error Handling.
        result = error.message;
    });

    const returnVal = new Promise(function (resolve, reject) {
        setTimeout(function () {
            //result = true when sucess. When fail, result will be an error message.
            resolve(result); 
        }, 1000);
    });

    return returnVal;
}

const addNameToAccount = (userInputs) => {
    const name = userInputs[0];
    const email = userInputs[1];
    const password = userInputs[2];
    
    //Log in into the account.
    firebase.auth().signInWithEmailAndPassword(email, password)
    .catch(function (error) {
        //Error Handling.
        console.log(error.message);
    });
    
    //Add user name.
    const user = firebase.auth().currentUser;
    user.updateProfile({
        
        displayName: name
    
    }).then(function () {
      
        console.log(user.displayName);  
    
    });
}

const loginToAccount = (userInputs) => {
    const email = userInputs[0];
    const password = userInputs[1];
    let result = false;

    //Log in.
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
        result = error.message;
    });

    firebase.auth().onAuthStateChanged(function (user) {

        //If login successful.
        if (user) {
            result = true;
        }
    })
    
    const returnVal = new Promise(function (resolve, reject) {
        setTimeout(function () {
            //result = true when sucess. When fail, result will be an error message.
            resolve(result); 
        }, 1000);
    });

    return returnVal;

}

const logOut = () => {
    firebase.auth().signOut().then(function () {
        firebase.database().goOffline();
        console.log("Logged out.");
    }).catch(function (error) {
        console.log(error.message);
    });
}

