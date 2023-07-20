import React from "react";
import { AddUser, Wallet } from 'react-iconly';
import Form from 'react-bootstrap/Form';
import DepositPic from '../images/deposit.png';
import Profile1 from '../images/Ellipse 178.png';
import { API_URL_GOAL_DEPOSIT, TOKEN } from '../apis';
import axios from 'axios';
import Button from "react-bootstrap/esm/Button";
import ProgressBar from "@ramonak/react-progress-bar";
import { success, fail, catch_errors, preloader } from "../Api/RequestFunctions";
import { getCurrency } from "../payment/GetCurrency";
import Withdraw from './Withdraw'
import Checkout from "../payment/checkout";

class Goal extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            currentStep: 0,
            payment_means: '',
            deposit_amount: 0,
            currency: getCurrency(this.props.country),
            deposit_category: "",
            account_type: "",
            investment_option: "Cash | Venture | Credit",
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
        if (currency === getCurrency(this.props.country)) {
            accountType = "basic"
        } else {
            accountType = "dollar"
        }
        return accountType
    }

    getStatus(status) {
        if (status === "successful") {
            return "successful"
        }
        console.log(status)
        return status
    }
    submitButton = () => {
        let currentStep = this.state.currentStep;
        let payment_means = this.state.payment_means
        if (currentStep === 4 && payment_means === "online") {
            return ( <
                div className = 'row justify-content-center' > <
                h6 id = "errorMessage"
                className = 'py-3 mt-3 rounded border border-danger text-center'
                style = {
                    { display: 'none' }
                } > hey < /h6> <
                h6 id = "infoMessage"
                className = 'py-3 mt-3 rounded warning text-center'
                style = {
                    { display: 'none' }
                } > hey < /h6>  <
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
    handleSubmit = () => {
        preloader()
        let form_data = new FormData();
        form_data.append('payment_means', this.state.payment_means);
        form_data.append('currency', this.state.currency);
        form_data.append('deposit_category', this.state.deposit_category);
        form_data.append('deposit_amount', this.state.deposit_amount);
        form_data.append('account_type', this.getAccountType());
        form_data.append('investment_option', this.state.investment_option);
        form_data.append('goal_id', this.state.goal_id);
        axios.post(`${API_URL_GOAL_DEPOSIT}`, form_data, {
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
                    fail(response.data.message)
                } else {
                    success("You have deposited to this goal successfully", "/home", "successful");
                }
            });
    }
    _saccoCategory = () => {
        let currentStep = this.state.currentStep
        currentStep = currentStep + 5
        this.setState({
            currentStep: currentStep
        })
    }
    _afterSacco = () => {
        let currentStep = this.state.currentStep
        currentStep = currentStep - 4
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
    _withdraw = () => {
        let currentStep = this.state.currentStep
        currentStep = 7
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
    _prevwithdraw = () => {
            this.setState({
                currentStep: 0
            })
        }
        /*
         * the functions for our button
         */
    previousButton() {
        let currentStep = this.state.currentStep;
        let deposit_category = this.state.deposit_category;
        if (currentStep === 6 && deposit_category === 'sacco/club') {
            return ( <
                h6 className = "py-3 mx-5 text-center warning rounded-3"
                type = "button"
                onClick = { this._prevBeforeSacco } >
                Previous <
                /h6>
            )
        }
        if (currentStep === 7) {
            return ( <
                h6 className = "py-3 mx-5 text-center warning rounded-3"
                type = "button"
                onClick = { this._prevwithdraw } >
                Previous <
                /h6>
            )
        }
        if (currentStep !== 0) {
            return ( <
                h6 className = "py-3 mx-5 text-center warning rounded-3"
                type = "button"
                onClick = { this._prev } >
                Previous <
                /h6>
            )
        }
        return null;
    }
    heading() {
        let currentStep = this.state.currentStep;
        if (currentStep === 0 || currentStep === 7) {
            return null
        }
        return ( < div > <
            Wallet className = "rounded-circle warning p-2"
            size = "xlarge" / > < br / > <
            img src = { DepositPic }
            width = '25%'
            className = "my-3"
            height = '80%'
            alt = "investors" / > < /div>
        )
    }

    wButton() {
        let currentStep = this.state.currentStep;
        if (currentStep === 0) {
            return ( <
                h6 className = "py-3 px-4 bk-warning text-center rounded-3"
                type = "button"
                onClick = { this._withdraw } >
                Withdraw <
                /h6>        
            )
        }
    }
    nextButton() {
        let currentStep = this.state.currentStep;
        let payment_means = this.state.payment_means;
        let deposit_category = this.state.deposit_category;
        if (currentStep === 0) {
            return ( <
                h6 className = "py-3 mx-5 warning text-center rounded-3"
                type = "button"
                onClick = { this._next } >
                Deposit to this goal <
                /h6>        
            )
        }
        if (currentStep === 1 && deposit_category === "personal investment") {
            return ( <
                h6 className = "py-3 mx-5 text-center warning rounded-3"
                type = "button"
                onClick = { this._next } >
                Next <
                /h6>        
            )
        }
        if (currentStep === 6) {
            return ( <
                h6 className = "py-3 mx-5 text-center warning rounded-3"
                type = "button"
                onClick = { this._afterSacco } >
                Next <
                /h6>        
            )
        }

        if (currentStep === 1 && deposit_category === "sacco/club") {
            return ( <
                h6 className = "py-3 mx-5 text-center warning rounded-3"
                type = "button"
                onClick = { this._saccoCategory } >
                Next <
                /h6>        
            )
        }
        if (currentStep === 4 && payment_means === "offline") {
            return ( <
                h6 className = "py-3 mx-5 text-center bk-warning rounded-3"
                type = "button"
                onClick = { this._next } >
                Continue <
                /h6>        
            )
        }
        if (currentStep === 4 && payment_means === "wallet") {
            return ( <
                h6 className = "py-3 mx-5 text-center bk-warning rounded-3"
                type = "button" >
                OK <
                /h6>        
            )
        }
        if (currentStep < 4) {
            return ( <
                h6 className = "py-3 mx-5 text-center warning rounded-3"
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
            form className = "p-lg-5 p-4 modals rounded-2 text-center"
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
            currency = { this.state.currency }
            next = { this.wButton() }
            /> <
            Step1 currentStep = { this.state.currentStep }
            deposit_category = { this.state.deposit_category }
            handleChange = { this.handleChange }
            investmentoption = { this.props.option }
            /> <
            Step2 currentStep = { this.state.currentStep }
            handleChange = { this.handleChange }
            />  <
            Step3 currentStep = { this.state.currentStep }
            handleChange = { this.handleChange }
            currency = { this.state.currency }
            payment_means = { this.state.payment_means }
            /> <
            Step4 currentStep = { this.state.currentStep }
            handleChange = { this.handleChange }
            payment_means = { this.state.payment_means }
            phone = { this.props.phone }
            email = { this.props.email }
            name = { this.props.lastname }
            country = { this.props.country }
            status = { this.getStatus }
            getCurr = { getCurrency(this.props.country) }
            deposit_amount = { this.state.deposit_amount }
            total_deposit = { this.getTotalDeposit() }
            fee = {
                this.getFee()
            }
            currency = { this.state.currency }
            /> <
            Step5 currentStep = { this.state.currentStep }
            handleChange = { this.handleChange }
            payment_means = { this.state.payment_means }
            total_deposit = { this.getTotalDeposit() }
            currency = { this.state.currency }
            />  <Step6  currentStep = { this.state.currentStep }
            handleChange = { this.handleChange }
            /> <Step7  currentStep = { this.state.currentStep }
            handleChange = { this.handleChange }
            goalid = { this.state.goal_id }
            phone = { this.props.phone }
            /> { this.nextButton() } { this.previousButton() } { this.submitButton() } < /
            form >
            <
            /
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
        div className = "row" >
        <
        div className = "col-lg-5 d-none py-lg-5 py-lg-3" >
        <
        div className = "d-none d-lg-block py-lg-5 my-lg-5 mx-lg-5 bg-light rounded-circle" > < AddUser set = "two-tone"
        className = "my-lg-5"
        size = "xlarge" /
        >
        <
        /div> < /
        div >
        <
        div className = " px-3 text-start" >
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
        div className = "d-flex flex-row flex justify-content-center" > { props.currency } <
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
        div className = "d-flex flex-row flex justify-content-center" > { props.currency } <
        h4 className = "px-2 font-lighter" > { props.deposit } < /h4></div >
        <
        /
        div > <
        div className = "row mt-2 p-3 border-top border-bottom" >
        <
        div className = "col p-2" >
        <
        h6 className = "bolder" > Networth: < /h6> <
        div className = "d-flex flex-row flex" > { props.currency } <
        h4 className = "px-2 font-lighter" > { props.deposit } < /h4></div > < /div><div className="col"> {props.next} < /
        div > < /div >  <
        h6 className = "bolder py-3" > You can withdraw once you have achieved your goal at 100 % < /h6> < /
        div > < /
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

function Step3(props) {
    if (props.currentStep !== 3) {
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

function Step4(props) {
    function parentCallback(someStatus) {
        props.status(someStatus)
        console.log(someStatus)
        return someStatus
    }
    if (props.currentStep !== 4) {
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
        h4 className = "py-5 font-lighter" > Proceed to deposit < span className = "bolder" > { props.currency } < /span> < span className = "bolder" > { props.deposit_amount } < /span > plus a flat fee of < span className = "bolder" > { props.currency } < /span> <span className = "bolder">{props.fee} < /span > .Your Total deposit amount is < span className = "bolder" > { props.currency } < /span > < span className = "bolder active" > { props.total_deposit} < /span > < /
        h4 >
        <
        Checkout phone = { props.phone }
        country = { props.country }
        name = { props.name }
        email = { props.email }
        amount = { props.total_deposit }
        currency = { props.getCurr }
        callBack = { parentCallback }
        / > < /
        div >
    )
}

function Step5(props) {
    if (props.currentStep !== 5) {
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
            required placeholder = " 10,000" / >
            <
            Form.Control.Feedback type = "invalid" >
            This field is required. <
            /Form.Control.Feedback> < /
            Form.Group > < /
            div >
        );
    }

    function Step6(props) {
        if (props.currentStep !== 6) {
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

        function Step7(props) {
            if (props.currentStep !== 7) {
                return null
            }
            return ( < Withdraw goalid = { props.goalid }
                phone = { props.phone }
                / > )
            }
            export default Goal;