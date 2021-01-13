import React, { useEffect, useState } from "react";
import Information from "components/Information";
import style from "./style.module.scss";
import API from "rest/api";
import { IRanksResponse } from "rest/ladder";
import List from "components/List";

const Ladder = () => {
  useEffect(() => {
    API.ladder
      .getRanks({
        ladder_id: 1,
      })
      .then((res) => {
        console.log(res);
      });
  }, []);

  return null;
};

export default Ladder;
