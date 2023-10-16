import { useEffect,useState } from 'react';
import { UserRequests,MainRequests } from '../Api/MainRequests';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import './style.scss';
import React from "react";
import Withdraw from '../Accounts/Withdraw'
import { ArrowLeftSquare } from 'react-iconly';

const ResWithdraw = (props) => {
    const [country, setCountry] = useState([])
    const [email, setEmail] = useState([])
    const [name, setName] = useState([])
    const [phone, setPhone] = useState([])
    const [networth, setDepositNetworth] = useState(0);
    useEffect(() => {
        UserRequests().then(res => {
            setCountry(res.profile.country)
            setName(res.last_name + " " + res.first_name)
            setPhone(res.profile.phoneno)
            setEmail(res.email)
        });
        MainRequests().then(res => {
            setDepositNetworth(res[7])
        })
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
        networth = { networth }
        fullname = { name }/ >
        <
        /
        div >
    );
};

export default ResWithdraw;