import React from "react";
import Form from 'react-bootstrap/Form';
import { ChevronLeft } from "react-iconly";

const ResNotifications = (props) => {
    return ( 
        <div> 
        <div >
        <div className = "px-4 res-home rounded-4" >
        <h4 className = "bolder" >
        <ChevronLeft size = { 20 }
        onClick = {
            () => { props.changeNotificationSetting(false) }
        }
        className = "my-4" /> Notification Settings </h4>   
        <p > Check all the notifications you would like to receive </p>  
        <div className = ""
        key = "default-checkbox" >
        <Form >
        <Form.Check label = "Auto Save"
        className = "mt-5 bolder"
        type = "checkbox"
        required id = "default-checkbox" />
        <p > Make all of my deposits automatic </p> 
        <Form.Check label = "Goals"
        className = "mt-5 bolder"
        type = "checkbox"
        required id = "default-checkbox" />
        <p > Remind me to invest
        for my goals </p> 
        <Form.Check label = "Updates"
        className = "mt-5 bolder"
        type = "checkbox"
        required id = "default-checkbox" />
        <p > Get more product updates and and investment newsletters </p> </Form> 
        </div>
        </div> </div> </div>
    )
}

export default ResNotifications;