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
import { FaBuilding, FaCar, FaGraduationCap, FaHospital, FaPlaneDeparture, FaSchool, FaShower } from "react-icons/fa";

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
        let period = parseFloat(formData.goal_period) * month
        let depositRate = formData.deposit_rate
        let DepositAmount = parseInt(formData.goal_amount) / period
        if(depositRate === "weekly"){
            DepositAmount = DepositAmount / week
        } else {
            DepositAmount = DepositAmount / 1
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
                h5 id = "errorMessage"
                className = 'py-2 mt-3 rounded border border-danger text-center'
                style = {
                    { display: 'none' }
                } > hey < /h5> <
                h5 id = "infoMessage"
                className = 'py-2 mt-3 rounded warning-message text-center'
                style = {
                    { display: 'none' }
                } > hey < /h5>   <
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
        let riskProfileStatus = props.complete
        let verification = props.verification
        if (step === 1 && verification === false) {
            // simple - only verified users can interact with this feature
            return ( <
                h5 className = "m-3 p-2 status rounded-3 text-center">
                Please check your email and verify your account to proceed <
                /h5>        
            )
        }
        if (step === 1 && riskProfileStatus === "InComplete") {
            // simple - only verified users can interact with this feature
            return ( <
                h5 className = " m-3 p-2 status rounded-3" >
                Please complete your risk profile to continue to create a goal <
                /h5>       
            )
        }
        if (step === 1 || step === 6) {
            return ( <
                h5 className = " my-2 btn btn-warning p-2 px-5"
                onClick = {
                    () => _next()
                } >
                Create goal < /h5>
            )
        }
        if (step === 3) {
            return ( <
                h5 className = "text-end my-2 warning rounded-3"
                onClick = {
                    () => validate2()
                } >
                Next < /h5>
            )
        }
        if (step === 2) {
            return ( <
                h5 className = "text-end my-2 warning rounded-3"
                onClick = {
                    () => validate1()
                } >
                Next < /h5>
            )
        }
        if (step === 4) {
            return ( <
                h5 className = "text-end my-2 warning rounded-3"
                onClick = {
                    () => _next()
                } >
                Next < /h5>
            )
        }
        if (step === 5) {
            return ( <
                h5 className = " my-2 text-end warning rounded-3"
                onClick = {
                    () => _next()
                } >
                Next < /h5>
            )
        }
        return null;
    }
    const previousButton = () => {
        if (step !== 1) {
            return ( <
                h5 className = " text-start warning rounded-3"
                type = "button"
                onClick = { _prev } >
                Previous <
                /h5>
            )
        }
        return null;
    }

    return ( <
        React.Fragment >
        <
        form className = "px-2 scroll-y"
        onSubmit = { handleSubmit(onSubmit) } > {
            /* 
                      render the form steps and pass required props in
                    */
        } < div className = "mt-2 d-none text-center" > 
        <h3>Create New Goal</h3>
         < /div> <
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
        goal = { formData.goal_name }
        goal_period = { formData.goal_period }
        goal_amount = { formData.goal_amount }
        deposit_type = { formData.deposit_type }
        deposit_rate = { formData.deposit_rate }
        deposit_reminder_day = { formData.deposit_reminder_day }
        deposit_amount = { getDepositAmount() }
        currency = { formData.currency }
        />  <
        Step7 currentStep = { step }
        handleChange = { handleChange }
        />
        <div className="text-center">{ previousButton() } { nextButton() } {submitButton()}</div>< /
        form > < /
        React.Fragment >
    );
}

function Step1(props) {
    if (props.currentStep !== 1) {
        return null
    }
    return ( <
        div className = "my-2 py-5 rounded-4 bg-back text-white" >
        <h3 className="px-5 bolder">Create a new goal today!</h3>
        <div className="row bluey mt-5">
            <div className="col-4 text-center">
                <FaCar size={60} className="rounded-circle p-2 "/>
            </div>
            <div className="col-4 text-center">
                <FaBuilding size={60} className="rounded-circle border border-light p-2"/>
            </div>
            <div className="col-4 text-center">
                <FaSchool size={60} className="rounded-circle p-2"/>
            </div>
        </div>
        <div className="row mt-3 bluey">
            <div className="col-4 text-center">
                <FaHospital size={60} className="rounded-circle border border-light p-2"/>
            </div>
            <div className="col-4 text-center">
                <FaPlaneDeparture size={60} className="rounded-circle p-2"/>
            </div>
            <div className="col-4 text-center">
                <FaGraduationCap size={60} className="rounded-circle border border-light p-2"/>
            </div>
        </div>
        <h4 className = "bolder mt-5 bluey px-5" > Goal Investing </h4>  
        <h5 className = "px-5" > Let your dreams come true by investing
        for them, create your goals here today 
        </h5> </div>
    );
}

