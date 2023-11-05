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
    <h4 className="bolder">Settings</h4>
    <
        div className = "row p-2 bg-light" > <
        div className = "col-2 text-end" >
        <
        User size = "25"
        set = 'broken'
        className = ' blue-active' / >
        <
        /
        div >
        <
        div className = "col-10" >
        <
        div className = "blue-active bolder"
        onClick = {
            () => { setAccountSetting(true) }
        } > Account < /div> <
        p className = "grey-text" > Profile, Next of Kin < /p> < /
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
        className = ' blue-active' / >
        <
        /
        div >
        <
        div className = "col-10" >
        <
        div className = "blue-active bolder"
        onClick = {
            () => { setRiskProfile(true) }
        } > Investment < /div> <
        p className = "grey-text" > Risk Profile < /p> < /
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
        className = 'blue-active' / >
        <
        /
        div >
        <
        div className = "col-10" >
        <
        div className = "blue-active bolder"
        onClick = {
            () => { setNotifications(true) }
        } > Notifications < /div> <
        p className = "grey-text" > On Goals, Deposits < /p> < /
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
        className = 'blue-active' / >
        <
        /
        div >
        <
        div className = "col-10" >
        <
        div className = "blue-active bolder"
        onClick = {
            () => { setFaqs(true) }
        } > FAQs < /div> <
        p className = "grey-text" > Learn More About Cyanase < /p> < /
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
        className = 'blue-active' / >
        <
        /
        div >
        <
        div className = "col-10" >
        <
        div className = "blue-active bolder"
        onClick = {
            () => { setContacts(true) }
        } > Help Centre < /div> <
        p className = "grey-text" > Call, Whatsapp, Emails < /p> < /
        div >
        <
        /
        div >
        <h6 className="mx-5 rounded-3 py-3 mt-3 warning text-center" onClick={()=>{setLogout(true)}}>Logout</h6>
        <
        p className = "grey-text p-3 text-center" > All Rights Reserved < br / > .@CyanaseInvestors2022 < /p> < /
        div > 
    );
};

export default ResSettings;