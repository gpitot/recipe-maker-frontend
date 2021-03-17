import React, { useState } from "react";
import style from "./style.module.scss";

import { IShop } from "rest/shop";
import Button from "components/Button";
import API from "rest/api";
import { useFlags } from "@atlaskit/flag";
import SuccessIcon from "@atlaskit/icon/glyph/check-circle";
import { G400 } from "@atlaskit/theme/colors";
import ErrorIcon from "@atlaskit/icon/glyph/error";
import { R400 } from "@atlaskit/theme/colors";

const Product = ({ id, name, image, description, price, link }: IShop) => {
  const [loading, setLoading] = useState(false);
  const [purchased, setPurchased] = useState(false);
  const { showFlag } = useFlags();

  const handleClick = () => {
    setLoading(true);
    API.shop
      .addTransaction(id)
      .then((res) => {
        showFlag({
          title: "Thank you for shopping with us",
          icon: <SuccessIcon label="success" secondaryColor={G400} />,
          appearance: "success",
        });
        setPurchased(true);
      })
      .catch(() => {
        showFlag({
          title: "Something went wrong, try again",
          icon: <ErrorIcon label="error" secondaryColor={R400} />,

          appearance: "error",
        });
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
