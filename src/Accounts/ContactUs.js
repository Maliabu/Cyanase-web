import React from "react";
import { ArrowLeftSquare, Call, Message } from "react-iconly";
import { FaWhatsapp, FaTwitter } from "react-icons/fa";

const ContactUs = (props) => {
    return ( <
        div className="mx-3">
        <
        ArrowLeftSquare size = "medium"
        set = "broken"
        onClick = {
            () => { props.handletab8() }
        }
        className = "my-4 active" / > <
        h3 > Contact Us < /h3>   <
        h6 > For more information or inquiries, please reach us.We are available 24 / 7 < /h6>   <
        div className = "row" > <
        div className = "col-1 text-center" >
        <
        Call size = "medium"
        set = "broken"
        className = 'my-3' / >
        <
        /
        div >
        <
        div className = "col-11 mt-3" ><
        h6 >Call Us<
        p className='bolder' > +256705640852 < /p></h6>
        < /
        div >
        <
        /
        div >
        <
        div className = "row" > <
        div className = "col-1 text-center" >
        <
        FaWhatsapp size = "25"
        className = 'my-3' / >
        <
        /
        div >
        <
        div className = "col-11 mt-3" ><
        h6 >Whatsapp Us<
        p className='bolder' > +256705640852 < /p></h6>
         < /
        div >
        <
        /
        div >
        <
        div className = "row " > <
        div className = "col-1 text-center" >
        <
        Message size = "medium"
        set = "broken"
        className = 'my-3' / >
        <
        /
        div >
        <
        div className = "col-11 mt-3" ><
        h6 >Email Us<
        p className='bolder' > 'support@cyanase.com' < /p></h6>
         < /
        div >
        <
        /
        div >
        <
        div className = "row" > <
        div className = "col-1 text-center" >
        <
        FaTwitter size = "23"
        className = 'my-3' / >
        <
        /
        div >
        <
        div className = "col-11 mt-3" ><
        h6 >DM us on social media<
        p className='bolder' > Cyanase(facebook, Twitter, Linkedin) < /p></h6> < /
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