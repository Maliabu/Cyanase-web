import React, { useState, useEffect } from "react";
import Modal from 'react-bootstrap/Modal';
import { UserRequests } from "../Api/MainRequests";
import Photo from '../Accounts/photo'
import ChangeDetails from '../Accounts/ChangeDetails'
import { ArrowLeftSquare, Call, Camera, Message, User } from "react-iconly";

const ResAccount = (props) => {
    const [firstName, setFirstName] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [email, setEmail] = useState("")
    const [show2, setShow2] = useState(false);
    const handleClose2 = () => setShow2(false);
    const handleShow2 = () => setShow2(true);
    const [show1, setShow1] = useState(false);
    const handleClose1 = () => setShow1(false);
    const handleShow1 = () => setShow1(true);
    useEffect(() => {
        UserRequests().then(res => {
            console.log(res)
            setFirstName(res.first_name + " " + res.last_name)
            setPhoneNumber(res.profile.phoneno)
            setEmail(res.email)
        });
    }, []);
    return ( < div >
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
        img src = "http://127.0.0.1:8000/static/photo.png"
        className = "rounded-circle object-fit-cover mt-2 img-back"
        alt = "investors" / > <
        p className = " text-center rounded-3 mt-3 p-2"
        onClick = { handleShow1 } > < Camera set = 'broken'
        className = "warning icon-padding rounded-circle" / > < /p>< /
        div >
        <
        Modal show = { show2 }
        className = "p-3"
        onHide = { handleClose2 } >
        <
        ChangeDetails / > < /
        Modal >
        <
        Modal show = { show1 }
        className = "p-3 text-center"
        onHide = { handleClose1 } >
        <
        Photo / > < /
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
        div > < p className = "bolder" > { firstName } < /p>  < /
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
        div > < p className = "bolder" > { phoneNumber } < /p>  < /
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
        h6 > Email < div > < p className = "bolder" > { email } < /p > < /div > < /
        h6 > < /
        div >
        <
        /
        div > <
        p className = "bg-danger text-white text-center rounded-3 mt-3 p-2"
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