import React from "react";
import Form from 'react-bootstrap/Form';
import '../App.css';
import Pic from './Pic';
import Goal from '../images/house.png';
import GoalInvesting from '../images/Group 215.png'
import { ArrowLeftSquare } from "react-iconly";

class ResGoal extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            currentStep: 1,
            goal: 'Build a Mansion',
            goal_period: '1',
            goal_amount: '400000000',
            deposit_amount: '45000',
            deposit_type: 'auto',
            deposit_rate: 'monthly',
            deposit_reminder_day: 'Monday'
        }
    }

    handleChange = event => {
        const { name, value } = event.target
        this.setState({
            [name]: value
        })
        console.log(this.state)
    }

    handleSubmit = event => {
        event.preventDefault()
        console.log(this.state)
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
        currentStep = currentStep <= 1 ? 7 : currentStep - 1
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
                p className = "py-2 mx-5 text-center border border-warning text-warning rounded-25"
                type = "button"
                onClick = { this._prev } >
                Previous <
                /p>
            )
        }
        return null;
    }

    nextButton() {
        let currentStep = this.state.currentStep;
        if (currentStep < 7) {
            return ( <
                p className = "py-2 mx-5 border text-center border-warning text-warning rounded-25"
                type = "button"
                onClick = { this._next } >
                Next <
                /p>        
            )
        }
        return null;
    }

    render() {
        return ( <
            React.Fragment >
            <
            form className = "res-home mb-5 pb-5"
            onSubmit = { this.handleSubmit } > {
                /* 
                          render the form steps and pass required props in
                        */
            } < Pic / > <
            div className = "pt-5" >
            <
            h6 className = "mt-5 p-3 bg-light bolder" > <
            ArrowLeftSquare size = { 25 }
            className = "mx-2"
            onClick = {
                () => { this.props.changeGoalSetting(false) }
            }
            /> Goals  < /
            h6 > < /div > <
            div className = "text-center" >

            <
            img src = { GoalInvesting }
            width = '50%'
            className = "mt-5"
            height = '40%'
            alt = "investors" / > < /div><
            Step1 currentStep = { this.state.currentStep }
            handleChange = { this.handleChange }
            /> <
            Step2 currentStep = { this.state.currentStep }
            handleChange = { this.handleChange }
            /> <
            Step3 currentStep = { this.state.currentStep }
            handleChange = { this.handleChange }
            />  <
            Step4 currentStep = { this.state.currentStep }
            handleChange = { this.handleChange }
            /> <
            Step5 currentStep = { this.state.currentStep }
            handleChange = { this.handleChange }
            /> <
            Step6 currentStep = { this.state.currentStep }
            handleChange = { this.handleChange }
            /> <
            Step7 currentStep = { this.state.currentStep }
            handleChange = { this.handleChange }
            goal = { this.state.goal }
            goal_period = { this.state.goal_period }
            goal_amount = { this.state.goal_amount }
            deposit_amount = { this.state.deposit_amount }
            deposit_type = { this.state.deposit_type }
            deposit_rate = { this.state.deposit_rate }
            deposit_reminder_day = { this.state.deposit_reminder_day }
            />  { this.nextButton() } { this.previousButton() }

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
        div className = "mt-3 mb-5 text-center" > <
        p className = "mx-5 bolder" > Let your dreams come true by investing
        for them, create your goals here < /
        p > <
        img src = { Goal }
        className = ""
        width = '100%'
        height = '80%'
        alt = "investors" / > < /div >
    );
}

function Step2(props) {
    if (props.currentStep !== 2) {
        return null
    }
    return ( < div className = "text-center p-3 bolder" >

        <
        p className = "mt-3" > Add a Goal < /p> <
        div className = "row bg-light py-4 p-3 rounded-25" > <
        Form.Group className = "mb-3 bg-white rounded-4 p-3 px-5" >
        <
        p >
        <
        Form.Label > What is your Goal ? < /Form.Label>  <
        Form.Control type = "text"
        id = 'text'
        name = "goal"
        onChange = { props.handleChange }
        required placeholder = "Build a mansion" / >
        <
        Form.Control.Feedback type = "invalid" >
        This field is required. <
        /Form.Control.Feedback></p > < /
        Form.Group >
        <
        Form.Group className = "mb-3 bg-white rounded-4 p-3 px-5" > < p >
        <
        Form.Label > How long do you wish to accomplish this Goal ? (years) < /Form.Label>  <
        Form.Control type = "number"
        id = 'number'
        name = "goal_period"
        onChange = { props.handleChange }
        required placeholder = "1 " / >
        <
        Form.Control.Feedback type = "invalid" >
        This field is required. <
        /Form.Control.Feedback></p > < /
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
        div className = "text-center px-3 bolder" > < p className = "mt-3" > How much will it cost to accomplish this Goal ? How much do you have to keep depositing(
            default as monthly) < /p> <
        div className = "row bg-light p-4 px-3 rounded-25 mt-3" >
        <
        Form.Group className = "mb-3 bg-white rounded-4 p-3 px-5" >
        <
        p >
        <
        Form.Label > My Goal Amount is : < /Form.Label>  <
        Form.Control type = "number"
        name = "goal_amount"
        id = 'phone'
        onChange = { props.handleChange }
        required placeholder = "UGX 10,000" / >
        <
        Form.Control.Feedback type = "invalid" >
        This field is required. <
        /Form.Control.Feedback></p > < /
        Form.Group > <
        Form.Group className = "mb-3 bg-white rounded-4 p-3 px-5" > < p >
        <
        Form.Label > I will be making deposits of: < /Form.Label>  <
        Form.Control type = "number"
        name = "deposit_amount"
        id = 'phone'
        onChange = { props.handleChange }
        required placeholder = "Enter your deposit amount" / >
        <
        Form.Control.Feedback type = "invalid" >
        This field is required. <
        /Form.Control.Feedback> </p > < /
        Form.Group > < /
        div >
        <
        /div>
    );
}

