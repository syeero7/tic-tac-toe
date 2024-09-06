function GameBoard() {
  const board = [];

  const generateCells = () => {
    for (let i = 0; i < 9; i++) {
      board.push("");
    }
  };

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

const game = GameBoard();
