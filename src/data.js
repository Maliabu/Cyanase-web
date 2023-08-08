import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { success, preloader, fail } from './Api/RequestFunctions';

class Data extends Component {
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
        let username = this.state.username
        let password = this.state.password
        if (username === "cyanase-data-visuals" && password === "data@cyanase") {
            success("lets check out our graphs", "/visuals@cyanase", "we are going in...")
        } else {
            fail("something seems wrong, check your details...")
        }
    }
    render() {
        return ( <
            div className = 'p-5' > <
            div className = 'row rounded-4 justify-content-center bg-lighter p-lg-5 p-3' >
            <
            Form className = 'bg-white rounded-4 p-lg-5 py-3 col-lg-5 col-12'
            onSubmit = { this.handleSubmit } >
            <
            div className = 'row justify-center p-3' > <
            h2 className = 'text-center' > LOGIN < /h2> <
            h6 className = ' mt-3 text-center' > < b > Enter your Credentials below to login to your API Account < /b>  < /
            h6 > <
            /
            div > <
            Form.Group className = " rounded-2 px-3" >
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
            placeholder = "password" / > < /
            Form.Group > <
            div className = 'row justify-content-center' > <
            Button variant = "warning"
            className = 'shadow mt-2 text-center'
            id = 'successMessage'
            type = "submit" >
            Login <
            /Button> < /
            div > <
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
export default Data;