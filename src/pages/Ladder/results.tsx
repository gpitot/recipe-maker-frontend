import React from "react";
import List from "components/List";
import { IMatches } from "rest/ladder";
import UserRow from "components/UserRow";
import EventDate from "components/EventDate";
import style from "./style.module.scss";
interface IProps {
  matches: Array<IMatches>;
}

const Results = ({ matches }: IProps) => {
  const body = matches.map(
    ({
      player_1,
      player_1_firstname,
      player_1_photo,
      player_2,
      player_2_firstname,
      player_2_photo,
      match_date,
      player_2_games,
      player_1_games,
    }) => {
      const winner = player_1_games === 3 ? player_1 : player_2;
      return [
        <>
          <td className={winner === player_1 ? style.win : style.lose}>
            <UserRow
              id={player_1}
              name={player_1_firstname}
              photo={player_1_photo}
            />
          </td>
          <td className={winner === player_2 ? style.win : style.lose}>
            <UserRow
              id={player_2}
              name={player_2_firstname}
              photo={player_2_photo}
            />
          </td>
          <td>
            <span>
              {player_1_games} - {player_2_games}
            </span>
          </td>
          <td>
            <span>
              <EventDate time={match_date} />
            </span>
          </td>
        </>,
      ];
    }
  );
  return (
    <List
      title="Recent results"
      headers={["Challenger", "Opponent", "Result", "Date"]}
      body={body}
      columnsInBuilt={true}
    />
  );
};

export default Results;
