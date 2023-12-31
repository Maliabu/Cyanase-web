import React from "react";
import { User } from 'react-iconly';
import Button from "react-bootstrap/esm/Button";
import Subscription from "../payment/Subscription";
import { getCurrency } from "../payment/GetCurrency";
import { useState } from "react";
import { autoClickable } from "../Api/RequestFunctions";
import Conversion from '../payment/conversion'

function Subscribe(props) {
    const [step, setStep] = useState(1)
    const [formData, setFormData] = useState({
        "reference_id": 0,
        "reference": "",
        "tx_ref": "CYANASE-TEST-001",
        "amount": 20500

    });
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setFormData({...formData, [name]: value });
    };

    function onSubmit() {}
    const _next = () => {
        setStep(step + 1)
    }

    const _prev = () => {
        setStep(step - 1)
    }
    const previousButton = () => {
        if (step !== 1) {
            return ( <
                h6 className = "py-3 my-2 text-center warning rounded-3"
                type = "button"
                onClick = { _prev } >
                Previous <
                /h6>
            )
        }
        return null;
    }

    const submitButton = () => {
        if (step === 2) {
            return ( <
                div className = 'justify-content-center mx-3' > <
                h6 id = "errorMessage"
                className = 'py-2 mt-3 rounded border border-danger text-center'
                style = {
                    { display: 'none' }
                } > hey < /h6> <
                h6 id = "infoMessage"
                className = 'py-2 mt-3 rounded warning-message text-center'
                style = {
                    { display: 'none' }
                } > hey < /h6>   <
                Button variant = "warning"
                className = 'shadow text-center mb-3'
                onClick={()=> autoClickable()}
                id = 'successMessage'
                type = "button" >
                Submit <
                /Button> < /
                div >
            )
        }
        return null
    }

    const nextButton = () => {
        if (step === 1) {
            let subscriptionStatus = props.substatus
            if (subscriptionStatus === "subscribed") {
                return null
            }
            return ( <
                h6 className = "py-3 my-2 text-center warning rounded-3"
                type = "button"
                onClick = { _next } >
                Subscribe <
                /h6>        
            )
        }
        return null;
    }
    return ( <
        React.Fragment >
        <
        form className = "text-center" > {
            /* 
                      render the form steps and pass required props in
                    */
        } <div className="blue-darks p-3 rounded-top-3"><h3 className="bolder mt-2">Your Subscription</h3></div><
        User className = "rounded-circle d-none warning p-2"
        size = "xlarge" / > < br / > < h5 className = "bolder d-none" > Your Subscription < /h5> <
        Step1 currentStep = { step }
        handleChange = { handleChange }
        subStatus = { props.substatus }
        /> <
        Step2 currentStep = { step }
        handleChange = { handleChange }
        phone = { props.phone }
        email = { props.email }
        country = { props.country }
        name = { props.lastname }
        amount = { formData.amount }
        getCurr = { getCurrency(props.country) }
        submit = { onSubmit }
        data = { formData }
        /> { nextButton() } { previousButton() }{submitButton()}< /
        form > < /
        React.Fragment >
    );

}

function Step1(props) {
    if (props.currentStep !== 1) {
        return null
    }
    return ( <
        div className = " text-start" > <
        h6 className = "p-5 text-center" > This is a yearly fee of $5.Your account subscription becomes overdue after 30 days from account creation afterwhich you are required to pay your subscription. < /h6>  <
        h6 className = 'status text-center p-3 mb-5' > Account Status: < span className = 'bolder p-2 px-3 mx-2 rounded-3' > { props.subStatus } < /span>  < /
        h6 >
        <
        /
        div >
    );
}

function Step2(props) {
    if (props.currentStep !== 2) {
        return null
    }
    let converted_amount = Conversion("usd",5,(props.getCurr).toLowerCase())
    return ( <
        div className = "text-center" >
        <
        h5 className = "py-5 special" > Proceed to pay {props.getCurr} {converted_amount} 
        for subscription < /
        h5 >
        <
        Subscription phone = { props.phone }
        name = { props.name }
        country = { props.country }
        email = { props.email }
        amount = { converted_amount }
        currency = { props.getCurr }
        submit = { props.submit }
        data = { props.data }
        / > < /
        div >
    )
}

export default Subscribe;