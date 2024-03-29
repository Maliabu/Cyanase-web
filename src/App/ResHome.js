import { MainRequests, PersonalRequests, UserRequests, WithdrawRequests, InvestmentWithdrawRequests } from '../Api/MainRequests';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Carousel } from 'react-bootstrap';
import '../App.css';
import React, { useState, useEffect } from "react";
import Deposit from "./Deposit";
import Sacco from './Sacco';
import Club from './Club';
import ResWithdraw from './ResWithdraw'
import ResSettings from './ResSettings';
import RiskProfile from './RiskProfile';
import Api from '../Accounts/primaryUser';
import TabContent from "../Accounts/TabContent";
import ContactUs from '../Accounts/ContactUs';
import FAQs from '../Accounts/FAQs';
import Chart from 'react-apexcharts';
import Saccos from '../Accounts/Saccos';
import Clubs from '../Accounts/Clubs';
import Ad from '../images/Group 212.png';
import ResWithdraws from './ResWithdraws'
import ResGoals from './ResGoals'
import { getCurrency } from '../payment/GetCurrency';
import { FaLightbulb} from 'react-icons/fa';
import { Home, Wallet, Setting, TimeCircle, Download, Star, AddUser } from 'react-iconly';

const ResHome = (props) => {
    const [activeTab, setActiveTab1] = useState("tab1");
    const [goalSetting, setGoalSetting] = useState(false);
    const [withdrawSetting, setWithdrawSetting] = useState(false);
    const [span, setSpan] = useState([])
    const [deposit, setDeposit] = useState(0);
    const [graph, setGraph] = useState([])
    const [country, setCountry] = useState([])
    const [dates, setDates] = useState([])
    const [totalWithdraw, setTotalWithdraw] = useState([])
    const [networth, setDepositNetworth] = useState(0);
    let thisYear = new Date().getFullYear()
    const [investmentWithdraw, setInvestmentWithdraw] = useState([])
    const [option_name, setOptionName] = useState("")
    const [groups, setGroups] = useState(0)
    const [investment_id, setInvestmentId] = useState("")
    const [withdraws, setWithdraw] = useState([])
    useEffect(() => {
        PersonalRequests().then(res => {
            setSpan(res[2]); // array(14)
        });
        MainRequests().then(res => {
            setDeposit(res[0]);
            setGraph(res[4]);
            setDates(res[5])
            setDepositNetworth(res[9]);
        })
        UserRequests().then(res => {
            setCountry(res.profile.country)
        });
        WithdrawRequests().then(res => {
            setWithdraw(res[0])
            setTotalWithdraw(res[1])
        })
        InvestmentWithdrawRequests().then(res => {
            setInvestmentWithdraw(res)
        });
    }, []);
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
    const options = {
        options: {
            chart: {
                type: "area",
                stacked: false,
                height: 350,
                zoom: {
                    type: "x",
                    enabled: true,
                    autoScaleYaxis: true
                },
                toolbar: {
                    autoSelected: "zoom"
                }
            },
            dataLabels: {
                enabled: false
            },
            markers: {
                size: 0
            },
            xaxis: {
                title: {
                    text: 'Investments for ' + thisYear
                },
                labels: {
                    show: false,
                },
                categories: dates,
                // categories: ['jun', 'jul', 'aug'],
            },
            yaxis: {
                show: false,
                title: {
                    text: 'In Thousands(000) of ' + getCurrency(country)
                }
            },
            colors: [  '#E91E63', '#FF9800', '#252859', '#b7b7b7'],
            fill: {
                type: "gradient",
                gradient: {
                    shadeIntensity: 1,
                    inverseColors: false,
                    opacityFrom: 0.5,
                    opacityTo: 0,
                    stops: [0, 90, 100]
                }
            },
        },
        // series: result,
        series: results,
        stroke: {
            curve: 'smooth',
        }
    }
    let depositTotal = 0
    span.map(goal => (
            depositTotal += parseInt(goal.deposit[0])
        ))
        //  Functions to handle Tab Switching
    if (goalSetting) {
        return ( < ResGoals changeGoalSetting = { setGoalSetting }
            / >
        )
    }
    if (withdrawSetting) {
        return ( < ResWithdraw changeWithdrawSetting = { setWithdrawSetting }
            option_name = {option_name}
            networth = { groups }
            investmentId = {investment_id}
            / >
        )
    }
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
    const handleTab1 = () => {
        // update the state to tab1
        setActiveTab1("tab1");
    };
    const handleTab2 = () => {
        // update the state to tab2
        setActiveTab1("tab2");
    };
    const handleTab3 = () => {
        // update the state to tab2
        setActiveTab1("tab3");
    };
    const handleTab5 = () => {
        // update the state to tab2
        setActiveTab1("tab5");
    };
    const handleTab8 = () => {
        // update the state to tab2
        setActiveTab1("tab8");
    };
    const handleTab12 = () => {
        // update the state to tab2
        setActiveTab1("tab12");
    };
    const handleTab13 = () => {
        // update the state to tab2
        setActiveTab1("tab13");
    };
    function getWithdraws(name,networth,investment_id){
        setOptionName(name)
        setGroups(networth)
        setInvestmentId(investment_id)
        setWithdrawSetting(true)
    }
    const myInvestments = () => {
        if (results.length === 0) {
            return(null
                // <div className='p-2'>
                //     <img src={CLASSES} alt='classes' width="100%"/>
                // </div>
            )
        } else{
            return(
                <div className='p-3 mt-2 investment rounded-4 shadow-sm carousel slide'>
                <Carousel touch={true} interval={null} controls={false}>
                    {
                        final_data.map(option=>(
                            <Carousel.Item >
                                <div className='row text-dark'>
                                    <div className='col-4'><h5 className='bolder pb-1'>{option.name}</h5><span className="bk-warning2 p-2 rounded-3 px-2" onClick={() => getWithdraws(option.name,option.total,option.investment_id)}>Withdraw</span> </div>
                                    <div className='col-4 pt-2 text-center'><h5 className='m-0'><Star size={16} set="bulk" className="active m-0"/>{(option.data).length}</h5><h6>{option.handler}</h6></div>
                                    <
                            div className = "col-4 text-end" ><div className='row'> <h6 className='m-0'>Total Deposit:<
            div className = "d-flex flex-row flex m-0 justify-content-end" >< span className='bolder'> { getCurrency(country) } < /span>  <
            h4 className = "px-1 font-weight-light" > {
                                ((summ(option.data)) * 1000).toLocaleString()
                            } < /h4></div ></h6></div><div className='row'><h6 className='m-0'>Networth:<
            div className = "d-flex flex-row flex m-0 justify-content-end" >< span className='bolder'> { getCurrency(country) } < /span>  <
            h4 className = "px-1 font-weight-light m-0" > {
                                option.total.toLocaleString()
                            } < /h4></div ></h6></div> < /div >
                                </div>
                            </Carousel.Item>
                        ))
                    }
                </Carousel></div>

            )
        }
    }
    const networthy = () => {
        let totalNetworth = 0
        totalNetworth = networth - totalWithdraw
        return totalNetworth
    }
    const myInvestmentsGraph = () => {
        if (results.length === 0) {
            return(
                <div className='p-2 px-3'>
                <div className='p-2 bg-lighter rounded-4 row justify-content-center'>
                    <div className='col-4 p-2'>
                        <h6 className='bolder'>Top Investment classes Performance Rates</h6>
                    </div>
                    <div className='col-8 text-center'>
                        <div className='row border-0 justify-content-center'>
                            <div className='col p-2 rounded-4 bg-lighter'>
                            <
            div className = "d-flex flex-row flex justify-content-center" > <Star size="small" set='bulk' className="active"/> <h6>Treasury Bills</h6></div >
                            
                            <
            div className = "d-flex flex-row flex justify-content-center" >  <
            h2 className = "px-1" > 12 < /h2>< p> % < /p></div >
                            </div>
                            <div className='col p-2 rounded-4 bg-light'>
                            <
            div className = "d-flex flex-row flex justify-content-center" > <Star size="small" className="active" set="bulk"/> <h6>Unit Trusts</h6></div >
                            
                            <
            div className = "d-flex flex-row flex justify-content-center" >  <
            h2 className = "px-1" > 10 < /h2>< p> % < /p></div >
                            </div>
                        </div>
                    </div>
                </div></div>
            )
        } else{
            return(
                <div className='py-2'>
                    <
            div className = '' > <
            Chart options = { options.options }
            series = { options.series }
            className = "w-100"
            type = "area"
            height = { 150 }
            /></div >
                </div>
            )
        }
    }
    function summ(array) {
        let sum = 0
        array.forEach(item => {
            sum = sum + item
        });
        return sum
    }
    const Main = () => {
        return ( < div className = 'p-1 bg-lighter mobile' > < div className = "bg-white text-dark px-2 py-1 rounded-4" >
            <
            div className = 'd-flex mt-2' >
            <
            div className = 'rounded-4 blue-darks wider' >
            <
            p className = "text-end mx-4 mt-2" > welcome < span className = 'bolder grey-text' > { props.name } < /span> <
            span className = " justify-content-center" > <
            span className = "px-1" > pick up where you left off < /span></span > < /p>< /
            div > <
            // img src = "http://127.0.0.1:8000/static/photo.png"
            img src = {props.profile}
            className = "rounded-circle object-fit-cover mx-2 mt-2 img-head"
            alt = "investors" / > < /
            div >
            <div>{myInvestments()}</div>
            <
            div className = 'row mt-2' > <
            div className = 'col text-start' > <
            p className = ' mx-3 mt-3 bolder d-none' > Your Investments < /p > < /div > <
            div className = 'col d-none' >
            <
            div className = 'd-flex justify-content-end mx-1' > < TimeCircle size = "medium"
            set = 'broken'
            onClick = {
                () => { setGoalSetting(true) }
            }
            className = ' mx-2 icon-padding rounded-circle active warning light-res-home ' / > < h6 className = 'mt-2 d-none rounded-3 p-3 px-5 bk-warning '
            onClick = {
                () => { setGoalSetting(true) }
            } >
            Goals < /h6> < /
            div > < /
            div > < /div > <div className='blue-darks rounded-4'> <
            div className = 'd-flex py-2' >
            <
            span className = 'text-center rounded-4 wide-60' > <
            span className = "bolder" > 
            <
            br / > Total Deposit <
            div className = "d-flex flex-row flex justify-content-center" > < p className = 'active' > { getCurrency(country) } < /p> < h2 className = "px-1 font-lighter" > { deposit.toLocaleString() }  < /
            h2 > < /div > < /span > < /span > < span className = 'py-4' > < h6 className = ' rounded-3 text-center px-3 warning-home'
            onClick = {
                handleTab5
            } >
            Deposit < /h6> </span ></div><div className="d-felx flex-row justify-content-center p-2 light-res-home"><span className="mx-2">deposits: <Star size={10} set="bulk" className="active"/>{graph.length}</span> | <span className='mx-2'>Your Investment classes: {results.length}</span> </div> < /
            div >

            <
            div className = '' > {myInvestmentsGraph()}</div > <
            div className = 'blue-darks text-center rounded-4 pt-3' >
            <
            span className = ' rounded-4 text-center bolder' > Total Networth <
            div className = "d-flex flex-row flex justify-content-center" > < p className = 'active' > { getCurrency(country) } < /p> <
            h2 className = "px-1 font-lighter" > { networthy().toLocaleString() } < /h2></div > < /span> 
            <div className="d-felx flex-row text-start p-2 light-res-home"><span className='mx-2'>Withdraws: <Star size={10} set="bulk" className="active"/>{wwithdraws()}</span> | <span className='mx-2'>Total Withdraw: { getCurrency(country) } {(totalWithdraw).toLocaleString()}</span> </div> < /
            div >
            <
            div className = '' > <
            Chart options = { options.options }
            series = { options.series }
            className = "w-100 d-none"
            type = "area"
            height = { 400 }
            /></div > 
            <
            div className = 'd-flex mt-2' > < FaLightbulb size = "20"
            className = 'mt-2 mx-2 active' / >
            <
            div className = 'rounded-4 investment wider' >
            <
            h6 className = "mx-4 mt-2" > Tips: <
            p className='bolder' > Dont save your money, invest < /p></h6>< /
            div > < /
            div >
            <
            /
            div >
            <
            div className = 'bg-white my-5 rounded-4 mt-2 p-2 ' >
            <
            img src = { Ad }
            className = "rounded-4 text-center"
            width = '100%'
            height = '50%'
            alt = "investors" / > < /div> < /
            div >
        )
    }
    return ( <
        div >

        <
        div className = 'd-flex flex-row text-dark rounded-top-4 d-block justify-content-center bg-white shadow bottom-nav' >
        <
        div className = ' text-center grey-text' > <
        TabNavItem title = { < span > < Home size = "18"
            set = 'broken'
            className = 'mt-2' /
            >
            <
            /span >
        }
        onClick = { handleTab1 }
        id = "tab1"
        className = ""
        activeTab = { activeTab }
        setActiveTab1 = { setActiveTab1 }
        /><h6 className='pt-1 '>Home</h6>< /div > <
        div className = 'text-center mx-4 grey-text' >
        <
        TabNavItem title = { < span > < AddUser size = "24"
            set = 'broken'
            className = 'mt-2' / > < /span>
        }
        onClick = { handleTab3 }
        id = "tab7"
        activeTab = { activeTab }
        setActiveTab1 = { setActiveTab1 }
        /> <h6 className='pt-1 grey-text'>Goals</h6> < /
        div > <
        div className = 'text-center grey-text' >
        <
        TabNavItem title = { < span > < Wallet size = "20"
            set = 'broken'
            className = 'mt-2' / > < /span>
        }
        onClick = { handleTab5 }
        id = "tab5"
        activeTab = { activeTab }
        setActiveTab1 = { setActiveTab1 } /><h6 className='grey-text pt-1'>Deposit</h6> < /
        div > <
        div className = 'text-center mx-4 grey-text' >
        <
        TabNavItem title = { < span > < Download size = "20"
            set = 'broken'
            className = 'mt-2' / > < /span>
        }
        onClick = { handleTab2 }
        id = "tab2"
        activeTab = { activeTab }
        setActiveTab1 = { setActiveTab1 } /><h6 className='grey-text pt-1'>Withdraws</h6> < /
        div >
        <
        div className = 'text-center grey-text' >
        <
        TabNavItem title = { < span > < Setting size = "20"
            set = 'broken'
            className = 'mt-2' / > < /span>
        }
        onClick = { handleTab8 }
        id = "tab8"
        activeTab = { activeTab }
        setActiveTab1 = { setActiveTab1 }
        /> <h6 className='pt-1 grey-text'>Settings</h6> < /
        div > < /
        div > <
        TabContent id = "tab1"
        activeTab = { activeTab } > < Main parentCallback2 = { handleTab2 }
        / > < /TabContent > <
        TabContent id = "tab2"
        activeTab = { activeTab } > < ResWithdraws / > < /TabContent> <
        TabContent id = "tab3"
        activeTab = { activeTab } > < Sacco parentCallback = { handleTab12 }
        activeTab = { activeTab }
        setActiveTab1 = { setActiveTab1 }
        / > < /TabContent > <
        TabContent id = "tab4"
        activeTab = { activeTab } > < Club parentCallback1 = { handleTab13 }
        / > < /TabContent > <
        TabContent id = "tab5"
        activeTab = { activeTab } > < Deposit handletab1 = { handleTab1 }
        / > < /TabContent > <
        TabContent id = "tab7"
        activeTab = { activeTab } > < ResGoals / > < /TabContent> <
        TabContent id = "tab8"
        activeTab = { activeTab } > < ResSettings handletab2 = {props.handletab2}/ > < /TabContent><
        TabContent id = "tab9"
        activeTab = { activeTab } > < RiskProfile / > < /TabContent> <
        TabContent id = "tab10"
        activeTab = { activeTab } > < FAQs / > < /TabContent><
        TabContent id = "tab11"
        activeTab = { activeTab } > < Api / > < /TabContent><
        TabContent id = "tab12"
        activeTab = { activeTab } > < Saccos / > < /TabContent> <
        TabContent id = "tab13"
        activeTab = { activeTab } > < Clubs / > < /TabContent><
        TabContent id = "tab15"
        activeTab = { activeTab } > < ContactUs / > < /TabContent> < /
        div >
    );
};
const TabNavItem = ({ id, activeTab, title, setActiveTab1 }) => {
    const handleClick = () => {
        setActiveTab1(id);
    };
    return ( < div className = "px-2 tab-nav" >
        <
        span onClick = { handleClick }
        className = { activeTab === id ? "activer" : "" } > { title } < /
        span > < /
        div >
    )
};

export default ResHome;