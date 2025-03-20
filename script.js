//Word List
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

//Declare Variables
let selectedWord = ''
let displayedWord = ''
let wrongGuesses = 0
let guessedLetters = []
const maxMistakes = 6
//Start Game function runs everything

function startGame(level) {
    //reset game
    wrongGuesses = 0
    guessedLetter = []

    selectedWord = getRandomWord(level)
    displayedWord = '_ '.repeat(selectedWord.length)
    updateDifficultyDisplay(level)
    updateUI()

    //Show game area and display als o hide selection button
    document.getElementById('gameArea').classList.remove('d-none')
    document.getElementById('gameArea').classList.add('d-block')

    document.getElementById('difficultyBox').classList.remove('d-none')
    document.getElementById('difficultyBox').classList.remove('d-block')

    document.getElementById('difficultySelection').classList.add('d-none')

    document.getElementById('letterInput').focus()
}



function getRandomWord(level) {
    let filteredWords = wordList.filter(word => {
        if (level === 'easy') return word.length <= 4
        if (level === 'medium') return word.length >= 5 && word.length <= 7
        if (level === 'hard') return word.length >= 8
    })
    return filteredWords[Math.floor(Math.random() * filteredWords.length)]
}

//update difficulty display
function updateDifficultyDisplay(level) {
    let difficultyBox = document.getElementById('difficultyBox')
    difficultyBox.classList.remove('easy', 'medium', 'hard')

    if (level === 'easy') {
        difficultyBox.textContent = 'Difficulty: Easy'
        difficultyBox.classList.add('easy')
    } else if (level === 'medium') {
        difficultyBox.textContent = 'Difficulty: Medium'
        difficultyBox.classList.add('medium')
    } else if (level === 'hard') {
        difficultyBox.textContent = 'Difficulty: Hard'
        difficultyBox.classList.add('hard')
    }


}

function updateUI() {
    document.getElementById('wordDisplay').textContent = displayedWord.split('').join('')
}

guessedLetter() {
    let inputField = document.getElementById('letterInput')
    let guessedLetter = inputField.value.toLowerCase()

    //check for valid input
    if (guessedLetter.match(/^[a-z]$/)) {
        alert('Please enter a valid letter(A-Z)!') //alerts user that the input was invalid
        inputField.value = ''
        return
    }

}