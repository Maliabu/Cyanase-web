import React, { useState } from "react";
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.scss';
import { FaBalanceScale, FaBell, FaComments, FaPhoneAlt, FaUserCircle } from "react-icons/fa";
import ResAccount from './ResAccount';
import ResNotifications from '../Accounts/ResNotifications';
import ResContactUs from '../Accounts/ResContactUs';
import ResFAQs from '../Accounts/ResFAQs';
import ResRiskProfile from '../Accounts/ResRiskProfile'
import Pic from '../Accounts/Pic'

const ResSettings = ({ id, activeTab, children }) => {
    const [accountSetting, setAccountSetting] = useState(false);
    const [notifications, setNotifications] = useState(false);
    const [contacts, setContacts] = useState(false);
    const [faqs, setFaqs] = useState(false);
    const [riskProfile, setRiskProfile] = useState(false);
    if (accountSetting) {
        return ( < ResAccount changeAccountSetting = { setAccountSetting }
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
    return ( < div > < Pic / > <
        div className = "pt-5" >
        <
        h6 className = "mt-5 p-3 bg-light text-center" > General Account Settings < /h6> <
        div className = "row p-3 border-bottom res-home" > <
        div className = "col-2 text-end" >
        <
        FaUserCircle size = "25"
        className = ' active' / >
        <
        /
        div >
        <
        div className = "col-10" >
        <
        span className = "active bolder"
        onClick = {
            () => { setAccountSetting(true) }
        } > Account < /span> <
        p > Profile, Next of Kin, Security, Privacy < /p> < /
        div >
        <
        /
        div >
        <
        div className = "row p-3 border-bottom res-home" > <
        div className = "col-2 text-end" >
        <
        FaBalanceScale size = "25"
        className = ' active' / >
        <
        /
        div >
        <
        div className = "col-10" >
        <
        span className = "active bolder"
        onClick = {
            () => { setRiskProfile(true) }
        } > Investment < /span> <
        p > Risk Profile < /p> < /
        div >
        <
        /
        div >
        <
        div className = "row p-3 border-bottom res-home" > <
        div className = "col-2 text-end" >
        <
        FaBell size = "25"
        className = 'active' / >
        <
        /
        div >
        <
        div className = "col-10" >
        <
        div className = "active bolder"
        onClick = {
            () => { setNotifications(true) }
        } > Notifications < /div> <
        p > On Goals, Deposits < /p> < /
        div >
        <
        /
        div >
        <
        div className = "row p-3 border-bottom res-home" > <
        div className = "col-2 text-end" >
        <
        FaComments size = "25"
        className = 'active' / >
        <
        /
        div >
        <
        div className = "col-10" >
        <
        div className = "active bolder"
        onClick = {
            () => { setFaqs(true) }
        } > FAQs < /div> <
        p > Learn More About Cyanase < /p> < /
        div >
        <
        /
        div >
        <
        div className = "row p-3 border-bottom res-home" > <
        div className = "col-2 text-end" >
        <
        FaPhoneAlt size = "25"
        className = 'active' / >
        <
        /
        div >
        <
        div className = "col-10" >
        <
        div className = "active bolder"
        onClick = {
            () => { setContacts(true) }
        } > Help Centre < /div> <
        p > Call, Whatsapp, Emails < /p> < /
        div >
        <
        /
        div >
        <
        /div></div >
    );
};

export default ResSettings;