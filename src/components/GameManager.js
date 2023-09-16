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
  quitGame() {
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
  }
  restartGame() {
    this.resetPlayGround()
    this.setGameState(this.possibleGameStates.started)
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
      this.setGameState(this.possibleGameStates.finished)
      console.log("player %s won", sign)
      console.log(this.playground)
    }
    if (this.isDraw()) {
      this.setWinner(this.WINNERONDRAW)
      this.setGameState(this.possibleGameStates.finished)
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

/*
TODO: improvements according to chatGPT
    Comments and Documentation: While the code is relatively well-structured, 
    it would benefit from more comments and documentation. Add comments to explain the
    purpose and functionality of methods, especially those with complex logic or parameters.
    Document the class with information about its usage and any important considerations
    for developers who may use it.

    Magic Values: There are a few magic values in your code, such as "#" and the numbers 3.
    Consider defining these values as constants or class properties with meaningful 
    names to improve code readability and make it easier 
    to adjust them in the future if needed.

    Error Handling: Consider throwing custom exceptions or using error codes instead of
    just logging error messages when invalid moves occur. 
    This can help you handle errors more consistently and make it easier to provide 
    feedback to the user or other parts of your application.

    Separation of Concerns: While your GameManager handles game logic and state, 
    it also interacts with the UI (e.g., changing game states and notifying subscribers). 
    Consider separating the UI-related concerns into a separate component or manager responsible 
    for handling UI interactions. This would improve the separation of concerns and make 
    your code more modular.

    Use of Enums: Instead of using plain strings for game modes and game states,
    consider using enums or constants to define these values. This can help
    prevent typos and make the code more self-documenting.

    Consistent Naming: Ensure that your variable and method names follow a consistent naming
    convention. For example, you have both gameManagerInstance and GameManager. 
    Make sure naming is consistent throughout the codebase.

    Test Coverage: Consider adding unit tests to verify the correctness of your game logic. 
    Testing can help catch potential issues early and ensure that changes to your code don't 
    introduce regressions.

    Refactor Conditional Logic: Some parts of your code, especially the conditional logic 
    for checking game state and mode, could be refactored to make them more concise and easier 
    to read. Consider breaking down complex conditions into smaller functions or using switch 
    statements for better readability.

    AI Integration (Single Player Mode): If you plan to implement AI for single-player mode,
    ensure that there is a clear separation between player moves and AI moves in the code.
    This will make it easier to integrate AI logic in the future.

    Input Validation: Ensure that user inputs (e.g., player moves) are properly 
    validated and sanitized to prevent potential security vulnerabilities or crashes.
*/
