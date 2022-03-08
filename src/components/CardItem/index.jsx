import React from "react"
import "./styles.css";


let CardItem = (props) => {
    return (<>
        <div className="Card">
            <img src={props.imageUrl} alt="" />
            <div className="PanelCard-info">
                <div className="PanelCard-InfoName">
                    <h4>{props.title}</h4>
                </div>
                <div className="PanelCard-InfoPrice">
                    <nav>Price</nav>
                    <nav>0.23</nav>
                    <nav>2 days </nav>
                </div>
            </div>
            <button>Buy Now</button>
        </div>
    </>)
}
export default CardItem;