import React from "react";
import ShopItems from "components/ShopItems";
import { ShopCategory } from "rest/shop";

const Shop = () => <ShopItems category={ShopCategory.product} />;

export default Shop;
