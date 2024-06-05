// Use "input()" to input a line from the user
// Use "input(str)" to print some text before requesting input
// You will need this in the following stages
const input = require('sync-input')

const wordArray = ["python", "java", "swift", "javascript"];
let wordIndex = Math.floor(Math.random() * wordArray.length);
let correctWord = wordArray[wordIndex];
let maskedWord = correctWord.replace(/./g, "-");
let trials;
let guessedLetters;
let wins = 0;
let losses = 0;

function menu() {
    let menuInput = input("Type \"play\" to play the game, \"results\" to show the scoreboard, and \"exit\" to quit: ");
    switch (menuInput) {
        case "play":
            play();
            break;
        case "results":
            showResults();
            break;
        case "exit":
            exit();
            break;
    }
}

function play() {
    wordIndex = Math.floor(Math.random() * wordArray.length);
    correctWord = wordArray[wordIndex];
    maskedWord = correctWord.replace(/./g, "-");
    trials = 8;
    guessedLetters = [];
    askUser();
}

function showResults() {
    console.log("You won: " + wins + " times.");
    console.log("You lost: " + losses + " times.");
    menu();
}

function exit() {
    process.exit();
}

function checkStatus() {
    if (trials === 0) {
        console.log("");
        console.log("You lost!");
        losses += 1;
    } else if (maskedWord === correctWord) {
        console.log("");
        console.log("You guessed the word " + correctWord + "!");
        console.log("You survived!");
        wins += 1;
    } else if (maskedWord !== correctWord) {
        askUser();
    }
    menu();
}

function replaceAt(str, index, replacement) {
    return str.substring(0, index) + replacement + str.substring(index + 1);
}

function askUser() {
    console.log("");
    console.log(maskedWord);
    let userInput = input("Input a letter: ");

    if (userInput.length !== 1) {
        console.log("Please, input a single letter.");
        checkStatus();
    } else if (!userInput.match(/[a-z]/)) {
        console.log("Please, enter a lowercase letter from the English alphabet.");
        checkStatus();
    } else {
        if (maskedWord.includes(userInput) || guessedLetters.includes(userInput)) {
            console.log("You've already guessed this letter.");
            checkStatus();
        } else if (correctWord.includes(userInput)) {
            for (let i = 0; i < correctWord.length; i++) {
                if (correctWord[i] === userInput) {
                    maskedWord = replaceAt(maskedWord, i, userInput);
                }
            }
            guessedLetters += userInput;
            checkStatus();
        } else {
            console.log("That letter doesn't appear in the word.");
            trials -= 1;
            guessedLetters += userInput;
            checkStatus();
        }
    }
}

console.log(`H A N G M A N`);

menu();