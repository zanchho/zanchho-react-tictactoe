import SubscriptionManagerInstance from "./SubscribtionManager"
import Subscribtion from "./Subscribtion"
import subscriptionManagerInstance from "./SubscribtionManager"

class GameManager {
  constructor() {
    this.possibleGameModes = {
      SINGLEPLAYER: "singleplayer(WIP)",
      MULTIPLAYER: "multiplayer(WIP)",
      LOCALPLAYER: "localplayer",
    }

    //initial settings
    this.gamemode = null
    this.EMPTYSPACE = "#"
    this.isUIBlocked = false
    this.WINNERONDRAW = "draw"

    //gamerelated
    this.possibleGameStates = {
      started: "started",
      finished: "finished",
      initial: "initial",
    }
    this.gameState = this.possibleGameStates.initial

    //players should be outsourcable
    this.playersTurn = 1 // 1st Player or 2nd Player
    this.winner = null
    //#empty xPlayer oPlayer
    this.playground = [
      [this.EMPTYSPACE, this.EMPTYSPACE, this.EMPTYSPACE],
      [this.EMPTYSPACE, this.EMPTYSPACE, this.EMPTYSPACE],
      [this.EMPTYSPACE, this.EMPTYSPACE, this.EMPTYSPACE],
    ]
    this.history = []
  }
  restartGame() {
    this.resetPlayGround()
  }
  setWinner(winner) {
    winner = winner ?? null
    this.winner = winner
    SubscriptionManagerInstance.notifysubscribers(
      Subscribtion.getTypes().win,
      this.winner
    )
  }
  getWinner() {
    return this.winner
  }
  resetPlayGround() {
    this.history.push({ winner: this.winner, game: this.playground })
    this.playground = [
      [this.EMPTYSPACE, this.EMPTYSPACE, this.EMPTYSPACE],
      [this.EMPTYSPACE, this.EMPTYSPACE, this.EMPTYSPACE],
      [this.EMPTYSPACE, this.EMPTYSPACE, this.EMPTYSPACE],
    ]
    this.setWinner(null)
    SubscriptionManagerInstance.notifysubscribers(
      Subscribtion.getTypes().playground,
      this.playground
    )
  }
  setPlayGround(row, cell, val) {
    this.playground[row][cell] = val
    console.log("set", row, cell, this.playground[row][cell])
    console.log("notify:", Subscribtion.getTypes().playground, this.playground)
    SubscriptionManagerInstance.notifysubscribers(
      Subscribtion.getTypes().playground,
      this.playground
    )
  }
  getPlayGround() {
    return this.playground
  }
  makePlayerMove(player, column, row) {
    if (this.winner !== null) {
      console.log("Already Won")
      return
    }
    if (player !== this.playersTurn) {
      console.log("invalid player")
      return
    }
    if (this.playground[column][row] !== this.EMPTYSPACE) {
      console.log("invalid cell, ", this.playground[column][row])
      return
    }

    const sign = player === 1 ? "X" : "O"
    this.setPlayGround(column, row, sign)
    if (this.hasWon(sign)) {
      this.setWinner(sign)
      console.log("player %s won", sign)
      console.log(this.playground)
    }
    if (this.getPlayersTurn() === 2 && this.isDraw()) {
      this.setWinner(this.WINNERONDRAW)
    }
    if (this.gamemode === this.possibleGameModes.SINGLEPLAYER) {
      this.isUIBlocked = true
      //AI move
      this.isUIBlocked = false
      return
    }
    if (this.gamemode === this.possibleGameModes.MULTIPLAYER) {
      //future feature
      return
    }
    if (this.gamemode === this.possibleGameModes.LOCALPLAYER) {
      this.nextPlayersTurn()
      return
    }
  }
  setGameMode(gm) {
    this.gamemode = gm
  }
  resetGameMode() {
    this.gamemode = null
  }
  getGameMode() {
    return this.gamemode
  }
  nextPlayersTurn() {
    this.playersTurn = (this.playersTurn % 2) + 1
  }
  getPlayersTurn() {
    return this.playersTurn
  }
  setGameState(gameState) {
    this.gameState = gameState
    subscriptionManagerInstance.notifysubscribers(
      Subscribtion.getTypes().gameState,
      this.gameState
    )
    console.log("GM state set to ", gameState)
  }
  getGameState() {
    return this.gameState
  }

  hasWon(playerSign) {
    for (let row = 0; row < 3; row++) {
      if (
        this.playground[row][0] === playerSign &&
        this.playground[row][1] === playerSign &&
        this.playground[row][2] === playerSign
      ) {
        return true
      }
    }

    for (let col = 0; col < 3; col++) {
      if (
        this.playground[0][col] === playerSign &&
        this.playground[1][col] === playerSign &&
        this.playground[2][col] === playerSign
      ) {
        return true
      }
    }

    if (
      (this.playground[0][0] === playerSign &&
        this.playground[1][1] === playerSign &&
        this.playground[2][2] === playerSign) ||
      (this.playground[0][2] === playerSign &&
        this.playground[1][1] === playerSign &&
        this.playground[2][0] === playerSign)
    ) {
      return true
    }

    return false
  }
  isDraw() {
    for (let col = 0; col < 3; col++) {
      for (let row = 0; row < 3; row++) {
        if (this.playground[col][row] === this.EMPTYSPACE) {
          return false // If an empty space is found, the game is not a draw
        }
      }
    }
    return true // If no empty spaces are found, the game is a draw
  }
}

const gameManagerInstance = new GameManager()
export default gameManagerInstance
