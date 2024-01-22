const cards = document.querySelectorAll('.memory-card');
const backFaces = document.querySelectorAll('.back-face');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;
  
    const cardElement = this.classList.contains('front-face')
      ? this.parentElement
      : this;
  
    cardElement.classList.add('flip');
  
    if (!hasFlippedCard) {
      hasFlippedCard = true;
      firstCard = cardElement;
      return;
    }
  
    secondCard = cardElement;
    checkForMatch();
  }
  

function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  resetBoard();
}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard();
  }, 1500);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

(function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})();

cards.forEach(card => card.addEventListener('click', flipCard));
backFaces.forEach(backFace => backFace.addEventListener('click', flipCard));