function Step4(props) {
    if (props.currentStep !== 4) {
        return null
    }
    return ( <
        div className = "text-center bolder" > <
        p className = "bolder my-3" > Deposit Type < /p> <
        p className = "mt-2" > How do you want to handle your investments < /p> <
        div className = "p-5 px-3 rounded-4 bg-light mt-3"
        key = "radio" >
        <
        div key = { `default-radio` }
        className = "mb-3" >
        <
        p className = "font-lighter bg-white rounded-4 p-3" >
        <
        Form.Check label = "AUTO DEPOSIT. Make your deposits automatic such that you do not miss out a single day"
        name = "deposit_type"
        type = "radio"
        onChange = { props.handleChange }
        className = "mx-5"
        value = "auto"
        required id = "default-radio" /
        >
        <
        /p><p className="font-lighter bg-white rounded-4 p-3"> <
        Form.Check label = "MANUALLY INVEST. Let me make my own deposits"
        name = "deposit_type"
        onChange = { props.handleChange }
        type = "radio"
        className = "mx-5"
        value = "manual"
        required id = "default-radio" /
        >
        <
        /p> < /
        div > < /div ></div >
    );
}

function Step5(props) {
    if (props.currentStep !== 5) {
        return null
    }
    return ( <
        div className = "text-center pt-3" > <
        p className = "bolder my-3" > Deposit Rate < /p> <
        p className = "mt-2" > How often do you want to deposit to this goal < /p> <
        div className = "p-5 px-3 rounded-25 mt-3 bg-light"
        key = "radio" >
        <
        div key = { `default-radio` }
        className = "mb-3 font-lighter" >
        <
        p className = "p-3 rounded-4 bg-white" >
        <
        Form.Check label = "WEEKLY"
        name = "deposit_rate"
        type = "radio"
        onChange = { props.handleChange }
        className = "mx-5 text-start"
        value = "weekly"
        required id = "default-radio" /
        >
        <
        /p><p className="p-3 rounded-4 bg-white"> <
        Form.Check label = "MONTHLY"
        name = "deposit_rate"
        onChange = { props.handleChange }
        type = "radio"
        className = " text-start mx-5"
        value = "monthly"
        required id = "default-radio" /
        >
        <
        /p> < /
        div > < /div ></div >
    );
}

function Step6(props) {
    if (props.currentStep !== 6) {
        return null
    }
    return ( <
        div className = "" >
        <
        div className = "text-center" > < /div> <
        p className = "bolder text-center" > Set A Reminder < /p> <
        p className = "mt-2 text-center" > Let us remind you when you forget to deposit < /p>  <
        div key = { `default-radio` }
        className = "mb-3 bg-light p-3" >
        <
        p className = "bg-white rounded-4 p-3" >
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
        /p> < /
        div > < /
        div >
    );
}

function Step7(props) {
    if (props.currentStep !== 7) {
        return null
    }
    console.log(props)
    return ( <
        div className = "p-3 text-center" >
        <
        p className = "bolder " > Deposit < /p> <
        p className = "mt-2" > Make a Deposit to
        continue < /p> <
        div className = "py-5 px-3 rounded-25" >
        <
        p > Your Goal is to: < span className = "bolder" > { props.goal } < /span> at UGX< span className = "bolder" > { props.goal_amount } < /span >
        within a period of < span className = "bolder" > { props.goal_period } < /span> years, while making < span className = "bolder" > { props.deposit_rate } < /span > deposits of UGX < span className = "bolder" > { props.deposit_amount } < /span> < /p > <
        p > We shall remind you every: < span className = "bolder" > { props.deposit_reminder_day } < /span></p >
        <
        /
        div > < button className = "btn btn-warning btn-block" > Deposit to
        continue < /button>  < /
        div >
    );
}
export default ResGoal;