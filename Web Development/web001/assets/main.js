let QUESTION_NO = 0;

const USER_OBJECT = {
    'name': '',
    'core_interest': '',
}

const QUESTION_TEXT = [
    "Hello i'm a <b>Botux</b>, may i know you ?",

    (name) => { 
        return `I'm glad to know you, <b>${name}</b>, 
        may i know what interest you the most amongst these three ? 
        Your profile feed will be curated with all latest information regarding your choice
        <ul id="js_brainiac_modules">
            <li>Augmented Reality</li>
            <li>Game Development</li>
            <li>Virtual Reality</li>
        </ul>
        <p>Enter your core interest on the input field below</p>`
    },
    
]

/**
 * Retrieve DOM element
 */
let parent_wrapper = document.querySelector("section");
let question_text = document.getElementById("question_text");
let answer_input = document.getElementById("answer_input");
let submit_btn = document.getElementById("submit_btn");


/**
 * set question text
 */
const setQuestionText = () => {
    if (typeof(QUESTION_TEXT[QUESTION_NO]) === "function"){
        let tempFunc = QUESTION_TEXT[QUESTION_NO]
        let text = tempFunc(USER_OBJECT.name);
        question_text.innerHTML=text;
    }
    else {
        question_text.innerHTML=`${QUESTION_TEXT[QUESTION_NO]}`;
    }
}


/**
 * Helps to retrieve a user's response
 */
const getResponse = () => {
    return answer_input.value;
}


/**
 * Clear user's responses after reply
 */
const clearResponses = () => {
    answer_input.value = "";
    answer_input.focus = true;
}

/**
 * Helps to move to a next question
 */
const nextQuestion = () => {
    setQuestionText();
    clearResponses();
}

/**
 * Remove all form elements from viewport
 */
const removeAllElements = () => {
    question_text.remove();
    answer_input.remove();
    submit_btn.remove();
}


/**
 * Include a closing remark for a user
 */
const includeCloseRemarks = (name, interest) => {
    let child = `<p>We sincerely welcome you to our platform <b>${name}</b>, 
                we will make sure you get the best on your desired course on 
                <b>${interest}</b></p>`;
    parent_wrapper.innerHTML= child;
}


/**
 * APPLICATION STARTUP
 */

nextQuestion();

submit_btn.addEventListener("click", function(e) {
    e.preventDefault();

    if (QUESTION_NO !== QUESTION_TEXT.length - 1){
        USER_OBJECT.name = getResponse();
        QUESTION_NO += 1;
        nextQuestion(); 
    }

    else {
        USER_OBJECT.core_interest = getResponse();
        removeAllElements();
        includeCloseRemarks(USER_OBJECT.name, USER_OBJECT.core_interest);
    } 
});