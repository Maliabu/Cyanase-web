import React from "react";
import Form from 'react-bootstrap/Form';
import { ArrowLeftSquare } from "react-iconly";

const Notifications = (props) => {
    return ( <
        div className="mx-3">
        <
        ArrowLeftSquare size = "medium"
        set = "broken"
        onClick = {
            () => { props.changeNotificationSetting(false) }
        }
        className = "my-4 active" / > <
        h3 > Notification Settings < /h3>   <
        h6 > Check all the notifications you would like to receive < /h6>  <
        div className = "pt-3"
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