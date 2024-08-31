const cells = document.querySelectorAll('[data-cell]');
const gameStatus = document.getElementById('gameStatus');
const restartButton = document.getElementById('restartButton');

let isXTurn = true;
let board = ['', '', '', '', '', '', '', '', ''];
let isGameActive = true;

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleClick(event) {
    const cell = event.target;
    const index = Array.from(cells).indexOf(cell);
    if (board[index] || !isGameActive) return;

    board[index] = isXTurn ? 'X' : 'O';
    cell.textContent = board[index];

    if (checkWin()) {
        gameStatus.textContent = `${isXTurn ? 'X' : 'O'} wins!`;
        gameStatus.id = 'winner';
        isGameActive = false;
    } else if (board.every(cell => cell)) {
        gameStatus.textContent = 'Draw!';
        gameStatus.id = 'draw';
        isGameActive = false;
    } else {
        isXTurn = !isXTurn;
    }
}

function checkWin() {
    return winningCombinations.some(combination => {
        const [a, b, c] = combination;
        return board[a] && board[a] === board[b] && board[a] === board[c];
    });
}

function restartGame() {
    isXTurn = true;
    isGameActive = true;
    board = ['', '', '', '', '', '', '', '', ''];
    cells.forEach(cell => cell.textContent = '');
    gameStatus.textContent = '';
    gameStatus.removeAttribute('id');
}

cells.forEach(cell => cell.addEventListener('click', handleClick));
restartButton.addEventListener('click', restartGame);
