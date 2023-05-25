import React from "react";
import Form from 'react-bootstrap/Form';
import Pic from './Pic'
import { ArrowLeftSquare } from "react-iconly";

const ResNotifications = (props) => {
    return ( < div > < Pic / > <
        div className = "pt-5" >
        <
        p className = "mt-5 p-3 bolder bg-light" > Settings < /p></div > <
        div >
        <
        div className = "px-5 res-home rounded-4" >
        <
        ArrowLeftSquare size = { 30 }
        onClick = {
            () => { props.changeNotificationSetting(false) }
        }
        className = "my-4 mx-2" / > <
        span className = "bolder" > Notification Settings < /span>   <
        p > Check all the notifications you would like to receive < /p>  <
        div className = ""
        key = "default-checkbox" >
        <
        Form >

        <
        Form.Check label = "Auto Save"
        className = "mt-5 bolder"
        type = "checkbox"
        required id = "default-checkbox" /
        >
        <
        p > Make all of my deposits automatic < /p> <
        Form.Check label = "Goals"
        className = "mt-5 bolder"
        type = "checkbox"
        required id = "default-checkbox" /
        >
        <
        p > Remind me to invest
        for my goals < /p> <
        Form.Check label = "Updates"
        className = "mt-5 bolder"
        type = "checkbox"
        required id = "default-checkbox" /
        >
        <
        p > Get me product updates and and investment newsletters < /p> < /
        Form > < /
        div >
        <
        /
        div > < /div> < /div >
    )
}

export default ResNotifications;