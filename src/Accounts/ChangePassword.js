import React, { Component } from "react";
import { FaUserLock } from "react-icons/fa";
import Form from 'react-bootstrap/Form';
import axios from "axios";
import { API_URL_USER_UPDATE_PASSWORD, TOKEN } from "../apis";
import { Button } from "react-bootstrap";
import { success, catch_errors, preloader, fail } from "../Api/RequestFunctions";

class ChangePassword extends Component {
    //state for form data
    state = {
        password: '',
        confirmpassword: ''
    };
    Show = true;
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        });
    };

    handleSubmit = (e) => {
        preloader()
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
                catch_errors(error)
            })
            .then(function(response) {
                if (!response) {
                    fail("Something went wrong...")
                } else if (response.status === 200 && response.data.success === false) {
                    fail(response.data.message)
                } else {
                    success("Password updated successfully", "/", "successful");
                }
            });
    }
    render() {
        return ( <
            div className = "p-5 text-center" > <
            FaUserLock size = "70"
            className = 'my-3 active rounded-circle border border-warning p-2' / >
            <
            h4 className="bolder"> Change Password < /h4>  <
            Form onSubmit = { this.handleSubmit } >
            <
            Form.Group className = "mb-3 bg-white shadow-sm p-3" >
            <
            Form.Label > Enter your New password < /Form.Label>  <
            Form.Control type = "password"
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
            Form.Control type = "password"
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
            h6 id = "errorMessage"
            className = 'py-2 mt-3 rounded border border-danger text-center'
            style = {
                { display: 'none' }
            } > hey < /h6> <
            h6 id = "infoMessage"
            className = 'py-2 mt-3 rounded warning text-center'
            style = {
                { display: 'none' }
            } > hey < /h6>  <
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