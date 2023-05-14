import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import { API_URL } from '../api';
import axios from 'axios';


class SignUp extends Component {
    //state for form data
    state = {
        company_name: '',
        website: '',
        country: '',
        user_type: 'business',
        phone: '',
        email: '',
        moa: null,
        coi: null,
        password: ''
    };
    success() {
        document.getElementById("successMessage").innerHTML = "Successful"
        document.getElementById("successMessage").style.backgroundColor = "green"
        document.getElementById("successMessage").style.color = "white"
        document.getElementById("successMessage").style.borderColor = "green"
        document.getElementById("errorMessage").style.display = 'block'
        document.getElementById("errorMessage").style.color = "green"
        document.getElementById("errorMessage").style.borderColor = "green"
        document.getElementById("errorMessage").innerText = "You are now an API User"
        setTimeout(() => {
            document.getElementById("errorMessage").style.display = 'none'
        }, 6000);
    }
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        });
        console.log(this.state);
    };
    handleFileChange = (e) => {
        this.setState({
            moa: e.target.files[0],
            coi: e.target.files[0]
        })
    };

    handleSubmit = (e) => {
        e.preventDefault();
        let form_data = new FormData();
        form_data.append('moa', this.state.moa, this.state.moa.name);
        form_data.append('company_name', this.state.company_name);
        form_data.append('website', this.state.website);
        form_data.append('country', this.state.country);
        form_data.append('user_type', this.state.user_type);
        form_data.append('phone', this.state.phone);
        form_data.append('email', this.state.email);
        form_data.append('password', this.state.password);
        form_data.append('coi', this.state.coi, this.state.coi.name);
        axios.post(`${API_URL}`, form_data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    'Accept': 'application/json'
                }
            })
            .catch(function(error) {
                const errorDisplay = (errorText) => {
                    document.getElementById("errorMessage").innerText = errorText
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
                    if (error.response.status === 400) {
                        errorDisplay(error.response.data.email || error.response.data.phone || error.response.data.password)
                    } else if (error.response.status === 500) {
                        errorDisplay(error.response.data)
                    } else if (error.response.status === 404) {
                        errorDisplay(error.response.data)
                    }
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    console.log(error.response.data);
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
        this.success();
        console.log(e);
    }
    render() {
        return ( <
            div > <
            div className = 'row justify-content-center bg-light rounded-4 p-1' >
            <
            Form className = 'rounded-4 shadow-sm bg-white p-lg-5'
            onSubmit = { this.handleSubmit } >
            <
            div className = 'row justify-center p-3' > <
            h2 className = 'text-center' > API USER ACCOUNT < /h2> <
            h6 > Register as an API user by filling in the following details.On submitting, details will be verified by our team and we will contact you on the way forward. < /h6><
            h6 className = 'active' > < b > All fields are Required < /b>  < /
            h6 > <
            /
            div > <
            Form.Group className = "mb-3 bg-light rounded-lg p-3 px-5" >
            <
            Form.Label > Company Name < /Form.Label> <
            Form.Control type = "text"
            required = { true }
            id = 'company_name'
            onChange = { this.handleChange }
            placeholder = "Cyanase Investors Limited" / > <
            /Form.Group>  <
            Form.Group className = "mb-3 bg-light rounded-lg p-3 px-5" >
            <
            Form.Label > Website < /Form.Label> <
            Form.Control type = "text"
            required = { true }
            id = 'website'
            onChange = { this.handleChange }
            placeholder = "cyanase.com" / > <
            /Form.Group> <
            Form.Group className = "mb-3 bg-light rounded-lg p-3 px-5" >
            <
            Form.Label > Country < /Form.Label> <
            Form.Control type = "text"
            id = 'country'
            required = { true }
            onChange = { this.handleChange }
            placeholder = "Uganda" / > <
            /Form.Group> <Form.Select className = "my-3" required  defaultValue="FinTech" id='user_type' onChange = { this.handleChange }> <
            option value = "FinTech" > FinTech < /option> <
            option value = "FinTech" > FinTech < /option> <
            option value = "EduTech" > EduTech < /option> <
            option value = "eCommerce" > eCommerce < /option> <
            option value = "Telecom" > Telecom < /option> <
            option value = "Social Media" > Social Media < /option> < /
            Form.Select > <
            Form.Group className = "mb-3 bg-light rounded-lg p-3 px-5" >
            <
            Form.Label > Phone < /Form.Label> <
            Form.Control type = "phone"
            id = 'phone'
            required = { true }
            onChange = { this.handleChange }
            placeholder = "+256 772971878" / > <
            /Form.Group> <
            Form.Group className = "mb-3 bg-light rounded-lg p-3 px-5" >
            <
            Form.Label > Email address < /Form.Label> <
            Form.Control type = "email"
            id = 'email'
            required = { true }
            onChange = { this.handleChange }
            placeholder = "support@cyanase.com" / > <
            /Form.Group> <Form.Group  className="mb-3"  > <
            Form.Label > Memorandum of Association < /Form.Label> <
            Form.Control type = "file"
            id = 'moa'
            required = { true }
            onChange = { this.handleFileChange }
            / > < /
            Form.Group > <
            Form.Group className = "mb-3" >
            <
            Form.Label > Certificate of Incorporation < /Form.Label> <
            Form.Control type = "file"
            id = 'coi'
            required = { true }
            onChange = { this.handleFileChange }
            / > < /
            Form.Group > <
            Form.Group className = "mb-3 bg-light rounded-lg p-3 px-5" >
            <
            Form.Label > Password < /Form.Label> <
            Form.Control type = "password"
            id = 'password'
            required = { true }
            onChange = { this.handleChange }
            placeholder = "Create a strong Password" / >
            <
            /Form.Group>  <
            Form.Group className = "mb-3 bg-light rounded-lg p-3 px-5" >
            <
            Form.Label > Password < /Form.Label> <
            Form.Control type = "password"
            required = "required"
            onChange = { this.handleChange }
            id = 'password2'
            placeholder = "Repeat Password" / >
            <
            /Form.Group> <div className='row justify-content-center'><
            Button variant = "warning"
            className = 'shadow text-center'
            id = 'successMessage'
            type = "submit" >
            Submit <
            /Button> <
            p id = "errorMessage"
            className = 'py-3 mt-3 rounded border text-center fade-in'
            style = {
                { display: 'none' }
            } > hey < /p> <p>Back to <span className='active bolder'>{this.props.button}</span > < /p>< /
            div > < /
            Form > < /div > < /
            div >
        );
    }
}
export default SignUp;