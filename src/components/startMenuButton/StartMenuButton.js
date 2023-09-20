import "./startmenubutton.css"

const StartMenuButton = ({ onClick, children, className }) => {
  return (
    <div className={"start-menu-button " + (className || "")}>
      <span className="block-field" onClick={onClick}>
        {children}
      </span>
      <span className="cutted-corner" onClick={onClick}></span>
    </div>
  )
}
export default StartMenuButton
