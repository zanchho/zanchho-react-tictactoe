import "./gamebutton.css"
const GameButton = ({ className, onClick, children }) => {
  return (
    <button className={"game-button " + className} onClick={onClick}>
      {children}
    </button>
  )
}
export default GameButton
