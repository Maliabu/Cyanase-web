import React, { useState } from "react";
import '../App.css';
import { FaUserClock, FaUserGraduate, FaUsers, FaUserSecret } from 'react-icons/fa';
import Logo from '../images/CI.png'
import Home from '../App/Home'

const Learn = (props) => {
    console.log(props);
    const Learn4 = () => {
        return ( <
            div className = "mt-5 p-5 text-center" > <
            FaUserGraduate className = "text-warning rounded-circle border border-warning p-2"
            size = "100" / >
            <
            h4 className = "bolder mt-5" > Students < /h4>  <
            h6 > Our platform is simplified to support students investments < /h6> <
            h6 className = "px-5 py-3 mt-5 mx-2 bg-warning rounded-25"
            onClick = {
                () => {
                    props.close(true)
                }
            } >
            Get Started < /h6> <
            h6 className = "px-5 py-3 mx-2 border border-warning text-warning rounded-25"
            onClick = {
                () => { setStep(step - 1) }
            } >
            Previous < /h6> < /
            div >
        )
    }
    const Learn3 = () => {
        return ( <
            div className = "mt-5 p-5 text-center" > <
            FaUsers className = "text-warning rounded-circle border border-warning p-2"
            size = "100" / >
            <
            h4 className = "bolder mt-5" > SACCO & Investment Clubs < /h4> <
            p className = "my-3" > Investment Products < /p > <
            h6 > Grow together with your friends and family. < /h6> <
            h6 className = "px-5 py-3 mt-5 mx-2 border border-warning text-warning rounded-25"
            onClick = {
                () => { setStep(step + 1) }
            } >
            Next < /h6> <
            h6 className = "px-5 py-3 mx-2 border border-warning text-warning rounded-25"
            onClick = {
                () => { setStep(step - 1) }
            } >
            Previous < /h6> < /
            div >
        )
    }
    const Learn2 = () => {
        return ( <
            div className = "mt-5 p-5 text-center" > <
            FaUserClock className = "text-warning rounded-circle border border-warning p-2"
            size = "100" / >
            <
            h4 className = "bolder mt-5" > Goal Investing < /h4> <
            p className = "my-3" > Investment Products < /p > <
            h6 > We help you make investments to help you reach your financial goals < /h6> <
            h6 className = "px-5 py-3 mt-5 mx-2 border border-warning text-warning rounded-25"
            onClick = {
                () => { setStep(step + 1) }
            } >
            Next < /h6> <
            h6 className = "px-5 py-3 mx-2 border border-warning text-warning rounded-25"
            onClick = {
                () => { setStep(step - 1) }
            } >
            Previous < /h6> < /
            div >
        )
    }
    const Learn1 = () => {
        return ( <
            div className = "mt-5 p-5 text-center" > <
            FaUserSecret className = "text-warning rounded-circle border border-warning p-2"
            size = "100" / >
            <
            h4 className = "bolder mt-5" > Our API < /h4> <
            p className = "my-3" > Investment Products < /p > <
            h6 > We provide a wide range of Investment products and API to integrate them into your systems < /h6> <
            h6 className = "px-5 py-3 mt-5 mx-2 border border-warning text-warning rounded-25"
            onClick = {
                () => { setStep(step + 1) }
            } >
            Next < /h6> <
            h6 className = "px-5 py-3 mx-2 border border-warning text-warning rounded-25"
            onClick = {
                () => { setStep(step - 1) }
            } >
            Previous < /h6> < /
            div >
        )
    }
    const [step, setStep] = useState(0);
    if (step === 1) {
        return ( < Learn1 / > )
    } else if (step === 2) {
        return ( < Learn2 / > );
    } else if (step === 3) {
        return ( < Learn3 / > );
    } else if (step === 4) {
        return ( < Learn4 / > );
    } else if (step === 5) {
        return ( < Home / > );
    }
    return ( <
        div className = "mt-5 p-5 text-center" > <
        img src = { Logo }
        className = "pt-2 text-center"
        width = '100'
        height = '100'
        alt = "investors" / >
        <
        h4 className = "bolder mt-5" > Welcome to Cyanase Investors < /h4> <
        p className = "my-3" > Hello < span className = "active bolder" > Patricia < /span></p >
        <
        h6 > Learn more about our products and services. < /h6> <
        h6 className = "px-5 py-3 my-5 mx-2 border border-warning text-warning rounded-25"
        onClick = {
            () => { setStep(step + 1) }
        } >
        Proceed < /h6></div >
    );
}

export default Learn;