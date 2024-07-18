import React, { useContext } from "react";

// mui
import DeleteIcon from '@mui/icons-material/Delete';

// context
import { ShopContext } from "../../context/shopContext";

// css
import "./cartItems.css";

const CartItems = (props) => {
    const product = props.product;
    const {removeFromCart} = useContext(ShopContext);

    return (
        <div className="cart-item-container">
            

            <div className="cartItem">
                <img src={product.image} alt="" />

                <p className="title">{product.name}</p>

                <p>${product.new_price}</p>
                <p className="quantity">{props.quantity}</p>
                <p>${Number(product.new_price) * Number(props.quantity)}</p>

                <DeleteIcon className="delete-icon" onClick={() => { removeFromCart(String(product.itemId)); }} />
            </div>

            <hr />
        </div>
    );
}

export default CartItems;