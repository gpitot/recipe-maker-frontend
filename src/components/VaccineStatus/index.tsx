import React from 'react';
import AdminControl from 'components/AdminControl';
import tick from "icons/tick";
import style from './style.module.scss';

const VaccineStatus = ({vaccinated} : { vaccinated : boolean}) => (
    <span>{vaccinated && <img src={tick} className={style.icon} alt="vaccinated" /> }</span>
)

export default AdminControl(VaccineStatus)