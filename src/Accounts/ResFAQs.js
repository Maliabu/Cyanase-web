import React, { useState } from "react";
import Modal from 'react-bootstrap/Modal';
import Ask from './Ask';
import { ChevronLeft } from "react-iconly";

const ResFAQs = (props) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return ( 
        <div > 
        <div className = "px-4 mb-5 pb-5 res-home" >
        <h4 className = "bolder" >
        <ChevronLeft size = { 20 }
        onClick = {
            () => { props.changeFaqsSetting(false) }
        }
        className = "my-3" /> FAQs </h4>   
        <p> Get answers to a list of typical questions that you might wish to ask Cyanase </p>   
        <div className = "row mt-3" >
        <div className = "mt-5 border-bottom " >
        <h6 > What is Cyanase </h6> 
        <p> <p className = "grey-text" > Cyanase is a technology company that partners with licensed financial firms including banks, investment companies and money lenders to offer investment services, business loans and saving groups to world’ s internet users.
        The company was initially started to help students invest such that they have a start point after school. </p> </p> 
        </div>
        </div>
        <div className = "row" >
        <div className = "mt-3 border-bottom" >
        <h6> How do i make a Deposit </h6> 
        <p> <p className = "grey-text" > You can make a general deposit straight from your wallet or from your credit account without any goals.Alternatively you can start by creating a Goal, populating a risk profile and sequentially
        continue to deposit recurring amounts to achieve this goal </p>  
        </p> </div>
        </div>
        <div className = "row" >
        <div className = "mt-3 border-bottom " >
        <h6 > Who is the Risk Profile
        for ? </h6> 
        <p > <p className = "grey-text" > The risk profiler is located under the investments settings and is intended
        for professional investors, to grade and check how much they can accommodate an investment risk. </p>  
        </p> </div>
        </div>
        <div className = "row" >
        <div className = " mt-3 border-bottom" >
        <h6 > How do i withdraw my money ? </h6> 
        <p > <p className = "grey-text" > Under the Withdrawals tab on your left activity menu, click the withdraw button.Withdraws are only successful after 3 days from the deposit month </p> </p> 
        </div>
        </div>
        <p onClick = {
            () => { handleShow(true) }
        }
        className = "rounded-3 d-none warning p-2 text-center mt-3 mb-5" > Ask a Question </p>  
        <Modal show = { show }
        onHide = { handleClose } >
        <Ask /> </Modal> 
        </div> 
        </div>
    )
}

export default ResFAQs;