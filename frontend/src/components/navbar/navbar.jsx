import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";

// context
import { ShopContext } from "../../context/shopContext";

// css
import "./navbar.css";

// mui
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

//assets
// import logo from "C:\Users\HP\Desktop\web devlopment\full stack projects\ecommerce app\frontend\src\assets\logo.png"
// import logo from "frontend\src\assets\logo.png"
// import logo from "..\assets\logo.png"

const Navbar = () => {
    const [menu, setMenu] = useState("shop");
    const {cartArray} = useContext(ShopContext);

    const handleLogout = () => {
        localStorage.removeItem("auth-token");
        window.location.replace("/");
    }

    return (

        <div className="navbar">
            <div className="nav-logo">
                {/* <img src={logo} alt="" /> */}
                <h2>SHOPPER</h2>
            </div>

            <div className="nav-menu">
                <li onClick={() => setMenu("shop")}>
                    <Link to="/" className="nav-link">Shop</Link> 
                    {menu === "shop" ?<hr/> : <></>}
                </li>

                <li onClick={() => setMenu("kids")}>
                    <Link to="/kids" className="nav-link">Kids</Link>  
                    {menu === "kids" ?<hr/> : <></>}
                </li>

                <li onClick={() => setMenu("men")}>
                    <Link to="/mens" className="nav-link">Men</Link>  
                    {menu === "men" ?<hr/> : <></>}
                </li>

                <li onClick={() => setMenu("women")}>
                    <Link to="/womens" className="nav-link">Women</Link>  
                    {menu === "women" ?<hr/> : <></>}
                </li>
            </div>

            <div className="nav-login-cart">
                
                    {localStorage.getItem("auth-token") ? 
                    <button onClick={handleLogout}>Logout</button> 
                    : <Link to="/login"><button>Login</button></Link>}
                    
                
                
                <Link to="/cart" className="nav-link">
                    <ShoppingCartIcon className="cart-icon"/>
                </Link>
                
                <p className="nav-cart-counter">{cartArray.length}</p>
            </div>
        </div>
    )
}

export default Navbar;