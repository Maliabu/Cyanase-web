import { MainRequests, PersonalRequests } from '../Api/MainRequests';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import React, { useState, useEffect } from "react";
import Personal from "./Personal";
import Deposit from "./Deposit";
import Sacco from './Sacco';
import Club from './Club';
import ResSettings from './ResSettings';
import RiskProfile from './RiskProfile';
import Api from '../Accounts/primaryUser';
import Notify from '../Accounts/Notify';
import TabContent from "../Accounts/TabContent";
import ContactUs from '../Accounts/ContactUs';
import FAQs from '../Accounts/FAQs';
import Chart from 'react-apexcharts';
import Saccos from '../Accounts/Saccos';
import Clubs from '../Accounts/Clubs';
import Profile from '../images/Ellipse 6.png';
import Ad from '../images/Group 212.png';
import ResGoals from './ResGoals'
import { FaLightbulb } from 'react-icons/fa';
import { Home, Notification, Wallet, Setting, Work } from 'react-iconly';

const ResHome = (props) => {
    const [activeTab, setActiveTab1] = useState("tab1");
    const [goalSetting, setGoalSetting] = useState(false);
    const [span, setSpan] = useState([])
    const [deposit, setDeposit] = useState(0);
    const [dollar, setDollar] = useState(0);
    const [networth, setDepositNetworth] = useState(0);
    const [dollarNetworth, setDollarNetworth] = useState(0);
    const [options, setOptions] = useState({
        options: {
            chart: {
                id: 'apexchart-example'
            },
            theme: {
                mode: 'light',
                palette: 'palette7',
            },
            xaxis: {
                categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "JUl", "Aug", "Sep", "Oct", "Nov", "Dec"],
            },
            colors: ['#252859', '#E91E63', '#FF9800'],

        },
        series: [{
                name: 'T.bills',
                data: [90, 40, 135, 15],
            },
            {
                name: 'T.bonds',
                data: [30, 40, 75, 50, 49, 60],
            },
            {
                name: 'Stocks',
                data: [10, 4, 35, 5, 125],
            }
        ],
        stroke: {
            curve: 'smooth',
        }
    })
    useEffect(() => {
        PersonalRequests().then(res => {
            setSpan(res[2]); // array(14)
        });
        MainRequests().then(res => {
            setDeposit(res[0]);
            setDollar(res[1]);
            setDepositNetworth(res[2]);
            setDollarNetworth(res[3]);
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
    const Main = () => {
        return ( < div className = 'p-1 bg-light res-home' > < div className = "bg-white p-2 rounded-4" >
            <
            div className = 'd-flex mt-2' >
            <
            div className = 'rounded-4 bg-light wide' >
            <
            p className = "bolder text-end mx-4 mt-2" > welcome back < span className = 'text-warning' > { props.name } < /span> <
            span className = " justify-content-center" > <
            span className = "px-1 font-lighter" > pick up where we left off < /span></span > < /p>< /
            div > <
            img src = { Profile }
            className = "rounded-circle mx-2 mt-3"
            width = '10%'
            height = '10%'
            alt = "investors" / > < /
            div >
            <
            div className = 'row mt-3' > <
            div className = 'col text-start' > <
            p className = ' mx-3 mt-3 bolder' > Statistics < /p > < /div > <
            div className = 'col' >
            <
            div className = 'd-flex justify-content-end mx-1' > < Wallet size = "medium"
            set = 'broken'
            className = ' mx-2 icon-padding d-none rounded-circle active light-res-home ' / > < p className = 'mt-2 icon-padding rounded-3 p-2 active border border-warning '
            onClick = {
                () => { setGoalSetting(true) }
            } >
            Goals < /p> < /
            div > < /
            div > < /div >  <
            div className = 'blue-dark d-flex rounded-4' >
            <
            span className = 'text-center rounded-4 wide-60' > <
            p className = "bolder mt-3" > < Wallet size = "medium"
            className = 'text-warning d-none' /
            >
            <
            br / > Deposit <
            div className = "d-flex flex-row flex justify-content-center" > < p className = 'text-warning' > UGX < /p> < h4 className = "px-1 font-lighter" > { deposit - depositTotal }  < /
            h4 > < /div > < /p > < /span > < span className = 'py-4' > < p className = 'mt-2 icon-padding rounded-3 p-2 active border border-warning '
            onClick = {
                () => { setGoalSetting(true) }
            } >
            Deposit < /p> </span > < /
            div >

            <
            div className = '' > <
            Chart options = { options.options }
            series = { options.series }
            className = "w-100 bg-white rounded-3 mt-2"
            type = "area"
            height = { 300 }
            /></div > <
            div className = 'blue-dark mt-2 d-flex rounded-4' >
            <
            span className = ' rounded-4 wide-60 mx-1' > <
            p className = "bolder mt-3 text-center" > < Work size = "15"
            set = 'broken'
            className = 'text-warning d-none' /
            >
            <
            br / > Networth <
            div className = "d-flex flex-row flex justify-content-center" > < p className = 'text-warning' > UGX < /p> <
            h4 className = "px-1 font-lighter" > { networth } < /h4></div > < /p>  < /span > < span className = 'py-4' > < p className = 'mt-2 icon-padding rounded-3 p-2 active border border-warning '
            onClick = {
                () => { setGoalSetting(true) }
            } >
            Withdraw < /p> </span > < /
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
            p className = 'my-3 d-none bolder mx-2' > Dollar Account < /p> <
            div className = 'd-flex d-none' >
            <
            span className = 'shadow-lg rounded-4 wide-40' > <
            p className = "bolder text-center mt-2" > < Wallet size = "15"
            className = 'text-warning d-none' /
            >
            <
            br / > Deposit <
            div className = "d-flex flex-row flex justify-content-center" > < p className = 'text-warning' > USD < /p> <
            h5 className = "px-1 font-lighter" > { dollar } < /h5></div > < /p> < /span > <
            span className = 'shadow-lg rounded-4 wide-60 mx-1' > <
            p className = "bolder text-center mt-2" > < Work size = "15"
            className = 'text-warning d-none' /
            >
            <
            br / > Networth <
            div className = "d-flex flex-row flex justify-content-center" > < p className = 'text-warning' > USD < /p> <
            h5 className = "px-1 font-lighter" > { dollarNetworth } < /h5></div > < /p>  < /span > < /
            div >
            <
            div className = 'd-flex mt-2' > < FaLightbulb size = "35"
            className = 'mt-3 mx-2 p-2 rounded-circle light-res-home text-warning' / >
            <
            div className = 'rounded-4 bg-light wider' >
            <
            p className = "bolder mx-4 mt-2" > Tips: <
            div className = " justify-content-center" > <
            span className = "px-1 font-lighter" > Dont save your money, invest < /span></div > < /p>< /
            div > < /
            div >
            <
            /
            div >
            <
            p className = 'mx-3 bolder my-3 d-none' > Recent Activity < /p> <
            div className = "row mt-3 d-none px-2 bg-light rounded-3 mx-1 " > <
            div className = "col-8" >
            <
            p className = "pt-3 bolder" > Deposit Amount: < span className = "font-lighter" > UGX 10000 < /span> < div className = "active" > Personal Investment < /div > < /p > < /
            div >
            <
            div className = "col-4 text-end" >
            <
            p className = "pt-3" > < span className = "bolder" > 21 Jan < /span> <
            p > 3: 30 EAT <
            /p>   < /
            p > <
            /div > < /
            div >
            <
            div className = 'bg-warning my-5 shadow rounded-4 mt-2 p-2 ' >
            <
            img src = { Ad }
            className = "rounded-4 text-center"
            width = '100%'
            height = '50%'
            alt = "investors" / > < /div> < /
            div >
        )
    };
    return ( <
        div >

        <
        div className = 'd-flex rounded-4 flex-row w-100 text-dark d-block justify-content-center shadow-sm bg-white bottom-nav' >
        <
        div className = ' py-3 text-center' > <
        TabNavItem title = { < span > < Home size = "20"
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
        />< /div > <
        div className = ' py-3 text-center mx-4' >
        <
        TabNavItem title = { < span > < Wallet size = "20"
            set = 'broken'
            className = 'mt-2' / > < /span>
        }
        onClick = { handleTab5 }
        id = "tab5"
        activeTab = { activeTab }
        setActiveTab1 = { setActiveTab1 } > < /
        TabNavItem > < /
        div > <
        div className = ' py-3 text-center' >
        <
        TabNavItem title = { < span > < Notification size = "20"
            set = 'broken'
            className = 'mt-2' / > < /span>
        }
        onClick = { handleTab3 }
        id = "tab7"
        activeTab = { activeTab }
        setActiveTab1 = { setActiveTab1 }
        />  < /
        div >
        <
        div className = ' py-3 text-center mx-4' >
        <
        TabNavItem title = { < span > < Setting size = "20"
            set = 'broken'
            className = 'mt-2' / > < /span>
        }
        onClick = { handleTab8 }
        id = "tab8"
        activeTab = { activeTab }
        setActiveTab1 = { setActiveTab1 }
        />  < /
        div > < /
        div > <
        TabContent id = "tab1"
        activeTab = { activeTab } > < Main parentCallback2 = { handleTab2 }
        / > < /TabContent > <
        TabContent id = "tab2"
        activeTab = { activeTab } > < Personal / > < /TabContent> <
        TabContent id = "tab3"
        activeTab = { activeTab } > < Sacco parentCallback = { handleTab12 }
        activeTab = { activeTab }
        setActiveTab1 = { setActiveTab1 }
        / > < /TabContent > <
        TabContent id = "tab4"
        activeTab = { activeTab } > < Club parentCallback1 = { handleTab13 }
        / > < /TabContent > <
        TabContent id = "tab5"
        activeTab = { activeTab } > < Deposit handletab5 = { handleTab5 }
        / > < /TabContent > <
        TabContent id = "tab7"
        activeTab = { activeTab } > < Notify / > < /TabContent> <
        TabContent id = "tab8"
        activeTab = { activeTab } > < ResSettings / > < /TabContent><
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
    return ( < div className = "px-3 tab-nav lighter" >
        <
        span onClick = { handleClick }
        className = { activeTab === id ? "activer" : "" } > { title } < /
        span > < /
        div >
    )
};

export default ResHome;