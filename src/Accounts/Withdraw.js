import React from "react";
import Form from 'react-bootstrap/Form';
import { API_URL_MM_WITHDRAW, API_URL_BANK_WITHDRAW, TOKEN } from '../apis';
import Button from "react-bootstrap/esm/Button";
import { success, fail, catch_errors, preloader } from "../Api/RequestFunctions";
import { FaDonate, FaHandHoldingUsd } from "react-icons/fa";
import { getCurrency } from "../payment/GetCurrency";
import { ValidateForms } from "../Auth/ValidateForms";
import axios from "axios";

class Withdraw extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            currentStep: 2,
            withdraw_amount: 0,
            withdraw_category: "",
            currency: this.props.currency,
            withdraw_channel: "bank",
            account_type: "",
            goalid: this.props.goalid,
            phone: this.props.phone,
            phone_number: '',
            account_bank: "MPS",
            account_number: "",
            beneficiary_name: this.props.fullname,
            investment_id: this.props.investmentId
        }
    }
    getCountryCurrency = () => {
        let currency = this.state.currency
        currency = getCurrency(this.props.country)
        return currency
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
    validate2 = () => {
        let withdrawChannel = this.state.withdraw_channel

        if(withdrawChannel === "bank"){
            let AccNumber = ValidateForms("account_number")
            if (AccNumber.length === 0) {
                document.getElementById("errorAcc").style.display = "block"
                document.getElementById("errorAcc").style.color = "crimson"
                document.getElementById("errorAcc").innerText = "account number is required"
            } else {
                document.getElementById("errorAcc").style.display = "none"
                this.handleSubmit()
            }
        } else{
            let PhoneNumber = ValidateForms("phone_number")
            if (PhoneNumber.length === 0) {
                document.getElementById("errorPhone").style.display = "block"
                document.getElementById("errorPhone").style.color = "crimson"
                document.getElementById("errorPhone").innerText = "phone number is required"
            } else {
                document.getElementById("errorPhone").style.display = "none"
                this.handleSubmit()
            }
        }
    }

    submitButton = () => {
        let currentStep = this.state.currentStep;
        if (currentStep === 4) {
            return ( <
                div className = 'mx-3 justify-content-center' > <
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
                className = 'shadow text-center my-2'
                id = 'successMessage'
                onClick = { () => this.validate2() }
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
        form_data.append('currency', this.props.currency);
        form_data.append('withdraw_category', this.state.withdraw_category);
        form_data.append('withdraw_amount', this.state.withdraw_amount);
        form_data.append('account_type', this.getAccountType());
        form_data.append('investment_id', this.state.investment_id);
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
                        fail("Something went wrong...", "Error")
                    } else if (response.status === 200 && response.data.success === false) {
                        fail(response.data.message, response.data.type)
                    } else {
                        success("Your withdraw is now pending approval", "/home", "successful");
                    }
                });
        }

        if (this.state.withdraw_channel === "mobile money") {
            form_data.append('phone_number', this.state.phone_number)
            form_data.append('account_bank', "MPS")
            form_data.append('beneficiary_name', this.props.fullname)
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
                        fail(response.data.message, response.data.type)
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
        if (currentStep !== 2) {
            return ( <
                h6 className = "text-start warning rounded-3"
                type = "button"
                onClick = { this._prev } >
                Previous <
                /h6>
            )
        }
        if (currentStep === 6 && withdraw_category === 'sacco/club') {
            return ( <
                h6 className = "text-start warning rounded-3"
                type = "button"
                onClick = { this._prevBeforeSacco } >
                Previous <
                /h6>
            )
        }
        return null;
    }
    validate1 = () => {
        let withdrawAmount = ValidateForms("withdraw_amount")

        if (withdrawAmount.length === 0) {
            document.getElementById("errorFirst").style.display = "block"
            document.getElementById("errorFirst").style.color = "crimson"
            document.getElementById("errorFirst").innerText = "withdraw amount is required"
        } else {
            document.getElementById("errorFirst").style.display = "none"
            this._next()
        }
    }
    nextButton() {
        let currentStep = this.state.currentStep;
        let withdraw_category = this.state.withdraw_category;
        let verification = this.props.verification
        if (currentStep === 2 && verification === true) {
            return ( <
                h6 className = "my-2 text-end warning rounded-3"
                type = "button"
                onClick = { this._next } >
                Next <
                /h6>        
            )
        }
        if (currentStep === 2 && verification === false) {
            return ( <
                h6 className = " my-2 mx-3 p-2 text-center border red-status border-danger rounded-3 text-danger bolder" id="errorMessage">
                Please check your email and verify your account to proceed <
                /h6>        
            )
        }
        // eslint-disable-next-line no-unreachable
        if (currentStep === 3) {
            let withdrawAmount = this.state.withdraw_amount
            let networth = this.props.networth
            let threshold = 0
            if ((networth - withdrawAmount) < threshold) {
                return ( <div className="px-5"><
                    h6 className = "status p-2 my-2 rounded-3" >
                    You cannot withdraw more than you have. If your networth has not yet matured, please be patient and try again later <
                    /h6></div>
                )
            }
            if ((networth - withdrawAmount) === networth) {
                return ( <div className="px-5 my-2"><
                    h6 className = "status p-2 rounded-3" >
                    You cannot withdraw 0 {this.state.currency} <
                    /h6></div>
                )
            }
            return ( <
                h6 className = "my-2 text-end warning rounded-3"
                type = "button"
                onClick = { ()=>this.validate1() } >
                Next <
                /h6>        
            )
        }
        if (currentStep === 1 && withdraw_category === "sacco/club") {
            return ( <
                h6 className = "my-2 text-end warning rounded-3"
                type = "button"
                onClick = { this._saccoCategory } >
                Next <
                /h6>        
            )
        }
        if (currentStep < 4) {
            return ( <
                h6 className = "my-2 text-end warning rounded-3"
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
            form className = "text-center"
            onSubmit = { this.handleSubmit } > {
                /* 
                          render the form steps and pass required props in
                        */
            }<div className=" p-lg-3"><h3 className=" mt-2 d-none d-lg-block d-md-block">Withdraw</h3></div>
            <div className={"card p-3 p-lg-4 mx-2 mx-lg-3 tet-start rounded-4"}>
            <h4 className="text-start bolder text-white">{this.props.option_name}
            <p className="text-start m-0 text-white p-0">{this.props.handler}</p></h4>
            <div className="row mt-3">
            <div className="col-3 text-start "><FaDonate/></div>
            <div className="col text-end">
            <h6>Total Deposit: <
        div className = "d-flex flex-row flex justify-content-end" > { getCurrency(this.props.country) } <
        h3 > {(this.props.deposit*1000).toLocaleString()} < /h3></div ></h6>
            <h6>Total Networth: <
        div className = "d-flex flex-row flex rounded light-res-homey pt-1 justify-content-center" > { getCurrency(this.props.country) } <
        h3 > {this.props.networth.toLocaleString()} < /h3></div ></h6>
        </div>
            </div></div>
            <
            FaHandHoldingUsd className = "rounded-circle d-none warning p-2"
            size = "40" / > < br / >
            <
            h2 className = "bolder d-none" > Withdraw < /h2> <
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
            currency = { this.getCountryCurrency() }
            /> <
            Step4 currentStep = { this.state.currentStep }
            handleChange = { this.handleChange }
            withdraw_channel = { this.state.withdraw_channel }
            phone = { this.state.phone }
            options = {this.props.banks}
            />   { this.previousButton() } { this.nextButton() }{this.submitButton()}< /
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
        h6 className = " text-center" > Choose your withdraw means. < /h6> <
        div className = "p-4"
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

function Step3(props) {
    if (props.currentStep !== 3) {
        return null
    }
    return ( <
        div className = "text-center px-4" > <
        h6 className = "mt-2" > How much would you like to Withdraw from your account ? < /h6>  <
        Form.Group className = "mb-3 p-3" >
        <
        Form.Label > < h6 > Amount to Withdraw in { props.currency } < /h6> < /Form.Label > <
        Form.Control type = "number"
        onChange = { props.handleChange }
        name = "withdraw_amount"
        id = 'phone'
        required placeholder = "0.00" / ><
        p id = "errorFirst"
        className = 'p-2 rounded-2 px-3 bg-red'
        style = {
            { display: 'none' }
        } > hey < /p>
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
            div className = "text-center mx-3" > <
            h6 className = "mt-2" > Enter your bank details to proceed < /h6>  <
            Form.Select className = "my-3"
            required defaultValue = "Select your preferred bank"
            onChange = { props.handleChange }
            name = "account_bank" > {
                props.options.map(options => {
                    return <
                        option value = { options.code }
                    id = "account_bank" ><h6>{ options.name }</h6> < /option>
                })
            } < /
            Form.Select > <
            Form.Group className = " p-3" >
            <
            Form.Label > < h6 > Account Number < /h6> < /Form.Label > <
            Form.Control type = "number"
            onChange = { props.handleChange }
            name = "account_number"
            id = 'account_number'
            required placeholder = "0000000000" / ><
            p id = "errorAcc"
            className = 'p-2 rounded-2 px-3 bg-red'
            style = {
                { display: 'none' }
            } > hey < /p>
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
        Form.Control type = "phone"
        onChange = { props.handleChange }
        name = "phone_number"
        id = 'phone_number'
        required placeholder = { props.phone }
        / ><
        p id = "errorPhone"
        className = 'p-2 rounded-2 px-3 bg-red'
        style = {
            { display: 'none' }
        } > hey < /p> <
        Form.Control.Feedback type = "invalid" >
        This field is required. <
        /Form.Control.Feedback> < /
        Form.Group > <
        Form.Group className = "mb-3 p-3 d-none" >
        <
        Form.Label > < h6 > Account Bank(Mobile Money Option) < /h6> < /Form.Label > <
        Form.Control type = "text"
        onChange = { props.handleChange }
        name = "account_bank"
        id = 'account_bank'
        required placeholder = "code" / >
        <
        Form.Control.Feedback type = "invalid" >
        This field is required. <
        /Form.Control.Feedback> < /
        Form.Group > < /
        div >
    )
}
    export default Withdraw;