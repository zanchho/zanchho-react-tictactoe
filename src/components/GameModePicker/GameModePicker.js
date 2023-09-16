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

/*
TODO: improvements according to chatGPT 
  Destructuring Game Manager: Instead of calling GameManager.possibleGameModes multiple times,
  you can destructure it at the beginning of your component for cleaner code.

  Conditional Styling: You can add some conditional styling to highlight the selected game mode button. For example, you can apply a different class to the active button to indicate the current game mode.

  Reuse Components: If you have a consistent UI theme throughout your application, 
  you can create a reusable button component that includes the game mode text and 
  handles the click event. This can help reduce redundancy in your code.
*/
