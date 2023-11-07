import React from "react";
import { AddUser } from 'react-iconly';
import Form from 'react-bootstrap/Form';
import '../App.css';
import Button from "react-bootstrap/esm/Button";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ValidateForms } from "../Auth/ValidateForms";
import { preloader,fail,catch_errors,success } from "../Api/RequestFunctions";
import axios from "axios";
import { API_URL_GOAL, TOKEN } from "../apis";

function ResGoals1(props) {
    const [step, setStep] = useState(1)
    const [formData, setFormData] = useState({
        "goal_name": '',
        "goal_period": 1,
        "goal_amount": 0,
        "deposit_type": 'manual',
        "deposit_rate": '',
        "deposit_reminder_day": 'Monday',


    })
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setFormData({...formData, [name]: value });
    }
    const { handleSubmit } = useForm();
    const validate1 = () => {
        let goalName = ValidateForms("goal_name")

        if (goalName.length === 0) {
            document.getElementById("errorFirst").style.display = "block"
            document.getElementById("errorFirst").style.color = "crimson"
            document.getElementById("errorFirst").innerText = "Goal name is required"
        } else {
            document.getElementById("errorFirst").style.display = "none"
            setStep(step + 1)
        }
    }
    const validate2 = () => {
        let goalAmount = ValidateForms("goal_amount")

        if (goalAmount.length === 0) {
            document.getElementById("errorFirst").style.display = "block"
            document.getElementById("errorFirst").style.color = "crimson"
            document.getElementById("errorFirst").innerText = "Goal amount is required"
        } else {
            document.getElementById("errorFirst").style.display = "none"
            setStep(step + 1)
        }
    }
    const getDepositAmount = () => {
        let month = 12
        let week = 4
        let period = parseInt(formData.goal_period) * month
        let depositRate = formData.deposit_rate
        let DepositAmount = parseInt(formData.goal_amount) / period
        if(depositRate === "weekly"){
            DepositAmount = DepositAmount / week
        } else {
            DepositAmount = DepositAmount
        }
        return DepositAmount
    }
    const _next = () => {
        setStep(step + 1)
    }

    const _prev = () => {
        setStep(step - 1)
    }

    function onSubmit() {
        preloader()
        axios.post(`${API_URL_GOAL}`, formData, {
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
                    success("Goal to "+formData.goal_name+" created successfully", "/home", "successful");
                    // const token = response.data.token
                    // localStorage.setItem('token', token)
                }
            });
    }

    /*
     * the functions for our button
     */
    const submitButton = () => {
        if (step === 7) {
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
                className = 'shadow text-center my-2'
                id = 'successMessage'
                type = "submit" >
                Create this goal <
                /Button> < /
                div >
            )
        }
        return null
    }
    const nextButton = () => {
        if (step === 1 || step === 6) {
            return ( <
                h6 className = " py-3 text-end my-2 warning rounded-3"
                onClick = {
                    () => _next()
                } >
                Next < /h6>
            )
        }
        if (step === 3) {
            return ( <
                h6 className = " py-3 text-end my-2 warning rounded-3"
                onClick = {
                    () => validate2()
                } >
                Next < /h6>
            )
        }
        if (step === 2) {
            return ( <
                h6 className = " py-3 text-end my-2 warning rounded-3"
                onClick = {
                    () => validate1()
                } >
                Next < /h6>
            )
        }
        if (step === 4) {
            return ( <
                h6 className = " py-3 text-end my-2 warning rounded-3"
                onClick = {
                    () => _next()
                } >
                Next < /h6>
            )
        }
        if (step === 5) {
            return ( <
                h6 className = " py-3 my-2 text-end warning rounded-3"
                onClick = {
                    () => _next()
                } >
                Next < /h6>
            )
        }
        return null;
    }
    const previousButton = () => {
        if (step !== 1) {
            return ( <
                h6 className = "py-3 text-start warning rounded-3"
                type = "button"
                onClick = { _prev } >
                Previous <
                /h6>
            )
        }
        return null;
    }

    return ( <
        React.Fragment >
        <
        form className = "px-4 scroll-y"
        onSubmit = { handleSubmit(onSubmit) } > {
            /* 
                      render the form steps and pass required props in
                    */
        } < div className = "mt-2 text-center" > <
        AddUser className = "border border-dark text-center rounded-circle p-2 mt-3"
        size = "xlarge" / > < /div> <
        Step1 currentStep = { step }
        handleChange = { handleChange }
        /> <
        Step2 currentStep = { step }
        handleChange = { handleChange }
        /> <
        Step3 currentStep = { step }
        handleChange = { handleChange }
        deposit_amount = { getDepositAmount() }
        goal_period = { formData.goal_period }
        goal_amount = { formData.goal_amount }
        />  <
        Step4 currentStep = { step }
        handleChange = { handleChange }
        /> <
        Step5 currentStep = { step }
        handleChange = { handleChange }
        /> <
        Step6 currentStep = { step }
        handleChange = { handleChange }
        /> <
        Step7 currentStep = { step }
        handleChange = { handleChange }
        goal = { formData.goal_name }
        goal_period = { formData.goal_period }
        goal_amount = { formData.goal_amount }
        deposit_type = { formData.deposit_type }
        deposit_rate = { formData.deposit_rate }
        deposit_reminder_day = { formData.deposit_reminder_day }
        deposit_amount = { getDepositAmount() }
        currency = { formData.currency }
        /> { previousButton() } { nextButton() } {submitButton()}< /
        form > < /
        React.Fragment >
    );
}

