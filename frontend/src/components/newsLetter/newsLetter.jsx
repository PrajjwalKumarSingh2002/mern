import React from "react";

// css
import "./newsLetter.css";

const NewsLetter = () => {
    return (
        <div className="newsletter">
            <h1>Get Exclusive Offers on Your E-mail</h1>
            <p>Subscribe to our newsletter and stay updated</p>

            <div className="email-box">
                <input type="email" placeholder="enter your e-mail" />
                <button>Subscribe</button>
            </div>
        </div>
    );
}

export default NewsLetter;