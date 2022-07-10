const sum = (a, b) => a + b;

class Apishell {
  constructor() {
    this.centerLetter = 'D';
    this.surroundLetters = ['I', 'T', 'R', 'P', 'J', 'E'];
    this.guessedWord = [];
    this.correctGuesses = [];
    this.stats = [];
    this.total = '';
    this.scoreOnLength = { '3': 1, '4': 3, '5': 7, '6': 9, '7': 11 };
    this.validWords = ['DEEP', 'DEPT', 'RIDER', 'TIDE', 'RIDE', 'PRIDE', 'TRIED'];
  }

  addWord(letter) {
    this.guessedWord.push(letter);
    return this.guessedWord.join('');
  }

  isValidGuess() {
    const guessWord = this.guessedWord.join('');
    return guessWord.includes(this.centerLetter) &&
      !this.correctGuesses.includes(guessWord) &&
      this.validWords.includes(this.guessedWord.join('')) && guessWord.length > 3;
  };

  resetGuessedWord() {
    this.guessedWord.length = 0;
  };

  updateCGlist() {
    this.correctGuesses.push(this.guessedWord.join(''));
    this.resetGuessedWord();
    console.log(this.guessedWord);
  };

  getCorrectGuesses() {
    return this.correctGuesses;
  }

  updateStats() {
    const currentGuess = this.correctGuesses;
    const currentGuessLength = currentGuess[currentGuess.length - 1].length;
    const currentScore = this.scoreOnLength[currentGuessLength];
    this.stats.push(currentScore);
  };

  updateTotal() {
    const total = this.stats.reduce(sum, 0);
    this.total = total;
    return total;
  };

  deleteLetter() {
    this.guessedWord.pop();
    return this.guessedWord.join('');
  }

  decideError() {
    const word = this.guessedWord.join('');
    this.resetGuessedWord();

    if (!word.includes(this.centerLetter)) {
      return `Missing center letter`;
    }
    console.log('len', word.length);
    if (word.length <= 3) {
      return `Too short`;
    }
    if (!this.validWords.includes(word)) {
      return `Not in list`;
    }
  }
}

const showError = (error) => {
  const displayErrorElement = document.getElementById('display-error');
  displayErrorElement.innerText = error;
  setTimeout(() => {
    displayErrorElement.innerText = '';
  }, 2000);
};

const showCGlist = (guesses) => {
  const cgList = document.getElementsByClassName('cg');
  for (let index = 0; index < guesses.length; index++) {
    cgList[index].innerText = guesses[index];
  }
};

const showTotal = (total) => {
  const totalBox = document.getElementsByClassName('total')[0];
  totalBox.innerText = total;
};

const resetGuessBox = () => {
  const guessBox = document.getElementById('guess-word');
  guessBox.value = '';
};

const showText = (text) => {
  const guessWord = document.getElementById('guess-word');
  guessWord.value = text;
};

const takeInput = (event) => {
  if (event.path[0].classList.contains('cell')) {
    return event.target.innerText;
  }
};

const main = () => {
  const game = new Apishell();

  const cellHolder = document.getElementsByClassName('cell-holder')[0];
  cellHolder.addEventListener('click', (event) => {
    const letter = takeInput(event);
    const word = game.addWord(letter);
    showText(word);
  });


  const guessValidator = document.getElementById('enter-button');
  guessValidator.addEventListener('click', (event) => {
    if (game.isValidGuess()) {
      game.updateCGlist();
      showCGlist(game.getCorrectGuesses());
      game.updateStats();
      const total = game.updateTotal();
      showTotal(total);
      resetGuessBox();
      return;
    };
    const error = game.decideError();
    showError(error);
    resetGuessBox();
  })

  const deleteTextControl = document.getElementById('delete-button');
  deleteTextControl.addEventListener('click', (event) => {
    const updatedText = game.deleteLetter();
    showText(updatedText);
  })

};

window.onload = main;
