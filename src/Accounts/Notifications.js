import React from "react";
import { FaArrowCircleLeft } from "react-icons/fa";
import Form from 'react-bootstrap/Form';

const Notifications = (props) => {
    return ( <
        div >
        <
        FaArrowCircleLeft size = { 30 }
        onClick = {
            () => { props.changeNotificationSetting(false) }
        }
        className = "text-warning my-4 active" / > <
        h1 > Notification Settings < /h1>   <
        h6 > Check all the notifications you would like to receive < /h6>  <
        div className = "py-4"
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
        h6 > Make all of my deposits automatic < /h6> <
        Form.Check label = "Goals"
        className = "mt-5 bolder"
        type = "checkbox"
        required id = "default-checkbox" /
        >
        <
        h6 > Remind me to invest
        for my goals < /h6> <
        Form.Check label = "Updates"
        className = "mt-5 bolder"
        type = "checkbox"
        required id = "default-checkbox" /
        >
        <
        h6 > Get me product updates and and investment newsletters < /h6> < /
        Form > < /
        div >
        <
        /
        div >
    )
}

export default Notifications;