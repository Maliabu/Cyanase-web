import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import './style.scss';
import { PendingWithdrawRequests } from '../Api/MainRequests';
import React, { useState, useEffect } from "react";
import { PROFILE_PHOTO } from '../apis';
import { Image, Filter } from 'react-iconly';

const ResWithdraws = () => {
        const [withdraws, setWithdraw] = useState([])
        useEffect(() => {
            PendingWithdrawRequests().then(res => {
                setWithdraw(res)
            })
        }, []);
        const pendingWithdraws = () => {
            if (withdraws.length === 0) {
                return ( < div className = 'p-5 rounded-4 bg-light text-center grey-text mt-5' > < div className = 'd-flex flex-row justify-content-center' > <
                    Image size = "large"
                    set = "broken"
                    className = 'mx-2 grey-text' / > <
                    Filter size = "large"
                    set = "broken"
                    className = ' grey-text' / > < /div> < h6 > You have no data yet to show...  < /
                    h6 > < /div > )
                }
                else return (
                    withdraws.map(withdraw => ( <
                        div className = 'row p-2 mx-2 mt-1 bg-white rounded-2' >
                        <
                        div className = 'col-5 text-start' > < h6 className='bolder'><span className='font-light'>{ withdraw.currency }</span>  { (withdraw.withdraw_amount).toLocaleString() } < /h6> < /div > <
                        div className = 'col-5 text-center' > <h6 className=""><span className="text-dark bolder">{withdraw.investment_option} </span> {withdraw.handler}</h6> < /div > <
                        div className = 'col-2 text-end bolder' > < h6 > { withdraw.created } < /h6>< /div > < /
                        div >
                    ))
                )

            }
            return ( < div className='p-1 bg-lighter'><
                div className = 'row d-none p-2 px-3' > <
                div className = 'col-10 bg-lighter rounded-4' > <
                h4 className = ' mx-3 bolder mt-3' > Your Pending Withdraws < /h4 > < /div >
                <
                div className = 'col-2' > <
                // img src = "http://127.0.0.1:8000/static/photo.png"
                img src = {PROFILE_PHOTO}
                className = "rounded-circle object-fit-cover mt-2 img-head"
                alt = "investors" / > < /div> < /
                div >
                <
                div ><h4 className='blue-darks p-3 rounded-top-3'>Pending Withdraws</h4> <div className="scroll-y2">{ pendingWithdraws() }</div>  < /div> < /
                div >
            );
        };
        export default ResWithdraws;