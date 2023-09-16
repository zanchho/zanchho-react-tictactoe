import { useState, useEffect, useCallback } from "react"
import gameManagerInstance from "../GameManager"
import "./gameboard.css"
import subscriptionManagerInstance from "../SubscribtionManager"
import Subscription from "../Subscribtion"
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
          <button
            key={cellIndex}
            className="cell"
            onClick={() => handleCellClick(rowIndex, cellIndex)}
          >
            {cell}
          </button>
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
    const updatePlayground = () => {
      console.log("updatedPlayground:", gameManagerInstance.getPlayGround())
      setBoard(gameManagerInstance.getPlayGround())
      makeMappedBoard()
    }
    const subPlayground = new Subscription(
      Subscription.getTypes().playground,
      updatePlayground
    )
    makeMappedBoard()
    subscriptionManagerInstance.subscribe(subPlayground)

    // Unsubscribe on unmount
    return () => {
      subscriptionManagerInstance.unsubscribe(subPlayground)
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

  return (
    <div className="tictactoe">
      <div className="board">{mappedBoard}</div>
      {winner ? (
        <div className="ui-blocker">
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
