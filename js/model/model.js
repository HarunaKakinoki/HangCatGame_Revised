let score = 0;
let mistake = 0;
let trial = 1;
let questionArray;
let currentHint;
let currentAnswer;
let lettersArray; /*current word split into a letter*/
let gameOverFlag = false;


const hints = [
    "Language for iOS development", 
    "JS library, maintained by Facebook",
    "Free, Interpretred, released in 1991 ",
    "Company provide AWS service",
    "Who created this game?(*'v'*)",
    "Languages does not have to compile",
    ""
];
const answers = [
    "Swift",
    "React",
    "Python",
    "Amazon",
    "Haruna"
];

//Create the array of question objects from hints array & answer array.
const createDataObjArray = (hints, answers, data_size) => {
    let data_array = [];

    for(let i = 0; i < data_size; ++i) {
        
        const question = {
            "hint": hints[i],
            "answer": answers[i]
        };

        data_array.push(question);
    }

    return data_array;
}

//Accept a string (Current word) & split it into letters.
const splitWordIntoLetters = (current_answer) => {
    let lettersArray = [];
    const array = Array.from(current_answer);
    
    for(let i = 0; i < array.length; ++i) {
        const letter = {
            letter: array[i],
            flag: false /*Flag to indicate already found or not*/
        };
        lettersArray.push(letter);
    }

    return lettersArray;

}

//Play audio file.
const playSound = (audio_file) => {
    const sound = new Audio(audio_file);
    sound.play();
}

//Genrate random index number to pick a question.
const generateRandomNumber = (data_size) => {
    //Return 0 to n(data_size) randomly.
    const randomNum = Math.floor((Math.random() * data_size) + 0);
    return randomNum;
}

//When user tap a letter button, search the letter from the current word.
function searchWord(selected_letter) { /*It should not bind "this", so not arrow function*/
    let flag = false; /*Indicates letter is already found or not*/
    
    //Iterate through the array of letters consists of a current word.
    for(let i = 0; i < lettersArray.length; ++i) {
        
        //When the selected letter is found.
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

//Reset all play data.
const resetData = () => {
    score = 0;
    trial = 0;
    mistake = 0;
    gameOverFlag = false;
}

//Check game over or not.
const isGameOver = () => {
    
    if(mistake > 6) {
        return true;
    } 

    return false;
}

const setGameOverFlag = () => {
    gameOverFlag = true;
}

//Save current user's play data to local storage.
const saveUserDataToStorage = () => {
    const user = {
        score : score,
        trial : trial
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
}

//Save Authenticated user's playdata to firebase Db.
const saveUserDataToDatabase = () => {
    const user = firebase.auth().currentUser;
    const userId = user.uid;

    //Store data by user id.
    firebase.database().ref('users/' + userId).set({
        username: user.displayName,
        score: score,
        trial: (trial - 1)
    });
}

//Get current user's data from local storage.
const getUserDataFromStorage = () => {
    const user = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return user;
}

//The function to sort users array in order of score.(Descending order)
const compare = (a,b) => {
    if (a.score > b.score)
      return -1;
    if (a.score < b.score)
      return 1;
    return 0;
}

//Get all users' data from firebase database,
//Sort by score, make an array & return the array.
function getUsersDataFromDatabase() {
    const ref = firebase.database().ref('users');
    let usersArray = [];
 
    ref.orderByChild('score').on('value', function (snap) {
        // Keep the local user object synced with the Firebase userRef
        const users = snap.val();
        const keys = Object.keys(users);

        for(let i = 0; i < keys.length; ++i) {
            const k = keys[i];
            const user = {
                name : users[k].username,
                score : users[k].score,
                trial : users[k].trial
            };
            usersArray.push(user);
        }
        usersArray.sort(compare);
    });

    const returnVal = new Promise(function (resolve, reject) {
        setTimeout(function () {
            resolve(usersArray); 
        }, 1800);
    });

    return returnVal;
}

//Get user input values.
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

//User registration on firebase.
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
        }, 2000);
    });

    return returnVal;
}

//When user creates an account, add user name to the account.
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
    
    });

    const returnVal = new Promise(function (resolve, reject) {
        setTimeout(function () {
            resolve(name); 
        }, 2000);
    });

    return returnVal;
}

const loginToAccount = (userInputs) => {
    const email = userInputs[0];
    const password = userInputs[1];
    let result = false;

    //Try Log in.
    firebase.auth().signInWithEmailAndPassword(email, password)
    
    //When succeeded.
    .then(function() {
        result = true;
    })
    
    //When failed.
    .catch(function (error) {
        result = error.message;
    });
    
    const returnVal = new Promise(function (resolve, reject) {
        setTimeout(function () {
            //result = true when sucess. When fail, result will be an error message.
            resolve(result); 
        }, 1500);
    });

    return returnVal;

}

const logout = () => {
    firebase.auth().signOut().then(function () {
        firebase.database().goOffline();
        console.log("Logged out.");
    })
    .catch(function (error) {
        console.log(error.message);
    });
}

