import React, { useState } from "react";
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.scss';
import Risk from '../images/Group 130.png'
import { FaBalanceScale } from "react-icons/fa";
import RProfile from '../Accounts/RProfile';
import Modal from 'react-bootstrap/Modal';

const RiskProfile = ({ id, activeTab, children }) => {
    const [show2, setShow2] = useState(false);

    const handleClose2 = () => setShow2(false);
    const handleShow2 = () => setShow2(true);
    return ( <
        div > <
        div className = "row py-5 bg-light px-2 rounded-25" >
        <
        div className = "col-6 bg-white rounded-25 p-2" >
        <
        img src = { Risk }
        width = '90%'
        className = "m-5"
        height = '80%'
        alt = "investors" / >
        <
        /div> <
        div className = "col-6 p-5 mt-5 text-center" >
        <
        h1 > RISK PROFILE < /h1> <
        div className = "row p-5 mt-5 bg-white rounded-25" >
        <
        h4 > Investor Risk Profiler < /h4>  <
        FaBalanceScale size = "30"
        className = 'my-5 text-warning' / >
        <
        p >
        The risk profiler is intended to grade and check how much you can accommodate an investment risk.The information you provide here is strictly
        for grading purposes.Thus we don not share it with any third parties or use it
        for any other activities. <
        /p> < /
        div > <
        h6 className = "py-3 px-5 mt-5 border border-warning text-warning rounded-25"
        onClick = { handleShow2 } > COMPLETE YOUR PROFILE < /h6> < /
        div > <
        Modal show = { show2 }
        onHide = { handleClose2 }
        dialogClassName = "my-modal" >

        <
        RProfile / > < /
        Modal > < /
        div > < /
        div >
    );
};

export default RiskProfile;