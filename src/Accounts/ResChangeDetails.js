import React from "react";
import { FaUserEdit } from "react-icons/fa";
import Form from 'react-bootstrap/Form';

const ResChangeDetails = () => {
    return ( <
        div className = "p-3 text-center" > <
        FaUserEdit size = "60"
        className = 'my-3 active rounded-circle border border-warning p-2' / >
        <
        h6 > Edit Your Details < /h6>  <
        Form >
        <
        Form.Group className = "mb-3 bg-white shadow-sm p-3" >
        <
        Form.Label > Email < /Form.Label>  <
        Form.Control type = "text"
        id = 'text'
        required placeholder = "user@gmail.com" / >
        <
        Form.Control.Feedback type = "invalid" >
        This field is required. <
        /Form.Control.Feedback> < /
        Form.Group >
        <
        Form.Group className = "mb-3 bg-white shadow-sm p-3" >
        <
        Form.Label > Phone < /Form.Label>  <
        Form.Control type = "number"
        id = 'number'
        required placeholder = "Phone Number" / >
        <
        Form.Control.Feedback type = "invalid" >
        This field is required. <
        /Form.Control.Feedback> < /
        Form.Group >
        <
        h6 className = "p-2 bg-warning rounded-4 text-center"
        type = "submit" > Change < /h6> < /
        Form > < /
        div >
    )
}

export default ResChangeDetails;