import { PersonalRequests } from '../Api/MainRequests';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import './style.scss';
import React, { useState, useEffect } from "react";
import Deposit from "./Deposit";
import Sacco from './Sacco';
import { FaLightbulb } from 'react-icons/fa';
import Club from './Club';
import ResSettings from './ResSettings';
import RiskProfile from './RiskProfile';
import Api from '../Accounts/primaryUser';
import Notify from '../Accounts/Notify';
import TabContent from "../Accounts/TabContent";
import ContactUs from '../Accounts/ContactUs';
import FAQs from '../Accounts/FAQs';
import Saccos from '../Accounts/Saccos';
import { PROFILE_PHOTO } from '../apis';
import Clubs from '../Accounts/Clubs';
import ResWithdraws from './ResWithdraws'
import ResHome from './ResHome';
import { Home, Notification, Wallet, Setting, AddUser, Download, ArrowLeftSquare } from 'react-iconly';
import ProgressBar from '@ramonak/react-progress-bar';
import { Modal } from 'react-bootstrap';
import Goal from '../Accounts/Goal'
import Goal1 from '../Accounts/Goal1'

const ResGoals = () => {
    const [activeTab, setActiveTab1] = useState("tab2");
    const [goalSetting, setGoalSetting] = useState(false);
    const [span, setSpan] = useState([])
    const [holdId, setHoldId] = useState("");
    const [holdName, setHoldName] = useState("");
    const [holdAmount, setHoldAmount] = useState("");
    let [holdDeposit, setHoldDeposit] = useState("");
    const [holdCreated, setHoldCreated] = useState("");
    const [show3, setShow3] = useState(false);
    const handleClose3 = () => setShow3(false);
    const handleShow3 = () => setShow3(true);
    useEffect(() => {
        PersonalRequests().then(res => {
            setSpan(res[2]); // array(14)
        });
    }, []);
    //  Functions to handle Tab Switching
    if (goalSetting) {
        return ( < div >
            <
            div className = 'row p-2 px-3' > <
            div className = 'col-10 bg-lighter rounded-4' > <
            h4 className = ' mx-3 bolder mt-3' > Create New Goal < /h4 > < /div >
            <
            div className = 'rounded-4 d-none light-res-home wide' >
            <
            p className = "bolder text-end mx-4 mt-2" > welcome back user <
            div className = " justify-content-center" > <
            p className = "px-1 font-lighter" > pick up where we left off < /p></div > < /p>< /
            div >
            <
            div className = 'col-2' > <
            // img src = "http://127.0.0.1:8000/static/photo.png"
            img src = {PROFILE_PHOTO}
            className = "rounded-circle object-fit-cover mt-2 img-head"
            alt = "investors" / > < /div> < /
            div > <
            ArrowLeftSquare size = { 30 }
            onClick = {
                () => { setGoalSetting(false) }
            }
            className = "mt-1 mx-2" / > < Goal1 changeGoalSetting = { setGoalSetting }
            / > < /
            div >
        )
    }
    const handleTab1 = () => {
        // update the state to tab1
        setActiveTab1("tab1")
    }
    const handleTab6 = () => {
        // update the state to tab2
        setActiveTab1("tab6")
    }
    const handleTab3 = () => {
        // update the state to tab2
        setActiveTab1("tab3")
    }
    const handleTab5 = () => {
        // update the state to tab2
        setActiveTab1("tab5")
    };
    const handleTab12 = () => {
        // update the state to tab2
        setActiveTab1("tab12")
    };
    const handleTab13 = () => {
        // update the state to tab2
        setActiveTab1("tab13")
    };
    const TabNavItem = ({ id, activeTab, title, setActiveTab1 }) => {
        const handleClick = () => {
            setActiveTab1(id);
        };
        return ( < div className = "px-3 tab-nav lighter" >
            <
            h6 onClick = { handleClick }
            className = { activeTab === id ? "active" : "" } > { title } < /
            h6 > < /
            div >
        )
    };

    function getId(id, name, amount, deposit, created) {
        setHoldId(id)
        setHoldName(name)
        setHoldAmount(amount)
        setHoldDeposit(deposit)
        setHoldCreated(created)
        handleShow3()
    }
    const Main = (props) => {
        let progress
        return ( < div className = 'p-1 res-home' > < div >
            <
            div className = 'row p-2 px-3' > <
            div className = 'col-10 bg-lighter rounded-4' > <
            h4 className = ' mx-3 bolder mt-3' > Your Goals < /h4 > < /div >
            <
            div className = 'rounded-4 d-none light-res-home wide' >
            <
            p className = "bolder text-end mx-4 mt-2" > welcome back user <
            div className = " justify-content-center" > <
            p className = "px-1 font-lighter" > pick up where we left off < /p></div > < /p>< /
            div >
            <
            div className = 'col-2' > <
            img src = "http://127.0.0.1:8000/static/photo.png"
            className = "rounded-circle object-fit-cover mt-2 img-head"
            alt = "investors" / > < /div> < /
            div >
            <
            div className = 'd-flex mt-2 d-none' > < FaLightbulb size = "35"
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
            div className = 'bg-lighter p-2 rounded-4' >
            <
            div className = "scroll-y2 pb-lg-5 mb-lg-5" > {
                span.map(goal => ( <
                    div className = "p-4 bg-white res-home rounded-4 mt-3"
                    key = { goal.goal_id } > <
                    div className = "d-flex flex-row flex" > <
                    span className = "mt-1" > <
                    AddUser className = " rounded-circle border border-dark p-1"
                    size = "large" / > < /span>  <
                    p className = "mx-4" > < span className = "active"
                    onClick = {
                        () => getId(goal.goal_id, goal.goal_name, goal.goal_amount, goal.deposit[0], goal.created)
                    } > {
                        (goal.goal_name).toUpperCase()
                    } < /span><br/ > < p > created {
                        (goal.created).slice(0, 10)
                    } < /p >  < /
                    p > < /
                    div >
                    <
                    p > Progress: {
                        progress = (100 - ((goal.goal_amount - goal.deposit[0]) / goal.goal_amount * 100)).toFixed(2)
                    } %
                    <
                    span >
                    <
                    ProgressBar completed = { progress }
                    maxCompleted = { 100 }
                    isLabelVisible = { false }
                    bgColor = 'orange' /
                    >
                    <
                    /span> < /
                    p > <
                    span className = "bolder d-none" > { goal.deposit[0] } < /span > <
                    span className = "active d-none" > { goal.goal_amount } < /span > < /
                    div >
                ))
            } <
            /div>  <
            Modal show = { show3 }
            onHide = { handleClose3 }
            dialogClassName = "" > <
            Goal id = { holdId }
            name = { holdName }
            amount = { holdAmount }
            deposit = { holdDeposit }
            created = { holdCreated }
            / > < /
            Modal >
            <
            p onClick = {
                () => { setGoalSetting(true) }
            }
            className = 'p-2 rounded-3 bk-warning text-center mx-5 mt-3' > Add a new Goal < /p> < /
            div > <
            /
            div >
        )
    };
    return ( <
        div >

        <
        div className = 'd-flex rounded-4 flex-row w-100 text-dark d-block justify-content-center bg-lighter bottom-nav' >
        <
        div className = ' py-3 text-center' > <
        TabNavItem title = { < span > < Home size = "20"
            className = 'mt-2' / > < /span>
        }
        onClick = { handleTab1 }
        id = "tab1"
        className = "twitter"
        activeTab = { activeTab }
        setActiveTab1 = { setActiveTab1 }
        />< /div > <
        div className = ' py-3 text-center mx-3' >
        <
        TabNavItem title = { < span > < Download size = "20"
            set = 'broken'
            className = 'mt-2' / > < /span>
        }
        onClick = { handleTab6 }
        id = "tab6"
        activeTab = { activeTab }
        setActiveTab1 = { setActiveTab1 } > < /
        TabNavItem > < /
        div > <
        div className = ' py-3 text-center' >
        <
        TabNavItem title = { < span > < Wallet size = "20"
            set = 'broken'
            className = 'mt-2' / > < /span>
        }
        onClick = { handleTab5 }
        id = "tab5"
        activeTab = { activeTab }
        setActiveTab1 = { setActiveTab1 } > < span > hi < /span> < /
        TabNavItem > < /
        div > <
        div className = ' py-3 text-center mx-3' >
        <
        TabNavItem title = { < span > < Notification size = "20"
            className = 'mt-2' / > < /span>
        }
        onClick = { handleTab3 }
        id = "tab7"
        activeTab = { activeTab }
        setActiveTab1 = { setActiveTab1 }
        />  < /
        div >
        <
        div className = ' py-3 text-center' >
        <
        TabNavItem title = { < span > < Setting size = "20"
            className = 'mt-2' / > < /span>
        }
        onClick = { handleTab3 }
        id = "tab8"
        activeTab = { activeTab }
        setActiveTab1 = { setActiveTab1 }
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
        setActiveTab1 = { setActiveTab1 }
        / > < /TabContent > <
        TabContent id = "tab4"
        activeTab = { activeTab } > < Club parentCallback1 = { handleTab13 }
        / > < /TabContent > <
        TabContent id = "tab5"
        activeTab = { activeTab } > < Deposit / > < /TabContent><
        TabContent id = "tab6"
        activeTab = { activeTab } > < ResWithdraws / > < /TabContent> <
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