import React, { useContext, useEffect, useState } from "react";
import {useLocation, useParams} from "react-router-dom";

// context
import { ShopContext } from "../../context/shopContext";

//mui
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';

// css
import "./productDisplay.css";

let curProduct = {};
let cnt = 1;

const ProductDisplay = (props) => {
    if(cnt){
        curProduct = props.product;
        cnt = 0;
    }
    const product = curProduct;
    
    // product 
    console.log(curProduct);
    console.log(product);
    const [quantity, setQuantity] = useState(1);

    const {addToCart} = useContext(ShopContext);

    // const [size, setSize] = useState("S");

    return (
        
        <div className="productDisplay">
            {console.log("with return : ", product)}
            {/* Product Display Page */}

            <div className="productDisplay-left">
                <div className="imageList">
                    <img src={product.image} alt="" />
                    <img src={product.image} alt="" />
                    <img src={product.image} alt="" />
                    <img src={product.image} alt="" />
                </div>

                <div className="big-image">
                    <img src={product.image} alt="" />
                </div>
            </div>

            <div className="productDisplay-right">
                <h1>{product.name}</h1>

                <div className="product-rating">

                </div>

                <div className="product-prices">
                    <div className="oldPrice">${product.old_price}</div>
                    <div className="newPrice">${product.new_price}</div>
                </div>

                <div className="product-description">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Soluta laboriosam asperiores distinctio quaerat. Soluta, adipisci quibusdam dolores ipsum quisquam, aspernatur dolorum eligendi distinctio blanditiis doloremque expedita ab ratione, sapiente eveniet.
                </div>

                <div className="product-size-options">
                    Select Size
                    <div className="sizes">
                        <p className="S">S</p>
                        <p className="M">M</p>
                        <p className="L">L</p>
                        <p className="XL">XL</p>
                        <p className="XXL">XXL</p>
                    </div>
                </div>

                <div className="product-quantity">
                    Select Quantity :
                    
                    <div className="product-quantity-container">
                        <button onClick={() => (quantity > 1) ? setQuantity(quantity - 1) : quantity}> <RemoveIcon /> </button>
                        <p>{quantity}</p>
                        <button onClick={() => setQuantity(quantity + 1)}> <AddIcon /> </button>
                    </div>
                </div>

                <button className="add-to-cart" onClick={() => {
                    addToCart(String(product.id), String(quantity), Number(product.new_price), product.name, product.image);
                    // console.log("added to cart");
                    }}>Add To Cart</button>
            </div>
        </div>
    );
}

export default ProductDisplay;