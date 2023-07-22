import React from "react";
import { User } from 'react-iconly';
import Form from 'react-bootstrap/Form';
import { API_URL_DEPOSIT, TOKEN } from '../apis';
import axios from 'axios';
import Button from "react-bootstrap/esm/Button";
import { success, fail, catch_errors, preloader } from "../Api/RequestFunctions";
import Checkout from "../payment/checkout";
import { getCurrency } from "../payment/GetCurrency";

class Subscribe extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            currentStep: 1,
            reference_id: 0,
            reference: "",
            amount: 20500
        }
    }
    handleChange = event => {
        const { name, value } = event.target
        this.setState({
            [name]: value
        })
        console.log(this.state)
    }
    refCallBack = (ref, ref_id) => {
        return [ref, ref_id]
    }
    handleSubmit = () => {
        preloader()
        let form_data = new FormData();
        form_data.append('reference_id', this.state.reference_id);
        form_data.append('reference', this.state.reference);
        axios.post(`${API_URL_DEPOSIT}`, form_data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    'Accept': 'application/json',
                    "Authorization": `Token ${ TOKEN }`
                }
            })
            .catch(function(error) {
                catch_errors(error)
            })
            .then(function(response) {
                if (response.status === 200 && response.data.success === false) {
                    fail(response.data.message)
                } else {
                    success("You have deposited successfully", "/home", "successful");
                }
            });
    }
    _next = () => {
        let currentStep = this.state.currentStep
        currentStep = currentStep >= 2 ? currentStep + 1 : currentStep + 1
        this.setState({
            currentStep: currentStep
        })
    }

    _prev = () => {
        let currentStep = this.state.currentStep
        currentStep = currentStep <= 1 ? 1 : currentStep - 1
        this.setState({
            currentStep: currentStep
        })
    }
    previousButton() {
        let currentStep = this.state.currentStep;
        let deposit_category = this.state.deposit_category;
        if (currentStep !== 1) {
            return ( <
                h6 className = "py-3 mx-5 text-center warning rounded-3"
                type = "button"
                onClick = { this._prev } >
                Previous <
                /h6>
            )
        }
        if (currentStep === 6 && deposit_category === 'sacco/club') {
            return ( <
                h6 className = "py-3 mx-5 text-center warning rounded-3"
                type = "button"
                onClick = { this._prevBeforeSacco } >
                Previous <
                /h6>
            )
        }
        return null;
    }

    submitButton = () => {
        let currentStep = this.state.currentStep;
        if (currentStep === 2) {
            return ( <
                div className = 'row justify-content-center' > <
                h6 id = "errorMessage"
                className = 'py-3 mt-3 rounded border border-danger text-center'
                style = {
                    { display: 'none' }
                } > hey < /h6> <
                h6 id = "infoMessage"
                className = 'py-3 mt-3 rounded warning text-center'
                style = {
                    { display: 'none' }
                } > hey < /h6>   <
                Button variant = "warning"
                className = 'shadow text-center'
                id = 'successMessage'
                onClick = { this.handleSubmit }
                type = "button" >
                Submit <
                /Button> < /
                div >
            )
        }
        return null
    }

    nextButton() {
        let currentStep = this.state.currentStep;
        if (currentStep === 1) {
            return ( <
                h6 className = "py-3 mx-5 text-center warning rounded-3"
                type = "button"
                onClick = { this._next } >
                Subscribe <
                /h6>        
            )
        }
        return null;
    }

    render() {
        return ( <
            React.Fragment >
            <
            form className = "p-5 text-center"
            onSubmit = { this.handleSubmit } > {
                /* 
                          render the form steps and pass required props in
                        */
            } <
            User className = "rounded-circle warning p-2"
            size = "xlarge" / > < br / > < h5 className = "bolder" > Your Subscription < /h5> <
            Step1 currentStep = { this.state.currentStep }
            handleChange = { this.handleChange }
            subStatus = { this.props.substatus }
            /> <
            Step2 currentStep = { this.state.currentStep }
            handleChange = { this.handleChange }
            phone = { this.props.phone }
            email = { this.props.email }
            name = { this.props.lastname }
            amount = { this.state.amount }
            submit = { this.handleSubmit }
            reference = { this.refCallBack }
            getCurr = { getCurrency(this.props.country) }
            currency = { this.state.currency }
            /> { this.nextButton() } { this.previousButton() }{this.submitButton()}< /
            form > < /
            React.Fragment >
        );
    }
}

function Step1(props) {
    if (props.currentStep !== 1) {
        return null
    }
    if (props.id === "personal") {
        console.log("risk profile")
    }
    return ( <
        div className = " text-start" > <
        h6 className = "mt-5 text-center" > This is a yearly fee of $5.Your account subscription becomes overdue after 30 days from account creation afterwhich you are required to pay your subscription. < /h6>  <
        h6 className = ' p-2 text-center my-5' > Account Status: < span className = 'bg-lighter active p-2 px-3 mx-2 rounded-3' > { props.subStatus } < /span>  < /
        h6 >
        <
        /
        div >
    );
}

function Step2(props) {
    function referenceCallBack(ref, ref_id) {
        props.reference(ref, ref_id)
        console.log(ref, ref_id)
        return [ref, ref_id]
    }

    function parentCallback(someStatus) {
        if (someStatus === "successful") {
            console.log(someStatus)
            return props.submit()
        }
        return someStatus
    }
    if (props.currentStep !== 2) {
        return null
    }
    return ( <
        div className = "text-center" >
        <
        h4 className = "py-5 font-lighter" > Proceed to pay UGX 20500
        for subscription < /
        h4 >
        <
        Checkout phone = { props.phone }
        name = { props.name }
        email = { props.email }
        amount = { props.amount }
        currency = { props.getCurr }
        callBack = { parentCallback }
        refer = { referenceCallBack }
        / > < /
        div >
    )
}

export default Subscribe;