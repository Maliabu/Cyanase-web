import React, { useState } from "react";
import Modal from 'react-bootstrap/Modal';
import Ask from './Ask';
import { ArrowLeftSquare } from "react-iconly";

const FAQs = (props) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return ( <
        div className = "scroll-y mx-3" >
        <
        ArrowLeftSquare size = "medium"
        set = "broken"
        onClick = {
            () => { props.handletab8() }
        }
        className = "my-4 active" / > <
        h3 > FAQs < /h3>   <
        h6 > Get answers to a list of typical questions that you might wish to ask Cyanase < /h6>   <
        div className = "row mt-3" >
        <
        div className = "mt-5 border-bottom col-8" >
        <
        h4 className = "bolder" > What is Cyanase < /h4> <
        h6 > < p className = "grey-text" > Cyanase is a technology company that partners with licensed financial firms including banks, investment companies and money lenders to offer investment services, business loans and saving groups to world’ s internet users.

        The company was initially started to help students invest such that they have a start point after school. < /p>  < /
        h6 > < /
        div >
        <
        /
        div >
        <
        div className = "row" >
        <
        div className = "mt-5 border-bottom col-8" >
        <
        h4 className = "bolder" > How do i make a Deposit < /h4> <
        h6 > < p className = "grey-text" > You can make a general deposit straight from your wallet or from your credit account without any goals.Alternatively you can start by creating a Goal, populating a risk profile and sequentially
        continue to deposit recurring amounts to achieve this goal < /p>  < /
        h6 > < /
        div >
        <
        /
        div >
        <
        div className = "row" >
        <
        div className = "mt-5 border-bottom col-8" >
        <
        h4 className = "bolder" > Who is the Risk Profile
        for ? < /h4> <
        h6 > < p className = "grey-text" > The risk profiler is located under the investments settings and is intended
        for professional investors, to grade and check how much they can accommodate an investment risk. < /p>  < /
        h6 > < /
        div >
        <
        /
        div >
        <
        div className = "row" >
        <
        div className = "col-8 mt-5 border-bottom" >
        <
        h4 className = "bolder" > How do i withdraw my money ? < /h4> <
        h6 > < p className = "grey-text" > Under the Withdrawals tab on your left activity menu, click the withdraw button.Withdraws are only successful after 3 days from the deposit month < /p>  < /
        h6 > < /
        div >
        <
        /
        div >
        <
        h6 onClick = {
            () => { handleShow(true) }
        }
        className = "rounded-3 warning p-3 w-25 text-center mt-5" > Ask a Question < /h6>  <
        Modal show = { show }
        dialogClassName = "my-modal1"
        onHide = { handleClose } >
        <
        Ask / > < /
        Modal > <
        /
        div >
    )
}

export default FAQs;