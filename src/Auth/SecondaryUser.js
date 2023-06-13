import React from 'react';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/esm/Button';
import '../App.css';
import { API_URL } from '../apis';
import axios from 'axios';
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ValidateForms } from './ValidateForms';
import PhoneInput from 'react-phone-number-input';


function SecondaryUser(props) {
    const [step, setStep] = useState(1);
    const [valuePhone, setValuePhone] = useState("");
    const [countryInput, setCountryInput] = useState("");
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
    console.log(formData2)
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
            setStep(step + 1)
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
        console.log(phone, gender)
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
    const User = async() => {
        try {
            const response = await axios.post(`${API_URL}`, formData, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            console.log(response)
            return response;
        } catch (error) {
            return error ? error.response ? error.response.data : error : error.message;
        }
    };
    const success = () => {
        document.getElementById("successMessage").innerHTML = "Successful"
        document.getElementById("successMessage").style.color = "white"
        document.getElementById("successMessage").style.backgroundColor = '#ff8a00'
        document.getElementById("errorMessage").style.display = 'block'
        document.getElementById("errorMessage").style.color = "#ff8a00"
        document.getElementById("errorMessage").style.backgroundColor = '#ffb85c3c'
        document.getElementById("errorMessage").innerText = "Proceed to verify your email at " + formData.email
        setTimeout(() => {
            document.getElementById("errorMessage").style.display = 'none'
        }, 2000);
    }
    const errorDisplay = (response) => {
        document.getElementById("errorMessage").innerText = response.data.message
        document.getElementById("errorMessage").style.display = 'block'
        document.getElementById("errorMessage").style.color = "red"
        document.getElementById("errorMessage").style.backgroundColor = '#ff353535'
        setTimeout(() => {
            document.getElementById("errorMessage").style.display = 'none'
        }, 2000);
    }
    const errorSignUp = () => {
        document.getElementById("successMessage").innerHTML = "Something went wrong"
        document.getElementById("successMessage").style.backgroundColor = "red"
        document.getElementById("successMessage").style.color = "white"
        setTimeout(() => {
            document.getElementById("successMessage").innerHTML = "Login Unsuccessful"
        }, 2000);
        setTimeout(() => {
            document.getElementById("successMessage").style.backgroundColor = "none"
        }, 1000);
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
    const submitButton = () => {
        if (step === 3) {
            return ( <
                div className = 'row justify-content-center' > <
                p id = "errorMessage"
                className = 'py-3 mt-3 rounded text-center'
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
        if (step === 1) {
            return ( <
                h6 className = " py-3 text-center mx-lg-5 warning rounded-3"
                onClick = {
                    () => validate1()
                } >
                Next < /h6>
            )
        }
        if (step === 2) {
            return ( <
                h6 className = " py-3 text-center mx-lg-5 warning rounded-3"
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
                h6 className = " py-3 mt-2 text-center mx-lg-5 warning rounded-3"
                onClick = {
                    () => { setStep(step - 1) }
                } >
                Previous < /h6>)
            }
            return null
        }

        function onSubmit() {
            validate3()
            formData.profile = formData2
            User().then(response => {
                console.log(response)
                if (response.data.success === false || response.success === false) {
                    errorDisplay(response)
                    errorSignUp()
                } else {
                    success()
                    window.location.pathname = "/verify"
                }
            });
        }
        return ( <
            React.Fragment > <
            div className = 'row justify-content-center bg-light p-lg-5 p-2 rounded-4' >
            <
            // col-lg-5 should do the trick for responsiveness
            form className = 'bg-whiter p-lg-5 rounded-4 col-lg-5'
            onSubmit = { handleSubmit(onSubmit) } >
            <
            div className = 'row justify-center p-lg-3 pt-5 p-sm-12' > <
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
            / > {prevButton()}{nextButton()}{submitButton()}<p className='mt-lg-5 mt-4 text-center'>Back to <span className='active bolder'>{props.button}</span > < /p>  < /
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
            Form.Group className = "mb-3 shadow-sm rounded-3 p-3 px-5"
            controlId = "formBasicDate" >
            <
            Form.Label > First Name < /Form.Label> <
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
            Form.Group className = "mb-3 shadow-sm rounded-3 p-3 px-5"
            controlId = "formBasicText" >
            <
            Form.Label > Last Name < /Form.Label> <
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
            Form.Group className = "mb-3 shadow-sm rounded-3 p-3 px-5"
            controlId = "formBasicText" >
            <
            Form.Label > Email < /Form.Label> <
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
            Form.Group className = "mb-3 shadow-sm rounded-3 p-3 px-5"
            controlId = "formBasicText" >
            <
            Form.Label > Date of Birth < /Form.Label> <
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
            Form.Group className = "mb-3 d-none shadow-sm rounded-3 p-3 px-5"
            controlId = "formBasicText" >
            <
            Form.Label > Country < /Form.Label> <
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
            Form.Label > Gender < /Form.Label> <
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
            Form.Group className = "mb-3 shadow-sm rounded-3 p-3 px-5" >
            <
            Form.Label > Country and Phone < /Form.Label> <
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
            Form.Group className = "mb-3 shadow-sm rounded-3 p-3 px-5"
            controlId = "formBasicDate" >
            <
            Form.Label > Password < /Form.Label> <
            Form.Control type = "password"
            name = "password"
            onChange = { props.change }
            placeholder = "create a strong password" / > <
            p id = "errorPassword"
            className = 'p-2 rounded-2 px-3 bg-red'
            style = {
                { display: 'none' }
            } > hey < /p> < /
            Form.Group > <
            Form.Group className = "mb-3 shadow-sm rounded-3 p-3 px-5"
            controlId = "formBasicText" >
            <
            Form.Label > Repeat Password < /Form.Label> <
            Form.Control type = "password"
            name = "confirmpassword"
            onChange = { props.change }
            placeholder = "confirm password" / > <
            p id = "errorConfirmP"
            className = 'p-2 rounded-2 px-3 bg-red'
            style = {
                { display: 'none' }
            } > hey < /p> < /
            Form.Group > < /
            div > )
    }
    export default SecondaryUser;