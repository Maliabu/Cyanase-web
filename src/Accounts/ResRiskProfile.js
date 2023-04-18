import React, { useState } from "react";
import Modal from 'react-bootstrap/Modal';
import Pic from './Pic';
import Risk from '../images/Group 130.png'
import RProfile from './RProfile';
import { ArrowLeftSquare } from "react-iconly";

const ResRiskProfile = (props) => {
    const [show2, setShow2] = useState(false);

    const handleClose2 = () => setShow2(false);
    const handleShow2 = () => setShow2(true);
    return ( < div > < Pic / > <
        div className = "pt-5 res-home" > < /div > <
        ArrowLeftSquare size = { 30 }
        className = " m-3 mt-5"
        onClick = {
            () => { props.changeRiskProfileSetting(false) }
        }
        />  <
        h6 className = "mx-3 mt-4 text-center text-warning bolder" > Investor Risk Profiler < /h6> <
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
        div className = "text-center res-home" > <
        div className = "row bg-white p-3 rounded-4" >
        <
        p className = "blue-active" >
        This is a questionnaire to be filled by the intending Investor(you).This will help us, help you keep track Of your investments and help you every step of the way. <
        /p> <
        p className = "bolder blue-active" > This document is a mandatory part of each investor’ s Esteemed investing lifespan. <
        /p> <
        p className = "bolder blue-active" > It is mandatory
        for the good of every investor Please complete the questionnaire to fully complete Your Profile as desired. <
        /p> <
        div className = "p-5" > <
        p className = "py-2 border border-warning text-warning rounded-25"
        onClick = { handleShow2 } > View your Risk profile < /p> </div > < /
        div > < /
        div > <
        Modal show = { show2 }
        onHide = { handleClose2 }
        dialogClassName = "" >

        <
        RProfile / > < /
        Modal > < /
        div >
        <
        /div>
    )
}

export default ResRiskProfile;