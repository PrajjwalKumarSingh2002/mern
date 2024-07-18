import React, { useContext } from "react";

// components
import Item from "../components/item/item.jsx";

// context
import { ShopContext } from "../context/shopContext";

// css
import "./CSS/shopCategory.css";

const ShopCategoryPage = (props) => {
    const {all_product} = useContext(ShopContext);

    return (
        <div className="shop-category">
            {/* <div>ShopCategoryPage Page</div> */}

            <img src={props.banner} alt="" className="shopcategory-banner" />

            <div className="shop-category-indexSort">
                <div className="shopcategory-options">
                    <p>
                        <span>Showing 1 - 12</span> out of 36 products
                    </p>

                    <div className="sub-category-sort">
                        Sort by <img src="" alt="drop-down-icon" />
                    </div>
                </div>

                <div className="shop-category-products">
                    {all_product.map((item, i) => {
                        if(item.category === props.category){
                            return <Item key={i} id={item.id}
                            name={item.name}
                            image={item.image}
                            new_price={item.new_price}
                            old_price={item.old_price} />
                        }
                        else return null;
                    })}
                </div>

                <button className="explore-more">Explore more</button>

            </div>
        </div>
    )
}

export default ShopCategoryPage;