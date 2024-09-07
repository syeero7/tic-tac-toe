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

  const printBoard = () => {
    const grid = board.reduce((newArray, item, index) => {
      const subArray = Math.floor(index / 3);
      if (!newArray[subArray]) {
        newArray[subArray] = [];
      }
      newArray[subArray].push(item);

      return newArray;
    }, []);

    console.log(grid);
  };

  return { generateCells, getBoard, markCell, printBoard };
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

  const newRound = () => {
    board.printBoard();
    console.log(`${getActivePlayer().name}'s Turn`);
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
        console.log(`${getActivePlayer().name} is the winner`);
      } else if (checkDraw()) {
        console.log("Draw");
      } else {
        switchPlayerTurn();
        newRound();
      }
    };

    handleOutcomes();
  };

  function restart() {
    board.getBoard().splice(0, board.getBoard().length);
    board.generateCells();
    newRound();
  }

  newRound();

  return {
    playRound,
    getActivePlayer,
    getBoard: board.getBoard,
    getPlayers,
    restart,
  };
}
