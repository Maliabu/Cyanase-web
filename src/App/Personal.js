import { PersonalRequests, MainRequests } from "../Api/MainRequests";
import React, { useState, useEffect } from "react";
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Wallet from '../images/wallet.png';
import './style.scss';
import Offcanvas from 'react-bootstrap/Offcanvas';
import TopUp from '../Accounts/TopUp';
import Goal1 from '../Accounts/Goal1';
import Modal from 'react-bootstrap/Modal';
import Learn1 from '../Accounts/Learn1';
import Goal from '../Accounts/Goal'
import { AddUser } from "react-iconly";

const Personal = ({...props }) => {
const [span, setSpan] = useState([])
const [deposits, setDeposits] = useState([])
const [show, setShow] = useState(false);
const [holdId, setHoldId] = useState("");
const [holdName, setHoldName] = useState("");
const [holdAmount, setHoldAmount] = useState("");
let [holdDeposit, setHoldDeposit] = useState("");
const [holdCreated, setHoldCreated] = useState("");
const [show3, setShow3] = useState(false);
const handleClose3 = () => setShow3(false);
const handleShow3 = () => setShow3(true);
const handleClose = () => setShow(false);
const handleShow = () => setShow(true);
const [show1, setShow1] = useState(false);
const handleClose1 = () => setShow1(false);
const handleShow1 = () => setShow1(true);
const [show2, setShow2] = useState(false);
const handleClose2 = () => setShow2(false);
const handleShow2 = () => setShow2(true);
useEffect(() => {
    PersonalRequests().then(res => {
        setSpan(res[2]); // array(14)
    });
    MainRequests().then(res => {
        setDeposits(res[4]);
    });
}, []);

function getId(id, name, amount, deposit, created) {
    setHoldId(id)
    setHoldName(name)
    setHoldAmount(amount)
    setHoldDeposit(deposit)
    setHoldCreated(created)
    handleShow3()
}
return ( <
    div > <
    div className = "row scroll-y " > <
    div className = "col-8 bg-light p-3 rounded-25" >
    <
    h6 className = " p-2 mt-2 d-none" > WALLET < /h6>  <
    div className = "row bg-white d-none rounded-4 p-5" >
    <
    div className = " px-3 text-center " >
    <
    img src = { Wallet }
    className = "pt-2"
    width = '10%'
    height = '30%'
    alt = "investors" / > <
    h5 className = "bolder mt-3" > Account Balance < /h5> <
    div className = "d-flex flex-row flex justify-content-center w-100" > UGX <
    h1 className = "px-2 font-lighter" > 0.0 < /h1> < /
    div >
    <
    div className = "d-flex flex-row flex justify-content-center" >
    <
    h6 className = "px-5 py-3 mt-3 warning rounded-3"
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
    h6 className = "px-5 py-3 mt-3 mx-2 warning rounded-3"
    onClick = { handleShow2 } >
    Deposit < /h6> </div >
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
    div className = "row scroll-y" >
    <
    h6 className = "pt-5" > RECENT ACTIVITY < /h6> {deposits.map(deposit => ( <
    div className = "row mt-3 px-4 bg-white rounded-4"
    key = { deposit.deposit_id } >
    <
    div className = "col-3" >
    <
    p className = "pt-3" > < span className = "bolder" > Deposit < /span> <
    p > { deposit.currency } { deposit.deposit_amount } < /p>   < /
    p >
    <
    /
    div >
    <
    div className = "col-6" >
    <
    h6 className = "px-5 pt-4 active text-center" > { deposit.deposit_category } < /h6> < /
    div >
    <
    div className = "col-3 text-end" >
    <
    p className = "pt-3" > < span className = "bolder" > created < /span > {
    (deposit.created.slice(0, 10))
} < /
p > <
    /div > < /
div > ))
} < /div> < /
div >
    <
    /
div > <
    div className = "col-4 px-4 " > <
    div className = "row p-2 bg-light rounded-3" >
    <
    div className = "text-start col-6 p-2" > YOUR PERSONAL GOALS < /div> <
div className = "text-end col-6 p-2" > < span className = " px-2 py-1 blue-dark rounded-circle" > { span.length } < /span> < /div > < /
div > <
    h6 className = "px-5 py-3 mt-3 warning text-center rounded-3"
onClick = { handleShow1 } >
    New Goal < /h6>  <
div className = "scroll-y bg-light rounded-4 p-1 pb-5 mb-5" > {
        span.map(goal => ( <
            div className = "p-4 bg-white rounded-4 mt-3"
            key = { goal.goal_id } > <
            div className = "d-flex flex-row flex" > <
            span className = "mt-2" > <
            AddUser className = " rounded-circle border border-dark p-1"
            size = "large" / > < /span>  <
            p className = "mx-4" > < span className = "bolder active"
            onClick = {
                () => getId(goal.goal_id, goal.goal_name, goal.goal_amount, goal.deposit[0], goal.created)
            } > { goal.goal_name } < /span>< span > ...created { (goal.created).slice(0,10) } < /span > < /p >  <
            span className = "bolder" > Total Deposit: < span className = "font-lighter" > { goal.deposit[0] } < /span> < span className = "active d-none" > { goal.goal_amount } < /span > < /span > < /
            div > <
            /
            div >
        ))
    } <
    /div> <
Modal show = { show3 }
onHide = { handleClose3 }
dialogClassName = "" > <
    Goal id = { holdId }
name = { holdName }
amount = { holdAmount }
deposit = { holdDeposit }
created = { holdCreated }
/ > < /
Modal >
    <
    Offcanvas show = { show1 }
placement = "end"
className = "side-barsy pt-5"
onHide = { handleClose1 } {...props } > <
    Goal1 close1 = { handleClose1 }
tab9 = { props.handletab9 }
/ > < /
Offcanvas > < /
div > < /
div > < /
div >
)
};

export default Personal;