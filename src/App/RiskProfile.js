import { useEffect } from "react";
import { GetRiskProfile, GetInvestmentOptionsRequests } from "../Api/MainRequests";
import React, { useState } from "react";
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.scss';
import Risk from '../images/Group 130.png'
import RProfile from '../Accounts/RProfile';
import Modal from 'react-bootstrap/Modal';
import { Activity } from "react-iconly";

const RiskProfile = ({ id, activeTab, children }) => {
    const [show2, setShow2] = useState(false);
    const [complete, setComplete] = useState("Incomplete");
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
    return ( <
        div className="row"> <
        div className = "row p-3" >
        <
        div className = "col-7 investments rounded-4 p-2" >
        <
        img src = { Risk }
        width = '80%'
        className = "m-5"
        height = '80%'
        alt = "investors" / >
        <
        /div> <
        div className = "col-5 p-5 blue-darks rounded-4 text-center" > <
        div className = "row p-4 rounded-4" >
        <
        h4 className = "" > Investor Risk Profile < /h4>  <
        Activity size = "xlarge"
        set = "broken"
        className = 'my-3' / >
        <
        h6 >
        The risk profile is intended to grade and check how much you can accommodate an investment risk.The information you provide here is strictly
        for grading purposes.Thus we don not share it with any third parties or use it
        for any other activities. <
        /h6> < /
        div > < h6 className = "mt-3 p-4 border-top" > Risk profile Status: < span className = "rounded-2 bolder mx-3 py-2 " > {
            complete
        } < /span> < /
        h6 > <
        h6 className = " mt-3 btn btn-warning"
        onClick = { handleShow2 } ><Activity className="mx-2"/> {editOrComplete()} < /h6> < /
        div > <
        Modal show = { show2 }
        onHide = { handleClose2 }
        dialogClassName = "my-modal" >

        <
        RProfile options = {investment_options} /
        >
        <
        /
        Modal > < /
        div > < /
        div >
    );
};

export default RiskProfile;