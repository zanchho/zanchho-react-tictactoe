import { useState } from "react"

import GameManager from "../GameManager"

const GamemodePicker = () => {
  const [gameMode, setGameMode] = useState(GameManager.getGameMode())

  const handleSetGameMode = gm => {
    GameManager.setGameMode(gm)
    setGameMode(gm)
    if (gm) {
      GameManager.setGameState(GameManager.possibleGameStates.started) //started
    }
  }

  return (
    <div className="gamemode-picker">
      <button
        onClick={() =>
          handleSetGameMode(GameManager.possibleGameModes.SINGLEPLAYER)
        }
      >
        {GameManager.possibleGameModes.SINGLEPLAYER}
      </button>
      <button
        onClick={() =>
          handleSetGameMode(GameManager.possibleGameModes.MULTIPLAYER)
        }
      >
        {GameManager.possibleGameModes.MULTIPLAYER}
      </button>
      <button
        onClick={() =>
          handleSetGameMode(GameManager.possibleGameModes.LOCALPLAYER)
        }
      >
        {GameManager.possibleGameModes.LOCALPLAYER}
      </button>
    </div>
  )
}

export default GamemodePicker
