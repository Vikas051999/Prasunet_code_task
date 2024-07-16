const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const resetButton = document.getElementById('reset');
let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let isGameActive = true;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const handleCellClick = (e) => {
    const index = e.target.getAttribute('data-index');
    if (board[index] !== '' || !isGameActive) {
        return;
    }
    updateCell(e.target, index);
    checkForWinner();
};

const updateCell = (cell, index) => {
    board[index] = currentPlayer;
    cell.innerText = currentPlayer;
    cell.classList.add(`player${currentPlayer}`);
};

const checkForWinner = () => {
    let roundWon = false;
    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            roundWon = true;
            break;
        }
    }
    if (roundWon) {
        statusText.innerText = `${currentPlayer} wins!`;
        isGameActive = false;
        return;
    }
    if (!board.includes('')) {
        statusText.innerText = 'Draw!';
        isGameActive = false;
        return;
    }
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusText.innerText = `It's ${currentPlayer}'s turn`;
};

const resetGame = () => {
    currentPlayer = 'X';
    board = ['', '', '', '', '', '', '', '', ''];
    isGameActive = true;
    statusText.innerText = `It's ${currentPlayer}'s turn`;
    cells.forEach(cell => {
        cell.innerText = '';
        cell.classList.remove('playerX', 'playerO');
    });
};

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);
statusText.innerText = `It's ${currentPlayer}'s turn`;
