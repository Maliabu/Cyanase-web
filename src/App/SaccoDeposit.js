import React from "react";
import { FaWallet } from 'react-icons/fa';
import Form from 'react-bootstrap/Form';
import DepositPic from '../images/deposit.png';

class SaccoDeposit extends React.Component {
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
        let payment_means = this.state.payment_means;
        if (currentStep < 4) {
            return ( <
                h6 className = "py-3 mx-5 border text-center border-warning text-warning rounded-25"
                type = "button"
                onClick = { this._next } >
                Next <
                /h6>        
            )
        }
        if (currentStep === 4 && payment_means === "offline") {
            return ( <
                h6 className = "py-3 mx-5 text-center bg-warning rounded-25"
                type = "button"
                onClick = { this._next } >
                Continue <
                /h6>        
            )
        }
        if (currentStep === 4 && payment_means === "wallet") {
            return ( <
                h6 className = "py-3 mx-5 text-center bg-warning rounded-25"
                type = "button" >
                OK <
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
            FaWallet className = "text-warning rounded-circle border border-warning p-3"
            size = "70" / > < br / > <
            img src = { DepositPic }
            width = '25%'
            className = "my-3"
            height = '80%'
            alt = "investors" / > <
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
            /> <
            Step4 currentStep = { this.state.currentStep }
            handleChange = { this.handleChange }
            payment_means = { this.state.payment_means }
            deposit_amount = { this.state.deposit_amount }
            fee = { this.state.fee }
            total_deposit = { parseInt(this.state.deposit_amount) + parseInt(this.state.fee) }
            currency = { this.state.currency }
            /> <
            Step5 currentStep = { this.state.currentStep }
            handleChange = { this.handleChange }
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
    if (props.id === "personal") {
    }
    return ( <
        div className = " text-center" > <
        h6 className = "mt-2" > Choose your payment means. < /h6> <
        div className = "p-5 px-3 rounded-25 mt-3"
        key = "radio" >
        <
        div key = { `default-radio` }
        className = "mb-3" > <
        Form.Check label = "WALLET. I want to deposit from my wallet to make this deposit to my personal investment account"
        name = "payment_means"
        type = "radio"
        onChange = { props.handleChange }
        className = "mx-5"
        value = "wallet"
        required id = "default-radio" /
        >
        <
        Form.Check label = "OFFLINE. Deposit directly to our bank account and let us reconcile your account"
        name = "payment_means"
        onChange = { props.handleChange }
        type = "radio"
        className = "mt-3 mx-5"
        value = "offline"
        required id = "default-radio" /
        >
        <
        Form.Check label = "ONLINE. Make an instant deposit on our platform"
        name = "payment_means"
        onChange = { props.handleChange }
        type = "radio"
        className = "mt-3 mx-5"
        value = "online"
        required id = "default-radio" /
        >
        <
        /
        div > < /div > <
        h6 className = "py-3 rounded-3 bg-warning text-center" >
        Edit my Risk Profile before deposit < /h6> < /
        div >
    );
}

function Step2(props) {
    if (props.currentStep !== 2) {
        return null
    }
    return ( <
        div className = "text-center" > <
        h6 className = "mt-2" > Choose the currency in which you would like to invest your money <
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

function Step3(props) {
    if (props.currentStep !== 3) {
        return null
    }
    if (props.payment_means === "wallet") {
        return ( <
            div className = "text-center" > <
            h4 className = "font-lighter my-3" > Deposit from Wallet < /h4> <
            h4 className = "py-3 bolder" > Wallet Balance: < span className = "font-lighter" > < span > { props.currency } < /span> 0.00 < /span >
            <
            /h4 > <
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
        )
    }
    return ( <
        div className = "text-center" > <
        h6 className = "mt-2" > How much would you like to Deposit to your account ? < /h6>  <
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

function Step4(props) {
    if (props.currentStep !== 4) {
        return null
    }
    if (props.payment_means === "offline") {
        return ( <
            div className = "text-center" > <
            h6 className = "mt-2" > Continue to deposit < /h6>   <
            h4 className = "py-5 font-lighter" > Proceed to deposit < span className = "bolder" > { props.currency } < /span> < span className = "bolder" > { props.deposit_amount } < /span > plus a flat fee of < span className = "bolder" > { props.currency } < /span> <span className = "bolder">{props.fee}</span > .Your Total deposit is < span className = "bolder" > { props.currency } < /span> < span className = "bolder active" > { props.total_deposit } < /span > < /
            h4 > < /
            div >
        )
    }
    if (props.payment_means === "online") {
        return ( <
            div className = "text-center" > < h1 className = "py-5" > FlutterWave < /h1> < /
            div >
        );
    }
    return ( <
        div className = "text-center" > <
        h4 className = "font-lighter my-3" > Deposit from Wallet < /h4> <
        h6 className = "mt-2" > Done < /h6>   <
        h4 className = "py-5 font-lighter" > You have deposited < span className = "bolder" > { props.currency } < /span> < span className = "bolder" > { props.deposit_amount } < /span > plus a flat fee of < span className = "bolder" > { props.currency } < /span> <span className = "bolder">{props.fee}</span > .Your Total deposit is < span className = "bolder" > { props.currency } < /span> < span className = "bolder active" > { props.total_deposit } < /span > < /
        h4 > < /
        div >
    )
}

function Step5(props) {
    if (props.currentStep !== 5) {
        return null
    } else if (props.payment_means === "offline") {
        return ( <
            div className = "text-center" > <
            h4 className = "bolder my-3" > Make an Offline Deposit < /h4> <
            h6 className = "mt-2" > Procedure < /h6>   <
            h4 className = "py-5 font-lighter" > Deposit money to our bank account and proceed to send us your deposit receipt < /
            h4 >
            <
            div className = "row" >
            <
            div className = "col-5 text-start" >
            <
            h5 className = "bolder" > Bank name < /h5> <
            h5 className = "bolder" > Account number < /h5> <
            h5 className = "bolder" > SWIFT CODE < /h5>  <
            h5 className = "bolder" > Account name < /h5>< /
            div > <
            div className = "col-7 text-start" >
            <
            h5 className = "font-lighter" > DIAMOND TRUST BANK < /h5>  <
            h5 className = "font-lighter" > 0190514001 < /h5> <
            h5 className = "font-lighter" > DTKEUGKAXXX < /h5><
            h5 className = "font-lighter" > CYANASE TECHNOLOGY AND INVESTMENT LTD < /h5> < /
            div > <
            /div>  <
            h6 className = "my-5" > Send your deposit receipt to our Email: <
            span className = "bolder active" > < u > deposit @cyanase.com < /u> < /span > < /h6>  < /
            div >
        )
    } else if (props.payment_means === "online") {
        return ( < h1 className = "py-5" > FlutterWave < /h1>)
        }
        return ( <
            div className = "text-center" > <
            h6 className = "mt-2" > How much would you like to Deposit to your account ? < /h6>  <
            Form.Group className = "mb-3 bg-white shadow-sm p-3 p-5" >
            <
            Form.Label > Amount to Deposit < /Form.Label>  <
            Form.Control type = "number"
            onChange = { props.handleChange }
            name = "deposit_amount"
            id = 'phone'
            required placeholder = "UGX 10,000" / >
            <
            Form.Control.Feedback type = "invalid" >
            This field is required. <
            /Form.Control.Feedback> < /
            Form.Group > < button className = "btn btn-warning btn-block my-3" > Submit < /button> < /
            div >
        );
    }
    export default SaccoDeposit;