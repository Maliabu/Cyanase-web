import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import { API_URL_RESET_PASSWORD } from '../apis';
import axios from 'axios';
import { success1, catch_errors, preloader, fail } from '../Api/RequestFunctions';
import Logo from '../images/CI.png'
import { useSearchParams } from "react-router-dom";

function ResetPassword(props) {
    let [searchParams] = useSearchParams();
    let email = searchParams.get("email")
    let ref = searchParams.get("ref")
        //state for form data
    const [formData, setFormData] = useState({
        "password": "",
        "confirmpassword": "",
        "email": email
    });
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setFormData({...formData, [name]: value })
    }
    const checkPassword = () => {
        let password = formData.password
        let confirm = formData.confirmpassword
        if (password === confirm) {
            return "yes"
        } else {
            return "no"
        }
    }
    const handleSubmit = (e) => {
        preloader()
        e.preventDefault();
        let check = checkPassword()
        if (check === "no") {
            fail("Passwords dont macth")
        } else {
            console.log("EMAIL: " + formData.email)
            console.log("PASSWORD: " + formData.password)
            axios.post(`${API_URL_RESET_PASSWORD}`, formData.password, {
                    params: {
                        password: (formData.password).toString(),
                        email: formData.email,
                        ref: ref,
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
                        success1("Your password has been reset.", "successful");
                    }
                });
        }
    }
    return ( <
        div > <
        div className = 'row rounded-4 justify-content-center bg-lighter p-5 p-2' >
        <
        Form className = 'bg-white rounded-4 p-lg-3 p-4 col-lg-5 col-12'
        onSubmit = { handleSubmit } >
        <
        div className = 'row justify-content-center' >
        <
        img src = { Logo }
        className = ' my-3 text-center logo'
        alt = "investors" / >
        <
        h3 className = 'text-center' > Password Reset < /h3> <
        h6 className = ' mt-3 text-center' > Provide a strong password
        for your account.All fields are required < /
        h6 > <
        /
        div > <
        Form.Group className = "mb-3 px-lg-5"
        controlId = "formBasicPassword" >
        <
        Form.Label > < h6 > Password < /h6> < /Form.Label > <
        Form.Control type = "password"
        name = "password"
        onChange = { handleChange }
        placeholder = "your password here" / > <
        p id = "errorPassword"
        className = 'p-2 rounded-2 px-3 bg-red'
        style = {
            { display: 'none' }
        } > hey < /p> < /
        Form.Group > <
        Form.Group className = "mb-3 px-lg-5" >
        <
        Form.Label > < h6 > Confirm Password < /h6> < /Form.Label > <
        Form.Control type = "password"
        name = "confirmpassword"
        onChange = { handleChange }
        placeholder = "repeat your password" / > <
        p id = "errorPassword"
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
        Submit <
        /Button> < /
        div >
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
        } > hey < /h6>  < /
        Form > < /div>  < /
        div >
    );
}
export default ResetPassword;