import { PersonalRequests,UserRequests } from '../Api/MainRequests';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import './style.scss';
import React, { useState, useEffect } from "react";
import { PROFILE_PHOTO } from '../apis';
import { AddUser, ArrowLeftSquare } from 'react-iconly';
import ProgressBar from '@ramonak/react-progress-bar';
import { Modal } from 'react-bootstrap';
import Goal from '../Accounts/Goal'
import ResGoals1 from './ResGoals1'

const ResGoals = () => {
    const [goalSetting, setGoalSetting] = useState(false);
    const [span, setSpan] = useState([])
    const [country, setCountry] = useState("")
    const [holdId, setHoldId] = useState("");
    const [holdName, setHoldName] = useState("");
    const [holdAmount, setHoldAmount] = useState("");
    let [holdDeposit, setHoldDeposit] = useState("");
    const [holdCreated, setHoldCreated] = useState("");
    const [show3, setShow3] = useState(false);
    const handleClose3 = () => setShow3(false);
    const handleShow3 = () => setShow3(true);
    useEffect(() => {
        PersonalRequests().then(res => {
            setSpan(res[2]); // array(14)
        });
        UserRequests().then(res=>{
            setCountry(res.profile.country)
        })
    }, []);
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
            country = { country }
            / > < /
            div >
        )
    }

    function getId(id, name, amount, deposit, created) {
        setHoldId(id)
        setHoldName(name)
        setHoldAmount(amount)
        setHoldDeposit(deposit)
        setHoldCreated(created)
        handleShow3()
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
                    div className = "p-3 bg-white res-home rounded-4 mt-1"
                    key = { goal.goal_id } > <
                    div className = "d-flex flex-row flex" > <
                    span className = "mt-1" > <
                    AddUser className = " rounded-circle bg-light active p-2"
                    size = "large" / > < /span>  <
                    p className = "mx-5 mt-1" > < span className = "bolder"
                     > {
                        (goal.goal_name)
                    } < /span><br/ > < p > created {
                        (goal.created).slice(0, 10)
                    } < /p >  < /
                    p ><p className = 'rounded-3 warning-goals mt-0 text-center' onClick = {
                        () => getId(goal.goal_id, goal.goal_name, goal.goal_amount, goal.deposit[0], goal.created)
                    }>Deposit</p> < /
                    div >
                    <
                    span > Progress: {
                        progress = (100 - ((goal.goal_amount - goal.deposit[0]) / goal.goal_amount * 100)).toFixed(2)
                    } %
                    <
                    span >
                    <
                    ProgressBar completed = { progress }
                    maxCompleted = { 100 }
                    isLabelVisible = { false }
                    bgColor = 'orange' /
                    >
                    <
                    /span> < /
                    span > <
                    span className = "bolder d-none" > { goal.deposit[0] } < /span > <
                    span className = "active d-none" > { goal.goal_amount } < /span > < /
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
            className = 'rounded-3 warning text-center' > Add a new Goal </p></div>{myGoals()}
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
            / > < /
            Modal >
             < /
            div > <
            /
            div >
        )
};
export default ResGoals;