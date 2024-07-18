import React from "react";

// components
import HeroComponent from "../components/heroComponent/heroComponent";
import Popular from "../components/popular/popular";
import Offer from "../components/offers/offers";
import NewCollections from "../components/newCollections/newCollections";

const ShopPage = () => {
    return (
        <div>
            <HeroComponent/>
            {/* <div>ShopPage Page</div> */}

            <Popular />
            <Offer />
            <NewCollections />

        </div>
    )
}

export default ShopPage;