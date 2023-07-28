import { MainRequests, PersonalRequests, Networth, UserRequests, GetRiskProfile, PendingWithdrawRequests } from '../Api/MainRequests'
import React, { useState, useEffect } from "react";
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Deposit from '../images/Path 80.png';
import Networths from '../images/Path 3.png';
import Chart from 'react-apexcharts';
import './style.scss';
import Modal from 'react-bootstrap/Modal';
import Learn from '../Accounts/Learn';
import Learn1 from '../Accounts/Learn1';
import Withdraw from '../Accounts/Withdraw'
import { Wallet, Image, Filter } from 'react-iconly';
import { FaHandHoldingUsd } from 'react-icons/fa';
import { getCurrency } from '../payment/GetCurrency';

const Main = ({ id, activeTab, children, ...props }) => {
    const [show1, setShow1] = useState(false);
    const [show2, setShow2] = useState(false);
    const [show3, setShow3] = useState(false);
    const [span, setSpan] = useState([])
    const [graph, setGraph] = useState([])
    const [country, setCountry] = useState([])
    const [email, setEmail] = useState([])
    const [name, setName] = useState([])
    const [phone, setPhone] = useState([])
    const [withdraws, setWithdraw] = useState([])
    const [dates, setDates] = useState([])
    const [deposit, setDeposit] = useState(0);
    const [totalDeposit, setTotalDeposit] = useState(0);
    const [dollar, setDollar] = useState(0);
    const [depositProgress, setDepositProgress] = useState([]);
    const [networth, setDepositNetworth] = useState(0);
    const [dollarNetworth, setDollarNetworth] = useState(0);
    const [investmentOption, setinvestmentoption] = useState("Cash | Venture | Credit")
    let thisYear = new Date().getFullYear()
    let depos = []
    let cart = []
    let categories
    let amount
    graph.map(depo => {
        amount = depo.deposit_amount / 1000
        categories = depo.investment_option
        cart.push(categories)
        depos.push(amount)
        return graph
    })
    const handleClose1 = () => setShow1(false);
    const handleShow1 = () => setShow1(true);
    const handleClose2 = () => setShow2(false);
    const handleShow2 = () => setShow2(true);
    const handleClose3 = () => setShow3(false);
    const handleShow3 = () => setShow3(true);
    useEffect(() => {
        PersonalRequests().then(res => {
            setSpan(res[2]); // array goals
        });
        MainRequests().then(res => {
            setDollar(res[1]);
            setTotalDeposit(res[2]);
            setDollarNetworth(res[3]);
            setDepositProgress(res[4]);
            setGraph(res[4]); // array deposits
            setDates(res[5])
        })
        GetRiskProfile().then(res => {
            if (res.investment_option === undefined) {
                setinvestmentoption("Cash | Venture | Credit")
            } else {
                setinvestmentoption(res.investment_option)
            }
        });
        UserRequests().then(res => {
            setCountry(res.profile.country)
            setName(res.last_name + " " + res.first_name)
            setPhone(res.profile.phoneno)
            setEmail(res.email)
        });
        Networth().then(res => {
            setDeposit(res[1])
            setDepositNetworth(res[2])
        });
        PendingWithdrawRequests().then(res => {
            setWithdraw(res)
            console.log(res)
        })
    }, []);
    let depositTotal = 0
    span.map(goal => (
        depositTotal += parseInt(goal.deposit[0])
    ))
    const wwithdraw = () => {
        let total_withdraws = []
        withdraws.map(withdraw => (total_withdraws.push(parseInt(withdraw.withdraw_amount))))
        let sum = 0;
        for (let i = 0; i < total_withdraws.length; i++) {
            sum += total_withdraws[i];
        }
        return sum
    }
    const wwithdraws = () => {
        let total_withdraws = []
        withdraws.map(withdraw => (total_withdraws.push(parseInt(withdraw.withdraw_amount))))
        let withdraw = total_withdraws.length
        return withdraw
    }
    const groupArrayObject = graph.reduce((group, obj) => {
        const { name, datas, date } = obj;
        if (!group[name]) {
            group[name] = {
                date: date,
                name: name,
                data: []
            };
        }
        group[name].data.push(datas);
        return group;
    }, {});
    const result = Object.values(groupArrayObject);
    console.log(result)
    console.log(graph)

    // function onlyUnique(value, index, array) {
    //     return array.indexOf(value) === index;
    // }

    // const newDates = result.map(date => (
    //     date.date
    // ));
    const options = {
        options: {
            chart: {
                id: 'apexchart-example'
            },
            xaxis: {
                name: '2023',
                title: {
                    text: 'Investments for ' + thisYear
                },
                categories: dates,
                // categories: ['jun', 'jul', 'aug'],
            },
            yaxis: {
                title: {
                    text: 'In Thousands(000) of ' + getCurrency(country)
                }
            },
            colors: ['#252859', '#E91E63', '#FF9800', '#b7b7b7'],

        },
        series: result,
        // series: [2, 60, 4],
        stroke: {
            curve: 'smooth',
        }
    }
    const pendingWithdraws = () => {
        if (withdraws.length === 0) {
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
                withdraws.map(withdraw => ( <
                    div className = 'row p-2 mx-3 mt-2 bg-white rounded-3' >
                    <
                    div className = 'col-7 text-start' > < h6 > { withdraw.currency } { withdraw.withdraw_amount } < /h6> < /div > <
                    div className = 'col-5 text-end grey-text bolder' > < h6 > { withdraw.created } < /h6>< /div > < /
                    div >
                ))
            )

        }
        return ( <
            div className = " p-lg-2 scroll-y" >
            <
            div className = " d-none d-lg-block" >

            <
            h6 > YOUR STATISTICS < /h6>   <
            div className = "row" >
            <
            div className = "col-lg-9 rounded-4 col-md-12 p-3" >
            <
            div className = 'row p-3 bg-lighter rounded-4' >
            <
            div className = "row" >
            <
            div className = "p-lg-3 bg-white rounded-4 col text-center" >
            <
            h5 className = "bolder mt-3" > Deposit < /h5> <
            div className = "d-flex flex-row flex justify-content-center" > { getCurrency(country) } <
            h3 className = "px-2 font-lighter" > { deposit } < /h3></div >
            <
            img src = { Deposit }
            className = "pt-2 d-none"
            width = '100%'
            height = '30%'
            alt = "investors" / >
            <
            div className = ' my-3' >
            <
            span className = 'py-3 d-none px-5 warning active text-center rounded-3' > Withdraw < /span>  <
            h6 className = 'p-3 px-5 mx-5 warning text-center rounded-3'
            onClick = { handleShow3 } > <
            Wallet size = "medium"
            set = "broken"
            className = 'mx-2 d-none' / > Deposit < /h6> </div >
            <
            Modal show = { show3 }
            onHide = { handleClose3 }
            dialogClassName = "my-modal1" >
            <
            Learn1 tab9 = { props.handletab9 }
            option = { investmentOption }
            country = { country }
            lastname = { name }
            email = { email }
            phone = { phone }
            / > < /
            Modal >
            <
            /
            div >

            <
            div className = "blue-dark p-lg-3 rounded-4 col mx-3 text-center" >
            <
            h5 className = "bolder mt-3" > Networth < /h5> <
            div className = "d-flex flex-row flex justify-content-center" > { getCurrency(country) } <
            h3 className = "px-2 font-lighter" > { networth } < /h3></div >
            <
            img src = { Networths }
            className = "pt-2"
            width = '80%'
            height = '30%'
            alt = "investors" / >
            <
            div className = 'my-3 d-none' >
            <
            span className = 'py-3 px-3 border text-center rounded-3' > < FaHandHoldingUsd size = "20"
            className = 'mx-5' / > Withdraw < /span></div > < /
            div > < /div> <
            div className = 'row bg-lighter p-3' >
            <
            div className = '' > <
            Chart options = { options.options }
            series = { options.series }
            className = "w-100"
            type = "area"
            height = { 300 }
            /></div > <
            div className = 'rounded-4 row bg-white p-5' >
            <
            div className = 'col-3' >
            <
            h5 className = 'bolder' > Investment Details < /h5> <
            h6 > Your current Investment Option as per your risk profile: < span className = 'bolder active' > T.bonds < /span> < /
            h6 >
            <
            /div> <
            div className = 'col-6 text-center' >
            <
            h5 className = "bolder mt-3" > Networth < /h5> <
            div className = "d-flex flex-row flex justify-content-center" > { getCurrency(country) } <
            h1 className = "px-2 font-lighter" > { networth } < /h1></div >
            <
            /div><
            div className = 'col-3' >
            <
            div className = 'my-3' >
            <
            h6 className = 'py-3 warning px-5 text-center rounded-3'
            onClick = { handleShow2 } > < FaHandHoldingUsd size = "20"
            className = 'mx-2 d-none' / > Withdraw < /h6></div >
            <
            Modal show = { show2 }
            onHide = { handleClose2 }
            dialogClassName = "my-modal1" >
            <
            Withdraw country = { country }
            phone = { phone }
            networth = { networth }
            fullname = { name }
            / > < /
            Modal > <
            /div> < /
            div > < /
            div > < /
            div > <
            div >
            <
            div className = "py-5 d-none" >
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
            div className = "col-lg-8 mt-5" > <
            h4 className = "bolder" > Welcome to Cyanase < /h4>  <
            h6 > Investments products, loans, sacco groups, investment clubs all in one package.Including our API
            for integration < /h6> <h6>What products are you looking for? < /
            h6 > < /
            div > <
            div className = "col-lg-4 p-lg-5 text-center" >
            <
            h6 className = "px-lg-4 py-3 rounded-3 warning text-center"
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
            div className = "col-lg-3 d-none d-sm-block px-2 text-center" >
            <
            div className = ' px-2 py-3 mt-3 rounded-4 scroll-y3 bg-lighter' >
            <
            h6 className = "bolder py-2" > Your Pending Withdraws < /h6> {
            pendingWithdraws()
        } < /div><div className='blue-dark p-3 mt-3 rounded-4'> <
        h5 className = "bolder mt-5" > Your Statistics < /h5>    <
        div className = "d-flex flex-row p-2 flex justify-content-center" >
            <
            div className = "w-25" > < h6 > { depositProgress.length } < /h6>< /div > <
            div className = "w-25 d-none" > < h6 > 0 < /h6> < /div > <
            div className = "w-25" > < h6 > { wwithdraws() } < /h6> < /div > < /
        div >
            <
            div className = "d-flex flex-row flex justify-content-center" >
            <
            div className = "w-25 mx-2" > < h6 > Deposits < /h6> < /div > <
            div className = "w-25 d-none" > < h6 > Loans < /h6> < /div > <
            div className = "w-25" > < h6 > Withdraws < /h6> < /div > < /
        div >
            <
            img src = { Networths }
        className = "py-2 mt-3"
        width = '80%'
        height = '10%'
        alt = "investors" / >
            <
            h6 className = "pt-5 bolder d-none" > Total Deposits < /h6> <
        div className = "d-flex d-none flex-row flex justify-content-center" > { getCurrency(country) } <
            h3 className = "px-2 font-lighter" > { networth } < /h3></div >
            <
            img src = { Networths }
        className = "py-2 d-none mt-3"
        width = '80%'
        height = '10%'
        alt = "investors" / >
            <
            h6 className = "pt-5 bolder" > Total Deposits < /h6>  <
        div className = "d-flex flex-row flex justify-content-center" > { getCurrency(country) } <
            h3 className = "px-2 font-lighter" > { totalDeposit } < /h3></div >
            <
            img src = { Networths }
        className = "py-2 mt-3"
        width = '80%'
        height = '10%'
        alt = "investors" / >
            <
            h6 className = "pt-5 bolder" > Total Withdraws < /h6>  <
        div className = "d-flex flex-row flex justify-content-center" > { getCurrency(country) } <
            h3 className = "px-2 font-lighter" > {
                wwithdraw()
            } < /h3></div >
            <
            img src = { Networths }
        className = "py-2 mt-3"
        width = '80%'
        height = '10%'
        alt = "investors" / >
            <
            /
        div > < /div> < /
        div > < /
        div > < /div>
    );
};

export default Main;