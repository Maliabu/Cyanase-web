import React from "react";
import { FaUserLock } from "react-icons/fa";
import Form from 'react-bootstrap/Form';

const ChangePassword = () => {
    return ( <
        div className = "p-5 text-center" > <
        FaUserLock size = "70"
        className = 'my-5 active rounded-circle border border-warning p-2' / >
        <
        h1 > Change Password < /h1>  <
        Form >
        <
        Form.Group className = "mb-3 bg-white shadow-sm p-3" >
        <
        Form.Label > Enter your old password < /Form.Label>  <
        Form.Control type = "text"
        id = 'text'
        required placeholder = "example@OldPassword1" / >
        <
        Form.Control.Feedback type = "invalid" >
        This field is required. <
        /Form.Control.Feedback> < /
        Form.Group >
        <
        Form.Group className = "mb-3 bg-white shadow-sm p-3" >
        <
        Form.Label > Enter your New password < /Form.Label>  <
        Form.Control type = "text"
        id = 'text'
        required placeholder = "example@NewPassword1" / >
        <
        Form.Control.Feedback type = "invalid" >
        This field is required. <
        /Form.Control.Feedback> < /
        Form.Group >
        <
        Form.Group className = "mb-3 bg-white shadow-sm p-3" >
        <
        Form.Label > Repeat your New password < /Form.Label>  <
        Form.Control type = "text"
        id = 'text'
        required placeholder = "example@NewPassword1" / >
        <
        Form.Control.Feedback type = "invalid" >
        This field is required. <
        /Form.Control.Feedback> < /
        Form.Group >
        <
        h6 className = "p-3 bg-warning rounded-25 text-center"
        type = "submit" > Change < /h6> < /
        Form > < /
        div >
    )
}

export default ChangePassword;