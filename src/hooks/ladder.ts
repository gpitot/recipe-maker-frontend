import { useEffect, useState } from "react";
import { IRanks, IMatches } from "rest/ladder";
import API from "rest/api";

const DATA_REFRESH_INTERVAL = 60000; // 1 minute

const useRanks = (ladderId: number) => {
  const [loading, setLoading] = useState(false);
  const [lastLoaded, setLastLoaded] = useState(0);
  const [data, setData] = useState<Array<IRanks>>([]);

  const refresh = () => {
    if (loading) return;
    if (Date.now() - lastLoaded < DATA_REFRESH_INTERVAL) {
      return;
    }

    setLoading(true);
    API.ladder
      .getRanks({
        ladder_id: ladderId,
      })
      .then(({ success, result }) => {
        if (success) {
          return setData(result);
        }
      })
      .finally(() => {
        setLoading(false);
        setLastLoaded(Date.now());
      });
  };

  return {
    loading,
    data,
    refresh,
  };
};

export { useRanks };
