const qwerty = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
const phraseList = document.getElementById('phraseList');
const overlay = document.getElementById('overlay');
const buttonReset = document.querySelector('.btn__reset');
let missed = 0;

buttonReset.addEventListener('click',
  (e) => {overlay.style.display = 'none';});

//Add Phrases
const phrases = [
  'To be or not to be',
  'I did not hit her I did not',
  'I have the highground Anakin',
  'Two wrongs dont make a right',
  'Eat sleep rave repeat',
  'Where did I go wrong',
  'The grass is always greener on the other side'
];



//Add Random Phrase Function
const getRandomPhraseAsArray = arr => {
    const randNum = Math.floor((Math.random() * arr.length));
    const randPhrase = arr[randNum];
    const phraseParsed = [];
    for (let i=0; i<randPhrase.length; i++) {
      phraseParsed.push(randPhrase[i]);
    }
    return phraseParsed;
  };



//Set Game Display
const addPhraseToDisplay = arr => {
    for (let i=0; i<arr.length; i++) {
      // Create <li></li> element.
      let li = document.createElement('li');
      let ul = document.createElement('ul');
      // Add each letter/space in the phrase array to an li element
      li.textContent = arr[i];
      // Create regular expression that recognizes letters only
      let liRe = new RegExp('[a-zA-Z]');
      // If it matches, add class of 'letter'. If not, class is 'space'. Enclose each word in it's own UL element.
      if (liRe.test(li.textContent) && (phraseList.childElementCount === 0)) {
        li.className = 'letter';
        ul.appendChild(li);
        phraseList.appendChild(ul);
      } else if (liRe.test(li.textContent) && (phraseList.childElementCount !== 0)) {
        li.className = 'letter';
        let lastWord = phraseList.lastElementChild;
        lastWord.appendChild(li);
      }
      else {
        li.className = 'space';
        let lastWord = phraseList.lastElementChild;
        lastWord.appendChild(li);
        phraseList.appendChild(document.createElement('UL'));
      }
    }
  };

addPhraseToDisplay ( getRandomPhraseAsArray(phrases) );



//Create checkLetter Function
const checkLetter = btn => {
  const phrase = document.querySelectorAll('.letter');
  let phraseLetter = null;
  for (let i=0; i<phrase.length; i++) {
    if (btn === phrase[i].textContent.toLowerCase()) {
      phrase[i].className +=  ' show';
      phraseLetter = phrase[i].textContent;
    }
  }
  return phraseLetter;
};



//Create checkWin Function
function checkWin() {
  const phraseLetters = document.querySelectorAll('.letter');
  const guessedLetters = document.querySelectorAll('.show');
// Checks if all phrase letters are 'showing' and shows the WIN screen
  if (phraseLetters.length === guessedLetters.length){
    overlay.className = 'win';
    overlay.style.display = 'flex';
    overlay.firstElementChild.textContent = 'You win!';
    buttonReset.textContent = 'Try again?';
// Checks if user has 5 incorrect guesses and shows the LOSE screen
  } else if (missed > 4) {
    overlay.className = 'lose';
    overlay.style.display = 'flex';
    overlay.firstElementChild.textContent = 'You lose :(';
    buttonReset.textContent = 'Try again?';
  }
}



//Function to restart game
function restartGame() {
    const qwertyButtons = document.querySelectorAll('.chosen');
    const scoreBoard = document.querySelectorAll('.tries');
// Reset phrase section
    phrase.firstElementChild.textContent = '';
    addPhraseToDisplay ( getRandomPhraseAsArray(phrases) );
// Reset qwerty keyboard
    for (i=0; i<qwertyButtons.length; i++) {
      qwertyButtons[i].removeAttribute('disabled');
      qwertyButtons[i].className = '';
    }
// Reset scoreboard
    missed = 0;
    for (i=0; i<scoreBoard.length; i++) {
      scoreBoard[i].innerHTML = '<img src="images/liveHeart.png" width="30px" height="35px">';
    }

}



//Add event listener to keyboard.
qwerty.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
      // Update keyboard to show 'chosen' letters
      const selectedButton = e.target;
      selectedButton.className = 'chosen';
      selectedButton.setAttribute("disabled", "");
      const selectedLetter = selectedButton.textContent;
      // Checks if button clicked matches phrase.
      // Letter revealed in phrase or NULL is returned.
      const letterFound = (checkLetter(selectedLetter));
      // Update scoreboard when NULL is returned
      if (!letterFound) {
        missed += 1;
        let heartCounter = document.querySelectorAll('.tries');
        heartCounter[heartCounter.length - missed].innerHTML = '<img src="images/lostHeart.png" height="35px" width="30px">';
      }
      // Check for win/loss after each button click.
      checkWin();
    }
  });



//Create event listener to restart game.
buttonReset.addEventListener('click', (e) => {
  if (e.target.textContent === 'Play Again') {
    restartGame();
    overlay.style.display = 'none';
  }
  });

