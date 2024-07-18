import React, { createContext, useEffect, useState } from "react";

// import all_product from "../components/assets/all_product.js";

export const ShopContext = createContext(null);

let cart = {};
let trackAllProduct = [];

const ShopContextProvider = (props) => {
    const [cartArray, setCartArray] = useState(Object.values(cart));
    const [all_product, setAllProduct] = useState([]);

    useEffect(() => {
        fetch("http://localhost:4000/allproducts")
        .then(res => res.json())
        .then(data => {
            console.log(data);
            // console.log("category : ", data[0].category)
            setAllProduct(data);
            trackAllProduct = all_product;
        });

        if(localStorage.getItem("auth-token")){
            fetch("http://localhost:4000/allcartitems", {
                method : "POST",
                headers : {
                    accept : "application/json",
                    "Content-Type" : "application/json",
                    "auth-token" : `${localStorage.getItem("auth-token")}`,
                },
                body : ""
            })
            .then(res => {return res.json()})
            .then(data => {
                cart = data.cart;
                setCartArray(Object.values(cart));
            });
        }

    }, []);

    const getAllProduct = () => {
        // console.log("all_product context : " , all_product);
        console.log("all_product context : " , trackAllProduct);
        return trackAllProduct;
    }

    const addToCart = (itemId, quantity, new_price, name, image) => {
        console.log("Addded : ",itemId);
        const curItem = {
            itemId : Number(itemId),
            quantity : Number(quantity),
            new_price : new_price,
            name : name,
            image : image
        };

        if(localStorage.getItem("auth-token")){
            fetch("http://localhost:4000/addtocart", {
                method : "POST",
                headers : {
                    Accept : "application/form-data",
                    "auth-token" : `${localStorage.getItem("auth-token")}`,
                    "content-Type" : "application/json",
                },
                body : JSON.stringify({item : curItem})
            })
            .then(res => res.json())
            .then(data => {
                console.log("\n",data);
                cart = data.cart;
                setCartArray(Object.values(cart));
            });
        }
        return;
    }

    const removeFromCart = (itemId) => {
        const curItem = {
            itemId : Number(itemId),
        };

        if(localStorage.getItem("auth-token")){
            fetch("http://localhost:4000/removefromcart", {
                method : "POST",
                headers : {
                    Accept : "application/form-data",
                    "auth-token" : `${localStorage.getItem("auth-token")}`,
                    "content-Type" : "application/json",
                },
                body : JSON.stringify({item : curItem})
            })
            .then(res => {return res.json()})
            .then(data => {
                cart = data.cart;
                setCartArray(Object.values(cart));
            });
        }
        return;
    }

    const getTotalAmount = () => {
        let totalAmount = 0, shippingFee = 0;

        for(let i = 0;i < cartArray.length;i++){
            const singleUnitPrice = cartArray[i].new_price;
            totalAmount += (Number(singleUnitPrice) * Number(cartArray[i].quantity));
        }
        // console.log(totalAmount);
        if(totalAmount < 500) shippingFee = 10
        return [totalAmount, shippingFee];
    }

    
    const contextValue = {all_product, cart, cartArray, getAllProduct, addToCart, removeFromCart, getTotalAmount};

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;