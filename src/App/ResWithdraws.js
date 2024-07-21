import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import './style.scss';
import { PendingWithdrawRequests, UserRequests, MainRequests, InvestmentWithdrawRequests } from '../Api/MainRequests';
import React, { useState, useEffect } from "react";
import { getCurrency } from '../payment/GetCurrency';
import { FaDonate } from 'react-icons/fa';
import ResWithdraw from './ResWithdraw'
import PendingWithdraws from '../Accounts/PendingWithdraws'
import Modal from 'react-bootstrap/Modal';

const ResWithdraws = (props) => {
    const [option_name, setOptionName] = useState("")
    const [groups, setGroups] = useState(0)
    const [investment_id, setInvestmentId] = useState("")
    const [investmentDeposit, setInvestmentDeposit] = useState("");
    const [handler, setHandler] = useState("");
    const [withdrawSetting, setWithdrawSetting] = useState(false);
    const [country, setCountry] = useState([])
    const [graph, setGraph] = useState([])
    const [investmentWithdraw, setInvestmentWithdraw] = useState([])
    const [withdraws, setWithdraw] = useState([])
    const [show5, setShow5] = useState(false);
    const handleClose5 = () => setShow5(false);
    const handleShow5 = () => setShow5(true);
        useEffect(() => {
            PendingWithdrawRequests().then(res => {
                setWithdraw(res)
            })
            UserRequests().then(res => {
                setCountry(res.profile.country)
            });
            MainRequests().then(res => {
                setGraph(res[4]);
            })
            InvestmentWithdrawRequests().then(res => {
                setInvestmentWithdraw(res)
            });
        }, []);
        function summ(array) {
            let sum = 0
            array.forEach(item => {
                sum = sum + item
            });
            return sum
        }
        function getWithdraws(name,networth,investment_id, deposit, handler){
            setOptionName(name)
            setGroups(networth)
            setInvestmentId(investment_id)
            setInvestmentDeposit(deposit)
            setHandler(handler)
            setWithdrawSetting(true)
        }
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
        const groupArrayObjects = graph.reduce((group, obj) => {
            let sum = 0
            const { name, datas, networths, id, handler } = obj;
            if (!group[name]) {
                group[name] = {
                    name: name,
                    data: [],
                    networth: [],
                    investment_id: id,
                    handler: handler,
                    total: sum
                };
            }
            group[name].data.push(datas);
            group[name].networth.push(networths)
            return group;
        }, {});
        const results = Object.values(groupArrayObjects);
        results.forEach(data => {
            data.total = data.networth.reduce((total, value) => total + parseInt(value), 0);
        });
        function subtractTwoLists(listA, listB) {
            const mapA = new Map(listA.map(item => [item.name, { total: parseInt(item.total), data: item.data, investment_id: item.investment_id, handler: item.handler }])); // convert listA to map as { 'a' => { value: 2000, data: 'first' } }
          //console.log(mapA)
            // Subtract values from List B from List A
            listB.forEach(itemB => {
              const nameInB = itemB.name; //get name in B
              const valueInB = parseInt(itemB.total);//get value in B and parse to Int
              if (mapA.has(nameInB)) {
                  
                  const oldValue = mapA.get(nameInB).total;
                  mapA.set(nameInB, { total: oldValue - valueInB, data: mapA.get(nameInB).data, investment_id: mapA.get(nameInB).investment_id, handler: mapA.get(nameInB).handler });
                 //Updates the value associated with the "name" attribute in List A to the result of the subtraction
              }
            });
           const resultList = Array.from(mapA, ([name, { total, data, investment_id, handler }]) => ({ name, total, data, investment_id, handler }));
            return resultList;  // convert map to list, i.e { 'a' => { value: 2000, data: 'first' } } to [ { name: 'a', value: 1200 }]
        }
        let final_data = subtractTwoLists(results, result)
        if (withdrawSetting) {
            return ( < ResWithdraw changeWithdrawSetting = { setWithdrawSetting }
                option_name = {option_name}
                networth = { groups }
                deposit = {investmentDeposit}
                handler = {handler}
                investmentId = {investment_id}
                / >
            )
        }
        const pendingWithdraws = () => {
            // if (withdraws.length === 0) {
                if(final_data.length !== 0){
                return ( 
                    <div className="scroll-y pb-5 rounded-4 px-3">
                    {
                        final_data.map((option, id) => (
                        <div className={"Venture p-3 mt-1 row rounded-4"} key={id} onClick={() => getWithdraws(option.name,option.total,option.investment_id, summ(option.data), option.handler)}>
                            <div className=''><h5 className='bolder pb-1'>{option.name}<h6>{option.handler}</h6></h5> </div>
                                    <div className = "row" >
                                    <div className='col text-start pt-4 px-0'>
                                    <span className="light-res-home p-2 rounded-3"><FaDonate/></span>
                                    </div>
                                    <div className='col text-end px-0'> 
                                    <h6 className='m-0'>Deposit:
                                    <div className = "d-flex flex-row flex m-0 justify-content-end" >
                                    <span className='bolder'> { getCurrency(country) } </span>  
                                    <h4 className = "bolder text-white" > {
                                ((summ(option.data)) * 1000).toLocaleString()
                            } </h4></div ></h6></div><div className='text-end p-0'><h6 className='m-0'>Networth:
                            <div className = "d-flex flex-row flex m-0 justify-content-end" ><span className='bolder'> { getCurrency(country) } </span>  
                            <h4 className = "px-1 bolder text-white m-0" > {
                                option.total.toLocaleString()
                            } </h4></div ></h6></div> 
                            </div>
                        </div>
                        ))
                    }
                    </div>
                 )}
                // else {
                //     return(
                //         <div>
                //         <div className="p-2 m-2 rounded-4 bg-white">
                //         <img src={RiskProfile} alt="invest today" width="100%" height="100%"/>
                //         </div>
                //         <div className="p-5 text-center rounded-4 bg-white mt-2">
                //         <h6 className='bolder'>Pending Withdraws</h6>
                //         <h6>All your pending withdraws will appear here but first...</h6>
                //         <h6 className='bolder mt-3'>Make Deposit</h6>
                //         <h6>Make your first deposit today and kickstart your investment journey. Get started with your risk Profile and let us know how best we can invest your deposit.</h6>
                //         <div className="d-flex">
                //             <h6 className="bk-warning rounded-3" onClick={props.handletab5}>Deposit</h6>
                //             <h6 className="bk-warning rounded-3" onClick={props.handletab5}>Complete Risk Profile</h6>
                //         </div>
                //         </div>
                //         </div>
                //     )
                // }
            // }
            // else {
            //     return (
            //         withdraws.map(withdraw => ( 
            //             <div className = 'row p-2 mx-2 mt-1 bg-white rounded-3'>
            //             <div className = 'col-4 text-start' > <h6 className='bolder'><span className='font-light'>{ withdraw.currency }</span>  { (withdraw.withdraw_amount).toLocaleString() } </h6> </div> 
            //             <div className = 'col-6 text-start' > <h6 className=""><span className="text-dark bolder">{withdraw.investment_option} </span> {withdraw.handler}</h6> </div> 
            //             <div className = 'col-2 text-end bolder' > <h6> { withdraw.created } </h6></div> 
            //             </div>
            //         ))
            //     )
            // }
            }
            function getPendingWithdraws(){
                handleShow5()
            }
            return ( 
                <div className='bg-lighter p-1'>
                <div className='row rounded-3 m-0 py-2'>
                <div className='col-5'><h4 className='mt-2'>Withdraw</h4></div>
                <div className='col-7'>
                <h6 className='bk-warning2 m-0 rounded-3 px-4' onClick={() => {getPendingWithdraws()}}>Pending Withdraws: {withdraws.length} </h6></div></div> 
                <div className=" p-1 mt-1">{ pendingWithdraws() }</div>  
                <Modal show = { show5 }
                onHide = { handleClose5 }
                dialogClassName = "">
                    <PendingWithdraws pendingWith = { withdraws}/>
                </Modal>
                </div>
            );
        };
        export default ResWithdraws;