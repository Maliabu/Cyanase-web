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
import { Notification, User, Call, Chat, Chart, Lock } from 'react-iconly';

const ResSettings = (props) => {
    const [accountSetting, setAccountSetting] = useState(false);
    const [notifications, setNotifications] = useState(false);
    const [logout, setLogout] = useState(false);
    const [contacts, setContacts] = useState(false);
    const [faqs, setFaqs] = useState(false);
    const [riskProfile, setRiskProfile] = useState(false);
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
    return ( < div className="p-4"> 
    <h4 className="bolder p-2">Settings</h4>
    <
        div className = "row p-2 pt-3 " > <
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
        <
        h4 className="bolder"
        onClick = {
            () => { setAccountSetting(true) }
        } >Account<
        p className = "font-light" > Profile, Next of Kin < /p>  < /h4> < /
        div >
        <
        /
        div >
        <
        div className = "row p-2  pt-3" > <
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
        <
        h4 className="bolder"
        onClick = {
            () => { setRiskProfile(true) }
        } >Investment <
        p className = "font-light" > Risk Profile </p></h4> < /
        div >
        <
        /
        div >
        <
        div className = "row p-2  pt-3" > <
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
        <
        h4 className="bolder"
        onClick = {
            () => { setNotifications(true) }
        } >Notifications<
        p className = "font-light" > On Goals, Deposits < /p></h4>  < /
        div >
        <
        /
        div >
        <
        div className = "row p-2  pt-3" > <
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
        <
        h4 className="bolder"
        onClick = {
            () => { setFaqs(true) }
        } >FAQs<
        p className = "font-light" > Learn More About Cyanase </p> < /h4>  < /
        div >
        <
        /
        div >
        <
        div className = "row p-2  pt-3" > <
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
        <
        h4 className="bolder"
        onClick = {
            () => { setContacts(true) }
        } >Help<
        p className = "font-light" > Call, Whatsapp, Emails </p></h4> < /
        div >
        <
        /
        div >
        <h6 className=" rounded-3 mt-1 p-3 bg-lighter mx-5 text-center hover-goal-name" onClick={()=>{setLogout(true)}}><Lock/><h6>Logout</h6></h6>
        <
        p className = "font-light p-3 text-center" > All Rights Reserved < br / > @CyanaseInvestors{new Date().getFullYear()} < /p> < /
        div > 
    );
};

export default ResSettings;