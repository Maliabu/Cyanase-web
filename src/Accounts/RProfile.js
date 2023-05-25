import React from "react";
import '../App.css';
import { FaRegWindowClose } from 'react-icons/fa';
import Form from 'react-bootstrap/Form';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Table from 'react-bootstrap/Table';
import { Activity } from "react-iconly";
import Button from "react-bootstrap/esm/Button";

class RProfile extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            currentStep: 0,
            question1: 0,
            question2: 0,
            question3: 0,
            question4: 0,
            question5: 0,
            question6: 0,
            question7: 0,
            question8: 0,
            question9: 0,
            question10: 0,
            question11: 0
        }
    }
    RPHeader() {
        return ( < div > < div className = "row" >
            <
            div className = "col-6" > < Activity size = "xlarge"
            className = "text-warning mx-5"
            set = "broken" / > < /div> <
            div className = "col-6 text-end" > <
            FaRegWindowClose className = "active d-none d-xs-block text-warning p-2 mx-lg-5 mx-3 px-2 rounded-circle"
            size = "50" / > < /div> < /
            div > < h5 className = "my-3 text-warning mx-lg-5 mx-3 px-2" > Risk Profile < /h5> < /
            div > )
    }

    handleChange = event => {
        const { name, value } = event.target
        this.setState({
            [name]: value
        })
        console.log(this.state)
    }
    getPercent() {
        let getPercentage = 0;
        let currentStep = this.state.currentStep;
        getPercentage = currentStep / 11 * 100
        console.log(getPercentage, currentStep)
        return getPercentage
    }
    conservative() {
        return ( <
            Table className = "text-center blue-dark" >
            <
            thead >
            <
            tr > <
            th > Conservative < /th> <
            th > Cash < /th> <
            th > Credit < /th> <
            th > Venture < /th><
            th > Absolute Return < /th>  < /
            tr > <
            /thead> <
            tbody >
            <
            tr > <
            td > A(18– 23 pts) < /td> <
            td > 40 % < /td> <
            td > 45 % < /td><
            td > 10 % < /td><
            td > 5 % < /td> < /
            tr > <
            tr > <
            td > B(24– 28 pts) < /td> <
            td > 30 % < /td> <
            td > 50 % < /td><
            td > 15 % < /td><
            td > 5 % < /td> < /
            tr > <
            /tbody> < /
            Table >
        )
    }
    moderate() {
        return ( <
            Table className = "text-center blue-dark" >
            <
            thead >
            <
            tr > <
            th > Conservative < /th> <
            th > Cash < /th> <
            th > Credit < /th> <
            th > Venture < /th><
            th > Absolute Return < /th>  < /
            tr > <
            /thead> <
            tbody >
            <
            tr > <
            td > A(29– 34 pts) < /td> <
            td > 25 % < /td> <
            td > 50 % < /td><
            td > 17.5 % < /td><
            td > 7.5 % < /td> < /
            tr > <
            tr > <
            td > B(35– 40 pts) < /td> <
            td > 15 % < /td> <
            td > 55 % < /td><
            td > 20 % < /td><
            td > 10 % < /td> < /
            tr > <
            /tbody> < /
            Table >
        )
    }
    assertive() {
        return ( <
            Table className = "text-center blue-dark" >
            <
            thead >
            <
            tr > <
            th > Conservative < /th> <
            th > Cash < /th> <
            th > Credit < /th> <
            th > Venture < /th><
            th > Absolute Return < /th>  < /
            tr > <
            /thead> <
            tbody >
            <
            tr > <
            td > A(41– 45 pts) < /td> <
            td > 15 % < /td> <
            td > 40 % < /td><
            td > 30 % < /td><
            td > 15 % < /td> < /
            tr > <
            tr > <
            td > B(45– 50 pts) < /td> <
            td > 10 % < /td> <
            td > 35 % < /td><
            td > 35 % < /td><
            td > 20 % < /td> < /
            tr > <
            /tbody> < /
            Table >
        )
    }
    aggressive() {
        return ( <
            Table className = "text-center blue-dark" >
            <
            thead >
            <
            tr > <
            th > Conservative < /th> <
            th > Cash < /th> <
            th > Credit < /th> <
            th > Venture < /th><
            th > Absolute Return < /th>  < /
            tr > <
            /thead> <
            tbody >
            <
            tr > <
            td > A(51– 55 pts) < /td> <
            td > 10 % < /td> <
            td > 20 % < /td><
            td > 40 % < /td><
            td > 30 % < /td> < /
            tr > <
            tr > <
            td > B(56– 60 pts) < /td> <
            td > 5 % < /td> <
            td > 15 % < /td><
            td > 35 % < /td><
            td > 45 % < /td> < /
            tr > <
            /tbody> < /
            Table >
        )
    }
    scoreResult() {
        this.score = parseInt(this.state.question1) + parseInt(this.state.question2) + parseInt(this.state.question3) + parseInt(this.state.question4) + parseInt(this.state.question5) + parseInt(this.state.question6) + parseInt(this.state.question7) + parseInt(this.state.question8) + parseInt(this.state.question9) + parseInt(this.state.question10) + parseInt(this.state.question11);
        console.log(this.score)
        return this.score
    }
    range(start, end) {
        let score = this.scoreResult();
        if (start <= score && score <= end) {
            return score
        }
        return null
    }
    getResult() {
        let InvestorProfile = "";
        let score = this.scoreResult();
        switch (score) {
            case this.range(18, 28):
                InvestorProfile = "Low/Conservative";
                break;
            case this.range(29, 40):
                InvestorProfile = "Moderate";
                break;
            case this.range(41, 50):
                InvestorProfile = "Assertive (Growth)";
                break;
            case this.range(51, 60):
                InvestorProfile = "Aggressive";
                break;
            default:
                InvestorProfile = "Incomplete Risk Profile";
        }
        return InvestorProfile
    }
    allocateResources() {
        let resource = this.getResult();
        let conservatives = this.conservative();
        let moderates = this.moderate();
        let assertives = this.assertive();
        let aggressives = this.aggressive();
        if (resource === "Low/Conservative") {
            return conservatives
        } else if (resource === "Moderate") {
            return moderates
        } else if (resource === "Assertive (Growth)") {
            return assertives
        } else if (resource === "Aggressive") {
            return aggressives
        }
        // switch (resource) {
        //     case "Low/Conservative":
        //         return conservatives;
        //         break;
        //     case "Moderate":
        //         return moderates;
        //         break;
        //     case "Assertive (Growth)":
        //         return assertives;
        //         break;
        //     case "Aggressive":
        //         return aggressives;
        //         break;
        //     default:
        //         return null
        // }
    }

    handleSubmit = event => {
        event.preventDefault()
        console.log(this.state)
    }
    _next = () => {
        let currentStep = this.state.currentStep
        currentStep = currentStep >= 12 ? currentStep : currentStep + 1
        this.setState({
            currentStep: currentStep
        })
    }

    _prev = () => {
        let currentStep = this.state.currentStep
        currentStep = currentStep <= 0 ? currentStep : currentStep - 1
        this.setState({
            currentStep: currentStep
        })
    }

    /*
     * the functions for our button
     */
    previousButton() {
        let currentStep = this.state.currentStep;
        if (currentStep === 12) {
            return ( < div className = "p-3 blue-dark m-0 text-center" > <
                h6 className = "py-3 mx-5 text-center border border-warning text-warning rounded-3"
                type = "button"
                onClick = { this._prev } >
                Previous <
                /h6></div >
            )
        }
        if (currentStep !== 0) {
            return ( <
                h6 className = "py-3 mx-5 text-center border border-warning text-warning rounded-3"
                type = "button"
                onClick = { this._prev } >
                Previous <
                /h6>
            )
        }
        return null;
    }
    result = () => {
        setTimeout(() => {
            document.getElementById("alert").style.backgroundColor = "orange";
            document.getElementById("alert").style.color = "white";
            document.getElementById("alert").innerHTML = "Reviewing your score..."
        }, 0)
        return (setTimeout(() => {
            this._next()
        }, 2000))
    }
    nextButton() {
        let currentStep = this.state.currentStep;
        if (currentStep === 0) {
            return ( < div className = "bg-light m-0 py-5 text-center" > <
                Button className = "py-3 mx-5 text-center m-0 text-dark rounded-3"
                variant = "warning"
                type = "button"
                onClick = { this._next } >
                Start taking the Risk profile <
                /Button>  </div > )
        } else if (currentStep < 11) {
            return ( <
                h6 className = "py-3 mx-5 border text-center border-warning text-warning rounded-3"
                type = "button"
                onClick = { this._next } >
                Next <
                /h6>        
            )
        } else if (currentStep === 11) {
            return ( < div className = "text-center mb-3" > <
                Button className = "text-center rounded-3"
                type = "button"
                variant = "warning"
                id = "alert"
                onClick = { this.result } >
                Submit <
                /Button> </div > )
        } else
            return null;
    }
    render() {
        return ( <
            React.Fragment >
            <
            form onSubmit = { this.handleSubmit } > {
                /* 
                          render the form steps and pass required props in
                        */
            } <
            Step0 currentStep = { this.state.currentStep }
            handleChange = { this.handleChange }
            />  <
            Step1 currentStep = { this.state.currentStep }
            handleChange = { this.handleChange }
            percentage = { this.getPercent() }
            header = { this.RPHeader() }
            question1 = { this.state.question1 }
            /><
            Step2 currentStep = { this.state.currentStep }
            handleChange = { this.handleChange }
            percentage = { this.getPercent() }
            header = { this.RPHeader() }
            question2 = { this.state.question2 }
            /> <
            Step3 currentStep = { this.state.currentStep }
            handleChange = { this.handleChange }
            percentage = { this.getPercent() }
            header = { this.RPHeader() }
            question3 = { this.state.question3 }
            />  <
            Step4 currentStep = { this.state.currentStep }
            handleChange = { this.handleChange }
            percentage = { this.getPercent() }
            header = { this.RPHeader() }
            question4 = { this.state.question4 }
            /> <
            Step5 currentStep = { this.state.currentStep }
            handleChange = { this.handleChange }
            percentage = { this.getPercent() }
            header = { this.RPHeader() }
            question5 = { this.state.question5 }
            /> <
            Step6 currentStep = { this.state.currentStep }
            handleChange = { this.handleChange }
            percentage = { this.getPercent() }
            header = { this.RPHeader() }
            question6 = { this.state.question6 }
            /> <
            Step7 currentStep = { this.state.currentStep }
            handleChange = { this.handleChange }
            percentage = { this.getPercent() }
            header = { this.RPHeader() }
            question7 = { this.state.question7 }
            /> <
            Step8 currentStep = { this.state.currentStep }
            handleChange = { this.handleChange }
            percentage = { this.getPercent() }
            header = { this.RPHeader() }
            question8 = { this.state.question8 }
            /> <
            Step9 currentStep = { this.state.currentStep }
            handleChange = { this.handleChange }
            percentage = { this.getPercent() }
            header = { this.RPHeader() }
            question9 = { this.state.question9 }
            /> <
            Step10 currentStep = { this.state.currentStep }
            handleChange = { this.handleChange }
            percentage = { this.getPercent() }
            header = { this.RPHeader() }
            question10 = { this.state.question10 }
            /> <
            Step11 currentStep = { this.state.currentStep }
            handleChange = { this.handleChange }
            percentage = { this.getPercent() }
            header = { this.RPHeader() }
            question11 = { this.state.question11 }
            /> <
            Step12 currentStep = { this.state.currentStep }
            handleChange = { this.handleChange }
            getResult = { this.getResult() }
            score = { this.scoreResult() }
            resourceAllocation = { this.allocateResources() }
            /> { this.nextButton() } { this.previousButton() }< /
            form > < /
            React.Fragment >
        );
    }
}

