import { MainRequests, PersonalRequests, GetInvestmentClassesRequests, RequestRiskAnalysisPercentages, UserRequests, GetRiskProfile, PendingWithdrawRequests, WithdrawRequests, UserVerificationRequests} from '../Api/MainRequests'
import React, { useState, useEffect } from "react";
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Networths from '../images/Path 3.png';
import Chart from 'react-apexcharts';
import './style.scss';
import Modal from 'react-bootstrap/Modal';
import Learn from '../Accounts/Learn';
import Learn1 from '../Accounts/Learn1';
import Withdraw from '../Accounts/Withdraw'
import { Image, Filter, Wallet } from 'react-iconly';
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
    const [investment_options, setOptions] = useState([])
    const [withdraws, setWithdraw] = useState([])
    const [totalWithdraw, setTotalWithdraw] = useState([])
    const [pendingWithdraw, setPendingWithdraw] = useState([])
    const [dates, setDates] = useState([])
    const [riskAnalysisPercentages, setRiskAnalysisPecentages] = useState([])
    const [verification, setVerification] = useState("")
    const [totalDeposit, setTotalDeposit] = useState(0);
    const [totalNetworth, setTotalNetworth] = useState(0);
    const [dollar, setDollar] = useState(0);
    const [depositProgress, setDepositProgress] = useState([]);
    const [networth, setDepositNetworth] = useState(0);
    const [dollarNetworth, setDollarNetworth] = useState(0);
    const [investmentOption, setinvestmentoption] = useState("Automatic")
    const [complete, setComplete] = useState("Incomplete");
    // let thisYear = new Date().getFullYear()
    let depos = []
    let cart = []
    let categories
    let amount
    if(graph.length > 0){
    graph.map(depo => {
        amount = depo.deposit_amount / 1000
        categories = depo.investment_option
        cart.push(categories)
        depos.push(amount)
        return graph
    })}
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
            setGraph(res[4]);
            setDates(res[5])
            setDepositNetworth(res[7])
            setTotalNetworth(res[9])
        })
        GetRiskProfile().then(res => {
            if (res.investment_option === undefined) {
                setinvestmentoption("Automatic Asset Allocation")
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
        PendingWithdrawRequests().then(res => {
            setPendingWithdraw(res)
        });
        UserVerificationRequests().then(res => {
            setVerification(res.success)
        });
        WithdrawRequests().then(res => {
            setWithdraw(res[0])
            setTotalWithdraw(res[1])
        });
        RequestRiskAnalysisPercentages().then(res=>{
            setRiskAnalysisPecentages(res)
        })
        GetInvestmentClassesRequests().then(res => {
            setOptions(res)
        });
        GetRiskProfile().then(res => {
            if (res.status === true) {
                setComplete("Complete")
            }
        });
    }, []);
    let depositTotal = 0
    if(span.length > 0){
    span.map(goal => (
        depositTotal += parseInt(goal.deposit[0])
    ))}
    const wwithdraws = () => {
        if(withdraws.length === 0){
            return 0
        } else {
            let total_withdraws = []
            withdraws.map(withdraw => (total_withdraws.push(parseInt(withdraw.withdraw_amount))))
            let withdraw = total_withdraws.length
            return withdraw 
        }
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
            dataLabels: {
                enabled: false
            },
            xaxis: {
                name: '2023',
                title: {
                    text: 'Your Investment Activity'
                },
                categories: dates,
                labels: {
                    show: false,
                }
                // categories: ['jun', 'jul', 'aug'],
            },
            yaxis: {
                show: false,
                title: {
                    text: 'In Thousands(000) of ' + getCurrency(country)
                }
            },
            // colors: ['#000', '#252859', '#ff8810', '#b7b7b7'],
            colors: ['#E91E63', '#252859', '#FF9800', '#b7b7b7'],

        },
        series: result,
        // series: [2, 60, 4],
        stroke: {
            curve: 'smooth',
        }
    }
    const networthy = () => {
        let networth = 0
        networth = totalNetworth - totalWithdraw
        return networth
    }
    const myGraphs = () =>{
        if(graph.length === 0){
            return null
        } else {
            return(
                <
            div className = 'p-2' > <
            Chart options = { options.options }
            series = { options.series }
            className = "w-100"
            type = "area"
            height = { 200 }
            /></div >
            )
        }
    }
    const pendingWithdraws = () => {
        if (pendingWithdraw.length === 0) {
            return ( < div className = 'p-lg-5 p-md-3 rounded-4 bg-lighter text-center grey-text mt-lg-5 mt-md-3' > < div className = 'd-flex flex-row justify-content-center' > <
                Image size = "large"
                set = "broken"
                className = 'mx-2 d-none d-lg-block grey-text' / > <
                Filter size = "large"
                set = "broken"
                className = ' grey-text' / > < /div> < h6 > You have no data yet to show...  < /
                h6 > < /div > )
            }
            else return (
                pendingWithdraw.map((withdraw, id) => ( <
                    div className = 'row p-2 mx-2 mt-2 bg-white rounded-2' key={id} >
                    <
                    div className = 'col-7 text-start' > < h6 > { withdraw.currency } { withdraw.withdraw_amount } < /h6> < /div > <
                    div className = 'col-5 text-end grey-text bolder' > < h6 > { withdraw.created } < /h6>< /div > < /
                    div >
                ))
            )

        }
        return ( <
            div className = "p-3 mt-3 scroll-y" >
            <
            div className = " d-none d-md-block d-lg-block" > <
            div className = "row" >
            <
            div className = "col-9 rounded-4" >
            <
            div className = 'row rounded-4' >
            <
            div className = "p-lg-3 mx-2 rounded-4 cards col text-center" >
            <
            h6 className = "text-start small" >Total <br/> Deposit < /h6> <
            div className = "d-flex flex-row my-3 flex justify-content-center" > { getCurrency(country) } <
            h2 className = "px-2 font-lighter" > { totalDeposit.toLocaleString() } < /h2></div >
            <
            div className = ' my-3 text-center' > <
            h6 className = 'btn btn-warning rounded-2'
            onClick = { handleShow3 } ><Wallet className="mx-2 d-none"/> Deposit < /h6> </div >
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
            verification = {verification}
            options = {investment_options}
            riskAnalysisPercentages = {riskAnalysisPercentages}
            complete = {complete}
            / > < /
            Modal >
            <
            /
            div >

            <
            div className = "cards p-lg-3 rounded-4 col text-center" >
            <
            h6 className = "small text-start" > Total <br/> Networth < /h6> <
            div className = "d-flex flex-row flex justify-content-center my-3" > { getCurrency(country) } <
            h2 className = "px-2 font-lighter" > { networthy().toLocaleString() } < /h2></div >
            <
            img src = { Networths }
            className = "pt-2"
            width = '80%'
            height = '30%'
            alt = "investors" / >
            <
            div className = 'my-3 d-none' >
            <
            span className = 'py-3 px-3 border text-center rounded-2' > < FaHandHoldingUsd size = "20"
            className = 'mx-5' / > Withdraw < /span></div > < /
            div > <
            div >
            {myGraphs()} <
            div className = 'rounded-4 mt-2 row d-none bg-white p-lg-4 p-md-2' >
            <
            div className = 'col-4' >
            <
            h4 className = 'bolder' > Investment Details < /h4> <
            h6 > Your current Investment Option as per your risk profile: < span className = 'bolder' > Cash | Credit | Venture | Absolute Return < /span> < /
            h6 >
            <
            /div> <
            div className = 'col-5 text-center' >
            <
            h5 className = "bolder mt-1" > Networth < /h5> <
            div className = "d-flex flex-row flex justify-content-center" > { getCurrency(country) } <
            h1 className = "px-2 font-lighter" > { networthy().toLocaleString() } < /h1></div >
            <
            /div><
            div className = 'col-3' >
            <
            div className = 'my-3' >
            <
            h6 className = ' warning text-center rounded-4'
            onClick = { handleShow2 } > Withdraw < /h6></div >
            <
            Modal show = { show2 }
            onHide = { handleClose2 }
            dialogClassName = "my-modal1" >
            <
            Withdraw country = { country }
            phone = { phone }
            networth = { totalNetworth }
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
            h2 className = "px-2 font-lighter" > { dollarNetworth } < /h2></div >
            <
            /
            div > <
            /div>  < /
            div > <
            div className = "row rounded-4 bg-light w-100" >
            <
            div className = "col-8 p-5" > <
            h4 > Welcome to Cyanase  <
            p className='small'> Investments products, loans, sacco groups, investment clubs all in one package.Including our API
            for integration < /p> <p>What products are you looking for? < /
            p >< /h4>  < /
            div > <
            div className = "col-4 text-center py-3" >
            <
            h6 className = "rounded-2 btn btn-warning text-center"
            onClick = { handleShow1 } > Learn More < /h6> < /
            div >
            <
            Modal show = { show1 }
            onHide = { handleClose1 }
            dialogClassName = "my-modal1" >
            <
            Learn close = { handleClose1 }
            name = {name}
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
            div className = "col-3 d-none d-md-block d-sm-block px-2 text-center" >
            <
            div className = ' px-2 py-3 rounded-4 scroll-y3 bg-lighter d-none' >
            <
            h6 className = "bolder py-2" > Your Pending Withdraws < /h6> {
            pendingWithdraws()
        } < /div><div className='cards p-2 rounded-4'> <
        h5 className = " mt-4" > Your Statistics < /h5>    <
        div className = "row px-2 justify-content-center" >
            <
            div className = "col" > < h6> { depositProgress.length } <p className='small'>Deposits</p> < /h6>< /div > <
            div className = "col" > < h6> { wwithdraws() } <p className='small'>Withdraws</p>< /h6> < /div > < /
        div >
            <
            img src = { Networths }
        className = "py-2 mt-3"
        width = '80%'
        height = '10%'
        alt = "investors" / >
            <
            h6 className = "pt-5 d-none" > Total Deposits < /h6> <
        div className = "d-flex d-none flex-row flex justify-content-center" > { getCurrency(country) } <
            h3 className = "px-2 font-lighter" > { networth.toLocaleString() } < /h3></div >
            <
            img src = { Networths }
        className = "py-2 d-none mt-3"
        width = '80%'
        height = '10%'
        alt = "investors" / >
            <
            h6 className = "pt-5 small" > Total Deposits < /h6>  <
        div className = "d-flex flex-row flex justify-content-center" > { getCurrency(country) } <
            h3 className = "px-2 font-lighter" > { totalDeposit.toLocaleString() } < /h3></div >
            <
            img src = { Networths }
        className = "py-2 mt-3"
        width = '80%'
        height = '10%'
        alt = "investors" / >
            <
            h6 className = "pt-5 small" > Total Withdraws < /h6>  <
        div className = "d-flex flex-row flex justify-content-center" > { getCurrency(country) } <
            h3 className = "px-2 font-lighter" > {
                totalWithdraw.toLocaleString()
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