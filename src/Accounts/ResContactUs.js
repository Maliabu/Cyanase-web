import React from "react";
import { FaArrowCircleLeft, FaPhoneAlt, FaWhatsapp, FaEnvelope, FaTwitter } from "react-icons/fa";
import Pic from './Pic'

const ResContactUs = (props) => {
    return ( <
        div > < Pic / > <
        div className = "pt-5" >
        <
        p className = "mt-5 p-3 bg-light text-center" > General Account Settings < /p></div >
        <
        div className = "px-5 res-home" >
        <
        FaArrowCircleLeft size = { 30 }
        onClick = {
            () => { props.changeContactSetting(false) }
        }
        className = "text-warning my-4 active" / > <
        h6 className = "bolder" > Contact Us < /h6>   <
        p > For more information or inquiries, please reach us.We are available 24 / 7 < /p>   <
        div className = "row mt-3" > <
        div className = "col-2 text-center" >
        <
        FaPhoneAlt size = "25"
        className = 'my-3 active' / >
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
        className = 'my-3 active' / >
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
        FaEnvelope size = "25"
        className = 'my-3 active' / >
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
        className = 'my-3 active' / >
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