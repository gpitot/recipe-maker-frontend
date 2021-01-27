import React, { useEffect, useState } from "react";
import { useParams, useLocation, Redirect } from "react-router-dom";

import Information from "components/Information";
import style from "./style.module.scss";
import API from "rest/api";
import { IRanks, IMatches } from "rest/ladder";
import List from "components/List";
import UserRow from "components/UserRow";
import Ranks from "pages/Ladder/ranks";
import Matches from "pages/Ladder/matches";

interface ParamTypes {
  ladderid?: string;
}

interface IProps {
  ladderid: number;
}

const Ladder = ({ ladderid }: IProps) => {
  //const { ladderid } = useParams<ParamTypes>();

  return (
    <>
      <Ranks ladderid={ladderid} />
      <Matches ladderid={ladderid} challenges={true} />
      <Matches ladderid={ladderid} challenges={false} />
    </>
  );
};

export default Ladder;