function Step0(props) {
    if (props.currentStep !== 0) {
        return null
    }
    return ( <
        div className = " p-lg-5 p-3 text-center blue-dark" > < Activity size = "xlarge"
        className = "text-warning"
        set = "broken" / > <
        h4 className = "bolder my-3" > RISK PROFILE < /h4> <
        h6 className = "mt-2 text-warning" > Complete your Risk Profile < /h6>  <
        h6 > This is a questionnaire to be filled by the intending Investor(you).This will help us, help you keep trackOf your investments and help you every step of the way.This document is a mandatory part of each investor’ s Esteemed investing lifespan. <
        /h6><h6>
        It is mandatory
        for the good of every investor complete the questionnaire to fully complete Your Profile as desired. < /h6>  < /div >
    );
}

function Step1(props) {
    if (props.currentStep !== 1) {
        return null
    }
    return ( <
        div className = " py-5 mt-lg-5" > { props.header } <
        div >
        <
        h4 className = "blue-light mx-lg-5 mx-3 px-2" > What are your < span className = "bolder" > objectives
        for Investing < /span> ? < /
        h4 > <
        div className = "blue-dark py-4 px-5 mt-4" >
        <
        div className = "py-4"
        key = "default-checkbox" >
        <
        Form.Check label = "Saving"
        type = "checkbox"
        name = "question1"
        value = "2"
        onChange = { props.handleChange }
        required id = "default-checkbox" /
        >
        <
        Form.Check label = "Retirement"
        className = "mt-3"
        type = "checkbox"
        name = "question1"
        value = "3"
        onChange = { props.handleChange }
        required id = "default-checkbox" /
        >
        <
        Form.Check label = "Capital Preservation"
        className = "mt-3"
        type = "checkbox"
        name = "question1"
        value = "5"
        onChange = { props.handleChange }
        required id = "default-checkbox" /
        >
        <
        Form.Check label = "Profit Generation"
        className = "mt-3"
        type = "checkbox"
        name = "question1"
        value = "7"
        onChange = { props.handleChange }
        required id = "default-checkbox" /
        >
        <
        /
        div > < /
        div > <
        div className = "row px-5 rounded-25 mt-3" >
        <
        p className = "text-end" > Progress: { props.currentStep }
        /11</p >
        <
        ProgressBar now = { props.percentage }
        variant = "warning" /
        >
        <
        /
        div > < /
        div > < /div >
    );
}

