import { useEffect } from "react";
import { UserRequests, GetNextOfKin, ProfilePhoto } from "../Api/MainRequests";
import React, { useState } from "react";
import Modal from 'react-bootstrap/Modal';
import ChangeDetails from './ChangeDetails';
import Profile from '../images/Ellipse 6.png'
import { ArrowLeftSquare, Call, Message, User } from "react-iconly";
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
    const [firstNok, setFirstNok] = useState("")
    const [lastNok, setLastNok] = useState("")
    const [phoneNok, setPhoneNok] = useState("")
    const [emailNok, setEmailNok] = useState("")
    const [profile, setProfile] = useState({ Profile })
    useEffect(() => {
        UserRequests().then(res => {
            console.log(res)
            setFirstName(res.first_name)
            setLastName(res.last_name)
            setPhoneNumber(res.profile.phoneno)
            setEmail(res.email)
        });
        GetNextOfKin().then(res => {
            console.log(res)
            setFirstNok(res.kin_first_name)
            setLastNok(res.kin_last_name)
            setPhoneNok(res.kin_phone)
            setEmailNok(res.kin_email)
        });
        ProfilePhoto().then(res => {
            console.log(res)
            setProfile(res)
        })
    }, []);
    console.log(Profile)
    return ( < div >
        <
        ArrowLeftSquare size = "large"
        set = "broken"
        onClick = {
            () => { props.changeAccountDetails(false) }
        }
        className = "active mt-4" / > <
        h1 > Account Details < /h1>  <
        div className = "row px-3 scroll-y" > <
        div className = "col-6" >
        <
        div className = "row p-2 px-3" > <
        div className = "col-1 px-3" >
        <
        User size = "large"
        set = "broken"
        className = 'my-3 active' / >
        <
        /
        div >
        <
        div className = "col-11 mt-3" >
        <
        h5 > Name < /h5> <
        h6 > < div className = 'flexName d-flex bolder' > < p > { firstName } < /p> &nbsp; <p>{ lastName }</p > < /div>  < /
        h6 > < /
        div >
        <
        /
        div >
        <
        div className = "row px-3" > <
        div className = "col-1" >
        <
        Call size = "large"
        set = "broken"
        className = 'my-3 active' / >
        <
        /
        div >
        <
        div className = "col-11 mt-3" >
        <
        h5 > Phone < /h5> <
        h6 > < p className = "bolder" > { phoneNumber } < /p>  < /
        h6 > < /
        div >
        <
        /
        div >
        <
        div className = "row px-3" > <
        div className = "col-1" >
        <
        Message size = "large"
        set = "broken"
        className = 'my-3 active' / >
        <
        /
        div >
        <
        div className = "col-11 mt-3" >
        <
        h5 > Email < /h5> <
        h6 > < p className = "bolder" > { email } < /p> < /
        h6 > < /
        div >
        <
        /
        div >
        <
        div className = "p-3 mt-3 px-5 rounded-3 warning" >
        <
        h5 className = "bolder text-dark py-3" > Next Of Kin Details < /h5>  <
        h6 > FirstName: < span className = "bolder text-dark" > { firstNok } < /span>  < /
        h6 > <
        h6 > LastName: < span className = "bolder text-dark" > { lastNok } < /span>  < /
        h6 > <
        h6 > Email: < span className = "bolder text-dark" > { emailNok } < /span>  < /
        h6 > <
        h6 > Phone: < span className = "bolder text-dark" > { phoneNok } < /span> < /
        h6 > < /
        div > <
        p className = "bolder bolder mt-3" > Account Details: < span className = "text-danger" > Your account details are not changeable, contact support
        for more information < /span></p > < /
        div >
        <
        div className = "col-6 px-5 text-center" > <
        img src = { profile }
        width = '40%'
        height = '30%'
        className = "mt-4"
        alt = "investors" / >
        <
        p className = "bolder bolder mt-5" > Account Type: < span className = "text-dark" > Personal < /span></p >
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