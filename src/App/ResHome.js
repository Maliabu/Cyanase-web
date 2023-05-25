import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import React, { useState } from "react";
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
import Saccos from '../Accounts/Saccos';
import Clubs from '../Accounts/Clubs';
import Profile from '../images/Ellipse 6.png';
import Ad from '../images/Group 212.png';
import ResGoals from './ResGoals'
import { FaLightbulb } from 'react-icons/fa';
import { Home, Notification, Wallet, Setting, Work, AddUser } from 'react-iconly';

const ResHome = (props) => {
    const [activeTab, setActiveTab] = useState("tab1");
    const [goalSetting, setGoalSetting] = useState(false);
    //  Functions to handle Tab Switching
    if (goalSetting) {
        return ( < ResGoals changeGoalSetting = { setGoalSetting }
            / >
        )
    }
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
    const handleTab5 = () => {
        // update the state to tab2
        setActiveTab("tab5");
    };
    const handleTab8 = () => {
        // update the state to tab2
        setActiveTab("tab8");
    };
    const handleTab12 = () => {
        // update the state to tab2
        setActiveTab("tab12");
    };
    const handleTab13 = () => {
        // update the state to tab2
        setActiveTab("tab13");
    };
    const Main = () => {
        return ( < div className = 'p-1 res-home' > < div className = "blue-dark p-2 rounded-4" >
            <
            div className = 'd-flex mt-2' >
            <
            div className = 'rounded-4 light-res-home wide' >
            <
            p className = "bolder text-end mx-4 mt-2" > welcome back < span > { props.name } < /span> <
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
            div className = 'row' > <
            div className = 'col text-start' > <
            p className = ' mx-3 font-lighter mt-4' > April 2 < br / > < span className = 'bolder' > Statistics < /span> < /p > < /div><
            div className = 'col' >
            <
            div className = 'd-flex justify-content-end mx-3' > < Wallet size = "medium"
            set = 'broken'
            className = 'mt-4 mx-2 icon-padding rounded-circle active light-res-home ' / > < AddUser size = "medium"
            set = 'broken'
            className = 'mt-4 icon-padding rounded-circle active light-res-home '
            onClick = {
                () => { setGoalSetting(true) }
            }
            / > < /
            div > < /
            div > < /div >  <
            div className = 'd-flex' >
            <
            span className = 'light-res-home text-center rounded-4 wide-40' > <
            span className = "bolder mt-3 text-center" > < Wallet size = "medium"
            className = 'text-warning' /
            >
            <
            br / > Deposit <
            div className = "d-flex flex-row flex justify-content-center" > < p > UGX < /p> <
            h6 className = "px-1 font-lighter" > 45000 < /h6></div > < /span> < /span > <
            span className = 'light-res-home rounded-4 wide-60 mx-1' > <
            p className = "bolder mt-3 text-center" > < Work size = "15"
            set = 'broken'
            className = 'text-warning' /
            >
            <
            br / > Networth <
            div className = "d-flex flex-row flex justify-content-center" > < p > UGX < /p> <
            h6 className = "px-1 font-lighter" > 123000500 < /h6></div > < /p>  < /span > < /
            div >
            <
            p className = 'my-3 bolder mx-2' > Dollar Account < /p> <
            div className = 'd-flex' >
            <
            span className = 'light-res-home rounded-4 wide-40' > <
            p className = "bolder text-center mt-2" > < Wallet size = "15"
            className = 'text-warning d-none' /
            >
            <
            br / > Deposit <
            div className = "d-flex flex-row flex justify-content-center" > < p > USD < /p> <
            h6 className = "px-1 font-lighter" > 60 < /h6></div > < /p> < /span > <
            span className = 'light-res-home rounded-4 wide-60 mx-1' > <
            p className = "bolder text-center mt-2" > < Work size = "15"
            className = 'text-warning d-none' /
            >
            <
            br / > Networth <
            div className = "d-flex flex-row flex justify-content-center" > < p > USD < /p> <
            h6 className = "px-1 font-lighter" > 8000 < /h6></div > < /p>  < /span > < /
            div >
            <
            div className = 'd-flex mt-2' > < FaLightbulb size = "35"
            className = 'mt-3 mx-2 p-2 rounded-circle light-res-home text-warning' / >
            <
            div className = 'rounded-4 light-res-home wider' >
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
            p className = 'mx-3 bolder my-3' > Recent Activity < /p> <
            div className = "row mt-3 px-2 bg-light rounded-3 mx-1 " > <
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
        className = "twitter"
        activeTab = { activeTab }
        setActiveTab = { setActiveTab }
        />< /div > <
        div className = ' py-3 text-center' >
        <
        TabNavItem title = { < span > < Wallet size = "medium"
            set = 'broken'
            className = 'rounded-circle border border-dark icon-padding mx-4' / > < /span>
        }
        onClick = { handleTab5 }
        id = "tab5"
        activeTab = { activeTab }
        setActiveTab = { setActiveTab } > < span > hi < /span> < /
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
        setActiveTab = { setActiveTab }
        />  < /
        div >
        <
        div className = ' py-3 text-center' >
        <
        TabNavItem title = { < span > < Setting size = "20"
            set = 'broken'
            className = 'mt-2 mx-4' / > < /span>
        }
        onClick = { handleTab8 }
        id = "tab8"
        activeTab = { activeTab }
        setActiveTab = { setActiveTab }
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
        setActiveTab = { setActiveTab }
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
const TabNavItem = ({ id, activeTab, title, setActiveTab }) => {
    const handleClick = () => {
        setActiveTab(id);
    };
    return ( < div className = "px-3 tab-nav lighter" >
        <
        h6 onClick = { handleClick }
        className = { activeTab === id ? "active" : "" } > { title } < /
        h6 > < /
        div >
    )
};

export default ResHome;