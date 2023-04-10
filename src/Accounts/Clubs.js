import React, { useState } from "react";
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Profile from '../images/Ellipse 6.png';
import Profile1 from '../images/Ellipse 197.png';
import Profile2 from '../images/Ellipse 203.png';
import Profile3 from '../images/Ellipse 205.png';
import Goal from './Goal';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { FaWallet, FaUsers, FaDonate, FaHandHoldingUsd } from 'react-icons/fa';
import ProgressBar from "@ramonak/react-progress-bar";
import Form from 'react-bootstrap/Form';
import Stat from '../images/Group 3577.png';
import PDeposit from './PDeposit';
import Modal from 'react-bootstrap/Modal';

const Clubs = ({...props }) => {
    const [show1, setShow1] = useState(false);
    const handleClose1 = () => setShow1(false);
    const handleShow1 = () => setShow1(true);
    const [show2, setShow2] = useState(false);

    const handleClose2 = () => setShow2(false);
    const handleShow2 = () => setShow2(true);
    return ( <
        div > <
        div className = "row pb-5" > <
        div className = "col-lg-8 bg-light text-center p-3 rounded-25" > <
        div className = "row bg-white text-dark rounded-25 p-3 mt-2" >
        <
        div className = " col-lg-8" >
        <
        div className = "row py-3" >
        <
        div className = "col-lg-3" > <
        img src = { Profile }
        width = '80%'
        height = '90%'
        className = "mt-lg-4"
        alt = "investors" / > < /div>  <
        div className = "col-lg-9 " > <
        h3 className = "mt-lg-5 font-lighter" >
        CHILL GRILLS CLUB < /h3>  <
        p > Created: Jan 2020... <
        span className = "bolder" > 32 Members < /span> < /p > < /div > < /
        div > < /
        div >
        <
        div className = "col-lg-4 bg-light rounded-25 text-center" >
        <
        h6 className = "mt-lg-5 mt-3 bolder" >
        FOUNDERS < /h6>  <
        div className = "d-flex flex-row justify-content-center p-2" >
        <
        img src = { Profile1 }
        width = '20%'
        height = '20%'
        alt = "investors" / >
        <
        img src = { Profile2 }
        width = '20%'
        height = '20%'
        className = "mx-2"
        alt = "investors" / >
        <
        img src = { Profile3 }
        width = '20%'
        height = '20%'
        alt = "investors" / >
        <
        /div> < /
        div > < /
        div >
        <
        div className = "row bg-white text-dark rounded-25 px-lg-5 py-5 mt-2" >
        <
        div className = "pt-lg-5 text-center" >
        <
        h5 className = "bolder" > Networth < /h5>  <
        div className = "d-flex flex-row flex justify-content-center" > UGX <
        h1 className = "px-2 font-lighter" > 299, 000, 000.0 < /h1>  < /
        div > <
        img src = { Stat }
        width = '50%'
        height = '40%'
        alt = "investors" / > < /div > < /
        div >
        <
        div className = "row bg-white text-dark rounded-25 p-lg-2 my-2" >
        <
        div className = "col-lg-4 text-center py-lg-5 p-2" > <
        FaHandHoldingUsd className = "border border-dark rounded-circle p-2 my-3"
        size = "50" / >
        <
        h6 className = "bolder" > Total Loans < /h6>  <
        div className = "d-flex flex-row flex justify-content-center" > UGX <
        h5 className = "px-2 font-lighter" > 38, 000, 000.0 < /h5>  < /
        div > < /
        div >
        <
        div className = "col-lg-4 text-center py-lg-5 p-2 rounded-25 bg-light" > <
        FaWallet className = "border border-dark rounded-circle p-2 my-3"
        size = "50" / >
        <
        h6 className = "bolder" > Total Deposits < /h6>  <
        div className = "d-flex flex-row flex justify-content-center" > UGX <
        h5 className = "px-2 font-lighter" > 45, 000, 000.0 < /h5>  < /
        div > < /
        div > <
        div className = "col-lg-4 text-center py-lg-5 p-2" > <
        FaDonate className = "border border-dark rounded-circle p-2 my-3"
        size = "50" / >
        <
        h6 className = "bolder" > Total Withdrawals < /h6>  <
        div className = "d-flex flex-row flex justify-content-center" > UGX <
        h5 className = "px-2 font-lighter" > 680, 000.0 < /h5>  < /
        div > < /
        div >
        <
        /
        div > <
        div >
        <
        /
        div >
        <
        /
        div > <
        div className = "col-lg-4 rounded-25 px-3 my-lg-0 my-3" >

        <
        h6 className = "grey-text p-3 blue-dark rounded-25" > YOUR CLUB GOALS < /h6>   <
        div className = "p-4 bg-white shadow-sm rounded-25 mt-3" >
        <
        div className = "d-flex flex-row flex" >
        <
        span className = "mt-2" > <
        FaUsers className = " rounded-circle blue-dark p-1"
        size = "40" / > < /span> <
        p className = "mx-4 mt-2" > < span className = "bolder" > Establish Law Court < /span> ...Created: 3 Aug...<span className="bolder">CHILL GRILLS CLUB</span > < /p > < /
        div > <
        h6 className = "mt-5" > Progress: 3 months to go < /h6>  <
        ProgressBar completed = { 70 }
        completedClassName = "barCompleted"
        maxCompleted = { 100 }
        ClassName = "barMax" /
        >
        <
        p className = "mt-5" > Total Deposit < /p> <
        p className = "text-center bg-light p-2 rounded-25" > < span className = "bolder mx-2" > UGX < /span> 21,450,000 < /p >
        <
        /
        div >

        <
        h6 className = "px-5 py-3 mt-3 border border-warning text-center text-warning rounded-25"
        onClick = { handleShow1 } >
        New Goal < /h6>  <
        Offcanvas show = { show1 }
        placement = "end"
        className = "side-barsy pt-5"
        onHide = { handleClose1 } {...props } >
        <
        Form validated = { true } > <
        Goal / > < /Form> < /
        Offcanvas >
        <
        h6 className = "grey-text p-3 blue-dark rounded-25" > PERMISSIONS < /h6>   <
        h6 className = "py-3 mt-3 border border-warning text-center text-warning rounded-25"
        onClick = { handleShow2 } >
        Deposit < /h6> < /
        div > <
        Modal show = { show2 }
        onHide = { handleClose2 }
        dialogClassName = "my-modal1" >
        <
        PDeposit / >
        <
        /Modal> < /
        div > < /
        div >
    );
};

export default Clubs;