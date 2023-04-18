import React from "react";
import '../App.css';
import Pic from './Pic'


const Notify = () => {
    return ( < div > < Pic / > < div className = "p-2" >
        <
        p className = "pt-5 mx-3 mt-5 bolder" > Notifications < /p> < /
        div > < div className = "p-3 bg-light rounded-4" > <
        div className = " mt-2 res-home" >
        <
        p className = "grey-text mx-2" > January 2023 < /p> <
        p className = "pt-2 mx-3 bolder" > < span className = "active" > Deposit < /span> of amount: < span className = "font-lighter" > UGX 10000 < /span > .Transaction ID: < span className = "font-lighter" > 62453765587 < /span > Your new balance is UGX 430000.00 <
        div >
        <
        p className = "x-small text-end" > 21 Jan < span className = "blue-dark rounded-4 p-1 px-2" > 3: 30 EAT < /span>  < /
        p > < /div> < /
        p > <
        p className = "pt-3 mx-3 bolder" > < span className = "active" > Deposit < /span> of amount: < span className = "font-lighter" > UGX 10000 < /span > .Transaction ID: < span className = "font-lighter" > 62453765587 < /span > Your new balance is UGX 430000.00 <
        div >
        <
        p className = "x-small text-end" > 21 Jan < span className = "blue-dark rounded-4 p-1 px-2" > 3: 30 EAT < /span>  < /
        p > < /div> < /
        p > < /
        div >
        <
        /
        div > < /div>
    );
};
export default Notify;