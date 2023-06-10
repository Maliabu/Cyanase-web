import React, { useState } from "react";
import Modal from 'react-bootstrap/Modal';
import ChangeDetails from './ChangeDetails';
import Profile from '../images/Ellipse 6.png';
import { ArrowLeftSquare, Call, Message, User } from "react-iconly";
import { API_URL_GET_AUTH_USER, TOKEN } from "../apis";
import axios from "axios";
import Photo from './photo'

const ADetails = (props) => {
    const [show2, setShow2] = useState(false);
    const handleClose2 = () => setShow2(false);
    const handleShow2 = () => setShow2(true);
    const [show1, setShow1] = useState(false);
    const handleClose1 = () => setShow1(false);
    const handleShow1 = () => setShow1(true);
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [email, setEmail] = useState("")
    axios.get(`${API_URL_GET_AUTH_USER}`, {
            headers: {
                "Authorization": `Token ${TOKEN}`
            }
        }).then((res) => {
            setFirstName(res.data.first_name)
            setLastName(res.data.last_name)
            setPhoneNumber(res.data.profile.phoneno)
            setEmail(res.data.email)
        })
        .catch((error) => {
            console.error(error)
        })
    return ( < div >
        <
        ArrowLeftSquare size = "large"
        set = "broken"
        onClick = {
            () => { props.changeAccountDetails(false) }
        }
        className = "active my-4" / > <
        h1 > Account Details < /h1>  <
        div className = "row px-3" > <
        div className = "col-6" >
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
        h5 > Name < /h5> <
        h6 > < div className = 'flexName d-flex grey-text' > < p > { firstName } < /p> &nbsp; <p>{ lastName }</p > < /div>  < /
        h6 > < /
        div >
        <
        /
        div >
        <
        div className = "row px-3 border-bottom" > <
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
        h5 > Phone < /h5> <
        h6 > < p className = "grey-text" > { phoneNumber } < /p>  < /
        h6 > < /
        div >
        <
        /
        div >
        <
        div className = "row px-3 border-bottom" > <
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
        h5 > Email < /h5> <
        h6 > < p className = "grey-text" > { email } < /p> < /
        h6 > < /
        div >
        <
        /
        div >
        <
        p className = "bolder grey-text mt-3" > Account Details: < span className = "text-dark" > Your account details are not changeable, contact support
        for more information < /span></p >
        <
        p className = "bolder mt-3" > Support: < span className = "active" > < u > support @cyanase.com < /u> < /span > < /p >  <
        p className = "bolder grey-text mt-3" > All Rights Reserved < /p> < /
        div >
        <
        div className = "col-6 px-5 text-center" > <
        img src = { Profile }
        width = '40%'
        height = '40%'
        className = "mt-4"
        alt = "investors" / >
        <
        p className = "bolder grey-text mt-5" > Account Type: < span className = "text-dark" > Personal < /span></p >
        <
        h6 className = "warning text-center rounded-3 mt-3 mx-5 p-3"
        onClick = { handleShow1 } > Change Photo < /h6> <
        h6 className = "bg-danger text-white text-center rounded-3 mt-3 mx-5 active p-3"
        onClick = { handleShow2 } > Delete Account < /h6> < /
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
        Photo / >
        <
        /
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