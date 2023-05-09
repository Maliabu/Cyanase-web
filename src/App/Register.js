import React from "react";
import Login from '../Accounts/Login';
import SignUp from '../Accounts/SecondaryUser';
import Header from '../images/Group 3525.png';
import VeirfyEmail from '../Accounts/Verify'

class Register extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            currentStep: 1
        }
    }

    _signup = () => {
        let currentStep = this.state.currentStep
        currentStep = currentStep + 1
        this.setState({
            currentStep: currentStep
        })
    }
    _login = () => {
        let currentStep = this.state.currentStep
        currentStep = currentStep - 1
        this.setState({
            currentStep: currentStep
        })
    }

    nextButton() {
        let currentStep = this.state.currentStep;
        if (currentStep === 1) {
            return ( <
                span type = "button"
                onClick = { this._signup } >
                SignUp <
                /span>        
            )
        }
        if (currentStep === 2) {
            return ( <
                span type = "button"
                onClick = { this._login } >
                Login <
                /span>        
            )
        }
        return null;
    }

    render() {
        return ( <
            React.Fragment >
            <
            div className = 'row p-3 justify-content-center' > < p > <
            img src = { Header }
            width = '10%'
            className = "mx-lg-5"
            alt = "investors" / > < /p> <
            Step1 currentStep = { this.state.currentStep }
            signup = { this.nextButton() }
            /> <
            Step2 currentStep = { this.state.currentStep }
            login = { this.nextButton() }
            /> < /
            div > < /
            React.Fragment >
        );
    }
}

function Step1(props) {
    if (props.currentStep !== 1) {
        return null
    }
    return ( < div >
        <
        Login button = { props.signup }
        / > < /
        div > );
}

function Step2(props) {
    if (props.currentStep !== 2) {
        return null
    }
    return ( < SignUp button = { props.login }
        / > );
    }
    export default Register