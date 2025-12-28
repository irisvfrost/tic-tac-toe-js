const cells = Array.from(document.querySelectorAll(".cell"));
const statusEl = document.getElementById("status");
const resetBtn = document.getElementById("resetBtn");

let board = Array(9).fill("");
let currentPlayer = "X";
let gameOver = false;

const WIN_LINES = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6],
];

function setStatus(message) {
  statusEl.textContent = message;
}

function render() {
  cells.forEach((cell, i) => {
    cell.textContent = board[i];
    cell.disabled = gameOver || board[i] !== "";
    cell.classList.remove("win");
  });
}

function findWinner() {
  for (const [a, b, c] of WIN_LINES) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a], line: [a, b, c] };
    }
  }
  return null;
}

function isDraw() {
  return board.every((v) => v !== "");
}

function handleCellClick(index) {
  if (gameOver || board[index] !== "") return;

  board[index] = currentPlayer;

  const result = findWinner();
  if (result) {
    gameOver = true;
    setStatus(`Player ${result.winner} wins!`);
    render();
    result.line.forEach((i) => cells[i].classList.add("win"));
    cells.forEach((c) => (c.disabled = true));
    return;
  }

  if (isDraw()) {
    gameOver = true;
    setStatus("It’s a draw!");
    render();
    cells.forEach((c) => (c.disabled = true));
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  setStatus(`Player ${currentPlayer}’s turn`);
  render();
}

function resetGame() {
  board = Array(9).fill("");
  currentPlayer = "X";
  gameOver = false;
  setStatus("Player X’s turn");
  render();
}

cells.forEach((cell) => {
  cell.addEventListener("click", () => {
    handleCellClick(Number(cell.dataset.index));
  });
});

resetBtn.addEventListener("click", resetGame);

resetGame();