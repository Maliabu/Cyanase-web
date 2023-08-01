import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import { UserRequests, PersonalRequests, SubscriptionRequests } from '../Api/MainRequests';
import React, { useState, useEffect } from "react";
import Personal from "./Personal";
import Deposit from "./Deposit";
import Sacco from './Sacco';
import Club from './Club';
import Settings from './Settings';
import RiskProfile from './RiskProfile';
import Api from '../Accounts/primaryUser';
import Withdraw from './Withdraw';
import TabNavItem from "../Accounts/TabNavItem";
import TabContent from "../Accounts/TabContent";
import Main from './Main';
import ContactUs from '../Accounts/ContactUs';
import FAQs from '../Accounts/FAQs';
import Saccos from '../Accounts/Saccos';
import Clubs from '../Accounts/Clubs';
import Header from '../images/Group 3525.png';
import Profile from '../images/Ellipse 6.png';
import ResHome from './ResHome';
import Loans from './Loans';
import Modal from 'react-bootstrap/Modal';
import Alert from './Alerts'
import Subscribe from '../Accounts/Subscribe'
import Logout from '../Accounts/Logout';
import { FaUniversity, FaHandHoldingUsd, FaDonate, FaLightbulb } from 'react-icons/fa';
import { Notification, Home, Wallet, User, People, Call, Activity, Setting, Chat } from 'react-iconly';

