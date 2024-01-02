import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import React, { useState } from "react";
import Login from "./Login";
import ApiUser from './ApiUser'
import SecondaryUser from './SecondaryUser';
import TabNavItem from "./TabNavItem";
import TabContent from "./TabContent";
import Depo from '../images/Group 130.png'

const BasicExample = () => {
    const [activeTab, setActiveTab] = useState("tab1");
    //  Functions to handle Tab Switching
    const handleTab1 = () => {
        // update the state to tab1
        setActiveTab("tab1");
    };
    return ( <
        div className = 'row scroll-y mx-3' >
        <
        div className = 'col-lg-7 px-lg-5' >
        <
        div className = 'd-flex flex-row d-none p-lg-3 border justify-content-center rounded-3 flex' >
        <
        div className = ' py-2 px-lg-3' >

        <
        TabNavItem title = "API User"
        onClick = { handleTab1 }
        id = "tab1"
        activeTab = { activeTab }
        setActiveTab = { setActiveTab }
        />  < /div > < /
        div >
        <
        h2 className = 'w-100 text-center mt-5' > Welcome to the API User Portal.This Portal is
        for API Accounts creations only. < /h2> <
        h6 className = 'text-center mt-5 p-3 bg-light rounded-3' > For more information or help, contact support at:
        <
        u className = 'active ' > support @cyanase.com < /u> < /
        h6 >
        <
        div className='text-center'>
        <
        img src = {Depo}
        alt = "investors"
        height = "60%"
        width = "60%"
        className = 'py-5' / > <
        /div> < /
        div > <
        div className = 'col-lg-5 ' >

        <
        TabContent id = "tab1"
        activeTab = { activeTab } > < ApiUser / > < /TabContent> <
        TabContent id = "tab2"
        activeTab = { activeTab } > < Login / > < /TabContent> <
        TabContent id = "tab3"
        activeTab = { activeTab } > < SecondaryUser / > < /TabContent> < /
        div > < /div >
    );
}

export default BasicExample;