let humanScore = 0;
let computerScore = 0;


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

function getHumanChoice(){
    const humanChoiceNum = +prompt(
        `Choose a letter from 1-3 representing the following choices:\n
        1. Rock\n
        2. Paper\n
        3. Scissors\n
        `);

    let humanChoice;

    switch (humanChoiceNum){
        case 1:
            humanChoice = "rock";
            break;
        case 2:
            humanChoice = "paper";
            break;
        case 3:
            humanChoice = "scissors";
            break;    
    }

    return humanChoice;
}


console.log(getComputerChoice())
console.log(getHumanChoice());