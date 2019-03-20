let score = 0;
let trial = 0;
const questions = [
    "Programming language for iOS development", 
    "The oldest programming language",
    "Free, Interpretred, released in 1991 ",
    "",
    "",
    "",
    "",
    ""
];

const answers = [
    "Swift",
    "",
    "Python"
];

const createDataObj = (questions, answers, data_size) => {
    let data_array = [];
    
    //Check Data.
    if(questions.length != answers.length) {
        console.log("Please check questions and answers");
        return false;
    }

    for(let i = 0; i < data_size; ++i) {
        
        const obj = {
            "question": questions[i],
            "answer": answers[i],
            "flag": false /*flag for found or not*/
        };

        data_array.push(obj);
    }

    return data_array;
}