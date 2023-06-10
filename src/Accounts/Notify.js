import { MainRequests } from "../Api/MainRequests";
import React, { useEffect, useState } from "react";
import '../App.css';
import Pic from './Pic'


const Notify = () => {
    const [deposits, setDeposits] = useState([])
    useEffect(() => {
        MainRequests().then(res => {
            setDeposits(res[4]);
        });
    }, []);

    return ( < div > < Pic / > < div className = "p-2" >
        <
        p className = "pt-5 mx-3 mt-5 bolder" > Notifications < /p> < /
        div > < div className = "p-3 bg-light rounded-4" > {
            deposits.map(deposit => ( <
                div className = " mt-2 res-home"
                key = { deposit.deposit_id } >
                <
                p className = "grey-text mx-2 d-none" > January 2023 < /p> <
                p className = "pt-2 mx-3 bolder" > < span className = "active" > Deposit < /span> of amount: < span className = "font-lighter" > {deposit.deposit_amount} < /span > .Account type: < span className = "font-lighter" > { deposit.deposit_category } < /span > <
                div >
                <
                p className = "x-small text-end" > < span className = "blue-dark rounded-4 p-1 px-2" > {
                    (deposit.created.slice(0, 10)) } < /span>  < /
                p > < /div> < /
                p > < /
                div >
            ))
        } <
        /
        div > < /div>
    );
};
export default Notify;