import React from "react";
import style from "./style.module.scss";

import { IShop } from "rest/shop";
import Button from "components/Button";

const Product = ({ name, image, description, price, discount }: IShop) => {
  return (
    <div className={style.product}>
      <h5>{name}</h5>
      <img src={image} />
      <p>{description}</p>
      <div className={style.price}>${price}</div>
      <Button text="Buy" handleClick={() => {}} />
    </div>
  );
};

export default Product;