function Step1(props) {
    if (props.currentStep !== 1) {
        return null
    }
    return ( <
        div className = "my-5 py-5 rounded-4 bg-light text-center" >
        <
        h4 className = "bolder" > Goal Investing < /h4>  <
        h6 className = "mx-5" > Let your dreams come true by investing
        for them, < p className = "mx-5" > create your goals here < /p>  < /
        h6 > < /div >
    );
}

function Step2(props) {
    if (props.currentStep !== 2) {
        return null
    }
    return ( < div className = "text-center p-3" >
        <
        h4 className = "bolder" > Add a Goal < /h4> <
        div className = "row p-1 my-3 bg-lighter rounded-4" > <
        Form.Group className = "mb-3 bg-white rounded-4 p-3 px-5" >
        <
        Form.Label > < h6 > What is your Goal ? < /h6> < /Form.Label > <
        Form.Control type = "text"
        id = 'text'
        name = "goal_name"
        onChange = { props.handleChange }
        required = {true} placeholder = "Build a mansion, Buy an Iphone..." / ><
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
        Form.Group className = "bg-white rounded-4 p-3 px-5" >
        <
        Form.Label > < h6 > How long do you wish to accomplish this Goal ? (years) < /h6> < /Form.Label > <
            Form.Control type = "number"
        id = 'number'
        name = "goal_period"
        onChange = { props.handleChange }
        required placeholder = "1 " / >
        <
        Form.Control.Feedback type = "invalid" >
        This field is required. <
        /Form.Control.Feedback> < /
        Form.Group >
        <
        /
        div >
        <
        /div>
    );
}

function Step3(props) {
    if (props.currentStep !== 3) {
        return null
    }
    return ( <
        div className = "text-center p-3" > < h6 className = "" > How much will it cost to accomplish this Goal ? How much do you have to keep depositing(
            default as monthly) < /h6> <
        div className = "row bg-lighter p-1 px-3 rounded-25 my-3" >
        <
        Form.Group className = "mb-3 bg-white rounded-4 p-3 px-5" >
        <
        Form.Label > < h6 > My Goal Amount is : < /h6> < /Form.Label > <
        Form.Control type = "number"
        name = "goal_amount"
        id = 'phone'
        onChange = { props.handleChange }
        required placeholder = " 10,000" / ><
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
        h6 > You will have to make monthly deposists of: {
            (props.deposit_amount).toFixed(2)
        } < /h6> < /
        div >
        <
        /div>
    );
}

function Step6(props) {
    if (props.currentStep !== 6) {
        return null
    }
    return ( <
        div className = "text-center" > <
        h4 className = "bolder my-3" > Deposit Type < /h4> <
        h6 className = "mt-2" > How do you want to handle your investments < /h6> <
        div className = "my-3"
        key = "radio" >
        <
        div key = { `default-radio` }
        className = "bg-lighter p-1 rounded-4" >
        <div className="bg-white p-3 rounded-4">
        <
        h5 className = "font-lighter text-start" > AUTO DEPOSIT < /h5>  <
        Form.Check label = "Make your deposits automatic such that you do not miss out a single day"
        name = "deposit_type"
        type = "radio"
        onChange = { props.handleChange }
        className = "text-start"
        value = "auto"
        required id = "default-radio" /
        ></div>
        <div className="bg-white p-3 mt-3 rounded-4">
        <
        h5 className = "font-lighter text-start" > I WILL DEPOSIT BY MYSELF < /h5>  <
        Form.Check label = "Let me make my own deposits"
        name = "deposit_type"
        onChange = { props.handleChange }
        type = "radio"
        className = "text-start"
        value = "manual"
        required id = "default-radio" /
        ></div>
        <
        /
        div > < /div ></div >
    );
}

