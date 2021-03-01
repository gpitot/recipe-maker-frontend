import Product from "components/Product";
import React, { useState, useEffect } from "react";
import API from "rest/api";
import { ShopCategory, IShop } from "rest/shop";

const Shop = () => {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState<Array<IShop>>([]);

  useEffect(() => {
    API.shop
      .getShop(ShopCategory.coaching)
      .then((res) => {
        console.log("shop ", res);
        setItems(res.result);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <section>
      {items.map((item) => (
        <Product {...item} />
      ))}
    </section>
  );
};

export default Shop;
