import React, { useState } from "react";
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaDonate } from 'react-icons/fa';
import './style.scss';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Goal from '../Accounts/Goal';
import Modal from 'react-bootstrap/Modal';
import PDeposit from '../Accounts/PDeposit';

const Withdraw = ({ id, activeTab, children, name, ...props }) => {

    const [show1, setShow1] = useState(false);
    const [show2, setShow2] = useState(false);
    const handleClose1 = () => setShow1(false);

    const handleClose2 = () => setShow2(false);
    const handleShow2 = () => setShow2(true);

    return ( <
        div > <
        div className = "row scroll-y " > <
        div className = "col-8 bg-light p-3 rounded-4 " >
        <
        h6 className = " p-2 mt-2" > WITHDRAWS < /h6>  <
        div className = "row bg-white rounded-4 py-5" >
        <
        div className = " text-center" >
        <
        FaDonate size = "80"
        className = 'mx-2 rounded-circle text-warning border-warning p-3 border' / > <
        h1 className = "my-3 p-3 shadow-sm rounded-4" > Withdraws < /h1>  <
        div className = "d-flex flex-row flex justify-content-center" > <
        h6 className = "px-5 py-3 mt-3 mx-2 border border-warning text-warning rounded-25"
        onClick = { handleShow2 } >
        Withdraw < /h6> </div >
        <
        Modal show = { show2 }
        onHide = { handleClose2 }
        dialogClassName = "my-modal1" >
        <
        PDeposit / >
        <
        /Modal> < /
        div >
        <
        /div>  <
        div >

        <
        h6 className = "pt-5" > RECENT ACTIVITY < /h6>   <
        div className = "row mt-3 bg-white shadow-sm px-4 rounded-4" >
        <
        div className = "col-4" >
        <
        p className = "pt-3" > < span className = "bolder" > Withdraw Amount: < /span> UGX 150000 <
        p className = "active bolder" > Basic Account < /p>   < /
        p >
        <
        /
        div >
        <
        div className = "col-5" >
        <
        h6 className = "px-5 pt-4 text-warning text-center" > Successful < /h6> < /
        div >
        <
        div className = "col-3 text-end" >
        <
        p className = "pt-3" > < span className = "bolder" > 21 Jan < /span> <
        p > 3: 30 EAT <
        /p>   < /
        p > <
        /div > < /
        div >
        <
        /
        div >
        <
        /
        div > <
        div className = "col-4 rounded-25 px-4" > <
        div className = "row p-2 bg-light rounded-25" >
        <
        div className = "text-start col-10 p-2" > YOUR WITHDRAW TIPS AND NOTES < /div> <
        div className = "text-end col-2 p-2" > < span className = " d-none rounded-pill blue-dark text-white px-2 py-1" > 1 < /span> < /div > < /
        div >
        <
        div className = "p-2 bg-white shadow-sm rounded-4" > <
        div className = "row mt-3 px-3 bg-white rounded-4" >
        <
        div className = "col-8" >
        <
        p className = "pt-3" > < span className = "bolder" > Withdraws < /span> specifically take up to <
        span className = "active bolder" > 3 days < /span> from the deposit month to be reconciled  < /
        p >
        <
        /
        div >
        <
        div className = "col-4" >
        <
        h6 className = " pt-4 text-warning text-end" > Notice < /h6>  < /
        div > < /div > < /
        div >
        <
        Offcanvas show = { show1 }
        placement = "end"
        className = "side-barsy pt-5"
        onHide = { handleClose1 } {...props } > <
        Goal / > < /
        Offcanvas > < /
        div > < /
        div > < /
        div >
    );
};

export default Withdraw;