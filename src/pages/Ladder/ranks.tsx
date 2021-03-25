import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "contexts/UserContext";
import { LadderContext } from "contexts/LadderContext";

import API from "rest/api";
import { IRanks } from "rest/ladder";
import List from "components/List";
import UserRow from "components/UserRow";
import Button from "components/Button";
import { useFlags } from "@atlaskit/flag";
import SuccessIcon from "@atlaskit/icon/glyph/check-circle";
import { G400 } from "@atlaskit/theme/colors";
import ErrorIcon from "@atlaskit/icon/glyph/error";
import { R400 } from "@atlaskit/theme/colors";
import Signup from "pages/Ladder/signup";

interface IProps {
  ladderid: number;
}

const Ranks = ({ ladderid }: IProps) => {
  const { user } = useContext(UserContext);
  const { loadRanks } = useContext(LadderContext);
  const { showFlag } = useFlags();

  const [loading, setLoading] = useState(true);
  const [ranks, setRanks] = useState<Array<IRanks>>([]);
  const [challenged, setChallenged] = useState<Array<number>>([]);

  useEffect(() => {
    loadRanks(ladderid)
      .then(({ data }) => {
        setRanks(data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [loadRanks, ladderid]);

  const challengeUser = (player_id: number) => {
    setChallenged([...challenged, player_id]);
    API.ladder
      .challengeUser({
        ladder_id: ladderid,
        player_2: player_id,
      })
      .then((res) => {
        if (res.success) {
          //show flag
          showFlag({
            isAutoDismiss: true,
            title: "Challenged player",
            icon: <SuccessIcon label="success" secondaryColor={G400} />,
            appearance: "success",
          });
        } else {
          showFlag({
            isAutoDismiss: true,
            title: res.err,
            icon: <ErrorIcon label="error" secondaryColor={R400} />,

            appearance: "error",
          });
        }
      })
      .catch(() => {
        //error flag
        showFlag({
          isAutoDismiss: true,
          title: "Could not challenge player",
          icon: <ErrorIcon label="error" secondaryColor={R400} />,

          appearance: "error",
        });
      });
  };

  // if (ladderid === undefined) {
  //   return <Redirect to="/" />;
  // }

  const body = ranks.map(({ id, firstname, photo }, rank) => {
    return [
      rank + 1,
      <UserRow id={id} name={firstname} photo={photo} />,
      <>
        {user && user.id !== id && (
          <Button
            disabled={challenged.includes(id)}
            handleClick={() => challengeUser(id)}
            text={"Challenge"}
          />
        )}
      </>,
    ];
  });

  console.log("ranks loading : ", loading);

  return (
    <>
      {!loading && <Signup ladder_id={ladderid} players={ranks} />}
      <List title="Ranks" headers={["Rank", "Player", ""]} body={body} />
    </>
  );
};

export default Ranks;
