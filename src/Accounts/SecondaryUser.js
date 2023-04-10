import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import { API_URL } from '../api';
import axios from 'axios';
import { useState } from "react";
import { useForm } from "react-hook-form";

function SecondaryUser() {
    //state for form data
    const [formData, setFormData] = useState({
        dob: '',
        first_name: '',
        last_name: '',
        gender: '',
        country: '',
        email: '',
        phone: '',
        password: ''
    });
    const { register, handleSubmit } = useForm();
    const success = () => {
        document.getElementById("successMessage").innerHTML = "Successful"
        document.getElementById("successMessage").style.backgroundColor = "green"
        document.getElementById("successMessage").style.color = "white"
        document.getElementById("successMessage").style.borderColor = "green"
        document.getElementById("errorMessage").style.display = 'block'
        document.getElementById("errorMessage").style.color = "green"
        document.getElementById("errorMessage").style.borderColor = "green"
        document.getElementById("errorMessage").innerText = "You are now an API User"
        setTimeout(() => {
            document.getElementById("errorMessage").style.display = 'none'
        }, 6000);
    }
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setFormData({...formData, [name]: value })
    }

    console.log(formData)

    function onSubmit(values) {
        axios.post(`${API_URL}`, values, {
                headers: {
                    'content-type': 'multipart/form-data',
                    'Accept': 'application/json'
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
                        document.getElementById("successMessage").innerHTML = "SignUp Unsuccessful"
                    }, 2000);
                }
                if (error.response) {
                    const response = error.response.data.detail
                    if (error.response.status === 400) {
                        errorDisplay(response)
                    } else if (error.response.status === 500) {
                        errorDisplay(response)
                    } else if (error.response.status === 404) {
                        errorDisplay(response)
                    } else if (error.response.status === 403) {
                        errorDisplay(response)
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
        console.log(values);
        success();
    }

    return ( <
        div >
        <
        Form className = 'rounded-lg '
        onSubmit = { handleSubmit(onSubmit) } >
        <
        div className = 'row justify-center p-lg-3 p-sm-12' > <
        h2 className = 'text-center py-lg-5' > SECONDARY USER ACCOUNT < /h2> <
        h6 > Register as an API user by filling in the following details.On submitting, details will be verified by our team and we will contact you on the way forward. < /h6><
        h6 className = 'active' > < b > All fields are Required < /b>  < /
        h6 > <
        /
        div > <
        Form.Group className = "mb-3 shadow rounded-lg p-3 px-5"
        controlId = "formBasicText" >
        <
        Form.Label > Date of Birth < /Form.Label> <
        Form.Control type = "date" {...register("dob") }
        onChange = { handleChange }
        placeholder = "optional" / > <
        /Form.Group> <
        Form.Group className = "mb-3 shadow rounded-lg p-3 px-5"
        controlId = "formBasicDate" >
        <
        Form.Label > First Name < /Form.Label> <
        Form.Control type = "text"
        required = "required" {...register("first_name", { required: true, maxLength: 200 }) }
        onChange = { handleChange }
        placeholder = "Your first name" / > <
        /Form.Group>  <
        Form.Group className = "mb-3 shadow rounded-lg p-3 px-5"
        controlId = "formBasicText" >
        <
        Form.Label > Last Name < /Form.Label> <
        Form.Control type = "text"
        required = "required" {...register("last_name", { required: true, maxLength: 200 }) }
        onChange = { handleChange }
        placeholder = "your last name" / > <
        /Form.Group> <
        Form.Group className = "mb-3 shadow rounded-lg p-3 px-5"
        controlId = "formBasicText" >
        <
        Form.Label > Country < /Form.Label> <
        Form.Control type = "text"
        required = "required" {...register("country", { required: true, maxLength: 200 }) }
        onChange = { handleChange }
        placeholder = "Uganda" / > <
        /Form.Group> <Form.Select aria-label="Default select example" className = "my-3" required = {true} defaultValue="FinTech" {...register("gender", { required: true, minLength: 5, maxLength: 55 }) } onChange = { handleChange }> <
        option value = "Gender" > Gender < /option> <
        option value = "Male" > Male < /option> <
        option value = "Female" > Female < /option> < /
        Form.Select > <
        Form.Group className = "mb-3 shadow rounded-lg p-3 px-5"
        controlId = "formBasicEmail" >
        <
        Form.Label > Phone < /Form.Label> <
        Form.Control type = "phone"
        required = "required" {...register("phone", { required: true, maxLength: 200 }) }
        onChange = { handleChange }
        placeholder = "+256 772971878" / > <
        /Form.Group> <
        Form.Group className = "mb-3 shadow rounded-lg p-3 px-5"
        controlId = "formBasicPhone" >
        <
        Form.Label > Email address < /Form.Label> <
        Form.Control type = "email"
        required = "required" {...register("email", { required: true, maxLength: 200 }) }
        onChange = { handleChange }
        placeholder = "support@cyanase.com" / > <
        /Form.Group>  <
        Form.Group className = "mb-3 shadow rounded-lg p-3 px-5"
        controlId = "formBasicEmail" >
        <
        Form.Label > Password < /Form.Label> <
        Form.Control type = "password"
        required = "required" {...register("password", { required: true, maxLength: 200 }) }
        onChange = { handleChange }
        placeholder = "Create a strong Password" / >
        <
        /Form.Group>  <
        Form.Group className = "mb-3 shadow rounded-lg p-3 px-5"
        controlId = "formBasicPassword" >
        <
        Form.Label > Password < /Form.Label> <
        Form.Control type = "password"
        required = "required"
        onChange = { handleChange }
        placeholder = "Repeat Password" / >
        <
        /Form.Group> <div className='row justify-content-center'> <
        p id = "errorMessage"
        className = 'py-3 mt-3 rounded border text-center fade-in'
        style = {
            { display: 'none' }
        } > hey < /p> <
        Button variant = "warning"
        className = 'shadow text-center'
        id = 'successMessage'
        type = "submit" >
        Submit <
        /Button>  < /
        div > < /
        Form > < /
        div >
    );
}
export default SecondaryUser;