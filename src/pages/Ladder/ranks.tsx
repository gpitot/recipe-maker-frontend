import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "contexts/UserContext";

import API from "rest/api";
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
import { useRanksStore } from "../../store/ranks";
interface IProps {
  ladderid: number;
}

const Ranks = ({ ladderid }: IProps) => {
  const { user } = useContext(UserContext);
  const { showFlag } = useFlags();

  const [challenged, setChallenged] = useState<Array<number>>([]);

  const [{ ranks }, actions] = useRanksStore();

  useEffect(() => {
    actions.initialLoad(ladderid);
  }, [ladderid, actions]);

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

  if (!ranks[ladderid]) return null;
  const { data, loading } = ranks[ladderid];

  let userRankIndex = data.length;
  for (let i = 0; i < data.length; i += 1) {
    if (data[i].id === user.id) {
      userRankIndex = i;
      break;
    }
  }

  const renderChallengeState = (index: number, id: number) => {
    if (index >= userRankIndex - 5)
      return (
        <Button
          disabled={challenged.includes(id) || index === userRankIndex}
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
    if (visualRank <= 1) {
      className = style.gold;
    } else if (visualRank <= 3) {
      className = style.silver;
    } else if (visualRank <= 10) {
      className = style.bronze;
    }
    return <td className={className}>#{visualRank}</td>;
  };

  const body = data.map(({ id, firstname, photo }, rank) => {
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
      {!loading && <Signup ladder_id={ladderid} players={data} />}
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
