import React from "react";

// css
import "./footer.css";

//mui
import InstagramIcon from '@mui/icons-material/Instagram';
import PinterestIcon from '@mui/icons-material/Pinterest';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import CopyrightIcon from '@mui/icons-material/Copyright';

// assets
import logo from "../assets/logo.png";

const Footer = () => {
    return (
        <div className="footer">
            <div className="footer-logo">
                <img src={logo} alt="" />
                <h1>SHOPPER</h1>
            </div>

            <div className="footer-menu">
                <li>Company</li>
                <li>Products</li>
                <li>Offices</li>
                <li>About</li>
                <li>Contact</li>
            </div>

            <div className="footer-social-icons">
                <InstagramIcon/>
                <PinterestIcon/>
                <WhatsAppIcon/>
            </div>

            <div className="footer-copyright">
                <span>Copyright</span>
                <CopyrightIcon /> 
                <span>2024 - All Rights Reserved</span>
            </div>
        </div>
    );
}

export default Footer;