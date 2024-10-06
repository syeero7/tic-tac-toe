export default class Players {
  #players;
  #activePlayer;
  constructor() {
    this.#players = [
      {
        name: "Player 1",
        marker: "X",
      },
      {
        name: "Player 2",
        marker: "O",
      },
    ];

    this.#activePlayer = this.#players[0];
  }

  setPlayerOneName(newName) {
    this.#players[0].name = newName;
  }

  setPlayerTwoName(newName) {
    this.#players[1].name = newName;
  }

  getPlayers() {
    return this.#players;
  }

  getActivePlayer() {
    return this.#activePlayer;
  }

  switchPlayerTurn() {
    const players = this.#players;

    this.#activePlayer =
      this.#activePlayer === players[0] ? players[1] : players[0];
  }
}
