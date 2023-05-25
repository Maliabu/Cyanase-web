import React from "react";
import { AddUser } from 'react-iconly';
import Form from 'react-bootstrap/Form';
import '../App.css';
import axios from "axios";
import { API_URL_GOAL, TOKEN } from "../apis";
import Button from "react-bootstrap/esm/Button";

class Goal1 extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            currentStep: 1,
            goal_name: '',
            goal_period: 0,
            goal_amount: 0,
            deposit_type: '',
            deposit_rate: '',
            deposit_reminder_day: '',
            payment_means: '',
            deposit_amount: 0,
            currency: '',
            deposit_category: "",
            account_type: ""
        }
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
    getDepositAmount() {
        this.month = 12
        this.period = parseInt(this.state.goal_period) * this.month
        this.DepositAmount = parseInt(this.state.goal_amount) / this.period

        if (this.state.goal_period > 1) {
            this.interest = this.DepositAmount * (15 / 100)
            this.newDepositAmount = this.DepositAmount + this.interest
        }

        return this.DepositAmount
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
    submitButton = () => {
        let currentStep = this.state.currentStep;
        if (currentStep === 13) {
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
    nextButton() {
        let currentStep = this.state.currentStep;
        if (currentStep < 14) {
            return ( <
                h6 className = "py-3 mx-5 border text-center border-warning text-warning rounded-25"
                type = "button"
                onClick = { this._next } >
                Next <
                /h6>        
            )
        }
        return null;
    }
    handleChange = event => {
        const { name, value } = event.target
        this.setState({
            [name]: value
        })
        console.log(this.state)
    }
    success(goal, currency, amount) {
        document.getElementById("successMessage").innerHTML = "Successful"
        document.getElementById("successMessage").style.backgroundColor = "green"
        document.getElementById("successMessage").style.color = "white"
        document.getElementById("successMessage").style.borderColor = "green"
        document.getElementById("errorMessage").style.display = 'block'
        document.getElementById("errorMessage").style.color = "green"
        document.getElementById("errorMessage").style.borderColor = "green"
        document.getElementById("errorMessage").innerText = "You have successfully created a goal to " + goal + " of " + currency + " " + amount
        setTimeout(() => {
            document.getElementById("errorMessage").style.display = 'none'
        }, 4000);
    }
    handleSubmit = () => {
        let form_data = new FormData();
        let goal = this.state.goal_name;
        let currency = this.state.currency;
        let amount = this.state.goal_amount;
        form_data.append('goal_name', this.state.goal_name);
        form_data.append('goal_amount', this.state.goal_amount);
        form_data.append('goal_period', this.state.goal_period);
        form_data.append('deposit_type', this.state.deposit_type);
        form_data.append('deposit_reminder_day', this.state.deposit_reminder_day);
        form_data.append('payment_means', this.state.payment_means);
        form_data.append('currency', this.state.currency);
        form_data.append('deposit_category', this.state.deposit_category);
        form_data.append('deposit_amount', this.state.deposit_amount);
        form_data.append('account_type', this.getAccountType());
        axios.post(`${API_URL_GOAL}`, form_data, {
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
                        document.getElementById("successMessage").innerHTML = "Goal not created"
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
        this.success(goal, currency, amount);
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
                h6 className = "py-3 mx-5 text-center border border-warning text-warning rounded-25"
                type = "button"
                onClick = { this._prev } >
                Previous <
                /h6>
            )
        }
        return null;
    }
    returnToGoals = () => {
        setTimeout(() => {
            document.getElementById("alert").innerHTML = "Goal Created successfully"
        }, 1000)
        return setTimeout(() => {
            this.props.close1()
        }, 2000)
    }

    render() {
        return ( <
            React.Fragment >
            <
            form className = "px-5 scroll-y"
            onSubmit = { this.handleSubmit } > {
                /* 
                          render the form steps and pass required props in
                        */
            } < div className = "mt-5 text-center" > <
            AddUser className = "border border-dark text-center rounded-circle p-2 mt-5"
            size = "xlarge" / > < /div> <
            Step1 currentStep = { this.state.currentStep }
            handleChange = { this.handleChange }
            /> <
            Step2 currentStep = { this.state.currentStep }
            handleChange = { this.handleChange }
            /> <
            Step3 currentStep = { this.state.currentStep }
            handleChange = { this.handleChange }
            deposit_amount = { this.getDepositAmount() }
            goal_period = { this.state.goal_period }
            goal_amount = { this.state.goal_amount }
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
            goal = { this.state.goal_name }
            goal_period = { this.state.goal_period }
            goal_amount = { this.state.goal_amount }
            deposit_type = { this.state.deposit_type }
            deposit_rate = { this.state.deposit_rate }
            deposit_reminder_day = { this.state.deposit_reminder_day }
            deposit_amount = { this.getDepositAmount() }
            /> <
            Step8 currentStep = { this.state.currentStep }
            handleChange = { this.handleChange }
            deposit_category = { this.state.deposit_category }
            getTab9 = { this.getTab9() }
            /> <
            Step9 currentStep = { this.state.currentStep }
            handleChange = { this.handleChange }
            /> <
            Step10 currentStep = { this.state.currentStep }
            handleChange = { this.handleChange }
            /> <
            Step11 currentStep = { this.state.currentStep }
            handleChange = { this.handleChange }
            currency = { this.state.currency }
            payment_means = { this.state.payment_means }
            /> <
            Step12 currentStep = { this.state.currentStep }
            handleChange = { this.handleChange }
            payment_means = { this.state.payment_means }
            deposit_amount = { this.state.deposit_amount }
            total_deposit = { this.getTotalDeposit() }
            fee = {
                this.getFee()
            }
            currency = { this.state.currency }
            /> <
            Step13 currentStep = { this.state.currentStep }
            handleChange = { this.handleChange }
            payment_means = { this.state.payment_means }
            total_deposit = { this.getTotalDeposit() }
            currency = { this.state.currency }
            /> { this.nextButton() } { this.previousButton() }{this.submitButton()}< /
            form > < /
            React.Fragment >
        );
    }
}

function Step1(props) {
    if (props.currentStep !== 1) {
        return null
    }
    return ( <
        div className = "pt-5 text-center" >
        <
        h4 className = "bolder mt-5" > Goal Investing < /h4>  <
        h6 className = "mx-5" > Let your dreams come true by investing
        for them, < p className = "mx-5" > create your goals here < /p>  < /
        h6 > < /div >
    );
}

function Step2(props) {
    if (props.currentStep !== 2) {
        return null
    }
    return ( < div className = "text-center p-5" >
        <
        h6 className = "" > Add a Goal < /h6> <
        div className = "row bg-light py-4 p-5 rounded-25 mt-5" > <
        Form.Group className = "mb-3 bg-white p-3 px-5" >
        <
        Form.Label > What is your Goal ? < /Form.Label>  <
        Form.Control type = "text"
        id = 'text'
        name = "goal_name"
        onChange = { props.handleChange }
        required placeholder = "Build a mansion" / >
        <
        Form.Control.Feedback type = "invalid" >
        This field is required. <
        /Form.Control.Feedback> < /
        Form.Group >
        <
        Form.Group className = "mb-3 bg-white p-3 px-5" >
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
        div className = "text-center px-5" > < h6 className = "mt-5" > How much will it cost to accomplish this Goal ? How much do you have to keep depositing(
            default as monthly) < /h6> <
        div className = "row bg-light p-4 px-3 rounded-25 mt-5" >
        <
        Form.Group className = "mb-3 bg-white p-3 px-5" >
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
        /Form.Control.Feedback> < /
        Form.Group >
        <
        p > You will have to make monthly deposists of: { props.deposit_amount } < /p> < /
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
        div className = "text-center" > <
        h4 className = "bolder my-3" > Deposit Type < /h4> <
        h6 className = "mt-2" > How do you want to handle your investments < /h6> <
        div className = "p-5 px-3 rounded-25 mt-3"
        key = "radio" >
        <
        div key = { `default-radio` }
        className = "mb-3" >
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
        Form.Check label = "MANUALLY INVEST. Let me make my own deposits"
        name = "deposit_type"
        onChange = { props.handleChange }
        type = "radio"
        className = "mt-5 mx-5"
        value = "manual"
        required id = "default-radio" /
        >
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
        div className = "text-center pt-5" > <
        h4 className = "bolder my-3" > Deposit Rate < /h4> <
        h6 className = "mt-2" > How often do you want to deposit to this goal < /h6> <
        div className = "p-5 px-3 rounded-25 mt-3"
        key = "radio" >
        <
        div key = { `default-radio` }
        className = "mb-3" >
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
        Form.Check label = "MONTHLY"
        name = "deposit_rate"
        onChange = { props.handleChange }
        type = "radio"
        className = "mt-5 text-start mx-5"
        value = "monthly"
        required id = "default-radio" /
        >
        <
        /
        div > < /div ></div >
    );
}

function Step6(props) {
    if (props.currentStep !== 6) {
        return null
    }
    return ( <
        div className = "p-5" >
        <
        div className = "text-center" > < /div> <
        h4 className = "bolder my-3 text-center" > Set A Reminder < /h4> <
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
    console.log(props)
    return ( <
        div className = "p-5 text-center" >
        <
        h4 className = "bolder my-3" > Deposit < /h4> <
        h6 className = "mt-2" > Make a Deposit to
        continue < /h6> <
        div className = "py-5 px-3 rounded-25" >
        <
        p > Your Goal is to: < span className = "bolder" > { props.goal } < /span> at UGX< span className = "bolder" > { props.goal_amount } < /span >
        within a period of < span className = "bolder" > { props.goal_period } < /span> years, while making monthly deposits of UGX < span className = "bolder" > { props.deposit_amount } < /span > < /p > <
        p > We shall remind you every: < span className = "bolder" > { props.deposit_reminder_day } < /span></p >
        <
        /
        div > < /
        div >
    );
}

function Step8(props) {
    if (props.currentStep !== 8) {
        return null
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
        div > );
}

function Step9(props) {
    if (props.currentStep !== 9) {
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
        div > );
}

function Step10(props) {
    if (props.currentStep !== 10) {
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
        div > < /div ></div > );
}

function Step11(props) {
    if (props.currentStep !== 11) {
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

function Step12(props) {
    if (props.currentStep !== 12) {
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

function Step13(props) {
    if (props.currentStep !== 13) {
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
    export default Goal1;