import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "contexts/UserContext";

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
import style from "./style.module.scss";
interface IProps {
  ladderid: number;
}

const Ranks = ({ ladderid }: IProps) => {
  const { user } = useContext(UserContext);
  const { showFlag } = useFlags();

  const [loading, setLoading] = useState(true);
  const [ranks, setRanks] = useState<Array<IRanks>>([]);
  const [challenged, setChallenged] = useState<Array<number>>([]);

  useEffect(() => {
    API.ladder
      .getRanks({
        ladder_id: ladderid,
      })
      .then((res) => {
        if (res.success) {
          setRanks(res.result);
          setLoading(false);
        }
      });
  }, [ladderid]);

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

  let userRankIndex = ranks.length;
  for (let i = 0; i < ranks.length; i += 1) {
    if (ranks[i].id === user.id) {
      userRankIndex = i;
      break;
    }
  }

  const renderChallengeState = (index: number, id: number) => {
    if (index === userRankIndex) return null;

    if (index >= userRankIndex - 5)
      return (
        <Button
          disabled={challenged.includes(id)}
          handleClick={() => challengeUser(id)}
          text={"Challenge"}
        />
      );

    return (
      <img
        src="/assets/padlock.png"
        className={style.padlock}
        alt="locked challenge"
      />
    );
  };

  const renderLadderLeague = (rank: number) => {
    const visualRank = rank + 1;
    let className = undefined;
    if (visualRank <= 3) {
      className = style.gold;
    } else if (visualRank <= 8) {
      className = style.silver;
    } else if (visualRank <= 13) {
      className = style.bronze;
    }
    return <td className={className}>#{visualRank}</td>;
  };

  const body = ranks.map(({ id, firstname, photo }, rank) => {
    return [
      <>
        {renderLadderLeague(rank)}
        <td>
          <UserRow id={id} name={firstname} photo={photo} />
        </td>
        <td>{renderChallengeState(rank, id)}</td>
      </>,
    ];
  });

  return (
    <>
      {!loading && <Signup ladder_id={ladderid} players={ranks} />}
      <List
        title="Ranks"
        headers={["Rank", "Player", ""]}
        body={body}
        columnsInBuilt={true}
      />
    </>
  );
};

export default Ranks;
