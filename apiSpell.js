const showCGlist = (guesses) => {
  const cgList = document.getElementsByClassName('cg');
  for (let index = 0; index < guesses.length; index++) {
    cgList[index].innerText = guesses[index];
  }
};

const sum = (a, b) => a + b;

const showTotal = (total) => {
  const totalBox = document.getElementsByClassName('total')[0];
  totalBox.innerText = total;
};

const updateTotal = (game) => {
  const total = game.stats.reduce(sum, 0);
  game.total = total;
  return total;
};

const updateStats = (game) => {
  const currentGuess = game.correctGuesses;
  const currentGuessLength = currentGuess[currentGuess.length - 1].length;
  const currentScore = game.scoreOnLength[currentGuessLength];
  game.stats.push(currentScore);
};

const resetGuessBox = () => {
  const guessBox = document.getElementById('guess-word');
  guessBox.value = '';
};

const resetGuessedWord = (game) => {
  game.guessedWord.length = 0;
};

const updateCGlist = (game) => {
  game.correctGuesses.push(game.guessedWord.join(''));
  resetGuessedWord(game);
  console.log(game.guessedWord);
};

const addWord = (game, letter) => {
  game.guessedWord.push(letter);
  return game.guessedWord.join('');
}

const validateGuess = (game) => {
  return game.guessedWord.includes(game.centerLetter) &&
    !game.correctGuesses.includes(game.guessedWord.join('')) &&
    game.validWords.includes(game.guessedWord.join(''))
};

const deleteLetter = (game) => {
  game.guessedWord.pop();
  return game.guessedWord.join('');
}

const showText = (text) => {
  const guessWord = document.getElementById('guess-word');
  guessWord.value = text;
};

const takeInput = (event) => {
  return event.target.innerText;
}

const main = () => {
  const game = {
    surroundLetters: ['I', 'T', 'R', 'P', 'J', 'E'],
    centerLetter: 'D',
    guessedWord: [],
    correctGuesses: [],
    stats: [],
    total: '',
    scoreOnLength: { '3': 1, '4': 3, '5': 7, '6': 9, '7': 11 },
    validWords: ['DEEP', 'DEPT', 'RIDER'],
  };

  const cellHolder = document.getElementsByClassName('cell-holder')[0];
  cellHolder.addEventListener('click', (event) => {
    const letter = takeInput(event);
    const word = addWord(game, letter);
    showText(word);
  });

  const guessValidator = document.getElementById('enter-button');
  guessValidator.addEventListener('click', (event) => {
    if (validateGuess(game)) {
      updateCGlist(game);
      showCGlist(game.correctGuesses);
      updateStats(game);
      const total = updateTotal(game);
      showTotal(total);
      resetGuessBox();
    };
  })

  const deleteTextControl = document.getElementById('delete-button');
  deleteTextControl.addEventListener('click', (event) => {
    const updatedText = deleteLetter(game);
    showText(updatedText);
  })

};

window.onload = main;
