import React from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route
} from 'react-router-dom';
import './App.css';

import MyHome from './App/Home.js';
import Logout from './Accounts/Logout';
import Auth from './Auth/Auth';
import Verify from './Auth/VerifyEmail'
import PasswordReset from './Auth/PasswordReset'

export default function App() {
    return ( <
        Router >
        <
        Routes >
        <
        Route index element = { < Auth / > }
        /> <
        Route path = "/home"
        element = { < MyHome / > }
        /><
        Route path = "/logout"
        element = { < Logout / > }
        /><
        Route path = "/verify"
        element = { < Verify / > }
        /><
        Route path = "/reset/password"
        element = { < PasswordReset / > }
        /> < /
        Routes > <
        /Router>
    );
}