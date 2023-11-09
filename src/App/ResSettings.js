import React, { useState } from "react";
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.scss';
import ResAccount from './ResAccount';
import ResNotifications from '../Accounts/ResNotifications';
import ResContactUs from '../Accounts/ResContactUs';
import ResFAQs from '../Accounts/ResFAQs';
import ResRiskProfile from '../Accounts/ResRiskProfile';
import Logout from '../Accounts/Logout';
import { Notification, User, Call, Chat, Chart } from 'react-iconly';

const ResSettings = (props) => {
    const [accountSetting, setAccountSetting] = useState(false);
    const [notifications, setNotifications] = useState(false);
    const [logout, setLogout] = useState(false);
    const [contacts, setContacts] = useState(false);
    const [faqs, setFaqs] = useState(false);
    const [riskProfile, setRiskProfile] = useState(false);
    const handleTab2 =()=>{
        return(<Logout/>)
    }
    if (accountSetting) {
        return ( < ResAccount changeAccountSetting = { setAccountSetting }
            / >
        )
    }
    if (logout) {
        return ( < Logout
            / >
        )
    }
    if (notifications) {
        return ( < ResNotifications changeNotificationSetting = { setNotifications }
            / >
        )
    }
    if (contacts) {
        return ( < ResContactUs changeContactSetting = { setContacts }
            / >
        )
    }
    if (faqs) {
        return ( < ResFAQs changeFaqsSetting = { setFaqs }
            / >
        )
    }
    if (riskProfile) {
        return ( < ResRiskProfile changeRiskProfileSetting = { setRiskProfile }
            / >
        )
    }
    return ( < div className="p-3"> 
    <h4 className="bolder p-2">Settings</h4>
    <
        div className = "row p-2 py-3 bg-light" > <
        div className = "col-2 text-end" >
        <
        User size = "25"
        set = 'broken'
        className = '' / >
        <
        /
        div >
        <
        div className = "col-10" >
        <h6>
        <
        div
        onClick = {
            () => { setAccountSetting(true) }
        } ><h4 className="bolder">Account</h4> < /div> <
        span className = "grey-text" > Profile, Next of Kin < /span></h6> < /
        div >
        <
        /
        div >
        <
        div className = "row p-2 bg-light res-home" > <
        div className = "col-2 text-end" >
        <
        Chart size = "25"
        set = 'broken'
        className = '' / >
        <
        /
        div >
        <
        div className = "col-10" >
        <h6>
        <
        div
        onClick = {
            () => { setRiskProfile(true) }
        } > <h4 className="bolder">Investment</h4>  < /div> <
        span className = "grey-text" > Risk Profile < /span></h6> < /
        div >
        <
        /
        div >
        <
        div className = "row p-2 bg-light res-home" > <
        div className = "col-2 text-end" >
        <
        Notification size = "25"
        set = 'broken'
        className = '' / >
        <
        /
        div >
        <
        div className = "col-10" >
        <h6>
        <
        div
        onClick = {
            () => { setNotifications(true) }
        } > <h4 className="bolder">Notifications</h4>  < /div> <
        span className = "grey-text" > On Goals, Deposits < /span></h6> < /
        div >
        <
        /
        div >
        <
        div className = "row p-2 bg-light res-home" > <
        div className = "col-2 text-end" >
        <
        Chat size = "25"
        set = 'broken'
        className = '' / >
        <
        /
        div >
        <
        div className = "col-10" >
        <h6>
        <
        div
        onClick = {
            () => { setFaqs(true) }
        } > <h4 className="bolder">FAQs</h4>  < /div> <
        span className = "grey-text" > Learn More About Cyanase < /span></h6> < /
        div >
        <
        /
        div >
        <
        div className = "row p-2 bg-light res-home" > <
        div className = "col-2 text-end" >
        <
        Call size = "25"
        set = 'broken'
        className = '' / >
        <
        /
        div >
        <
        div className = "col-10" >
        <h6>
        <
        div
        onClick = {
            () => { setContacts(true) }
        } > <h4 className="bolder">Help</h4>  < /div> <
        span className = "grey-text" > Call, Whatsapp, Emails < /span></h6> < /
        div >
        <
        /
        div >
        <h6 className=" rounded-3 mt-3 bk-warning text-center" onClick={()=>{setLogout(true)}}>Logout</h6>
        <
        p className = "grey-text p-3 text-center" > All Rights Reserved < br / > .@CyanaseInvestors2022 < /p> < /
        div > 
    );
};

export default ResSettings;