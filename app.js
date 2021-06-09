const addBtn = document.querySelector('.add-btn');
const closeBtn = document.querySelector('.close-btn');
const addCardPage = document.querySelector('.add-card-wrap');
const addForm = document.querySelector('.add-form');
const questionInput = document.querySelector('#question-area');
const answerInput = document.querySelector('#answer-area');
const card = document.querySelector('.card');
const currentNum = document.querySelector('.current-num');
const totalNum = document.querySelector('.total-num');
const clearBtn = document.querySelector('.clear-btn');
const cardText = document.querySelector('.text');
const backBtn = document.querySelector('.back');
const nextBtn = document.querySelector('.next');
const flip = document.querySelector('.flip');

let cardInfo = [];
let currentCardNum = 1;
const MemCard_LS = 'memoryCards';

// Local Storage
function saveCard(){
    localStorage.setItem(MemCard_LS, JSON.stringify(cardInfo));
    window.location.reload();
}

function loadCard(){
    cardInfo = JSON.parse(localStorage.getItem(MemCard_LS)) || [];
}

function restoreCard(){
    if(cardInfo.length === 0){
        return false;
    }
    displayCard();
}

// Make Card
function displayCard(){
    currentNum.innerText = currentCardNum;
    totalNum.innerText = cardInfo.length;
    cardText.innerText = cardInfo[currentCardNum-1].question;
    flip.innerText = 'Click card to see the Answer';
    cardText.style.color = 'black';
}

function displayAnswer(){
    cardText.innerText = cardInfo[currentCardNum-1].answer;
    flip.innerText = 'Click card to see the Question';
    cardText.style.color = 'red';
}

function nextCard(){
    if(currentCardNum === cardInfo.length){
        currentNum.innerText = currentCardNum;
        displayCard();
    } else{
        currentCardNum++;
        currentNum.innerText = currentCardNum ;
        displayCard();
    }
}

function prevCard(){
    if(currentCardNum === 1){
        currentNum.innerText = currentCardNum;
        displayCard();
    } else{
        currentCardNum--;
        currentNum.innerText = currentCardNum ;
        displayCard();
    }
}

// Event Listeners
addBtn.addEventListener('click', () => {
    addCardPage.classList.add('show');
});

closeBtn.addEventListener('click', () => {
    addCardPage.classList.remove('show');
});

clearBtn.addEventListener('click', () =>{
    localStorage.clear();
    window.location.reload();
});

card.addEventListener('click', (e) => {
    const wrap = e.target;
    const textWrap = wrap.querySelector('.text');
    const text = textWrap.innerText;
    if(text === cardInfo[currentCardNum-1].question){
        displayAnswer();
    } else {
        displayCard();
    }
});

addForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const question = questionInput.value.trim();
    const answer = answerInput.value.trim();

    const cardObj = {
        question,
        answer,
    };

    cardInfo.push(cardObj);
    displayCard();
    saveCard();

    questionInput.value = '';
    answerInput.value = '';

    addCardPage.classList.remove('show');
});

backBtn.addEventListener('click', prevCard);

nextBtn.addEventListener('click', nextCard);

// Initial Setting
loadCard();
restoreCard();