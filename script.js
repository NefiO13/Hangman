// Word List
const wordList = [
    'gold',
    'luck',
    'clover',
    'rain',
    'charm',
    'parade',
    'leprechaun',
    'treasure',
    'celebration',
    'greenery',
    'shenanigans',
    'tradition'
]

//decare variables
let selectedWord = ''
let displayedWord = ''
let wrongGuesses = 0
let guessedLetters = [];
const maxMistakes = 4;
const guessedWords = [];
let winAmount = 0
let loseAmount = 0


const scoreboard = document.getElementById('scoreboard');
const letterInput = document.getElementById('letterInput')
const shamrockImage = document.getElementById('shamrock');
const guessButton = document.getElementById('guessButton')



const winSound = new Audio('sounds/correct-293359.mp3')
const loseSound = new Audio('sounds/buzzer-or-wrong-answer-20582.mp3')


const updateScoreboard = () => {
    scoreboard.innerHTML = `Wins: ${winAmount} | Loses: ${loseAmount}`;
};

// Start Game Function (runs everything)
function startGame(level) {
    //reset game
    wrongGuesses = 0
    guessedLetters = []

    selectedWord = getRandomWord(level)
    displayedWord = '_'.repeat(selectedWord.length)

    updateDifficultyDisplay(level)
    updateUI()
    updateScoreboard();

    shamrockImage.src = `imgs/images6.jpg`

    //Show Game Area/Difficulty Display , hide selection buttons
    document.getElementById('gameArea').classList.remove('d-none')
    document.getElementById('gameArea').classList.add('d-block')

    document.getElementById('difficultyBox').classList.remove('d-none')
    document.getElementById('difficultyBox').classList.add('d-block')


    document.getElementById('difficultySelection').classList.add('d-none')
    //Auto-focus on input

    letterInput.disabled = false;
    guessButton.disabled = false;

    document.getElementById('letterInput').focus()
}

function getRandomWord(level) {
    let filteredWords = wordList.filter(word => {
        if (level === 'easy') return word.length <= 4
        if (level === 'medium') return word.length >= 5 && word.length <= 7
        if (level === 'hard') return word.length >= 8
    });
    return filteredWords[Math.floor(Math.random() * filteredWords.length)]
}

//update Difficulty Display
function updateDifficultyDisplay(level) {
    let difficultyBox = document.getElementById('difficultyBox')
    difficultyBox.classList.remove('easy', 'medium', 'hard')

    if (level === 'easy') {
        difficultyBox.textContent = 'Difficulty: Easy 🍀'
        difficultyBox.classList.add('easy')
    } else if (level === 'medium') {
        difficultyBox.textContent = 'Difficulty: Medium 🌟'
        difficultyBox.classList.add('medium')
    } else if (level === 'hard') {
        difficultyBox.textContent = 'Difficulty: Hard 💀'
        difficultyBox.classList.add('hard')
    }
}

function updateUI() {
    document.getElementById('wordDisplay').textContent = displayedWord.split('').join('  ') // Show word progress with spaces
    document.getElementById('wrongLetters').textContent = `Wrong Guesses: `;
}

function guessLetter() {
    let inputField = document.getElementById('letterInput') // Get input field
    let guessedLetter = inputField.value.toLowerCase() // Convert input to lowercase

    //Check if input is a valid letter (A-Z)
    if (!guessedLetter.match(/^[a-z]$/)) {
        alert('Please enter a valid letter (A-Z)!') // Alert user if invalid input
        inputField.value = ''; // Clear input field
        return; // Exit function
    }


    //Check if letter was already guessed
    if (guessedLetters.includes(guessedLetter)) {
        alert(`You already guessed '${guessedLetter}'. Try a different letter!`)
        inputField.value = ''; // Clear input field
        return;
    }

    //Store guessed letter
    guessedLetters.push(guessedLetter);

    //Check if guessed letter is in the selected word
    if (selectedWord.includes(guessedLetter)) {
        updateCorrectGuess(guessedLetter)
    } else {
        updateWrongGuess(guessedLetter)
    }

    inputField.value = '' // Clear input field
    document.getElementById('letterInput').focus() // Refocus input field for next guess

}
function updateWrongGuess(guessedLetter) {
    wrongGuesses++;
    document.getElementById('wrongLetters').textContent += `${guessedLetter}`;
    shamrockImage.src = `imgs/images${4 - wrongGuesses}.jpg`; // Use template literals for cleaner string interpolation



    setTimeout(() => {
        loseSound.play();
    }, 50); // Correct setTimeout syntax

    console.log(wrongGuesses);

    if (wrongGuesses === maxMistakes) {
        endGame(false);
    }
}

function updateCorrectGuess(guessedLetter) {
    let newDisplayedWord = ''

    for (let i = 0; i < selectedWord.length; i++) {
        if (selectedWord[i] === guessedLetter) {
            newDisplayedWord += guessedLetter // Replace underscore with correct letter
        } else {
            newDisplayedWord += displayedWord[i] // Keep existing correct letters
        }
    }

    displayedWord = newDisplayedWord;
    updateUI();

    //  Check if the player has guessed all letters
    if (!displayedWord.includes('_')) {
        endGame(true)
    }

}

function endGame(won) {
    let message = document.getElementById('gameMessage')
    if (won) {

        winSound.play()
        setTimeout(() => alert(`You guessed The word! Congrats`), 50)
        winAmount++
    } else {
        loseSound.play()
        setTimeout(() => alert(`You guessed wrong, the word is ${selectedWord}`), 100)
        loseAmount++
    }

    letterInput.disabled = true;
    guessButton.disabled = true;

    updateScoreboard();

}

document.getElementById('letterInput').addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        guessLetter();
    }
});

function restartGame() {
    wrongGuesses = 0
    selectedWord = ''
    displayedWord = ''
    guessedLetters = [];


    document.getElementById('wrongLetters').textContent = `Wrong Guesses: `
    document.getElementById('letterInput').value = ''

    document.getElementById('difficultySelection').classList.remove('d-none')
    document.getElementById('difficultySelection').classList.remove('d-none')
    document.getElementById('gameArea').classList.add('d-none');
    document.getElementById('gameArea').classList.add('d-none');
    document.getElementById('difficultyBox').classList.add('d-none');

    shamrockImage.src = `imgs/images4.jpg`;

    //stop sounds//
    winSound.pause();
    winSound.currentTime = 0;
    loseSound.pause();
    loseSound.currentTime = 0;

    //enable buttons again//
    letterInput.disabled = false;
    guessButton.disabled = false;
}
