import { React } from "react"
import "./styles.css";

let ButtonLite = (props) => {
    return (
        <div className="ButtonLite">
            <button onClick={props.onClick}>{props.name}</button>
        </div>
    )
}
export default ButtonLite;