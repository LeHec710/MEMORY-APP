const cards = document.querySelectorAll(".card");
const deck = document.getElementById("card-deck");
const attemptsEl = document.getElementById("attempts");
const attemptsCounter = document.getElementById("attemptsCounter");

let cardsFound = 0;
let canPlay = true;
let selected = [];
let attempts = 0;
let maxAttempts = 15;

play();
function play() {
    shuffle();
}

function shuffle() {
    deck.innerHTML = "";

    // shuffle nodelist
    [].slice.call( cards ).filter( function( _e ){
        _e.style.order =  (Math.floor(Math.random() * (10) + 1));
    } );

    // displaying cards
    cards.forEach(card => {
        deck.appendChild(card);
    })
}

function select(card) {
    if(canPlay) {
        selected.push(card);
        toggleCard(card);
    
        // if two cards selected
        if(selected.length == 2) {
            areMatched();
        }
    }
}

function toggleCard(card) {
    card.classList.toggle("show");
    card.classList.toggle("open");
    card.classList.toggle("disabled");
}

function areMatched() {
    if(selected.length == 2) {
        // cards matched
        if(selected[0].type == selected[1].type) {
            selected[0].classList.add("disabled");
            selected[1].classList.add("disabled");

            selected[0].classList.toggle("match");
            selected[1].classList.toggle("match");
            selected = [];
            cardsFound += 2;
            // all cards found
            if(cardsFound == cards.length) {
                congratulations();
            }
        } 
        // cards didn't matched
        else {
            attempts += 1;
            updateAttempts();

            canPlay = false;
            selected[0].classList.toggle("unmatched");
            selected[1].classList.toggle("unmatched");
            setTimeout(() => {
                toggleCard(selected[0]);
                toggleCard(selected[1]);
                canPlay = true;
                selected[0].classList.toggle("unmatched");
                selected[1].classList.toggle("unmatched");
                selected = [];
            }, 1000);
        }
    }
}

function congratulations() {
    // congratulation popup/message
    canPlay = false;
    alert("congratulation");
    document.location.reload();
}

function lose() {
    // lose popup/message
    canPlay = false;
    alert("You lose");
    document.location.reload();
}

function updateAttempts() {
    attemptsEl.style.width = (attempts * (100/maxAttempts))+"%";
    attemptsCounter.innerHTML = attempts+"/"+maxAttempts;
    if(attempts == maxAttempts) {
        lose();
    }
}

// click events
cards.forEach(card => {
    if(canPlay) {
        card.addEventListener('click', event => {
            select(card);
        })
    }
})