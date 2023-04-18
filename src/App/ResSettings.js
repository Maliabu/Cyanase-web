import React, { useState } from "react";
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.scss';
import ResAccount from './ResAccount';
import ResNotifications from '../Accounts/ResNotifications';
import ResContactUs from '../Accounts/ResContactUs';
import ResFAQs from '../Accounts/ResFAQs';
import ResRiskProfile from '../Accounts/ResRiskProfile';
import Pic from '../Accounts/Pic';
import { Notification, User, Call, Chat, Chart } from 'react-iconly';

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
        div className = "pt-5 res-home" >
        <
        h6 className = "mt-5 p-3 bolder" > Settings < /h6> <
        div className = "row p-3 pt-5 bg-light res-home" > <
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
        span className = "blue-active bolder"
        onClick = {
            () => { setAccountSetting(true) }
        } > Account < /span> <
        p className = "grey-text" > Profile, Next of Kin, Security, Privacy < /p> < /
        div >
        <
        /
        div >
        <
        div className = "row p-3 bg-light res-home" > <
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
        span className = "blue-active bolder"
        onClick = {
            () => { setRiskProfile(true) }
        } > Investment < /span> <
        p className = "grey-text" > Risk Profile < /p> < /
        div >
        <
        /
        div >
        <
        div className = "row p-3 bg-light res-home" > <
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
        div className = "row p-3 bg-light res-home" > <
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
        div className = "row p-3 bg-light res-home" > <
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
        <
        p className = "grey-text p-5 text-center" > All Rights Reserved < br / > .@CyanaseInvestors2022 < /p> < /
        div > < /div >
    );
};

export default ResSettings;