import React from "react";
import { Wallet } from 'react-iconly';
import Form from 'react-bootstrap/Form';
import DepositPic from '../images/deposit.png';
import Profile1 from '../images/Ellipse 178.png';
import Button from "react-bootstrap/esm/Button";
import { preloader, autoClickable } from "../Api/RequestFunctions";
import Checkout from "../payment/checkout";
import { getCurrency } from "../payment/GetCurrency";
import { useState } from 'react';
import { useForm } from "react-hook-form";
import { ValidateForms } from "../Auth/ValidateForms";
import axios from "axios";
import { API_URL_GET_INVESTMENT_OPTION, TOKEN } from "../apis";
import Conversion from "../payment/conversion";

function Learn1(props) {
    const globalRefId = "";
    const [step, setStep] = useState(1)
    const [minimum, setMinimum] = useState(0)
    const [convertedAmount, setConvertedAmount] = useState(0)
    const [id, setId] = useState()
    const [fundManagerCountry, setFundManagerCountry] = useState('')
    const [interest, setInterest] = useState()
    const [handler, setHandler] = useState()
    const [description, setDescription] = useState()
    const [formData, setFormData] = useState({
        "payment_means": 'online',
        "deposit_amount": 0,
        "investment_id": '',
        "currency": getCurrency(props.country),
        "investment_option": props.option,
        "deposit_category": "personal",
        "account_type": "",
        "reference": "",
        "reference_id": 0,
        "tx_ref": "CYANASE-TEST-001",

    });
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setFormData({...formData, [name]: value });
    };
    function getOptionDetails(option){
        axios.post(API_URL_GET_INVESTMENT_OPTION, option, {headers: {
            "Authorization": `Token ${TOKEN}`,
            "Content-Type": "application/json"
        }}).then(function(res)
            {
                if(res){
                    setInterest(res.data[0].interest);
                    setHandler(res.data[0].handler);
                    setDescription(res.data[0].description);
                }
            }
        )
    }
    const getTotalDeposit = () => {
        let total_deposit = parseFloat(getFee()) + parseFloat(formData.deposit_amount)
        return total_deposit
    }
    const getFee = () => {
        let fee = ((1.4 / 100) * formData.deposit_amount).toFixed(2)
        return fee
    }
    const getTab9 = () => {
        return props.tab9
    }
    const { handleSubmit } = useForm();
    function convert(){
        let option = formData.investment_option
            axios.post(API_URL_GET_INVESTMENT_OPTION, option, {headers: {
                "Authorization": `Token ${TOKEN}`,
                "Content-Type": "application/json"
            }}).then(function(res)
                {
                    if(res){
                        setMinimum(res.data[0].minimum_deposit);
                        setId(res.data[0].investment_option_id);
                        setFundManagerCountry(res.data[0].fund_manager_country);
                    }
                }
            )
    }
    convert()
    const getAccountType = () => {
        let currency = formData.currency
        let accountType = formData.account_type
        if (currency === "USD") {
            accountType = "dollar"
        } else {
            accountType = "basic"
        }
        return accountType
    }
    formData.account_type = getAccountType()
    formData.currency = getCurrency(props.country)

    function onSubmit() {
        preloader()
    }
    function validate1(minimum, id, fundManagerCountry) {
        let depositAmount = ValidateForms("deposit_amount")
        let deposit_amount = formData.deposit_amount
        let currency = formData.currency
        formData.investment_id = id

        if (depositAmount.length === 0) {
            document.getElementById("errorFirst").style.display = "block"
            document.getElementById("errorFirst").style.color = "crimson"
            document.getElementById("errorFirst").innerText = "deposit amount is required"
        } else if (deposit_amount < parseInt(convertedAmount)) {
            document.getElementById("errorFirst").style.display = "block"
            document.getElementById("errorFirst").style.color = "crimson"
            document.getElementById("errorFirst").innerText = "minimum deposit required for this investment class is "+currency+" "+parseInt(convertedAmount).toLocaleString()
        }else{
            document.getElementById("errorFirst").style.display = "none"
            setStep(step + 1)
        }
    }
    const _next = () => {
        setStep(step + 1)
    }

    const _prev = () => {
        setStep(step - 1)
    }
    const previousButton = () => {
        if (step !== 1) {
            return ( <
                h6 className = " text-start warning rounded-3"
                type = "button"
                onClick = { _prev } >
                Previous <
                /h6>
            )
        }
        return null;
    }
    const submitButton = () => {
        let payment_means = formData.payment_means;
        if (step === 4 && payment_means === "online") {
            return ( <
                div className = 'mx-3 justify-content-center rounded-4' > <
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
                onClick={()=> autoClickable()}
                className = 'shadow text-center my-2'
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
        let payment_means = formData.payment_means;
        let deposit_category = formData.deposit_category
        let verification = props.verification
        let investmentOption = formData.investment_option
        let riskProfileStatus = props.complete
        if (step === 1){
            getOptionDetails(investmentOption)
        }
        if (step === 1 && deposit_category === "personal" && verification === true) {
            return ( <
                h6 className = " my-2 text-end warning rounded-3"
                type = "button"
                onClick = { _next } >
                Next <
                /h6>        
            )
        }
        if (step === 1 && verification === false) {
            // simple - only verified users can interact with this feature
            return ( <
                h6 className = "m-3 p-2 status rounded-3">
                Please check your email and verify your account to proceed <
                /h6>        
            )
        }
        if (step === 2 && investmentOption === "Automatic Asset Allocation"){
            // verify risk profile option was selected or not and check risk profile status
            if (riskProfileStatus === "Complete"){
                return (
                    <
                h6 className = " my-2 text-end warning rounded-3"
                type = "button"
                onClick = { _next } >
                Next <
                /h6> 
                )
            } else {
                return (
                    <
                h6 className = " m-3 p-2 status rounded-3" >
                Please complete your risk profile to have your assets allocated automatically. <
                /h6> 
                )
            }
        }
        if (step === 6) {
            return ( <
                h6 className = " my-2 text-end warning rounded-3"
                type = "button"
                onClick = { this._afterSacco } >
                Next <
                /h6>        
            )
        }
        if (step === 4 && payment_means === "offline") {
            return ( <
                h6 className = " my-2 text-end bk-warning rounded-3"
                type = "button"
                onClick = { _next } >
                Continue <
                /h6>        
            )
        }
        if (step === 3) {
            return ( <
                h6 className = " my-2 text-end warning rounded-3"
                onClick = { () => validate1(minimum, id, fundManagerCountry) } >
                Next <
                /h6>        
            )
        }
        if (step < 4) {
            return ( <
                h6 className = " my-2 text-end warning rounded-3"
                onClick = { _next } >
                Next <
                /h6>        
            )
        }
        return null
    }

    return ( <
        React.Fragment >
        <
        form className = "text-center"
        onSubmit = { handleSubmit(onSubmit) } > {
            /* 
                      render the form steps and pass required props in
                    */
        } <div className="blue-darks p-3 rounded-top-3"><h3 className="bolder mt-2">Deposit <span className="row justify-content-center shadow-sm p-2 light-res-home">{formData.investment_option}</span></h3></div>
        <
        Wallet className = "d-none rounded-circle warning p-2"
        size = "xlarge" / > < br / > <
        img src = { DepositPic }
        width = '25%'
        className = "my-3 d-none"
        height = '80%'
        alt = "investors" / > <
        Step1 currentStep = { step }
        deposit_category = { formData.deposit_category }
        handleChange = { handleChange }
        getTab9 = { getTab9() }
        investmentOption = { props.option }
        options = {props.options}
        interest = { interest }
        description = { description }
        handler = { handler }
        investment_option = {formData.investment_option}
        /> <
        Step2 currentStep = { step }
        handleChange = { handleChange }
        /><
        Step3 currentStep = { step }
        handleChange = { handleChange }
        currency = { formData.currency }
        payment_means = { formData.payment_means }
        minimum = { minimum }
        fundManagerCountry = { fundManagerCountry }
        setConvertedAmount = { setConvertedAmount }
        /> <
        Step4 currentStep = { step }
        handleChange = { handleChange }
        phone = { props.phone }
        email = { props.email }
        name = { props.lastname }
        country = { props.country }
        globalRefId = { globalRefId }
        payment_means = { formData.payment_means }
        deposit_amount = { formData.deposit_amount }
        total_deposit = { getTotalDeposit() }
        fee = {
            getFee()
        }
        submit = { onSubmit }
        data = { formData }
        getCurr = { getCurrency(props.country) }
        currency = { formData.currency }
        riskAnalysisPercentages = {props.riskAnalysisPercentages}
        /> <
        Step5 currentStep = { step }
        handleChange = { handleChange }
        payment_means = { formData.payment_means }
        total_deposit = { getTotalDeposit() }
        currency = { formData.currency }
        getCurr = { getCurrency(props.country) }
        />  <Step6  currentStep = { step }
        handleChange = { handleChange }
        />  { previousButton() }{ nextButton() }{submitButton()}< /
        form > < /
        React.Fragment >
    );
}

function Step1(props) {
    if (props.currentStep !== 1) {
        return null
    }
    // console.log(convertedAmount("usd",5,"ugx"))
    return ( <
        div className = "bg-white p-3 text-dark" > <
        h6 className = "text-center" > Choose where you wish to make your deposit (Investment Class) < /h6> <
        div className = "p-3 rounded-4 "
        key = "radio" >
        <
        div key = { `default-radio` }
        className = "mb-3 d-none" >
        <
        h5 className = "font-lighter" > PERSONAL INVESTMENT < /h5> <
        Form.Check label = "I wish to deposit to my Personal Account. Basic or Dollar Account"
        name = "deposit_category"
        type = "radio"
        onChange = { props.handleChange }
        value = "personal"
        required id = "default-radio" /
        >
        <
        h5 className = "font-lighter d-none mt-5" > SACCO GROUP / INVESTMENT CLUB < /h5> <
        Form.Check label = "I want to deposit to my Sacco Group or Investment Club"
        name = "deposit_category"
        onChange = { props.handleChange }
        type = "radio"
        className = "d-none"
        value = "sacco/club"
        required id = "default-radio" /
        >
        <
        h5 className = "font-lighter d-none mt-5" > INSTITUTION / ORGANIZATION < /h5>  <
        Form.Check label = "I am making this deposit towards my API Account as an API User"
        name = "deposit_category"
        onChange = { props.handleChange }
        type = "radio"
        className = "d-none"
        value = "institution"
        required id = "default-radio" /
        >
        <
        /
        div > < /div >  <
        h6 className = "bolder d-none p-lg-4 p-3 bg-lighter rounded-3" > This deposit is to(As per your Risk profile): < span className = "active" > { props.investmentOption } < /span> < /
        h6 > <
        h6 className = "bolder p-lg-4 p-3 bg-lighter rounded-3" > By default(if no investment class is selected) your deposit will go to: < span className = "active" > Automatic Asset Allocation < /span> < /
        h6 > <
        h6 className = "rounded-3 bk-warning text-center"
        onClick = { props.getTab9 } >
        Edit my Risk Profile before deposit < /h6> 
        <
        Form.Select className = "my-3"
        required defaultValue = "Select an investment option"
        onChange = { props.handleChange }
        name = "investment_option" > {
            props.options.map(options => {
                return <
                    option value = { options.investment_option }
                id = "investmentOption" ><h6>{ options.investment_option }</h6> < /option>
            })
        } < /
        Form.Select >
        <span className="bolder">{props.investment_option} </span>
        <h6><span className="bolder">Interest rate per year:</span> {props.interest}% <span className="mx-2"> | </span> <span className="bolder">Handler:</span> {props.handler}<span className="mx-2"> | </span> <span className="bolder">Description:</span> {props.description} </h6>
        < /
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
        div className = "p-4 rounded-4"
        key = "radio" >
        <
        div key = { `radio` }
        className = "mb-3" >
        <
        h5 className = "font-lighter d-none" > WALLET < /h5> <
        Form.Check label = "I want to deposit from my wallet to make this deposit to my personal investment account"
        name = "payment_means"
        type = "radio"
        onChange = { props.handleChange }
        value = "wallet"
        className = "d-none"
        required id = "radio" /
        >
        <
        h5 className = "font-lighter" > OFFLINE < /h5> <
        Form.Check label = "Deposit directly to our bank account and let us reconcile your account"
        name = "payment_means"
        onChange = { props.handleChange }
        type = "radio"
        value = "offline"
        required id = "radio" /
        >
        <
        h5 className = "font-lighter mt-5" > ONLINE < /h5> <
        Form.Check label = "Make an instant deposit on our platform"
        name = "payment_means"
        onChange = { props.handleChange }
        type = "radio"
        value = "online"
        required id = "radio"/
        >
        <
        /
        div > < /div > < /
        div >
    );
}

function Step3(props) {
    let min = props.minimum
    let fund = getCurrency((props.fundManagerCountry).toUpperCase()).toLowerCase()
    let curr = (props.currency).toLowerCase()
    if (props.currentStep !== 3) {
        return null
    }
    props.setConvertedAmount(Conversion(fund,min,curr))
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
            Form.Group > < /
            div >
        )
    }
    return ( <
        div className = "text-center" > <
        h6 className = "mt-2" > How much would you like to Deposit to your account ? < /h6>  <
        Form.Group className = "mb-3 bg-white p-4" >
        <
        Form.Label >< h6 className = 'm-0' > Amount to Deposit in { props.currency } < /h6>< /Form.Label>  <
        Form.Control type = "number"
        onChange = { props.handleChange }
        name = "deposit_amount"
        id = 'phone'
        required placeholder = "0.00" / ><
        p id = "errorFirst"
        className = 'p-2 rounded-2 px-3 bg-red'
        style = {
            { display: 'none' }
        } > hey < /p><
        p id = "convertedAmount"
        className = 'p-2 rounded-2 px-3 bg-red'
        style = {
            { display: 'none' }
        } > {Conversion(fund,min,curr)} < /p>
        <
        Form.Control.Feedback type = "invalid" >
        This field is required. <
        /Form.Control.Feedback> < /
        Form.Group >< /
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
            h5 className = "p-5" > Proceed to deposit < span className = "bolder" > { props.currency } < /span> < span className = "bolder" > { props.deposit_amount } < /span > plus a flat fee of < span className = "bolder" > { props.currency } < /span> <span className = "bolder">{props.fee} < /span > .Your Total deposit amount is < span className = "bolder" > { props.currency } < /span > < span className = "bolder active" > { props.total_deposit} < /span > < /
            h5 > < /
            div >
        )
    }
    if (props.payment_means === "online") {
        return ( <
            div className = "text-center" >
            <
            h5 className = "p-5" > Proceed to deposit < span className = "bolder" > { props.currency } < /span> < span className = "bolder" > { props.deposit_amount } < /span > plus a flat fee of < span className = "bolder" > { props.currency } < /span> <span className = "bolder">{props.fee} < /span > .Your Total deposit amount is < span > { props.currency } < /span > < span className = "bolder" > { props.total_deposit} < /span > < /
            h5 >
            <
            Checkout phone = { props.phone } // here the checkout form is rendered after which it returns response
            country = { props.country }
            name = { props.name }
            email = { props.email }
            amount = { props.total_deposit }
            currency = { props.getCurr }
            data = { props.data }
            submit = { props.submit }
            riskAnalysisPercentages = {props.riskAnalysisPercentages}
            / > < /
            div >
        );
    }
    return ( <
        div className = "text-center" > <
        h4 className = "font-lighter my-3" > Deposit from Wallet < /h4> <
        h6 className = "mt-2" > Confirm to Continue < /h6>   <
        h4 className = "py-5 font-lighter" > You have deposited < span className = "bolder" > { props.currency } < /span> < span className = "bolder" > { props.deposit_amount } < /span > plus a flat fee of < span className = "bolder" > { props.currency } < /span> <span className = "bolder">{props.fee} < /span > .Your Total deposit is < span className = "bolder" > { props.currency } < /span > < span className = "bolder active" > { props.total_deposit} < /span > < /
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
            h5 className = "p-4" > Deposit < span className = "bolder" > { props.currency } < /span>: <span className="bolder">{ props.total_deposit} </span >
            to our bank account and proceed to send us your deposit receipt < /
            h5 >
            <
            div className = "row p-4" >
            <
            div className = "col-5 text-start" >
            <
            h5 className = "bolder border-bottom" > Bank name < /h5> <
            h5 className = "bolder border-bottom" > Account number < /h5> <
            h5 className = "bolder border-bottom" > SWIFT CODE < /h5>  <
            h5 className = "bolder border-bottom" > Account name < /h5>< /
            div > <
            div className = "col-7 text-start" >
            <
            h5 className = "font-lighter border-bottom" > DIAMOND TRUST BANK < /h5>  <
            h5 className = "font-lighter border-bottom" > 0190514001 < /h5> <
            h5 className = "font-lighter border-bottom" > DTKEUGKAXXX < /h5><
            h5 className = "font-lighter border-bottom" > CYANASE TECHNOLOGY AND INVESTMENT LTD < /h5> < /
            div > <
            /div>  <
            h6 className = "p-4 status my-3" > Send your deposit receipt to our Email: <
            span className = "bolder active" > < u > 'deposit@cyanase.com' < /u> < /span > < /h6>  < /
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
            required placeholder =
            " 10,000" / >
            <
            Form.Control.Feedback type = "invalid" >
            This field is required. <
            /Form.Control.Feedback> < /
            Form.Group > < /
            div >
        );
    }

    function Step6(props) {
        if (props.step !== 6) {
            return null
        }
        return ( < div >
            <
            h6 className = "text-center my-3" > Select the Sacco Group / Investment Club you wish to deposit to: Only groups and clubs you belong to are listed here. < /h6> <
            div className = "row text-start px-3 my-3" >
            <
            div className = "col-1" >
            <
            Form.Check onChange = { props.handleChange }
            type = "radio"
            name = "category_name"
            className = "mt-4"
            required id = "default-radio" /
            >
            <
            /div> <
            div className = "col-11 py-3" >
            <
            div className = "row" >
            <
            div className = "col-3" > <
            img src = { Profile1 }
            width = '90%'
            height = '90%'
            alt = "investors" / > < /div> <
            div className = "col-9" > < h6 className = "mt-3" > MUBS SACCO < /h6> < /div > < /
            div > <
            /div> < /
            div > <
            /div>)
        }
        export default Learn1;