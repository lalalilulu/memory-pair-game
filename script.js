(function launchApp() {
    const cards = document.querySelectorAll(".memory-card");
    cards.forEach(card => {
        let position = Math.floor(Math.random() * 20);
        card.style.order = position;
    });
    cards.forEach(card => card.addEventListener("click", flipCard));
})();

let lockBoard = false;
let hasFlipped = false;
let firstCard, secondCard;
let openCards = 0;

function flipCard() {
    if (lockBoard || this === firstCard) return;

    this.classList.toggle('flip');

    if (!hasFlipped) {
        hasFlipped = true;
        firstCard = this;
        return;
    }
    secondCard = this;

    checkMatch();
}

function checkMatch() {
    let isMatch = firstCard.dataset.image === secondCard.dataset.image
    if (isMatch) {
        disableCards();
        checkWin();
    } else {
        unflipCards();
    }
}

function disableCards() {
    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);
    openCards += 2;
    resetBoard();
}

function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove("flip");
        secondCard.classList.remove("flip");
        resetBoard();
    }, 1000)
}

function resetBoard() {
    [hasFlipped, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

function checkWin() {
    console.log(openCards);
    if (openCards === 20) {
        setTimeout(() => window.requestAnimationFrame(() => {
            if (confirm('Congratulations, you won!\nRestart the game')) {
                location.reload();
            }
        }), 1500);
    }
}



