import { PersonalRequests, MainRequests, UserRequests, GetRiskProfile, GetUserTrackRequests, UserVerificationRequests, PendingWithdrawRequests, InvestmentWithdrawRequests, UserBanks } from "../Api/MainRequests";
import React, { useState, useEffect } from "react";
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.scss';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Goal1 from '../Accounts/Goal1';
import Modal from 'react-bootstrap/Modal';
import Goal from '../Accounts/Goal'
import Withdraw from '../Accounts/Withdraw'
import GoalPhoto from "../Accounts/goalPhoto";
import Chart from 'react-apexcharts';
import { AddUser, Image, Filter } from "react-iconly";
import { getCurrency } from "../payment/GetCurrency";
import ProgressBar from 'react-bootstrap/ProgressBar';
import PendingWithdraws from '../Accounts/PendingWithdraws'
import Goals from '../images/house.png'
import { FaDonate } from "react-icons/fa";

const Personal = ({...props }) => {
        const [span, setSpan] = useState([])
        const [mine, setMine] = useState([])
        const [name, setName] = useState("")
        const [show, setShow] = useState(false);
        const [holdId, setHoldId] = useState("");
        const [country, setCountry] = useState("");
        const [phone, setPhone] = useState("");
        const [email, setEmail] = useState("");
        const [deposit, setDeposit] = useState("");
        const [handler, setHandler] = useState("");
        const [holdName, setHoldName] = useState("");
        const [holdNetworth, setHoldNetworth] = useState("");
        const [holdAmount, setHoldAmount] = useState("");
        let [holdDeposit, setHoldDeposit] = useState("");
        let [holdDeposits, setHoldDeposits] = useState("");
        const [groups, setGroups] = useState(0)
        const [banks, setBanks] = useState("")
        const [userTrack, setUserTrack] = useState([])
        const [pendingWithdraw, setPendingWithdraw] = useState([])
        const [investmentWithdraw, setInvestmentWithdraw] = useState([])
        const [holdCreated, setHoldCreated] = useState("");
        const [goalPicture, setPicture] = useState("")
        const [show3, setShow3] = useState(false);
        const handleClose3 = () => setShow3(false);
        const handleShow3 = () => setShow3(true);
        const handleClose = () => setShow(false);
        const handleShow = () => setShow(true);
        const [show1, setShow1] = useState(false);
        const handleClose1 = () => setShow1(false);
        const handleShow1 = () => setShow1(true);
        const [show4, setShow4] = useState(false);
        const handleClose4 = () => setShow4(false);
        const handleShow4 = () => setShow4(true);
        const [show5, setShow5] = useState(false);
        const handleClose5 = () => setShow5(false);
        const handleShow5 = () => setShow5(true);
        const [investmentOption, setinvestmentoption] = useState("")
        const [option_name, setOptionName] = useState("")
        const [investment_id, setInvestmentId] = useState("")
        const [complete, setComplete] = useState("Incomplete");
        const [goalStatus, setGoalStatus] = useState();
        const [verification, setVerification] = useState("")
        useEffect(() => {
            PersonalRequests().then(res => {
                setSpan(res[2]); // array(14)
            });
            MainRequests().then(res => {
                setMine(res[4])
            });
            GetRiskProfile().then(res => {
                setinvestmentoption(res.investment_option)
            });
            GetUserTrackRequests().then(res => {
                setUserTrack(res)
            });
            PendingWithdrawRequests().then(res => {
                setPendingWithdraw(res)
            });
            InvestmentWithdrawRequests().then(res => {
                setInvestmentWithdraw(res)
            });
            UserVerificationRequests().then(res => {
                setVerification(res.success)
            });
            UserRequests().then(res => {
                setCountry(res.profile.country)
                setPhone(res.profile.phoneno)
                setEmail(res.email)
                setName(res.first_name + " " + res.last_name)
            });
            UserBanks().then(res => {
                setBanks(res.data)
            });
            GetRiskProfile().then(res => {
                if (res.status === true) {
                    setComplete("Complete")
                }
            });
        }, []);
        const groupArrayObjects = mine.reduce((group, obj) => {
            let sum = 0
            const { name, datas, networths, id, handler, logo } = obj;
            if (!group[name]) {
                group[name] = {
                    name: name,
                    data: [],
                    networth: [],
                    investment_id: id,
                    handler: handler,
                    total: sum,
                    logo: logo
                };
            }
            group[name].data.push(datas);
            group[name].networth.push(networths)
            return group;
        }, {});
        const results = Object.values(groupArrayObjects);
        const groupArrayObject = investmentWithdraw.reduce((group, obj) => {
            let sum = 0
            const { name, datas, date } = obj;
            if (!group[name]) {
                group[name] = {
                    name: name,
                    amount: [],
                    date: date,
                    total: sum,
                    logo: ""
                };
            }
            group[name].amount.push(datas);
            return group;
        }, {});
        const result = Object.values(groupArrayObject);
        result.forEach(data => {
            data.total = data.amount.reduce((total, value) => total + parseInt(value), 0);
        });
        results.forEach(data => {
            data.total = data.networth.reduce((total, value) => total + parseInt(value), 0);
        });
        function summm(array) {
            let sum = 0
            array.forEach(item => {
                sum = sum + item
            });
            return sum
        }
        const options = {
            seriesDonut: results.map(option => summm(option.data)),
            optionsDonut: {
                labels: results.map(option => (option.name)),
                chart: {
                    type: 'donut',
                },
                // colors: ['#E91E63', '#252859', '#FF9800', '#b7b7'],
                colors: ['#000', '#252859', '#FF9800', '#b7b7b7'],
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
        function getId(id, name, amount, deposit, networth, created, status, picture, deposits) {
            setHoldId(id)
            setHoldName(name)
            setHoldAmount(amount)
            setHoldDeposit(deposit)
            setHoldCreated(created)
            setHoldNetworth(networth)
            setGoalStatus(status)
            setPicture(picture)
            setHoldDeposits(deposits)
            handleShow3()
        }
        function onlyId(id) {
            setHoldId(id)
            handleShow()
        }
        function getWithdraws(name,networth,investment_id,deposit,handler){
            setOptionName(name)
            setGroups(networth)
            setInvestmentId(investment_id)
            setDeposit(deposit)
            setHandler(handler)
            handleShow4()
        }
        function getPendingWithdraws(){
            handleShow5()
        }
        function summ(num1, num2) {
            let sum = num1 + num2
            return sum
        }
        let progress
        const myInvestments = () => {
            if (results.length === 0) {
                return ( 
                    <div className = 'p-5 rounded-4 text-center grey-text mt-5'> <div className = 'd-flex flex-row justify-content-center'> 
                    <Image size = "large"
                    set = "broken"
                    className = 'mx-2 grey-text' /> 
                    <Filter size = "large"
                    set = "broken"
                    className = ' grey-text' /> </div> <h6> You have no data yet to show...  
                    </h6> </div> )
                }
                else return (
                        userTrack.map((option, id) => (
                            <div className={"cards p-3 mt-1 row rounded-4 tab-nav"} key={id} onClick={() => getWithdraws(option.investment_option,option.closing_balance,option.investment_id,summ(option.opening_balance, option.deposit_amount),option.fund_manager)}>
                                <div className=''><h5 className='bolder text-start pb-1'>{option.investment_option}<h5>{option.fund_manager}</h5></h5> </div>
                                        <div className = "row">
                                        <div className='col text-start pt-4 px-0'>
                                        <span className="light-res-home p-2 rounded-3"><FaDonate/></span>
                                        </div>
                                        <div className='col text-end px-0'> 
                                        <h5 className='m-0'>Deposit:
                                        <div className = "d-flex flex-row flex m-0 justify-content-end">
                                        <span className='bolder'> { getCurrency(country) } </span>  
                                        <h4 className = "bolder text-white"> {
                                    (option.opening_balance + option.deposit_amount).toLocaleString()
                                } </h4></div></h5></div><div className='text-end p-0'><h5 className='m-0'>Networth:
                                <div className = "d-flex flex-row flex m-0 justify-content-end"><span className='bolder'> { getCurrency(country) } </span>  
                                <h4 className = "px-1 bolder text-white m-0" > {
                                    option.closing_balance.toLocaleString()
                                } </h4></div></h5></div> 
                                </div>
                            </div>
                        ))
                    )

            }
            const pendingWithdraws = () => {
                if (pendingWithdraw.length === 0) {
                    return ( <div className = 'p-5 rounded-4 mt-2 text-center grey-text'> <div className = 'd-flex flex-row justify-content-center'> 
                    <Image size = "large"
                    set = "broken"
                    className = 'mx-2 grey-text'/> 
                    <Filter size = "large"
                    set = "broken"
                    className = ' grey-text'/> </div> <h6> You have no data yet to show...  
                    </h6> </div> )
                    }
                    else return (
                        pendingWithdraw.map(withdraw => ( <div className="">
                        <div className = 'row p-2 mx-3 mt-1 cards rounded-3'>
                            <div className = 'col-4 text-start' ><h5><span className="small"> { withdraw.currency }</span> { (withdraw.withdraw_amount).toLocaleString() } </h5> </div><div className="col-3 text-center">
                                <h5 className="text-start"><span className="small bolder">option </span><br/><span>{withdraw.investment_option} </span></h5>
                            </div><div className="col-4 text-center">
                                <h5 className="text-start"><span className="small bolder">handler </span><br/><span>{withdraw.handler} </span></h5>
                            </div> 
                            <div className = 'col-1 text-end bolder' > <h6> { withdraw.created } </h6></div> </div></div>
                        ))
                    )
        
            }
            const myGoals = () => {
                if(span.length === 0){
                    return(
                        <div className='rounded-4 bg-whiter'>
                        <img src={Goals} width="100%" height="100%" alt="goals"/>
                        <div className = " py-5 text-center">
                        <h4 className = "bolder" > Goal Investing </h4>  
                        <h6 className = "mx-5" > Let your dreams come true by investing
                            for them, <p className = "mx-5" > create your goals here </p>  </h6> 
                        </div>
                        </div>
                    )
                } else {return (
                span.map(goal => ( 
                    <div className = "py-2 px-3 bg-white rounded-4 mt-2"
                    key = { goal.goal_id }> 
                    <div className = "d-flex flex-row"> 
                    <span className = "mt-2 d-none"> 
                    <AddUser className = "p-2 bg-lighter rounded"
                    size = "large" /> </span>  
                    <h6 className = "m-2 hover-goal-name" onClick = {
                        () => getId(goal.goal_id, goal.goal_name, goal.goal_amount, goal.deposit[0],goal.deposit[1], goal.created, goal.goal_status, goal.goal_picture, goal.deposit[2])
                    }> <span className="bolder"> {
                        (goal.goal_name)
                    } </span><br/> <p className="small"> created {
                        (goal.created).slice(0, 10)
                    } </p>  
                    </h6> 
                    </div><div className = "goal-image" onClick={() => onlyId(goal.goal_id)}>
                    <img src = {goal.goal_picture} width="100%" height="100%" className = "object-fit-cover rounded-4" alt = "goal" /> </div> 
                    <p className="small mt-2 mb-0"><h5>Progress: {
                        progress = (100 - ((goal.goal_amount - goal.deposit[0]) / goal.goal_amount * 100)).toFixed(2)
                    } %</h5>
                    <h5>
                    <ProgressBar now = { progress }
                    className="progress-sm"
                    variant = "#ff8800" />
                    </h5> </p>
                    </div>
                )))}
            }
            return ( 
                <div> 
                    <div className = "row rounded-4 mt-4 mx-3">
                    <div className = "col-8"> 
                    <div className = "row justify-content-center rounded-4 mx-1">
                    <div className = "col-5 text-center"> 
                    <Chart options = { options.optionsDonut }
                    series = { options.seriesDonut }
                    height = { 300 }
                    width = { 200 }
                    type = "donut" />
                    </div> 
                    <div className = "col-7 px-4 text-center scroll-y5"> {
                    myInvestments()
                } </div>
                <Modal show = { show }
                onHide = { handleClose } {...props }> 
                <GoalPhoto goal_id={holdId} />  </Modal>
                    <div className = "row my-3 p-2 light-res-home rounded-4">
                    <div className="col-7 rounded-4 ">
                    <h6 className = "mt-3 bolder"> <span className = " px-2 py-1 d-none bg-lighter rounded mx-2" > { pendingWithdraw.length } </span> Pending Withdraw Requests </h6>
                    <h6 className="small lh-1">After requesting withdraw, your withdraw status becomes pending till approved by your fund manager</h6>
                    </div>
                    <div className="col-5 p-2 text-end"><h5 className="btn btn-warning py-2 px-3 rounded-2" onClick={() => {getPendingWithdraws()}}>pending withdraws</h5></div>
                    <div className="scroll-y3 investments d-none rounded-3"> {pendingWithdraws()}</div></div> 
                    </div>
                    </div> 
                
                <div className = "col-4 bg-light rounded-4 pt-3">  
                <div className = "row">
                <div className = "col-7"> 
                <h5 className = " btn btn-warning rounded-2 px-3 py-2"
                onClick = { handleShow1 }>
                    Add New Goal </h5></div>
                <div className = "text-end col-5 p-2 px-3" > 
                <h5>GOALS </h5> </div> </div> 
                <div className = " pb-5 px-1 mt-2 scroll-y2 rounded-4" > {myGoals()} </div> 
                <Modal show = { show3 }
                onHide = { handleClose3 }
                dialogClassName = "my-modal1"> 
                <Goal id = { holdId }
                name = { holdName }
                fullname = { name }
                amount = { holdAmount }
                deposit = { holdDeposit }
                deposits = { holdDeposits }
                email = { email }
                created = { holdCreated }
                country = { country }
                networth = { holdNetworth }
                goalPicture = {goalPicture}
                phone = { phone }
                option = { investmentOption }
                banks = {banks}
                status = { goalStatus }
                /> </Modal>
                <Modal show = { show5 }
                onHide = { handleClose5 }
                dialogClassName = "my-modal-pending-withdraws">
                    <PendingWithdraws pendingWith = { pendingWithdraw}/>
                </Modal>
                <Modal show = { show4 }
                onHide = { handleClose4 }
                dialogClassName = "my-modal1" >
                <Withdraw country = { country }
                phone = { phone }
                fullname = { name }
                option_name = {option_name}
                networth = { groups }
                deposit = {deposit}
                handler = {handler}
                investmentId = {investment_id}
                verification = {verification}
                banks = {banks}
                currency = {getCurrency(country)}
                /> </Modal>
                <Offcanvas show = { show1 }
                placement = "end"
                className = "side-barsy bg-white pt-4"
                onHide = { handleClose1 } {...props }> 
                <Goal1 close1 = { handleClose1 }
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
                complete = {complete}
                verification = {verification}
                /> </Offcanvas> </div> 
                </div>
                </div>
            )
        };

 export default Personal;