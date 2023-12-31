import React, { useState, useEffect } from "react";
import Modal from 'react-bootstrap/Modal';
import Risk from '../images/Group 130.png'
import RProfile from './RProfile';
import { GetRiskProfile, GetInvestmentOptionsRequests } from "../Api/MainRequests";
import { ArrowLeftSquare } from "react-iconly";

const ResRiskProfile = (props) => {
    const [complete, setComplete] = useState("Incomplete");
    const [show2, setShow2] = useState(false);
    const [investment_options, setOptions] = useState([])
    const handleClose2 = () => setShow2(false);
    const handleShow2 = () => setShow2(true);
    useEffect(() => {
        GetRiskProfile().then(res => {
            if (res.status === true) {
                setComplete("Complete")
            }
        });
        GetInvestmentOptionsRequests().then(res => {
            setOptions(res)
        });
    }, []);
    const editOrComplete = () =>{
        let button = ""
        if(complete === "Complete"){
            button = "Edit your Risk Profile"
            return button
        } else {
            button = "Take your Risk Profile"
            return button
        }
    }
    return ( < div><div className="p-3">   <
        h4 className = "mt-2 bolder" ><
        ArrowLeftSquare size = { 30 }
        className = " m-3 mt-3"
        onClick = {
            () => { props.changeRiskProfileSetting(false) }
        }
        /> Investor Risk Profiler < /h4> <
        div className = "row p-2 rounded-4" >
        <
        div className = "bg-white rounded-4 p-3" >
        <
        img src = { Risk }
        width = '70%'
        className = "mx-5"
        height = '100%'
        alt = "investors" / >
        <
        /div> <
        div className = " res-home" > <
        div className = "row bg-white p-3 rounded-4" >
        <
        p >
        This is a questionnaire to be filled by the intending Investor(you).This will help us, help you keep track Of your investments and help you every step of the way. <
        /p> <
        p > This document is a mandatory part of each investor’ s Esteemed investing lifespan. <
        /p> <
        p > It is mandatory
        for the good of every investor Please complete the questionnaire to fully complete Your Profile as desired. <
        /p>< h5 className = "rounded-2 px-3 py-2 text-center bolder investment" >Status: {
        complete
    } < /h5> <
    div className = "p-5" > <
        p className = " bk-warning rounded-3"
    onClick = { handleShow2 } > {editOrComplete()} < /p> </div > < /
    div > < /
    div > <
        Modal show = { show2 }
    onHide = { handleClose2 }
    dialogClassName = "" >

        <
        RProfile status = { complete }
        options = {investment_options}
    / > < /
    Modal > < /
    div >
        <
        /div></div>
)
}

export default ResRiskProfile;