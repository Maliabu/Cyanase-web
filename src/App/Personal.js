import { PersonalRequests, MainRequests, UserRequests, GetRiskProfile, UserVerificationRequests, PendingWithdrawRequests, InvestmentWithdrawRequests, UserBanks } from "../Api/MainRequests";
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
// import ProgressBar from '@ramonak/react-progress-bar';
import ProgressBar from 'react-bootstrap/ProgressBar';

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
        const [holdName, setHoldName] = useState("");
        const [holdNetworth, setHoldNetworth] = useState("");
        const [holdAmount, setHoldAmount] = useState("");
        let [holdDeposit, setHoldDeposit] = useState("");
        const [groups, setGroups] = useState(0)
        const [banks, setBanks] = useState("")
        const [pendingWithdraw, setPendingWithdraw] = useState([])
        const [investmentWithdraw, setInvestmentWithdraw] = useState([])
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
            const { name, datas, networths, id } = obj;
            if (!group[name]) {
                group[name] = {
                    name: name,
                    data: [],
                    networth: [],
                    investment_id: id,
                    total: sum
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
                    total: sum
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
                colors: ['#E91E63', '#252859', '#FF9800', '#b7b7b7'],
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
        function getId(id, name, amount, deposit, networth, created, status) {
            setHoldId(id)
            setHoldName(name)
            setHoldAmount(amount)
            setHoldDeposit(deposit)
            setHoldCreated(created)
            setHoldNetworth(networth)
            setGoalStatus(status)
            handleShow3()
        }
        // let list1 = [{"name":"a", "total":3000, "data": [1,2]},{"name":"b", "total":1500, "data": [2,3,5]},{"name":"c", "total":5600, "data":[]}]
        // let list2 = [{"name":"a", "total":500},{"name":"b", "total":300}]
        function subtractTwoLists(listA, listB) {
            const mapA = new Map(listA.map(item => [item.name, { total: parseInt(item.total), data: item.data, investment_id: item.investment_id }])); // convert listA to map as { 'a' => { value: 2000, data: 'first' } }
          //console.log(mapA)
            // Subtract values from List B from List A
            listB.forEach(itemB => {
              const nameInB = itemB.name; //get name in B
              const valueInB = parseInt(itemB.total);//get value in B and parse to Int
              if (mapA.has(nameInB)) {
                  
                  const oldValue = mapA.get(nameInB).total;
                  mapA.set(nameInB, { total: oldValue - valueInB, data: mapA.get(nameInB).data, investment_id: mapA.get(nameInB).investment_id });
                 //Updates the value associated with the "name" attribute in List A to the result of the subtraction
              }
            });
           const resultList = Array.from(mapA, ([name, { total, data, investment_id }]) => ({ name, total, data, investment_id }));
            return resultList;  // convert map to list, i.e { 'a' => { value: 2000, data: 'first' } } to [ { name: 'a', value: 1200 }]
        }
        let final_data = subtractTwoLists(results, result)
        function getWithdraws(name,networth,investment_id){
            setOptionName(name)
            setGroups(networth)
            setInvestmentId(investment_id)
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
                    nextResult.map(option => ( <
                        div className = "row mt-2 p-3 bg-white rounded-3" >
                        <
                        div className = "col-5" > < h6 className = "bolder" > { option.name } < /h6>
                        <span className="bk-warning p-2 rounded-3 px-3" onClick={() => getWithdraws(option.name,option.total,option.investment_id)}>Withdraw</span> < /
                        div >
                        <
                        div className = "col-3" > < h6 className = "bolder" ><span className="small font-light">Networth:</span> { getCurrency(country) } {
                            option.total
                        } < /h6> < /div > <
                        div className = "col-4" > < h6 className = "bolder" ><span className="small font-light">Total Deposit:</span> { getCurrency(country) } {
                            (((summ(option.data)) * 1000).toFixed(2)).toLocaleString()
                        } < /h6> < /div > < /
                        div > ))
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
                        pendingWithdraw.map(withdraw => ( <div className=""><
                            div className = 'row p-2 mx-2 mt-2 bg-white rounded-2' >
                            <
                            div className = 'col-4 text-start' >< h6 className="bolder"><span className="small"> { withdraw.currency }</span> { withdraw.withdraw_amount } < /h6> < /div ><div className="col-5 text-center">
                                <h6 className="grey-text"><span className="text-dark bolder">{withdraw.investment_option} </span><span className="small text-dark d-none">{withdraw.status}</span></h6>
                            </div> <
                            div className = 'col-3 text-end bolder' > < h6 > { withdraw.created } < /h6>< /div > < /
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
                    h6 className = "py-2" > MY INVESTMENTS < span className = "mx-3 px-2 py-1 status rounded-4" > { results.length } < /span>  < /h6>  <
                    div className = "row justify-content-center rounded-4 p-2" >
                     
                    <
                    div className = "col-4 text-center" > <
                    Chart options = { options.optionsDonut }
                    series = { options.seriesDonut }
                    height = { 300 }
                    width = { 200 }
                    type = "donut" /
                    >
                    <
                    /div > <
                    div className = "col-8 text-center scroll-y3 bg-light px-3 rounded-3" > {
                    myInvestments()
                } < /
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
                    h6 className = "py-2 mt-2" > RPENDING WITHDRAWS < span className = "mx-3 px-2 py-1 status rounded-4" > { pendingWithdraw.length } < /span>  < /h6><div className="scroll-y3 bg-light rounded-4"> {pendingWithdraws()}</div>
                    <span className="d-none">{myRecentActivity()}</span> < /div > < /
                div >
                    <
                    /
                div > <
                    div className = "col-4 px-3 bg-light rounded-3" >  <
                    div className = "row p-1 rounded-3 bg-white my-1" >
                    <
                    div className = "text-start col-9 p-2" > < h6 > YOUR PERSONAL GOALS < /h6> < /div > <
                    div className = "text-end col-3 p-2" > < span className = "px-2 py-1 status rounded-4" > { span.length } < /span> < /div > < /
                div > <
                div className = " bk-warning text-center rounded-3 p-2 px-3"
            onClick = { handleShow1 } >
                Add New Goal < /div> <
                div className = " pb-5 px-1 scroll-y rounded-4" > {
                    span.map(goal => ( <
                        div className = "py-2 px-3 bg-white res-home rounded-4 mt-2"
                        key = { goal.goal_id } > <
                        div className = "d-flex flex-row" > <
                        span className = "mt-2" > <
                        AddUser className = "p-2 border rounded-circle"
                        size = "large" / > < /span>  <
                        h6 className = "mx-4 mt-2" > < span className = "active py-2 rounded bolder"
                        onClick = {
                            () => getId(goal.goal_id, goal.goal_name, goal.goal_amount, goal.deposit[0],goal.deposit[1], goal.created, goal.goal_status)
                        } > {
                            (goal.goal_name)
                        } < /span><br/ > < p> created {
                            (goal.created).slice(0, 10)
                        } < /p >  < /
                        h6 > < /
                        div >
                        <
                        p className="small"> Progress: {
                            progress = (100 - ((goal.goal_amount - goal.deposit[0]) / goal.goal_amount * 100)).toFixed(2)
                        } %
                        <
                        span >
                        <
                        ProgressBar now = { progress }
                        className="progress-sm"
                        variant = "#ff8b10" /
                        >
                        <
                        /span> < /
                        p > <
                        span className = "bolder d-none" > { (goal.deposit[0]).toLocaleString() } < /span > <
                        span className = "active d-none" > { (goal.goal_amount).toLocaleString() } < /span > < /
                        div >
                    ))
                } <
                    /div> <
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
                banks = {banks}
                status = { goalStatus }
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
                investmentId = {investment_id}
                verification = {verification}
                banks = {banks}
                currency = {getCurrency(country)}
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
                complete = {complete}
                verification = {verification}
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