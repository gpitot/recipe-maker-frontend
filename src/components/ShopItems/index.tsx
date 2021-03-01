import Product from "components/Product";
import React, { useState, useEffect } from "react";
import API from "rest/api";
import { ShopCategory, IShop } from "rest/shop";
import style from "./style.module.scss";

const Shop = ({ category }: { category: ShopCategory }) => {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState<Array<IShop>>([]);

  useEffect(() => {
    API.shop
      .getShop(category)
      .then((res) => {
        setItems(res.result);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [category]);

  return (
    <section className={style.products}>
      {items.map((item) => (
        <Product {...item} />
      ))}
    </section>
  );
};

export default Shop;
