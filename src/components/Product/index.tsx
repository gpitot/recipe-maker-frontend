import React, { useState } from "react";
import style from "./style.module.scss";

import { IShop } from "rest/shop";
import Button from "components/Button";
import API from "rest/api";
import { toast } from "react-toastify";

const Product = ({ id, name, image, description, price, link }: IShop) => {
  const [loading, setLoading] = useState(false);
  const [purchased, setPurchased] = useState(false);

  const handleClick = () => {
    setLoading(true);
    API.shop
      .addTransaction(id)
      .then((res) => {
        toast.success("Thank you for shopping with us");
        setPurchased(true);
      })
      .catch(() => {
        toast.error("Something went wrong, try again");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  if (loading) {
    return (
      <div className={style.product}>
        <h5>Purchasing...</h5>
      </div>
    );
  }

  if (purchased) {
    return (
      <div className={style.product}>
        <h5>Thank you for shopping with us</h5>
        <p>We will be in contact to organise your purchase.</p>
      </div>
    );
  }

  return (
    <div className={style.product}>
      <h5>{name}</h5>
      {image && <img src={`/shop/${image}`} alt={name} />}
      {description && <p>{description}</p>}
      <div className={style.buyLink}>
        {link ? (
          <Button type="link" text={`Buy for $${price}`} href={link} />
        ) : (
          <Button text={`Buy for $${price}`} handleClick={handleClick} />
        )}
      </div>
    </div>
  );
};

export default Product;
