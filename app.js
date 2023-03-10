const secret = 6;
let currentPlayer = "";
let scoreboard = {};
let playAgain = "";

// Messages //
let initialMgs =`Let's play a game. \nBetween 0 and 100, what number am I thinking of?`;
let playAgainMsg = `Between 0 and 100, what number am I thinking of?`;
let validationMsg = `That was not a valid input, please try again.`;

playGame();

function playGame() {
    while (true) {
        if (playAgain === "Y" || playAgain === "y") {
            askName(); //returns 'new' currentPlayer
            let input = askInput();
            guessNumber(input, currentPlayer);
        } else if (playAgain === "N" || playAgain === "n") { //exits game
            alert(`Thank you for playing!`);
            break
        } else {
            askName(); //returns currentPlayer
            let input = askInput();
            guessNumber(input, currentPlayer);
        }
    }
}

function askName() {
    let name = prompt("What is your name?");
    currentPlayer = name.toUpperCase();
    return currentPlayer;
}

function askInput() {
    let input = 0;
    if (playAgain === "") { // at first play
        input = parseInt(prompt(initialMgs));
    } else if (playAgain === "Y" || playAgain === "y") {
        input = parseInt(prompt(playAgainMsg));
    } 
    while (isNaN(input) || input < 0 || input > 100) {
        input = parseInt(prompt(`${validationMsg} \n${playAgainMsg}`))  // asks until input is validated
    }
    return input;
}

function guessNumber(input, currentPlayer) {
    let guessHigherMsg = `Sorry ${currentPlayer}, guess Higher.`; 
    let guessLowerMsg = `Sorry ${currentPlayer}, guess Lower.`; 
    let previousGuesses = [];
    while (true) {
        let tallyMsg = "";
        if (input === secret) {
            previousGuesses.push(input);
            if (!scoreboard[currentPlayer]) {  // playing 1st time
                keepingScores(currentPlayer, previousGuesses.length); // returns scoreboard
                playAgain = prompt(`That is Correct ${currentPlayer}! Your previous guesses were ${previousGuesses}! \nWhant to play again? (Enter "Y" or "N")`);
                return playAgain;
            } else if (scoreboard[currentPlayer]['best score'] > previousGuesses.length) { // best score
                keepingScores(currentPlayer, previousGuesses.length); // returns scoreboard
                tallyMsg = scoreboard[currentPlayer].bestScore - previousGuesses.length;
                playAgain = prompt(`Correct ${currentPlayer}! And you beat your previous attempt by ${tallyMsg} fewer guesses! \nWhant to play again? (Enter "Y" or "N")`);
                return playAgain;
            } else { // does worse
                keepingScores(currentPlayer, previousGuesses.length); // returns scoreboard
                tallyMsg = previousGuesses.length - scoreboard[currentPlayer].bestScore;
                playAgain = prompt(`Correct ${currentPlayer}! You did better in your last game by ${tallyMsg} fewer guesses! \nWhant to play again? (Enter "Y" or "N")`);
                return playAgain;
            }
        } else if (input < secret) {
            previousGuesses.push(input);
            input = parseInt(prompt(guessHigherMsg));
            while (isNaN(input) || input < 0 || input > 100) {
                input = parseInt(prompt(`${validationMsg} \n${guessHigherMsg}`));
            }
        } else if (input > secret) {
            previousGuesses.push(input);
            input = parseInt(prompt(guessLowerMsg));
            while (isNaN(input) || input < 0 || input > 100) {
                input = parseInt(prompt(`${validationMsg} \n${guessLowerMsg}`));
            }
        }
    }
}

function keepingScores(name, count) {
    if (scoreboard[name] && (scoreboard[name][bestScore] > count)) {
        scoreboard[name][bestScore] = count;
    } else {
        scoreboard[name] = ({player: name, bestScore: count});
    }
    console.log(scoreboard);
    return scoreboard;
}
