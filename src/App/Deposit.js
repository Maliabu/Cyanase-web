import React, { useState } from "react";
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from 'react-bootstrap/Modal';
import Learn1 from '../Accounts/Learn1';
import ResDeposit from './ResDeposit';
import './style.scss';
import { Wallet } from "react-iconly";

const Deposit = ({ id, activeTab, children, ...props }) => {
    const [show2, setShow2] = useState(false);
    const handleClose2 = () => setShow2(false);
    const handleShow2 = () => setShow2(true);
    return ( < div > < div className = " d-none d-sm-block" > <
        div className = "row scroll-y" > <
        div className = "col-8 bg-light p-3 rounded-4 " >
        <
        h6 className = " p-2 mt-2" > DEPOSIT < /h6>  <
        div className = "row shadow-sm bg-white rounded-4 py-5" >
        <
        div className = " text-center" >
        <
        Wallet size = "xlarge"
        set = "broken"
        className = 'mx-2 rounded-circle text-warning border-warning p-2 border' / > <
        h1 className = "my-3 p-3 shadow-sm rounded-4" > Deposit < /h1>  <
        div className = "d-flex flex-row flex justify-content-center" > <
        h6 className = "px-5 py-3 mt-3 mx-2 border border-warning text-warning rounded-25"
        onClick = { handleShow2 } >
        Make a Deposit < /h6> </div >
        <
        Modal show = { show2 }
        onHide = { handleClose2 }
        dialogClassName = "my-modal1" >
        <
        Learn1 tab9 = { props.handletab9 }
        / > < /
        Modal > < /
        div >
        <
        /div>  <
        div >

        <
        h6 className = "pt-5" > RECENT ACTIVITY < /h6>   <
        div className = "row mt-3 bg-white shadow-sm px-4 rounded-3" >
        <
        div className = "col-4" >
        <
        p className = "pt-3" > < span className = "bolder" > Deposit Amount: < /span> UGX 150000 <
        p className = "active bolder" > MUBS Sacco < /p>   < /
        p >
        <
        /
        div >
        <
        div className = "col-5" >
        <
        h6 className = "px-5 pt-4 active text-center" > Successful < /h6> < /
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
        div className = "col-4 rounded-4 px-4" > <
        div className = "row p-2 bg-light rounded-25" >
        <
        div className = "text-start col-6 p-2" > YOUR ACTIVE GOALS < /div> <
        div className = "text-end col-6 p-2" > < span className = "  rounded-pill blue-dark text-white px-2 py-1" > 2 < /span> < /div > < /
        div >
        <
        div className = "p-2 mt-3 bg-white rounded-4" > <
        div className = "row px-3 bg-white shadow-sm rounded-4" >
        <
        div className = "col-9" >
        <
        p className = "pt-3" > < span className = "bolder active" > Build a Mansion: < /span> UGX 400000000 <
        p className = "bolder" > 4 years < /p>   < /
        p >
        <
        /
        div >
        <
        div className = "col-3" >
        <
        h6 className = " pt-4 active text-end" > created Aug 3 < /h6>  < /
        div > < /div ><
        div className = "row px-3 mt-3 bg-white shadow-sm rounded-4" >
        <
        div className = "col-9" >
        <
        p className = "pt-3" > < span className = "bolder active" > Buy a Car: < /span> UGX 86000000 <
        p className = "bolder" > 2 years < /p>   < /
        p >
        <
        /
        div >
        <
        div className = "col-3" >
        <
        h6 className = " pt-4 active text-end" > Created Aug 8 < /h6>  < /
        div > < /div > < /
        div > < /
        div > < /
        div > < /div> <
        div className = "d-block d-sm-none" >
        <
        ResDeposit tab9 = { props.handletab9 }
        / > < /div > < /div >
    );
};

export default Deposit;