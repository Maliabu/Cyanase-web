import React from "react";
import Form from 'react-bootstrap/Form';
import { API_URL_MM_WITHDRAW, API_URL_BANK_WITHDRAW, TOKEN } from '../apis';
import axios from 'axios';
import Button from "react-bootstrap/esm/Button";
import { success, fail, catch_errors, preloader } from "../Api/RequestFunctions";
import { FaHandHoldingUsd } from "react-icons/fa";
import { getCurrency } from "../payment/GetCurrency";

class Withdraw extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            currentStep: 1,
            withdraw_amount: 0,
            withdraw_category: "",
            currency: getCurrency(this.props.country),
            withdraw_channel: "",
            account_type: "",
            goalid: this.props.goalid,
            phone: this.props.phone,
            account_bank: "",
            account_number: "",
            beneficiary_name: this.props.fullname
        }
    }

    handleChange = event => {
        const { name, value } = event.target
        this.setState({
            [name]: value
        })
    }
    getFee() {
        this.fee = (2 / 100) * this.state.withdraw_amount
        return this.fee
    }
    getTab9() {
        return this.props.tab9
    }
    getAccountType() {
        let currency = this.state.currency
        let accountType = this.state.account_type
        if (currency !== "USD") {
            accountType = "basic"
        } else {
            accountType = "dollar"
        }
        return accountType
    }

    submitButton = () => {
        let currentStep = this.state.currentStep;
        if (currentStep === 4) {
            return ( <
                div className = 'row justify-content-center' > <
                h6 id = "errorMessage"
                className = 'py-2 mt-3 rounded border border-danger text-center'
                style = {
                    { display: 'none' }
                } > hey < /h6> <
                h6 id = "infoMessage"
                className = 'py-2 mt-3 rounded warning text-center'
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
    handleSubmit = () => {
        preloader()
        let form_data = new FormData();
        form_data.append('withdraw_channel', this.state.withdraw_channel);
        form_data.append('currency', this.state.currency);
        form_data.append('withdraw_category', this.state.withdraw_category);
        form_data.append('withdraw_amount', this.state.withdraw_amount);
        form_data.append('account_type', this.getAccountType());
        if (this.state.withdraw_channel === "bank") {
            form_data.append('account_number', this.state.account_number)
            form_data.append('account_bank', this.state.account_bank)
            form_data.append('beneficiary_name', this.state.beneficiary_name)
            axios.post(`${API_URL_BANK_WITHDRAW}`, form_data, {
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
                    if (!response) {
                        fail("Something went wrong...")
                    } else if (response.status === 200 && response.data.success === false) {
                        fail(response.data.message)
                    } else {
                        success("Your withdraw is now pending approval", "/home", "successful");
                    }
                });
        }

        if (this.state.withdraw_channel === "mobile money") {
            form_data.append('account_number', this.state.account_number)
            form_data.append('account_bank', this.state.account_bank)
            form_data.append('beneficiary_name', this.state.beneficiary_name)
            axios.post(`${API_URL_MM_WITHDRAW}`, form_data, {
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
                        success("Your withdraw is now pending approval", "/home", "successful");
                    }
                });
        }
    }
    _saccoCategory = () => {
        let currentStep = this.state.currentStep
        currentStep = currentStep + 5
        this.setState({
            currentStep: currentStep
        })
    }
    _afterSacco = () => {
        let currentStep = this.state.currentStep
        currentStep = currentStep - 4
        this.setState({
            currentStep: currentStep
        })
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

    _prevBeforeSacco = () => {
            this.setState({
                currentStep: 1
            })
        }
        /*
         * the functions for our button
         */
    previousButton() {
        let currentStep = this.state.currentStep;
        let withdraw_category = this.state.withdraw_category;
        if (currentStep !== 1) {
            return ( <
                h6 className = "py-3 mx-5 text-center warning rounded-3"
                type = "button"
                onClick = { this._prev } >
                Previous <
                /h6>
            )
        }
        if (currentStep === 6 && withdraw_category === 'sacco/club') {
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

    nextButton() {
        let currentStep = this.state.currentStep;
        let withdraw_category = this.state.withdraw_category;
        if (currentStep === 1 && withdraw_category === "personal") {
            return ( <
                h6 className = "py-3 mx-5 text-center warning rounded-3"
                type = "button"
                onClick = { this._next } >
                Next <
                /h6>        
            )
        }
        if (currentStep === 3) {
            let withdrawAmount = this.state.withdraw_amount
            let networth = this.props.networth
            let threshold = 0
            if ((networth - withdrawAmount) < threshold) {
                return ( <
                    h6 className = "status p-2 rounded-3" >
                    You cannot withdraw more than you have <
                    /h6>
                )
            }
            return ( <
                h6 className = "py-3 mx-5 text-center warning rounded-3"
                type = "button"
                onClick = { this._next } >
                Next <
                /h6>        
            )
        }

        if (currentStep === 1 && withdraw_category === "sacco/club") {
            return ( <
                h6 className = "py-3 mx-5 text-center warning rounded-3"
                type = "button"
                onClick = { this._saccoCategory } >
                Next <
                /h6>        
            )
        }
        if (currentStep < 4) {
            return ( <
                h6 className = "py-3 mx-5 text-center warning rounded-3"
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
            form className = "p-5 text-center"
            onSubmit = { this.handleSubmit } > {
                /* 
                          render the form steps and pass required props in
                        */
            } <
            FaHandHoldingUsd className = "rounded-circle warning p-2"
            size = "40" / > < br / >
            <
            h2 className = "bolder" > Withdraw < /h2> <
            Step1 currentStep = { this.state.currentStep }
            withdraw_category = { this.state.withdraw_category }
            handleChange = { this.handleChange }
            getTab9 = { this.getTab9() }
            /> <
            Step2 currentStep = { this.state.currentStep }
            handleChange = { this.handleChange }
            /><
            Step3 currentStep = { this.state.currentStep }
            handleChange = { this.handleChange }
            currency = { this.state.currency }
            /> <
            Step4 currentStep = { this.state.currentStep }
            handleChange = { this.handleChange }
            withdraw_channel = { this.state.withdraw_channel }
            phone = { this.state.phone }
            /> <
            Step5 currentStep = { this.state.currentStep }
            handleChange = { this.handleChange }
            currency = { this.state.currency }
            /> { this.nextButton() } { this.previousButton() } {this.submitButton()}< /
            form > < /
            React.Fragment >
        );
    }
}

function Step1(props) {
    if (props.currentStep !== 1) {
        return null
    }
    return ( <
        div className = " text-start" > <
        h6 className = "mt-2 text-center" > Choose which investment you wish to withdraw from. < /h6> <
        h6 className = "bolder active text-center" > All fields are required, do select. < /h6> <
        div className = "p-3 rounded-4 mt-3"
        key = "radio" >
        <
        div key = { `default-radio` }
        className = "mb-3" >
        <
        h5 className = "font-lighter" > PERSONAL INVESTMENT < /h5> <
        Form.Check label = "I wish to withdraw from my Personal Investments"
        name = "withdraw_category"
        type = "radio"
        onChange = { props.handleChange }
        value = "personal"
        required id = "default-radio" /
        >
        <
        h5 className = "font-lighter d-none mt-5" > SACCO GROUP / INVESTMENT CLUB < /h5> <
        Form.Check label = "I want to deposit to my Sacco Group or Investment Club"
        name = "withdraw_category"
        onChange = { props.handleChange }
        type = "radio"
        className = "d-none"
        value = "sacco/club"
        required id = "default-radio" /
        >
        <
        h5 className = "font-lighter d-none mt-5" > INSTITUTION / ORGANIZATION < /h5>  <
        Form.Check label = "I am making this withdraw from my API Account as an API User"
        name = "withdraw_category"
        onChange = { props.handleChange }
        type = "radio"
        className = "d-none"
        value = "institution"
        required id = "default-radio" /
        >
        <
        /
        div > < /div > < /
        div >
    );
}

function Step2(props) {
    if (props.currentStep !== 2) {
        return null
    }
    return ( <
        div className = " text-start" > <
        h6 className = "mt-2 text-center" > Choose your payment means. < /h6> <
        div className = "p-5 px-3 rounded-25 mt-3"
        key = "radio" >
        <
        div key = { `default-radio` }
        className = "mb-3" >
        <
        h5 className = "font-lighter d-none" > WALLET < /h5> <
        Form.Check label = "I want to withdraw from my wallet to make this withdraw from my personal investment account"
        name = "withdraw_channel"
        type = "radio"
        onChange = { props.handleChange }
        value = "wallet"
        className = "d-none"
        required id = "default-radio" /
        >
        <
        h5 className = "font-lighter" > BANK < /h5> <
        Form.Check label = "Your withdraw amount is reconciled to your Bank, Account Number"
        name = "withdraw_channel"
        onChange = { props.handleChange }
        type = "radio"
        value = "bank"
        required id = "default-radio" /
        >
        <
        h5 className = "font-lighter mt-5" > MOBILE MONEY < /h5> <
        Form.Check label = "Your withdraw will be made available via Mobile Money"
        name = "withdraw_channel"
        onChange = { props.handleChange }
        type = "radio"
        value = "mobile money"
        required id = "default-radio" /
        >
        <
        /
        div > < /div > < /
        div >
    );
}

// function Step3(props) {
//     if (props.currentStep !== 3) {
//         return null
//     }
//     return ( <
//         div className = "text-start" > <
//         h6 className = "mt-2 text-center" > Choose the currency in which you would like to invest your money <
//         /h6> <
//         div className = "p-5 px-3 rounded-25 mt-3"
//         key = "radio" >
//         <
//         div key = { `default-radio` }
//         className = "mb-3" >
//         <
//         h4 className = "font-lighter" > BASIC ACCOUNT < /h4> <
//         Form.Check label = "Withdraw from your account in your local currency.(Transaction charges apply)"
//         name = "currency"
//         type = "radio"
//         onChange = { props.handleChange }
//         value = "UGX"
//         required id = "default-radio" /
//         >
//         <
//         h4 className = "font-lighter mt-5" > DOLLAR ACCOUNT < /h4> <
//         Form.Check label = "Withdraw from your local currency and we shall change it to USD(Standard charges apply)"
//         name = "currency"
//         onChange = { props.handleChange }
//         type = "radio"
//         value = "USD"
//         required id = "default-radio" /
//         >
//         <
//         /
//         div > < /div ></div >
//     );
// }

function Step3(props) {
    if (props.currentStep !== 3) {
        return null
    }
    return ( <
        div className = "text-center" > <
        h6 className = "mt-2" > How much would you like to Withdraw from your account ? < /h6>  <
        Form.Group className = "mb-3 p-3" >
        <
        Form.Label > < h6 > Amount to Withdraw in { props.currency } < /h6> < /Form.Label > <
        Form.Control type = "number"
        onChange = { props.handleChange }
        name = "withdraw_amount"
        id = 'phone'
        required placeholder = "0.00" / >
        <
        Form.Control.Feedback type = "invalid" >
        This field is required. <
        /Form.Control.Feedback> < /
        Form.Group >
        <
        h6 className = "bg-lighter p-2 rounded-3" > withdraw charges apply < /h6> < /
        div >
    );
}

function Step4(props) {
    if (props.currentStep !== 4) {
        return null
    }
    if (props.withdraw_channel === "bank") {
        return ( <
            div className = "text-center" > <
            h6 className = "mt-2" > Enter your bank details to proceed < /h6>   <
            Form.Group className = " p-3" >
            <
            Form.Label > < h6 > Account Number < /h6> < /Form.Label > <
            Form.Control type = "number"
            onChange = { props.handleChange }
            name = "account_number"
            id = 'phone'
            required placeholder = "0000000000" / >
            <
            Form.Control.Feedback type = "invalid" >
            This field is required. <
            /Form.Control.Feedback> < /
            Form.Group > <
            Form.Group className = "mb-3 p-3" >
            <
            Form.Label > < h6 > Account Bank(Code) < /h6> < /Form.Label > <
            Form.Control type = "text"
            onChange = { props.handleChange }
            name = "account_bank"
            id = 'phone'
            required placeholder = "code" / >
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
        h6 className = "mt-2" > Confirm your phone number < /h6>   <
        Form.Group className = " p-3" >
        <
        Form.Label > < h6 > Confirm Phone Number < /h6> < /Form.Label > <
        Form.Control type = "number"
        onChange = { props.handleChange }
        name = "account_number"
        id = 'phone'
        required placeholder = { props.phone }
        / > <
        Form.Control.Feedback type = "invalid" >
        This field is required. <
        /Form.Control.Feedback> < /
        Form.Group > <
        Form.Group className = "mb-3 p-3" >
        <
        Form.Label > < h6 > Account Bank(Mobile Money Option) < /h6> < /Form.Label > <
        Form.Control type = "text"
        onChange = { props.handleChange }
        name = "account_bank"
        id = 'phone'
        required placeholder = "code" / >
        <
        Form.Control.Feedback type = "invalid" >
        This field is required. <
        /Form.Control.Feedback> < /
        Form.Group > < /
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
            h4 className = "py-5 font-lighter" > Deposit < span className = "bolder" > { props.currency } < /span>: <span className="bolder">{ props.total_deposit} </span >
            to our bank account and proceed to send us your deposit receipt < /
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
            span className = "bolder active" > < u > 'deposit@cyanase.com' < /u> < /span > < /h6>  < /
            div >
        )
    } else if (props.payment_means === "online") {
        return ( < h1 className = "py-5" > FlutterWave < /h1>)
        }
        return ( <
            div className = "text-center" > <
            h6 className = "mt-2" > How much would you like to Withdraw from your account ? < /h6>  <
            Form.Group className = "mb-3 bg-white shadow-sm p-3 p-5" >
            <
            Form.Label > Amount to Deposit < /Form.Label>  <
            Form.Control type = "number"
            onChange = { props.handleChange }
            name = "withdraw_amount"
            id = 'phone'
            required placeholder = "UGX 10,000" / >
            <
            Form.Control.Feedback type = "invalid" >
            This field is required. <
            /Form.Control.Feedback> < /
            Form.Group > < /
            div >
        );
    }
    export default Withdraw;