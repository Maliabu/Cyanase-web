import React from 'react';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/esm/Button';
import '../App.css';
import { API_URL } from '../apis';
import axios from 'axios';
import { useState } from "react";
import { useForm } from "react-hook-form";

function SecondaryUser(props) {
    const [step, setStep] = useState(1);
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
        username: 'forget',
        confirmpassword: '',
        email: '',
        profile: ''
    });
    const { handleSubmit } = useForm();
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
    const submitButton = () => {
        if (step === 3) {
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
                type = "submit" >
                SignUp <
                /Button> < /
                div >
            )
        }
        return null
    }
    const nextButton = () => {
            if (step !== 3) {
                return ( <
                    h6 className = " py-2 border text-center mx-lg-5 border-warning text-warning rounded-3"
                    onClick = {
                        () => { setStep(step + 1) }
                    } >
                    Next < /h6>)
                }
                return null
            }
            const prevButton = () => {
                if (step !== 1) {
                    return ( <
                        h6 className = " py-2 mt-2 border text-center mx-lg-5 border-warning text-warning rounded-3"
                        onClick = {
                            () => { setStep(step - 1) }
                        } >
                        Previous < /h6>)
                    }
                    return null
                }

                function onSubmit() {
                    formData.profile = formData2
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
                                errorSignUp();
                            } else if (error.request) {
                                // The request was made but no response was received
                                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                                // http.ClientRequest in node.js
                            } else {
                                // Something happened in setting up the request that triggered an Error
                            }
                        });
                    success();
                }

                return ( <
                    React.Fragment > <
                    div className = 'row justify-content-center bg-light p-1 rounded-4' >
                    <
                    // col-lg-5 should do the trick for responsiveness
                    form className = 'shadow-sm bg-white p-lg-5 rounded-4'
                    onSubmit = { handleSubmit(onSubmit) } >
                    <
                    div className = 'row justify-center p-lg-3 p-sm-12' > <
                    h2 className = 'text-center' > SIGNUP < /h2> <
                    h6 > Register as a Secondary user by filling in the following details. < /h6><
                    h6 className = 'active' > < b > All fields are Required < /b>  < /
                    h6 > <
                    /
                    div > <
                    Learn1 currentStep = { step }
                    change = { handleChange }
                    / > <
                    Learn2 currentStep = { step }
                    change2 = { handleChange2 }
                    / > <
                    Learn3 currentStep = { step }
                    change = { handleChange }
                    / > {prevButton()}{nextButton()}{submitButton()}<p className='mt-5'>Back to <span className='active bolder'>{props.button}</span > < /p>  < /
                    form > < /div>< /
                    React.Fragment >
                );

            }

            function Learn1(props) {
                if (props.currentStep !== 1) {
                    return null
                }
                return ( <
                    div > <
                    Form.Group className = "mb-3 bg-light rounded-lg p-3 px-5"
                    controlId = "formBasicDate" >
                    <
                    Form.Label > First Name < /Form.Label> <
                    Form.Control type = "text"
                    required name = "first_name"
                    onChange = { props.change }
                    placeholder = "Your first name" / > <
                    /Form.Group>  <
                    Form.Group className = "mb-3 bg-light rounded-lg p-3 px-5"
                    controlId = "formBasicText" >
                    <
                    Form.Label > Last Name < /Form.Label> <
                    Form.Control type = "text"
                    required name = "last_name"
                    onChange = { props.change }
                    placeholder = "your last name" / > <
                    /Form.Group><
                    Form.Group className = "mb-3 bg-light rounded-lg p-3 px-5"
                    controlId = "formBasicText" >
                    <
                    Form.Label > Email < /Form.Label> <
                    Form.Control type = "email"
                    required name = "email"
                    onChange = { props.change }
                    placeholder = "your email" / > <
                    /Form.Group>< /
                    div > )
            }

            function Learn2(props) {
                if (props.currentStep !== 2) {
                    return null
                }
                return ( <
                    div > <
                    Form.Group className = "mb-3 bg-light rounded-lg p-3 px-5"
                    controlId = "formBasicText" >
                    <
                    Form.Label > Date of Birth < /Form.Label> <
                    Form.Control type = "date"
                    name = "birth_date"
                    onChange = { props.change2 }
                    placeholder = "optional" / > <
                    /Form.Group> <
                    Form.Group className = "mb-3 bg-light rounded-lg p-3 px-5"
                    controlId = "formBasicText" >
                    <
                    Form.Label > Country < /Form.Label> <
                    Form.Control type = "text"
                    required name = "country"
                    onChange = { props.change2 }
                    placeholder = "Uganda" / > <
                    /Form.Group> <Form.Select aria-label="Default select example" className = "my-3" required defaultValue="Male" name="gender" onChange = { props.change2 }>  <
                    option value = "Male" > Male < /option> <
                    option value = "Female" > Female < /option> < /
                    Form.Select > <
                    Form.Group className = "mb-3 bg-light rounded-lg p-3 px-5"
                    controlId = "formBasicEmail" >
                    <
                    Form.Label > Phone < /Form.Label> <
                    Form.Control type = "phone"
                    required name = "phone_no"
                    onChange = { props.change2 }
                    placeholder = "+256 772971878" / > <
                    /Form.Group> < /
                    div > )
            }

            function Learn3(props) {
                if (props.currentStep !== 3) {
                    return null
                }
                return ( <
                    div > <
                    Form.Group className = "mb-3 bg-light rounded-lg p-3 px-5"
                    controlId = "formBasicDate" >
                    <
                    Form.Label > Password < /Form.Label> <
                    Form.Control type = "password"
                    required name = "password"
                    onChange = { props.change }
                    placeholder = "create a strong password" / > <
                    /Form.Group>  <
                    Form.Group className = "mb-3 bg-light rounded-lg p-3 px-5"
                    controlId = "formBasicText" >
                    <
                    Form.Label > Repeat Password < /Form.Label> <
                    Form.Control type = "password"
                    required name = "confirmpassword"
                    onChange = { props.change }
                    placeholder = "confirm password" / > <
                    /Form.Group> < /
                    div > )
            }
            export default SecondaryUser;