import React, { useState } from "react";
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.scss';
import { FaBell, FaComments, FaPhoneAlt, FaUserCircle } from "react-icons/fa";
import Account from '../Accounts/Account';
import Notifications from '../Accounts/Notifications';
import ContactUs from '../Accounts/ContactUs';
import FAQs from '../Accounts/FAQs';

const Settings = ({ id, activeTab, children }) => {
    const [accountSetting, setAccountSetting] = useState(false);
    const [notifications, setNotifications] = useState(false);
    const [contacts, setContacts] = useState(false);
    const [faqs, setFaqs] = useState(false);
    if (accountSetting) {
        return ( < Account changeAccountSetting = { setAccountSetting }
            / >
        )
    }
    if (notifications) {
        return ( < Notifications changeNotificationSetting = { setNotifications }
            / >
        )
    }
    if (contacts) {
        return ( < ContactUs changeContactSetting = { setContacts }
            / >
        )
    }
    if (faqs) {
        return ( < FAQs changeFaqsSetting = { setFaqs }
            / >
        )
    }
    return ( <
        div className = "scroll-y" >
        <
        h1 > General Account Settings < /h1> <
        div className = "row mt-3 p-2 px-3 border-bottom" > <
        div className = "col-1" >
        <
        FaUserCircle size = "50"
        className = 'my-5 active' / >
        <
        /
        div >
        <
        div className = "col-11 mt-5" >
        <
        h4 className = "active bolder"
        onClick = {
            () => { setAccountSetting(true) }
        } > Account < /h4> <
        h6 > Profile, Next of Kin, Security, Privacy < /h6> < /
        div >
        <
        /
        div >
        <
        div className = "row mt-3 p-2 px-3 border-bottom" > <
        div className = "col-1" >
        <
        FaBell size = "50"
        className = 'my-5 active' / >
        <
        /
        div >
        <
        div className = "col-11 mt-5" >
        <
        h4 className = "active bolder"
        onClick = {
            () => { setNotifications(true) }
        } > Notifications < /h4> <
        h6 > On Goals, Deposits < /h6> < /
        div >
        <
        /
        div >
        <
        div className = "row mt-3 p-2 px-3 border-bottom" > <
        div className = "col-1" >
        <
        FaComments size = "50"
        className = 'my-5 active' / >
        <
        /
        div >
        <
        div className = "col-11 mt-5" >
        <
        h4 className = "active bolder"
        onClick = {
            () => { setFaqs(true) }
        } > FAQs < /h4> <
        h6 > Learn More About Cyanase < /h6> < /
        div >
        <
        /
        div >
        <
        div className = "row mt-3 p-2 px-3 border-bottom" > <
        div className = "col-1" >
        <
        FaPhoneAlt size = "50"
        className = 'my-5 active' / >
        <
        /
        div >
        <
        div className = "col-11 mt-5" >
        <
        h4 className = "active bolder"
        onClick = {
            () => { setContacts(true) }
        } > Help Centre < /h4> <
        h6 > Call, Whatsapp, Emails < /h6> < /
        div >
        <
        /
        div >
        <
        /div>
    );
};

export default Settings;