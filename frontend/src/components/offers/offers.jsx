import React from "react";

// assets
import exclusive_image  from "../assets/exclusive_image.png";

// css
import "./offers.css";

const Offer = () => {
    return (
        <div className="offer">
            <div className="offer-left">
                <h1>EXCLUSIVE</h1>
                <h1>Offers for You</h1>
                <p>ONLY ON BEST SELLERS PRODUCTS</p>

                <button>Check Now</button>
            </div>

            <div className="offer-right">
                <img src={exclusive_image} alt="" />
            </div>
        </div>
    );
}

export default Offer;