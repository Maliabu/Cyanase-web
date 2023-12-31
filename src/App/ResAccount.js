import React, { useState, useEffect } from "react";
import Modal from 'react-bootstrap/Modal';
import { UserRequests, SubscriptionRequests,GetNextOfKin } from "../Api/MainRequests";
import Photo from '../Accounts/photo'
import ChangeDetails from '../Accounts/ChangeDetails'
import { ArrowLeftSquare, Call, Camera, Message, User } from "react-iconly";
import Subscribe from '../Accounts/Subscribe'
import NKin from '../Accounts/NKin'

const ResAccount = (props) => {
    const [firstName, setFirstName] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [email, setEmail] = useState("")
    const [country, setCountry] = useState("")
    const [profilePicture, setProfilePicture] = useState("")
    const [show2, setShow2] = useState(false);
    const [firstNok, setFirstNok] = useState("")
    const [phoneNok, setPhoneNok] = useState("")
    const [emailNok, setEmailNok] = useState("")
    const [show, setShow] = useState(false);
    const handleClose2 = () => setShow2(false);
    const handleShow2 = () => setShow2(true);
    const [show1, setShow1] = useState(false);
    const handleClose1 = () => setShow1(false);
    const handleShow1 = () => setShow1(true);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [show4, setShow4] = useState(false);
    const handleClose4 = () => setShow4(false);
    const [subStatus, setSubStatus] = useState()
    const handleShow4 = () => {
        setShow4(true)
    };
    useEffect(() => {
        UserRequests().then(res => {
            setFirstName(res.first_name + " " + res.last_name)
            setPhoneNumber(res.profile.phoneno)
            setEmail(res.email)
            setCountry(res.profile.country)
            setProfilePicture(res.profile.profile_picture)
        });
        SubscriptionRequests().then(res => {
            setSubStatus(res.status)
        })
        GetNextOfKin().then(res => {
            setFirstNok(res.kin_first_name + " " + res.kin_last_name)
            setPhoneNok(res.kin_phone)
            setEmailNok(res.kin_email)
        });
    }, []);
    return ( < div >
        <
        div className = "px-3 res-home pb-5 mb-5" > <
        h4 className = "mt-2 bolder" ><
        ArrowLeftSquare size = { 30 }
        onClick = {
            () => { props.changeAccountSetting(false) }
        }
        className = " m-3 " / > Account Details < /h4>  

        <
        div className = " px-5 text-center" > <
        // img src = "http://127.0.0.1:8000/static/photo.png"
        img src = {profilePicture}
        className = "rounded-circle object-fit-cover mt-2 img-back"
        alt = "investors" / > <
        p className = " text-center rounded-3 mt-3 p-2"
        onClick = { handleShow1 } > < Camera set = 'broken' size="xlarge"
        className = "active p-1" / > < /p>< /
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
        div className = 'row p-2 rounded-3 investment' > <div className="col-8">< h5 className = 'bolder p-2' > Account Subscription: < /
        h5 ></div><div className="col-3 py-1">< span className = 'bk-warning p-2 rounded-3'
        onClick = { handleShow4 } > { subStatus } < /span> </div> < /div > 
        <
        h4 className = "bolder text-dark mt-4" > Next Of Kin Details < /h4>
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
        div > < p className = "bolder" > { firstNok } < /p>  < /
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
        div > < p className = "bolder" > { phoneNok } < /p>  < /
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
        h6 > Email < div > < p className = "bolder" > { emailNok } < /p > < /div > < /
        h6 > < /
        div >
        <
        /
        div >
        <
        p className = "bk-warning text-center rounded-3 mt-3"
        onClick = { handleShow } > Change Next of Kin < /p>
        <
        p className = "bg-danger d-none text-white text-center rounded-3 mt-3 mx-5 p-3"
        onClick = { handleShow2 } > Delete Account < /p> < /
        div >
        <
        Modal show = { show4 }
        onHide = { handleClose4 } > <
        Subscribe substatus = { subStatus }
        country = { country }
        lastname = { firstName }
        email = { email }
        phone = { phoneNumber }
        / > < /
        Modal > <
        Modal show = { show }
        onHide = { handleClose } >
        <
        NKin / > < /
        Modal ><
        /
        div >
        <
        /
        div > < /div>
    )
}

export default ResAccount;