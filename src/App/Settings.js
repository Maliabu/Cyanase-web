import React, { useState } from "react";
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.scss';
import Account from '../Accounts/Account';
import Notifications from '../Accounts/Notifications';
import { Call, Chat, Notification, User } from "react-iconly";

const Settings = ({ id, activeTab, children, ...props }) => {
    const [accountSetting, setAccountSetting] = useState(false);
    const [notifications, setNotifications] = useState(false);
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
    return ( <
        div className = "scroll-y m-3" >
        <
        h3 > General Account Settings < /h3> <
        div className = "row mt-3 p-2 px-3 border-bottom" > <
        div className = "col-1" >
        <
        User size = "medium"
        set = "broken"
        className = 'my-3 active' / >
        <
        /
        div >
        <
        div className = "col-11 mt-3" >
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
        Notification size = "medium"
        set = "broken"
        className = 'my-3 active' / >
        <
        /
        div >
        <
        div className = "col-11 mt-3" >
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
        Chat size = "medium"
        set = "broken"
        className = 'my-3 active' / >
        <
        /
        div >
        <
        div className = "col-11 mt-3" >
        <
        h4 className = "active bolder"
        onClick = {
            () => { props.handletab10() }
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
        Call size = "medium"
        set = "broken"
        className = 'my-3 active' / >
        <
        /
        div >
        <
        div className = "col-11 mt-3" >
        <
        h4 className = "active bolder"
        onClick = {
            () => { props.handletab15() }
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