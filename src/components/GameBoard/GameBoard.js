import { useState, useEffect, useCallback } from "react"

import gameManagerInstance from "../GameManager"
import subscriptionManagerInstance from "../SubscribtionManager"
import subscription from "../Subscribtion"

import "./gameboard.css"
import GameButton from "../gamebuttons/GameButton"
const GameBoard = () => {
  const [board, setBoard] = useState(gameManagerInstance.getPlayGround())
  const [winner, setWinner] = useState(gameManagerInstance.getWinner())
  const [mappedBoard, setMappedBoard] = useState()

  const makeMappedBoard = useCallback(() => {
    const mapped = []

    board.forEach((row, rowIndex) => {
      const mappedRow = []
      row.forEach((cell, cellIndex) => {
        mappedRow.push(
          <GameButton
            key={cellIndex}
            className="cell"
            onClick={() => handleCellClick(rowIndex, cellIndex)}
          >
            {cell}
          </GameButton>
        )
      })
      mapped.push(
        <div key={rowIndex} className="row">
          {mappedRow}
        </div>
      )
    })
    setMappedBoard(mapped)
  }, [board])

  useEffect(() => {
    const updateWinner = () => {
      setWinner(gameManagerInstance.getWinner())
    }
    const subWinner = new subscription(
      subscription.getTypes().win,
      updateWinner
    )

    const updatePlayground = () => {
      console.log("updatedPlayground:", gameManagerInstance.getPlayGround())
      setBoard(gameManagerInstance.getPlayGround())
      makeMappedBoard()
    }
    const subPlayground = new subscription(
      subscription.getTypes().playground,
      updatePlayground
    )
    makeMappedBoard()

    subscriptionManagerInstance.subscribe(subPlayground)
    subscriptionManagerInstance.subscribe(subWinner)

    // Unsubscribe on unmount
    return () => {
      subscriptionManagerInstance.unsubscribe(subPlayground)
      subscriptionManagerInstance.unsubscribe(subWinner)
    }
  }, [makeMappedBoard])

  const handleCellClick = (row, cell) => {
    if (gameManagerInstance.isUIBlocked === true) return
    console.log(row, cell, gameManagerInstance.getPlayersTurn())

    gameManagerInstance.makePlayerMove(
      gameManagerInstance.getPlayersTurn(),
      row,
      cell
    )
  }

  const getWinnerText = () => {
    if (winner === gameManagerInstance.WINNERONDRAW) {
      return "Game ended as Draw!"
    }
    return winner + " has won!"
  }

  return (
    <div className="tictactoe">
      <div className="board">{mappedBoard}</div>
      {winner ? (
        <div className="ui-blocker">
          <h1>{getWinnerText()}</h1>
          <button
            onClick={() => {
              gameManagerInstance.restartGame()
            }}
          >
            Restart Game
          </button>
          <button
            onClick={() => {
              gameManagerInstance.setGameState(
                gameManagerInstance.possibleGameStates.initial
              )
              gameManagerInstance.resetPlayGround()
            }}
          >
            QUIT GAME
          </button>
        </div>
      ) : (
        <></>
      )}
    </div>
  )
}

export default GameBoard

/*
TODO: improvements according to chatGPT 
  Additional Comments: While your code is relatively easy to read, consider adding 
  comments to explain complex logic or the purpose of specific methods, especially if other 
  developers will work with it.

  UI Enhancement: You might consider enhancing the user interface by adding more visual cues 
  or animations to make the game more engaging. For example, you could highlight the winning 
  cells when a player wins.

  Testing: Consider adding unit tests for your component to ensure that it functions 
  correctly under different scenarios.

  Refactoring: Depending on the complexity of your application, 
  you might consider breaking down some parts of the component into smaller, 
  reusable components. For example, the game board rendering logic could be 
  extracted into a separate component if it becomes more complex.

*/
