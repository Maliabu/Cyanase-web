import React, { useState } from "react";
import { AddUser, Wallet } from 'react-iconly';
import Form from 'react-bootstrap/Form';
import DepositPic from '../images/deposit.png';
import Button from "react-bootstrap/esm/Button";
import ProgressBar from 'react-bootstrap/ProgressBar';
import { getCurrency } from "../payment/GetCurrency";
import { useForm } from "react-hook-form";
import GoalDeposit from "../payment/GoalDeposit";
import { autoClickable } from "../Api/RequestFunctions";
import { ValidateForms } from "../Auth/ValidateForms";
import { API_URL_GOAL_BANK_WITHDRAW, API_URL_GOAL_MM_WITHDRAW, TOKEN } from "../apis";
import axios from "axios";
import { preloader, fail, catch_errors, success } from "../Api/RequestFunctions";
import { InputGroup } from "react-bootstrap";

function Goal(props) {
    const [step, setStep] = useState(0)
    const [message, setMessage] = useState("deposit")
    let currency = getCurrency(props.country)
    const [formData, setFormData] = useState({
        "payment_means": 'online',
        "deposit_amount": 0,
        "currency": currency,
        "investment_option": "Automatic Asset Allocation",
        "deposit_category": "personal",
        "account_type": "",
        "goal_id": props.id,
        "reference": "",
        "reference_id": 0,
        "tx_ref": "CYANASE-TEST-001",
        "withdraw_amount": 0,
        "withdraw_channel": "bank",
        "phone_number": "",
        "account_number": "",
        beneficiary_name: props.fullname,
        "account_bank": "MPS"
    })
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setFormData({...formData, [name]: value });
    }
    const getTotalDeposit = () => {
        let total_deposit = parseFloat(getFee()) + parseFloat(formData.deposit_amount)
        return total_deposit
    }
    const getFee = () => {
        let fee = ((1.4 / 100) * formData.deposit_amount).toFixed(2)
        return fee
    }
    const getName = () => {
        let goalName = props.name
        let goalId = props.id
        let goalNewNetworth = 0
        let goalNetworth = parseInt(props.networth)
        let goalAmount = parseInt(props.amount)
        let deposit = parseInt(props.deposit)
        let created = (props.created).slice(0, 10)
        let picture = props.goalPicture
        let percent = 100
        let progress = (percent - ((goalAmount - deposit) / goalAmount * percent)).toFixed(2)
        if (isNaN(goalNetworth)){
            goalNewNetworth = 0
        } else{
            goalNewNetworth = goalNetworth
        }
        return [goalName, goalAmount, deposit, created, progress, percent, goalId, goalNewNetworth, picture]
    }
    const { handleSubmit } = useForm();
    const getAccountType = () => {
        let currency = formData.currency
        let accountType = formData.account_type
        if (currency === getCurrency(props.country)) {
            accountType = "basic"
        } else {
            accountType = "dollar"
        }
        return accountType
    }

    const validate1 = () => {
        let depositAmount = ValidateForms("deposit_amount")

        if (depositAmount.length === 0) {
            document.getElementById("errorFirst").style.display = "block"
            document.getElementById("errorFirst").style.color = "crimson"
            document.getElementById("errorFirst").innerText = "deposit amount is required"
        } else {
            document.getElementById("errorFirst").style.display = "none"
            _next()
        }
    }
    formData.account_type = getAccountType()
    formData.currency = getCurrency(props.country)

    const validate2 = () => {
        let withdrawAmount = ValidateForms("withdraw_amount")
        let networth = parseInt(getName()[7])
        let currency = formData.currency
        let withdraw_amount = formData.withdraw_amount

        if (withdrawAmount.length === 0) {
            document.getElementById("errorFirst").style.display = "block"
            document.getElementById("errorFirst").style.color = "crimson"
            document.getElementById("errorFirst").innerText = "withdraw amount is required"
        }
        else {
            document.getElementById("errorFirst").style.display = "block"
            document.getElementById("errorFirst").style.color = "crimson"
            document.getElementById("errorFirst").innerText = "Please withdraw "+currency+" "+networth.toLocaleString()
        }
        if (withdraw_amount === networth){
            document.getElementById("errorFirst").style.display = "none"
            _next()
        }
    }
    const validate3 = () => {
        let withdrawChannel = formData.withdraw_channel

        if(withdrawChannel === "bank"){
            let AccNumber = ValidateForms("account_number")
            if (AccNumber.length === 0) {
                document.getElementById("errorAcc").style.display = "block"
                document.getElementById("errorAcc").style.color = "crimson"
                document.getElementById("errorAcc").innerText = "account number is required"
            } else {
                document.getElementById("errorAcc").style.display = "none"
                onSubmit1()
            }
        } else{
            let PhoneNumber = ValidateForms("phone_number")
            if (PhoneNumber.length === 0) {
                document.getElementById("errorPhone").style.display = "block"
                document.getElementById("errorPhone").style.color = "crimson"
                document.getElementById("errorPhone").innerText = "phone number is required"
            } else {
                document.getElementById("errorPhone").style.display = "none"
                onSubmit1()
            }
        }
    }
    function onSubmit(){}
    function onSubmit1() {
        preloader()
        let form_data = new FormData();
        form_data.append('withdraw_channel', formData.withdraw_channel);
        form_data.append('currency', formData.currency);
        form_data.append('withdraw_category', formData.deposit_category);
        form_data.append('withdraw_amount', formData.withdraw_amount);
        form_data.append('account_type', getAccountType());
        form_data.append('investment_id', formData.investment_id);
        form_data.append('goal_id', props.id)
        if (formData.withdraw_channel === "bank") {
            form_data.append('account_number', formData.account_number)
            form_data.append('account_bank', formData.account_bank)
            form_data.append('beneficiary_name', formData.beneficiary_name)
            axios.post(`${API_URL_GOAL_BANK_WITHDRAW}`, form_data, {
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

        if (formData.withdraw_channel === "mobile money") {
            form_data.append('phone_number', formData.phone_number)
            form_data.append('account_bank', "MPS")
            form_data.append('beneficiary_name', props.fullname)
            axios.post(`${API_URL_GOAL_MM_WITHDRAW}`, form_data, {
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
    const _next = () => {
        setStep(step + 1)
    }
    const _withdraw = () => {
        setStep(step + 5)
        setMessage("withdraw")
    }
    const withdrawMessage = () => {
        let progress = getName()[4]
        let percentage = getName()[5]
        if (progress === percentage){
            return ( <
                h6 className = "p-2 status rounded-3 text-center" > You can withdraw once you have achieved your goal at 100 % < /h6>
            )
        } else return null
    }
    const _prev = () => {
        setStep(step - 1)
    }
    const _prevwithdraw = () => {
        setStep(0)
    }
    const checkWithdrawStatus = () => {
        let goalAmount = parseInt(props.amount)
        let deposit = parseInt(props.deposit)
        let networth = parseInt(props.networth)
        if (networth === 0 || props.status === false) { return null } else if (goalAmount === deposit && props.status === true && networth > 0) {
            return ( <
                h6 className = " btn btn-warning mt-3 text-center"
                type = "button"
                onClick = { _withdraw } >
                withdraw <
                /h6>        
            )
        } else return null
    }
    const submitButton = () => {
        let payment_means = formData.payment_means
        if (step === 2 && payment_means === "online") {
            return ( <
                div className = 'mx-3 text-center rounded-4' > <
                h6 id = "errorMessage"
                className = 'py-2 mt-3 rounded border border-danger text-center'
                style = {
                    { display: 'none' }
                } > hey < /h6> <
                h6 id = "infoMessage"
                className = 'py-2 mt-3 rounded warning-message text-center'
                style = {
                    { display: 'none' }
                } > hey < /h6>  <
                Button variant = "warning"
                className = 'shadow text-center my-2'
                id = 'successMessage'
                onClick = { ()=>autoClickable() }
                type = "button" >
                Submit <
                /Button> < /
                div >
            )
        }
        if (step === 7) {
            return ( <
                div className = 'mx-3 text-center rounded-4' > <
                h6 id = "errorMessage"
                className = 'py-2 mt-3 rounded border border-danger text-center'
                style = {
                    { display: 'none' }
                } > hey < /h6> <
                h6 id = "infoMessage"
                className = 'py-2 mt-3 rounded warning-message text-center'
                style = {
                    { display: 'none' }
                } > hey < /h6>  <
                Button variant = "warning"
                className = 'shadow text-center my-2'
                id = 'successMessage'
                onClick = { ()=>validate3() }
                type = "button" >
                Submit <
                /Button> < /
                div >
            )
        }
        return null
    }
    const previousButton = () => {
        if (step === 5 && message === "withdraw"){
            return ( <
                h6 className = " warning text-start rounded-3"
                type = "button"
                onClick = { () => {setStep(0)} } >
                Previous <
                /h6>
            )
        }
        if (step === 7) {
            return ( <
                h6 className = " warning text-start rounded-3"
                type = "button"
                onClick = { _prevwithdraw } >
                Previous <
                /h6>
            )
        }
        if (step !== 0) {
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
    const heading = () => {
        if (step === 0) {
            return null
        }
        if (step === 5 || step === 6 || step === 7) {
            return (<div className="p-3"><h3 className=" mt-2">Withdraw<span className="bg-lighter p-2 row justify-content-center">{props.name} - Networth: {formData.currency} {(props.networth).toLocaleString()}</span></h3></div> )
        }
        return ( < div className="p-3 cards rounded-top-3">
            <img src = {getName()[8]}
            className = "rounded-circle object-fit-cover img-head-goal"
            alt = "goal"/>
            <h4 className="mt-2 d-none">Deposit to: <span className="row bg-lighter p-2 mt-1 justify-content-center">{props.name}</span></h4> <
            Wallet className = "rounded-circle d-none warning p-2"
            size = "xlarge" / ><
            img src = { DepositPic }
            width = '25%'
            className = "my-3 d-none"
            height = '80%'
            alt = "investors" / > < /div>
        )
    }

    const nextButton = () => {
        let payment_means = formData.payment_means;
        let goalAmount = parseInt(props.amount)
        let deposit = parseInt(props.deposit)
        let goalName = props.name
        let networth = props.networth
        if (step === 0 && props.status === false) {
            return ( <
                h6 className = " text-end my-1 mx-5 p-2 text-center status rounded-3">
                This goal is inactive <
                /h6>        
            )
        }
        if (step === 0 && goalAmount !== deposit && props.status !== false) {
            return ( <
                h6 className = " my-2 btn btn-warning"
                type = "button"
                onClick = { _next } >
                Deposit to goal <
                /h6>        
            )
        } else if (step === 0 && goalAmount === deposit && networth <= 0) {
            return ( <
                h6 className = "p-2 my-1 bg-lighter grey-text text-center rounded-3 mx-5"
                type = "button" >
                Goal Done: Your networth needs to mature before withdraw <
                /h6>        
            )
        } else if (step === 0 && goalAmount === deposit && networth > 0) {
            return ( <
                h6 className = "p-2 my-1 status text-center rounded-3 mx-5"
                type = "button" >
                Congrats!!...You can now { goalName } <
                /h6>        
            )
        }
        if (step === 1) {
            return ( <
                h6 className = " my-2 text-end warning rounded-3"
                type = "button"
                onClick = { ()=>validate1() } >
                Next <
                /h6>        
            )
        }
        if (step === 2) {
            return null
        }
        if (step === 4 && payment_means === "offline") {
            return ( <
                h6 className = " my-2 btn btn-warning"
                type = "button"
                onClick = { _next } >
                Continue <
                /h6>        
            )
        }
        if (step === 5) {
            return ( <
                h6 className = " my-2 text-center warning rounded-3"
                type = "button"
                onClick = { _next } >
                Next <
                /h6>        
            )
        }
        if (step === 6) {
            return ( <
                h6 className = " my-2 text-center warning rounded-3"
                type = "button"
                onClick = { () => validate2() } >
                Next <
                /h6>        
            )
        }
        if (step === 4 && payment_means === "wallet") {
            return ( <
                h6 className = " my-2 btn btn-warning"
                type = "button" >
                OK <
                /h6>        
            )
        }
        if (step < 4 && props.status !== false) {
            return ( <
                h6 className = " text-end my-2 warning rounded-3"
                onClick = { _next } >
                Next <
                /h6>        
            )
        }
        return null;
    }

    return ( <
        React.Fragment >
        <
        form className = "text-center"
        onSubmit = { handleSubmit } > {
            /* 
                      render the form steps and pass required props in
                    */
        } { heading() } <
        Step0 currentStep = { step }
        handleChange = { handleChange }
        name = { getName()[0] }
        amount = { getName()[1] }
        deposit = { getName()[2] }
        created = { getName()[3] }
        progress = { getName()[4] }
        percent = { getName()[5] }
        networth = { getName()[7] }
        goalPicture = {getName()[8]}
        currency = { formData.currency }
        next = { checkWithdrawStatus() }
        withdrawMessage = { withdrawMessage}
        /> <
        Step1 currentStep = { step }
        deposit_category = { formData.deposit_category }
        handleChange = { handleChange }
        currency = { formData.currency }
        goalPicture = {getName()[8]}
        investmentoption = { props.option }
        /> <
        Step2 currentStep = { step }
        handleChange = { handleChange }
        payment_means = { formData.payment_means }
        phone = { props.phone }
        email = { props.email }
        name = { props.lastname }
        country = { props.country }
        data = { formData }
        submit = { onSubmit }
        getCurr = { getCurrency(props.country) }
        deposit_amount = { formData.deposit_amount }
        total_deposit = { getTotalDeposit() }
        fee = {
            getFee()
        }
        currency = { formData.currency }
        />  <
        Step3 currentStep = { step }
        handleChange = { handleChange }
        currency = { formData.currency }
        payment_means = { formData.payment_means }
        /> <
        Step4 currentStep = { step }
        handleChange = { handleChange }
        payment_means = { formData.payment_means }
        phone = { props.phone }
        email = { props.email }
        name = { props.lastname }
        country = { props.country }
        data = { formData }
        submit = { onSubmit }
        getCurr = { getCurrency(props.country) }
        deposit_amount = { formData.deposit_amount }
        total_deposit = { getTotalDeposit() }
        fee = {
            getFee()
        }
        currency = { formData.currency }
        /> <
        Step5 currentStep = { step }
        handleChange = { handleChange }
        payment_means = { formData.payment_means }
        total_deposit = { getTotalDeposit() }
        currency = { formData.currency }
        networth = { getName()[7] }
        />  <Step6  currentStep = { step }
        handleChange = { handleChange }
        currency = { formData.currency }
        /> <Step7  currentStep = { step }
        handleChange = { handleChange }
        goalid = { formData.goal_id }
        phone = { props.phone }
        fullname = { props.fullname }
        networth = { getName()[7] }
        country = { props.country }
        withdraw_channel = {formData.withdraw_channel}
        options = {props.banks}
        /> { previousButton() }{ nextButton() } { submitButton() } < /
        form >
        <
        /
        React.Fragment >
    );

}

function Step0(props) {
    if (props.currentStep !== 0) {
        return null
    }
    if (props.id === "personal") {
    }
    return ( 
        <div className = "bg-white rounded-4" > 
        <div className = "row" >
        <div className = " text-start" >
        <div className = "row" >
        <div className="img-back">
        <img src = {props.goalPicture}
        height="100%"
        width="100%"
            className = "object-fit-cover"
            alt = "goal"/>
        </div>
        <div className="m-3">
        <h3 className="bolder"> {props.name} 
        <p className="bluey"> created {props.created} </p></h3> </div> </div>
        <div className = "row py-3 mx-2" >
        <h5 className=" mb-1 bluey"> Progress: < span className = "font-light" > {
            props.progress
        } % </span> </h5 >
        <ProgressBar now = { props.progress }
        className="progress-sm"
        max={props.percent}
        variant = "#ff8a00" />
        </div> 
        <div className="rounded-3 m-3">
        <div className="row">
            <div className="col-7 bluey"><h5 > Goal Amount: </h5></div>
            <div className="col-5">
            <h5 className = "px-2 bolder" >{ props.currency }  { (props.amount).toLocaleString() } </h5></div>
        </div>
        <div className="row">
            <div className="col-7 bluey"><h5> Total Deposit Made: </h5></div>
            <div className="col-5">
            <h5 className = "px-2 bolder"> { props.currency } { (props.deposit).toLocaleString() } </h5></div>
        </div>
        <div className="row">
            <div className="col-7 bluey"><h5 > Networth: </h5></div>
            <div className="col-5">
            <h5 className = "px-2 bolder" > { props.currency } { (props.networth).toLocaleString() } </h5></div>
        </div></div> {props.withdrawMessage} 
        </div > </div > </div >
    );
}

function Step3(props) {
    if (props.currentStep !== 3) {
        return null
    }
    if (props.id === "personal") {
    }
    return ( <
        div className = " text-start" > <
        h6 className = "mt-2 text-center" > Choose where you wish to make your deposit. < /h6> <
        div className = "p-3 rounded-4 mt-3"
        key = "radio" >
        <
        div key = { `default-radio` }
        className = "mb-3" >
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
        h5 className = "font-lighter mt-5 d-none" > SACCO GROUP / INVESTMENT CLUB < /h5> <
        Form.Check label = "I want to deposit to my Sacco Group or Investment Club"
        name = "deposit_category"
        onChange = { props.handleChange }
        className = "d-none"
        type = "radio"
        value = "sacco/club"
        required id = "default-radio" /
        >
        <
        h5 className = "font-lighter mt-5 d-none" > INSTITUTION / ORGANIZATION < /h5>  <
        Form.Check label = "I am making this deposit towards my API Account as an API User"
        name = "deposit_category"
        className = "d-none"
        onChange = { props.handleChange }
        type = "radio"
        value = "institution"
        required id = "default-radio" /
        >
        <
        /
        div > <
        h6 className = "bolder p-lg-4 p-3 bg-light rounded-3" > This deposit is to(As per your Risk profile): < span className = "active" > Cash | Venture | Credit < /span> < /
        h6 > < /div > < /
        div >
    );
}

function Step4(props) {
    if (props.currentStep !== 4) {
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
        Form.Check label = "I want to deposit from my wallet to make this deposit to my personal investment account"
        name = "payment_means"
        type = "radio"
        className = "d-none"
        onChange = { props.handleChange }
        value = "wallet"
        required id = "default-radio" /
        >
        <
        h5 className = "font-lighter" > OFFLINE < /h5> <
        Form.Check label = "Deposit directly to our bank account and let us reconcile your account"
        name = "payment_means"
        onChange = { props.handleChange }
        type = "radio"
        value = "offline"
        required id = "default-radio" /
        >
        <
        h5 className = "font-lighter mt-5" > ONLINE < /h5> <
        Form.Check label = "Make an instant deposit on our platform"
        name = "payment_means"
        onChange = { props.handleChange }
        type = "radio"
        value = "online"
        required id = "default-radio" /
        >
        <
        /
        div > < /div > < /
        div >
    );
}

function Step1(props) {
    if (props.currentStep !== 1) {
        return null
    }
    if (props.payment_means === "wallet") {
        return ( <
            div className = "text-center" >
            <img src = {props.goalPicture}
            className = "rounded-circle object-fit-cover img-head-goal"
            alt = "goal"/> <
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
            } > hey < /p> < /
            Form.Group > < /
            div >
        )
    }
    return ( 
        <div className = "text-center" >
        <Form.Group className = "mb-3 bg-white p-4" >
            <Form.Label ><h6 className = 'm-0' > How much would you like to deposit? </h6></Form.Label>
            <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">{props.currency}</InputGroup.Text>
            <Form.Control type = "number"
            onChange = { props.handleChange }
            name = "deposit_amount"
            id = 'phone'
            required placeholder = "0.00" / >
            <p id = "errorFirst"
            className = 'p-2 rounded-2 px-3 bg-red'
            style = {
                { display: 'none' }
            } > hey </p>
            <Form.Control.Feedback type = "invalid" >
            This field is required
            </Form.Control.Feedback> 
            </InputGroup>
            </Form.Group >
        </div>
    );
}

function Step2(props) {
    if (props.currentStep !== 2) {
        return null
    }
    if (props.payment_means === "offline") {
        return ( <
            div className = "text-center" > <
            h6 className = "mt-2" > Continue to deposit < /h6>   <
            h4 className = "py-5 font-lighter" > Proceed to deposit < span className = "bolder" > { props.currency } < /span> < span className = "bolder" > { props.deposit_amount } < /span > plus a flat fee of < span className = "bolder" > { props.currency } < /span> <span className = "bolder">{props.fee} < /span > .Your Total deposit is < span className = "bolder" > { props.currency } < /span > < span className = "bolder active" > { props.total_deposit} < /span > < /
            h4 > < /
            div >
        )
    }
    return ( <
        div className = "text-center" >
        <
        h5 className = "p-5 special" > Proceed to deposit < span className = "bolder" > { props.currency } < /span> < span className = "bolder" > { props.deposit_amount } < /span > plus a flat fee of < span className = "bolder" > { props.currency } < /span> <span className = "bolder">{props.fee} < /span > .Your Total deposit amount is < span className = "bolder" > { props.currency } < /span > < span className = "bolder active" > { props.total_deposit} < /span > < /
        h5 >
        <
        GoalDeposit phone = { props.phone }
        country = { props.country }
        name = { props.name }
        email = { props.email }
        data = { props.data }
        submit = { props.submit }
        amount = { props.total_deposit }
        currency = { props.getCurr }
        / > < /
        div >
    )
}
function Step5(props) {
    if (props.currentStep !== 5) {
        return null
    }
    return ( <
        div className = " text-start" > <
        h6 className = "mt-2 text-center" > Choose your withdraw means. < /h6> <
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
function Step6(props) {
    if (props.currentStep !== 6) {
        return null
    }
    return ( <
        div className = "text-center p-4" > <
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
        } > hey < /p> < /
        Form.Group >
        <
        h6 className = "bg-lighter p-2 rounded-3" > withdraw charges apply < /h6> < /
        div >
    );
}

function Step7(props) {
    if (props.currentStep !== 7) {
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
            } > hey < /p>< /
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
        } > hey < /p> < /
        Form.Group > <
        Form.Group className = "mb-3 p-3 d-none" >
        <
        Form.Label > < h6 > Account Bank(Mobile Money Option) < /h6> < /Form.Label > <
        Form.Control type = "text"
        onChange = { props.handleChange }
        name = "account_bank"
        id = 'account_bank'
        required placeholder = "code" / > < /
        Form.Group > < /
        div >
    )
}
export default Goal;