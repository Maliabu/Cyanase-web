import React from "react";
import { FaUserTie } from "react-icons/fa";
import Form from 'react-bootstrap/Form';

const NKin = () => {
    return ( <
        div className = "p-5 text-center" > <
        FaUserTie size = "70"
        className = 'my-5 active rounded-circle border border-warning p-2' / >
        <
        h1 > Add your Next of Kin < /h1>  <
        Form >
        <
        Form.Group className = "mb-3 bg-white shadow-sm p-3" >
        <
        Form.Label > First Name < /Form.Label>  <
        Form.Control type = "text"
        id = 'text'
        required placeholder = "First Name" / >
        <
        Form.Control.Feedback type = "invalid" >
        This field is required. <
        /Form.Control.Feedback> < /
        Form.Group >
        <
        Form.Group className = "mb-3 bg-white shadow-sm p-3" >
        <
        Form.Label > Last Name < /Form.Label>  <
        Form.Control type = "text"
        id = 'text'
        required placeholder = "Last Name" / >
        <
        Form.Control.Feedback type = "invalid" >
        This field is required. <
        /Form.Control.Feedback> < /
        Form.Group >
        <
        Form.Group className = "mb-3 bg-white shadow-sm p-3" >
        <
        Form.Label > Email < /Form.Label>  <
        Form.Control type = "text"
        id = 'text'
        required placeholder = "nextofkin@gmail.com" / >
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
        h6 className = "p-3 bg-warning rounded-25 text-center"
        type = "submit" > Change < /h6> < /
        Form > < /
        div >
    )
}

export default NKin;