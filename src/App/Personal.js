import { PersonalRequests, MainRequests, UserRequests, GetRiskProfile, UserVerificationRequests, PendingWithdrawRequests, InvestmentWithdrawRequests, UserBanks } from "../Api/MainRequests";
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

const Personal = ({...props }) => {
        const [span, setSpan] = useState([])
        const [mine, setMine] = useState([])
        const [name, setName] = useState("")
        const [deposits, setDeposits] = useState([])
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
        const [groups, setGroups] = useState(0)
        const [banks, setBanks] = useState("")
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
                setDeposits(res[6]);
                setMine(res[4])
            });
            GetRiskProfile().then(res => {
                setinvestmentoption(res.investment_option)
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
        const options = {
            seriesDonut: results.map(option => summ(option.data)),
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
        function getId(id, name, amount, deposit, networth, created, status, picture) {
            setHoldId(id)
            setHoldName(name)
            setHoldAmount(amount)
            setHoldDeposit(deposit)
            setHoldCreated(created)
            setHoldNetworth(networth)
            setGoalStatus(status)
            setPicture(picture)
            handleShow3()
        }
        function onlyId(id) {
            setHoldId(id)
            handleShow()
        }
        // let list1 = [{"name":"a", "total":3000, "data": [1,2]},{"name":"b", "total":1500, "data": [2,3,5]},{"name":"c", "total":5600, "data":[]}]
        // let list2 = [{"name":"a", "total":500},{"name":"b", "total":300}]
        function subtractTwoLists(listA, listB) {
            const mapA = new Map(listA.map(item => [item.name, { total: parseInt(item.total), data: item.data, investment_id: item.investment_id, handler: item.handler, logo: item.logo }])); // convert listA to map as { 'a' => { value: 2000, data: 'first' } }
          //console.log(mapA)
            // Subtract values from List B from List A
            listB.forEach(itemB => {
              const nameInB = itemB.name; //get name in B
              const valueInB = parseInt(itemB.total);//get value in B and parse to Int
              if (mapA.has(nameInB)) {
                  
                  const oldValue = mapA.get(nameInB).total;
                  mapA.set(nameInB, { total: oldValue - valueInB, data: mapA.get(nameInB).data, investment_id: mapA.get(nameInB).investment_id, handler: mapA.get(nameInB).handler, logo: mapA.get(nameInB).logo });
                 //Updates the value associated with the "name" attribute in List A to the result of the subtraction
              }
            });
           const resultList = Array.from(mapA, ([name, { total, data, investment_id, handler, logo }]) => ({ name, total, data, investment_id, handler, logo }));
            return resultList;  // convert map to list, i.e { 'a' => { value: 2000, data: 'first' } } to [ { name: 'a', value: 1200 }]
        }
        let final_data = subtractTwoLists(results, result)
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
            let nextResult = final_data.reverse()
            if (results.length === 0) {
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
                    nextResult.map(option => (
                        <div className="rounded-4 cards mt-2">
                        <div className = "row p-3" >
                        <div className="col-2"><img src={option.logo} width={30} height={40} alt="logo"/></div>
                        <div className="col-6 text-end"><h6 className="bolder"> { option.name }<p>{option.handler}</p> </h6><h6 className="small py-3"><span className="small">Networth:</span><br/>
                        <div className = "d-flex flex-row flex justify-content-end" > { getCurrency(country) } 
                        <h3 className = "font-lighter" > { (option.total).toLocaleString() } </h3></div> </h6></div>
                        <div className="col-4 text-end">
                        <h6 className=" btn btn-warning rounded-2 small" onClick={() => getWithdraws(option.name,option.total,option.investment_id, summ(option.data), option.handler)}>Withdraw</h6></div>
                        </div></div> ))
                )

            }
            const pendingWithdraws = () => {
                if (pendingWithdraw.length === 0) {
                    return ( < div className = 'p-5 rounded-4 mt-2 text-center grey-text' > < div className = 'd-flex flex-row justify-content-center' > <
                    Image size = "large"
                    set = "broken"
                    className = 'mx-2 grey-text' / > <
                    Filter size = "large"
                    set = "broken"
                    className = ' grey-text' / > < /div> < h6 > You have no data yet to show...  < /
                    h6 > < /div > )
                    }
                    else return (
                        pendingWithdraw.map(withdraw => ( <div className="">
                        <div className = 'row p-2 mx-3 mt-1 cards rounded-3' >
                            <div className = 'col-4 text-start' ><h6><span className="small"> { withdraw.currency }</span> { (withdraw.withdraw_amount).toLocaleString() } </h6> </div><div className="col-3 text-center">
                                <h6 className="text-start"><span className="small bolder">option </span><br/><span>{withdraw.investment_option} </span></h6>
                            </div><div className="col-4 text-center">
                                <h6 className="text-start"><span className="small bolder">handler </span><br/><span>{withdraw.handler} </span></h6>
                            </div> 
                            <div className = 'col-1 text-end bolder' > <h6> { withdraw.created } </h6></div> </div ></div>
                        ))
                    )
        
                }
            const myGoals = () => {
                if(span.length === 0){
                    return(
                        <div className='rounded-4 bg-whiter'>
                        <img src={Goals} width="100%" height="100%" alt="goals"/>
                        <div className = " py-5 text-center" >
                        <h4 className = "bolder" > Goal Investing </h4>  
                        <h6 className = "mx-5" > Let your dreams come true by investing
                            for them, <p className = "mx-5" > create your goals here </p>  </h6> 
                        </div>
                        </div>
                    )
                } else {return (
                span.map(goal => ( <
                    div className = "py-2 px-3 bg-white rounded-4 mt-2"
                    key = { goal.goal_id } > <
                    div className = "d-flex flex-row" > <
                    span className = "mt-2" > <
                    AddUser className = "p-2 bg-lighter rounded"
                    size = "large" / > < /span>  <
                    h6 className = "mx-4 mt-2 hover-goal-name" onClick = {
                        () => getId(goal.goal_id, goal.goal_name, goal.goal_amount, goal.deposit[0],goal.deposit[1], goal.created, goal.goal_status, goal.goal_picture)
                    }> < span className="bolder"> {
                        (goal.goal_name)
                    } < /span><br/ > < p className="small"> created {
                        (goal.created).slice(0, 10)
                    } < /p >  < /
                    h6 > < /
                    div ><div className = "goal-image" onClick={() => onlyId(goal.goal_id)}>
                    <img src = {goal.goal_picture} width="100%" height="100%" className = "object-fit-cover rounded-4" alt = "goal" /> </div> 
                    <
                    p className="small mt-2 mb-0"><span>Progress: {
                        progress = (100 - ((goal.goal_amount - goal.deposit[0]) / goal.goal_amount * 100)).toFixed(2)
                    } %</span>
                    <
                    span >
                    <
                    ProgressBar now = { progress }
                    className="progress-sm"
                    variant = "#ff8800" /
                    >
                    <
                    /span> < /
                    p >  <
                    span className = "mx-2 small" >Deposit: <span className='font-light'>{ (goal.deposit[0]).toLocaleString() }</span> < /span > <span>|</span> <
                    span className = "mx-2 small" >Goal: <span className='font-light'>{ (goal.goal_amount).toLocaleString() }</span> < /span > < /
                    div >
                )))}
            
            }
            const myRecentActivity = () => {
                if (deposits.length === 0) {
                    return ( < div className = 'p-5 rounded-4 bg-lighterer text-center grey-text' > < div className = 'd-flex flex-row justify-content-center' > <
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
                            div className = "row mt-2 p-3 bg-whiter rounded-3"
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
                    div className = "row rounded-4 mt-4 mx-3" ><
                    div className = "col-8" > 
                     <
                    div className = "row justify-content-center rounded-4 mx-1" >
                    <
                    h6 className="text-end p-4"> < span className = "mx-3 p-2 py-1 bg-lighter rounded" > { results.length } < /span> PORTFOLIO < /h6> 
                    <
                    div className = "col-5 text-center" > 
                    <
                    Chart options = { options.optionsDonut }
                    series = { options.seriesDonut }
                    height = { 300 }
                    width = { 200 }
                    type = "donut" /
                    >
                    <
                    /div > <
                    div className = "col-7 px-2 text-center scroll-y5" > {
                    myInvestments()
                } < /
                div >
                <Modal show = { show }
                onHide = { handleClose } {...props } > 
                <GoalPhoto goal_id={holdId} / >  </Modal >
                    
                    <div className = "row my-3 p-2 light-res-home rounded-4" >
                    <div className="col rounded-4 ">
                    <h6 className = "mt-3 bolder" > < span className = " px-2 py-1 d-none bg-lighter rounded mx-2" > { pendingWithdraw.length } < /span> Pending Withdraw Requests < /h6>
                    <h6 className="small lh-1">After requesting withdraw, your withdraw status becomes pending till approved by your fund manager</h6>
                    </div>
                    <div className="col-4 p-2 text-end"><h6 className="btn btn-warning rounded-2" onClick={() => {getPendingWithdraws()}}>View pending withdraws</h6></div>
                    <div className="scroll-y3 investments d-none rounded-3"> {pendingWithdraws()}</div>
                    <span className="d-none">{myRecentActivity()}</span> </div> 
                    </div>
                    </div> 
                
                <div className = "col-4 bg-light rounded-4 pt-3" >  
                <div className = "row" >
                <div className = "col-7" > 
                <h6 className = " btn btn-warning rounded-2 px-3"
                onClick = { handleShow1 } >
                    Add New Goal </h6></div>
                <div className = "text-end col-5 p-2 px-3" > 
                <h6><span className = "px-2 mx-2 py-1 rounded bg-lighter" > { span.length } </span> GOALS 
                </h6> </div> </div> 
                <div className = " pb-5 px-1 mt-2 scroll-y2 rounded-4" > {myGoals()} </div> 
                <Modal show = { show3 }
                onHide = { handleClose3 }
                dialogClassName = "my-modal1" > 
                <Goal id = { holdId }
                name = { holdName }
                fullname = { name }
                amount = { holdAmount }
                deposit = { holdDeposit }
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
                onHide = { handleClose1 } {...props } > 
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