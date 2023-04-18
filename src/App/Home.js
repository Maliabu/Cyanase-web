import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import React, { useState } from "react";
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
import Loans from './Loans'
import { FaUniversity, FaHandHoldingUsd, FaDonate, FaLightbulb } from 'react-icons/fa';
import { Notification, Home, Wallet, User, People, Call, Chat, Setting, Chart } from 'react-iconly';

const MyHome = () => {
    const [activeTab, setActiveTab] = useState("tab1");
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
    const handleTab12 = () => {
        // update the state to tab2
        setActiveTab("tab12");
    };
    const handleTab13 = () => {
        // update the state to tab2
        setActiveTab("tab13");
    };
    return ( <
        div className = 'row' > <
        div className = 'row d-none d-md-block d-lg-none d-md-none shadow-sm' > <
        div className = 'row py-2' >
        <
        div className = 'col-3' > <
        img src = { Header }
        width = '80%'
        className = 'mx-lg-5 mx-sm-4 mt-lg-5 mt-sm-4 '
        height = '40%'
        alt = "investors" / > < /div> <
        div className = 'col-6' > < /div> <
        div className = 'col-3' > <
        div className = 'row my-lg-5 p-3 mx-lg-3 blue-dark rounded-3' >
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
        div className = 'col-6 px-2' >
        <
        h5 > username < /h5> <
        h6 > User < /h6> < /
        div > <
        /div></div >
        <
        /div>   < /
        div >
        <
        div className = 'col-lg-2 d-none d-sm-block shadow-sm' > <
        div > <
        img src = { Header }
        width = '60%'
        className = 'mx-5 mt-5 '
        height = '80%'
        alt = "investors" / > <
        /div>   <
        div className = 'row my-5 p-3 mx-3 blue-dark rounded-25' >
        <
        div className = 'col-4' >
        <
        img src = { Profile }
        className = "rounded-circle"
        width = '100%'
        height = '80%'
        alt = "investors" / >
        <
        /div> <
        div className = 'col-6 px-2' >
        <
        h5 > username < /h5> <
        h6 > User < /h6> < /
        div > <
        /div> <
        div className = 'px-3 my-5 text-start scroll-y2' >
        <
        h6 className = 'p-2 grey-text' > DASHBOARD < /h6>  <
        div className = ' py-3 d-flex flex-row' >
        <
        TabNavItem title = { < span > < Home size = "20"set = 'broken'
            className = 'mx-2' / > Home < /span >
        }
        onClick = { handleTab1 }
        id = "tab1"
        className = "home"
        activeTab = { activeTab }
        setActiveTab = { setActiveTab }
        />  < /div > <
        div className = ' py-3 d-flex flex-row ' >
        <
        TabNavItem title = { < span > < User
            set = 'broken'
            size = "20"
            className = 'mx-2' / > Personal Investment < /span >
        }
        onClick = { handleTab2 }
        id = "tab2"
        activeTab = { activeTab }
        setActiveTab = { setActiveTab }
        />< /div > <
        div className = ' py-3 d-flex flex-row' >
        <
        TabNavItem title = { < span > < People size = "20"
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
        div className = ' py-3 d-flex flex-row' >
        <
        TabNavItem title = { < span > < FaUniversity size = "20"
            className = 'mx-2' / > Investment Clubs < /span >
        }
        onClick = { handleTab3 }
        id = "tab4"
        activeTab = { activeTab }
        setActiveTab = { setActiveTab }
        />  < /
        div >
        <
        h6 className = 'p-2 pt-5 grey-text' > ACTIVITY < /h6>   <
        div className = ' py-3 d-flex flex-row' >
        <
        TabNavItem title = { < span > < Wallet size = "20"
            set = 'broken'
            className = 'mx-2' / > Deposits < /span >
        }
        onClick = { handleTab1 }
        id = "tab5"
        activeTab = { activeTab }
        setActiveTab = { setActiveTab }
        />  < /div > <
        div className = ' py-3 d-flex flex-row' >
        <
        TabNavItem title = { < span > < FaHandHoldingUsd size = "20"
            className = 'mx-2' / > Loans < /span >
        }
        onClick = { handleTab2 }
        id = "tab6"
        activeTab = { activeTab }
        setActiveTab = { setActiveTab }
        />  < /div > <
        div className = ' py-3 d-flex flex-row' >
        <
        TabNavItem title = { < span > < FaDonate size = "20"
            className = 'mx-2' / > Withdraws < /span >
        }
        onClick = { handleTab3 }
        id = "tab7"
        activeTab = { activeTab }
        setActiveTab = { setActiveTab }
        />  < /
        div >
        <
        h6 className = 'p-2 pt-5 grey-text' > SETTINGS < /h6>   <
        div className = ' py-3 d-flex flex-row' >
        <
        TabNavItem title = { < span > < Setting size = "20"set = 'broken'
            className = 'mx-2' / > Account < /span >
        }
        onClick = { handleTab1 }
        id = "tab8"
        activeTab = { activeTab }
        setActiveTab = { setActiveTab }
        />  < /div > <
        div className = ' py-3 d-flex flex-row' >
        <
        TabNavItem title = { < span > < Chart size = "20"set = 'broken'
            className = 'mx-2' / > Investments < /span >
        }
        onClick = { handleTab2 }
        id = "tab9"
        activeTab = { activeTab }
        setActiveTab = { setActiveTab }
        />  < /div > <
        div className = 'py-3 d-flex flex-row' >
        <
        TabNavItem title = { < span > < Chat size = "20"set = 'broken'
            className = 'mx-2' / > FAQs < /span >
        }
        id = "tab10"
        activeTab = { activeTab }
        setActiveTab = { setActiveTab }
        />  < /
        div >
        <
        div className = 'py-3 d-flex flex-row' >
        <
        TabNavItem title = { < span > < Call size = "20"
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
        div className = "row py-5" >
        <
        div className = 'col-lg-8 rounded shadow-sm' > <
        h6 className = 'mt-2' > <
        FaLightbulb size = "25"
        className = 'position-relative blue-dark px-1 rounded-circle' / > < span className = 'active' > Tips: < /span> <span className='mx-3'>Make tiny daily investments instead of saving your money</span > < /h6 > < /
        div > <
        div className = 'col-lg-1 d-md-none d-lg-block rounded-25' >
        <
        Notification set = 'broken'
        size = "23"
        className = 'active position-relative my-lg-2 my-3 mx-lg-5' / >
        <
        span className = "position-absolute top-15 start-65 translate-middle px-2 blue-dark rounded-pill" > <
        span className = "visually-hidden" > New alerts < /span> < /
        span > <
        /
        div > <
        div className = " col-lg-3 col-10 text-center" >
        <
        div className = 'flex-row d-flex rounded border py-2 my-2 justify-content-center' > <
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
        div > <
        TabContent id = "tab1"
        activeTab = { activeTab } > < Main parentCallback2 = { handleTab2 }
        / > < /TabContent > <
        TabContent id = "tab2"
        activeTab = { activeTab } > < Personal / > < /TabContent> <
        TabContent id = "tab3"
        activeTab = { activeTab } > < Sacco parentCallback = { handleTab12 }
        activeTab = { activeTab }
        setActiveTab = { setActiveTab }
        / > < /TabContent > <
        TabContent id = "tab4"
        activeTab = { activeTab } > < Club parentCallback1 = { handleTab13 }
        / > < /TabContent > <
        TabContent id = "tab5"
        activeTab = { activeTab } > < Deposit / > < /TabContent> <
        TabContent id = "tab6"
        activeTab = { activeTab } > < Loans / > < /TabContent> <
        TabContent id = "tab7"
        activeTab = { activeTab } > < Withdraw / > < /TabContent> <
        TabContent id = "tab8"
        activeTab = { activeTab } > < Settings / > < /TabContent><
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
        <
        div className = "d-block d-sm-none" >
        <
        ResHome / > < /div> < /
        div >
    );
}

export default MyHome;