function Step4(props) {
    if (props.currentStep !== 4) {
        return null
    }
    return ( <
        div className = "text-center pt-3" > <
        h4 className = "bolder" > Deposit Rate < /h4> <
        h6 className = "mt-2" > How often do you want to deposit to this goal < /h6> <
        div className = " my-3 bg-lighter p-1 rounded-4"
        key = "radio" >
        <
        div key = { `default-radio` }
        className = "" >
        <div className="bg-white p-3 rounded-4">
        <
        Form.Check label = "WEEKLY"
        name = "deposit_rate"
        type = "radio"
        onChange = { props.handleChange }
        className = "text-start"
        value = "weekly"
        required id = "default-radio" /
        ></div>
        <div className="bg-white p-3 mt-3 rounded-4">
        <
        Form.Check label = "MONTHLY"
        name = "deposit_rate"
        onChange = { props.handleChange }
        type = "radio"
        className = "text-start "
        value = "monthly"
        required id = "default-radio" /
        ></div>
        <
        /
        div > < /div ></div >
    );
}

function Step5(props) {
    if (props.currentStep !== 5) {
        return null
    }
    return ( <
        div className = "p-3" > <
        h4 className = "bolder text-center" > Set A Reminder < /h4> <
        h6 className = "mt-2" > Let us remind you when you forget to deposit < /h6>  <
        div key = { `default-radio` }
        className = "mb-3" >
        <
        Form.Check label = "Monday"
        name = "deposit_reminder_day"
        type = "radio"
        value = "Monday"
        onChange = { props.handleChange }
        id = "default-radio" /
        >
        <
        Form.Check label = "Tuesday"
        name = "deposit_reminder_day"
        type = "radio"
        value = "Tuesday"
        onChange = { props.handleChange }
        id = "default-radio" /
        >
        <
        Form.Check label = "Wednesday"
        name = "deposit_reminder_day"
        type = "radio"
        value = "Wdnesday"
        onChange = { props.handleChange }
        id = "default-radio" /
        >
        <
        Form.Check label = "Thursday"
        name = "deposit_reminder_day"
        type = "radio"
        value = "Thursday"
        onChange = { props.handleChange }
        id = "default-radio" /
        >
        <
        Form.Check label = "Friday"
        name = "deposit_reminder_day"
        type = "radio"
        value = "Friday"
        onChange = { props.handleChange }
        id = "default-radio" /
        >
        <
        Form.Check label = "Saturday"
        name = "deposit_reminder_day"
        type = "radio"
        value = "Saturday"
        onChange = { props.handleChange }
        id = "default-radio" /
        >
        <
        Form.Check label = "Sunday"
        name = "deposit_reminder_day"
        type = "radio"
        value = "Sunday"
        onChange = { props.handleChange }
        id = "default-radio" /
        >
        <
        /
        div > < /
        div >
    );
}

function Step7(props) {
    if (props.currentStep !== 7) {
        return null
    }
    return ( <
        div className = "text-center" >
        <
        h4 className = "bolder my-3" > Goal Ready < /h4> <
        h6 className = "mt-2" > Click submit to continue < /h6> <
        div className = "py-5 px-3 rounded-25" >
        <
        h5 className = "" > Your Goal is to: < span className = "bolder" > { props.goal } < /span> at {props.currency}< span className = "bolder" > { props.goal_amount } < /span >
        within a period of < span className = "bolder" > { props.goal_period } < /span> years, while making {props.deposit_rate} deposits of {props.currency} < span className = "bolder" > { (props.deposit_amount).toFixed(2) } < /span > < /h5 > <
        h6 > Reminder day: < span className = "bolder" > { props.deposit_reminder_day } < /span> < /
        h6 > <
        /
        div > < /
        div >
    );
}


    export default ResGoals1;