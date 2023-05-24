import React from "react";
import { AddUser, Wallet } from 'react-iconly';
import Form from 'react-bootstrap/Form';
import DepositPic from '../images/deposit.png';
import Profile1 from '../images/Ellipse 178.png';
import { API_URL_GOAL_DEPOSIT, TOKEN } from '../apis';
import axios from 'axios';
import Button from "react-bootstrap/esm/Button";
import ProgressBar from "@ramonak/react-progress-bar";

class Goal extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            currentStep: 0,
            payment_means: '',
            deposit_amount: 0,
            currency: '',
            deposit_category: "",
            account_type: "",
            goal_id: this.props.id
        }
    }
    handleChange = event => {
        const { name, value } = event.target
        this.setState({
            [name]: value
        })
        console.log(this.state)
    }
    getTotalDeposit() {
        this.total_deposit = parseFloat(this.getFee()) + parseFloat(this.state.deposit_amount)
        return this.total_deposit
    }
    getFee() {
        this.fee = (2 / 100) * this.state.deposit_amount
        return this.fee
    }
    getTab9() {
        return this.props.tab9
    }
    getName() {
        let goalName = this.props.name
        let goalId = this.props.id
        let goalAmount = parseInt(this.props.amount)
        let deposit = parseInt(this.props.deposit)
        let created = (this.props.created).slice(0, 10)
        let percent = 100
        let progress = (percent - ((goalAmount - deposit) / goalAmount * percent)).toFixed(2)
        return [goalName, goalAmount, deposit, created, progress, percent, goalId]
    }
    getAccountType() {
        let currency = this.state.currency
        let accountType = this.state.account_type
        if (currency === "UGX") {
            accountType = "basic"
        } else {
            accountType = "dollar"
        }
        return accountType
    }

    submitButton = () => {
        let currentStep = this.state.currentStep;
        let payment_means = this.state.payment_means
        if (currentStep === 5 && payment_means === "online") {
            return ( <
                div className = 'row justify-content-center' > <
                p id = "errorMessage"
                className = 'py-3 mt-3 rounded border text-center fade-in'
                style = {
                    { display: 'none' }
                } > hey < /p>  <
                Button variant = "warning"
                className = 'shadow text-center'
                id = 'successMessage'
                onClick = { this.handleSubmit }
                type = "button" >
                Submit <
                /Button> < /
                div >
            )
        }
        return null
    }
    success(amount, currency, goal) {
        document.getElementById("successMessage").innerHTML = "Successful"
        document.getElementById("successMessage").style.backgroundColor = "green"
        document.getElementById("successMessage").style.color = "white"
        document.getElementById("successMessage").style.borderColor = "green"
        document.getElementById("errorMessage").style.display = 'block'
        document.getElementById("errorMessage").style.color = "green"
        document.getElementById("errorMessage").style.borderColor = "green"
        document.getElementById("errorMessage").innerText = "You have successfully made a deposit of " + currency + " " + amount + " to " + goal
        setTimeout(() => {
            document.getElementById("errorMessage").style.display = 'none'
        }, 4000);
    }
    handleSubmit = () => {
        let form_data = new FormData();
        let amount = this.state.deposit_amount;
        let currency = this.state.currency;
        let goal = this.getName()[1];
        form_data.append('payment_means', this.state.payment_means);
        form_data.append('currency', this.state.currency);
        form_data.append('deposit_category', this.state.deposit_category);
        form_data.append('deposit_amount', this.state.deposit_amount);
        form_data.append('account_type', this.getAccountType());
        form_data.append('goal_id', this.state.goal_id);
        axios.post(`${API_URL_GOAL_DEPOSIT}`, form_data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    'Accept': 'application/json',
                    "Authorization": `Token ${ TOKEN }`
                }
            })
            .catch(function(error) {
                const errorDisplay = (errorText) => {
                    document.getElementById("errorMessage").innerText = errorText
                    document.getElementById("errorMessage").style.display = 'block'
                    document.getElementById("errorMessage").style.color = "red"
                    document.getElementById("errorMessage").style.borderColor = "red"
                    setTimeout(() => {
                        document.getElementById("errorMessage").style.display = 'none'
                    }, 6000);
                }
                const errorSignUp = () => {
                    document.getElementById("successMessage").innerHTML = "Something went wrong"
                    document.getElementById("successMessage").style.backgroundColor = "red"
                    document.getElementById("successMessage").style.color = "white"
                    document.getElementById("successMessage").style.borderColor = "red"
                    setTimeout(() => {
                        document.getElementById("successMessage").innerHTML = "Deposit Unsuccessful"
                    }, 2000);
                }
                if (error.response) {
                    if (error.response.status === 400) {
                        errorDisplay(error.response.data.email || error.response.data.phone || error.response.data.password)
                    } else if (error.response.status === 500) {
                        errorDisplay(error.response.data)
                    } else if (error.response.status === 404) {
                        errorDisplay(error.response.data)
                    }
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                    errorSignUp();
                } else if (error.request) {
                    // The request was made but no response was received
                    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                    // http.ClientRequest in node.js
                    console.log(error.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log('Error', error.message);
                }
            });
        this.success(amount, currency, goal);
    }
    _saccoCategory = () => {
        let currentStep = this.state.currentStep
        currentStep = currentStep + 6
        this.setState({
            currentStep: currentStep
        })
    }
    _afterSacco = () => {
        let currentStep = this.state.currentStep
        currentStep = currentStep - 5
        this.setState({
            currentStep: currentStep
        })
    }

    _next = () => {
        let currentStep = this.state.currentStep
        currentStep = currentStep >= 1 ? currentStep + 1 : currentStep + 1
        this.setState({
            currentStep: currentStep
        })
    }

    _prev = () => {
        let currentStep = this.state.currentStep
        currentStep = currentStep <= 0 ? 0 : currentStep - 1
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
        let deposit_category = this.state.deposit_category;
        if (currentStep !== 0) {
            return ( <
                h6 className = "py-3 mx-5 text-center border border-warning text-warning rounded-25"
                type = "button"
                onClick = { this._prev } >
                Previous <
                /h6>
            )
        }
        if (currentStep === 7 && deposit_category === 'sacco/club') {
            return ( <
                h6 className = "py-3 mx-5 text-center border border-warning text-warning rounded-25"
                type = "button"
                onClick = { this._prevBeforeSacco } >
                Previous <
                /h6>
            )
        }
        return null;
    }
    heading() {
        let currentStep = this.state.currentStep;
        if (currentStep === 0) {
            return null
        }
        return ( < div > <
            Wallet className = "text-warning rounded-circle border border-warning p-2"
            size = "xlarge" / > < br / > <
            img src = { DepositPic }
            width = '25%'
            className = "my-3"
            height = '80%'
            alt = "investors" / > < /div>
        )
    }

    nextButton() {
        let currentStep = this.state.currentStep;
        let payment_means = this.state.payment_means;
        let deposit_category = this.state.deposit_category;
        if (currentStep === 0) {
            return ( <
                h6 className = "py-3 mx-5 text-center bg-warning rounded-25"
                type = "button"
                onClick = { this._next } >
                Deposit to this goal <
                /h6>        
            )
        }
        if (currentStep === 1 && deposit_category === "personal investment") {
            return ( <
                h6 className = "py-3 mx-5 border text-center border-warning text-warning rounded-25"
                type = "button"
                onClick = { this._next } >
                Next <
                /h6>        
            )
        }
        if (currentStep === 7) {
            return ( <
                h6 className = "py-3 mx-5 border text-center border-warning text-warning rounded-25"
                type = "button"
                onClick = { this._afterSacco } >
                Next <
                /h6>        
            )
        }

        if (currentStep === 1 && deposit_category === "sacco/club") {
            return ( <
                h6 className = "py-3 mx-5 border text-center border-warning text-warning rounded-25"
                type = "button"
                onClick = { this._saccoCategory } >
                Next <
                /h6>        
            )
        }
        if (currentStep === 5 && payment_means === "offline") {
            return ( <
                h6 className = "py-3 mx-5 text-center bg-warning rounded-25"
                type = "button"
                onClick = { this._next } >
                Continue <
                /h6>        
            )
        }
        if (currentStep === 5 && payment_means === "wallet") {
            return ( <
                h6 className = "py-3 mx-5 text-center bg-warning rounded-25"
                type = "button" >
                OK <
                /h6>        
            )
        }
        if (currentStep < 5) {
            return ( <
                h6 className = "py-3 mx-5 border text-center border-warning text-warning rounded-25"
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
            form className = "p-5 text-center"
            onSubmit = { this.handleSubmit } > {
                /* 
                          render the form steps and pass required props in
                        */
            } { this.heading() } <
            Step0 currentStep = { this.state.currentStep }
            handleChange = { this.handleChange }
            name = { this.getName()[0] }
            amount = { this.getName()[1] }
            deposit = { this.getName()[2] }
            created = { this.getName()[3] }
            progress = { this.getName()[4] }
            percent = { this.getName()[5] }
            /> <
            Step1 currentStep = { this.state.currentStep }
            deposit_category = { this.state.deposit_category }
            handleChange = { this.handleChange }
            /> <
            Step2 currentStep = { this.state.currentStep }
            handleChange = { this.handleChange }
            /> <
            Step3 currentStep = { this.state.currentStep }
            handleChange = { this.handleChange }
            /> <
            Step4 currentStep = { this.state.currentStep }
            handleChange = { this.handleChange }
            currency = { this.state.currency }
            payment_means = { this.state.payment_means }
            /> <
            Step5 currentStep = { this.state.currentStep }
            handleChange = { this.handleChange }
            payment_means = { this.state.payment_means }
            deposit_amount = { this.state.deposit_amount }
            total_deposit = { this.getTotalDeposit() }
            fee = {
                this.getFee()
            }
            currency = { this.state.currency }
            /> <
            Step6 currentStep = { this.state.currentStep }
            handleChange = { this.handleChange }
            payment_means = { this.state.payment_means }
            total_deposit = { this.getTotalDeposit() }
            currency = { this.state.currency }
            />  <Step7  currentStep = { this.state.currentStep }
            handleChange = { this.handleChange }
            /> { this.nextButton() } { this.previousButton() } {this.submitButton()}< /
            form > < /
            React.Fragment >
        );
    }
}

