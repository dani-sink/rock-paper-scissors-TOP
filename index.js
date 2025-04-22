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


function playGame(){
    let humanScore = 0;
    let computerScore = 0;
    const playRound = function() {
        let humanSelection = getHumanChoice();
        let computerSelection = getComputerChoice();
        console.log(`Player Choice: ${humanSelection.toUpperCase()}`);
        console.log(`Computer Choice: ${computerSelection.toUpperCase()}`);
        switch(humanSelection){
            case 'rock':
                if (computerSelection === 'rock'){
                    console.log("It's a tie! Rock does not win against itself. No points alloted for anyone.");
                } else if (computerSelection === 'paper'){
                    console.log("You lose! Paper beats Rock. The computer gets one point.");
                    computerScore++;
                } else if (computerSelection === 'scissors') {
                    console.log("You win! Rock beats Scissors. You get one point.");
                    humanScore++;
                }
                break;
            case 'paper':
                if (computerSelection === 'rock'){
                    console.log("You win! Paper beats Rock. You get one point.");
                    humanScore++;
                } else if (computerSelection === 'paper'){
                    console.log("It's a tie! Paper does not win against itself. No points alloted for anyone.");
                } else if (computerSelection === 'scissors') {
                    console.log("You lose! Scissors beats Paper. The computer gets one point.");
                    computerScore++;
                }
                break;
            case 'scissors':
                if (computerSelection === 'rock'){
                    console.log("You lose! Rock beats Scissors. The computer gets one point.");
                    computerScore++
                } else if (computerSelection === 'paper'){
                    console.log("You win! Scissors beats Paper. You get one point.");
                    humanScore++;
                } else if (computerSelection === 'scissors') {
                    console.log("It's a tie! Scissors does not win against itself. No points alloted for anyone.");
                }
                break;
        }
    }

    for (let i = 0; i < 5; ++i){
        playRound();
        console.log(`****** SCORE SO FAR *****`);
        console.log(`(PLAYER) ${humanScore} - ${computerScore} (COMPUTER)`);
    }

    console.log('\n\n******* FINAL SCORE ********');
    console.log(`(PLAYER) ${humanScore} - ${computerScore} (COMPUTER)`)
}

playGame()