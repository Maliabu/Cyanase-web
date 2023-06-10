import { MainRequests, PersonalRequests } from '../Api/MainRequests'
import React, { useState, useEffect } from "react";
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Deposit from '../images/Path 80.png';
import Networth from '../images/Path 3.png';
import './style.scss';
import Modal from 'react-bootstrap/Modal';
import Learn from '../Accounts/Learn';

const Main = ({ id, activeTab, children, ...props }) => {
    const [show1, setShow1] = useState(false);
    const [span, setSpan] = useState([])
    const [deposit, setDeposit] = useState(0);
    const [dollar, setDollar] = useState(0);
    const [depositProgress, setDepositProgress] = useState([]);
    const [networth, setDepositNetworth] = useState(0);
    const [dollarNetworth, setDollarNetworth] = useState(0);
    const handleClose1 = () => setShow1(false);
    const handleShow1 = () => setShow1(true);
    useEffect(() => {
        PersonalRequests().then(res => {
            setSpan(res[2]); // array(14)
        });
        MainRequests().then(res => {
            setDeposit(res[0]);
            setDollar(res[1]);
            setDepositNetworth(res[2]);
            setDollarNetworth(res[3]);
            setDepositProgress(res[4]);
        })
    }, []);
    let depositTotal = 0
    span.map(goal => (
        depositTotal += parseInt(goal.deposit[0])
    ))
    return ( <
        div className = " p-lg-2 rounded-25 scroll-y" >
        <
        div className = " rounded-25 d-none d-lg-block" >

        <
        h6 > YOUR STATISTICS < /h6>   <
        div className = "row" >
        <
        div className = "col-lg-9 col-md-12" > <
        div className = "d-flex flex-row flex py-2 " >
        <
        div className = "p-lg-4 peach rounded-25 w-50 text-center" >
        <
        h5 className = "bolder mt-4" > Deposit < /h5> <
        div className = "d-flex flex-row flex justify-content-center" > UGX <
        h1 className = "px-2 font-lighter" > { deposit - depositTotal } < /h1></div >
        <
        img src = { Deposit }
        className = "pt-2 d-none"
        width = '100%'
        height = '30%'
        alt = "investors" / >
        <
        div className = ' mt-4' >
        <
        span className = 'py-3 px-5 warning active text-center rounded-3' > Withdraw < /span> <
        span className = 'py-3 px-5 warning active text-center rounded-3 mx-2'
        onClick = { props.handletab5 } > Deposit < /span> </div > < /
        div >
        <
        div className = "blue-dark p-lg-4 mx-2 rounded-25 w-50 text-center" >
        <
        h5 className = "bolder mt-4" > Networth < /h5> <
        div className = "d-flex flex-row flex justify-content-center" > UGX <
        h1 className = "px-2 font-lighter" > { networth } < /h1></div >
        <
        img src = { Networth }
        className = "pt-2 d-none d-sm-block"
        width = '100%'
        height = '20%'
        alt = "investors" / >
        <
        /
        div >
        <
        /div>  <
        div >
        <
        div className = "py-5" >
        <
        h6 > DOLLAR ACCOUNT < /h6>     <
        div className = "d-flex flex-row flex mt-3 my-2 " >
        <
        div className = "p-lg-5 light shadow rounded-25 w-50 text-center" > <
        h5 className = "bolder mt-4" > Deposit < /h5>  <
        div className = "d-flex flex-row flex justify-content-center" > USD <
        h1 className = "px-2 font-lighter" > { dollar } < /h1></div > < /
        div >
        <
        div className = "shadow light rounded-25 p-lg-5 mx-3 px-lg-3 w-50 text-center" >
        <
        h5 className = "bolder mt-4" > Networth < /h5> <
        div className = "d-flex flex-row flex justify-content-center" > USD <
        h1 className = "px-2 font-lighter" > { dollarNetworth } < /h1></div >
        <
        /
        div > <
        /div>  < /
        div > <
        div className = "row rounded-25 w-100" >
        <
        div className = "col-lg-8 px-lg-5 mt-3" > <
        h4 className = "bolder" > Welcome to Cyanase < /h4>  <
        h6 > Investments products, loans, sacco groups, investment clubs all in one package.Including our API
        for integration < /h6> <h6>What products are you looking for? < /
        h6 > < /
        div > <
        div className = "col-lg-4 p-lg-5 text-center" >
        <
        h6 className = "px-lg-5 py-3 rounded-3 warning active text-center"
        onClick = { handleShow1 } > Learn More < /h6> < /
        div >
        <
        Modal show = { show1 }
        onHide = { handleClose1 }
        dialogClassName = "my-modal1" >
        <
        Learn close = { handleClose1 }
        tab2 = { props.handletab2 }
        / > < /
        Modal > < /
        div >
        <
        /
        div >
        <
        /
        div > <
        div className = "col-lg-3 d-none d-sm-block rounded-25 blue-dark py-5 px-2 text-center" >
        <
        h5 className = "bolder" > Your Statistics < /h5>  <
        h5 className = "pt-5 bolder" > Activity < /h5>   <
        div className = "d-flex flex-row flex justify-content-center" >
        <
        div className = "w-25" > { depositProgress.length } % < /div> <
        div className = "w-25" > 0 % < /div> <
        div className = "w-25" > 0 % < /div> < /
        div >
        <
        div className = "d-flex flex-row flex justify-content-center" >
        <
        div className = "w-25" > Deposits < /div> <
        div className = "w-25" > Loans < /div> <
        div className = "w-25" > Withdraws < /div> < /
        div >
        <
        img src = { Networth }
        className = "py-2 mt-3"
        width = '80%'
        height = '10%'
        alt = "investors" / >
        <
        h6 className = "pt-5 bolder" > Total Deposits < /h6> <
        div className = "d-flex flex-row flex justify-content-center" > UGX <
        h3 className = "px-2 font-lighter" > { networth } < /h3></div >
        <
        img src = { Networth }
        className = "py-2 mt-3"
        width = '80%'
        height = '10%'
        alt = "investors" / >
        <
        h6 className = "pt-5 bolder" > Total Networth < /h6>  <
        div className = "d-flex flex-row flex justify-content-center" > UGX <
        h3 className = "px-2 font-lighter" > { networth } < /h3></div >
        <
        div className = "d-flex flex-row flex justify-content-center" > USD <
        h1 className = "px-2 font-lighter" > { dollarNetworth } < /h1></div >
        <
        img src = { Networth }
        className = "py-2 mt-3"
        width = '80%'
        height = '10%'
        alt = "investors" / >
        <
        /
        div > < /
        div > < /
        div > < /div>
    );
};

export default Main;