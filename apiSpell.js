const updateCGlist = (guessWord) => {
  console.log('updateCGlist');
  const cgList = document.getElementsByClassName('cg');
  console.log(cgList.length);

  for (let index = 0; index < cgList.length; index++) {
    if (!cgList[index].innerText) {
      cgList[index].innerText = guessWord;
      return;
    }
  }
};

const isValidWord = (word) => {
  // const words = fs.readFileSync('/usr/share/dict/words', 'utf8');
  const words = ['DEEP', 'DEPT', 'RIDER'];
  return words.includes(word);
};

const scoreUpdate = (guessWord) => {
  if (isValidWord(guessWord)) {
    updateCGlist(guessWord);
    return;
  }
  // popupInvalidMessage();
  console.log('not a valid word');
};

const validateGuess = () => {
  const centerLetter = document.getElementById('center').innerText;
  const guessWord = (document.getElementById('guess-word').value).toUpperCase();

  if (guessWord.includes(centerLetter)) {
    scoreUpdate(guessWord);
    return;
  }
  console.log('no');
};

const deleteText = () => {
  const guessWord = document.getElementById('guess-word');
  guessWord.value = guessWord.value.slice(0, - 1);
};

const entertext = (event) => {
  if (event.path[0].classList.contains('cell')) {
    const guessBox = document.getElementById('guess-word');
    const letter = event.target.innerText;
    guessBox.value += letter;
  }
  return;
};

const main = () => {
  // const letters = [{ id: '1', letter: 'a' }]
  const cellHolder = document.getElementsByClassName('cell-holder')[0];
  cellHolder.addEventListener('click', entertext);
};

window.onload = main;
