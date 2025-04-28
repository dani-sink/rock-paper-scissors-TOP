const rockButton = document.querySelector("#rock-btn");
const paperButton = document.querySelector("#paper-btn");
const scissorsButton = document.querySelector("#scissors-btn");

let humanScore = 0;
let computerScore = 0;

const h3 = document.createElement('h3');
const div = document.querySelector('#results-ctn');
const paraOne = document.createElement('p');
const paraTwo = document.createElement('p');
const paraThree = document.createElement('p');
const divTwo = document.createElement('div');
const paraFour = document.createElement('p');
const h2 = document.createElement('h2');



div.appendChild(paraOne);
div.appendChild(paraTwo);
div.appendChild(paraThree);
div.appendChild(h3);


function getComputerChoice(){
    const computerChoiceNum = Math.floor(Math.random() * 3) + 1;
    let computerChoice;
    switch (computerChoiceNum) {
        case 1:
            computerChoice = "rock";
            break;
        case 2:
            computerChoice = "paper";
            break;
        case 3:
            computerChoice = "scissors";
            break;
    }
    return computerChoice;
}


const playRound = function(playerChoice) {
    let computerSelection = getComputerChoice();
    paraOne.textContent = `Player Choice: ${playerChoice.toUpperCase()}`;
    paraTwo.textContent = `Computer Choice: ${computerSelection.toUpperCase()}`;
    switch(playerChoice){
        case 'rock':
            if (computerSelection === 'rock'){
                paraThree.textContent = "It's a tie! Rock does not win against itself. No points alloted for anyone.";
                
            } else if (computerSelection === 'paper'){
                paraThree.textContent = "You lose! Paper beats Rock. The computer gets one point.";
                computerScore++;
            } else if (computerSelection === 'scissors') {
                paraThree.textContent = "You win! Rock beats Scissors. You get one point.";
                humanScore++;
            }
            break;
        case 'paper':
            if (computerSelection === 'rock'){
                paraThree.textContent = "You win! Paper beats Rock. You get one point.";
                humanScore++;
            } else if (computerSelection === 'paper'){
                paraThree.textContent = "It's a tie! Paper does not win against itself. No points alloted for anyone.";
            } else if (computerSelection === 'scissors') {
                paraThree.textContent = "You lose! Scissors beats Paper. The computer gets one point.";
                computerScore++;
            }
            break;
        case 'scissors':
            if (computerSelection === 'rock'){
                paraThree.textContent = "You lose! Rock beats Scissors. The computer gets one point.";
                computerScore++
            } else if (computerSelection === 'paper'){
                paraThree.textContent = "You win! Scissors beats Paper. You get one point.";
                humanScore++;
            } else if (computerSelection === 'scissors') {
                paraThree.textContent = "It's a tie! Scissors does not win against itself. No points alloted for anyone.";
            }
            break;
    }
    h3.textContent = `Score --> (PLAYER) ${humanScore} : ${computerScore} (COMPUTER)`;
    if (humanScore === 5 || computerScore === 5){
        let event = new CustomEvent('game-end', {
            detail: {
                message: humanScore === 5 ? 
                "You won. Good job!" : "You lost. No sweat. Try your luck again!"
            }
        });
        div.dispatchEvent(event);
    }
}

function resetGame(event){
    humanScore = 0;
    computerScore = 0;
    paraOne.textContent = "";
    paraTwo.textContent = "";
    paraThree.textContent = "";
    h3.textContent = "";
    divTwo.textContent = "";
    paraFour.textContent = "" ;
    h2.textContent = "" ;
    rockButton.disabled = false;
    paperButton.disabled = false;
    scissorsButton.disabled = false;
    event.target.remove();
}

function selectPlayerChoice(event){
    switch (event.target.id){
        case "rock-btn":
            playRound('rock');
            break;
        case "paper-btn":
            playRound('paper');
            break;
        case "scissors-btn":
            playRound('scissors');
            break;            
    }
}

rockButton.addEventListener('click', selectPlayerChoice);
paperButton.addEventListener('click', selectPlayerChoice);
scissorsButton.addEventListener('click', selectPlayerChoice);
div.addEventListener('game-end', function(e) {
    paraFour.textContent = e.detail.message;
    rockButton.disabled = true;
    paperButton.disabled = true;
    scissorsButton.disabled = true;
    h2.textContent = `FINAL SCORE --> (PLAYER) ${humanScore} : ${computerScore} (COMPUTER)`;
    const button = document.createElement('button');
    button.textContent = 'PLAY AGAIN';
    button.addEventListener('click', resetGame);
    div.appendChild(paraFour);
    div.appendChild(h2);
    div.appendChild(button);
    document.body.appendChild(div);
})
