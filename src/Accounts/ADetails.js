import { useEffect } from "react";
import { UserRequests, GetNextOfKin } from "../Api/MainRequests";
import React, { useState } from "react";
import Modal from 'react-bootstrap/Modal';
import ChangeDetails from './ChangeDetails';
import { Call, ChevronLeft, Message, User } from "react-iconly";
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
    const [profilePicture, setProfilePicture] = useState("")
    const [firstNok, setFirstNok] = useState("")
    const [lastNok, setLastNok] = useState("")
    const [phoneNok, setPhoneNok] = useState("")
    const [emailNok, setEmailNok] = useState("")
    useEffect(() => {
        UserRequests().then(res => {
            setFirstName(res.first_name)
            setLastName(res.last_name)
            setPhoneNumber(res.profile.phoneno)
            setEmail(res.email)
            setProfilePicture(res.profile.profile_picture)
        });
        GetNextOfKin().then(res => {
            setFirstNok(res.kin_first_name)
            setLastNok(res.kin_last_name)
            setPhoneNok(res.kin_phone)
            setEmailNok(res.kin_email)
        });
    }, []);
    return ( 
        <div className="mx-3">
        <ChevronLeft size = {20}
        set = "broken"
        onClick = {
            () => { props.changeAccountDetails(false) }
        }
        className = "active my-3" /> 
        <h3> Account Details </h3>  
        <div className = "row px-3" > 
        <div className = "col-6" >
        <div className = "row px-3" > <div className = "col-1" >
        <User size = "medium"
        set = "bold"
        className = 'my-3 grey-text' />
        </div>
        <div className = "col-11 mt-3" >
        <h5> Name
        <h6 className="bolder">
        <div className = 'flexName d-flex' > <h6> { firstName } </h6> &nbsp; <h6>{ lastName }</h6> </div>  </h6> </h5> </div>
        </div>
        <div className = "row px-3" > 
        <div className = "col-1" >
        <Call size = "medium"
        set = "bold"
        className = 'my-3 grey-text' />
        </div>
        <div className = "col-11 mt-3" >
        <h5> Phone <h6 className = "bolder" > { phoneNumber }  </h6> </h5>  </div>
        </div>
        <div className = "row px-3" > 
        <div className = "col-1" >
        <Message size = "medium"
        set = "bold"
        className = 'my-3 grey-text' />
        </div>
        <div className = "col-11 mt-3" >
        <h5> Email <h6 className = "bolder" > { email } </h6></h5>  </div>
        </div>
        <div className = " mt-3 bg-white rounded-4 p-2" >
        <h4 className = "rounded-3 text-dark m-3 bolder" > Next Of Kin Details </h4>
        <div className = "row px-3" > <div className = "col-1" >
        <User size = "medium"
        set = "bold"
        className = 'my-3 grey-text' />
        </div>
        <div className = "col-11 mt-3" >
        <h5> Name
        <h6>
        <div className = 'flexName d-flex bolder' > <h6> { firstNok } </h6> &nbsp; <h6>{ lastNok }</h6> </div>  </h6> </h5> </div>
        </div>
        <div className = "row px-3" > 
        <div className = "col-1" >
        <Call size = "medium"
        set = "bold"
        className = 'my-3 grey-text' />
        </div>
        <div className = "col-11 mt-3" >
        <h5> Phone <h6 className = "bolder" > { phoneNok }  </h6> </h5>  </div>
        </div>
        <div className = "row px-3" > 
        <div className = "col-1" >
        <Message size = "medium"
        set = "bold"
        className = 'my-3 grey-text' />
        </div>
        <div className = "col-11 mt-3" >
        <h5> Email <h6 className = "bolder" > { emailNok } </h6></h5>  </div>
        </div></div>  </div>
        <div className = "col-6 px-5 pt-3 cards rounded-4 text-center" > 
        <img src = {profilePicture}
        className = " rounded-circle object-fit-cover img-back"
        alt = "investors" />
        <p className = "bolder bolder mt-5" > Account Type: <span className = "active" > Personal </span></p>
        <h6 className = "btn btn-warning text-center mt-3"
        onClick = { handleShow1 } > Change Photo </h6> 
        <h6 className = "bg-danger text-white d-none text-center rounded-3 mt-3 mx-5 active p-3"
        onClick = { handleShow2 } > Delete Account </h6>
        <p className = "bolder bolder mt-3" > Account Details: <span className = "text-danger"> Your account details are not changeable, contact support
        for more information </span></p> 
        </div>
        <Modal show = { show2 }
        dialogClassName = "my-modal1"
        onHide = { handleClose2 } >
        <ChangeDetails /> 
        </Modal>
        <Modal show = { show1 }
        dialogClassName = "my-modal1"
        className = "p-5 text-center"
        onHide = { handleClose1 } >
        <Photo />
        </Modal>
        </div>
        </div>
    )
}

export default ADetails;