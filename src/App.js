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
        /> < /
        Routes > <
        /Router>
    );
}