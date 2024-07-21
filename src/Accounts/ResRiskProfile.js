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
        h4 className = "mt-3 bolder" ><
        ArrowLeftSquare size = { 30 }
        className = " m-3 mt-3"
        onClick = {
            () => { props.changeRiskProfileSetting(false) }
        }
        /> Investor Risk Profile < /h4> <
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
        div className = "row bg-white p-3 rounded-4" >< h5 className = " px-3 py-2 text-center border-top border-bottom" >Status: {
        complete
    } < /h5> <
    div className = "p-4" > <
        p className = " bk-warning rounded-3 px-5"
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