const cards = [
    { id: 1, value: "A" },
    { id: 2, value: "B" },
    { id: 3, value: "C" },
    { id: 4, value: "D" },
    { id: 5, value: "E" },
    { id: 6, value: "F" },
    { id: 7, value: "G" },
    { id: 8, value: "H" },
    { id: 1, value: "A" },
    { id: 2, value: "B" },
    { id: 3, value: "C" },
    { id: 4, value: "D" },
    { id: 5, value: "E" },
    { id: 6, value: "F" },
    { id: 7, value: "G" },
    { id: 8, value: "H" },
];

let flippedCards = [];
let matchedCards = [];

const gameBoard = document.getElementById('game-board');
const resetButton = document.getElementById('reset');

// Embaralhar as cartas
function shuffleCards(cards) {
    for (let i = cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cards[i], cards[j]] = [cards[j], cards[i]];
    }
}

// Criar o tabuleiro
function createBoard() {
    shuffleCards(cards);
    gameBoard.innerHTML = '';
    cards.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.dataset.id = card.id;
        cardElement.dataset.value = card.value;
        cardElement.addEventListener('click', flipCard);
        gameBoard.appendChild(cardElement);
    });
}

// Virar a carta
function flipCard(event) {
    const clickedCard = event.target;

    if (flippedCards.length < 2 && !clickedCard.classList.contains('flipped')) {
        clickedCard.classList.add('flipped');
        clickedCard.textContent = clickedCard.dataset.value;
        flippedCards.push(clickedCard);

        if (flippedCards.length === 2) {
            checkMatch();
        }
    }
}

// Verificar se as cartas combinam
function checkMatch() {
    const [card1, card2] = flippedCards;

    if (card1.dataset.value === card2.dataset.value) {
        matchedCards.push(card1, card2);
        card1.classList.add('matched');
        card2.classList.add('matched');
        flippedCards = [];
        checkWin();
    } else {
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            card1.textContent = '';
            card2.textContent = '';
            flippedCards = [];
        }, 1000);
    }
}

// Verificar se o jogo foi vencido
function checkWin() {
    if (matchedCards.length === cards.length) {
        setTimeout(() => {
            alert('Você venceu!');
            resetGame();
        }, 500);
    }
}

// Reiniciar o jogo
function resetGame() {
    flippedCards = [];
    matchedCards = [];
    createBoard();
}

// Inicializar o jogo
resetButton.addEventListener('click', resetGame);

createBoard();