const MyHome = () => {
    const [name, setName] = useState("")
    const [account, setAccount] = useState("")
    const [span, setSpan] = useState([])
    const [country, setCountry] = useState([])
    const [email, setEmail] = useState([])
    const [phone, setPhone] = useState([])
    const [activeTab, setActiveTab] = useState("tab1");
    const [show3, setShow3] = useState(false);
    const handleClose3 = () => setShow3(false);
    const [show4, setShow4] = useState(false);
    const handleClose4 = () => setShow4(false);
    const [count, setCount] = useState("1")
    const [subStatus, setSubStatus] = useState()
    const handleShow3 = () => {
        setCount("No Alerts")
        setShow3(true)
    };
    const handleShow4 = () => {
        setShow4(true)
    };
    useEffect(() => {
        PersonalRequests().then(res => {
            setSpan(res[2]);
        });
        UserRequests().then(res => {
            setName(res.first_name)
            setAccount(res.profile.user_type)
            setCountry(res.profile.country)
            setPhone(res.profile.phoneno)
            setEmail(res.email)
        })
        SubscriptionRequests().then(res => {
            setSubStatus(res.status)
            console.log(res.status)
        })
    }, []);
    //  Functions to handle Tab Switching
    const handleTab1 = () => {
        // update the state to tab1
        setActiveTab("tab1");
    };
    const handleTab2 = () => {
        // update the state to tab2
        setActiveTab("tab2");
    };
    const handleTab3 = () => {
        // update the state to tab2
        setActiveTab("tab3");
    };
    const handleTab4 = () => {
        // update the state to tab1
        setActiveTab("tab4");
    };
    const handleTab5 = () => {
        // update the state to tab2
        setActiveTab("tab5");
    };
    const handleTab6 = () => {
        // update the state to tab2
        setActiveTab("tab6");
    };
    const handleTab7 = () => {
        // update the state to tab1
        setActiveTab("tab7");
    };
    const handleTab8 = () => {
        // update the state to tab2
        setActiveTab("tab8");
    };
    const handleTab9 = () => {
        // update the state to tab2
        setActiveTab("tab9");
    };
    const handleTab10 = () => {
        // update the state to tab2
        setActiveTab("tab10");
    };
    const handleTab12 = () => {
        // update the state to tab2
        setActiveTab("tab12");
    };
    const handleTab13 = () => {
        // update the state to tab2
        setActiveTab("tab13");
    };
    const handleTab15 = () => {
        // update the state to tab2
        setActiveTab("tab15");
    };
    console.log(span)
    return ( <
        div className = 'row' > <
        div className = 'row d-none d-md-block d-lg-none d-md-none shadow-sm' > <
        div className = 'row py-2' >
        <
        div className = 'col-3' > <
        img src = { Header }
        width = '75%'
        // online change
        className = 'mx-3 mt-3 '
        height = '35%'
        alt = "investors" / > < /div> <
        div className = 'col-6' > < /div> <
        div className = 'col-3' > <
        div className = 'row m-3 p-3 blue-dark rounded-3' >
        <
        div className = 'col-5' >
        <
        img src = { Profile }
        className = "rounded-circle"
        width = '100%'
        height = '80%'
        alt = "investors" / >
        <
        /div> <
        div className = 'col-6' >
        <
        h6 > { name } < /h6> <
        h6 > personal Account < /h6> < /
        div > <
        /div></div >
        <
        /div>   < /
        div >
        <
        div className = 'col-lg-2 d-none d-lg-block bg-lighter' > <
        div > <
        img src = { Header }
        width = '60%'
        className = 'mx-4 mt-4 '
        height = '80%'
        alt = "investors" / > <
        /div>   <
        div className = 'row my-5 py-2 mx-2 blue-dark rounded-4' >
        <
        div className = 'col-4' >
        <
        img src = { Profile }
        className = "rounded-circle mt-2"
        width = '100%'
        height = '70%'
        alt = "investors" / >
        <
        /div> <
        div className = 'col-8' > { name } <
        p className = 'bolder' > { account } < /p > < /
        div > <
        /div> <
        // online change my-5 to my-3
        div className = 'px-3 my-3 text-start scroll-y2' >
        <
        h6 className = 'p-2 grey-text' > DASHBOARD < /h6>  <
        div className = ' py-2 d-flex flex-row' >
        <
        TabNavItem title = { < span > < Home size = "small"
            set = 'broken'
            className = 'mx-2' / > Home < /span >
        }
        onClick = { handleTab1 }
        id = "tab1"
        className = "home"
        activeTab = { activeTab }
        setActiveTab = { setActiveTab }
        />  < /div > <
        div className = ' py-2 d-flex flex-row ' >
        <
        TabNavItem title = { < span > < User
            set = 'broken'
            size = "small"
            className = 'mx-2' / > My Investments < /span >
        }
        onClick = { handleTab2 }
        id = "tab2"
        activeTab = { activeTab }
        setActiveTab = { setActiveTab }
        />< /div > <
        div className = ' py-2 d-flex flex-row d-none' >
        <
        TabNavItem title = { < span > < People size = "small"
            set = 'broken'
            className = 'mx-2' / > SACCO Groups < /span >
        }
        onClick = { handleTab3 }
        id = "tab3"
        activeTab = { activeTab }
        setActiveTab = { setActiveTab }
        />  < /
        div >
        <
        div className = ' py-2 d-flex flex-row d-none' >
        <
        TabNavItem title = { < span > < FaUniversity size = "small"
            className = 'mx-2' / > Investment Clubs < /span >
        }
        onClick = { handleTab4 }
        id = "tab4"
        activeTab = { activeTab }
        setActiveTab = { setActiveTab }
        />  < /
        div >
        <
        h6 className = 'p-2 pt-4 grey-text' > ACTIVITY < /h6>   <
        div className = ' py-2 d-flex flex-row' >
        <
        TabNavItem title = { < span > < Wallet size = "small"
            set = 'broken'
            className = 'mx-2' / > Deposits < /span >
        }
        onClick = { handleTab5 }
        id = "tab5"
        activeTab = { activeTab }
        setActiveTab = { setActiveTab }
        />  < /div > <
        div className = ' py-2 d-flex flex-row d-none' >
        <
        TabNavItem title = { < span > < FaHandHoldingUsd size = "small"
            className = 'mx-2' / > Loans < /span >
        }
        onClick = { handleTab6 }
        id = "tab6"
        activeTab = { activeTab }
        setActiveTab = { setActiveTab }
        />  < /div > <
        div className = ' py-2 d-flex flex-row d-none' >
        <
        TabNavItem title = { < span > < FaDonate size = "small"
            className = 'mx-2' / > Withdraws < /span >
        }
        onClick = { handleTab7 }
        id = "tab7"
        activeTab = { activeTab }
        setActiveTab = { setActiveTab }
        />  < /
        div >
        <
        h6 className = 'p-2 pt-4 grey-text' > SETTINGS < /h6>   <
        div className = ' py-2 d-flex flex-row' >
        <
        TabNavItem title = { < span > < Setting size = "small"set = 'broken'
            className = 'mx-2' / > Account < /span >
        }
        onClick = { handleTab8 }
        id = "tab8"
        activeTab = { activeTab }
        setActiveTab = { setActiveTab }
        />  < /div > <
        div className = ' py-2 d-flex flex-row' >
        <
        TabNavItem title = { < span > < Activity size = "small"set = 'broken'
            className = 'mx-2' / > Investments < /span >
        }
        onClick = { handleTab9 }
        id = "tab9"
        activeTab = { activeTab }
        setActiveTab = { setActiveTab }
        />  < /div > <
        div className = 'py-2 d-flex flex-row' >
        <
        TabNavItem title = { < span > < Chat size = "small"set = 'broken'
            className = 'mx-2' / > FAQs < /span >
        }
        id = "tab10"
        onClick = { handleTab10 }
        activeTab = { activeTab }
        setActiveTab = { setActiveTab }
        />  < /
        div >
        <
        //online change from py-3, my-5
        div className = 'py-2 d-flex flex-row' >
        <
        TabNavItem title = { < span > < Call size = "small"
            set = 'broken'
            className = 'mx-2' / > Contact Us < /span >
        }
        onClick = { handleTab3 }
        id = "tab15"
        activeTab = { activeTab }
        setActiveTab = { setActiveTab }
        />  < /
        div >
        <
        /
        div > <
        /
        div > <
        div className = 'col-lg-10 col-md-9 d-none d-lg-block px-lg-5 px-4' >
        <
        div className = "row pt-4" >
        <
        div className = 'col-lg-8 rounded shadow-sm' > <
        h6 className = 'mt-2' > <
        FaLightbulb size = "15"
        className = 'position-relative active' / > < span className = 'active' > Tips: < /span> <span className='mx-3'>Make tiny daily investments instead of saving your money</span > < /h6 > < /
        div > <
        div className = 'col-lg-1 d-md-none d-lg-block text-center' >
        <
        span >
        <
        Notification set = 'broken'
        size = "small"
        onClick = { handleShow3 }
        className = 'active position-relative my-lg-2' / > <
        span className = "position-absolute top-15 start-65 translate-middle px-1 d-none blue-dark rounded-pill" > <
        h6 > { count } < /h6> < /
        span > < /span> < /
        div > <
        div className = " col-lg-3 col-10 rounded bg-lighter text-center" >
        <
        div className = 'flex-row d-flex py-1 my-2 justify-content-center' > <
        TabNavItem title = "API Account"
        onClick = { handleTab2 }
        id = "tab11"
        activeTab = { activeTab }
        setActiveTab = { setActiveTab }
        /> | <
        TabNavItem title = "Logout"
        onClick = { handleTab2 }
        id = "tab14"
        activeTab = { activeTab }
        setActiveTab = { setActiveTab }
        />  < /
        div > < /
        div > < /
        div >
        <
        div className = 'text-end pt-3' > < h6 className = ' p-2 mx-3' > Account Subscription: < span className = 'bg-lighter active p-2 px-3 mx-2 rounded-3'
        onClick = { handleShow4 } > { subStatus } < /span>  < /
        h6 > < /div > <
        TabContent id = "tab1"
        activeTab = { activeTab } > < Main handletab2 = { handleTab2 }
        handletab9 = { handleTab9 }
        / > < /TabContent > <
        TabContent id = "tab2"
        activeTab = { activeTab } > < Personal handletab9 = { handleTab9 }
        / > < /
        TabContent > <
        TabContent id = "tab3"
        activeTab = { activeTab } > < Sacco parentCallback = { handleTab12 }
        activeTab = { activeTab }
        setActiveTab = { setActiveTab }
        / > < /TabContent > <
        TabContent id = "tab4"
        activeTab = { activeTab } > < Club parentCallback1 = { handleTab13 }
        / > < /TabContent > <
        TabContent id = "tab5"
        activeTab = { activeTab } > < Deposit handletab9 = { handleTab9 }
        / > < /TabContent > <
        TabContent id = "tab6"
        activeTab = { activeTab } > < Loans / > < /TabContent> <
        TabContent id = "tab7"
        activeTab = { activeTab } > < Withdraw / > < /TabContent> <
        TabContent id = "tab8"
        activeTab = { activeTab } > < Settings handletab8 = { handleTab8 }
        handletab10 = { handleTab10 }
        handletab15 = { handleTab15 }
        / > < /TabContent > <
        TabContent id = "tab9"
        activeTab = { activeTab } > < RiskProfile / > < /TabContent> <
        TabContent id = "tab10"
        activeTab = { activeTab } > < FAQs handletab8 = { handleTab8 }
        / > < /TabContent > <
        TabContent id = "tab11"
        activeTab = { activeTab } > < Api / > < /TabContent><
        TabContent id = "tab16"
        activeTab = { activeTab } > < Alert / > < /TabContent><
        TabContent id = "tab14"
        activeTab = { activeTab } > < Logout / > < /TabContent><
        TabContent id = "tab12"
        activeTab = { activeTab } > < Saccos / > < /TabContent> <
        TabContent id = "tab13"
        activeTab = { activeTab } > < Clubs / > < /TabContent><
        TabContent id = "tab15"
        activeTab = { activeTab } > < ContactUs handletab8 = { handleTab8 }
        / > < /TabContent > < /
        div >
        <
        Modal show = { show3 }
        onHide = { handleClose3 }
        dialogClassName = "my-modal" > <
        Alert /
        >
        <
        /Modal> <
        Modal show = { show4 }
        onHide = { handleClose4 }
        dialogClassName = "my-modal1" > <
        Subscribe substatus = { subStatus }
        country = { country }
        lastname = { name }
        email = { email }
        phone = { phone }
        / > < /
        Modal > <
        div className = "d-block d-lg-none" >
        <
        ResHome name = { name }
        / > < /div > < /
        div >
    );
}

export default MyHome;