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

  return { generateCells, getBoard, markCell };
}

const game = GameBoard();
