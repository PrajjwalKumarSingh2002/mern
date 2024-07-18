import React, { useContext } from "react";

// components
import Item from "../item/item.jsx";

//css
import "./newCollections.css";

import { ShopContext } from "../../context/shopContext.jsx";

const NewCollections = () => {
    let {all_product} = useContext(ShopContext);
    all_product = Object.values(all_product);

    return (
        <div className="new-collections">
            <h1>NEW COLLECTIONS</h1>
            <hr />

            <div className="collections">
                {all_product.map((item, i) => {
                    if(i < 10){
                        return <Item key={i} id={item.id} 
                        name={item.name}
                        image={item.image}
                        new_price={item.new_price}
                        old_price={item.old_price} />;
                    }
                })}
            </div>
        </div>
    );
}

export default NewCollections;