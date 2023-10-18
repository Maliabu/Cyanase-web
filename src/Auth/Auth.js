import React from "react";
import Login from './Login';
import SignUp from './SecondaryUser';
import Header from '../images/Group 3525.png';
import PasswordReset from './PasswordReset'
// import Checkout from "../payment/checkout";

class Auth extends React.Component {
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
        currentStep = 1
        this.setState({
            currentStep: currentStep
        })
    }
    _resetPassword = () => {
        let currentStep = this.state.currentStep
        currentStep = currentStep + 2
        this.setState({
            currentStep: currentStep
        })
    }
    resetPassword() {
        let currentStep = this.state.currentStep;
        if (currentStep === 1) {
            return ( <
                span type = "button"
                onClick = { this._resetPassword } >
                Forgot Password ? <
                /span>        
            )
        }
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
        if (currentStep === 3) {
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
            div className = 'row py-4 justify-content-center' > < p > <
            img src = { Header }
            width = '10%'
            className = "mx-5 d-none d-lg-block d-md-block"
            alt = "investors" / > < /p><p><
            img src = { Header }
            width = '40%'
            className = "d-block d-sm-none mx-auto"
            alt = "investors" / > < /p> <
            Step1 currentStep = { this.state.currentStep }
            signup = { this.nextButton() }
            passwordReset = { this.resetPassword() }
            /> <
            Step2 currentStep = { this.state.currentStep }
            login = { this.nextButton() }
            /><
            Step3 currentStep = { this.state.currentStep }
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
        passwordReset = { props.passwordReset }
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

    function Step3(props) {
        if (props.currentStep !== 3) {
            return null
        }
        return ( < PasswordReset passwordReset = { props.passwordReset }
            button = { props.login }
            / > );
        }
        export default Auth;