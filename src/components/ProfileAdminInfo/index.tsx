import React, {useState} from 'react';
import AdminControl from "components/AdminControl";
import { IUser } from "rest/users";
import Button from "components/Button";
import API from "rest/api";


const ProfileAdminInfo = (user : IUser) => {
    const [localVaccinated, setLocalVaccinated] = useState(user.vaccinated);
    const [loading, setLoading] = useState(false);

    const toggleVaccinatedStatus = () => {
        setLoading(true);
        API.users.editUser({
            ...user,
            vaccinated : !localVaccinated
        }).then(() => {
            setLocalVaccinated(!localVaccinated);
        }).catch(err => {
        }).finally(() => {
            setLoading(false)
        })
    }


    return (
        <>
            <h5>{user.email}</h5>
            <h5>{user.phone}</h5>
            <h5>Vaccinated : {localVaccinated ? "true" : "false"}</h5>
            <Button text={"Toggle vaccinated status"} handleClick={toggleVaccinatedStatus} disabled={loading} />
        </>
    )
}


export default AdminControl(ProfileAdminInfo)