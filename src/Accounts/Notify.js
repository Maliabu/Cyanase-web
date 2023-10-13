import { MainRequests } from "../Api/MainRequests";
import React, { useEffect, useState } from "react";
import '../App.css';
import { FaLightbulb } from "react-icons/fa";
import { PROFILE_PHOTO } from "../apis";
import { Image, Filter } from "react-iconly";


const Notify = () => {
        const [deposits, setDeposits] = useState([])
        useEffect(() => {
            MainRequests().then(res => {
                setDeposits(res[6]);
            });
        }, []);
        const myRecentActivity = () => {
            if (deposits.length === 0) {
                return ( < div className = 'p-5 rounded-4 text-center grey-text mt-5' > < div className = 'd-flex flex-row justify-content-center' > <
                    Image size = "large"
                    set = "broken"
                    className = 'mx-2 grey-text' / > <
                    Filter size = "large"
                    set = "broken"
                    className = ' grey-text' / > < /div> < h6 > You have no data yet to show...  < /
                    h6 > < /div > )
                }
                else return (
                    deposits.map(deposit => ( <
                        div className = "row mt-2 p-3 bg-white rounded-3"
                        key = { deposit.deposit_id } >
                        <
                        div className = "col" >
                        <
                        h6 className = "" > < span className = "bolder" > Deposit < /span> { deposit.currency } { deposit.deposit_amount }  < /
                        h6 > <
                        /
                        div >
                        <
                        div className = "col-6" >
                        <
                        h6 className = "px-5 active text-center" > { deposit.deposit_category } < /h6> < /
                        div >
                        <
                        div className = "col text-end" >
                        <
                        h6 className = " bolder" > {
                            (deposit.created)
                        } < /
                        h6 > <
                        /div > < /
                        div > ))
                )

            }
            return ( < div className = 'p-1 res-home' > < div >
                <
                div className = 'row p-2 px-3' > <
                div className = 'col-10 bg-lighter rounded-4' > <
                h4 className = ' mx-3 bolder mt-3' > Your Recent Activity < /h4 > < /div >
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
                img src = {PROFILE_PHOTO}
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
                div >
                <
                div className = 'bg-lighter rounded-4 p-3' > { myRecentActivity() } < /div> < /
                div >
            );
        };
        export default Notify;