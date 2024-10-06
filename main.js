import GameBoard from "./GameBoard.js";
import Players from "./Players.js";

const gameBoard = new GameBoard();
const players = new Players();

function playRound(cell) {
  if (gameBoard.getBoard()[cell] !== "") return;

  gameBoard.markCell(cell, players.getActivePlayer().marker);

  handleResults();
}

function checkWin(marker) {
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  return winningCombinations.some((combinations) =>
    combinations.every((cell) => gameBoard.getBoard()[cell].includes(marker)),
  );
}

function checkDraw() {
  return gameBoard
    .getBoard()
    .every(
      (cell) =>
        cell === players.getPlayers()[0].marker ||
        cell === players.getPlayers()[1].marker,
    );
}

function handleResults() {
  const activePlayer = players.getActivePlayer();

  if (checkWin(activePlayer.marker)) {
    displayWinner(activePlayer.name);
  } else if (checkDraw()) {
    displayDraw();
  } else {
    players.switchPlayerTurn();
  }
}

const board = document.querySelector("#gameBoard");
const form = document.querySelector("form.display");
const display = document.querySelector("div.display");
const messages = document.querySelector("[data-message]");
const restartBtn = document.querySelector("#restartBtn");

board.addEventListener("click", clickHandler);
form.addEventListener("submit", getPlayerNames);
restartBtn.addEventListener("click", restartGame);

function updateScreen() {
  const activePlayer = players.getActivePlayer();
  const playerTurn = document.querySelector(".displayTurn");

  playerTurn.textContent = `${activePlayer.name}'s turn`;

  if (gameBoard.getBoard() == null) {
    gameBoard.createNewBoard();
  }

  gameBoard.getBoard().forEach((cell, index) => {
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

function displayWinner(name) {
  messages.textContent = `${name} is the winner`;
  display.classList.add("outcome");
}

function displayDraw() {
  messages.textContent = "Draw";
  display.classList.add("outcome");
}

function clickHandler(e) {
  const selectedCell = e.target;

  if (selectedCell.matches("[data-cell]")) {
    playRound(selectedCell.dataset.cell);
  }

  refreshDisplay();
}

function getPlayerNames(e) {
  e.preventDefault();
  const p1Name = document.querySelector("#playerOne").value.trim();
  const p2Name = document.querySelector("#playerTwo").value.trim();

  if (p1Name.length) players.setPlayerOneName(p1Name);
  if (p2Name.length) players.setPlayerTwoName(p2Name);

  form.classList.remove("start");
  refreshDisplay();
}

function restartGame() {
  gameBoard.createNewBoard();
  display.classList.remove("outcome");
  refreshDisplay();
}