function Step0(props) {
    if (props.currentStep !== 0) {
        return null
    }
    if (props.id === "personal") {
        console.log("risk profile")
    }
    return ( <
        div className = "py-3" > <
        div className = "row py-3" >
        <
        div className = "col-6 p-5 p-lg-3" >
        <
        div className = "py-5 my-5 mx-5 bg-light rounded-circle" > < AddUser set = "two-tone"
        className = "my-5"
        size = "xlarge" /
        >
        <
        /div> < /
        div >
        <
        div className = "col-6 p-5 p-lg-3 text-start" >
        <
        div className = "flex-row p-3" >
        <
        h6 className = "bolder" > Goal Name: < /h6> <
        p className = "font-weight-lighter" > { props.name }...created {
            props.created
        } < /p> < /
        div > <
        div className = "flex-row p-3" >
        <
        h6 className = "bolder" > Goal Amount: < /h6><
        div className = "d-flex flex-row flex justify-content-center" > UGX <
        h2 className = "px-2 font-lighter" > { props.amount } < /h2></div > < /
        div > <
        div className = "row p-3" >
        <
        p className = "bolder" > Progress: < span className = "active" > {
            props.progress
        } % < /span> < /p > <
        ProgressBar completed = { props.progress }
        isLabelVisible = { false }
        maxCompleted = { props.percent }
        bgColor = "orange" /
        >
        <
        /div> <
        div className = "flex-row mt-2 p-3" >
        <
        h6 className = "bolder" > Total Deposit Made: < /h6> <
        div className = "d-flex flex-row flex justify-content-center" > UGX <
        h4 className = "px-2 font-lighter" > { props.deposit } < /h4></div > < /
        div > <
        /div> < /
        div > < /
        div >
    );
}

