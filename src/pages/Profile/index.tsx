import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Matches from "pages/Ladder/matches";
import Information from "components/Information";
import API from "rest/api";
import { IUser } from "rest/users";
import { toast } from "react-toastify";

interface ParamTypes {
  userid?: string;
}

const Profile = () => {
  //const history = useHistory();
  const { userid } = useParams<ParamTypes>();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    setLoading(true);
    API.users
      .get(userid as string)
      .then(({ success, user, err }) => {
        if (success) {
          setUser(user);
        } else {
          throw Error();
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("This user does not exist");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [userid]);

  if (loading || !user) return null;

  return (
    <>
      <Information>
        <h1>{user.firstname}'s Profile</h1>
      </Information>
      <Matches challenges={true} player_id={user.id} />
      <Matches challenges={false} player_id={user.id} />
    </>
  );
};

export default Profile;
