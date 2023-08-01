import React, { useState } from "react";
import { FaUserTie } from "react-icons/fa";
import Form from 'react-bootstrap/Form';
import { Button } from "react-bootstrap";
import axios from "axios";
import { API_URL_USER_NEXTOFKIN, TOKEN } from "../apis";
import { useForm } from "react-hook-form";
import { success, fail, catch_errors, preloader } from "../Api/RequestFunctions";

const NKin = () => {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone: ''
    });
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setFormData({...formData, [name]: value })
    }
    const { handleSubmit } = useForm()

    function onSubmit() {
        preloader()
        axios.post(`${API_URL_USER_NEXTOFKIN}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    'Accept': 'application/json',
                    "Authorization": `Token ${ TOKEN }`
                }
            })
            .catch(function(error) {
                catch_errors(error)
            })
            .then(function(response) {
                if (response.status === 200 && response.data.success === false) {
                    fail(response.data.message)
                } else {
                    success("You have successfully edited your next of kin", "/home", "successful");
                }
            });
    }
    return ( <
        div className = "p-5 text-center" > <
        FaUserTie size = "60"
        className = 'my-2 active rounded-circle border border-warning p-2' / >
        <
        h4 > Add your Next of Kin < /h4>  <
        Form onSubmit = { handleSubmit(onSubmit) } >
        <
        Form.Group className = "mb-3 bg-white shadow-sm p-3" >
        <
        Form.Label > First Name < /Form.Label>  <
        Form.Control type = "text"
        id = 'text'
        name = "first_name"
        onChange = { handleChange }
        required placeholder = "First Name" / >
        <
        Form.Control.Feedback type = "invalid" >
        This field is required <
        /Form.Control.Feedback> < /
        Form.Group >
        <
        Form.Group className = "mb-3 bg-white shadow-sm p-3" >
        <
        Form.Label > Last Name < /Form.Label>  <
        Form.Control type = "text"
        id = 'text'
        name = "last_name"
        onChange = { handleChange }
        required placeholder = "Last Name" / >
        <
        Form.Control.Feedback type = "invalid" >
        This field is required. <
        /Form.Control.Feedback> < /
        Form.Group >
        <
        Form.Group className = "mb-3 bg-white shadow-sm p-3" >
        <
        Form.Label > Email < /Form.Label>  <
        Form.Control type = "email"
        id = 'text'
        name = "email"
        onChange = { handleChange }
        required placeholder = "nextofkin@gmail.com" / >
        <
        Form.Control.Feedback type = "invalid" >
        This field is required. <
        /Form.Control.Feedback> < /
        Form.Group >
        <
        Form.Group className = "mb-3 bg-white shadow-sm p-3" >
        <
        Form.Label > Phone < /Form.Label>  <
        Form.Control type = "number"
        id = 'number'
        name = "phone"
        onChange = { handleChange }
        required placeholder = "Phone Number" / >
        <
        Form.Control.Feedback type = "invalid" >
        This field is required. <
        /Form.Control.Feedback> < /
        Form.Group > <
        Button variant = "warning"
        id = "successMessage"
        type = "submit" > Change < /Button> <
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
        Form > < /
        div >
    )
}

export default NKin;