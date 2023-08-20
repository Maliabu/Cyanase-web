import React from "react";
import { FaTrashAlt } from "react-icons/fa";
import Form from 'react-bootstrap/Form';

const ChangeDetails = () => {
    return ( <
        div className = "p-5 text-center" > <
        FaTrashAlt size = "70"
        className = 'my-3 text-danger rounded-circle border border-danger p-2' / >
        <
        h3 > Delete Account < /h3>  <
        Form >
        <
        h4 className = "bolder p-2" > Confirm < /h4> <
        h6 className = "pt-3" > By deleting this account, your data will be removed from our system permanently. < /h6> <
        h6 className = "bolder text-danger py-3" > I acknowledge that is wish to delete my account whatsoever < /h6> <
        h6 className = "p-3 bg-danger d-none active text-white rounded-3 text-center"
        type = "submit" > Delete < /h6> < /
        Form > < /
        div >
    )
}

export default ChangeDetails;