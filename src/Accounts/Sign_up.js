import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import { API_URL } from '../api';
import axios from 'axios';
import { useState } from "react";
import { useForm } from "react-hook-form";

function SecondaryUser(props) {
    const [step, setStep] = useState(0);
    //state for form data
    const [formData2, setFormData2] = useState({
        gender: '',
        country: '',
        phone_no: '',
        birth_date: '',
        user_type: 'personal'
    });
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        password: '',
        username: '',
        confirmpassword: '',
        email: '',
        profile: ''
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
        document.getElementById("errorMessage").innerText = "Proceed to verify your email at " + formData.email
        setTimeout(() => {
            document.getElementById("errorMessage").style.display = 'none'
        }, 6000);
    }
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setFormData({...formData, [name]: value })
    }
    const handleChange2 = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setFormData2({...formData2, [name]: value })
    }
    console.log(formData)

    function onSubmit() {
        formData.profile = formData2
        console.log(JSON.stringify(formData))
        axios.post(`${API_URL}`, formData, {
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            .catch(function(error) {
                const errorDisplay = () => {
                    document.getElementById("errorMessage").innerText = error.response.data.message
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
                    console.log(error.response.data.message);
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
        success();
    }
    const Learn1 = () => {
        return ( <
            div > <
            div className = 'row p-lg-5 justify-content-center bg-light' >
            <
            Form className = 'rounded-4 mt-lg-5 shadow-sm bg-white p-lg-5 col-lg-5'
            onSubmit = { handleSubmit(onSubmit) } >
            <
            div className = 'row justify-center p-lg-3 p-sm-12' > <
            h2 className = 'text-center' > SIGNUP < /h2> <
            h6 > Register as a Secondary user by filling in the following details. < /h6><
            h6 className = 'active' > < b > All fields are Required < /b>  < /
            h6 > <
            /
            div > <
            Form.Group className = "mb-3 bg-light rounded-lg p-3 px-5"
            controlId = "formBasicText" >
            <
            Form.Label > Date of Birth < /Form.Label> <
            Form.Control type = "date" {...register("birth_date") }
            onChange = { handleChange2 }
            placeholder = "optional" / > <
            /Form.Group> <
            Form.Group className = "mb-3 bg-light rounded-lg p-3 px-5"
            controlId = "formBasicText" >
            <
            Form.Label > Country < /Form.Label> <
            Form.Control type = "text"
            required {...register("country", { required: true, maxLength: 200 }) }
            onChange = { handleChange2 }
            placeholder = "Uganda" / > <
            /Form.Group> <Form.Select aria-label="Default select example" className = "my-3" required defaultValue="Male" {...register("gender", { required: true, minLength: 5, maxLength: 55 }) } onChange = { handleChange2 }>  <
            option value = "Male" > Male < /option> <
            option value = "Female" > Female < /option> < /
            Form.Select > <
            Form.Group className = "mb-3 bg-light rounded-lg p-3 px-5"
            controlId = "formBasicEmail" >
            <
            Form.Label > Phone < /Form.Label> <
            Form.Control type = "phone"
            required {...register("phone_no", { required: true, maxLength: 200 }) }
            onChange = { handleChange2 }
            placeholder = "+256 772971878" / > <
            /Form.Group>  <
            h6 className = "py-3 mx-lg-5 border text-center border-warning text-warning rounded-3"
            onClick = {
                () => { setStep(step + 1) }
            } >
            Next < /h6>  < /
            Form > < /div>< /
            div > )
    }
    if (step === 1) {
        return ( < Learn1 / > )
    }
    return ( <
        div > <
        div className = 'row p-lg-5 justify-content-center bg-light' >
        <
        Form className = 'rounded-4 mt-lg-5 shadow-sm bg-white p-lg-5 col-lg-5'
        onSubmit = { handleSubmit(onSubmit) } >
        <
        div className = 'row justify-center p-lg-3 p-sm-12' > <
        h2 className = 'text-center' > SIGNUP < /h2> <
        h6 > Register as a Secondary user by filling in the following details. < /h6><
        h6 className = 'active' > < b > All fields are Required < /b>  < /
        h6 > <
        /
        div > <
        Form.Group className = "mb-3 bg-light rounded-lg p-3 px-5"
        controlId = "formBasicDate" >
        <
        Form.Label > First Name < /Form.Label> <
        Form.Control type = "text"
        required {...register("first_name", { required: true, maxLength: 200 }) }
        onChange = { handleChange }
        placeholder = "Your first name" / > <
        /Form.Group>  <
        Form.Group className = "mb-3 bg-light rounded-lg p-3 px-5"
        controlId = "formBasicText" >
        <
        Form.Label > Last Name < /Form.Label> <
        Form.Control type = "text"
        required {...register("last_name", { required: true, maxLength: 200 }) }
        onChange = { handleChange }
        placeholder = "your last name" / > <
        /Form.Group><
        h6 className = " py-3 border text-center mx-lg-5 border-warning text-warning rounded-3"
        onClick = {
            () => { setStep(step + 1) }
        } >
        Next < /h6><p className='mt-5'>Back to <span className='active bolder'>{props.button}</span > < /p>  < /
        Form > < /div>< /
        div >
    );
}
export default SecondaryUser;