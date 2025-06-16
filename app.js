
//Sound functionality mute and unmute

const i = document.querySelector('i');
i.addEventListener('click', () => {
   if(i.classList.contains('fa-volume-high')) {
        i.classList.remove('fa-volume-high');
        i.classList.add('fa-volume-xmark');
   }
   else {
        i.classList.remove('fa-volume-xmark');
        i.classList.add('fa-volume-high');
   }
})

// Collection of questions and answers

const qna = [
    {
        question: "What is the capital of France?",
        answers: [
            { text: "Berlin", correct: false },
            { text: "Madrid", correct: false },
            { text: "Paris", correct: true },
            { text: "Rome", correct: false }
        ]
    },
    {
        question: "What is 2 + 2?",
        answers: [
            { text: "3", correct: false },
            { text: "4", correct: true },
            { text: "5", correct: false },
            { text: "6", correct: false }
        ]
    }
    ,
     {
        question: "What is 2 + 2?",
        answers: [
            { text: "3", correct: false },
            { text: "4", correct: true },
            { text: "5", correct: false },
            { text: "6", correct: false }
        ]
    },
     {
        question: "What is 2 + 2?",
        answers: [
            { text: "3", correct: false },
            { text: "4", correct: true },
            { text: "5", correct: false },
            { text: "6", correct: false }
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
    const container = document.querySelector('.container');
        timer = ()=>{
        let id = setInterval(()=>{
            timeCount--;
            time.innerHTML = '00:'+ timeCount;
           if(timeCount<=15 && timeCount>5){
             container.style.background = 'rgba(200, 170, 0, 0.25)';
           }
           else if(timeCount<=5 && timeCount>0){
             container.style.background = 'rgba(255, 0, 0, 0.3)';
           }
           else if(timeCount==0){
            alert('Time is up!');
            clearInterval(id);
            disable();
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

    // Next question functionality

const result = document.querySelector('.final');
const h3 = document.querySelector('.result h3');
const resultShow = document.querySelector('h3 span');
const p = document.querySelector('.result p');

   function next(){
     const next = document.querySelector('.next');
    next.addEventListener('click', () => {
        if(answerCount > compareAnsCount){
             if(currentQuestionIndex < qna.length){
            answers.innerHTML = '';  
            displayQuestion();
            resetForNext();
        }
        else {
          if(countResult == qna.length){
              resultShow.innerHTML = countResult;
           result.style.display = 'flex';
           p.innerHTML = 'Congratulations! You answered all questions correctly.';
          }
          else{
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