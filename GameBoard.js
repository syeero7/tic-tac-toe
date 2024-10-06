export default class GameBoard {
  #board;

  constructor() {
    this.#board;
  }

  createNewBoard() {
    this.#board = new Array(9).fill("");
  }

  markCell(cell, player) {
    this.#board[cell] = player;
  }

  getBoard() {
    return this.#board;
  }
}
