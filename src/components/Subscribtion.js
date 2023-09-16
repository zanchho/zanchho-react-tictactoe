class Subscription {
  constructor(type, callback) {
    this.type = type
    this.callback = callback
  }

  static getTypes() {
    return {
      win: "win",
      gameState: "gameState",
      playground: "playground",
    }
  }
}

export default Subscription
