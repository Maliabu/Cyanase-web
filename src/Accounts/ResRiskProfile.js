import React, { useState } from "react";
import { FaArrowCircleLeft } from "react-icons/fa";
import Modal from 'react-bootstrap/Modal';
import Pic from './Pic';
import Risk from '../images/Group 130.png'
import RProfile from './RProfile';

const ResRiskProfile = (props) => {
    const [show2, setShow2] = useState(false);

    const handleClose2 = () => setShow2(false);
    const handleShow2 = () => setShow2(true);
    return ( < div > < Pic / > <
        div className = "pt-5 res-home" >
        <
        h6 className = "mt-5 p-3 bg-light text-center" > General Account Settings < /h6></div > <
        FaArrowCircleLeft size = { 30 }
        className = "active mx-5 mt-3"
        onClick = {
            () => { props.changeRiskProfileSetting(false) }
        }
        />  <
        h6 className = "mx-5 mt-3 bolder" > Investor Risk Profiler < /h6> <
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
        div className = "text-center" > <
        div className = "row bg-white p-3 rounded-4" >
        <
        p className = "font-lighter" >
        The risk profiler is intended to grade and check how much you can accommodate an investment risk.The information you provide here is strictly
        for grading purposes.Thus we don not share it with any third parties or use it
        for any other activities. <
        /p><div className="p-5"><
        p className = "py-2 border border-warning text-warning rounded-25"
        onClick = { handleShow2 } > COMPLETE YOUR PROFILE < /p> </div > < /
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