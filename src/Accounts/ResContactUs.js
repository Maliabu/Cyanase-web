import React from "react";
import { FaWhatsapp, FaTwitter } from "react-icons/fa";
import Pic from './Pic'
import { ArrowLeftSquare, Call, Message } from "react-iconly";

const ResContactUs = (props) => {
    return ( <
        div > < Pic / > <
        div className = "pt-5" >
        <
        p className = "mt-5 p-3 bg-light bolder" > Settings < /p></div >
        <
        div className = "px-5 res-home" >
        <
        ArrowLeftSquare size = { 30 }
        onClick = {
            () => { props.changeContactSetting(false) }
        }
        className = "my-4" / > <
        span className = "bolder" > Contact Us < /span>   <
        p className = "bolder" > For more information or inquiries, please reach us.We are available 24 / 7 < /p>   <
        div className = "row mt-3" > <
        div className = "col-2 text-center" >
        <
        Call size = "25"
        className = 'my-3' / >
        <
        /
        div >
        <
        div className = "col-10 mt-3" >
        <
        h6 > Call Us <
        div > < p className = "grey-text" > +256705640852 < /p>  < /
        div > < /h6>  < /
        div >
        <
        /
        div >
        <
        div className = "row" > <
        div className = "col-2 text-center" >
        <
        FaWhatsapp size = "25"
        className = 'my-3' / >
        <
        /
        div >
        <
        div className = "col-10 mt-3" >
        <
        h6 > Whatsapp Us <
        div > < p className = "grey-text" > +256705640852 < /p>  < /
        div > < /h6> < /
        div >
        <
        /
        div >
        <
        div className = "row " > <
        div className = "col-2 text-center" >
        <
        Message size = "25"
        className = 'my-3' / >
        <
        /
        div >
        <
        div className = "col-10 mt-3" >
        <
        h6 > Email Us <
        div > < p className = "grey-text" > support @cyanase.com < /p>  < /
        div > < /h6>  < /
        div >
        <
        /
        div >
        <
        div className = "row" > <
        div className = "col-2 text-center" >
        <
        FaTwitter size = "25"
        className = 'my-3' / >
        <
        /
        div >
        <
        div className = "col-10 mt-3" >
        <
        h6 > DM Us on Social Media <
        div > < p className = "grey-text" > Cyanase(facebook, Twitter, Linkedin) < /p>  < /
        div > < /h6> < /
        div >
        <
        /
        div > < /div> < /
        div >
    )
}

export default ResContactUs;