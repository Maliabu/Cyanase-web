import React, { useState } from "react";
import Modal from 'react-bootstrap/Modal';
import ChangeDetails from './ChangeDetails';
import Profile from '../images/Ellipse 6.png';
import Form from 'react-bootstrap/Form';
import { ArrowLeftSquare, Call, Message, User } from "react-iconly";
import { FaCameraRetro } from "react-icons/fa";

const ADetails = (props) => {
    const [show2, setShow2] = useState(false);
    const handleClose2 = () => setShow2(false);
    const handleShow2 = () => setShow2(true);
    const [show1, setShow1] = useState(false);
    const handleClose1 = () => setShow1(false);
    const handleShow1 = () => setShow1(true);
    return ( < div >
        <
        ArrowLeftSquare size = "large"
        set = "broken"
        onClick = {
            () => { props.changeAccountDetails(false) }
        }
        className = "text-warning my-4" / > <
        h1 > Account Details < /h1>  <
        div className = "row mt-3 p-2 px-3" > <
        div className = "col-6 p-5" >
        <
        div className = "row p-2 px-3 border-bottom" > <
        div className = "col-1 px-3" >
        <
        User size = "large"
        set = "broken"
        className = 'my-5 active' / >
        <
        /
        div >
        <
        div className = "col-11 mt-5" >
        <
        h4 > Name < /h4> <
        h6 > < p className = "grey-text" > User Name < /p>  < /
        h6 > < /
        div >
        <
        /
        div >
        <
        div className = "row p-2 px-3 border-bottom" > <
        div className = "col-1" >
        <
        Call size = "large"
        set = "broken"
        className = 'my-5 active' / >
        <
        /
        div >
        <
        div className = "col-11 mt-5" >
        <
        h4 > Phone < /h4> <
        h6 > < p className = "grey-text" > +256 772971878 < /p>  < /
        h6 > < /
        div >
        <
        /
        div >
        <
        div className = "row p-2 px-3 border-bottom" > <
        div className = "col-1" >
        <
        Message size = "large"
        set = "broken"
        className = 'my-5 active' / >
        <
        /
        div >
        <
        div className = "col-11 mt-5" >
        <
        h4 > Email < /h4> <
        h6 > < p className = "grey-text" > user @cyanase.com < /p> < /
        h6 > < /
        div >
        <
        /
        div >
        <
        /
        div >
        <
        div className = "col-6 px-5 text-center" > <
        img src = { Profile }
        width = '40%'
        height = '45%'
        className = "mt-4"
        alt = "investors" / > <
        h6 className = "border border-warning text-center rounded-25 mt-5 text-warning p-3"
        onClick = { handleShow1 } > Change Photo < /h6> <
        h6 className = "bg-warning text-center rounded-25 mt-3 active text-dark p-3"
        onClick = { handleShow2 } > Edit Account Details < /h6> < /
        div >
        <
        Modal show = { show2 }
        onHide = { handleClose2 } >
        <
        ChangeDetails / > < /
        Modal >
        <
        Modal show = { show1 }
        className = "p-5 text-center"
        onHide = { handleClose1 } >
        <
        div className = "text-center p-5" >
        <
        FaCameraRetro size = "xlarge"
        set = "broken"
        className = 'm-5 p-2 border rounded-circle border-warning text-warning' / >
        <
        h4 className = "my-3 text-center" > Change Profile Photo < /h4> <
        Form >
        <
        Form.Group className = "mb-3 bg-white shadow-sm p-3" >
        <
        Form.Label > Choose Photo < /Form.Label>  <
        Form.Control type = "file"
        id = 'file'
        placeholder = "No image chosen" / >
        <
        /
        Form.Group > <
        h6 className = "p-3 my-4 bg-warning rounded-25 " > Save Photo < /h6> < /
        Form > < /
        div > < /
        Modal >
        <
        /
        div >
        <
        /
        div >
    )
}

export default ADetails;