import React from "react";
import Form from 'react-bootstrap/Form';
import Deposit from '../images/deposit.png';
import Pic from '../Accounts/Pic';
import Goal from '../images/house.png';
import '../App.css'
class ResDeposit extends React.Component {
        constructor(props) {
            super(props)
            this.state = {
                currentStep: 0,
                deposit_category: "",
                payment_means: '',
                deposit_amount: 0,
                currency: ''
            }
            this.procedure = {
                next: ""
            }
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
        getTab5() {
            return this.props.handletab5
        }
        procedures() {
                let currentStep = this.state.currentStep
                if (currentStep === 0) {
                    this.procedure.next = "Choose where to deposit."
                }
                if (currentStep === 1) {
                    this.procedure.next = "Choose how you wish to make your deposit."
                }
                if (currentStep === 2) {
                    this.procedure.next = "Make your deposit"
                }
                if (currentStep === 3) {
                    this.procedure.next = "Make your deposit"
                }
                return ( < p className = "bolder" > { this.procedure.next } < /p>)
                }
                handleChange = event => {
                    const { name, value } = event.target
                    this.setState({
                        [name]: value
                    })
                }

                handleSubmit = event => {
                    event.preventDefault()
                }

                returnToGoals() {
                    setTimeout(() => {
                        document.getElementById("alert").innerHTML = "Deposit made successfully"
                    }, 1000)
                    return setTimeout(() => {
                        this.getTab5()
                    }, 2000)
                }
                submitButton() {
                        let currentStep = this.state.currentStep;
                        if (currentStep === 5) {
                            return ( < h6 className = "bg-warning rounded-3 text-center p-2 mx-5"
                                id = "alert"
                                onClick = {
                                    () => { this.returnToGoals() }
                                } > Confirm < /h6> )
                            }
                            return null
                        }
                        _next = () => {
                            let currentStep = this.state.currentStep
                            currentStep = currentStep >= 5 ? currentStep + 1 : currentStep + 1
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

                        /*
                         * the functions for our button
                         */
                        previousButton() {
                            let currentStep = this.state.currentStep;
                            if (currentStep !== 0) {
                                return ( <
                                    p className = "py-2 mx-5 text-center border text-warning border-warning rounded-3"
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
                            let payment_means = this.state.payment_means;
                            if (currentStep === 0) {
                                return ( < div > <
                                    p className = "py-2 mx-5 my-2 text-center border text-warning border-warning rounded-3"
                                    type = "button"
                                    onClick = { this._next } >
                                    Next <
                                    /p>   <
                                    img src = { Goal }
                                    className = ""
                                    width = '100%'
                                    height = '80%'
                                    alt = "investors" / > < /div>
                                )
                            }
                            if (currentStep < 4) {
                                return ( <
                                    p className = "py-2 mx-5 text-center border text-warning border-warning rounded-3"
                                    type = "button"
                                    onClick = { this._next } >
                                    Next <
                                    /p>        
                                )
                            }
                            if (currentStep === 4 && payment_means === "offline") {
                                return ( <
                                    p className = "py-2 mx-5 text-center bg-warning rounded-3"
                                    type = "button"
                                    onClick = { this._next } >
                                    Continue <
                                    /p>        
                                )
                            }
                            if (currentStep === 4 && payment_means === "wallet") {
                                return ( < h6 className = "bg-warning rounded-3 text-center p-2 mx-5"
                                    id = "alert"
                                    onClick = {
                                        () => { this.returnToGoals() }
                                    } > Confirm < /h6> )
                                }
                                return null;
                            }

                            render() {
                                return ( <
                                    React.Fragment > < div className = "mb-5 pb-3" >
                                    <
                                    Pic /
                                    >
                                    <
                                    form className = "p-2 text-center res-home"
                                    onSubmit = { this.handleSubmit } > {
                                        /* 
                                                  render the form steps and pass required props in
                                                */
                                    } <
                                    img src = { Deposit }
                                    className = "p-3 mt-5 pt-5"
                                    width = '40%'
                                    height = '10%'
                                    alt = "investors" / > { this.procedures() } <
                                    Step0 currentStep = { this.state.currentStep }
                                    handleChange = { this.handleChange }
                                    /> <
                                    Step1 currentStep = { this.state.currentStep }
                                    handleChange = { this.handleChange }
                                    getTab9 = { this.getTab9() }
                                    /><
                                    Step2 currentStep = { this.state.currentStep }
                                    handleChange = { this.handleChange }
                                    /> <
                                    Step3 currentStep = { this.state.currentStep }
                                    handleChange = { this.handleChange }
                                    currency = { this.state.currency }
                                    payment_means = { this.state.payment_means }
                                    /> <
                                    Step4 currentStep = { this.state.currentStep }
                                    handleChange = { this.handleChange }
                                    payment_means = { this.state.payment_means }
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
                                    />  { this.nextButton() }{ this.previousButton() }{this.submitButton()}

                                    <
                                    /form> </div > < /
                                    React.Fragment >
                                );
                            }
                        }

                        function Step0(props) {
                            if (props.currentStep !== 0) {
                                return null;
                            }
                            return ( <
                                div className = "text-start rounded-4 res-home" > <
                                div className = "p-5 rounded-4 shadow-sm"
                                key = "radio" >
                                <
                                div key = { `default-radio` }
                                className = "mb-3" >
                                <
                                h6 className = "font-lighter " > PERSONAL INVESTMENT < /h6> <
                                Form.Check label = "Make deposits to your own personal account"
                                name = "deposit_category"
                                type = "radio"
                                onChange = { props.handleChange }
                                value = "personal investment"
                                required id = "default-radio" /
                                >
                                <
                                h6 className = "font-lighter mt-5" > SACCO GROUPS / INVESTMENT CLUBS < /h6>  <
                                Form.Check label = "Deposit to your sacco group or investment club"
                                name = "deposit_category"
                                onChange = { props.handleChange }
                                type = "radio"
                                value = "sacco/club"
                                required id = "default-radio" /
                                >
                                <
                                h6 className = "font-lighter mt-5" > INSTITUTION / ORGANIZATION < /h6> <
                                Form.Check label = "Deposit to your API Account"
                                name = "deposit_category"
                                onChange = { props.handleChange }
                                type = "radio"
                                value = "institution"
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
                            if (props.id === "personal") {
                            }
                            return ( <
                                div className = " text-start rounded-4 shadow-sm p-5 mb-3" >
                                <
                                div key = "radio" >
                                <
                                div key = { `default-radio` } >
                                <
                                div className = " rounded-4" > <
                                h6 className = "font-lighter" > WALLET < /h6> <
                                Form.Check label = "From my wallet to my personal investment account"
                                name = "payment_means"
                                type = "radio"
                                onChange = { props.handleChange }
                                value = "wallet"
                                required id = "default-radio" /
                                >
                                <
                                /
                                div > <
                                div className = "bg-white rounded-4" > <
                                h6 className = "font-lighter mt-5" > OFFLINE < /h6> <
                                Form.Check label = "Deposit directly to our bank account and we reconcile your account"
                                name = "payment_means"
                                onChange = { props.handleChange }
                                type = "radio"
                                value = "offline"
                                required id = "default-radio" /
                                >
                                <
                                /
                                div > <
                                div className = "bg-white rounded-4 " > <
                                h6 className = "font-lighter mt-5" > ONLINE < /h6> <
                                Form.Check label = "Make an instant deposit on our platform"
                                name = "payment_means"
                                onChange = { props.handleChange }
                                type = "radio"
                                value = "online"
                                required /
                                >
                                <
                                /
                                div > < /
                                div > < /div > <
                                p className = "p-3 mt-4 bolder rounded-3 bg-light text-center" >
                                If you wish to edit your Risk Profile before deposit, proceed to settings < /p> < /
                                div >
                            );
                        }

                        function Step2(props) {
                            if (props.currentStep !== 2) {
                                return null
                            }
                            return ( <
                                div className = "text-start p-3 mb-3 shadow-sm rounded-4" > <
                                p className = "mt-2 bolder" > Choose the currency in which you would like to invest your money <
                                /p> <
                                div className = "p-2 px-3 rounded-4 mt-3"
                                key = "radio" >
                                <
                                div key = { `default-radio` }
                                className = "mb-3" >
                                <
                                h6 className = "font-lighter bg-white rounded-4" > BASIC ACCOUNT < /h6> <
                                Form.Check label = "Deposit and maintain your account in your local currency.(Transaction charges apply)"
                                name = "currency"
                                type = "radio"
                                onChange = { props.handleChange }
                                className = "mx-2"
                                value = "UGX"
                                required id = "default-radio" /
                                >
                                <
                                h6 className = "font-lighter mt-5 bg-white rounded-4" > DOLLAR ACCOUNT < /h6><
                                Form.Check label = "Deposit in your local currency and we shall change it to USD(Standard charges apply)"
                                name = "currency"
                                onChange = { props.handleChange }
                                type = "radio"
                                className = " mx-2"
                                value = "USD"
                                required id = "default-radio" /
                                >
                                <
                                /
                                div > < /div ></div >
                            );
                        }

                        function Step3(props) {
                            if (props.currentStep !== 3) {
                                return null
                            }
                            if (props.payment_means === "wallet") {
                                return ( <
                                    div className = "text-center p-3 mb-3 shadow-sm rounded-4" > <
                                    h6 className = "bolder my-3" > Deposit from Wallet < /h6> <
                                    h6 className = "p-3 bg-light rounded-4 bolder" > Wallet Balance: < span className = "font-lighter" > < span > { props.currency } < /span> 0.00  < /
                                    span > <
                                    /h6 > <
                                    Form.Group className = "mb-3 bg-white rounded-4 p-3 p-3" >
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
                                div className = " res-home p-3 shadow-sm rounded-4" > <
                                p className = "mt-2 mx-2 bolder" > How much would you like to Deposit to your account ? < /p>  <
                                Form.Group className = "mb-3 bg-white p-3 rounded-4" >
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
                            if (props.currentStep !== 4) {
                                return null
                            }
                            if (props.payment_means === "offline") {
                                return ( <
                                    div className = "text-center p-3" > <
                                    h6 className = "p-3 bg-light my-3 rounded-4 font-lighter" > Proceed to deposit < span className = "bolder" > { props.currency } < /span> < span className = "bolder" > { props.deposit_amount } < /span > plus a flat fee of < span className = "bolder" > { props.currency } < /span> <span className = "bolder">{props.fee}</span > .Your Total deposit is < span className = "bolder" > { props.currency } < /span> < span className = "bolder active" > { props.total_deposit } < /span > < /
                                    h6 > < /
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
                                div className = "text-center p-3" > <
                                h6 className = "bolder my-3" > Deposit from Wallet < /h6>  <
                                h6 className = "p-3 bg-light rounded-4 font-lighter" > You wish to deposit < span className = "bolder" > { props.currency } < /span> < span className = "bolder" > { props.deposit_amount } < /span > plus a flat fee of < span className = "bolder" > { props.currency } < /span> <span className = "bolder">{props.fee}</span > .Your Total deposit is < span className = "bolder" > { props.currency } < /span> < span className = "bolder active" > { props.total_deposit } < /span > < /
                                h6 > < /
                                div >
                            )
                        }

                        function Step5(props) {
                            if (props.currentStep !== 5) {
                                return null
                            } else if (props.payment_means === "offline") {
                                return ( <
                                    div className = "text-center p-3" > <
                                    h6 className = "bolder my-3" > Make an Offline Deposit < /h6> <
                                    p className = "mt-2" > Procedure < /p>   <
                                    h6 className = "py-3 p-3 bg-light rounded-4 font-lighter" > Deposit < span className = "bolder" > { props.currency }: < /span> <span className="bolder active">{ props.total_deposit } </span >
                                    to our bank account and proceed to send us your deposit receipt < /
                                    h6 >
                                    <
                                    div className = "row p-2 mt-3" >
                                    <
                                    div className = "col-5 text-start" >
                                    <
                                    p className = "bolder" > Bank name < /p> <
                                    p className = "bolder" > Account number < /p> <
                                    p className = "bolder" > SWIFT CODE < /p>  <
                                    p className = "bolder" > Account name < /p>< /
                                    div > <
                                    div className = "col-7 text-start" >
                                    <
                                    p className = "font-lighter" > DIAMOND TRUST BANK < /p>  <
                                    p className = "font-lighter" > 0190514001 < /p> <
                                    p className = "font-lighter" > DTKEUGKAXXX < /p><
                                    p className = "font-lighter" > CYANASE TECHNOLOGY AND INVESTMENT LTD < /p> < /
                                    div > <
                                    /div>  <
                                    p className = "my-3 p-3 bg-light rounded-3" > Send your deposit receipt to our Email: <
                                    span className = "bolder active" > < u > deposit @cyanase.com < /u> < /span > < /p>  < /
                                    div >
                                )
                            } else if (props.payment_means === "online") {
                                return ( < h1 className = "py-5" > FlutterWave < /h1>)
                                }
                                return ( <
                                    div className = "text-center" > <
                                    h6 className = "bolder my-3" > Deposit < /h6> <
                                    p className = "mt-2" > How much would you like to Deposit to your account ? < /p>  <
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
                                    Form.Group > < button className = "btn btn-warning btn-block my-3" > Submit < /button> < /
                                    div >
                                );
                            }
                            export default ResDeposit;