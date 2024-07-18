import React, { useContext, useState, useEffect } from "react";

// components
import CartItems from "../components/cartItems/cartItems";

// css
import "./CSS/cart.css";

import { ShopContext } from "../context/shopContext";

const CartPage = () => {
    const {all_product, cart, cartArray, getTotalAmount} = useContext(ShopContext);

    const [subTotal, shippingFee] = getTotalAmount();

    return (
        <div className="cart">
            {cartArray.length === 0 ? <h1>No Items have been added to cart !!</h1> : 
                <div>
                    
                    <div className="cart-title">
                        <p>Products</p>
                        <p className="title">Title</p>
                        <p>Price</p>
                        <p>Quantity</p>
                        <p>Total</p>
                        <p>Delete Item</p>
                    </div>
                    <hr />

                    <div className="cart-products">
                        {
                            cartArray.map((item, i) => {
                                console.log(typeof(item));

                                // const product = all_product[(item.itemId) - 1];
                                const product = item;
                                return <CartItems key={i} product={product} quantity={item.quantity} />
                            })
                        }

                    </div>
                    
                    <div className="cart-total">

                        <div className="cart-summary">
                            <h2>Cart Total</h2>
                            <hr className="hr"/>

                            <div className="cart-sub-total">
                                <p>Subtotal</p>
                                <p>${subTotal}</p>
                            </div>
                            <hr className="hr"/>

                            <div className="cart-shipping-fee">
                                <p>Shipping Fee</p>
                                <p>${shippingFee}</p>
                            </div>
                            <hr className="hr"/>

                            <div className="cart-total-charge">
                                <p>Total</p>
                                <p>${subTotal + shippingFee}</p>
                            </div>
                        </div>

                        <div className="promo-code">
                            <p>Enter promo code here</p>

                            <div className="promo-code-input">
                                <input type="text" placeholder="promo code" />
                                <button>Submit</button>
                            </div>
                        </div>

                    </div>

                </div>
            }
        </div>
    )
}

export default CartPage;