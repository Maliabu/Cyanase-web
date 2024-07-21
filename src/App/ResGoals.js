import { PersonalRequests, UserRequests, GetRiskProfile, UserVerificationRequests, UserBanks } from '../Api/MainRequests';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import './style.scss';
import React, { useState, useEffect } from "react";
import { PROFILE_PHOTO, GOAL_PHOTO } from '../apis';
import { AddUser, ArrowLeftSquare} from 'react-iconly';
// import ProgressBar from '@ramonak/react-progress-bar';
import Goal from '../Accounts/Goal'
import ResGoals1 from './ResGoals1'
import Goals from '../images/house.png'
import ProgressBar from 'react-bootstrap/ProgressBar';
import Modal from 'react-bootstrap/Modal';
import GoalPhoto from '../Accounts/goalPhoto';

const ResGoals = (props) => {
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
    const [goalDeposit, setGoalDeposit] = useState(false)
    const [goalStatus, setGoalStatus] = useState("");
    const [goalPicture, setPicture] = useState("")
    const [show, setShow] = useState(false);
    const handleShow = () => {
        setShow(true)
    }
    const handleClose = () => {
        setShow(false)
    }
    useEffect(() => {
        PersonalRequests().then(res => {
            setSpan(res[2]);
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
    function getId(id, name, amount, deposit, networth, created, status, picture) {
        setHoldId(id)
        setHoldName(name)
        setHoldAmount(amount)
        setHoldDeposit(deposit)
        setHoldCreated(created)
        setHoldNetworth(networth)
        setGoalStatus(status)
        setPicture(picture)
        setGoalDeposit(true)
    }
    function onlyId(id) {
        setHoldId(id)
        handleShow()
    }
    function checkWithdraw(amount, deposit, status){
        let classname = ""
        let innertext = ""
        if(amount !== deposit && status !==true){
            innertext = "Inactive"
            classname = "hover-goal-name"
            return [innertext, classname]
        } else if(amount === deposit && status !==true){
            innertext = "Done"
            classname = "hover-goal-name"
            return [innertext, classname]
        } else 
        if (amount !== deposit){
            innertext = "deposit"
            classname = "hover-goal-name"
            return [innertext, classname]
        } else {
            innertext = "withdraw"
            classname = "hover-goal-name"
            return [innertext, classname]
        }
    }
    //  Functions to handle Tab Switching
    if (goalSetting) {
        return ( < div className=''>
            <div className = 'row d-none p-2 px-3' > 
            <div className = 'col-10 bg-lighter rounded-4' > 
            <h4 className = ' mx-3 bolder mt-3' > Create New Goal </h4> </div>
            <div className = 'rounded-4 d-none light-res-home wide' >
            <p className = "bolder text-end mx-4 mt-2" > welcome back user 
            <div className = " justify-content-center" > 
            <p className = "px-1 font-lighter" > pick up where we left off </p></div> </p>
            </div>
            <div className = 'col-2' > 
            <img src = {PROFILE_PHOTO}
            className = "rounded-circle object-fit-cover mt-2 img-head"
            alt = "investors" /> </div> </div> 
            <ArrowLeftSquare size = { 30 }
            onClick = {
                () => { setGoalSetting(false) }
            }
            className = "mt-1 mx-2" / > < ResGoals1 changeGoalSetting = { setGoalSetting }
            country = { country } complete = {complete} verification = {verification}
            /> 
            </div>
        )
    }
    if (goalDeposit) {
        return ( 
            <div className='px-3'>
            <div className = 'row d-none p-2 px-3' > 
            <div className = 'col-10 bg-lighter rounded-4' > 
            <h4 className = ' mx-3 bolder mt-3' > Create New Goal </h4 > </div>
            <div className = 'rounded-4 d-none light-res-home wide' >
            <p className = "bolder text-end mx-4 mt-2" > welcome back user 
            <div className = " justify-content-center" > 
            <p className = "px-1 font-lighter" > pick up where we left off </p></div > </p>
            </div> 
            </div>
            <h4 className='bolder my-3'>
            <ArrowLeftSquare size = { 25 }
            onClick = {
                () => { setGoalDeposit(false) }
            }
            className = "mx-2" />Goals</h4>
            <Goal id = { holdId }
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
            goalPicture = {goalPicture}
            /> 
            </div>
        )
    }
    const myGoals =()=>{
        if(span.length === 0){
            return (
            <div className='rounded-4 pb-5 blue-darks'>
            <img src={Goals} width="100%" height="100%" alt="goals"/>
            <div className = " py-5 text-center" >
                <h4 className = "bolder text-white" > Goal Investing </h4>  
                <h6 className = "mx-5" > Let your dreams come true by investing
                for them, <p className = "mx-5" > create your goals here </p>  </h6> 
            </div>
            <h6 onClick = {
                () => { setGoalSetting(true) }
            }
            className = 'rounded-3 bk-warning2 px-5 text-center mb-2' > Add a new Goal </h6>
            </div>
            )
        } else {
            return(
                <div className = "scroll-y bg-lighter pb-5 p-2" > {
                span.map(goal => ( 
                    <div className = "p-3 bg-white rounded-4 mt-1"
                    key = { goal.goal_id } >
                    <div className = "row" >  
                    <div className = "col-8 px-4" > < h6 className = "bolder"> 
                    {
                        (goal.goal_name)
                    }
                    <p className='font-light'> created {
                        (goal.created).slice(0, 10)
                    } </p>  </h6>  </div>
                    <div className='col-4 text-end'><h6 className = {checkWithdraw(goal.goal_amount, goal.deposit[0], goal.goal_status)[1]} onClick = {
                        () => getId(goal.goal_id, goal.goal_name, goal.goal_amount, goal.deposit[0], goal.deposit[1], goal.created, goal.goal_status, goal.goal_picture)
                    }>{checkWithdraw(goal.goal_amount, goal.deposit[0], goal.goal_status)[0]}</h6></div> 
                    </div>
                    <div className = "goal-image" onClick={() => onlyId(goal.goal_id)}>
                    <img src = {goal.goal_picture} width="100%" height="100%" className = "object-fit-cover" alt = "goal" /> </div> 
                    <span className='mt-3'><span className='bolder m-2'>Progress:</span>  {
                        progress = (100 - ((goal.goal_amount - goal.deposit[0]) / goal.goal_amount * 100)).toFixed(2)
                    } %
                    <span>
                    <ProgressBar now = { progress }
                        className="progress-sm mx-2"
                        variant = "#ff8b10" />
                    </span> 
                    </span> 
                    <span className = "bolder mx-2" >Total Deposit: <span className='font-light'>{ (goal.deposit[0]).toLocaleString() }</span> </span> <span>|</span> 
                    <span className = "bolder mx-2" >Goal Amount: <span className='font-light'>{ (goal.goal_amount).toLocaleString() }</span> </span> 
                    </div>
                ))
            }
            <Modal show={show} onHide={handleClose} className = "p-3 text-center">
            <GoalPhoto goal_id={holdId}/>
            </Modal>
            </div>
            )
        }
    }
    let progress
    return ( 
        <div className = 'bg-lighter'>
            <div className = 'p-1' >
            <div className='row m-0 bg-lighter rounded-4 py-2'><div className='col-7'><h4 className='py-2'>Goals: {span.length}</h4></div>
            <div className='col-5 text-end'>
            <h6 onClick = {
                () => { setGoalSetting(true) }
            }
            className = 'rounded-3 bk-warning2 m-0' > Add a new Goal </h6></div>
            <div className='col-2 d-none'>
            <img src = {props.profile}
            className = "rounded-circle object-fit-cover img-head"
            alt = "investors" /> </div>
            </div>
            {myGoals()}
            </div>
        </div>
    )
};
export default ResGoals;