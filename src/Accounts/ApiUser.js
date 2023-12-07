import React from 'react';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/esm/Button';
import '../App.css';
import { API_URL_REGISTER_API_USER } from '../apis';
import axios from 'axios';
import { useState } from "react";
import { useForm } from "react-hook-form";
import PhoneInput from 'react-phone-number-input';
import { success1,catch_errors,fail,preloader } from '../Api/RequestFunctions';


function ApiUser(props) {
    const [showpassword,setShowPassword] = useState(false)
    const [valuePhone, setValuePhone] = useState("");
    const [countryInput, setCountryInput] = useState("");
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        password: '',
        username: 'cyanase',
        confirmpassword: '',
        email: '',
        moa: '',
        country: countryInput,
        phone: valuePhone,
        user_type: 'business',
        company_category: ''
    });
    formData.phone = valuePhone
    formData.country = countryInput
    const { handleSubmit } = useForm();
    const handleFileChange = (event) => {
        // formData2.moa = event.target.files[0]
        // formData2.coi = event.target.files[0]
        const name = event.target.id
        const value = event.target.files[0]
        setFormData({...formData, [name]: value })
    };
    const handleChange = (event) => {
        const name = event.target.id;
        const value = event.target.value;
        setFormData({...formData, [name]: value })
    }
    const togglePassword =()=>{
        setShowPassword(!showpassword)
    }
        function onSubmit() {
            preloader()
            axios.post(`${API_URL_REGISTER_API_USER}`, formData,{
                headers: {
                    "Content-Type": "multipart/form-data"
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
            div > <
            div className = 'row justify-content-center bg-light rounded-4 p-1' >
            <
            Form className = 'rounded-4 shadow-sm bg-white p-lg-4'
            onSubmit = { handleSubmit(onSubmit) } >
            <
            div className = 'row justify-center p-3' > <
            h4 className = 'text-center' > API USER ACCOUNT < /h4> <
            h6 > Register as an API user by filling in the following details.On submitting, details will be verified by our team and we will contact you on the way forward. < /h6><
            h6 className = 'active' > < b > All fields are Required < /b>  < /
            h6 > <
            /
            div > <
            Form.Group className = " px-5" >
            <h6 className='m-0'><
            Form.Label > Company Name < /Form.Label> </h6>
            <
            Form.Control type = "text"
            required = { true }
            id = 'first_name'
            onChange = { handleChange }
            placeholder = "Cyanase Investors Limited" / > <
            /Form.Group>  <
            Form.Group className = " px-5 mt-3" >
            <h6 className='m-0'><
            Form.Label > Website < /Form.Label> </h6> <
            Form.Control type = "text"
            required = { true }
            id = 'last_name'
            onChange = { handleChange }
            placeholder = "cyanase.com" / > <
            /Form.Group> <
            Form.Group className = "mb-3 shadow-sm rounded-3 p-3" >
            <
            Form.Label > < h6 className = 'm-0' > Country and Phone < /h6> < /Form.Label > <
            PhoneInput international placeholder = "Enter phone number"
            name = "phone_no"
            country = { countryInput }
            onCountryChange = { setCountryInput }
            value = { valuePhone }
            onChange = {
                setValuePhone
            }
            /></Form.Group > <Form.Select className = "my-3" required  defaultValue="FinTech" id='company_category' onChange = { handleChange }> <
            option value = "FinTech" > FinTech < /option> <
            option value = "FinTech" > FinTech < /option> <
            option value = "EduTech" > EduTech < /option> <
            option value = "eCommerce" > eCommerce < /option> <
            option value = "Telecom" > Telecom < /option> <
            option value = "Social Media" > Social Media < /option><
            option value = "Social Media" > Other < /option> < /
            Form.Select > <
            Form.Group className = " px-5 mt-3" >
            <h6 className='m-0'><
            Form.Label > Email Address < /Form.Label> </h6> <
            Form.Control type = "email"
            id = 'email'
            required = { true }
            onChange = { handleChange }
            placeholder = "support@cyanase.com" / > <
            /Form.Group> <Form.Group  className="mt-3"  > <h6 className='m-0'><
            Form.Label > Memorandum of Association < /Form.Label> </h6> <
            Form.Control type = "file"
            id = 'moa'
            required = { true }
            onChange = { handleFileChange }
            / > < /
            Form.Group > <
            Form.Group className = "mt-3" >
            <h6 className='m-0'><
            Form.Label > Certificate of Incorporation < /Form.Label> </h6>  <
            Form.Control type = "file"
            id = 'coi'
            required = { true }
            onChange = { handleFileChange }
            / > < /
            Form.Group > <
            Form.Group className = " px-5 mt-3" >
            <h6 className='m-0'><
            Form.Label > Password < /Form.Label> </h6>  <
            Form.Control type = {showpassword?"text":"password"}
            id = 'password'
            required = { true }
            onChange = { handleChange }
            placeholder = "Create a strong Password" / >
            <
            /Form.Group>  <
            Form.Group className = " px-5 mt-3" >
            <h6 className='m-0'><
            Form.Label > Confirm Password < /Form.Label> </h6>  <
            Form.Control type = {showpassword?"text":"password"}
            required = "required"
            onChange = { handleChange}
            id = 'confirmpassword'
            placeholder = "Repeat Password" / ><
            div className='my-1'
            key = "default-checkbox" >
                <Form.Check type='checkbox' id = "default-checkbox" label='Show Password' onClick={()=>togglePassword()}/></div>
            <
            /Form.Group> <div className='row justify-content-center'><
            p id = "errorMessage"
            className = 'py-2 mt-3 rounded border border-danger text-center fade-in'
            style = {
                { display: 'none' }
            } > hey < /p> <
            p id = "infoMessage"
            className = 'py-2 mt-3 rounded warning-message text-center fade-in'
            style = {
                { display: 'none' }
            } > hey < /p><
            Button variant = "warning"
            className = 'shadow text-center my-2'
            id = 'successMessage'
            type = "submit" >
            Submit <
            /Button> < /
            div > < /
            Form > < /div > < /
            div >
        );

    }
    export default ApiUser;