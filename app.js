const qwerty = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
const start = document.querySelector('.btn__reset');

let missed = 0;
let e = 0;
let correct = null;

let phrases = [
    "to be or not to be",
    "i got a bad feeling about this",
    "oh hi mark",
    "i have the high ground",
    "peanut butter and jealous",
    "oh my god they killed kenny",
    "wakanda forever"
];



//Selects random number from the array and returns the split() phrase
const getRandomPhraseAsArray = () => {  
    let i = Math.floor(Math.random() * phrases.length);
    let splitPhrase = phrases[i].split('');
    return(splitPhrase);  
}



//Add random phrase 
const phraseArray = getRandomPhraseAsArray(phrases);  

// iterates through the phrases array and applies the app() function for each one
function addPhraseToDisplay() {    
    phraseArray.forEach(app);
    
       function app(item) {    
            let li = document.createElement('li');
            li.append(item);
            let ul = document.querySelector('#phrase ul');
            ul.appendChild(li);
                if (li.textContent === ' ') {
                    li.classList.add('space');
                } else {
                    li.classList.add('letter');
                }
    } 
}
addPhraseToDisplay(phraseArray);



// hides the start button when clicked
start.addEventListener('click', () => {              
    overlay.style.display = "none";
    console.log('overlay hidden');
});



// Adds checkLetter Function
function checkLetter(button) {

    let items = document.querySelectorAll('.letter');
    let match = null;
        for (i = 0; i < items.length; i++) {
            
                if (items[i].textContent === button) {
                    items[i].classList.add('show');
                    match = items[i].textContent;
                }
        }
    return match;
}                



// Add checkWin function
const checkWin = () => {
    let option = document.getElementsByClassName('letter');
    let reveal = document.getElementsByClassName('show');
        if (reveal.length === option.length) {
            let result = document.getElementById('overlay');
            let win = document.getElementById('winDisplay');
            win.innerHTML = 'You Win! :)'
            result.classList.add('win');
            result.style.display = 'flex';
            start.innerHTML = 'retry';
            start.addEventListener('click', reboot);  
        }

        if (missed === 5) {
            let result = document.getElementById('overlay');
            let win = document.getElementById('winDisplay');
            win.innerHTML = 'You Lose! :('
            result.classList.add('lose');
            result.style.display = 'flex';
            start.innerHTML = 'retry';
            start.addEventListener('click', reboot);
        }
}  



//Adds Event Listener
function reboot() {
    window.location.reload();
};

qwerty.addEventListener('click', button => {
    let check = checkLetter(button.target.innerText);

                if (button.target.tagName === 'BUTTON') {
                    const picked = button.target;
                    picked.className = 'chosen';
                    picked.setAttribute('disabled', '');
                }

                if (button.target.tagName === 'DIV') {
                    return
                }

                if (check === null) {
                    missed += 1;
                    heart = document.getElementsByTagName('img')[e].setAttribute('src', 'images/LostHeart.png');
                    e += 1;  
                }
    
    checkWin();
});




