import React from "react";
import { ArrowLeftSquare, Call, Message } from "react-iconly";
import { FaWhatsapp, FaTwitter } from "react-icons/fa";

const ContactUs = (props) => {
    return ( <
        div >
        <
        ArrowLeftSquare size = "large"
        set = "broken"
        onClick = {
            () => { props.handletab8() }
        }
        className = "my-4 active" / > <
        h1 > Contact Us < /h1>   <
        h6 > For more information or inquiries, please reach us.We are available 24 / 7 < /h6>   <
        div className = "row mt-3" > <
        div className = "col-1 text-center" >
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
        h4 > Call Us < /h4> <
        h6 > < p className = "grey-text" > +256705640852 < /p>  < /
        h6 > < /
        div >
        <
        /
        div >
        <
        div className = "row" > <
        div className = "col-1 text-center" >
        <
        FaWhatsapp size = "30"
        className = 'my-5 active' / >
        <
        /
        div >
        <
        div className = "col-11 mt-5" >
        <
        h4 > Whatsapp Us < /h4> <
        h6 > < p className = "grey-text" > +256705640852 < /p>  < /
        h6 > < /
        div >
        <
        /
        div >
        <
        div className = "row " > <
        div className = "col-1 text-center" >
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
        h4 > Email Us < /h4> <
        h6 > < p className = "grey-text" > support @cyanase.com < /p>  < /
        h6 > < /
        div >
        <
        /
        div >
        <
        div className = "row" > <
        div className = "col-1 text-center" >
        <
        FaTwitter size = "30"
        className = 'my-5 active' / >
        <
        /
        div >
        <
        div className = "col-11 mt-5" >
        <
        h4 > DM Us on Social Media < /h4> <
        h6 > < p className = "grey-text" > Cyanase(facebook, Twitter, Linkedin) < /p>  < /
        h6 > < /
        div >
        <
        /
        div >
        <
        /
        div >
    )
}

export default ContactUs;