import React from "react";
import Form from 'react-bootstrap/Form';
import { API_URL_USER_PROFILE_PHOTO, TOKEN } from '../apis';
import axios from 'axios';
import Button from "react-bootstrap/esm/Button";
import { FaCameraRetro } from "react-icons/fa";

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
    success() {
        document.getElementById("successMessage").innerHTML = "Successful"
        document.getElementById("successMessage").style.backgroundColor = "green"
        document.getElementById("successMessage").style.color = "white"
        document.getElementById("successMessage").style.borderColor = "green"
        document.getElementById("errorMessage").style.display = 'block'
        document.getElementById("errorMessage").style.color = "green"
        document.getElementById("errorMessage").style.borderColor = "green"
        document.getElementById("errorMessage").innerText = "Upload Successful"
        setTimeout(() => {
            document.getElementById("errorMessage").style.display = 'none'
        }, 4000);
        // setTimeout(() => {
        //     window.location.pathname = "/home"
        // }, 5000);
    }
    handleSubmit = () => {
        let form_data = new FormData();
        form_data.append('photo', this.state.photo, this.state.photo.name);
        console.log(this.state)
        axios.post(`${API_URL_USER_PROFILE_PHOTO}`, form_data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    'Accept': 'application/json',
                    "Authorization": `Token ${ TOKEN }`
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
                        document.getElementById("successMessage").innerHTML = "Upload Unsuccessful"
                    }, 2000);
                }
                if (error.response) {
                    if (error.response.status === 400) {
                        errorDisplay(error.response.data.message)
                    } else if (error.response.status === 500) {
                        errorDisplay(error.response.data.message)
                    } else if (error.response.status === 404) {
                        errorDisplay(error.response.data.message)
                    }
                    errorSignUp();
                } else if (error.request) {
                    errorDisplay(error.response.data.message)
                } else {
                    errorDisplay(error.response.data.message)
                }
            });
        this.success();
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
            onChange = {
                (e) => this.handleChange(e)
            }
            id = "photo"
            placeholder = "No image chosen" / >
            <
            /
            Form.Group > <
            div className = 'row justify-content-center' > <
            p id = "errorMessage"
            className = 'py-3 mt-3 rounded border text-center fade-in'
            style = {
                { display: 'none' }
            } > hey < /p>  <
            Button variant = "warning"
            className = 'shadow text-center'
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