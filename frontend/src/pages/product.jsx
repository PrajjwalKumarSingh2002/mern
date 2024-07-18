import React, { useContext } from "react";

// components
import Breadcrum from "../components/breadcrum/breadcrum";
import ProductDisplay from "../components/productDisplay/productDisplay";
import DescriptionBox from "../components/descriptionBox/descriptionBox";

// context
import { ShopContext } from "../context/shopContext";

// react-router-dom
import { useParams } from "react-router-dom";

const ProductPage = () => {
    const {all_product} = useContext(ShopContext);
    const {productId} = useParams();
    // console.log(productId, typeof productId);

    const product = all_product.find((e) => e.id === Number(productId))

    return (
        <div className="product-page">
            {/* <div>ProductPage Page</div> */}
            {/* <Breadcrum /> */}

            <ProductDisplay product={product}/>
            <DescriptionBox />
        </div>
    )
}

export default ProductPage;