function Step2(props) {
    if (props.currentStep !== 2) {
        return null
    }
    return ( <
        div className = " py-5 mt-5" > { props.header } <
        div >
        <
        h4 className = "blue-light mx-5 px-2" > What is your < span className = "bolder" > Investment Time Horizon < /span> ? < /
        h4 > <
        div className = "blue-dark py-4 px-5 mt-4" >
        <
        div className = "py-4"
        key = "default-checkbox" >
        <
        Form.Check label = "< 1 year"
        type = "checkbox"
        name = "question2"
        value = "1"
        onChange = { props.handleChange }
        required id = "default-checkbox" /
        >
        <
        Form.Check label = "1 - 2 years"
        className = "mt-3"
        type = "checkbox"
        name = "question2"
        value = "2"
        onChange = { props.handleChange }
        required id = "default-checkbox" /
        >
        <
        Form.Check label = "2 - 5 years"
        className = "mt-3"
        type = "checkbox"
        name = "question2"
        value = "3"
        onChange = { props.handleChange }
        required id = "default-checkbox" /
        >
        <
        Form.Check label = "> 5 years"
        className = "mt-3"
        type = "checkbox"
        name = "question2"
        value = "5"
        onChange = { props.handleChange }
        required id = "default-checkbox" /
        >
        <
        /
        div > < /
        div > <
        div className = "row px-5 rounded-25 mt-3" >
        <
        p className = "text-end" > Progress: { props.currentStep }
        /11</p >
        <
        ProgressBar now = { props.percentage }
        variant = "warning" /
        >
        <
        /
        div > < /
        div > < /div >
    );
}

