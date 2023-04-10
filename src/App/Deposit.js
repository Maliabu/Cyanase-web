import React, { useState } from "react";
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.scss';
import Modal from 'react-bootstrap/Modal';
import Learn1 from '../Accounts/Learn1';
import SaccoDeposit from './SaccoDeposit';
import { FaUniversity, FaUserCircle, FaUsers } from 'react-icons/fa';
import ResDeposit from './ResDeposit';
import DepositPic from '../images/deposit.png';

const Deposit = ({ id, activeTab, children }) => {
    const [show1, setShow1] = useState(false);
    const [show2, setShow2] = useState(false);
    const handleClose1 = () => setShow1(false);
    const handleShow1 = () => setShow1(true);
    const handleClose2 = () => setShow2(false);
    const handleShow2 = () => setShow2(true);
    return ( < div > <
        div className = "bg-light rounded-25 px-3 py-5 scroll-y d-none d-sm-block" >
        <
        div className = "row mx-3" >
        <
        div className = "col-6 text-start" >
        <
        img src = { DepositPic }
        width = '25%'
        height = '80%'
        alt = "investors" / > < /div> <
        div className = "col-6 text-end" >
        <
        span className = "border text-warning border-warning py-2 px-5 text-center rounded-3"
        onClick = { handleShow2 }
        id = "general" > Make a Deposit < /
        span > < /div> < /
        div > <
        div className = "row mt-3 p-3 bg-white rounded-25" >
        <
        div className = "col-8 rounded-25 p-5 text-center" >
        <
        div >
        <
        FaUserCircle size = "100"
        className = 'active' / > < /div> <
        h4 className = "my-3" > PERSONAL INVESTMENT < /h4>  <
        h6 > Make a deposit to your personal account without setting any goals. <
        /h6> < /
        div >
        <
        div className = "col-4 p-5 shadow-sm rounded-25 text-center" >
        <
        p className = "mt-5" > This is perfect
        for: < /p> <
        h5 className = "mt-3 p-2" > STUDENTS | JUNIOR INVESTORS | PROFESSIONAL INVESTORS < /h5>  <
        h6 className = "py-2 px-3 text-warning border rounded-3 border-warning"
        onClick = { handleShow2 }
        id = "personal" > Deposit Here < /h6> < /
        div >
        <
        /
        div >
        <
        div className = "row mt-3 bg-wallet shadow-sm rounded-25" >
        <
        div className = "col-8 rounded-25 p-5 text-center" >
        <
        div >
        <
        FaUsers size = "100"
        className = 'active' / > < /div> <
        h4 className = "my-3" > SACCO GROUPS / INVESTMENT CLUBS < /h4>  <
        h6 > Modify the investment Portfolio of your club <
        /h6> < /
        div >
        <
        div className = "col-4 p-5 shadow-sm rounded-25 text-center" > <
        p className = "mt-5" > This is perfect
        for: < /p> <
        h5 className = "mt-3" > SACCO GROUPS | CLUBS < /h5>  <
        h5 className = "py-2 px-3 text-warning border rounded-3 border-warning"
        onClick = { handleShow1 } > Deposit Here < /h5> < /
        div >
        <
        /
        div >
        <
        div className = "row mt-3 shadow-sm bg-wallet rounded-25" >
        <
        div className = "col-8 rounded-25 p-5 text-center" >
        <
        div >
        <
        FaUniversity size = "100"
        className = 'active' / > < /div> <
        h4 className = "my-3" > ORGANIZATIONS / COMPANIES < /h4 >  <
        h6 > Perfect
        for Organisations that wish to invest <
        /h6> < /
        div >
        <
        div className = "col-4 p-5 shadow-sm rounded-25 text-center" > <
        p className = "pt-5" > This is perfect
        for: < /p> <
        h5 > ORGANIZATIONS | COMPANIES < /h5>  <
        h5 className = "py-2 px-3 text-warning border rounded-3 border-warning" > Deposit Here < /h5> < /
        div >
        <
        /
        div >
        <
        Modal show = { show2 }
        onHide = { handleClose2 }
        dialogClassName = "my-modal1" >
        <
        Learn1 id / > < /
        Modal > <
        Modal show = { show1 }
        onHide = { handleClose1 }
        dialogClassName = "my-modal1" >
        <
        SaccoDeposit / >
        <
        /Modal>  < /
        div > <
        div className = "d-block d-sm-none" >
        <
        ResDeposit / > < /div> </div >
    );
};

export default Deposit;