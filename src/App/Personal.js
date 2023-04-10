import React, { useState } from "react";
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Wallet from '../images/wallet.png';
import { FaUserClock } from 'react-icons/fa';
import ProgressBar from "@ramonak/react-progress-bar";
import './style.scss';
import Offcanvas from 'react-bootstrap/Offcanvas';
import TopUp from '../Accounts/TopUp';
import Goal from '../Accounts/Goal';
import Modal from 'react-bootstrap/Modal';
import PDeposit from '../Accounts/PDeposit';

const Personal = ({ id, activeTab, children, name, ...props }) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [show1, setShow1] = useState(false);
    const handleClose1 = () => setShow1(false);
    const handleShow1 = () => setShow1(true);
    const [show2, setShow2] = useState(false);

    const handleClose2 = () => setShow2(false);
    const handleShow2 = () => setShow2(true);

    return ( <
        div > <
        div className = "row scroll-y " > <
        div className = "col-8 bg-light p-3 rounded-25 " >
        <
        h6 className = " p-2 mt-2" > WALLET < /h6>  <
        div className = "row bg-white rounded-25 p-5" >
        <
        div className = " px-3 text-center " >
        <
        img src = { Wallet }
        className = "pt-2"
        width = '10%'
        height = '30%'
        alt = "investors" / > <
        h5 className = "bolder mt-5" > Account Balance < /h5> <
        div className = "d-flex flex-row flex justify-content-center w-100" > UGX <
        h1 className = "px-2 font-lighter" > 356, 000.0 < /h1> < /
        div >
        <
        div className = "d-flex flex-row flex justify-content-center" >
        <
        h6 className = "px-5 py-3 mt-3 border border-warning text-warning rounded-25 "
        onClick = { handleShow } >
        Top Up < /h6>  <
        Offcanvas show = { show }
        placement = "end"
        className = "side-bar"
        onHide = { handleClose } {...props } >
        <
        img src = { Wallet }
        className = "pt-2 text-center"
        width = '100'
        height = '100'
        alt = "investors" / >
        <
        Offcanvas.Header
        // closeButton
        >
        <
        div className = "row" > <
        Offcanvas.Title className = "bolder" > Top Up < /Offcanvas.Title> </div >
        <
        /
        Offcanvas.Header > <
        Offcanvas.Body className = "px-5" >
        <
        TopUp / > < /
        Offcanvas.Body > < /
        Offcanvas > <
        h6 className = "px-5 py-3 mt-3 mx-2 border border-warning text-warning rounded-25"
        onClick = { handleShow2 } >
        Deposit < /h6> </div >
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
        div className = "row mt-3 px-4 bg-white rounded" >
        <
        div className = "col-3" >
        <
        p className = "pt-3" > < span className = "bolder" > Deposit < /span> <
        p > UGX 10, 000 < /p>   < /
        p >
        <
        /
        div >
        <
        div className = "col-6" >
        <
        h6 className = "px-5 pt-4 text-success text-center" > Successful < /h6> < /
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
        div className = "text-start col-6 p-2" > YOUR PERSONAL GOALS < /div> <
        div className = "text-end col-6 p-2" > < span className = "  rounded-pill blue-dark text-white px-2 py-1" > 1 < /span> < /div > < /
        div >
        <
        div className = "p-4 bg-white shadow-sm rounded-25 mt-3" >
        <
        div className = "d-flex flex-row flex" >
        <
        span className = "mt-2" > <
        FaUserClock className = " rounded-circle blue-dark p-1"
        size = "40" / > < /span> <
        p className = "mx-4 mt-2" > < span className = "bolder" > Build a Mansion < /span> ...Created: 3 Aug</p >
        <
        /div> <
        h6 className = "mt-5" > Progress: 3 months to go < /h6>  <
        ProgressBar completed = { 70 }
        completedClassName = "barCompleted"
        maxCompleted = { 100 }
        ClassName = "barMax" /
        >
        <
        p className = "mt-5" > Total Deposit < /p> <
        p className = "text-center border p-2 rounded-25" > < span className = "bolder mx-2" > UGX < /span> 10,000 < /p >
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
        onHide = { handleClose1 } {...props } > <
        Goal / > < /
        Offcanvas > < /
        div > < /
        div > < /
        div >
    );
};

export default Personal;