function Step3(props) {
    if (props.currentStep !== 3) {
        return null
    }
    return ( <
        div className = " py-5 mt-5" > { props.header } <
        div >
        <
        h4 className = "blue-light mx-5 px-2" > Where have you < span className = "bolder" > Invested in the Past ? < /span> ? < /
        h4 > <
        div className = "blue-dark py-4 px-5 mt-4" >
        <
        div className = "py-4"
        key = "default-checkbox" >
        <
        Form.Check label = "Treasuries"
        type = "checkbox"
        name = "question3"
        value = "1"
        onChange = { props.handleChange }
        required id = "default-checkbox" /
        >
        <
        Form.Check label = "Credit"
        className = "mt-3"
        type = "checkbox"
        name = "question3"
        value = "2"
        onChange = { props.handleChange }
        required id = "default-checkbox" /
        >
        <
        Form.Check label = "Alternatives"
        className = "mt-3"
        type = "checkbox"
        name = "question3"
        value = "3"
        onChange = { props.handleChange }
        required id = "default-checkbox" /
        >
        <
        Form.Check label = "Listed Equities"
        className = "mt-3"
        type = "checkbox"
        name = "question3"
        value = "5"
        onChange = { props.handleChange }
        required id = "default-checkbox" /
        >
        <
        /
        div > < /
        div > <
        div className = "row px-5 rounded-25 mt-3" >
        <
        p className = "text-end" > Progress : { props.currentStep }
        /11</p >
        <
        ProgressBar now = { props.percentage }
        variant = "warning" /
        >
        <
        /
        div > < /
        div > < /div >
    );
}

