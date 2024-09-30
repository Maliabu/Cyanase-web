import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import { UserRequests, SubscriptionRequests, GetInvestmentClassesRequests } from '../Api/MainRequests';
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
import { apiDocs } from '../apis';
import { FaUniversity, FaHandHoldingUsd, FaDonate, FaRegLightbulb } from 'react-icons/fa';
import { Notification, Home, Wallet, User, People, Call, Activity, Setting, Chat } from 'react-iconly';

const MyHome = () => {
    const [name, setName] = useState("")
    const [account, setAccount] = useState("")
    const [profilePicture, setProfilePicture] = useState("")
    const [country, setCountry] = useState([])
    const [email, setEmail] = useState([])
    const [phone, setPhone] = useState([])
    const [investment_options, setOptions] = useState([])
    const [activeTab, setActiveTab] = useState("tab1");
    const [show3, setShow3] = useState(false);
    const handleClose3 = () => setShow3(false);
    const [show4, setShow4] = useState(false);
    const [countSub, setCountSub] = useState(0)
    const handleClose4 = () => {
        setShow4(false);
        setCountSub(1)
    };
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
        UserRequests().then(res => {
            setName(res.first_name)
            setAccount(res.profile.user_type)
            setCountry(res.profile.country)
            setPhone(res.profile.phoneno)
            setEmail(res.email)
            setProfilePicture(res.profile.profile_picture)
        })
        SubscriptionRequests().then(res => {
            setSubStatus(res.status)
        })
        GetInvestmentClassesRequests().then(res => {
            setOptions(res)
        });
    }, []);
    const apiDocumentation = () =>{
        if(account.toUpperCase() !== "PERSONAL"){
            return(
                <div className = ' pt-3' >
                <a href={apiDocs}>
                <span className = 'warning rounded-2 p-2'> Api Documentation </span> 
                </a> 
                </div>
            )
        } else {
            return null
        }
    }
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
    const whichAccount = () =>{
        let api = ""
        if(account.toUpperCase() !== "PERSONAL"){
            api = " Api Account"
            return api
        } else{
            api = " Personal Account"
            return api
        }
    }
    const paySubscription = () => {
        if (countSub === 1){
            return null
        }
        else if (countSub === 0 && subStatus !== "subscribed"){
            return (
            <div>
            <Modal show = { handleShow4 }
                onHide = { handleClose4 } > 
                <Subscribe substatus = { subStatus }
                country = { country }
                lastname = { name }
                email = { email }
                phone = { phone }
                />
                </Modal>
                </div>)
        } else {
            return null
        }
    }
    return ( 
        <div>
            <div className='d-none d-md-block d-lg-block'>
                {paySubscription()}
                <div className='row'>
                    <div className = 'col-2 cards'>
                        <div>
                            <img src = { Header }
                            width = '60%'
                            className = 'mx-4 mt-4 '
                            height = '80%'
                            alt = "investors" />
                        </div>   
                        <div className = 'row my-5 py-2 mx-2 blue-darks rounded-4' >
                            <div className = 'col-3'>
                                <img src = {profilePicture}
                                className = "mt-1 rounded-circle object-fit-cover img-head"
                                width = '100%'
                                height = '80%'
                                alt = "investors" />
                            </div> 
                            <div className = 'col-9 px-3 py-1'> <h6 className = 'lh-1 small' > { name } 
                                <span className = 'bolder' > { whichAccount() } </span>  
                                </h6> 
                            </div> 
                        </div> 
                        <div className = ' px-lg-2 my-2 text-start scroll-y2' >
                            <h6 className = 'p-2 grey-text small' > DASHBOARD </h6>  
                            <div className = ' d-flex flex-row' >
                                <TabNavItem title = { 
                                    <span> <Home size = "small" set = 'broken' stroke='bold' className = 'mx-3 bolder' /> 
                                    Home 
                                    </span> }
                                    onClick = { handleTab1 }
                                    id = "tab1"
                                    className = "home"
                                    activeTab = { activeTab }
                                    setActiveTab = { setActiveTab }/> 
                            </div> 
                            <div className = ' d-flex flex-row ' >
                                <TabNavItem title = { 
                                    <span> <User size = "small"set = 'broken' stroke='bold' className = 'mx-3 bolder' /> 
                                    Portfolio 
                                    </span> }
                                    onClick = { handleTab2 }
                                    id = "tab2"
                                    activeTab = { activeTab }
                                    setActiveTab = { setActiveTab }/>
                            </div> 
                            <div className = ' py-2 d-flex flex-row d-none' >
                                <TabNavItem title = { 
                                    <span> <People size = "small" set = 'broken' stroke='bold' className = 'mx-3' /> 
                                    SACCO Groups 
                                    </span> }
                                    onClick = { handleTab3 }
                                    id = "tab3"
                                    activeTab = { activeTab }
                                    setActiveTab = { setActiveTab }/>
                            </div>
                            <div className = ' py-2 d-flex flex-row d-none' >
                                <TabNavItem title = { 
                                    <span> <FaUniversity className = 'mx-3' />
                                    Investment Clubs 
                                    </span> }
                                    onClick = { handleTab4 }
                                    id = "tab4"
                                    activeTab = { activeTab }
                                    setActiveTab = { setActiveTab }/>  
                            </div>
                            <h6 className = 'p-2 pt-5 grey-text small d-none' > ACTIVITY </h6>   
                            <div className = ' d-flex flex-row' >
                                <TabNavItem title = { 
                                    <span> <Wallet size = "small"set = 'broken' stroke='bold' className = 'mx-3 bolder' /> 
                                    Deposits
                                    </span> }
                                    onClick = { handleTab5 }
                                    id = "tab5"
                                    activeTab = { activeTab }
                                    setActiveTab = { setActiveTab }/>  
                            </div> 
                            <div className = ' d-flex flex-row d-none' >
                                <TabNavItem title = { 
                                    <span> <FaHandHoldingUsd className = 'mx-3' /> 
                                    Loans 
                                    </span> }
                                    onClick = { handleTab6 }
                                    id = "tab6"
                                    activeTab = { activeTab }
                                    setActiveTab = { setActiveTab }/>  
                            </div> 
                            <div className = 'd-none d-flex flex-row' >
                                <TabNavItem title = { 
                                    <span> <FaDonate className = 'mx-3 bolder' /> 
                                    Withdraws 
                                    </span> }
                                    onClick = { handleTab7 }
                                    id = "tab7"
                                    activeTab = { activeTab }
                                    setActiveTab = { setActiveTab }/>
                            </div>
                            <h6 className = 'p-2 pt-5 grey-text small' > SETTINGS </h6>   
                            <div className = ' d-flex flex-row' >
                                <TabNavItem title = { 
                                    <span> <Setting size = "small" set = 'broken' stroke='bold' className = 'mx-3' /> 
                                    Account 
                                    </span> }
                                    onClick = { handleTab8 }
                                    id = "tab8"
                                    activeTab = { activeTab }
                                    setActiveTab = { setActiveTab }/>  
                            </div> 
                            <div className = 'd-flex flex-row' >
                                <TabNavItem title = { 
                                    <span> <Activity size = "small"set = 'broken' stroke='bold' className = 'mx-3' /> 
                                    Risk Profile 
                                    </span> }
                                    onClick = { handleTab9 }
                                    id = "tab9"
                                    activeTab = { activeTab }
                                    setActiveTab = { setActiveTab }/>  
                            </div> 
                            <div className = ' d-flex flex-row' >
                                <TabNavItem title = { 
                                    <span> <Chat size = "small"set = 'broken' stroke='bold' className = 'mx-3' /> 
                                    FAQs 
                                    </span> }
                                id = "tab10"
                                onClick = { handleTab10 }
                                activeTab = { activeTab }
                                setActiveTab = { setActiveTab }/>  
                            </div>
                            <div className = ' d-flex flex-row' >
                                <TabNavItem title = { 
                                    <span > <Call size = "small" set = 'broken' stroke='bold' className = 'mx-3' /> 
                                    Contact Us 
                                    </span>
                                }
                                onClick = { handleTab3 }
                                id = "tab15"
                                activeTab = { activeTab }
                                setActiveTab = { setActiveTab }/>  
                            </div>
                            <div className = ' mt-5 px-3' > 
                                <div className='text-start'>
                                    <div className='mt-2'>
                                        <TabNavItem title = "API Account"
                                        onClick = { handleTab2 }
                                        id = "tab11"
                                        activeTab = { activeTab }
                                        setActiveTab = { setActiveTab }/>
                                    </div>
                                </div>
                                <div className=' text-start'>
                                    <div className=''> 
                                        <TabNavItem title = "Logout"
                                        onClick = { handleTab2 }
                                        id = "tab14"
                                        activeTab = { activeTab }
                                        setActiveTab = { setActiveTab }/> 
                                    </div> 
                                </div>
                            </div>
                            <p className='text-center small mt-5 lh-1'>Management@api <br/> CyanaseInc</p>
                        </div> 
                    </div> 
                    <div className = 'col-10' >
                        <div className = "row bg-light" >
                            <div className = 'col-7' > 
                                <h6 className = 'mt-2 p-2' > 
                                <FaRegLightbulb size = "15" className = 'position-relative' /> 
                                <span className='bolder'> Tips: </span> 
                                <span className='mx-3 p-2 rounded'>Make tiny daily investments instead of saving your money </span> 
                                </h6> 
                            </div>
                            <div className = "col-lg-5" >
                                <div className='d-flex flex-row justify-content-end p-1 rounded-2'>
                                    <div> 
                                        <h6 className = ' px-2' >
                                        <span className='mx-3'>Subscription</span> 
                                        <span className = 'btn btn-warning' onClick = { handleShow4 } > { subStatus } </span> 
                                        </h6> 
                                    </div>
                                    {apiDocumentation()}
                                </div>
                            </div>
                        </div>
                        <TabContent id = "tab1" activeTab = { activeTab } > 
                        <Main handletab2 = { handleTab2 } handletab9 = { handleTab9 }/> </TabContent> 
                        <TabContent id = "tab2"
                        activeTab = { activeTab } > <Personal handletab9 = { handleTab9 }/> </TabContent> 
                        <TabContent id = "tab3"
                        activeTab = { activeTab } > <Sacco parentCallback = { handleTab12 }
                        activeTab = { activeTab }
                        setActiveTab = { setActiveTab }/> </TabContent> 
                        <TabContent id = "tab4"
                        activeTab = { activeTab } > <Club parentCallback1 = { handleTab13 }/> </TabContent> 
                        <TabContent id = "tab5"
                        activeTab = { activeTab } > <Deposit handletab9 = { handleTab9 }
                        options = {investment_options}/> </TabContent> 
                        <TabContent id = "tab6"
                        activeTab = { activeTab }> <Loans /> </TabContent> 
                        <TabContent id = "tab7"
                        activeTab = { activeTab }> <Withdraw /> </TabContent> 
                        <TabContent id = "tab8"
                        activeTab = { activeTab }> <Settings handletab8 = { handleTab8 }
                        handletab10 = { handleTab10 }
                        handletab15 = { handleTab15 }/> </TabContent> 
                        <TabContent id = "tab9"
                        activeTab = { activeTab }> <RiskProfile /> </TabContent> 
                        <TabContent id = "tab10"
                        activeTab = { activeTab } > <FAQs handletab8 = { handleTab8 }/> </TabContent> 
                        <TabContent id = "tab11"
                        activeTab = { activeTab }> <Api /> </TabContent>
                        <TabContent id = "tab16"
                        activeTab = { activeTab }> <Alert /> </TabContent>
                        <TabContent id = "tab14"
                        activeTab = { activeTab }> <Logout countSub = {setCountSub} /> </TabContent>
                        <TabContent id = "tab12"
                        activeTab = { activeTab }> <Saccos /> </TabContent> 
                        <TabContent id = "tab13"
                        activeTab = { activeTab }> <Clubs /> </TabContent>
                        <TabContent id = "tab15"
                        activeTab = { activeTab } > < ContactUs handletab8 = { handleTab8 }/> </TabContent> 
                    </div>
                </div>
                <Modal show = { show3 } onHide = { handleClose3 } dialogClassName = "my-modal" > <Alert /></Modal> 
                <Modal show = { show4 } onHide = { handleClose4 } dialogClassName = "my-modal1" > 
                <Subscribe 
                substatus = { subStatus }
                country = { country }
                lastname = { name }
                email = { email }
                phone = { phone }/> 
                </Modal> 
            </div>
            <div className = "d-block d-lg-none d-md-none" >
                <ResHome name = { name } profile = {profilePicture} handletab2 = {handleTab2}/>
            </div> 
        </div>
    );
}

export default MyHome;