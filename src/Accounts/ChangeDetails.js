import React from "react";
import { FaTrashAlt } from "react-icons/fa";
import Form from 'react-bootstrap/Form';

const ChangeDetails = () => {
    return ( <
        div className = "p-5 text-center" > <
        FaTrashAlt size = "70"
        className = 'my-5 active rounded-circle border border-warning p-2' / >
        <
        h1 > Delete Account < /h1>  <
        Form >
        <
        Form.Group className = "mb-3 bg-white shadow-sm p-3" >
        <
        Form.Label > Confirm < /Form.Label>  <
        Form.Control type = "check"
        id = 'number'
        required / >
        <
        Form.Control.Feedback type = "invalid" >
        This field is required. <
        /Form.Control.Feedback> < /
        Form.Group >
        <
        h6 className = "p-3 bg-danger active text-white rounded-3 text-center"
        type = "submit" > Delete < /h6> < /
        Form > < /
        div >
    )
}

export default ChangeDetails;