function Step4(props) {
    if (props.currentStep !== 4) {
        return null
    }
    return ( <
        div className = " py-5 mt-5" > { props.header } <
        div >
        <
        h4 className = "blue-light mx-5 px-2" > What would you hold as < span className = "bolder" > Maximun Loss to your Portfolio < /span> ? < /
        h4 > <
        div className = "blue-dark py-4 px-5 mt-4" >
        <
        div className = "py-4"
        key = "default-checkbox" >
        <
        Form.Check label = "< 10%"
        type = "checkbox"
        name = "question4"
        value = "2"
        onChange = { props.handleChange }
        required id = "default-checkbox" /
        >
        <
        Form.Check label = "10 - 15%"
        className = "mt-3"
        type = "checkbox"
        name = "question4"
        value = "3"
        onChange = { props.handleChange }
        required id = "default-checkbox" /
        >
        <
        Form.Check label = "15 - 20%"
        className = "mt-3"
        type = "checkbox"
        name = "question4"
        value = "5"
        onChange = { props.handleChange }
        required id = "default-checkbox" /
        >
        <
        Form.Check label = "Up to 25%"
        className = "mt-3"
        type = "checkbox"
        name = "question4"
        value = "7"
        onChange = { props.handleChange }
        required id = "default-checkbox" /
        >
        <
        /
        div > < /
        div > <
        div className = "row px-5 rounded-25 mt-3" >
        <
        p className = "text-end" > Progress: { props.currentStep }
        /11</p >
        <
        ProgressBar now = { props.percentage }
        variant = "warning" /
        >
        <
        /
        div > < /
        div > < /div >
    );
}

function Step5(props) {
    if (props.currentStep !== 5) {
        return null
    }
    return ( <
        div className = " py-5 mt-5" > { props.header } <
        div >
        <
        h4 className = "blue-light mx-5 px-2" > How mucn < span className = "bolder" > Capital < /span> are you considering <span className = "bolder">to Invest</span > ? < /
        h4 > <
        div className = "blue-dark py-4 px-5 mt-4" >
        <
        div className = "py-4"
        key = "default-checkbox" >
        <
        Form.Check label = "$1k - $2k"
        type = "checkbox"
        name = "question5"
        value = "2"
        onChange = { props.handleChange }
        required id = "default-checkbox" /
        >
        <
        Form.Check label = "$2k - $5k"
        className = "mt-3"
        type = "checkbox"
        name = "question5"
        value = "3"
        onChange = { props.handleChange }
        required id = "default-checkbox" /
        >
        <
        Form.Check label = "$5k - $10k"
        className = "mt-3"
        type = "checkbox"
        name = "question5"
        value = "5"
        onChange = { props.handleChange }
        required id = "default-checkbox" /
        >
        <
        Form.Check label = "> $10k"
        className = "mt-3"
        type = "checkbox"
        name = "question5"
        value = "7"
        onChange = { props.handleChange }
        required id = "default-checkbox" /
        >
        <
        /
        div > < /
        div > <
        div className = "row px-5 rounded-25 mt-3" >
        <
        p className = "text-end" > Progress : { props.currentStep }
        /11</p >
        <
        ProgressBar now = { props.percentage }
        variant = "warning" /
        >
        <
        /
        div > < /
        div > < /div >
    );
}

