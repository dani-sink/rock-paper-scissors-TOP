const rockButton = document.querySelector("#rock-btn");
const paperButton = document.querySelector("#paper-btn");
const scissorsButton = document.querySelector("#scissors-btn");

let humanScore = 0;
let computerScore = 0;
let numRounds = 1
let roundsSummary = []

const h3 = document.createElement('h3');
const div = document.querySelector('#results-ctn');
const paraOne = document.createElement('p');
const paraTwo = document.createElement('p');
const paraThree = document.createElement('p');
const divTwo = document.createElement('div');
const paraFour = document.createElement('p');
const h2 = document.createElement('h2');
const roundText = document.createElement('h2');
const gameSummaryText = document.createElement("h2");


div.appendChild(roundText)
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

function capitalize(s){
    return String(s)[0].toUpperCase() + String(s).slice(1);
}


const playRound = function(playerChoice) {
    let computerSelection = getComputerChoice();
    paraOne.textContent = `Player Choice: ${playerChoice.toUpperCase()}`;
    paraTwo.textContent = `Computer Choice: ${computerSelection.toUpperCase()}`;
    paraThree.style.fontWeight = "600";
    let roundWinner = ""
    switch(playerChoice){
        case 'rock':
            if (computerSelection === 'rock'){
                paraThree.textContent = "It's a tie! Rock does not win against itself. No points alloted for anyone.";
                paraThree.style.color = "#F5B800" // yellow
                roundWinner = "Tie";
            } else if (computerSelection === 'paper'){
                paraThree.textContent = "You lose! Paper beats Rock. The computer gets one point.";
                paraThree.style.color = "#A30003" // red
                computerScore++;
                roundWinner = "Computer";
            } else if (computerSelection === 'scissors') {
                paraThree.textContent = "You win! Rock beats Scissors. You get one point.";
                paraThree.style.color = "#11691A"; // green
                humanScore++;
                roundWinner = "Player";
            }
            break;
        case 'paper':
            if (computerSelection === 'rock'){
                paraThree.textContent = "You win! Paper beats Rock. You get one point.";
                paraThree.style.color = "#11691A"; // green
                humanScore++;
                roundWinner = "Player";
            } else if (computerSelection === 'paper'){
                paraThree.textContent = "It's a tie! Paper does not win against itself. No points alloted for anyone.";
                paraThree.style.color = "#F5B800" // yellow
                roundWinner = "Tie";
            } else if (computerSelection === 'scissors') {
                paraThree.textContent = "You lose! Scissors beats Paper. The computer gets one point.";
                paraThree.style.color = "#A30003" // red
                computerScore++;
                roundWinner = "Computer";
            }
            break;
        case 'scissors':
            if (computerSelection === 'rock'){
                paraThree.textContent = "You lose! Rock beats Scissors. The computer gets one point.";
                paraThree.style.color = "#A30003" // red
                computerScore++
                roundWinner = "Computer";
            } else if (computerSelection === 'paper'){
                paraThree.textContent = "You win! Scissors beats Paper. You get one point.";
                paraThree.style.color = "#11691A"; // green
                humanScore++;
                roundWinner = "Player";
            } else if (computerSelection === 'scissors') {
                paraThree.textContent = "It's a tie! Scissors does not win against itself. No points alloted for anyone.";
                paraThree.style.color = "#F5B800" // yellow 
                roundWinner = "Tie";
            }
            break;
    }
    roundText.textContent = `Round ${numRounds}`;
    h3.textContent = `Score --> (PLAYER) ${humanScore} : ${computerScore} (COMPUTER)`;
    roundsSummary.push({
        playerChoice,
        computerChoice: computerSelection,
        round: numRounds++,
        roundWinner
    });
    if (humanScore === 5 || computerScore === 5){
        rockButton.remove();
        paperButton.remove();
        scissorsButton.remove();
        let event = new CustomEvent('game-end', {
            detail: {
                message: humanScore === 5 ? 
                "You won. Good job!" : "You lost. No sweat. Try your luck again!",
                color: humanScore === 5 ? "#11691A" : "#A30003",
            }
        });
        div.dispatchEvent(event);
    }
}

function resetGame(){
    location.reload()
}

function selectPlayerChoice(event){
    if (event.target.id === "rock-btn" || event.target.parentElement.id === "rock-btn"){
        playRound('rock');   
    } else if (event.target.id === "paper-btn" || event.target.parentElement.id === "paper-btn") {
        playRound('paper');
    } else if (event.target.id === "scissors-btn" || event.target.parentElement.id === "scissors-btn") {
        playRound('scissors');
    }
}


function createTable(statsTable){
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');
    const tr = document.createElement('tr');
    const roundHeader = document.createElement('th');
    const playerChoiceHeader = document.createElement('th');
    const computerChoiceHeader = document.createElement('th');
    roundHeader.textContent = "Round";
    playerChoiceHeader.textContent = "Player Choice";
    computerChoiceHeader.textContent = "Computer Choice";
    tr.appendChild(roundHeader);
    tr.appendChild(playerChoiceHeader);
    tr.appendChild(computerChoiceHeader);
    thead.appendChild(tr)
    statsTable.appendChild(thead);
    roundsSummary.forEach(function(roundInfo){
        const roundWinner = roundInfo.roundWinner;
        const tr = document.createElement('tr');
        const roundNumberInfo = document.createElement('th');
        const playerChoiceInfo = document.createElement('th');
        const computerChoiceInfo = document.createElement('th');
        roundNumberInfo.textContent = roundInfo.round;
        playerChoiceInfo.textContent = capitalize(roundInfo.playerChoice);
        playerChoiceInfo.style.backgroundColor = roundWinner === "Player" ? "#11691A" : roundWinner === "Computer" ? "#A30003" : "#F5B800";
        playerChoiceInfo.style.color = roundWinner === "Player" ? "#fff" : roundWinner === "Computer" ? "#fff" : "#000";
        computerChoiceInfo.textContent = capitalize(roundInfo.computerChoice);
        computerChoiceInfo.style.backgroundColor = roundWinner === "Computer" ? "#11691A" : roundWinner === "Player" ? "#A30003" : "#F5B800";
        computerChoiceInfo.style.color = roundWinner === "Player" ? "#fff" : roundWinner === "Computer" ? "#fff" : "#000";
        tr.appendChild(roundNumberInfo);
        tr.appendChild(playerChoiceInfo);
        tr.appendChild(computerChoiceInfo);
        tbody.append(tr);
    })
    statsTable.appendChild(tbody);
}

function showResults(event) {
    paraFour.textContent = event.detail.message;
    paraFour.style.color = event.detail.color;
    paraFour.style.fontWeight = "600";
    rockButton.disabled = true;
    paperButton.disabled = true;
    scissorsButton.disabled = true;
    const statsTable = document.createElement('table');
    createTable(statsTable);
    h2.textContent = `FINAL SCORE --> (PLAYER) ${humanScore} : ${computerScore} (COMPUTER)`;
    gameSummaryText.textContent = "Game Summary"
    gameSummaryText.style.marginTop = "20px";
    const button = document.createElement('button');
    button.textContent = 'PLAY AGAIN';
    button.addEventListener('click', resetGame);
    div.appendChild(paraFour);
    div.appendChild(h2);
    div.appendChild(button);
    div.appendChild(gameSummaryText);
    div.appendChild(statsTable);
}

rockButton.addEventListener('click', selectPlayerChoice);
paperButton.addEventListener('click', selectPlayerChoice);
scissorsButton.addEventListener('click', selectPlayerChoice);
div.addEventListener('game-end', showResults)
