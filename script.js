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

  let activePlayer = players[0];

  const getActivePlayer = () => activePlayer;

  const switchPlayerTurn = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  };
  
}

const game = GameController();
