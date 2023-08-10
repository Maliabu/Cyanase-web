import React from "react";
import Form from 'react-bootstrap/Form';
import { API_URL_USER_PROFILE_PHOTO, TOKEN } from '../apis';
import axios from 'axios';
import Button from "react-bootstrap/esm/Button";
import { FaCameraRetro } from "react-icons/fa";
import { success, fail, catch_errors } from "../Api/RequestFunctions";

class Photo extends React.Component {
    state = {
        photo: null
    }
    handleChange = (e) => {
        this.setState({
            photo: e.target.files[0]
        })
        console.log(this.state)
    };
    handleSubmit = () => {
        let form_data = new FormData();
        form_data.append('photo', this.state);
        console.log(this.state)
        axios.post(`${API_URL_USER_PROFILE_PHOTO}`, this.state, {
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
                console.log(response)
                if (!response) {
                    fail("Something went wrong...")
                } else if (response.data.success === false) {
                    fail(response.data.message)
                } else {
                    success("You have successfully edited your profile photo", "/home", "successful");
                }
            });
    }

    render() {
        return ( <
            React.Fragment >
            <
            form className = "p-5 text-center"
            onSubmit = { this.handleSubmit } > {
                /* 
                          render the form steps and pass required props in
                        */
            } <
            div className = "text-center" >
            <
            FaCameraRetro size = "70"
            set = "broken"
            className = 'm-lg-3 p-2 border rounded-circle border-warning text-warning' / >
            <
            h4 className = "my-3 text-center" > Change Profile Photo < /h4> <
            Form.Group className = "mb-3 bg-white shadow-sm p-3" >
            <
            Form.Label > Choose Photo < /Form.Label>  <
            Form.Control type = "file"
            id = "photo"
            onChange = {
                this.handleChange
            }
            placeholder = "No image chosen" / >
            <
            /
            Form.Group > <
            div className = 'row justify-content-center' >
            <
            h6 id = "errorMessage"
            className = 'py-3 mt-3 rounded border border-danger text-center'
            style = {
                { display: 'none' }
            } > hey < /h6> <
            h6 id = "infoMessage"
            className = 'py-3 mt-3 rounded warning text-center'
            style = {
                { display: 'none' }
            } > hey < /h6>   <
            Button variant = "warning"
            className = 'shadow d-none text-center'
            id = 'successMessage'
            onClick = { this.handleSubmit }
            type = "button" >
            Save Photo <
            /Button> < /
            div > < /
            div > < /
            form > < /
            React.Fragment >
        );
    }
}
export default Photo;