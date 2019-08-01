// I made index 0 = lose, 1 = draw, 2 = win
const game = {
    rock: ['paper','rock','scissors'],
    paper: ['scissors','paper','rock'],
    scissors: ['rock','scissors','paper'],
};

// middle variable
let msg = document.querySelector('.mid-msg');
let humanMidImg = document.querySelector('img.mid-img-human');
let compMidImg = document.querySelector('img.mid-img-comp');
let resetBtn = document.querySelector('.reset');

//function for each condition
const win = () => {
    human_score++;
    msg.innerHTML =  ' beats ';
};

const lose = () => {
    comp_score++;
    msg.innerHTML =  ' beaten by ';
};

const draw = () => {
    msg.innerHTML =  ' x ';
}

const hideAll = () => {
    button.forEach(btns =>{
        btns.classList.add('hidden');
    });
    humanMidImg.classList.add('hidden');
    compMidImg.classList.add('hidden');
}

// variable for score
let human_score = 0;
let comp_score = 0;

// query selector
const score = document.querySelector('.score');
const player = document.querySelectorAll('.human > *');
const button = document.querySelectorAll('.button > *')

// human & computer picks their fingers
player.forEach(button => button.addEventListener("click", clicked =>{
    let computerBtn = document.querySelector(`.computer > .${computerPlay()}`);
    startGame(clicked.target.className, computerBtn.className);
    
    // change color
    clicked.target.classList.add('selected');
    computerBtn.classList.add('selected');
    
    // update score
    score.innerHTML = human_score + " ; " + comp_score;


}));

const computerPlay = () => {
	const move = ['rock', 'paper', 'scissors'];
	return move[Math.floor(Math.random() * 3)];
};

// game function
const startGame = (human, computer) => {
    //find index
    const result = game[human]
    .findIndex(elem=>{
        return elem === computer;
    });

    // picking condition
    switch(result){
        case 0: 
            lose();
            break;
        case 1: 
            draw(); 
            break;
        case 2: 
            win();
            break;
    }
    console.log(human+computer);

    //output
    if(human_score === 5){
        msg.innerHTML =  "Human win";
        humanMidImg.src = '';
        compMidImg.src = '';
        hideAll();
        resetBtn.classList.remove('hidden');
    } else
    if(comp_score === 5){
        msg.innerHTML = "Computer win";
        humanMidImg.src = '';
        compMidImg.src = '';
        hideAll();
        resetBtn.classList.remove('hidden');
    } else {
        humanMidImg.src = 'img/'+human+'.svg';
        compMidImg.src = 'img/'+computer+'.svg';
    }
}

// reset color
button.forEach(btn => btn.addEventListener('transitionend', element => {
	element.target.classList.remove('selected');
}));

// reset button
const reset = () =>{
    human_score = 0;
    comp_score = 0;
    button.forEach(btns =>{
        btns.classList.remove('hidden');
    });
    button.forEach(btns =>{
        btns.classList.remove('selected');
    });
    humanMidImg.classList.remove('hidden');
    compMidImg.classList.remove('hidden');
    msg.innerHTML = "Pick one!";
    resetBtn.classList.add('hidden');
    score.innerHTML = human_score + " ; " + comp_score;
}

resetBtn.addEventListener('click', ()=>{
    reset();
})