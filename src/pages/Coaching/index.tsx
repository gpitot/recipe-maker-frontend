import React, { useEffect } from "react";
import API from "rest/api";
import { ShopCategory } from "rest/shop";

const Coaching = () => {
  useEffect(() => {
    API.shop.getShop(ShopCategory.coaching).then((res) => {
      console.log("shop ", res);
    });
  }, []);

  return (
    <section>
      <h1>Coming soon</h1>
    </section>
  );
};

export default Coaching;
