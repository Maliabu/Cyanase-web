import { useEffect } from "react";
import React, { useState } from "react";
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from 'react-bootstrap/Modal';
import ResLearn1 from '../Accounts/ResLearn1';
import Learn1 from '../Accounts/Learn1';
import './style.scss';
import Depo from '../images/depo.png'
import { Wallet } from "react-iconly";
import { GetRiskProfile, UserRequests } from "../Api/MainRequests";

const Deposit = ({ id, activeTab, children, ...props }) => {
    const [country, setCountry] = useState([])
    const [email, setEmail] = useState([])
    const [name, setName] = useState([])
    const [phone, setPhone] = useState([])
    const [show2, setShow2] = useState(false);
    const handleClose2 = () => setShow2(false);
    const handleShow2 = () => setShow2(true);
    const [investmentOption, setinvestmentoption] = useState("")
    useEffect(() => {
        GetRiskProfile().then(res => {
            if (res.investment_option === undefined) {
                setinvestmentoption("Cash | Venture | Credit")
            } else {
                setinvestmentoption(res.investment_option)
            }
        });
        UserRequests().then(res => {
            setCountry(res.profile.country)
            setName(res.last_name + " " + res.first_name)
            setPhone(res.profile.phoneno)
            setEmail(res.email)
        });
    }, []);
    return ( < div className="mx-3"> < div className = " d-none d-sm-block" > <
        div className = "row" > <
        div className = "col-8 dollar p-3 rounded-4 " >
        <
        h6 > DEPOSIT < /h6>  <
        div className = "row blue-dark rounded-4 py-5" >
        <
        div className = " text-center" >
        <
        img src = { Depo }
        className = "pt-2 d-none"
        width = '20%'
        height = '40%'
        alt = "investors" / >
        <
        Wallet size = "xlarge"
        set = "broken"
        className = 'mx-2 rounded-circle warning p-2' / > <
        h1 className = " p-3" > Deposit < /h1>  <
        div className = "" >
        <
        h6 className = "px-5" > Make Deposists of any amount towards any market, you can on the other hand make goal based deposits to any goal, we shall keep track
        for you here.Make your deposit here. < /h6> < /
        div > <
        div className = "d-flex flex-row flex justify-content-center" > <
        h6 className = "px-5 py-3 mt-3 mx-2 bk-warning rounded-3"
        onClick = { handleShow2 } >
        Make a Deposit < /h6> </div >
        <
        Modal show = { show2 }
        onHide = { handleClose2 }
        dialogClassName = "my-modal1" >
        <
        Learn1 tab9 = { props.handletab9 }
        option = { investmentOption }
        / > < /
        Modal > < /
        div >
        <
        /div>  <
        div > <
        div className = "col-5 d-none justify-content-center lightest shadow-sm p-5 mt-3 rounded-4" >
        <
        h6 className = "px-5" > Make Deposists of any amount towards any market, you can on the other hand make goal based deposits to any goal, we shall keep track
        for you here.Make your deposit here. < /h6> < /
        div >
        <
        /
        div >
        <
        /
        div > <
        div className = "col-4 rounded-4 px-4" > <
        div className = "row p-2 bg-lighter rounded-3" >
        <
        div className = "text-start col-6 p-2" > < h6 > PROCEDURE < /h6> < /div > < /
        div >
        <
        div className = "p-2 mt-3 bg-white rounded-4" > <
        div className = "row px-3 bg-white shadow-sm rounded-4" >
        <
        div className = "col-2" >
        <
        p className = "p-2 px-3 mt-3 rounded-circle text-center bg-lighter" > 1 < /
        p >
        <
        /
        div >
        <
        div className = "col-10" >
        <
        h6 className = " pt-4" > Fill in your Risk Profile < /h6>< /
        div > < /div >  <
        div className = "row px-3 bg-white mt-2 shadow-sm rounded-4" >
        <
        div className = "col-2" >
        <
        p className = "p-2 px-3 mt-3 rounded-circle text-center bg-lighter" > 2 < /
        p >
        <
        /
        div >
        <
        div className = "col-10" >
        <
        h6 className = " pt-3" > Choose where to make your Deposit
        for example Treasury Bills < /h6>< /
        div > < /div > <
        div className = "row px-3 bg-white mt-2 shadow-sm rounded-4" >
        <
        div className = "col-2" >
        <
        p className = "p-2 mt-3 px-3 rounded-circle text-center bg-lighter" > 3 < /
        p >
        <
        /
        div >
        <
        div className = "col-10" >
        <
        h6 className = " pt-4" > Make the Deposit < /h6>< /
        div > < /div > <
        div className = "row justify-content-center bg-white shadow-sm p-4 mt-3 rounded-4" >
        <
        h4 className = "bolder text-center p-3" > Investor Risk profile < /h4> <
        h6 className = "text-center" > Your risk profile helps us invest your money accordingly,
        let us know what type of investor you are.Complete your profile and
        let us do the rest < /h6> <
        h6 className = "text-center p-3 mt-3 rounded-3 bk-warning"
        onClick = { props.handletab9 } > Complete your Risk Profile < /h6> < /
        div >
        <
        /
        div > < /
        div > < /
        div > < /div> <
        div className = "d-block d-sm-none" >
        <
        div className = 'row p-2 px-3' > <
        div className = 'col-10 bg-lighter rounded-4' > <
        h4 className = ' mx-3 bolder mt-3' > Deposit < /h4 > < /div >
        <
        div className = 'rounded-4 d-none light-res-home wide' >
        <
        p className = "bolder text-end mx-4 mt-2" > welcome back user <
        div className = " justify-content-center" > <
        p className = "px-1 font-lighter" > pick up where we left off < /p></div > < /p>< /
        div >
        <
        div className = 'col-2' > <
        // img src = "http://127.0.0.1:8000/static/photo.png"
        img src = "https://cyanase.lol/static/photo.png"
        className = "rounded-circle object-fit-cover mt-2 img-head"
        alt = "investors" / > < /div> < /
        div > <
        ResLearn1 option = { investmentOption }
        country = { country }
        lastname = { name }
        email = { email }
        phone = { phone }
        / >
        <
        /div > < /div >
    );
};

export default Deposit;