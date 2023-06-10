import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import { API_URL_LOGIN } from '../apis';
import axios from 'axios';
import MessageBox from './MessageBox';

class Login extends Component {
    //state for form data
    state = {
        username: '',
        password: ''
    };
    Show = true;

    success = () => {
        document.getElementById("successMessage").innerHTML = "Successful"
        document.getElementById("successMessage").style.backgroundColor = "orange"
        document.getElementById("successMessage").style.color = "white"
        document.getElementById("successMessage").style.borderColor = "orange"
        document.getElementById("errorMessage").style.display = 'block'
        document.getElementById("errorMessage").style.color = "orange"
        document.getElementById("errorMessage").style.borderColor = "orange"
        document.getElementById("errorMessage").innerText = "You are logged in"
        setTimeout(() => {
            document.getElementById("errorMessage").style.display = 'none'
        }, 2000);
        setTimeout(() => { <
            MessageBox show = { this.Show }
            / >
        }, 2000);
    }
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        });
        console.log(this.state, this.props);
    };

    handleSubmit = (e) => {
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
                const errorDisplay = () => {
                    document.getElementById("errorMessage").innerText = error.response
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
                        document.getElementById("successMessage").innerHTML = "Login Unsuccessful"
                    }, 2000);
                }
                if (error.response) {
                    const responses = error.response.data.detail
                    if (error.response.status === 400) {
                        errorDisplay(responses)
                    } else if (error.response.status === 500) {
                        errorDisplay(responses)
                    } else if (error.response.status === 404) {
                        errorDisplay(responses)
                    } else if (error.response.status === 403) {
                        errorDisplay(responses)
                    }
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    // console.log(error.response.data);
                    // console.log(error.response.status);
                    // console.log(error.response.headers);
                    errorSignUp();
                } else if (error.request) {
                    // The request was made but no response was received
                    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                    // http.ClientRequest in node.js
                    console.log(error.request);
                    errorDisplay(error);
                    errorSignUp();
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log('Error', error.message);
                    errorSignUp();
                    errorDisplay(error);
                }
            })
            .then((response) => {
                const errorDisplay = (response) => {
                    document.getElementById("errorMessage").innerText = response.data.message
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
                        document.getElementById("successMessage").innerHTML = "Login Unsuccessful"
                    }, 2000);
                }
                if (response.data.success === false && response.status === 200) {
                    errorDisplay(response);
                    errorSignUp()
                }
                console.log(response)
                const token = response.data.token
                localStorage.setItem('token', token)
                console.log(token)

                /**
                 * The 'then' method is executed only when the request is successfull.
                 */
                document.getElementById("guest").innerHTML = response.data.user.first_name
                window.location.pathname = "/"
            });
        this.success();
    }
    render() {
        return ( <
            div > <
            div className = 'row rounded-4 justify-content-center bg-light p-1' >
            <
            Form className = 'shadow-sm bg-white rounded-4 p-lg-5'
            onSubmit = { this.handleSubmit } >
            <
            div className = 'row justify-center p-3' > <
            h2 className = 'text-center' > LOGIN < /h2> <
            h6 className = 'active mt-3' > < b > Enter your Credentials below to login to your API Account < /b>  < /
            h6 > <
            /
            div > <
            Form.Group className = "mb-3 bg-light rounded-lg p-3 px-5" >
            <
            Form.Label > username < /Form.Label> <
            Form.Control type = "text"
            id = 'username'
            required = "required"
            value = { this.state.username }
            onChange = { this.handleChange }
            placeholder = "support@cyanase.com" / > <
            /Form.Group>  <
            Form.Group className = "mb-3 bg-light rounded-lg p-3 px-5" >
            <
            Form.Label > Password < /Form.Label> <
            Form.Control type = "password"
            id = 'password'
            required = "required"
            value = { this.state.password }
            onChange = { this.handleChange }
            placeholder = "password" / > <
            /Form.Group>  <
            div className = 'row justify-content-center' > <
            Button variant = "warning"
            className = 'shadow text-center'
            id = 'successMessage'
            type = "submit" >
            Login <
            /Button> < /
            div >
            <
            p className = 'mt-5' > IF you dont have an account, please < span className = 'active bolder' > { this.props.button } { this.props.code } < /span></p >
            <
            p id = "errorMessage"
            className = 'py-3 mt-3 rounded border text-center fade-in'
            style = {
                { display: 'none' }
            } > hey < /p>  < /
            Form > < /div> < /
            div >
        );
    }
}
export default Login;