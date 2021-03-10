import React, { useContext } from "react";
import { Redirect } from "react-router-dom";

import { UserContext } from "contexts/UserContext";
import Matches from "pages/Ladder/matches";
import Information from "components/Information";

const Profile = () => {
  //const history = useHistory();
  const { user, loading } = useContext(UserContext);

  console.log(user, loading);

  if (loading) return null;

  if (!user.id) {
    return <Redirect to={`/login?redirect=${window.location.pathname}`} />;
  }

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
