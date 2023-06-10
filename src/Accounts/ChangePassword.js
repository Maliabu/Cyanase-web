import React, { Component } from "react";
import { FaUserLock } from "react-icons/fa";
import Form from 'react-bootstrap/Form';
import axios from "axios";
import { API_URL_USER_UPDATE_PASSWORD, TOKEN } from "../apis";
import { Button } from "react-bootstrap";

class ChangePassword extends Component {
    //state for form data
    state = {
        password: '',
        confirmpassword: ''
    };
    Show = true;

    success = () => {
        document.getElementById("successMessage").innerHTML = "Successful"
        document.getElementById("successMessage").style.backgroundColor = "green"
        document.getElementById("successMessage").style.color = "white"
        document.getElementById("successMessage").style.borderColor = "green"
        document.getElementById("errorMessage").style.display = 'block'
        document.getElementById("errorMessage").style.color = "green"
        document.getElementById("errorMessage").style.borderColor = "green"
        document.getElementById("errorMessage").innerText = "Password Updated"
        setTimeout(() => {
            document.getElementById("errorMessage").style.display = 'none'
        }, 2000);
    }
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        });
        console.log(this.state, this.props);
    };

    handleSubmit = (e) => {
        e.preventDefault();
        let form_data = new FormData();
        form_data.append('password', this.state.password);
        form_data.append('confirmpassword', this.state.confirmpassword);
        axios.post(`${API_URL_USER_UPDATE_PASSWORD}`, form_data, {
                headers: {
                    "Content-Type": "application/json",
                    'Accept': 'application/json',
                    "Authorization": `Token ${ TOKEN }`
                }
            })
            .catch(function(error) {
                const errorDisplay = () => {
                    document.getElementById("errorMessage").innerText = error.response
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
                        document.getElementById("successMessage").innerHTML = "Update Unsuccessful"
                    }, 4000);
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
                    errorSignUp();
                } else if (error.request) {
                    console.log(error.request);
                    errorDisplay(error);
                    errorSignUp();
                } else {
                    console.log('Error', error.message);
                    errorSignUp();
                    errorDisplay(error);
                }
            })
            .then((response) => {
                const errorDisplay = (response) => {
                    document.getElementById("errorMessage").innerText = response.data.message
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
                        document.getElementById("successMessage").innerHTML = "Login Unsuccessful"
                    }, 2000);
                }
                if (response.data.success === false && response.status === 200) {
                    errorDisplay(response);
                    errorSignUp()
                }
                window.location.pathname = "/"
            });
        this.success();
    }
    render() {
        return ( <
            div className = "p-5 text-center" > <
            FaUserLock size = "70"
            className = 'my-5 active rounded-circle border border-warning p-2' / >
            <
            h1 > Change Password < /h1>  <
            Form onSubmit = { this.handleSubmit } >
            <
            Form.Group className = "mb-3 bg-white shadow-sm p-3" >
            <
            Form.Label > Enter your New password < /Form.Label>  <
            Form.Control type = "text"
            id = "password"
            value = { this.state.password }
            onChange = { this.handleChange }
            required placeholder = "example@NewPassword1" / >
            <
            Form.Control.Feedback type = "invalid" >
            This field is required. <
            /Form.Control.Feedback> < /
            Form.Group >
            <
            Form.Group className = "mb-3 bg-white shadow-sm p-3" >
            <
            Form.Label > Repeat your New password < /Form.Label>  <
            Form.Control type = "text"
            id = "confirmpassword"
            value = { this.state.confirmpassword }
            onChange = { this.handleChange }
            required placeholder = "example@NewPassword1" / >
            <
            Form.Control.Feedback type = "invalid" >
            This field is required. <
            /Form.Control.Feedback> < /
            Form.Group >
            <
            p id = "errorMessage"
            className = 'py-3 mt-3 rounded border text-center fade-in'
            style = {
                { display: 'none' }
            } > hey < /p> <
            Button variant = "warning"
            className = 'shadow text-center'
            id = 'successMessage'
            type = "submit" >
            Update Password <
            /Button> < /
            Form > < /
            div >
        );
    }
}

export default ChangePassword;