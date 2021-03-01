import React from "react";
import style from "./style.module.scss";

import { IShop } from "rest/shop";
import Button from "components/Button";
import API from "rest/api";
import PaymentForm from "components/PaymentForm";

const Product = ({ name, image, description, price, discount }: IShop) => {
  const handleBuy = () => {
    //API.shop.addTransaction();
  };

  return (
    <div className={style.product}>
      <h5>{name}</h5>
      <img src={image} alt={name} />
      <p>{description}</p>
      <Button text={`Buy for $${price}`} handleClick={() => {}} />
      <PaymentForm />
    </div>
  );
};

export default Product;
