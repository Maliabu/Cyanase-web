import React from "react";
import { FaQuestionCircle } from "react-icons/fa";
import Form from 'react-bootstrap/Form';

const Ask = () => {
    return ( <
        div className = "p-5 text-center" > <
        FaQuestionCircle size = "70"
        className = 'my-3 active rounded-circle border border-warning p-2' / >
        <
        h3 > Ask Us Anything < /h3>  <
        Form >
        <
        Form.Group className = "mb-3"
        controlId = "exampleForm.ControlTextarea1" >
        <
        Form.Label className = "py-3" > Type your question here < /Form.Label> <
        Form.Control as = "textarea"
        rows = { 3 }
        /> < /
        Form.Group > <
        h6 className = "p-3 bg-warning rounded-3 active text-dark text-center"
        type = "submit" > Submit < /h6> < /
        Form > < /
        div >
    )
}

export default Ask;