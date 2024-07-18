import React from "react";

// css
import "./heroComponent.css";

// asset
import heroImage from "../assets/hero_image.png";

// mui
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';

const HeroComponent = () => {
    return (
        <div className="heroComponent">
            <div className="hero-left">
                <p>NEW ARRIVALS ONLY</p>
                <h1>new <br /> collections <br /> for everyone</h1>
                <button>Latest Collection <span className="right-icon"><ArrowRightAltIcon/></span></button>
            </div>

            <div className="hero-right">
                <img src={heroImage} alt="" />
            </div>
        </div>
    )
}

export default HeroComponent;