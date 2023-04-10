import React, { useState } from "react";
import { FaArrowCircleLeft, FaUserCircle, FaPhoneAlt, FaEnvelope, FaCameraRetro } from "react-icons/fa";
import Modal from 'react-bootstrap/Modal';
import ResChangeDetails from '../Accounts/ResChangeDetails';
import Profile from '../images/Ellipse 6.png';
import Form from 'react-bootstrap/Form';
import Pic from '../Accounts/Pic'

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
        h6 className = "mt-5 p-3 bg-light text-center" > General Account Settings < /h6></div >
        <
        div className = "px-5 res-home pb-5 mb-5" >
        <
        FaArrowCircleLeft size = { 30 }
        onClick = {
            () => { props.changeAccountSetting(false) }
        }
        className = "text-warning my-3 " / > <
        h6 className = "mt-2" > Account Details < /h6>  

        <
        div className = " px-5 text-center" > <
        img src = { Profile }
        width = '60%'
        height = '60%'
        className = "mt-4"
        alt = "investors" / > <
        p className = "border border-warning text-center rounded-4 mt-3 text-warning p-2"
        onClick = { handleShow1 } > Change Photo < /p>< /
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
        div className = "row p-2 px-3 border-bottom" > <
        div className = "col-2" >
        <
        FaUserCircle size = "25"
        className = ' active' / >
        <
        /
        div >
        <
        div className = "col-10 " >
        <
        h6 > Name <
        div > < p className = "grey-text" > User Name < /p>  < /
        div > < /h6>  < /
        div >
        <
        /
        div >
        <
        div className = "row p-2 px-3 border-bottom" > <
        div className = "col-2" >
        <
        FaPhoneAlt size = "25"
        className = ' active' / >
        <
        /
        div >
        <
        div className = "col-10" >
        <
        h6 > Phone <
        div > < p className = "grey-text" > +256 772971878 < /p>  < /
        div > < /h6> < /
        div >
        <
        /
        div >
        <
        div className = "row p-2 px-3 border-bottom" > <
        div className = "col-2" >
        <
        FaEnvelope size = "25"
        className = 'active' / >
        <
        /
        div >
        <
        div className = "col-10" >
        <
        h6 > Email < div > < p className = "grey-text" > user @cyanase.com < /p > < /div > < /
        h6 > < /
        div >
        <
        /
        div > <
        p className = "bg-warning text-center rounded-4 mt-3 active text-dark p-2"
        onClick = { handleShow2 } > Edit Account Details < /p>  < /
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