import { useState, useEffect } from "react"

import gameManagerInstance from "./components/GameManager"
import GamemodePicker from "./components/GameModePicker/GameModePicker"
import GameBoard from "./components/GameBoard/GameBoard"

import "./App.css"
import subscriptionManagerInstance from "./components/SubscribtionManager"
import Subscription from "./components/Subscribtion"
function App() {
  const [gamestate, setGamestate] = useState(gameManagerInstance.getGameState())

  useEffect(() => {
    const updateGameState = () => {
      console.log("updateGameState")
      setGamestate(gameManagerInstance.getGameState())
    }
    const gameStateSub = new Subscription(
      Subscription.getTypes().gameState,
      updateGameState
    )
    subscriptionManagerInstance.subscribe(gameStateSub)

    return () => {
      subscriptionManagerInstance.subscribe(gameStateSub)
    }
  }, [])

  return (
    <div className="App">
      {gamestate === gameManagerInstance.possibleGameStates.initial ? (
        <>
          <GamemodePicker></GamemodePicker>
        </>
      ) : (
        <>
          <GameBoard></GameBoard>
        </>
      )}
    </div>
  )
}

export default App
