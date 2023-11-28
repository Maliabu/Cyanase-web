import { MainRequests, PersonalRequests, UserRequests, WithdrawRequests } from '../Api/MainRequests';
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
    const [option_name, setOptionName] = useState("")
    const [groups, setGroups] = useState(0)
    const groupArrayObject = graph.reduce((group, obj) => {
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
    const result = Object.values(groupArrayObject);
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
            colors: [  '#b7b7b7', '#FF9800', '#252859','#E91E63'],
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
        series: result,
        stroke: {
            curve: 'smooth',
        }
    }
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
            setTotalWithdraw(res[1])
        })
    }, []);
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
            / >
        )
    }
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
    function getNetworths(arr){
        let sum = 0
        for(var i=0;i<arr.length;i++){
            sum += parseInt(arr[i])
        }
        return sum
    }
    function getWithdraws(name,networth){
        setOptionName(name)
        setGroups(networth)
        setWithdrawSetting(true)
    }
    const myInvestments = () => {
        if (result.length === 0) {
            return(null
                // <div className='p-2'>
                //     <img src={CLASSES} alt='classes' width="100%"/>
                // </div>
            )
        } else{
            return(
                <div className='p-3 mt-2 investment rounded-4 carousel slide'>
                <Carousel touch={true} interval={null} controls={false}>
                    {
                        result.map(option=>(
                            <Carousel.Item key={1}>
                                <div className='row text-dark p-2'>
                                    <div className='col-5'><h5 className='bolder'>{option.name}</h5><span className="bk-warning p-2 rounded-3 px-2" onClick={() => getWithdraws(option.name,getNetworths(option.networth))}>Withdraw</span> </div>
                                    <
                            div className = "col-1" > < h6 className = "bolder" ><
            div className = "d-flex flex-row flex justify-content-center mt-3" >< h6 className='bolder'> <Star size="small" set='bulk' className="active" /> < /h6>  <
            h6 className = "px-1 font-weight-light" > {
                                (option.networth).length
                            } < /h6></div > < /h6> < /div > <
                            div className = "col-6 text-end investments px-3 pt-3 rounded-4" ><h6 className='bolder'>Deposit:<
            div className = "d-flex flex-row flex justify-content-end m-0" >< p className='bolder'> { getCurrency(country) } < /p>  <
            h4 className = "px-1 font-weight-light" > {
                                ((summ(option.data)) * 1000).toLocaleString()
                            } < /h4></div ></h6> < /div >
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
        if (result.length === 0) {
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
                <div className='p-2'>
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
        return ( < div className = 'p-1 bg-lighter res-home' > < div className = "bg-white text-dark px-2 py-1 rounded-4" >
            <
            div className = 'd-flex mt-2' >
            <
            div className = 'rounded-4 bg-lighter wider' >
            <
            p className = "text-end mx-4 mt-2" > welcome back < span className = 'bolder grey-text' > { props.name } < /span> <
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
            div className = 'row' > <
            div className = 'col text-start' > <
            p className = ' mx-3 mt-3' > Your Investments - {result.length} < /p > < /div > <
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
            div > < /div >  <
            div className = 'blue-darks d-flex py-2 rounded-4' >
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
            Deposit < /h6> </span > < /
            div >

            <
            div className = '' > {myInvestmentsGraph()}</div > <
            div className = 'blue-darks text-center rounded-4 py-3' >
            <
            span className = ' rounded-4 text-center bolder' > Total Networth <
            div className = "d-flex flex-row flex justify-content-center" > < p className = 'active' > { getCurrency(country) } < /p> <
            h2 className = "px-1 font-lighter" > { networthy().toLocaleString() } < /h2></div > < /span>  < /
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
            div className = 'rounded-4 bg-lighter wider' >
            <
            h6 className = "mx-4 mt-2" > Tips: <
            p className='bolder' > Dont save your money, invest < /p></h6>< /
            div > < /
            div >
            <
            /
            div >
            <
            div className = 'bg-light my-5 shadow rounded-4 mt-2 p-2 ' >
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
        div className = 'd-flex flex-row text-dark rounded-top-4 d-block justify-content-center bg-lighter bottom-nav' >
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
        /><h6 className='bg-lighter pt-1 '>Home</h6>< /div > <
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
        /> <h6 className='bg-lighter pt-1 grey-text'>Goals</h6> < /
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
        setActiveTab1 = { setActiveTab1 } /><h6 className='bg-lighter grey-text pt-1'>Deposit</h6> < /
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
        setActiveTab1 = { setActiveTab1 } /><h6 className='bg-lighter grey-text pt-1'>Withdraws</h6> < /
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
        /> <h6 className='bg-lighter pt-1 grey-text'>Settings</h6> < /
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