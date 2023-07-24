import { PersonalRequests, MainRequests, UserRequests, GetRiskProfile } from "../Api/MainRequests";
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
import Chart from 'react-apexcharts';
import { AddUser } from "react-iconly";
import { getCurrency } from "../payment/GetCurrency";

const Personal = ({...props }) => {
const [span, setSpan] = useState([])
const [mine, setMine] = useState([])
const [name, setName] = useState()
const [deposits, setDeposits] = useState([])
const [show, setShow] = useState(false);
const [holdId, setHoldId] = useState("");
const [country, setCountry] = useState("");
const [phone, setPhone] = useState("");
const [email, setEmail] = useState("");
const [holdName, setHoldName] = useState("");
const [holdNetworth, setHoldNetworth] = useState("");
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
const [investmentOption, setinvestmentoption] = useState("")
useEffect(() => {
    PersonalRequests().then(res => {
        setSpan(res[2]); // array(14)
    });
    MainRequests().then(res => {
        setDeposits(res[6]);
        setMine(res[4])
    });
    GetRiskProfile().then(res => {
        setinvestmentoption(res.investment_option)
    });
    UserRequests().then(res => {
        setCountry(res.profile.country)
        setPhone(res.profile.phoneno)
        setEmail(res.email)
        setName(res.first_name + " " + res.last_name)
    })
}, []);

const groupArrayObjects = mine.reduce((group, obj) => {
    const { name, datas } = obj;
    if (!group[name]) {
        group[name] = {
            name: name,
            data: []
        };
    }
    group[name].data.push(datas);
    return group;
}, {});
const results = Object.values(groupArrayObjects);
const options = {
    seriesDonut: results.map(option => summ(option.data)),
    optionsDonut: {
        labels: results.map(option => (option.name)),
        chart: {
            type: 'donut',
        },
        colors: ['#252859', '#E91E63', '#FF9800', '#b7b7b7'],
        responsive: [{
            breakpoint: 480,
            options: {
                chart: {
                    height: 500,
                    width: 300
                },
                legend: {
                    position: 'bottom'
                }
            }
        }],
        legend: {
            position: 'bottom'
        }
    }
}

function getId(id, name, amount, deposit, networth, created) {
    setHoldId(id)
    setHoldName(name)
    setHoldAmount(amount)
    setHoldDeposit(deposit)
    setHoldCreated(created)
    setHoldNetworth(networth)
    handleShow3()
}

function summ(array) {
    let sum = 0
    array.forEach(item => {
        sum = sum + item
    });
    return sum
}
return ( <
    div > <
    div className = "row " > <
    div className = "col-8 bg-lighter p-3 rounded-25" >
    <
    h6 className = " p-2 mt-2" > MY INVESTMENTS < /h6>  <
    div className = "row justify-content-center rounded-4 p-3" >
    <
    div className = "row" > <
    div className = "col" >
    <
    /
    div > < /div> <
    div className = "row" >
    <
    div className = "row" >
    <
    div className = "col-5 text-center" > <
    Chart options = { options.optionsDonut }
    series = { options.seriesDonut }
    height = { 400 }
    width = { 300 }
    type = "donut" /
    >
    <
    /div > <
    div className = "col-7 text-center" >
    <
    h6 className = "grey-text d-none py-2" > Summary Data of all your investments < /h6> {
    results.map(option => ( <
        div className = "row mt-2 py-3 bg-white rounded-3" >
        <
        div className = "col-3" > < h6 className = "bolder" > { option.name } < /h6> < /
        div >
        <
        div className = "col" > < h6 className = "bolder active" > Rate: {
            (option.data).length
        } < /h6> < /div > <
        div className = "col" > < h6 className = "bolder" > Total: { getCurrency(country) } {
            (summ(option.data)) * 1000
        } < /h6> < /div > < /
        div > ))
} < /div > < /
div > < /div> <
div className = " px-3 d-none text-center " >
    <
    img src = { Wallet }
className = "pt-2 d-none"
width = '10%'
height = '30%'
alt = "investors" / > <
    h5 className = "bolder mt-3 d-none" > Account Balance < /h5> <
div className = "d-flex flex-row d-none flex justify-content-center w-100" > getCurrency(country) <
    h1 className = "px-2 font-lighter" > 0.0 < /h1> < /
div >
    <
    div className = "d-flex flex-row d-none flex justify-content-center" >
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
    div className = "row p-3 scroll-y3" >
    <
    h6 className = "pt-3" > RECENT ACTIVITY < /h6> {deposits.map(deposit => ( <
div className = "row mt-2 p-4 bg-white rounded-3"
key = { deposit.deposit_id } >
    <
    div className = "col" >
    <
    h6 className = "" > < span className = "bolder" > Deposit < /span> { deposit.currency } { deposit.deposit_amount }  < /
h6 > <
    /
div >
    <
    div className = "col-6" >
    <
    h6 className = "px-5 active text-center" > { deposit.deposit_category } < /h6> < /
div >
    <
    div className = "col text-end" >
    <
    h6 className = " bolder" > {
        (deposit.created)
    } < /
h6 > <
    /div > < /
div > ))
} < /div> < /
div >
    <
    /
div > <
    div className = "col-4 px-3 " > <
    div className = "row p-2 bg-lighter rounded-3" >
    <
    div className = "text-start col-6 px-2 p-2" > YOUR PERSONAL GOALS < /div> <
div className = "text-end col-6 p-2" > < span className = " px-2 py-1 blue-dark rounded-circle" > { span.length } < /span> < /div > < /
div > <
    h6 className = "px-5 py-3 mt-3 bk-warning text-center rounded-3"
onClick = { handleShow1 } >
    New Goal < /h6>  <
div className = " p-1 pb-5 mb-5" > {
        span.map(goal => ( <
            div className = "p-4 bg-white rounded-3 modals-left shadow-sm mt-3"
            key = { goal.goal_id } > <
            div className = "d-flex flex-row flex" > <
            span className = "mt-2" > <
            AddUser className = " rounded-circle warning p-1"
            size = "large" / > < /span>  <
            p className = "mx-4" > < span className = "bolder active"
            onClick = {
                () => getId(goal.goal_id, goal.goal_name, goal.goal_amount, goal.deposit[0], goal.deposit[1], goal.created)
            } > { goal.goal_name } < /span>< span > ...created { (goal.created).slice(0,10) } < /span > < /p >  <
            span className = "bolder" > Total Deposit: < span className = "active" > { goal.deposit[0] } < /span> < span className = "active d-none" > { goal.goal_amount } < /span > < /span > < /
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
fullname = { name }
amount = { holdAmount }
deposit = { holdDeposit }
created = { holdCreated }
country = { country }
networth = { holdNetworth }
phone = { phone }
option = { investmentOption }
/ > < /
Modal >
    <
    Offcanvas show = { show1 }
placement = "end"
className = "side-barsy pt-5"
onHide = { handleClose1 } {...props } > <
    Goal1 close1 = { handleClose1 }
name = { holdName }
email = { email }
amount = { holdAmount }
deposit = { holdDeposit }
created = { holdCreated }
country = { country }
networth = { holdNetworth }
phone = { phone }
option = { investmentOption }
fullname = { name }
tab9 = { props.handletab9 }
/ > < /
Offcanvas > < /
div > < /
div >
    <
    /
div >
)
};

export default Personal;