const isValidWord = (word) => {
  const words = fs.readFileSync('/usr/share/dict/words', 'utf8');
  return words.includes(word);
}

const scoreUpdate = (guessWord) => {
  if (isValidWord(guessWord)) {
    console.log('words in dictionary');
    return;
  }
  console.log('not a valid word');
};

const validateGuess = () => {
  const centerLetter = document.getElementById('center').innerText;
  const guessWord = (document.getElementById('guess-word').value).toUpperCase();

  if (guessWord.includes(centerLetter)) {
    console.log("yes");
    scoreUpdate(guessWord);
  } else {
    console.log('no');
  }
};

const deleteLast = () => {
  const guessWord = document.getElementById('guess-word');
  guessWord.value = guessWord.value.slice(0, - 1);
}

const entertext = (event) => {
  const guessBox = document.getElementById('guess-word');
  const letter = event.target.innerText;

  guessBox.value += letter;
};

const main = () => {
  const cells = document.getElementsByClassName('cell');

  for (let cell of cells) {
    cell.addEventListener('click', entertext);
  }
};

window.onload = main;
