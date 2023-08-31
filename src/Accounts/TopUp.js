import React from "react";
import Form from 'react-bootstrap/Form';

class TopUp extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            currentStep: 1,
            payment_means: '',
            deposit_amount: 0,
            currency: '',
            fee: 200
        }
        this.total_deposit = 0;
    }

    handleChange = event => {
        const { name, value } = event.target
        this.setState({
            [name]: value
        })
    }

    handleSubmit = event => {
        event.preventDefault()
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

    /*
     * the functions for our button
     */
    previousButton() {
        let currentStep = this.state.currentStep;
        if (currentStep !== 1) {
            return ( <
                h6 className = "py-3 mx-5 text-center border border-warning text-warning rounded-25"
                type = "button"
                onClick = { this._prev } >
                Previous <
                /h6>
            )
        }
        return null;
    }

    nextButton() {
        let currentStep = this.state.currentStep;
        if (currentStep < 4) {
            return ( <
                h6 className = "py-3 mx-5 border text-center border-warning text-warning rounded-25"
                type = "button"
                onClick = { this._next } >
                Next <
                /h6>        
            )
        }
        return null;
    }

    render() {
        return ( <
            React.Fragment >
            <
            form className = "p-5"
            onSubmit = { this.handleSubmit } > {
                /* 
                          render the form steps and pass required props in
                        */
            } <
            Step1 currentStep = { this.state.currentStep }
            handleChange = { this.handleChange }
            /> <
            Step2 currentStep = { this.state.currentStep }
            handleChange = { this.handleChange }
            /> <
            Step3 currentStep = { this.state.currentStep }
            handleChange = { this.handleChange }
            currency = { this.state.currency }
            payment_means = { this.state.payment_means }
            />  { this.nextButton() }{ this.previousButton() }

            <
            /form> < /
            React.Fragment >
        );
    }
}

function Step1(props) {
    if (props.currentStep !== 1) {
        return null
    }
    return ( <
        div className = "text-center" > <
        h6 > Choose the currency in which you would like to invest your money <
        /h6> <
        div className = "p-5 px-3 rounded-25 mt-3"
        key = "radio" >
        <
        div key = { `default-radio` }
        className = "mb-3" >
        <
        h4 className = "font-lighter" > BASIC ACCOUNT < /h4> <
        Form.Check label = "Deposit and maintain your account in your local currency.(Transaction charges apply)"
        name = "currency"
        type = "radio"
        onChange = { props.handleChange }
        className = "mx-5"
        value = "UGX"
        required id = "default-radio" /
        >
        <
        h4 className = "font-lighter mt-5" > DOLLAR ACCOUNT < /h4> <
        Form.Check label = "Deposit in your local currency and we shall change it to USD(Standard charges apply)"
        name = "currency"
        onChange = { props.handleChange }
        type = "radio"
        className = " mx-5"
        value = "USD"
        required id = "default-radio" /
        >
        <
        /
        div > < /div ></div >
    );
}

function Step2(props) {
    if (props.currentStep !== 2) {
        return null
    }
    return ( <
        div className = "text-center" > <
        h6 className = "mt-2" > How much would you like to TopUp to your account ? < /h6>  <
        Form.Group className = "mb-3 bg-white shadow-sm p-3 p-5" >
        <
        Form.Label > Amount to Deposit in { props.currency } < /Form.Label>  <
        Form.Control type = "number"
        onChange = { props.handleChange }
        name = "deposit_amount"
        id = 'phone'
        required placeholder = "0.00" / >
        <
        Form.Control.Feedback type = "invalid" >
        This field is required. <
        /Form.Control.Feedback> < /
        Form.Group > < /
        div >
    );
}

function Step3(props) {
    if (props.currentStep !== 3) {
        return null
    }
    return ( < h1 className = "py-5" > FlutterWave < /h1>);
    }
    export default TopUp;