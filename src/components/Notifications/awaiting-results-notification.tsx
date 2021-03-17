import React, { useEffect, useState } from "react";
import API from "rest/api";
import { IMatches } from "rest/ladder";

import { useFlags } from "@atlaskit/flag";
import InfoIcon from "@atlaskit/icon/glyph/info";
import { useHistory } from "react-router";

const AwaitingResultsNotification = () => {
  const [_, setResults] = useState<Array<IMatches>>([]);
  const { showFlag } = useFlags();

  const history = useHistory();

  useEffect(() => {
    const handleClick = () => {
      history.push("/competition/submit");
    };
    API.ladder.getAwaitResults().then(({ success, result }) => {
      if (success) {
        if (result.length > 0) {
          setResults(result);

          showFlag({
            title: "You have pending results to submit",
            icon: <InfoIcon label="info" />,
            actions: [
              {
                content: "View here",
                onClick: handleClick,
              },
            ],
          });
        }
      }
    });
  }, [showFlag, history]);
  return null;
};

export default AwaitingResultsNotification;
