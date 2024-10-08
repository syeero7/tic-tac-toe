function GameBoard() {
  const board = [];

  const generateCells = () => {
    for (let i = 0; i < 9; i++) {
      board.push("");
    }
  };

  (() => {
    generateCells();
  })();

  const getBoard = () => board;

  const markCell = (cell, player) => {
    board[cell] = player;
  };

  return { generateCells, getBoard, markCell };
}

function GameController(playerOne = "player 1", playerTwo = "player 2") {
  const board = GameBoard();

  const players = [
    { name: playerOne, marker: "X" },
    { name: playerTwo, marker: "O" },
  ];

  const getPlayers = () => players;

  let activePlayer = players[0];

  const getActivePlayer = () => activePlayer;

  const switchPlayerTurn = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  };

  const playRound = (index) => {
    if (board.getBoard()[index] !== "") return;

    board.markCell(index, getActivePlayer().marker);

    const checkWin = (marker) => {
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
        combinations.every((cell) => board.getBoard()[cell].includes(marker)),
      );
    };

    const checkDraw = () => {
      return board
        .getBoard()
        .every(
          (cell) => cell === players[0].marker || cell === players[1].marker,
        );
    };

    const handleOutcomes = () => {
      if (checkWin(getActivePlayer().marker)) {
        ScreenController().displayWinner(getActivePlayer().name);
      } else if (checkDraw()) {
        ScreenController().displayDraw();
      } else {
        switchPlayerTurn();
      }
    };

    handleOutcomes();
  };

  function restart() {
    board.getBoard().splice(0, board.getBoard().length);
    board.generateCells();
  }

  return {
    playRound,
    getActivePlayer,
    getBoard: board.getBoard,
    getPlayers,
    restart,
  };
}

function ScreenController() {
  const gameBoard = document.querySelector("#gameBoard");
  const form = document.querySelector("form.display");
  const display = document.querySelector("div.display");
  const messages = document.querySelector("[data-message]");
  const restartBtn = document.querySelector("#restartBtn");
  const game = GameController();

  const updateScreen = () => {
    const board = game.getBoard();
    const activePlayer = game.getActivePlayer();
    const playerTurn = document.querySelector(".displayTurn");

    playerTurn.textContent = `${activePlayer.name}'s turn`;

    board.forEach((cell, index) => {
      const cellBtn = document.createElement("button");
      cellBtn.setAttribute("data-cell", index);
      cellBtn.textContent = cell;

      gameBoard.appendChild(cellBtn);
    });
  };

  const refreshDisplay = () => {
    while (gameBoard.firstChild) {
      gameBoard.firstChild.remove();
    }
    updateScreen();
  };

  const displayWinner = (name) => {
    messages.textContent = `${name} is the winner`;
    display.classList.add("outcome");
  };

  const displayDraw = () => {
    messages.textContent = "Draw";
    display.classList.add("outcome");
  };

  function clickHandleBoard(e) {
    const selectedCell = e.target;

    if (selectedCell.matches("[data-cell]")) {
      game.playRound(selectedCell.getAttribute("data-cell"));
    }
    refreshDisplay();
  }

  function getPlayerNames(e) {
    e.preventDefault();
    const p1Name = document.querySelector("#playerOne").value;
    const p2Name = document.querySelector("#playerTwo").value;

    if (p1Name !== "") game.getPlayers()[0].name = p1Name;
    if (p2Name !== "") game.getPlayers()[1].name = p2Name;

    form.classList.remove("start");
    refreshDisplay();
  }

  function restartGame() {
    game.restart();
    display.classList.remove("outcome");
    refreshDisplay();
  }

  updateScreen();

  gameBoard.addEventListener("click", clickHandleBoard);
  form.addEventListener("submit", getPlayerNames);
  restartBtn.addEventListener("click", restartGame);

  return { displayWinner, displayDraw };
}

ScreenController();
