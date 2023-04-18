import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import './style.scss';
import React, { useState } from "react";
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
import ResGoal from '../Accounts/ResGoal';
import ResHome from './ResHome';
import ProgressBar from "@ramonak/react-progress-bar";
import { FaLightbulb } from 'react-icons/fa';
import { Home, Notification, Wallet, Setting, AddUser } from 'react-iconly';

const ResGoals = () => {
    const [activeTab, setActiveTab] = useState("tab2");
    const [goalSetting, setGoalSetting] = useState(false);
    //  Functions to handle Tab Switching
    if (goalSetting) {
        return ( < ResGoal changeGoalSetting = { setGoalSetting }
            / >
        )
    }
    const handleTab1 = () => {
        // update the state to tab1
        setActiveTab("tab1");
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
    const Main = () => {
        return ( < div className = 'p-1 res-home' > < div className = "blue-dark p-2 rounded-4" >
            <
            div className = 'd-flex mt-2' >
            <
            div className = 'rounded-4 light-res-home wide' >
            <
            p className = "bolder text-end mx-4 mt-2" > welcome back user <
            div className = " justify-content-center" > <
            p className = "px-1 font-lighter" > pick up where we left off < /p></div > < /p>< /
            div > <
            img src = { Profile }
            className = "rounded-circle mx-2 mt-3"
            width = '10%'
            height = '10%'
            alt = "investors" / > < /
            div > <
            div className = 'text-center' > <
            p className = ' mx-3 font-lighter mt-4' > Your Goals < /p > < /div >
            <
            div className = 'd-flex mt-2' > < FaLightbulb size = "35"
            className = 'mt-3 mx-2 p-2 rounded-circle light-res-home text-warning' / >
            <
            div className = 'rounded-4 light-res-home wider' >
            <
            p className = "bolder mx-4 mt-2" > Tips: <
            div className = " justify-content-center" > <
            p className = "px-1 font-lighter" > Dont save your money, invest < /p></div > < /p>< /
            div > < /
            div >
            <
            /
            div >
            <
            div className = 'bg-light p-2 rounded-4' >
            <
            div className = 'p-2 bg-white shadow-sm rounded-4' >
            <
            div className = 'p-3 d-flex' >
            <
            AddUser size = "large"
            set = 'broken'
            className = 'rounded-circle border border-dark p-2' / > < p className = 'bolder mx-3 mt-2' > Build a Mansion < /p> < /
            div >
            <
            div className = 'bg-light p-3 rounded-4' >
            <
            p className = 'bolder mt-2' > Progress: < span className = 'font-lighter' > 13 months to go < /span></p >
            <
            ProgressBar completed = { 80 }
            customLabel = ""
            isLabelVisible = { false }
            completedClassName = "barCompleted"
            maxCompletedClassName = "barMaxCompleted"
            maxCompleted = { 200 }
            barContainerClassName = "container" /
            >
            <
            p className = 'bolder mt-3' > Total Deposit: < span className = 'font-lighter' > UGX 45000 < /span></p >
            <
            /
            div > <
            /div> <
            p onClick = {
                () => { setGoalSetting(true) }
            }
            className = 'p-2 border border-warning rounded-4 text-warning text-center mx-5 mt-3' > Add a new Goal < /p> < /
            div > <
            /
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
            className = 'mt-2' / > < /span>
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
        onClick = { handleTab1 }
        id = "tab5"
        activeTab = { activeTab }
        setActiveTab = { setActiveTab } > < span > hi < /span> < /
        TabNavItem > < /
        div > <
        div className = ' py-3 text-center' >
        <
        TabNavItem title = { < span > < Notification size = "20"
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
            className = 'mt-2 mx-4' / > < /span>
        }
        onClick = { handleTab3 }
        id = "tab8"
        activeTab = { activeTab }
        setActiveTab = { setActiveTab }
        />  < /
        div > < /
        div > <
        TabContent id = "tab1"
        activeTab = { activeTab } > < ResHome parentCallback1 = { handleTab1 }
        / > < /TabContent > <
        TabContent id = "tab2"
        activeTab = { activeTab } > < Main / > < /TabContent> <
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

export default ResGoals;