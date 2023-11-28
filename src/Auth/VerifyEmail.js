import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import { API_URL_LOGIN } from '../apis';
import axios from 'axios';
import Header from '../images/Group 3525.png';

class Login extends Component {
    //state for form data
    state = {
        verificationcode: ''
    };
    Show = true;
    getCode = () => {
        document.getElementById("infoMessage").innerText = "Code sent, check your email"
        document.getElementById("infoMessage").style.display = 'block'
        document.getElementById("infoMessage").style.color = "#ff8a00"
        document.getElementById("infoMessage").style.backgroundColor = '#ffb85c3c'
        setTimeout(() => {
            document.getElementById("infoMessage").style.display = 'none'
        }, 3000);
    }

    success = () => {
        document.getElementById("successMessage").innerHTML = "Successful"
        document.getElementById("successMessage").style.backgroundColor = "orange"
        document.getElementById("successMessage").style.color = "white"
        document.getElementById("successMessage").style.border = "block"
        document.getElementById("successMessage").style.borderColor = "orange"
        document.getElementById("infoMessage").style.display = 'block'
        document.getElementById("infoMessage").style.color = "#ff8a00"
        document.getElementById("infoMessage").style.backgroundColor = '#ffb85c3c'
        document.getElementById("infoMessage").innerText = "Your account has been verified successfully"
        setTimeout(() => {
            document.getElementById("errorMessage").style.display = 'none'
        }, 2000);
    }
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        });
    };
    handleSubmit = (e) => {
        e.preventDefault();
        let form_data = new FormData();
        form_data.append('verificationcode', this.state.verificationcode);
        axios.post(`${API_URL_LOGIN}`, form_data, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .catch(function(error) {
                const errorDisplay = () => {
                    document.getElementById("errorMessage").innerText = error.response
                    document.getElementById("errorMessage").style.display = 'block'
                    document.getElementById("errorMessage").style.color = "red"
                    document.getElementById("errorMessage").style.backgroundColor = '#ff353535'
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
                        document.getElementById("successMessage").innerHTML = "Verification Unsuccessful"
                    }, 2000);
                }
                if (error.response) {
                    const responses = error.response.data.detail
                    if (error.response.status === 400) {
                        errorDisplay(responses)
                    } else if (error.response.status === 500) {
                        errorDisplay(responses)
                    } else if (error.response.status === 404) {
                        errorDisplay(responses)
                    } else if (error.response.status === 403) {
                        errorDisplay(responses)
                    }
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    errorSignUp();
                } else if (error.request) {
                    // The request was made but no response was received
                    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                    // http.ClientRequest in node.js
                    errorDisplay(error);
                    errorSignUp();
                } else {
                    // Something happened in setting up the request that triggered an Error
                    errorSignUp();
                    errorDisplay(error);
                }
            })
            .then((response) => {
                const errorDisplay = (response) => {
                    document.getElementById("errorMessage").innerText = response.data.message
                    document.getElementById("errorMessage").style.color = "red"
                    document.getElementById("errorMessage").style.backgroundColor = '#ff353535'
                    document.getElementById("errorMessage").style.display = 'block'
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
                        document.getElementById("successMessage").innerHTML = "Verification Unsuccessful"
                    }, 2000);
                }
                if (response) {
                    errorDisplay(response);
                    errorSignUp()
                }
                    // window.location.pathname = "/"
            });
        this.success();
    }
    render() {
        return ( <
            div > <
            div className = 'row py-4 justify-content-center' > < p > <
            img src = { Header }
            width = '10%'
            className = "mx-lg-5 d-none d-lg-block"
            alt = "investors" / > < /p><p><
            img src = { Header }
            width = '40%'
            className = "d-block d-sm-none mx-auto"
            alt = "investors" / > < /p></div > <
            div className = 'row rounded-4 justify-content-center bg-lighter p-lg-5 p-2' >
            <
            Form className = 'bg-white rounded-4 p-lg-5 py-3 col-lg-5 col-12'
            onSubmit = { this.handleSubmit } >
            <
            div className = 'row justify-center p-3' > <
            h2 className = 'text-center' > Verify Account < /h2> <
            h6 className = 'active mt-3 text-center' > < b > Enter the verification code sent to "Email" < /b>  < /
            h6 > <
            /
            div > <
            Form.Group className = "mb-3 shadow-sm rounded-2 p-3 px-5" >
            <
            Form.Label > Verification Code < /Form.Label> <
            Form.Control type = "text"
            id = 'verificationcode'
            required value = { this.state.username }
            onChange = { this.handleChange }
            placeholder = "000000" / > <
            p id = "errorCode"
            className = 'p-2 rounded-2 px-3 bg-red'
            style = {
                { display: 'none' }
            } > hey < /p> < /
            Form.Group > <
            div className = 'row justify-content-center' > <
            Button variant = "warning"
            className = 'shadow text-center'
            id = 'successMessage'
            type = "submit" >
            Submit Code <
            /Button> < /
            div >
            <
            p className = 'mt-5 text-center' > If you didnt receive the code, click here to < span className = 'active bolder'
            onClick = {
                () => this.getCode()
            } > Resend < /span> a new code to your email.</p >
            <
            h6 id = "errorMessage"
            className = 'py-2 mt-3 rounded border border-danger text-center'
            style = {
                { display: 'none' }
            } > hey < /h6> <
            h6 id = "infoMessage"
            className = 'py-2 mt-3 rounded warning-message text-center'
            style = {
                { display: 'none' }
            } > hey < /h6>  < /
            Form >
            <
            div className = "mt-5 bg-light d-none rounded row justify-content-center" >
            <
            img className = 'rounded-circle text-center avatar border border-warning'
            src = "https://static.vecteezy.com/system/resources/thumbnails/000/439/863/small/Basic_Ui__28186_29.jpg"
            alt = "investors" / > <
            h4 className = 'avatar-name text-center mt-2 p-3 bg-text'
            id = 'guest' > Guest < /h4> < /
            div > < /div> < /
            div >
        );
    }
}
export default Login;