function Step1(props) {
    if (props.currentStep !== 1) {
        return null
    }
    if (props.id === "personal") {
        console.log("risk profile")
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
        h5 className = "font-lighter mt-5" > SACCO GROUP / INVESTMENT CLUB < /h5> <
        Form.Check label = "I want to deposit to my Sacco Group or Investment Club"
        name = "deposit_category"
        onChange = { props.handleChange }
        type = "radio"
        value = "sacco/club"
        required id = "default-radio" /
        >
        <
        h5 className = "font-lighter mt-5" > INSTITUTION / ORGANIZATION < /h5>  <
        Form.Check label = "I am making this deposit towards my API Account as an API User"
        name = "deposit_category"
        onChange = { props.handleChange }
        type = "radio"
        value = "institution"
        required id = "default-radio" /
        >
        <
        /
        div > < /div > <
        h6 className = "py-3 rounded-3 bg-warning text-center"
        onClick = { props.getTab9 } >
        Edit my Risk Profile before deposit < /h6> < /
        div >
    );
}

function Step2(props) {
    if (props.currentStep !== 2) {
        return null
    }
    if (props.id === "personal") {
        console.log("risk profile")
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
        h5 className = "font-lighter" > WALLET < /h5> <
        Form.Check label = "I want to deposit from my wallet to make this deposit to my personal investment account"
        name = "payment_means"
        type = "radio"
        onChange = { props.handleChange }
        value = "wallet"
        required id = "default-radio" /
        >
        <
        h5 className = "font-lighter mt-5" > OFFLINE < /h5> <
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

function Step3(props) {
    if (props.currentStep !== 3) {
        return null
    }
    return ( <
        div className = "text-start" > <
        h6 className = "mt-2 text-center" > Choose the currency in which you would like to invest your money <
        /h6> <
        div className = "p-5 px-3 rounded-25 mt-3"
        key = "radio" >
        <
        div key = { `default-radio` }
        className = "mb-3" >
        <
        h4 className = "font-lighter" > BASIC ACCOUNT < /h4> <
        Form.Check label = "Deposit and maintain your account in your local currency.(Transaction charges apply)"
        name = "currency"
        type = "radio"
        onChange = { props.handleChange }
        value = "UGX"
        required id = "default-radio" /
        >
        <
        h4 className = "font-lighter mt-5" > DOLLAR ACCOUNT < /h4> <
        Form.Check label = "Deposit in your local currency and we shall change it to USD(Standard charges apply)"
        name = "currency"
        onChange = { props.handleChange }
        type = "radio"
        value = "USD"
        required id = "default-radio" /
        >
        <
        /
        div > < /div ></div >
    );
}

function Step4(props) {
    if (props.currentStep !== 4) {
        return null
    }
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
            required placeholder = "0.00" / >
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
        Form.Group className = "mb-3 bg-white shadow-sm p-3 p-5" >
        <
        Form.Label > Amount to Deposit in { props.currency } < /Form.Label>  <
        Form.Control type = "number"
        onChange = { props.handleChange }
        name = "deposit_amount"
        id = 'phone'
        required placeholder = "0.00" / >
        <
        Form.Control.Feedback type = "invalid" >
        This field is required. <
        /Form.Control.Feedback> < /
        Form.Group > < /
        div >
    );
}

function Step5(props) {
    if (props.currentStep !== 5) {
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
    if (props.payment_means === "online") {
        return ( <
            div className = "text-center" > < h1 className = "py-5" > FlutterWave < /h1> < /
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

function Step6(props) {
    if (props.currentStep !== 6) {
        return null
    } else if (props.payment_means === "offline") {
        return ( <
            div className = "text-center" > <
            h4 className = "bolder my-3" > Make an Offline Deposit < /h4> <
            h6 className = "mt-2" > Procedure < /h6>   <
            h4 className = "py-5 font-lighter" > Deposit < span className = "bolder" > { props.currency } < /span>: <span className="bolder">{ props.total_deposit} </span >
            to our bank account and proceed to send us your deposit receipt < /
            h4 >
            <
            div className = "row" >
            <
            div className = "col-5 text-start" >
            <
            h5 className = "bolder" > Bank name < /h5> <
            h5 className = "bolder" > Account number < /h5> <
            h5 className = "bolder" > SWIFT CODE < /h5>  <
            h5 className = "bolder" > Account name < /h5>< /
            div > <
            div className = "col-7 text-start" >
            <
            h5 className = "font-lighter" > DIAMOND TRUST BANK < /h5>  <
            h5 className = "font-lighter" > 0190514001 < /h5> <
            h5 className = "font-lighter" > DTKEUGKAXXX < /h5><
            h5 className = "font-lighter" > CYANASE TECHNOLOGY AND INVESTMENT LTD < /h5> < /
            div > <
            /div>  <
            h6 className = "my-5" > Send your deposit receipt to our Email: <
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
            required placeholder = "UGX 10,000" / >
            <
            Form.Control.Feedback type = "invalid" >
            This field is required. <
            /Form.Control.Feedback> < /
            Form.Group > < /
            div >
        );
    }

    function Step7(props) {
        if (props.currentStep !== 7) {
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
        export default Goal;