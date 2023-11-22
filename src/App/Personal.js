import { PersonalRequests, MainRequests, UserRequests, GetRiskProfile, PendingWithdrawRequests } from "../Api/MainRequests";
import React, { useState, useEffect } from "react";
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Wallet from '../images/wallet.png';
import './style.scss';
import Offcanvas from 'react-bootstrap/Offcanvas';
import TopUp from '../Accounts/TopUp';
import Goal1 from '../Accounts/Goal1';
import Modal from 'react-bootstrap/Modal';
import Learn1 from '../Accounts/Learn1';
import Goal from '../Accounts/Goal'
import Withdraw from '../Accounts/Withdraw'
import Chart from 'react-apexcharts';
import { AddUser, Image, Filter } from "react-iconly";
import { getCurrency } from "../payment/GetCurrency";
import ProgressBar from '@ramonak/react-progress-bar';

const Personal = ({...props }) => {
        const [span, setSpan] = useState([])
        const [mine, setMine] = useState([])
        const [name, setName] = useState()
        const [deposits, setDeposits] = useState([])
        const [show, setShow] = useState(false);
        const [holdId, setHoldId] = useState("");
        const [country, setCountry] = useState("");
        const [phone, setPhone] = useState("");
        const [email, setEmail] = useState("");
        const [holdName, setHoldName] = useState("");
        const [holdNetworth, setHoldNetworth] = useState("");
        const [holdAmount, setHoldAmount] = useState("");
        let [holdDeposit, setHoldDeposit] = useState("");
        const [groups, setGroups] = useState(0)
        const [pendingWithdraw, setPendingWithdraw] = useState([])
        const [holdCreated, setHoldCreated] = useState("");
        const [show3, setShow3] = useState(false);
        const handleClose3 = () => setShow3(false);
        const handleShow3 = () => setShow3(true);
        const handleClose = () => setShow(false);
        const handleShow = () => setShow(true);
        const [show1, setShow1] = useState(false);
        const handleClose1 = () => setShow1(false);
        const handleShow1 = () => setShow1(true);
        const [show2, setShow2] = useState(false);
        const handleClose2 = () => setShow2(false);
        const handleShow2 = () => setShow2(true);
        const [show4, setShow4] = useState(false);
        const handleClose4 = () => setShow4(false);
        const handleShow4 = () => setShow4(true);
        const [investmentOption, setinvestmentoption] = useState("")
        const [option_name, setOptionName] = useState("")
        useEffect(() => {
            PersonalRequests().then(res => {
                setSpan(res[2]); // array(14)
            });
            MainRequests().then(res => {
                setDeposits(res[6]);
                setMine(res[4])
            });
            GetRiskProfile().then(res => {
                setinvestmentoption(res.investment_option)
            });
            PendingWithdrawRequests().then(res => {
                setPendingWithdraw(res)
            });
            UserRequests().then(res => {
                setCountry(res.profile.country)
                setPhone(res.profile.phoneno)
                setEmail(res.email)
                setName(res.first_name + " " + res.last_name)
            })
        }, []);
        console.log(groups)
        const groupArrayObjects = mine.reduce((group, obj) => {
            const { name, datas, networths } = obj;
            if (!group[name]) {
                group[name] = {
                    name: name,
                    data: [],
                    networth: []
                };
            }
            group[name].data.push(datas);
            group[name].networth.push(networths)
            return group;
        }, {});
        const results = Object.values(groupArrayObjects);
        const options = {
            seriesDonut: results.map(option => summ(option.data)),
            optionsDonut: {
                labels: results.map(option => (option.name)),
                chart: {
                    type: 'donut',
                },
                colors: ['#252859', '#E91E63', '#FF9800', '#b7b7b7'],
                responsive: [{
                    breakpoint: 480,
                    options: {
                        chart: {
                            height: 500,
                            width: 300
                        },
                        legend: {
                            position: 'bottom'
                        }
                    }
                }],
                legend: {
                    position: 'bottom'
                }
            }
        }
        function getNetworths(arr){
            let sum = 0
            for(var i=0;i<arr.length;i++){
                sum += parseInt(arr[i])
            }
            return sum
        }
        function getId(id, name, amount, deposit, networth, created) {
            setHoldId(id)
            setHoldName(name)
            setHoldAmount(amount)
            setHoldDeposit(deposit)
            setHoldCreated(created)
            setHoldNetworth(networth)
            handleShow3()
        }
        function getWithdraws(name,networth){
            setOptionName(name)
            setGroups(networth)
            handleShow4()
        }
        function summ(array) {
            let sum = 0
            array.forEach(item => {
                sum = sum + item
            });
            return sum
        }
        let progress
        let nextDeposits = deposits
        let rev = nextDeposits.reverse()
        const myInvestments = () => {
            let nextResult = results.reverse()
            if (results.length === 0) {
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
                    nextResult.map(option => ( <
                        div className = "row mt-2 py-3 bg-white rounded-3" >
                        <
                        div className = "col-5" > < h6 className = "bolder" > { option.name } < /h6><span className="bk-warning p-2 rounded-4 px-3" onClick={() => getWithdraws(option.name,getNetworths(option.networth))}>Withdraw</span> < /
                        div >
                        <
                        div className = "col-3" > < h6 className = "bolder" > Networth: {
                            getNetworths(option.networth)
                        } < /h6> < /div > <
                        div className = "col" > < h6 className = "bolder" > Total: { getCurrency(country) } {
                            (((summ(option.data)) * 1000).toFixed(0)).toLocaleString()
                        } < /h6> < /div > < /
                        div > ))
                )

            }
            const pendingWithdraws = () => {
                if (pendingWithdraw.length === 0) {
                    return ( < div className = 'p-5 rounded-4 bg-lighter text-center grey-text' > < div className = 'd-flex flex-row justify-content-center' > <
                    Image size = "large"
                    set = "broken"
                    className = 'mx-2 grey-text' / > <
                    Filter size = "large"
                    set = "broken"
                    className = ' grey-text' / > < /div> < h6 > You have no data yet to show...  < /
                    h6 > < /div > )
                    }
                    else return (
                        pendingWithdraw.map(withdraw => ( <div className="scroll-y3"><
                            div className = 'row p-2 mx-2 mt-2 bg-white rounded-2' >
                            <
                            div className = 'col-7 text-start' > < h6 > { withdraw.currency } { withdraw.withdraw_amount } < /h6> < /div > <
                            div className = 'col-5 text-end grey-text bolder' > < h6 > { withdraw.created } < /h6>< /div > < /
                            div ></div>
                        ))
                    )
        
                }
            const myRecentActivity = () => {
                if (deposits.length === 0) {
                    return ( < div className = 'p-5 rounded-4 bg-lighter text-center grey-text' > < div className = 'd-flex flex-row justify-content-center' > <
                        Image size = "large"
                        set = "broken"
                        className = 'mx-2 grey-text' / > <
                        Filter size = "large"
                        set = "broken"
                        className = ' grey-text' / > < /div> < h6 > You have no data yet to show...  < /
                        h6 > < /div > )
                    }
                    else return (
                        rev.map(deposit => ( <
                            div className = "row mt-2 p-3 bg-white rounded-3"
                            key = { deposit.deposit_id } >
                            <
                            div className = "col" >
                            <
                            h6 className = "" > < span className = "bolder" > Deposit < /span> { deposit.currency } { (deposit.deposit_amount).toLocaleString() }  < /
                            h6 > <
                            /
                            div >
                            <
                            div className = "col-4" >
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
                return ( <
                    div > <
                    div className = "row mx-3" > <
                    div className = "col-8 px-3 rounded-4" >
                    <
                    h6 className = "py-2" > MY INVESTMENTS < /h6>  <
                    div className = "row justify-content-center rounded-4 bg-lighter p-3" >
                    <
                    div className = "row" > <
                    div className = "col" >
                    <
                    /
                    div > < /div>  <
                    div className = "row" >
                    <
                    div className = "col-5 text-center" > <
                    Chart options = { options.optionsDonut }
                    series = { options.seriesDonut }
                    height = { 300 }
                    width = { 200 }
                    type = "donut" /
                    >
                    <
                    /div > <
                    div className = "col-7 text-center" >
                    <
                    h6 className = "grey-text d-none py-2" > Summary Data of all your investments < /h6> {
                    myInvestments()
                } < /div > < /
                div > <
                    div className = "px-3 d-none text-center " >
                    <
                    img src = { Wallet }
                className = "pt-2 d-none"
                width = '10%'
                height = '30%'
                alt = "investors" / > <
                    h5 className = "bolder mt-3 d-none" > Account Balance < /h5> <
                div className = "d-flex flex-row d-none flex justify-content-center w-100" > getCurrency(country) <
                    h1 className = "px-2 font-lighter" > 0.0 < /h1> < /
                div >
                    <
                    div className = "d-flex flex-row d-none flex justify-content-center" >
                    <
                    h6 className = "px-5 py-3 mt-3 warning rounded-3"
                onClick = { handleShow } >
                    Top Up < /h6>  <
                Offcanvas show = { show }
                placement = "end"
                className = "side-bar"
                onHide = { handleClose } {...props } >
                    <
                    img src = { Wallet }
                className = "pt-2 text-center"
                width = '100'
                height = '100'
                alt = "investors" / >
                    <
                    Offcanvas.Header
                    // closeButton
                    >
                    <
                    div className = "row" > <
                    Offcanvas.Title className = "bolder" > Top Up < /Offcanvas.Title> </div >
                    <
                    /
                Offcanvas.Header > <
                    Offcanvas.Body className = "px-5" >
                    <
                    TopUp / > < /
                Offcanvas.Body > < /
                Offcanvas > <
                    h6 className = "px-5 py-3 mt-3 mx-2 warning rounded-3"
                onClick = { handleShow2 } >
                    Deposit < /h6> </div >
                    <
                    Modal show = { show2 }
                onHide = { handleClose2 }
                dialogClassName = "my-modal1" >
                    <
                    Learn1 tab9 = { props.handletab9 }
                / > < /
                Modal > < /
                div >
                    <
                    /div>  <
                div >
                    <
                    div className = "row" >
                    <
                    h6 className = "py-2 mt-2" > RPENDING WITHDRAWS < /h6> {pendingWithdraws()}<span className="d-none">{myRecentActivity()}</span> < /div > < /
                div >
                    <
                    /
                div > <
                    div className = "col-4 px-3 " > <
                    div className = "row p-1 bg-lighter rounded-3" >
                    <
                    div className = "text-start col-9 p-2" > < h6 > YOUR PERSONAL GOALS < /h6> < /div > <
                    div className = "text-end col-3 p-2" > < span className = " px-2 py-1 bg-white rounded-4" > { span.length } < /span> < /div > < /
                div > <
                    div className = " mt-2 px-5 bk-warning p-2 text-center rounded-4"
                onClick = { handleShow1 } >
                    Add a Goal < /div>  <
                div className = " pb-5 px-1 mt-2 scroll-y rounded-4" ><div className="row px-3 bg-lighter"> {
                    span.map(goal => ( <
                        div className = "py-2 px-3 bg-white res-home rounded-4 mt-2"
                        key = { goal.goal_id } > <
                        div className = "d-flex flex-row" > <
                        span className = "mt-2" > <
                        AddUser className = "p-2 border rounded-circle"
                        size = "large" / > < /span>  <
                        h6 className = "mx-4 mt-2" > < span className = "active bolder"
                        onClick = {
                            () => getId(goal.goal_id, goal.goal_name, goal.goal_amount, goal.deposit[0],goal.deposit[1], goal.created)
                        } > {
                            (goal.goal_name)
                        } < /span><br/ > < p > created {
                            (goal.created).slice(0, 10)
                        } < /p >  < /
                        h6 > < /
                        div >
                        <
                        p className="bolder"> Progress: {
                            progress = (100 - ((goal.goal_amount - goal.deposit[0]) / goal.goal_amount * 100)).toFixed(2)
                        } %
                        <
                        span >
                        <
                        ProgressBar completed = { progress }
                        maxCompleted = { 100 }
                        isLabelVisible = { false }
                        bgColor = 'orange' /
                        >
                        <
                        /span> < /
                        p > <
                        span className = "bolder d-none" > { goal.deposit[0] } < /span > <
                        span className = "active d-none" > { goal.goal_amount } < /span > < /
                        div >
                    ))
                } <
                    /div></div> <
                Modal show = { show3 }
                onHide = { handleClose3 }
                dialogClassName = "" > <
                    Goal id = { holdId }
                name = { holdName }
                fullname = { name }
                amount = { holdAmount }
                deposit = { holdDeposit }
                email = { email }
                created = { holdCreated }
                country = { country }
                networth = { holdNetworth }
                phone = { phone }
                option = { investmentOption }
                / > < /
                Modal ><
                Modal show = { show4 }
                onHide = { handleClose4 }
                dialogClassName = "my-modal1" >
                <
                Withdraw country = { country }
                phone = { phone }
                fullname = { name }
                option_name = {option_name}
                networth = { groups }
                / > < /
                Modal >
                    <
                    Offcanvas show = { show1 }
                placement = "end"
                className = "side-barsy bg-white pt-5"
                onHide = { handleClose1 } {...props } > <
                    Goal1 close1 = { handleClose1 }
                name = { holdName }
                email = { email }
                amount = { holdAmount }
                deposit = { holdDeposit }
                created = { holdCreated }
                country = { country }
                networth = { holdNetworth }
                phone = { phone }
                option = { investmentOption }
                fullname = { name }
                tab9 = { props.handletab9 }
                / > < /
                Offcanvas > < /
                div > < /
                div >
                    <
                    /
                div >
            )
        };

        export default Personal;