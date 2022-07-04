const entertext = (event) => {
  const guessBox = document.getElementById('guess-word');
  const letter = event.target.innerText;

  guessBox.value += letter;
};

const main = () => {
  const cells = document.getElementsByClassName('cell');

  for (let cell of cells) {
    console.log(cells);
    cell.addEventListener('click', entertext);
  }
};

window.onload = main;
