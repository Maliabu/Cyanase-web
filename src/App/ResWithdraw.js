import { useEffect,useState } from 'react';
import { UserRequests } from '../Api/MainRequests';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import './style.scss';
import React from "react";
import Withdraw from '../Accounts/Withdraw'
import { ArrowLeftSquare } from 'react-iconly';

const ResWithdraw = (props) => {
    const [country, setCountry] = useState([])
    const [name, setName] = useState([])
    const [phone, setPhone] = useState([])
    useEffect(() => {
        UserRequests().then(res => {
            setCountry(res.profile.country)
            setName(res.last_name + " " + res.first_name)
            setPhone(res.profile.phoneno)
        });
    }, []);
    return ( < div className = 'p-2' > <
        ArrowLeftSquare size = { 30 }
        onClick = {
            () => { props.changeWithdrawSetting(false) }
        }
        className = "my-3 mx-2" / >
        <
        Withdraw country = { country }
        phone = { phone }
        networth = { props.networth }
        option_name = {props.option_name}
        fullname = { name }/ >
        <
        /
        div >
    );
};

export default ResWithdraw;