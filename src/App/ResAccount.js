import React, { useState } from "react";
import { FaCameraRetro } from "react-icons/fa";
import Modal from 'react-bootstrap/Modal';
import ResChangeDetails from '../Accounts/ResChangeDetails';
import Profile from '../images/Ellipse 6.png';
import Form from 'react-bootstrap/Form';
import Pic from '../Accounts/Pic'
import { ArrowLeftSquare, Call, Camera, Message, User } from "react-iconly";

const ResAccount = (props) => {
    const [show2, setShow2] = useState(false);
    const handleClose2 = () => setShow2(false);
    const handleShow2 = () => setShow2(true);
    const [show1, setShow1] = useState(false);
    const handleClose1 = () => setShow1(false);
    const handleShow1 = () => setShow1(true);
    return ( < div > < Pic / > <
        div className = "pt-5" >
        <
        h6 className = "mt-5 p-3 bg-light bolder" > Settings < /h6></div >
        <
        div className = "px-3 res-home pb-5 mb-5" >
        <
        ArrowLeftSquare size = { 30 }
        onClick = {
            () => { props.changeAccountSetting(false) }
        }
        className = " m-3 " / > <
        span className = "mt-2 bolder" > Account Details < /span>  

        <
        div className = " px-5 text-center" > <
        img src = { Profile }
        width = '60%'
        height = '60%'
        className = "mt-5"
        alt = "investors" / > <
        p className = "border border-warning text-center rounded-4 mt-3 text-warning p-2"
        onClick = { handleShow1 } > < Camera set = 'broken' / > < /p>< /
        div >
        <
        Modal show = { show2 }
        className = "p-3"
        onHide = { handleClose2 } >
        <
        ResChangeDetails / > < /
        Modal >
        <
        Modal show = { show1 }
        className = "p-3 text-center"
        onHide = { handleClose1 } >
        <
        div className = "text-center p-3" >
        <
        FaCameraRetro size = "60"
        className = 'm-2 p-2 border rounded-circle border-warning text-warning' / >
        <
        h6 className = "my-3 text-center" > Change Profile Photo < /h6> <
        Form >
        <
        p >
        <
        Form.Group className = "mb-3 bg-white shadow-sm p-3" >
        <
        Form.Label > Choose Photo < /Form.Label>  <
        Form.Control type = "file"
        id = 'file'
        placeholder = "No image chosen" / >
        <
        /
        Form.Group > < /p><
        h6 className = "p-2 my-4 bg-warning rounded-25 " > Save Photo < /h6> < /
        Form > < /
        div > < /
        Modal >
        <
        div className = "row mt-3 p-2" > <
        div className = "" >
        <
        div className = "row p-2 px-3 " > <
        div className = "col-1 px-2" >
        <
        User size = "25"
        set = 'broken'
        className = ' ' / >
        <
        /
        div >
        <
        div className = "col-11 " >
        <
        h6 > Name <
        div > < p className = "text-warning" > User Name < /p>  < /
        div > < /h6>  < /
        div >
        <
        /
        div >
        <
        div className = "row p-2 px-3 " > <
        div className = "col-1 px-2" >
        <
        Call size = "25"
        set = 'broken'
        className = ' ' / >
        <
        /
        div >
        <
        div className = "col-11" >
        <
        h6 > Phone <
        div > < p className = "text-warning" > +256 772971878 < /p>  < /
        div > < /h6> < /
        div >
        <
        /
        div >
        <
        div className = "row p-2 px-3 " > <
        div className = "col-1 px-2" >
        <
        Message size = "25"
        set = 'broken'
        className = '' / >
        <
        /
        div >
        <
        div className = "col-11" >
        <
        h6 > Email < div > < p className = "text-warning" > user @cyanase.com < /p > < /div > < /
        h6 > < /
        div >
        <
        /
        div > <
        p className = "border border-warning text-warning text-center rounded-3 mt-3 p-2"
        onClick = { handleShow2 } > Edit Account Details < /p> <
        p className = "bg-warning text-dark text-center rounded-3 mt-3 p-2"
        onClick = { handleShow2 } > Delete Account < /p> < /
        div >
        <
        /
        div >
        <
        /
        div > < /div>
    )
}

export default ResAccount;