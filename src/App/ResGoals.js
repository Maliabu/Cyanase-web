import { PersonalRequests, UserRequests, GetRiskProfile, UserVerificationRequests, UserBanks } from '../Api/MainRequests';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import './style.scss';
import React, { useState, useEffect } from "react";
import { PROFILE_PHOTO } from '../apis';
import { AddUser, ArrowLeftSquare } from 'react-iconly';
// import ProgressBar from '@ramonak/react-progress-bar';
import { Modal } from 'react-bootstrap';
import Goal from '../Accounts/Goal'
import ResGoals1 from './ResGoals1'
import ProgressBar from 'react-bootstrap/ProgressBar';

const ResGoals = () => {
    const [goalSetting, setGoalSetting] = useState(false);
    const [span, setSpan] = useState([])
    const [country, setCountry] = useState("")
    const [holdId, setHoldId] = useState("");
    const [holdName, setHoldName] = useState("");
    const [holdAmount, setHoldAmount] = useState("");
    let [holdDeposit, setHoldDeposit] = useState("");
    const [holdCreated, setHoldCreated] = useState("");
    const [complete, setComplete] = useState("Incomplete");
    const [verification, setVerification] = useState("")
    const [banks, setBanks] = useState("")
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [holdNetworth, setHoldNetworth] = useState("");
    const [investmentOption, setinvestmentoption] = useState("")
    const [name, setName] = useState("")
    const [goalStatus, setGoalStatus] = useState();
    const [show3, setShow3] = useState(false);
    const handleClose3 = () => setShow3(false);
    const handleShow3 = () => setShow3(true);
    useEffect(() => {
        PersonalRequests().then(res => {
            setSpan(res[2]); // array(14)
        });
        UserRequests().then(res=>{
            setCountry(res.profile.country)
            setPhone(res.profile.phoneno)
            setEmail(res.email)
            setName(res.first_name + " " + res.last_name)
        });
        GetRiskProfile().then(res => {
            if (res.status === true) {
                setComplete("Complete")
            }
            setinvestmentoption(res.investment_option)
        });
        UserBanks().then(res => {
            setBanks(res.data)
        });
        UserVerificationRequests().then(res => {
            setVerification(res.success)
        });
    }, []);
    function getId(id, name, amount, deposit, networth, created, status) {
        setHoldId(id)
        setHoldName(name)
        setHoldAmount(amount)
        setHoldDeposit(deposit)
        setHoldCreated(created)
        setHoldNetworth(networth)
        setGoalStatus(status)
        handleShow3()
    }
    //  Functions to handle Tab Switching
    if (goalSetting) {
        return ( < div className=''>
            <
            div className = 'row d-none p-2 px-3' > <
            div className = 'col-10 bg-lighter rounded-4' > <
            h4 className = ' mx-3 bolder mt-3' > Create New Goal < /h4 > < /div >
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
            img src = {PROFILE_PHOTO}
            className = "rounded-circle object-fit-cover mt-2 img-head"
            alt = "investors" / > < /div> < /
            div > <
            ArrowLeftSquare size = { 30 }
            onClick = {
                () => { setGoalSetting(false) }
            }
            className = "mt-1 mx-2" / > < ResGoals1 changeGoalSetting = { setGoalSetting }
            country = { country } complete = {complete} verification = {verification}
            / > < /
            div >
        )
    }

    const myGoals =()=>{
        if(span.length === 0){
            return (
                <div>
                    <p className='p-5'>You have no goals yet created</p>
                </div>
            )
        } else {
            return(
                <
            div className = "scroll-y2 bg-lighter p-2" > {
                span.map(goal => ( <
                    div className = "p-3 bg-white rounded-4 mt-1"
                    key = { goal.goal_id } > <
                    div className = "row" > <
                    div className = "col-1" > <
                    AddUser className = " rounded-circle bg-light active p-2"
                    size = "large" / > < /div>  <
                    div className = "col-7 px-4" > < h6 className = "bolder"
                     > {
                        (goal.goal_name)
                    }< p className='font-light'> created {
                        (goal.created).slice(0, 10)
                    } < /p >  < /h6>  < /
                    div ><div className='col-3 text-start'><span className = 'rounded-3 warning-goals' onClick = {
                        () => getId(goal.goal_id, goal.goal_name, goal.goal_amount, goal.deposit[0], goal.deposit[1], goal.created, goal.goal_status)
                    }>Deposit</span></div> < /
                    div >
                    <
                    span><span className='bolder mx-2'>Progress:</span>  {
                        progress = (100 - ((goal.goal_amount - goal.deposit[0]) / goal.goal_amount * 100)).toFixed(2)
                    } %
                    <
                    span >
                    <
                        ProgressBar now = { progress }
                        className="progress-sm mx-2"
                        variant = "#ff8b10" /
                        >
                    <
                    /span> < /
                    span > <
                    span className = "bolder mx-2" >Total Deposit: <span className='font-light'>{ (goal.deposit[0]).toLocaleString() }</span> < /span > <span>|</span> <
                    span className = "bolder mx-2" >Goal Amount: <span className='font-light'>{ (goal.goal_amount).toLocaleString() }</span> < /span > < /
                    div >
                ))
            } <
            /div> 
            )
        }
    }

    let progress
        return ( < div className = '' >
            <
            div className = 'p-1' >
            <div><h4 className='blue-darks p-3 rounded-top-3'>Goals: {span.length}</h4><
            p onClick = {
                () => { setGoalSetting(true) }
            }
            className = 'rounded-3 bk-warning px-5 text-center mb-2' > Add a new Goal </p></div>{myGoals()}
             <
            Modal show = { show3 }
            onHide = { handleClose3 }
            dialogClassName = "" ><Modal.Header className='modaling' closeButton>
            <Modal.Title>{holdName}</Modal.Title>
            </Modal.Header> <
            Goal id = { holdId }
            name = { holdName }
            country = {country}
            amount = { holdAmount }
            deposit = { holdDeposit }
            created = { holdCreated }
            option = { investmentOption }
            banks = {banks}
            networth = { holdNetworth }
            phone = { phone }
            fullname = { name }
            email = { email }
            status = { goalStatus }
            / > < /
            Modal >
             < /
            div > <
            /
            div >
        )
};
export default ResGoals;