function Step2(props) {
    if (props.currentStep !== 2) {
        return null
    }
    return ( < div className = "text-center p-3" >
        <
        h4 className = "bolder" > Add a Goal < /h4> <
        div className = "row p-1 my-3" > <
        Form.Group className = "mb-3 bg-white rounded-4 p-3 px-5" >
        <
        Form.Label > < h5 > What is your Goal ? < /h5> < /Form.Label > <
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
        Form.Label > < h5 > How long do you wish to accomplish this Goal ? (years) < /h5> < /Form.Label > <
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
        div className = "text-center p-4" > < h5 className = "" > How much will it cost to accomplish this Goal ? How much do you have to keep depositing(
            default as monthly) < /h5> <
        div className = "row p-1 px-3 rounded-25 my-3" >
        <
        Form.Group className = "mb-3 bg-white rounded-4 p-3 px-5" >
        <
        Form.Label > < h5 > My Goal Amount is : < /h5> < /Form.Label > <
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
        h5 className="p-2 status rounded-3"> You will have to make monthly deposists of: {
            (props.deposit_amount).toFixed(2)
        } < /h5> < /
        div >
        <
        /div>
    );
}

function Step7(props) {
    if (props.currentStep !== 7) {
        return null
    }
    return ( 
        <div className = "text-center" > 
        <h4 className = "bolder my-3" > Deposit Type </h4> 
        <h5 className = "mt-2" > How do you want to handle your investments </h5> 
        <div className = "my-3"
        key = "radio" >
        <div key = { `default-radio` }
        className = " p-1 rounded-4" >
        <div className="radio-warning p-3 rounded-4">
        <h5 className = "font-lighter text-start" > AUTO DEPOSIT </h5>  
        <Form.Check label = "Make your deposits automatic such that you do not miss out a single day"
        name = "deposit_type"
        type = "radio"
        onChange = { props.handleChange }
        className = "text-start"
        value = "auto"
        required id = "default-radio" />
        </div>
        <div className="radio-warning p-3 mt-3 rounded-4">
        <h5 className = "font-lighter text-start" > I WILL DEPOSIT BY MYSELF </h5>  
        <Form.Check label = "Let me make my own deposits"
        name = "deposit_type"
        onChange = { props.handleChange }
        type = "radio"
        className = "text-start"
        value = "manual"
        required id = "default-radio1" />
        </div>
        </div> </div></div>
    );
}

function Step4(props) {
    if (props.currentStep !== 4) {
        return null
    }
    return ( 
        <div className = "text-center pt-3" > 
        <h4 className = "bolder" > Deposit Rate </h4> 
        <h5 className = "mt-2" > How often do you want to deposit to this goal </h5> 
        <div className = " my-3 p-1 rounded-4"
        key = "radio" >
        <
        div key = { `default-radio` }
        className = "p-3" >
        <div className="radio-warning p-3 rounded-4">
        <Form.Check label = "WEEKLY"
        name = "deposit_rate"
        type = "radio"
        onChange = { props.handleChange }
        className = "text-start"
        value = "weekly"
        required id = "default-radio" /
        ></div>
        <div className="radio-warning p-3 mt-2 rounded-4">
        <Form.Check label = "MONTHLY"
        name = "deposit_rate"
        onChange = { props.handleChange }
        type = "radio"
        className = "text-start "
        value = "monthly"
        required id = "default-radio1" /
        ></div>
        </div > </div></div>
    );
}

function Step5(props) {
    if (props.currentStep !== 5) {
        return null
    }
    return ( 
        <div className = "p-5" > 
        <h4 className = "bolder text-center" > Set A Reminder </h4> 
        <h5 className = "mt-2" > Let us remind you when you forget to deposit </h5>  
        <Form.Group>
            <Form.Select
        onChange = { props.handleChange }
        name = "deposit_reminder_day"
            >
                <option value="Monday">Select A Day</option>
                <option value="Monday">Monday</option>
                <option value="Tuesday">Tuesday</option>
                <option value="Wednesday">Wednesday</option>
                <option value="Thursday">Thurdsay</option>
                <option value="Friday">Friday</option>
                <option value="Saturday">Saturday</option>
                <option value="Sunday">Sunday</option>
            </Form.Select>
        </Form.Group> 
        </div>
    );
}

function Step6(props) {
    if (props.currentStep !== 6) {
        return null
    }
    return ( 
        <div className = "rounded-4 bg-back text-white p-5 mb-2" >
        <h3 className = "bolder text-white" > Goal Ready! </h3>  
        <div className = "py-3" >
        <div className="row">
            <div className="col-6"><h5>Goal:</h5></div>
            <div className="col-6"> <h5>{ props.goal }</h5></div>
            <div className="col-6"><h5>Goal Amount:</h5></div>
            <div className="col-6"> <h5>{props.goal_amount}</h5></div>
            <div className="col-6"><h5>Time to Achive Goal(years):</h5></div>
            <div className="col-6"><h5>{ props.goal_period }</h5> </div>
            <div className="col-6"><h5>Deposit Rate:</h5></div>
            <div className="col-6"> <h5>{ props.deposit_rate }</h5></div>
        </div>
        <h5 className = "bluey mt-3" > Your Goal is to: <span className = "bolder" > { props.goal } </span> at {props.currency}<span className = "bolder" > { props.goal_amount } </span>
        within a period of < span className = "bolder" > { props.goal_period } </span> years, while making {props.deposit_rate} deposits of {props.currency} <span className = "bolder" > { (props.deposit_amount).toFixed(2) } </span> </h5> 
        <h5> Reminder day: < span className = "bolder" > { props.deposit_reminder_day } </span> 
        </h5> 
        </div> 
        </div>
    );
}

export default ResGoals1;