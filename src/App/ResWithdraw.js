import { useEffect,useState } from 'react';
import { UserRequests, UserBanks, UserVerificationRequests } from '../Api/MainRequests';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import './style.scss';
import React from "react";
import Withdraw from '../Accounts/Withdraw'
import { ArrowLeftSquare } from 'react-iconly';
import { getCurrency } from '../payment/GetCurrency';

const ResWithdraw = (props) => {
    const [country, setCountry] = useState("")
    const [name, setName] = useState("")
    const [phone, setPhone] = useState("")
    const [banks, setBanks] = useState("")
    const [verification, setVerification] = useState("")
    const currency = getCurrency(country)
    useEffect(() => {
        UserRequests().then(res => {
            setCountry(res.profile.country)
            setName(res.last_name + " " + res.first_name)
            setPhone(res.profile.phoneno)
        });
        UserBanks().then(res => {
            setBanks(res.data)
        });
        UserVerificationRequests().then(res => {
            setVerification(res.success)
        });
    }, []);
    return ( < div className = 'px-2' ><h4 className='bolder my-3'> <
        ArrowLeftSquare size = { 25 }
        onClick = {
            () => { props.changeWithdrawSetting(false) }
        }
        className = "mx-2" / > Withdraw</h4>
        <
        Withdraw country = { country }
        phone = { phone }
        networth = { props.networth }
        deposit = {props.deposit}
        handler = {props.handler}
        investmentId = {props.investmentId}
        option_name = {props.option_name}
        verification = {verification}
        banks = {banks}
        currency = {currency}
        fullname = { name }/ >
        <
        /
        div >
    );
};
export default ResWithdraw;