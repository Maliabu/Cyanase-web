import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import './style.scss';
import React from "react";
import { FaLightbulb } from 'react-icons/fa';
import Withdraw from '../Accounts/Withdraw'
import { ArrowLeftSquare } from 'react-iconly';

const ResWithdraw = (props) => {
    return ( < div className = 'p-1 res-home' > < div >
        <
        div className = 'row p-2 px-3' > <
        div className = 'col-10 bg-lighter rounded-4' > <
        h4 className = ' mx-3 bolder mt-3' > Withdraw < /h4 > < /div >
        <
        div className = 'rounded-4 d-none light-res-home wide' >
        <
        p className = "bolder text-end mx-4 mt-2" > welcome back user <
        div className = " justify-content-center" > <
        p className = "px-1 font-lighter" > pick up where we left off < /p></div > < /p>< /
        div >
        <
        div className = 'col-2' > <
        // img src = "http://127.0.0.1:8000/static/photo.png"
        img src = "https://cyanase.lol/static/photo.png"
        className = "rounded-circle object-fit-cover mt-2 img-head"
        alt = "investors" / > < /div> < /
        div >
        <
        div className = 'd-flex mt-2 d-none' > < FaLightbulb size = "35"
        className = 'mt-3 mx-2 p-2 rounded-circle light-res-home text-warning' / >
        <
        div className = 'rounded-4 light-res-home wider' >
        <
        p className = "bolder mx-4 mt-2" > Tips: <
        div className = " justify-content-center" > <
        p className = "px-1 font-lighter" > Dont save your money, invest < /p></div > < /p>< /
        div > < /
        div >
        <
        /
        div > <
        ArrowLeftSquare size = { 30 }
        onClick = {
            () => { props.changeWithdrawSetting(false) }
        }
        className = "mt-1 mx-2" / >
        <
        Withdraw / >
        <
        /
        div >
    );
};

export default ResWithdraw;