import GameBoard from "./GameBoard.js";
import Players from "./Players.js";

const board = document.querySelector(".game-board");
const form = document.querySelector("form.display");
const display = document.querySelector("div.display");
const messages = document.querySelector("[data-message]");
const restartBtn = document.querySelector(".restart-btn");

board.addEventListener("click", handleClick);
form.addEventListener("submit", handleSubmit);
restartBtn.addEventListener("click", restartGame);

const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
const gameBoard = new GameBoard();
const players = new Players();

function playRound(cell) {
  if (gameBoard.board[cell] !== "") return;

  gameBoard.markCell(cell, players.activePlayer.marker);
  handleResult();
}

function isWinner(marker) {
  return WINNING_COMBINATIONS.some((combinations) =>
    combinations.every((cell) => gameBoard.board[cell] === marker)
  );
}

function isDraw() {
  const [playerOne, playerTwo] = players.players;

  return gameBoard.board.every(
    (cell) => cell === playerOne.marker || cell === playerTwo.marker
  );
}

function handleResult() {
  const { activePlayer } = players;

  if (isWinner(activePlayer.marker)) {
    messages.textContent = `${activePlayer.name} is the winner`;
    display.classList.add("finished");
    return;
  }

  if (isDraw()) {
    messages.textContent = "Draw";
    display.classList.add("finished");
    return;
  }

  players.switchPlayerTurn();
}

function updateScreen() {
  const { activePlayer } = players;
  const playerTurn = document.querySelector(".display-turn");
  playerTurn.textContent = `${activePlayer.name}'s turn`;
  if (!gameBoard.board) gameBoard.createNewBoard();

  gameBoard.board.forEach((cell, index) => {
    const cellBtn = document.createElement("button");
    cellBtn.dataset.cell = index;
    cellBtn.textContent = cell;

    board.appendChild(cellBtn);
  });
}

function removeCellElements() {
  while (board.firstChild) {
    board.firstChild.remove();
  }
}

function refreshDisplay() {
  removeCellElements();
  updateScreen();
}

function handleClick(e) {
  const selectedCell = e.target;
  if (!selectedCell.matches("[data-cell]")) return;

  playRound(selectedCell.dataset.cell);
  refreshDisplay();
}

function handleSubmit(e) {
  e.preventDefault();
  const p1Name = document.querySelector("#playerOne").value.trim();
  const p2Name = document.querySelector("#playerTwo").value.trim();

  if (p1Name.length) players.playerOneName = p1Name;
  if (p2Name.length) players.playerTwoName = p2Name;

  form.classList.remove("start");
  refreshDisplay();
}

function restartGame() {
  gameBoard.createNewBoard();
  display.classList.remove("finished");
  refreshDisplay();
}
