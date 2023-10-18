import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import { API_URL_LOGIN } from '../apis';
import axios from 'axios';
import { success, preloader, fail, catch_errors,togglePasswordVisibility } from '../Api/RequestFunctions';

class Login extends Component {
    //state for form data
    state = {
        username: '',
        password: ''
    };
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        });
    };
    handleSubmit = (e) => {
        preloader()
        e.preventDefault();
        let form_data = new FormData();
        form_data.append('password', this.state.password);
        form_data.append('username', this.state.username);
        axios.post(`${API_URL_LOGIN}`, form_data, {
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
    render() {
        return ( <
            div > <
            div className = 'row rounded-4 justify-content-center bg-lighter p-lg-5 p-3' >
            <
            Form className = 'bg-white rounded-4 col-lg-5 col-md-7 col-12'
            onSubmit = { this.handleSubmit } >
            <
            div className = 'row justify-center blue-dark p-4 rounded-top-4' > <
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
            value = { this.state.username }
            onChange = { this.handleChange }
            placeholder = "support@cyanase.com" / > < /
            Form.Group > <
            Form.Group className = " rounded-2 px-3 my-2" >
            <
            Form.Label > < h6 className = 'm-0' > Password < /h6> < /Form.Label > <
            Form.Control type = "password"
            id = 'password'
            required = "required"
            value = { this.state.password }
            onChange = { this.handleChange }
            placeholder = "password" / >
            <
        div className='my-1'
        key = "default-checkbox" >
            <Form.Check type='checkbox' id = "default-checkbox" label='Show Password' onClick={togglePasswordVisibility}/></div>
            < /
            Form.Group > <
            div className = 'row justify-content-center' > <
            Button variant = "warning"
            className = 'shadow mt-2 text-center'
            id = 'successMessage'
            type = "submit" >
            Login <
            /Button> < /
            div >
            <
            p className = 'mt-3 p-2 text-center' > Have no account ? Please < span className = 'active bolder' > { this.props.button } < /span>or < span className = 'active bolder' > {this.props.passwordReset} < /span > < /p > <
            h6 id = "errorMessage"
            className = 'py-2 mt-3 rounded border border-danger text-center fade-in'
            style = {
                { display: 'none' }
            } > hey < /h6><
            h6 id = "infoMessage"
            className = 'py-2 mt-3 rounded warning text-center fade-in'
            style = {
                { display: 'none' }
            } > hey < /h6>  < /
            Form >
            <
            div className = "mt-5 bg-light d-none rounded row justify-content-center" >
            <
            img className = 'rounded-circle text-center avatar border border-warning'
            src = "https://static.vecteezy.com/system/resources/thumbnails/000/439/863/small/Basic_Ui__28186_29.jpg"
            alt = "investors" / > <
            h4 className = 'avatar-name text-center mt-2 p-3 bg-text'
            id = 'guest' > Guest < /h4> < /
            div > < /div> < /
            div >
        );
    }
}
export default Login;