function Step6(props) {
    if (props.currentStep !== 6) {
        return null
    }
    return ( <
        div className = " py-5 mt-5" > { props.header } <
        div >
        <
        h4 className = "blue-light mx-5 px-2" > What are your < span className = "bolder" > Source of Funds < /span> ? < /
        h4 > <
        div className = "blue-dark py-4 px-5 mt-4" >
        <
        div className = "py-4"
        key = "default-checkbox" >
        <
        Form.Check label = "Employment"
        type = "checkbox"
        name = "question6"
        value = "2"
        onChange = { props.handleChange }
        required id = "default-checkbox" /
        >
        <
        Form.Check label = "Inheritence/Gift"
        className = "mt-3"
        type = "checkbox"
        name = "question6"
        value = "3"
        onChange = { props.handleChange }
        required id = "default-checkbox" /
        >
        <
        Form.Check label = "Savings/Superannuation"
        className = "mt-3"
        type = "checkbox"
        name = "question6"
        value = "5"
        onChange = { props.handleChange }
        required id = "default-checkbox" /
        >
        <
        Form.Check label = "Other"
        className = "mt-3"
        type = "checkbox"
        name = "question6"
        value = "0"
        onChange = { props.handleChange }
        required id = "default-checkbox" /
        >
        <
        /
        div > < /
        div > <
        div className = "row px-5 rounded-25 mt-3" >
        <
        p className = "text-end" > Progress: { props.currentStep }
        /11</p >
        <
        ProgressBar now = { props.percentage }
        variant = "warning" /
        >
        <
        /
        div > < /
        div > < /div >
    );
}

function Step7(props) {
    if (props.currentStep !== 7) {
        return null
    }
    console.log(props)
    return ( <
        div className = " py-5 mt-5" > { props.header } <
        div >
        <
        h4 className = "blue-light mx-5 px-2" > Tax savings, in some instances, can be obtained from investments albeit taking on more risk. < /
        h4 >
        <
        h4 className = "blue-light mx-5 px-2" > Which of the following best describes your < span className = "bolder" > Goal < /span> ? < /
        h4 > <
        div className = "blue-dark py-4 px-5 mt-4" >
        <
        div className = "py-4"
        key = "default-checkbox" >
        <
        Form.Check label = "Preferably guaranteed returns, Before Tax Savings"
        type = "checkbox"
        name = "question7"
        value = "2"
        onChange = { props.handleChange }
        required id = "default-checkbox" /
        >
        <
        Form.Check label = "Stable, reliable returns, Minimal Tax Savings"
        className = "mt-3"
        type = "checkbox"
        name = "question7"
        value = "3"
        onChange = { props.handleChange }
        required id = "default-checkbox" /
        >
        <
        Form.Check label = "Moderate Variability in returns, Reasonable Tax Savings"
        className = "mt-3"
        type = "checkbox"
        name = "question7"
        value = "5"
        onChange = { props.handleChange }
        required id = "default-checkbox" /
        >
        <
        Form.Check label = "Unstable but potentially high returns, Maximize Tax Savings"
        className = "mt-3"
        type = "checkbox"
        name = "question7"
        value = "7"
        onChange = { props.handleChange }
        required id = "default-checkbox" /
        >
        <
        /
        div > < /
        div > <
        div className = "row px-5 rounded-25 mt-3" >
        <
        p className = "text-end" > Progress: { props.currentStep }
        /11</p >
        <
        ProgressBar now = { props.percentage }
        variant = "warning" /
        >
        <
        /
        div > < /
        div > < /div >
    );
}

