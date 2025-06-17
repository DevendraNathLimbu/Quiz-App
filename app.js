
//Sound functionality mute and unmute

const i = document.querySelector('i');
i.addEventListener('click', () => {
   if(i.classList.contains('fa-volume-high')) {
        i.classList.remove('fa-volume-high');
        i.classList.add('fa-volume-xmark');
        muteAudio();
   }
   else {
        i.classList.remove('fa-volume-xmark');
        i.classList.add('fa-volume-high');
        unmuteAudio();
   }
})

// Collection of questions and answers

const qna = [
    {
        question: "Which of the following is HEX color code for white?",
        answers: [
            { text: "rgb(255,255,255)", correct: false },
            { text: "#000", correct: false },
            { text: "#FFF", correct: true },
            { text: "white", correct: false }
        ]
    },
    {
        question: "Which one is not a valid CSS unit?",
        answers: [
            { text: "px", correct: false },
            { text: "xc", correct: true },
            { text: "em", correct: false },
            { text: "%", correct: false }
        ]
    }
    ,
     {
        question: "What is the default value of the CSS 'position' property?",
        answers: [
            { text: "fixed", correct: false },
            { text: "static", correct: true },
            { text: "relative", correct: false },
            { text: "absolute", correct: false }
        ]
    },
     {
        question: "Which of the following is used to select an element with a specific class in CSS?",
        answers: [
            { text: ".className", correct: true },
            { text: "#className", correct: false },
            { text: "[className]", correct: false },
            { text: "~className", correct: false }
        ]
    },
     {
        question: "Which of the following is not a loop?",
        answers: [
            { text: "for loop", correct: false },
            { text: "do while", correct: false },
            { text: "while", correct: false },
            { text: "if else", correct: true }
        ]
    }
    ,
     {
        question: "What is the correct syntax for creating a function in JavaScript?",
        answers: [
            { text: "functionName(){...}", correct: false },
            { text: "(){...}", correct: false },
            { text: "function name(){...}", correct: true },
            { text: "function {...}", correct: false }
        ]
    },
     {
        question: "Which is the correct syntax of javaScript to generate random number?",
        answers: [
            { text: "Math.random()", correct: true },
            { text: "Math.rand()", correct: false },
            { text: "math.random()", correct: false },
            { text: "random()", correct: false }
        ]
    },
     {
        question: "Which is not the keyword in JavaScript?",
        answers: [
            { text: "break", correct: false },
            { text: "true", correct: false },
            { text: "function", correct: false },
            { text: "call", correct: true }
        ]
    },
     {
        question: "How many primitive data types are there in JavaScript?",
        answers: [
            { text: "6", correct: false },
            { text: "7", correct: true },
            { text: "4", correct: false },
            { text: "5", correct: false }
        ]
    },
     {
        question: "What is the output of : console.log(typeof null);",
        answers: [
            { text: "object", correct: true },
            { text: "null", correct: false },
            { text: "undefined", correct: false },
            { text: "string", correct: false }
        ]
    }
];


// showing the question and answers on DOM

const question = document.querySelector('.ask');
const answers = document.querySelector('ul');

let currentQuestionIndex = 0;
let QuestionIndeNumber = 1;
let answerCount = 1;
let compareAnsCount;

const countQuestions = document.querySelector('.questionCount');
let countqns = 0;

function displayQuestion(){
    countqns++;
    countQuestions.innerHTML = countqns;
    question.innerHTML = QuestionIndeNumber + '.  ' +qna[currentQuestionIndex].question;
       showAnswers();
    currentQuestionIndex++;
    QuestionIndeNumber++;
}
displayQuestion();

const container = document.querySelector('.container');

function showAnswers() {
     for(let i=0; i<4; i++){
         let li = document.createElement('li');
         li.setAttribute('tabindex', '0');
      li.innerHTML = qna[currentQuestionIndex].answers[i].text;
      answers.appendChild(li);
     }}

     let countResult = 0;
     function resetForNext(){
let ans = answers.querySelectorAll('li');

// Timer functionality
    let time = document.querySelector('.timer');
    let timeCount = 30;
        timer = ()=>{
        let id = setInterval(()=>{
            time.innerHTML = '00:'+ timeCount;
            timeCount--;
           if(timeCount<=14 && timeCount>4){
             container.style.background = 'rgba(200, 170, 0, 0.25)';
           }
           else if(timeCount<=4 && timeCount>-1){
             container.style.background = 'rgba(255, 0, 0, 0.3)';
           }
           else if(timeCount==-1){
            clearInterval(id);
            disable();
            alert('Time is up!');
           }

        },1000);

        // Event listener for each answer either correct or wrong

        ans.forEach((answer, index) => {
      answer.addEventListener('click', () => {
        console.log(qna[currentQuestionIndex-1].answers[index].correct);
        let correct = qna[currentQuestionIndex-1].answers[index].correct;
        if(correct){
            let span = document.createElement('span');
            span.innerHTML = 'Correct!';
            span.style.color = 'green';
            answer.appendChild(span);
            answer.classList.add('correct');
              disable();
              clearInterval(id);
              time.innerHTML = '00:'+ timeCount;
              correctAudio();
            countResult++;
        }
        else {
            let span = document.createElement('span');
            span.innerHTML = 'Wrong!';
            span.style.color = 'red';
            answer.appendChild(span);
            answer.classList.add('wrong');
              disable();
              clearInterval(id);
              time.innerHTML = '00:'+ timeCount;
              wrongAudio();
        }
      });
    });


    }

    timer();
    
    compareAnsCount = answerCount;

    function disable(){
        ans.forEach((answer) => {
            answer.classList.add('disabled');
        });
        answerCount++;
    }

}

 resetForNext();

//audio functionality

let Correct = new Audio('correct.wav');
let Wrong = new Audio('wrong.wav');
let Result = new Audio('result.wav');

function correctAudio() {
    Correct.play();
}

function wrongAudio() {
    Wrong.play();
}

function resultAudio() {
     Result.play();
}

function muteAudio() {
    Result.muted = true;
    Correct.muted = true;
    Wrong.muted = true;
}
function unmuteAudio() {
    Result.muted = false;
    Correct.muted = false;
    Wrong.muted = false;
}

    // Next question functionality

const result = document.querySelector('.final');
const h3 = document.querySelector('.result h3');
const resultShow = document.querySelector('h3 span');
const p = document.querySelector('.result p');
const progress = document.querySelector('.mark');
 const mark = document.querySelector('#mark');

   function next(){
     const next = document.querySelector('.next');
    next.addEventListener('click', () => {
        if(answerCount > compareAnsCount){
             let showResult = countResult * 10;
             if(currentQuestionIndex < qna.length){
            answers.innerHTML = '';  
             container.style.background = '#cce2c2';
            displayQuestion();
            resetForNext();
        }
        else {
          if(countResult == qna.length){
            resultAudio();
            progress.style.width = `${showResult}%`;
            mark.innerHTML = showResult + '%';
              resultShow.innerHTML = countResult;
           result.style.display = 'flex';
           p.innerHTML = 'Congratulations! You answered all questions correctly.';
          }
          else{
            resultAudio();
            progress.style.width = `${showResult}%`;
            mark.innerHTML = showResult + '%';
              resultShow.innerHTML = countResult;
           result.style.display = 'flex';
          }
        }
   }
   else{
    alert('Please select answer before moving to Next.');
   }
    });
   }
  
   next();