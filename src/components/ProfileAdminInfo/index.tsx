import React, { useState } from "react";
import AdminControl from "components/AdminControl";
import { IUser } from "rest/users";
import Button from "components/Button";
import API from "rest/api";

const ProfileAdminInfo = (user: IUser) => {
  const [localVaccinated, setLocalVaccinated] = useState(user.vaccinated);
  const [loading, setLoading] = useState(false);

  const addVaccinationTick = () => {
    setLoading(true);
    API.users
      .editUser({
        ...user,
        vaccinated: !localVaccinated,
      })
      .then(() => {
        setLocalVaccinated(!localVaccinated);
      })
      .catch(() => {})
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <h5>{user.email}</h5>
      <h5>{user.phone}</h5>
      <h5>Vaccinated : {localVaccinated ? "true" : "false"}</h5>
      {!localVaccinated && (
        <Button
          text={"Add vaccination tick"}
          handleClick={addVaccinationTick}
          disabled={loading}
        />
      )}
    </>
  );
};

export default AdminControl(ProfileAdminInfo);
