import React, { useState } from "react";
import '../App.css';
import { FaUserClock, FaUserGraduate, FaUsers, FaUserSecret } from 'react-icons/fa';
import Logo from '../images/CI.png'
import Home from '../App/Home'
import { Activity } from "react-iconly";

const Learn = (props) => {
    const Learn4 = () => {
        return ( <
            div className = "mt-3 p-5 text-center" > <
            FaUserGraduate className = "rounded-circle warning-learn-about p-2"
            size = "100" / >
            <
            h4 className = "bolder mt-3" > Students < /h4>  <
            h6 > Our platform is simplified to support students investments < /h6> <
            h6 className = "bk-warning rounded-3 my-2"
            onClick = {
                () => {
                    props.tab2()
                }
            } >
            Get Started < /h6> <
            h6 className = "warning rounded-3"
            onClick = {
                () => { setStep(step - 1) }
            } >
            Previous < /h6> < /
            div >
        )
    }
    const Learn3 = () => {
        return ( <
            div className = "mt-3 p-5 text-center" > <
            FaUsers className = "rounded-circle warning-learn-about p-2"
            size = "100" / >
            <
            h4 className = "bolder mt-3" > SACCO & Investment Clubs < /h4> <
            p className = "my-3" > Investment Products < /p > <
            h6 > Grow together with your friends and family. < /h6> <
            h6 className = "warning rounded-3 my-2"
            onClick = {
                () => { setStep(step + 1) }
            } >
            Next < /h6> <
            h6 className = "warning rounded-3"
            onClick = {
                () => { setStep(step - 1) }
            } >
            Previous < /h6> < /
            div >
        )
    }
    const Learn2 = () => {
        return ( <
            div className = "mt-3 p-5 text-center" > <
            FaUserClock className = "rounded-circle warning-learn-about p-2"
            size = "100" / >
            <
            h4 className = "bolder mt-3" > Goal Investing < /h4> <
            p className = "my-3" > Investment Products < /p > <
            h6 > We help you make investments to help you reach your financial goals < /h6> <
            h6 className = "warning rounded-3 my-2"
            onClick = {
                () => { setStep(step + 1) }
            } >
            Next < /h6> <
            h6 className = "warning rounded-3"
            onClick = {
                () => { setStep(step - 1) }
            } >
            Previous < /h6> < /
            div >
        )
    }
    const Learn1 = () => {
        return ( <
            div className = "mt-3 p-5 text-center" > <
            FaUserSecret className = "rounded-circle warning-learn-about p-2"
            size = "100" / >
            <
            h4 className = "bolder mt-3" > Our API < /h4> <
            p className = "my-3" > Investment Products < /p > <
            h6 > We provide a wide range of Investment products and API to integrate them into your systems < /h6> <
            h6 className = "warning rounded-3 my-2"
            onClick = {
                () => { setStep(step + 1) }
            } >
            Next < /h6> <
            h6 className = "warning rounded-3"
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
        div className = "mt-3 text-center" > <
        img src = { Logo }
        className = " text-center my-5"
        width = '50'
        height = '50'
        alt = "investors" / > <
        p className = " py-3 d-none" > Hello < span className = " bolder" > {props.name} < /span></p >
        <div className="blue-darks p-5 rounded-bottom">
        <
        h4 className = " mt-3" > Welcome to <br/> Cyanase Investors < /h4>
        <
        h6 > Learn more about our products and services. < /h6> <
        h6 className = "mt-5 light-res-home p-3 rounded-3"
        onClick = {
            () => { setStep(step + 1) }
        } > <Activity className="mx-2"/>
        Here's what we offer < /h6></div></div >
    );
}

export default Learn;