function Step8(props) {
    if (props.currentStep !== 8) {
        return null
    }
    return ( <
        div className = " py-5 mt-5" > { props.header } <
        div >
        <
        h4 className = "blue-light mx-5 px-2" > The table below shows the < span className = "bolder" > highest one - year gain and One - year loss on five different hypothetical Investments of $10, 000. < /span>  < /
        h4 >
        <
        h4 className = "blue-light mx-5 px-2" > Given the potential Profit / Loss, where would you < span className = "bolder" > invest your money < /span> ? < /
        h4 > < div className = "mx-5 mt-3" >
        <
        Table striped className = "text-center" >
        <
        thead >
        <
        tr > <
        th > Portfolio < /th> <
        th > Highest Gain < /th> <
        th > Highest Loss < /th> < /
        tr > <
        /thead> <
        tbody >
        <
        tr > <
        td > A < /td> <
        td > $1000 < /td> <
        td > $200 < /td> < /
        tr > <
        tr > <
        td > B < /td> <
        td > $1500 < /td> <
        td > $450 < /td> < /
        tr > <
        tr > <
        td > C < /td> <
        td > $2500 < /td><
        td > $1200 < /td> < /
        tr > <
        tr > <
        td > D < /td> <
        td > $4000 < /td> <
        td > $2200 < /td>< /
        tr > <
        /tbody> < /
        Table > < /div> <
        div className = "blue-dark py-4 px-5 mt-4" >
        <
        div className = "py-4"
        key = "default-checkbox" >
        <
        Form.Check label = "A"
        type = "checkbox"
        name = "question8"
        value = "2"
        onChange = { props.handleChange }
        required id = "default-checkbox" /
        >
        <
        Form.Check label = "B"
        className = "mt-3"
        type = "checkbox"
        name = "question8"
        value = "3"
        onChange = { props.handleChange }
        required id = "default-checkbox" /
        >
        <
        Form.Check label = "C"
        className = "mt-3"
        type = "checkbox"
        name = "question8"
        value = "5"
        onChange = { props.handleChange }
        required id = "default-checkbox" /
        >
        <
        Form.Check label = "D"
        className = "mt-3"
        type = "checkbox"
        name = "question8"
        value = "7"
        onChange = { props.handleChange }
        required id = "default-checkbox" /
        >
        <
        /
        div > < /
        div > <
        div className = "row px-5 rounded-25 mt-3" >
        <
        p className = "text-end" > Progress: { props.currentStep }
        /11</p >
        <
        ProgressBar now = { props.percentage }
        variant = "warning" /
        >
        <
        /
        div > < /
        div > < /div >
    );
}

function Step9(props) {
    if (props.currentStep !== 9) {
        return null
    }
    return ( <
        div className = " py-5 mt-5" > { props.header } <
        div >
        <
        h4 className = "blue-light mx-5 px-2" > Do you feel you are appropriately covered against < span className = "bolder" > Personal and / or business risks, < /span>such as accidents, Illness, trauma 
        or death ? < /
        h4 > <
        div className = "blue-dark py-4 px-5 mt-4" >
        <
        div className = "py-4"
        key = "default-checkbox" >
        <
        Form.Check label = "Yes"
        type = "checkbox"
        name = "question9"
        value = "2"
        onChange = { props.handleChange }
        required id = "default-checkbox" /
        >
        <
        Form.Check label = "No"
        className = "mt-3"
        type = "checkbox"
        name = "question9"
        value = "1"
        onChange = { props.handleChange }
        required id = "default-checkbox" /
        >
        <
        /
        div > < /
        div > <
        div className = "row px-5 rounded-25 mt-3" >
        <
        p className = "text-end" > Progress : { props.currentStep }
        /11</p >
        <
        ProgressBar now = { props.percentage }
        variant = "warning" /
        >
        <
        /
        div > < /
        div > < /div >
    );
}

