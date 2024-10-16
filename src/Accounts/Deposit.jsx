import React from "react";
import { ChevronRight, ChevronUp, InfoCircle } from 'react-iconly';
import Form from 'react-bootstrap/Form';
import Profile1 from '../images/Ellipse 178.png';
import Button from "react-bootstrap/Button";
import { preloader, autoClickable } from "../Api/RequestFunctions";
import Checkout from "../payment/checkout";
import { getCurrency } from "../payment/GetCurrency";
import { useState } from 'react';
import { useForm } from "react-hook-form";
import { ValidateForms } from "../Auth/ValidateForms";
import axios from "axios";
import { API_URL_GET_INVESTMENT_OPTION, TOKEN, API_URL_GET_INVESTMENT_CLASS_OPTIONS } from "../apis";
import Conversion from "../payment/conversion";
import ResRiskProfile from './ResRiskProfile'
import InputGroup from 'react-bootstrap/InputGroup';
import { FaArrowDown, FaArrowRight } from "react-icons/fa";

function Deposit(props) {
    const globalRefId = "";
    const [step, setStep] = useState(2)
    const [minimum, setMinimum] = useState(0)
    const [convertedAmount, setConvertedAmount] = useState(0)
    const [riskProfile, setRiskProfile] = useState(false);
    const [id, setId] = useState()
    const [fundManagerCountry, setFundManagerCountry] = useState('')
    const [interest, setInterest] = useState()
    const [handler, setHandler] = useState()
    const [description, setDescription] = useState()
    const [optionName, setOptionName] = useState()
    const [formData, setFormData] = useState({
        "payment_means": 'online',
        "deposit_amount": 0,
        "investment_id": 0,
        "currency": getCurrency(props.country),
        "investment_option": '',
        "investment_class": "",
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
                    setOptionName(res.data[0].investment_option)
                    setInterest(res.data[0].interest);
                    setHandler(res.data[0].handler);
                    setDescription(res.data[0].description);
                    _next()
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
    if(formData.investment_option !== ""){
        convert()
    }
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
        if (step === 2) {
            return null
        }
        if (step !== 1) {
            return ( 
                <h6 className = " text-start warning rounded-3 mt-3"
                type = "button"
                onClick = { _prev } >
                Previous </h6>
            )
        }
        return null;
    }
    const submitButton = () => {
        let payment_means = formData.payment_means;

        if (step === 6 && payment_means === "online") {
            return ( 
                <div className = ' text-center' > 
                <h6 id = "errorMessage"
                className = 'py-2 mt-3 mx-3 rounded border border-danger text-center'
                style = {
                    { display: 'none' }
                } > hey </h6> 
                <h6 id = "infoMessage"
                className = 'py-2 mt-3 mx-3 rounded warning-message text-center'
                style = {
                    { display: 'none' }
                } > hey </h6>   
                <h5 style = {
                    { display: 'block' }
                }
                onClick={()=> autoClickable()}
                className = 'rounded-3 bg-lighter bluey mx-5 p-2 text-center my-2'
                id = 'successMessage' >
                Click make payment to continue </h5> 
                </div>
            )
        }
        return null
    }
    const nextButton = () => {
        let payment_means = formData.payment_means;
        if(step === 2){
            return null
        }
        if (step === 3) {
            function setOptionFormData (){
                formData.investment_option = optionName
                formData.investment_class = props.setClass
                formData.investment_id = props.setId
                _next()
            }
            return ( 
                <h6 className = " my-2 mb-4 p-2 text-end btn btn-warning"
                onClick = { () => setOptionFormData() } >
                Invest with this option 
                </h6>        
            )
        }
        if (step === 4 && payment_means === "offline") {
            return ( 
                <h6 className = " my-2 text-end btn-warning btn"
                type = "button"
                onClick = { _next } >
                Continue 
                </h6>        
            )
        }
        if (step === 5) {
            return ( 
                <h6 className = " my-2 text-end warning rounded-3"
                onClick = { () => validate1(minimum, id, fundManagerCountry) } >
                Next 
                </h6>        
            )
        }
        if (step === 6 && payment_means === "offline") {
            return ( 
                <h6 className = " my-2 btn btn-warning"
                onClick = { _next } >
                Continue to Deposit Offline 
                </h6>        
            )
        }
        if (step === 6 && payment_means === "online") {
            return null
        }
        if (step < 7) {
            return ( 
                <h6 className = " my-2 text-end warning rounded-3"
                onClick = { _next } >
                Next 
                </h6>        
            )
        }
        return null
    }
    if (riskProfile === true) {
        return ( < ResRiskProfile changeRiskProfileSetting = { setRiskProfile }
            / >
        )
    }
    return ( 
        <React.Fragment >
        <form className = "text-center pb-5"
        onSubmit = { handleSubmit(onSubmit) } > {
            /* 
                      render the form steps and pass required props in
                    */
        } <div className="d-none d-md-block d-lg-block px-3 rounded-top-3"><h3 className=" py-4">Invest/Deposit</h3></div> 
        <Step2 currentStep = { step }
        className = {props.setClass}
        classDescription = {props.setDescription}
        classOptions = {props.setOptions}
        classLogo = {props.setLogo}
        getOptionDetails = {getOptionDetails}
        />
        <Step3 currentStep = { step }
        setStep = {setStep}
        className = {props.setClass}
        classDescription = {props.setDescription}
        interest = { interest }
        description = { description }
        handler = { handler }
        classLogo = {props.setLogo}
        handleChange = { handleChange }
        optionName = {optionName}
        /> 
        <Step4 currentStep = { step }
        handleChange = { handleChange }
        />
        <Step5 currentStep = { step }
        handleChange = { handleChange }
        currency = { formData.currency }
        payment_means = { formData.payment_means }
        minimum = { minimum }
        fundManagerCountry = { fundManagerCountry }
        setConvertedAmount = { setConvertedAmount }
        /> 
        <Step6 currentStep = { step }
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
        /> 
        <Step7 currentStep = { step }
        handleChange = { handleChange }
        payment_means = { formData.payment_means }
        total_deposit = { getTotalDeposit() }
        currency = { formData.currency }
        getCurr = { getCurrency(props.country) }
        />  <Step8  currentStep = { step }
        handleChange = { handleChange }
        />  { previousButton() }{ nextButton() }{submitButton()}
        </form> 
        </React.Fragment>
    );
}
function Step2(props) {
    if (props.currentStep !== 2) {
        return null
    }
    if(props.classOptions.length !== 0){
    return ( 
        <div className = "bg-white px-3 text-dark" > 
        <h6 className = "my-3 d-none d-md-block d-lg-block" > Select an Investment Option </h6> 
        <h5 className = "text-start my-3 d-lg-none d-md-none d-sm-block mt-5 pt-4" > Select an Investment Option under class: {props.className}</h5> 
        <div className="bg-light row m-1 p-2 rounded-3">
            <div className="col-2"><img src={props.classLogo} width={30} height={40} alt="logo"/></div>
            <div className="col-10 text-start">
                <h5 className="m-2"><div className="bolder">{props.className}</div>{props.classDescription}</h5>
            </div>
        </div>
        
        {
            props.classOptions.map((options, id) => {
                return <div key={id} className="row m-2 border rounded-3"><div className="col-10 p-3 text-start"><h5>{options.investment_option}</h5></div><div className="col-2 black-hover rounded-end-3 p-3" onClick={()=> props.getOptionDetails(options.investment_option) }><ChevronRight set="broken"/></div></div>
                        
            })
        }
        </div>
    );}
    else {
        return(
            <div className = "bg-white px-3 text-dark text-start" > 
            <h6 className = " my-3 d-none d-md-block d-lg-block" > Select an Investment Option </h6> 
            <h5 className = "text-start my-3 d-lg-none d-md-none d-sm-block mt-5 pt-4" > Select an Investment Option </h5> 
        <div className="bg-light row m-2 px-3 rounded-3">
            <div className="col-2 my-3"><img src={props.classLogo} width={30} height={40} alt="logo"/></div>
            <div className="col-10 mt-3 text-start">
                <h6><span className="bolder">{props.className}</span><p className="small">{props.classDescription}</p></h6>
            </div>
        </div>
        <div className="mt-2 py-3 text-start row">
        <div className="col-2"><InfoCircle/></div>
        <div className="col-10">
            <h6 className="bolder">Unfortunately we dont have any investment options under {props.className} at the moment. Please try our other classes for more options. <br/><br/> Thank you</h6></div>
        </div>
        </div>
        )
    }
}
function Step3(props) {
    if (props.currentStep !== 3) {
        return null
    }
    return ( 
        <div className = "bg-white px-3 text-dark" > 
        <h6 className = " my-3 d-none d-md-block d-lg-block" > Select an Investment Option </h6> 
        <h5 className = "text-start my-3 d-lg-none d-md-none d-sm-block mt-5 pt-4" > Invest in {props.optionName}? </h5> 
        <div className="bg-light row p-2 mx-1 rounded-3">
            <div className="col-2"><img src={props.classLogo} width={30} height={40} alt="logo"/></div>
            <div className="col-10 text-start">
                <h5 className="mt-2"><div className="bolder">{props.className}</div>{props.classDescription}</h5>
            </div>
        </div>
        <div className="row py-3 mx-1 mt-2"><div className="col-10 text-start"><h5>{props.optionName}</h5></div><div className="col-2"><ChevronUp onClick={()=> props.setStep(2)}/></div></div>
        <div className="border-top row py-2 mx-2 text-start">
            <h6 className="bolder mt-2">Description:
            <h5 className="">{props.description}</h5></h6>
            <h6 className="bolder">Handler:
            <h5 className="">{props.handler}</h5></h6>
            <h6 className="bolder">Annual Return:
            <h5 className="">{props.interest}%</h5></h6>
        </div>
        </div>
    );
}
function Step4(props) {
    if (props.currentStep !== 4) {
        return null
    }
    return ( 
        <div className = " text-start" > 
        <h6 className = "text-center my-3 d-none d-md-block d-lg-block" > Choose your payment means </h6> 
        <h5 className = "text-center my-2 d-lg-none d-md-none d-sm-block mt-5 pt-4" > Choose your payment means </h5>  
        <div className = "p-4 rounded-4"
        key = "radio" >
        <div key = { `radio` }
        className = "mb-3 radio-warning" >
        <Form.Label > OFFLINE </Form.Label>  
        <Form.Check label = "Deposit directly to our bank account and let us reconcile your account"
        name = "payment_means"
        onChange = { props.handleChange }
        type = "radio"
        value = "offline"
        required id = "radio" />
        </div> 
        <div key = { `radio1` }
        className = "mb-3 radio-warning" >
        <Form.Label > ONLINE </Form.Label>
        <Form.Check label = "Make an instant deposit on our platform"
        name = "payment_means"
        onChange = { props.handleChange }
        type = "radio"
        value = "online"
        required id = "radio1"/>
        </div> 
        </div> 
        </div>
    );
}

function Step5(props) {
    let min = props.minimum
    let fund = getCurrency((props.fundManagerCountry).toUpperCase()).toLowerCase()
    let curr = (props.currency).toLowerCase()
    if (props.currentStep !== 5) {
        return null
    }
    props.setConvertedAmount(Conversion(fund,min,curr))
    if (props.payment_means === "wallet") {
        return ( 
            <div className = "text-center"> 
            <h4 className = "font-lighter my-3" > Deposit from Wallet </h4> 
            <h4 className = "py-3 bolder" > Wallet Balance: <span className = "font-lighter" > <span> { props.currency } </span> 0.00 </span>
            </h4> 
            <Form.Group className = "mb-3 bg-white shadow-sm p-3 p-5" >
            <Form.Label > Amount to Deposit in { props.currency } </Form.Label>  
            <Form.Control type = "number"
            onChange = { props.handleChange }
            name = "deposit_amount"
            id = 'phone'
            required placeholder = "0.00" />
            <p id = "errorFirst"
            className = 'p-2 rounded-2 px-3 bg-red'
            style = {
                { display: 'none' }
            } > hey </p>
            <Form.Control.Feedback type = "invalid" >
            This field is required. 
            </Form.Control.Feedback> 
            </Form.Group> 
            </div>
        )
    }
    return ( 
        <div className = "text-center" >  
            <Form.Group className = "my-3 bg-white mt-5 p-4" >
            <Form.Label ><h5 className = 'm-0' > How much would you like to deposit? </h5></Form.Label>
            <InputGroup className="my-3">
            <InputGroup.Text id="basic-addon1">{props.currency}</InputGroup.Text>
            <Form.Control type = "number"
            onChange = { props.handleChange }
            name = "deposit_amount"
            id = 'phone'
            required placeholder = "0.00" />
            <div className="w-100 mt-2">
            <p id = "errorFirst"
            className = 'p-2 rounded-2 px-3 bg-red'
            style = {
                { display: 'none' }
            } > hey </p>
            <p id = "convertedAmount"
            className = 'p-2 rounded-2 px-3 bg-red'
            style = {
                { display: 'none' }
            } > {Conversion(fund,min,curr)} </p></div>
            <Form.Control.Feedback type = "invalid" >
            This field is required
            </Form.Control.Feedback> 
            </InputGroup>
            </Form.Group>
        </div>
    );
}

function Step6(props) {
    if (props.currentStep !== 6) {
        return null
    }
    if (props.payment_means === "offline") {
        return ( 
            <div className = "text-center" > 
            <h6 className = "text-center my-3 d-none d-md-block d-lg-block" > Deposit Offline </h6> 
            <h6 className = "text-center my-2 d-lg-none d-md-none d-sm-block mt-5 pt-4" > Deposit Offline </h6>   
            <h5 className = "p-5" > Proceed to deposit < span className = "bolder" > { props.currency } </span> 
            <span className = "bolder" > { props.deposit_amount } </span> plus a flat fee of <span className = "bolder" > { props.currency } </span> 
            <span className = "bolder">{props.fee} </span> .Your Total deposit amount is <span className = "bolder" > { props.currency } </span> 
            <span className = "bolder active" > { props.total_deposit} </span> 
            </h5> 
            </div>
        )
    }
    if (props.payment_means === "online") {
        return ( 
            <div className = "text-center" >
            <h6 className = "text-center my-3 d-none d-md-block d-lg-block" > Deposit Online </h6> 
            <h6 className = "text-center my-2 d-lg-none d-md-none d-sm-block mt-5 pt-4" > Deposit Online </h6> 
            <h5 className = "p-5" > Proceed to deposit < span className = "bolder" > { props.currency } </span> 
            <span className = "bolder" > { props.deposit_amount } </span> plus a flat fee of 
            <span className = "bolder" > { props.currency } </span> <span className = "bolder">{props.fee} </span> .Your Total deposit amount is 
            <span> { props.currency } </span> 
            <span className = "bolder" > { props.total_deposit} </span> </h5>
            <Checkout phone = { props.phone } // here the checkout form is rendered after which it returns response
            country = { props.country }
            name = { props.name }
            email = { props.email }
            amount = { props.total_deposit }
            currency = { props.getCurr }
            data = { props.data }
            submit = { props.submit }
            riskAnalysisPercentages = {props.riskAnalysisPercentages}
            /> 
            </div>
        );
    }
    return ( 
        <div className = "text-center" > 
        <h4 className = "font-lighter my-3" > Deposit from Wallet </h4> 
        <h6 className = "mt-2" > Confirm to Continue </h6>   
        <h4 className = "py-5 font-lighter" > You have deposited 
        <span className = "bolder" > { props.currency } </span> 
        <span className = "bolder" > { props.deposit_amount } </span> plus a flat fee of 
        <span className = "bolder" > { props.currency } </span> 
        <span className = "bolder">{props.fee} </span> .Your Total deposit is 
        <span className = "bolder" > { props.currency } </span> 
        <span className = "bolder active" > { props.total_deposit} </span> 
        </h4> 
        </div>
    )
}

function Step7(props) {
    if (props.currentStep !== 7) {
        return null
    } else if (props.payment_means === "offline") {
        return ( 
            <div className = "text-center" > 
            <h4 className = "bolder my-3" > Make an Offline Deposit </h4> 
            <h6 className = "mt-2" > Procedure </h6>   
            <h5 className = "p-4" > Deposit 
            <span className = "bolder" > { props.currency } </span>: <span className="bolder">{ props.total_deposit} </span>
            to our bank account and proceed to send us your deposit receipt </h5>
            <div className = "row p-4" >
            <div className = "col-5 text-start" >
            <h5 className = "bolder border-bottom" > Bank name </h5> 
            <h5 className = "bolder border-bottom" > Account number </h5> 
            <h5 className = "bolder border-bottom" > SWIFT CODE </h5>  
            <h5 className = "bolder border-bottom" > Account name </h5>
            </div> 
            <div className = "col-7 text-start" >
            <h5 className = "font-lighter border-bottom" > DIAMOND TRUST BANK </h5>  
            <h5 className = "font-lighter border-bottom" > 0190514001 </h5> 
            <h5 className = "font-lighter border-bottom" > DTKEUGKAXXX </h5>
            <h5 className = "font-lighter border-bottom" > CYANASE TECHNOLOGY AND INVESTMENT LTD </h5> </div> 
            </div>  
            <h6 className = "p-4 status my-3" > Send your deposit receipt to our Email: 
            <span className = "bolder active" > <u> 'deposit@cyanase.com' </u> </span > </h6>  
            </div>
        )
    } else if (props.payment_means === "online") {
        return ( <h1 className = "py-5" > FlutterWave </h1>)
        }
        return ( 
            <div className = "text-center" > 
            <h6 className = "mt-2" > How much would you like to Deposit to your account ? </h6> 
            <Form.Group className = "mb-3 bg-white shadow-sm p-3 p-5" >
            <Form.Label > Amount to Deposit </Form.Label>  
            <Form.Control type = "number"
            onChange = { props.handleChange }
            name = "deposit_amount"
            id = 'phone'
            required placeholder =" 10,000" />
            <Form.Control.Feedback type = "invalid" >
            This field is required. </Form.Control.Feedback> </Form.Group> 
            </div>
        );
    }

    function Step8(props) {
        if (props.step !== 8) {
            return null
        }
        return ( 
            <div>
            <h6 className = "text-center my-3" > Select the Sacco Group / Investment Club you wish to deposit to: Only groups and clubs you belong to are listed here. </h6> 
            <div className = "row text-start px-3 my-3" >
            <div className = "col-1" >
            <Form.Check onChange = { props.handleChange }
            type = "radio"
            name = "category_name"
            className = "mt-4"
            required id = "default-radio" />
            </div> 
            <div className = "col-11 py-3" >
            <div className = "row" >
            <div className = "col-3" > 
            <img src = { Profile1 }
            width = '90%'
            height = '90%'
            alt = "investors" /> </div> 
            <div className = "col-9" > < h6 className = "mt-3" > MUBS SACCO </h6> </div> 
            </div> </div> </div> 
            </div>)
        }
        export default Deposit;