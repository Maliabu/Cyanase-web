import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import { API_URL_LOGIN, API_EMAIL_VERIFY, API_RESEND_VERIFICATION_EMAIL, API_URL_GET_AUTH_USER_BY_EMAIL } from '../apis';
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
    const resendEmail = () => {
        document.getElementById("errorMessage").style.display = "none"
        axios.post(`${API_RESEND_VERIFICATION_EMAIL}`,formData.username,{
            headers: {
                "Content-Type": "application/json"
            }
        })
        .catch(function(error) {
            catch_errors(error)
        })
        .then(function(response){
            if (!response) {
                fail("Something went wrong...")
            } else if (response.status === 200 && response.data.success === false) {
                fail(response.data.message)
            } else {
                success("A verification link has been sent to your email", "/", "Successful");
            }
        })
    }
    const handleEmailChange = (event) => {
        const name = event.target.id;
        const value = event.target.value;
        setFormData({...formData, [name]: value });
    };
    const handleChange = (event) => {
        const name = event.target.id;
        const value = event.target.value;
        setFormData({...formData, [name]: value });
    };
    const handleSubmit = (e) => {
        preloader()
        e.preventDefault();
        // does the account exist?
        axios.post(`${API_URL_GET_AUTH_USER_BY_EMAIL}`,formData.username,{
            headers: {
                "Content-Type": "application/json"
            }
        }).then(function(response){
            if(response.data === false){
                document.getElementById("errorMessage").style.display = "block"
                document.getElementById("errorMessage").style.color = "crimson"
                document.getElementById("errorMessage").style.backgroundColor = '#ff353535'
                document.getElementById("errorMessage").innerText = "This account is not registered please sign up"
            }
            else if(response.data === true){
                document.getElementById("errorMessage").style.display = "none"
                // does this user need verification?
                axios.post(`${API_EMAIL_VERIFY}`,formData.username,{
                    headers: {
                        "Content-Type": "application/json"
                    }
                }).then(function(response){
                    if(response.data.success === false){
                        document.getElementById("errorMessage").style.display = "block"
                        document.getElementById("errorMessage").style.color = "crimson"
                        document.getElementById("errorMessage").style.backgroundColor = '#ff353535'
                        document.getElementById("errorMessage").innerText = "Looks like your account is not verified. Click below to get a verification link"
                        document.getElementById("infoMess").style.display = "block"
                    }
                    else{
                        document.getElementById("errorMessage").style.display = "none"
                        document.getElementById("infoMess").style.display = "none"
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
                                }
                            });
                    }
                })
            }
        })
    }
        return ( 
            <div> 
            <div className = 'row rounded-4 justify-content-center bg-grey p-lg-5' >
            <Form className = 'bg-white rounded-4 col-lg-5 col-md-7 col-12'
            onSubmit = { handleSubmit } >
            <div className = 'row justify-center p-4 rounded-top-4' > 
            <h2 className = 'text-center' > LOGIN </h2> 
            <h5 className = ' text-center active' > Enter your Credentials below to login to your Account </h5> 
            </div> 
            <Form.Group className = " rounded-2 px-3 mt-3" >
            <Form.Label > <h5 className = 'm-0' > Email </h5> </Form.Label> 
            <Form.Control type = "text"
            id = 'username'
            required = "required"
            onChange = { handleEmailChange }
            placeholder = "support@cyanase.com" /> 
            </Form.Group> 
            <Form.Group className = " rounded-2 px-3 my-2" >
            <Form.Label > <h5 className = 'm-0' > Password </h5> </Form.Label> 
            <Form.Control type = "password"
            id = 'password'
            required = "required"
            onChange = { handleChange }
            placeholder = "password" />
            <div className='my-1'
            key = "default-checkbox" >
            <Form.Check type='checkbox' id = "default-checkbox" label='Show Password' onClick={togglePasswordVisibility}/></div>
            </Form.Group > 
            <div className = 'mx-3 text-center' > 
            <Button variant = "warning"
            className = 'mt-2 p-2 text-center'
            id = 'successMessage'
            type = "submit" >
            Login </Button>
            <h5 id = "errorMessage"
            className = 'py-2 mt-3 rounded border border-danger text-center fade-in'
            style = {
                { display: 'none' }
            } > hey </h5>
            <h5 id = "infoMessage"
            className = 'py-2 mt-3 rounded warning-message text-center fade-in'
            style = {
                { display: 'none' }
            } > hey </h5>  </div>
            <p className = 'mt-3 p-2 text-center' > Have no account ? Please <span className = 'active bolder' > { props.button } </span>or <span className = 'active bolder ' > {props.passwordReset} </span><span id = "infoMess"
            className = 'active bolder status rounded p-2 mt-1'
            style = {
                { display: 'none' }
            } onClick={resendEmail}> Resend email verification link </span> </p></Form>
            <Form className = 'd-none'
            onSubmit = { handleSubmit } >
            <div className = 'row justify-center blue-darks p-4' > 
            <h2 className = 'text-center' > LOGIN </h2> 
            <h5 className = ' text-center active' > Enter your Credentials below to login to your Account </h5> 
            </div> 
            <Form.Group className = " rounded-2 px-3 mt-3" >
            <Form.Label > <h5 className = 'm-0' > Email </h5> </Form.Label> 
            <Form.Control type = "text"
            id = 'username'
            required = "required"
            onChange = { handleEmailChange }
            placeholder = "support@cyanase.com" /> </Form.Group> 
            <Form.Group className = " rounded-2 px-3 my-2" >
            <Form.Label > <h5 className = 'm-0' > Password </h5> </Form.Label> 
            <Form.Control type = "password"
            id = 'password'
            required = "required"
            onChange = { handleChange }
            placeholder = "password" />
            <div className='my-1'
            key = "default-checkbox" >
            <Form.Check type='checkbox' id = "default-checkbox" label='Show Password' onClick={togglePasswordVisibility}/></div>
            </Form.Group> 
            <div className = 'mx-3 justify-content-center' > 
            <Button variant = "warning"
            className = 'shadow mt-2 text-center'
            id = 'successMessage'
            type = "submit" >
            Login </Button>
            <h5 id = "errorMessage"
            className = 'py-2 mt-3 rounded border border-danger text-center fade-in'
            style = {
                { display: 'none' }
            } > hey </h5>
            <h5 id = "infoMessage"
            className = 'py-2 mt-3 rounded warning-message text-center fade-in'
            style = {
                { display: 'none' }
            } > hey </h5> </div>
            <p className = 'mt-3 p-2 text-center' > Have no account ? Please <span className = 'active bolder' > { props.button } </span><span className = 'active bolder' > {props.passwordReset} </span> 
            <span className='active bolder status rounded p-2 mt-1'
             > Resend email verification link </span></p> 
            </Form> </div>
            </div>
        );
    
}
export default Login;