function Step10(props) {
    if (props.currentStep !== 10) {
        return null
    }
    return ( <
        div className = " py-5 mt-5" > { props.header } <
        div >
        <
        h4 className = "blue-light mx-5 px-2" > Would you consider borrowing money to make a future < span className = "bolder" > Investment < /span> ? < /
        h4 > <
        div className = "blue-dark py-4 px-5 mt-4" >
        <
        div className = "py-4"
        key = "default-checkbox" >
        <
        Form.Check label = "Yes"
        type = "checkbox"
        name = "question10"
        value = "3"
        onChange = { props.handleChange }
        required id = "default-checkbox" /
        >
        <
        Form.Check label = "No"
        className = "mt-3"
        type = "checkbox"
        name = "question10"
        value = "1"
        onChange = { props.handleChange }
        required id = "default-checkbox" /
        >
        <
        /
        div > < /
        div > <
        div className = "row px-5 rounded-25 mt-3" >
        <
        p className = "text-end" > Progress: { props.currentStep }
        /11</p >
        <
        ProgressBar now = { props.percentage }
        variant = "warning" /
        >
        <
        /
        div > < /
        div > < /div >
    );
}

function Step11(props) {
    if (props.currentStep !== 11) {
        return null
    }
    return ( <
        div className = " py-5 mt-5" > { props.header } <
        div >
        <
        h4 className = "blue-light mx-5 px-2" > Considering the < span className = "bolder" > negative impact of inflation on your Savings, < /span>growth investing if often used to counteract its effect, while 
        exposing you to short - term volatility. ? < /
        h4 > <
        h4 className = "blue-light mx-5 px-2" > Which of the following options best resonates you ? < /
        h4 > <
        div className = "blue-dark py-4 px-5 mt-4" >
        <
        div className = "py-4"
        key = "default-checkbox" >
        <
        Form.Check label = "I am comfortable with the arrangement to beat inflation"
        type = "checkbox"
        name = "question11"
        value = "5"
        onChange = { props.handleChange }
        required id = "default-checkbox" /
        >
        <
        Form.Check label = "I know the risks associated with Inflation, but I would prefer middle ground"
        className = "mt-3"
        type = "checkbox"
        name = "question11"
        value = "3"
        onChange = { props.handleChange }
        required id = "default-checkbox" /
        >
        <
        Form.Check label = "It could reduce my savings but I have no tolerance for Loss"
        className = "mt-3"
        type = "checkbox"
        name = "question11"
        value = "2"
        onChange = { props.handleChange }
        required id = "default-checkbox" /
        >
        <
        /
        div > < /
        div > <
        div className = "row px-5 rounded-25 mt-3" >
        <
        p className = "text-end" > Progress : { props.currentStep }
        /11</p >
        <
        ProgressBar now = { props.percentage }
        variant = "warning" /
        >
        <
        /
        div > < /
        div > < /div >
    );
}

function Step12(props) {
    if (props.currentStep !== 12) {
        return null
    }
    return ( <
        div className = " p-5 text-center blue-dark" > < Activity size = "xlarge"
        className = "text-warning"
        set = "broken" / > <
        h4 className = "bolder my-3" > RISK PROFILE < /h4>  <
        h6 className = "my-3 text-warning" > You have successfully submitted your Risk Profile, you can now proceed as a more professional investor <
        /h6> <
        h6 > Your Score: < span className = "p-2 border rounded-3 text-warning border-warning" > { props.score } < /span> < /
        h6 > <
        h6 className = "mt-5" > Based on your score, your Risk Analysis is: < span className = "p-2 rounded-3 text-dark bg-warning" > { props.getResult } < /span>  < /
        h6 >
        <
        div className = "text-warning mt-5" > < h6 > Your assets will be allocated as follows: < /h6> { props.resourceAllocation } < /div > < /
        div >
    );
}
export default RProfile;