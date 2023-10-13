import React, { useState } from "react";
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.scss';
import ResAccount from './ResAccount';
import ResNotifications from '../Accounts/ResNotifications';
import ResContactUs from '../Accounts/ResContactUs';
import ResFAQs from '../Accounts/ResFAQs';
import ResRiskProfile from '../Accounts/ResRiskProfile';
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
    return ( < div > <
        div className = "p-2 res-home" >
        <
        div className = 'row p-2 px-3' > <
        div className = 'col-10 bg-lighter rounded-4' > <
        h4 className = ' mx-3 bolder mt-3' > Settings < /h4 > < /div >
        <
        div className = 'rounded-4 d-none light-res-home wide' >
        <
        p className = "bolder text-end mx-4 mt-2" > welcome back user <
        div className = " justify-content-center" > <
        p className = "px-1 font-lighter" > pick up where we left off < /p></div > < /p>< /
        div >
        <
        div className = 'col-2' > <
        // img src = "http://127.0.0.1:8000/static/photo.png"
        img src = "https://cyanase.lol/static/photo.png"
        className = "rounded-circle object-fit-cover mt-2 img-head"
        alt = "investors" / > < /div> < /
        div >
        <
        div className = 'd-flex mt-2 d-none' >
        <
        div className = 'rounded-4 light-res-home wider' >
        <
        p className = "bolder mx-4 mt-2" > Tips: <
        div className = " justify-content-center" > <
        p className = "px-1 font-lighter" > Dont save your money, invest < /p></div > < /p>< /
        div > < /
        div > <
        div className = "row p-3 bg-light res-home" > <
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
        p className = "grey-text p-3 text-center" > All Rights Reserved < br / > .@CyanaseInvestors2022 < /p> < /
        div > < /div >
    );
};

export default ResSettings;