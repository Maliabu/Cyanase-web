import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import { API_URL_LOGIN } from '../apis';
import axios from 'axios';
import { success, preloader, fail, catch_errors,togglePasswordVisibility } from '../Api/RequestFunctions';

const Login = (props) => {
    //state for form data
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    // const handleChange = (e) => {
    //     setFormData({
    //         [e.target.id]: e.target.value
    //     });
    // };
    const handleChange = (event) => {
        const name = event.target.id;
        const value = event.target.value;
        setFormData({...formData, [name]: value });
    };
    const handleSubmit = (e) => {
        preloader()
        e.preventDefault();
        axios.post(`${API_URL_LOGIN}`, formData, {
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
                    success("Login successful", "/home", "successful");
                    const token = response.data.token
                    localStorage.setItem('token', token)
                    localStorage.setItem('login-status', "true")
                }
            });
    }
        return ( <
            div > <
            div className = 'row rounded-4 justify-content-center p-4 bg-lighter p-lg-5' >
            <
            Form className = 'bg-white rounded-4 col-lg-5 col-md-7 col-12'
            onSubmit = { handleSubmit } >
            <
            div className = 'row justify-center blue-darks p-4 rounded-top-4' > <
            h2 className = 'text-center' > LOGIN < /h2> <
            h6 className = ' text-center active' > Enter your Credentials below to login to your Account < /
            h6 > <
            /
            div > <
            Form.Group className = " rounded-2 px-3 mt-3" >
            <
            Form.Label > < h6 className = 'm-0' > Email < /h6> < /Form.Label > <
            Form.Control type = "text"
            id = 'username'
            required = "required"
            onChange = { handleChange }
            placeholder = "support@cyanase.com" / > < /
            Form.Group > <
            Form.Group className = " rounded-2 px-3 my-2" >
            <
            Form.Label > < h6 className = 'm-0' > Password < /h6> < /Form.Label > <
            Form.Control type = "password"
            id = 'password'
            required = "required"
            onChange = { handleChange }
            placeholder = "password" / >
            <
            div className='my-1'
            key = "default-checkbox" >
            <Form.Check type='checkbox' id = "default-checkbox" label='Show Password' onClick={togglePasswordVisibility}/></div>
            < /
            Form.Group > <
            div className = 'mx-3 text-center' > <
            Button variant = "warning"
            className = 'shadow mt-2 text-center'
            id = 'successMessage'
            type = "submit" >
            Login <
            /Button><
            h6 id = "errorMessage"
            className = 'py-2 mt-3 rounded border border-danger text-center fade-in'
            style = {
                { display: 'none' }
            } > hey < /h6><
            h6 id = "infoMessage"
            className = 'py-2 mt-3 rounded warning-message text-center fade-in'
            style = {
                { display: 'none' }
            } > hey < /h6>  < /
            div >
            <
            p className = 'mt-3 p-2 text-center' > Have no account ? Please < span className = 'active bolder' > { props.button } < /span>or < span className = 'active bolder' > {props.passwordReset} < /span > < /p >  < /
            Form >
            <
            Form className = 'd-none'
            onSubmit = { handleSubmit } >
            <
            div className = 'row justify-center blue-darks p-4' > <
            h2 className = 'text-center' > LOGIN < /h2> <
            h6 className = ' text-center active' > Enter your Credentials below to login to your Account < /
            h6 > <
            /
            div > <
            Form.Group className = " rounded-2 px-3 mt-3" >
            <
            Form.Label > < h6 className = 'm-0' > Email < /h6> < /Form.Label > <
            Form.Control type = "text"
            id = 'username'
            required = "required"
            onChange = { handleChange }
            placeholder = "support@cyanase.com" / > < /
            Form.Group > <
            Form.Group className = " rounded-2 px-3 my-2" >
            <
            Form.Label > < h6 className = 'm-0' > Password < /h6> < /Form.Label > <
            Form.Control type = "password"
            id = 'password'
            required = "required"
            onChange = { handleChange }
            placeholder = "password" / >
            <
            div className='my-1'
            key = "default-checkbox" >
            <Form.Check type='checkbox' id = "default-checkbox" label='Show Password' onClick={togglePasswordVisibility}/></div>
            < /
            Form.Group > <
            div className = 'mx-3 justify-content-center' > <
            Button variant = "warning"
            className = 'shadow mt-2 text-center'
            id = 'successMessage'
            type = "submit" >
            Login <
            /Button><
            h6 id = "errorMessage"
            className = 'py-2 mt-3 rounded border border-danger text-center fade-in'
            style = {
                { display: 'none' }
            } > hey < /h6><
            h6 id = "infoMessage"
            className = 'py-2 mt-3 rounded warning-message text-center fade-in'
            style = {
                { display: 'none' }
            } > hey < /h6>  < /
            div >
            <
            p className = 'mt-3 p-2 text-center' > Have no account ? Please < span className = 'active bolder' > { props.button } < /span>or < span className = 'active bolder' > {props.passwordReset} < /span > < /p >  < /
            Form > < /div>< /
            div >
        );
    
}
export default Login;