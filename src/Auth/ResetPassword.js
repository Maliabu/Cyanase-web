import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import { API_URL_RESET_PASSWORD } from '../apis';
import axios from 'axios';
import { success, catch_errors, preloader, fail } from '../Api/RequestFunctions';
import Logo from '../images/CIPNG.png'
import { useSearchParams } from "react-router-dom";

function ResetPassword(props) {
    const [showpassword,setShowPassword] = useState(false)
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
    const togglePassword =()=>{
        setShowPassword(!showpassword)
    }
    const handleSubmit = (e) => {
        preloader()
        e.preventDefault();
        let check = checkPassword()
        if (check === "no") {
            fail("Passwords dont macth")
        } else {
            // console.log("EMAIL: " + formData.email)
            // console.log("PASSWORD: " + formData.password)
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
                        fail("Something went wrong...Password not reset")
                    } else if (response.status === 200 && response.data.success === false) {
                        fail(response.data.message)
                    } else {
                        success("Your password has been reset. Redirecting to login, please wait...","/","successful");
                    }
                });
        }
    }
    return ( <
        div > <
        div className = 'row rounded-4 justify-content-center bg-lighter p-lg-5 p-4' >
        <
        Form className = 'bg-white rounded-4 col-lg-5 col-md-7 pb-3 col-12'
        onSubmit = { handleSubmit } >
        <
        div className = 'row justify-content-center blue-dark p-4 rounded-top-4' >
        <
        img src = { Logo }
        className = ' my-3 text-center logo'
        alt = "investors" / >
        <
        h3 className = 'text-center' > Password Reset < /h3> <
        h6 className = 'text-center' > Provide a strong password
        for your account.All fields are required < /
        h6 > <
        /
        div > <
        Form.Group className = "my-1 px-lg-3"
        controlId = "formBasicPassword" >
        <
        Form.Label > < h6 className='m-0'> Password < /h6> < /Form.Label > <
        Form.Control type = {showpassword?"text":"password"}
        name = "password"
        onChange = { handleChange }
        placeholder = "your password here" / > <
        p id = "errorPassword"
        className = 'p-2 rounded-2 px-3 bg-red'
        style = {
            { display: 'none' }
        } > hey < /p> < /
        Form.Group > <
        Form.Group className = "mb-3 px-lg-3" >
        <
        Form.Label > < h6 className='m-0'> Confirm Password < /h6> < /Form.Label > <
        Form.Control type = {showpassword?"text":"password"}
        name = "confirmpassword"
        onChange = { handleChange }
        placeholder = "repeat your password" / > <
        p id = "errorPassword"
        className = 'p-2 rounded-2 px-3 bg-red'
        style = {
            { display: 'none' }
        } > hey < /p><
        div className='my-1'
        key = "default-checkbox" >
            <Form.Check type='checkbox' id = "default-checkbox" label='Show Password' onClick={togglePassword}/></div> < /
        Form.Group ><
        div className = 'text-center' > <
        Button variant = "warning"
        className = 'shadow text-center my-2'
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