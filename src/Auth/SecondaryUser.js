import React from 'react';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/esm/Button';
import '../App.css';
import { API_URL,API_URL_GET_AUTH_USER_BY_EMAIL } from '../apis';
import axios from 'axios';
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ValidateForms } from './ValidateForms';
import PhoneInput from 'react-phone-number-input';
import { success1, catch_errors, fail, preloader } from '../Api/RequestFunctions'


function SecondaryUser(props) {
    const [step, setStep] = useState(1);
    const [valuePhone, setValuePhone] = useState("");
    const [countryInput, setCountryInput] = useState("");
    const [showpassword,setShowPassword] = useState(false)
    //state for form data
    const [formData2, setFormData2] = useState({
        gender: '',
        country: countryInput,
        phone_no: valuePhone,
        birth_date: '',
        user_type: 'personal'
    });
    formData2.phone_no = valuePhone
    formData2.country = countryInput
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        password: '',
        username: 'forget',
        confirmpassword: '',
        email: '',
        profile: ''
    });
    formData.profile = formData2
    const { handleSubmit } = useForm();
    const validate1 = () => {
        let fname = ValidateForms("first_name")
        let lname = ValidateForms("last_name")
        let email = ValidateForms("email")

        if (fname.length === 0) {
            document.getElementById("errorFirst").style.display = "block"
            document.getElementById("errorFirst").style.color = "crimson"
            document.getElementById("errorFirst").innerText = "First name is required"
        } else {
            document.getElementById("errorFirst").style.display = "none"
        }
        if (lname.length === 0) {
            document.getElementById("errorLast").style.display = "block"
            document.getElementById("errorLast").style.color = "crimson"
            document.getElementById("errorLast").innerText = "Last name is required"
        } else {
            document.getElementById("errorLast").style.display = "none"
        }
        if (email.length === 0) {
            document.getElementById("errorEmail").style.display = "block"
            document.getElementById("errorEmail").style.color = "crimson"
            document.getElementById("errorEmail").innerText = "Email is required"
        } else {
            document.getElementById("errorEmail").style.display = "none"
        }
        if (fname.length !== 0 && lname.length !== 0 && email.length !== 0) {
            axios.post(`${API_URL_GET_AUTH_USER_BY_EMAIL}`,email,{
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(function(response){
                if(response.data === true){
                    document.getElementById("errorEmail").style.display = "block"
                    document.getElementById("errorEmail").style.color = "crimson"
                    document.getElementById("errorEmail").innerText = "This account already exists, try to login instead"
                }
                else{
                    document.getElementById("errorEmail").style.display = "none"
                    setStep(step + 1)
                }
            })
        }
    }
    const validate2 = () => {
        let dob = ValidateForms("birth_date")
        let phone = valuePhone
        let gender = ValidateForms("gender")

        if (dob.length === 0) {
            document.getElementById("errorDate").style.display = "block"
            document.getElementById("errorDate").style.color = "crimson"
            document.getElementById("errorDate").innerText = "Select a date of birth"
        } else {
            document.getElementById("errorDate").style.display = "none"
        }
        if (gender === "Male" || gender === "Female") {
            document.getElementById("errorGender").style.display = "none"
        } else {
            document.getElementById("errorGender").style.display = "block"
            document.getElementById("errorGender").style.color = "crimson"
            document.getElementById("errorGender").innerText = "Select your gender"
        }
        if (phone.length === 0 || phone.length < 10) {
            document.getElementById("errorPhone").style.display = "block"
            document.getElementById("errorPhone").style.color = "crimson"
            document.getElementById("errorPhone").innerText = "Phone is required"
        } else {
            document.getElementById("errorPhone").style.display = "none"
        }
        if (dob.length !== 0 && phone.length >= 10) {
            setStep(step + 1)
        }
    }
    const validate3 = () => {
        let password = ValidateForms("password")
        let confirmpassword = ValidateForms("confirmpassword")

        if (password.length === 0) {
            document.getElementById("errorPassword").style.display = "block"
            document.getElementById("errorPassword").style.color = "crimson"
            document.getElementById("errorPassword").innerText = "Password is required"
        } else {
            document.getElementById("errorPassword").style.display = "none"
        }
        if (confirmpassword === 0) {
            document.getElementById("errorConfirmP").style.display = "block"
            document.getElementById("errorConfirmP").style.color = "crimson"
            document.getElementById("errorConfirmP").innerText = "Please confirm your password"
        } else {
            document.getElementById("errorConfirmP").style.display = "none"
        }
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
    const togglePassword =()=>{
        setShowPassword(!showpassword)
    }
    const submitButton = () => {
        if (step === 3) {
            return ( <
                div className = 'row justify-content-center' > <
                h6 id = "errorMessage"
                className = 'py-2 mt-3 rounded border border-danger text-center'
                style = {
                    { display: 'none' }
                } > hey < /h6> <
                h6 id = "infoMessage"
                className = 'py-2 mt-3 rounded warning text-center'
                style = {
                    { display: 'none' }
                } > hey < /h6>   <
                Button variant = "warning"
                className = 'shadow text-center'
                id = 'successMessage'
                type = "submit" >
                Submit <
                /Button> < /
                div >
            )
        }
        return null
    }
    const nextButton = () => {
        if (step === 1) {
            return ( <
                h6 className = " py-3 text-center mx-5 warning rounded-3"
                onClick = {
                    () => validate1()
                } >
                Next < /h6>
            )
        }
        if (step === 2) {
            return ( <
                h6 className = " py-3 text-center mx-5 warning rounded-3"
                onClick = {
                    () => validate2()
                } >
                Next < /h6>
            )
        }
        return null
    }
    const prevButton = () => {
        if (step !== 1) {
            return ( <
                h6 className = " py-3 mt-2 text-center mx-5 warning rounded-3"
                onClick = {
                    () => { setStep(step - 1) }
                } >
                Previous < /h6>)
            }
            return null
        }

        function onSubmit() {
            validate3()
            preloader()
            formData.profile = formData2
            axios.post(`${API_URL}`, formData, {
                    headers: {
                        "Content-Type": "application/json"
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
                        success1("Almost there. Please check your email for a confirmation link", "successful");
                        const token = response.data.token
                        localStorage.setItem('token', token)
                    }
                });
        }
        return ( <
            React.Fragment > <
            div className = 'row justify-content-center bg-lighter p-lg-5 p-3 rounded-4' >
            <
            // col-lg-5 should do the trick for responsiveness
            form className = 'bg-white rounded-4 col-lg-5'
            onSubmit = { handleSubmit(onSubmit) } >
            <
            div className = 'row justify-center blue-dark p-4 rounded-top-4 p-sm-12' > <
            h2 className = 'text-center' > SIGNUP < /h2> <
            h6 className = 'text-center' > Register by filling in the following details. < /h6><
            h6 className = 'active text-center' > < b > All fields are Required < /b>  < /
            h6 > <
            /
            div > <
            Learn1 currentStep = { step }
            change = { handleChange }
            / > <
            Learn2 currentStep = { step }
            change2 = { handleChange2 }
            value = { valuePhone }
            setPhone = { setValuePhone }
            setCountry = { setCountryInput }
            country = { countryInput }
            / > <
            Learn3 currentStep = { step }
            change = { handleChange }
            togglePassword = {togglePassword}
            showpassword = {showpassword}
            / > {prevButton()}{nextButton()}{submitButton()}<p className='mt-lg-3 text-center'>Back to <span className='active bolder'>{props.button}</span > < /p>  < /
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
            Form.Group className = " rounded-3 px-3 mt-3"
            controlId = "formBasicDate" >
            <
            Form.Label > < h6 className = 'm-0' > First Name < /h6> < /Form.Label > <
            Form.Control type = "text"
            name = "first_name"
            onChange = { props.change }
            placeholder = "Your first name" / > <
            p id = "errorFirst"
            className = 'p-2 rounded-2 px-3 bg-red'
            style = {
                { display: 'none' }
            } > hey < /p> < /
            Form.Group > <
            Form.Group className = " rounded-3 px-3 my-2"
            controlId = "formBasicText" >
            <
            Form.Label > < h6 className = 'm-0' > Last Name < /h6> < /Form.Label > <
            Form.Control type = "text"
            name = "last_name"
            onChange = { props.change }
            placeholder = "your last name" / > <
            p id = "errorLast"
            className = 'p-2 rounded-2 px-3 bg-red'
            style = {
                { display: 'none' }
            } > hey < /p> < /
            Form.Group > <
            Form.Group className = " rounded-3 px-3 mb-2"
            controlId = "formBasicText" >
            <
            Form.Label > < h6 className = 'm-0' > Email < /h6> < /Form.Label > <
            Form.Control type = "email"
            name = "email"
            onChange = { props.change }
            placeholder = "your email" / > <
            p id = "errorEmail"
            className = 'p-2 rounded-2 px-3 bg-red'
            style = {
                { display: 'none' }
            } > hey < /p> < /
            Form.Group > < /
            div > )
    }

    function Learn2(props) {
        if (props.currentStep !== 2) {
            return null
        }
        return ( <
            div > <
            Form.Group className = "mb-3 shadow-sm rounded-3 p-3"
            controlId = "formBasicText" >
            <
            Form.Label > < h6 className = 'm-0' > Date of Birth < /h6> < /Form.Label > <
            Form.Control type = "date"
            name = "birth_date"
            onChange = { props.change2 }
            placeholder = "optional" / > <
            p id = "errorDate"
            className = 'p-2 rounded-2 px-3 bg-red'
            style = {
                { display: 'none' }
            } > hey < /p> < /
            Form.Group > <
            Form.Group className = " d-none shadow-sm rounded-3 p-3"
            controlId = "formBasicText" >
            <
            Form.Label > < h6 > Country < /h6> < /Form.Label > <
            Form.Control type = "text"
            name = "country"
            value = { props.value }
            onChange = { props.setPhone }
            placeholder = "Uganda" / > <
            p id = "errorCountry"
            className = 'p-2 rounded-2 px-3 bg-red'
            style = {
                { display: 'none' }
            } > hey < /p> < /
            Form.Group >
            <
            Form.Label > < h6 className = 'm-0' > Gender < /h6> < /Form.Label > <
            Form.Select name = "gender"
            onChange = { props.change2 } > <
            option value = "Gender" > Select your gender < /option> <
            option value = "Male" > Male < /option> <
            option value = "Female" > Female < /option> < /
            Form.Select > <
            p id = "errorGender"
            className = 'p-2 rounded-2 px-3 bg-red'
            style = {
                { display: 'none' }
            } > hey < /p>   <
            Form.Group className = "mb-3 shadow-sm rounded-3 p-3" >
            <
            Form.Label > < h6 className = 'm-0' > Country and Phone < /h6> < /Form.Label > <
            PhoneInput international placeholder = "Enter phone number"
            name = "phone_no"
            country = { props.country }
            onCountryChange = { props.setCountry }
            value = { props.value }
            onChange = {
                props.setPhone
            }
            /> <
            p id = "errorPhone"
            className = 'p-2 rounded-2 px-3 bg-red'
            style = {
                { display: 'none' }
            } > hey < /p></Form.Group > < /
            div > )
    }

    function Learn3(props) {
        if (props.currentStep !== 3) {
            return null
        }
        return ( <
            div > <
            Form.Group className = " rounded-3 px-3" >
            <
            Form.Label > < h6 className = 'm-0' > Password < /h6> < /Form.Label > <
            Form.Control
            type = {props.showpassword?"text":"password"}
            name = "password"
            onChange = { props.change }
            placeholder = "create a strong password" / > <
            p id = "errorPassword"
            className = 'p-2 rounded-2 px-3 bg-red'
            style = {
                { display: 'none' }
            } > hey < /p> < /
            Form.Group > <
            Form.Group className = " rounded-3 px-3 my-2" >
            <
            Form.Label > < h6 className = 'm-0' > Repeat Password < /h6> < /Form.Label > <
            Form.Control
            type = {props.showpassword?"text":"password"}
            name = "confirmpassword"
            onChange = { props.change }
            placeholder = "confirm password" / > <
            p id = "errorConfirmP"
            className = 'p-2 rounded-2 px-3 bg-red'
            style = {
                { display: 'none' }
            } > hey < /p><
            div className='my-1'
            key = "default-checkbox" >
                <Form.Check type='checkbox' id = "default-checkbox" label='Show Password' onClick={props.togglePassword}/></div> < /
            Form.Group > < /
            div > )
    }
    export default SecondaryUser;