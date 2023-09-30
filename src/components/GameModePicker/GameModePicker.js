import { useState } from "react"

import GameManager from "../GameManager"
import "./gamemodepicker.css"
import StartMenuButton from "../startMenuButton/StartMenuButton"
const GamemodePicker = () => {
  const [gameMode, setGameMode] = useState(GameManager.getGameMode())
  const { SINGLEPLAYER, MULTIPLAYER, LOCALPLAYER } =
    GameManager.possibleGameModes
  const handleSetGameMode = gm => {
    GameManager.setGameMode(gm)
    setGameMode(gm)
    if (gm) {
      GameManager.setGameState(GameManager.possibleGameStates.started) //started
    }
  }

  return (
    <div className="gamemode-picker">
      <div className="left-buttons">
        <StartMenuButton
          onClick={() => handleSetGameMode(SINGLEPLAYER)}
          rightcorner={true}
        >
          {SINGLEPLAYER}
        </StartMenuButton>
        <StartMenuButton
          onClick={() => handleSetGameMode(MULTIPLAYER)}
          rightcorner={true}
        >
          {MULTIPLAYER}
        </StartMenuButton>
        <StartMenuButton
          onClick={() => handleSetGameMode(LOCALPLAYER)}
          rightcorner={true}
        >
          {LOCALPLAYER}
        </StartMenuButton>
      </div>
    </div>
  )
}

export default GamemodePicker

/*
TODO: improvements according to chatGPT 

  Conditional Styling: You can add some conditional styling to highlight the selected game mode button. For example, you can apply a different class to the active button to indicate the current game mode.

  Reuse Components: If you have a consistent UI theme throughout your application, 
  you can create a reusable button component that includes the game mode text and 
  handles the click event. This can help reduce redundancy in your code.
*/
