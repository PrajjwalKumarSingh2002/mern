import React from "react";

// css
import "./item.css";
import { Link } from "react-router-dom";

const Item = (props) => {
    return (
        <div className="item" style={{textDecoration : "none"}}>
            <Link to={`/product/${props.id}`}>
                <img src={props.image} alt="" onClick={window.scrollTo(0,0)} />
            </Link>

            <p>{props.name}</p>

            <div className="itemPrices">
                <div className="itemPriceNew">${props.new_price}</div>
                <div className="itemPriceOld">${props.old_price}</div>
            </div>
        </div>        
    );
}

export default Item;