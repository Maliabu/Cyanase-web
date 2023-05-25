import React from "react";
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Profile from '../images/Ellipse 178.png';
import Mubs from '../images/Ellipse 205.png';
import './style.scss';

const Club = (props) => {
    return ( <
        div > <
        div className = "row " > <
        div className = "col-8 bg-light px-3 rounded-25 " >
        <
        h6 className = " p-2 mt-3" > YOUR INVESTMENT CLUBS < /h6>  <
        div className = "row bg-white text-dark rounded-25 p-5 mt-2" >
        <
        div className = " col-3" >
        <
        img src = { Profile }
        width = '100%'
        height = '90%'
        alt = "investors" / > < /
        div >
        <
        div className = "col-6 text-center" >
        <
        h4 className = "px-5 mt-3 font-lighter" >
        CHILL GRILLS CLUB < /h4>  <
        h5 className = "text-center bolder" > Created: Jan 2020 <
        span > 32 Members < /span>  < /
        h5 > <
        h6 className = "px-5 py-3 mt-3 mx-2 border text-center border-warning text-warning rounded-25"
        onClick = { props.parentCallback1 } >
        More from this Club < /h6> </div >
        <
        div className = "col-3" > < /div> < /
        div > <
        div >
        <
        /
        div >
        <
        /
        div > <
        div className = "col-4 rounded-25 px-3" >

        <
        h6 className = "p-3 rounded-3 blue-dark" > RECOMMENDED CLUBS < /h6>   <
        div className = "mt-3 px-3 py-2 bg-light rounded-3" >
        <
        div className = "row py-2" >
        <
        div className = "col-3" >
        <
        img src = { Mubs }
        className = "rounded-circle mt-2"
        width = '80%'
        height = '70%'
        alt = "investors" / >
        <
        /
        div >
        <
        div className = "col-6" >
        <
        p className = "pt-3" > < span className = "bolder" > AWATU RIDERS CLUB < /span> <
        span > Created Mar 2020 <
        /span>   < /
        p > < /
        div > <
        div className = "col-3 text-end" >
        <
        p className = "pt-4" > 45 Members < /
        p > <
        /div >  < /
        div > < /
        div >
        <
        /
        div > < /
        div > < /
        div >
    );
};

export default Club;