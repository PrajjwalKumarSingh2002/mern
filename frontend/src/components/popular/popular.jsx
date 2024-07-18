import React, {useContext} from "react";

//components
import Item from "../item/item.jsx";

//css
import "./popular.css";

import { ShopContext } from "../../context/shopContext";

import data_product from "../assets/data";

const Popular = () => {
    let {all_product} = useContext(ShopContext);
    all_product = Object.values(all_product);
    console.log(all_product);

    return (
        <div className="popular">
            <h1>POPULAR IN WOMEN</h1>
            <hr />

            <div className="popular-item">
                {all_product.map((item, i) => {
                    if(item.category == "women"){
                        return <Item  key={i} id={item.id} 
                        image={item.image} 
                        name={item.name} 
                        new_price={item.new_price} 
                        old_price={item.old_price}/>
                    }
                })}
            </div>
        </div>
    );
}

export default Popular;