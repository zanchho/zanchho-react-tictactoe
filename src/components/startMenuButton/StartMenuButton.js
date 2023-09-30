import "./startmenubutton.css"

const StartMenuButton = ({ onClick, children, className, rightcorner }) => {
  return (
    <div className={"start-menu-button " + (className || "")}>
      {!rightcorner ? (
        <span className="cutted-corner-left" onClick={onClick}></span>
      ) : (
        <></>
      )}
      <span className={"block-field"} onClick={onClick}>
        {children}
      </span>
      {rightcorner ? (
        <span className="cutted-corner" onClick={onClick}></span>
      ) : (
        <></>
      )}
    </div>
  )
}
export default StartMenuButton
