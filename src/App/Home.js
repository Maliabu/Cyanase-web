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
                    <div className = 'col-2 blue-dark'>
                        <div>
                            <img src = { Header }
                            width = '60%'
                            className = 'mx-4 mt-4 '
                            height = '80%'
                            alt = "investors" />
                        </div>   
                        <div className = 'row my-5 py-2 mx-2 light-res-homey rounded-4' >
                            <div className = 'col-3'>
                                <img src = {profilePicture}
                                className = "mt-1 rounded-circle object-fit-cover img-head"
                                width = '100%'
                                height = '80%'
                                alt = "investors" />
                            </div> 
                            <div className = 'col-9 px-3 py-1'> <h5 className = 'lh-1 small' > { name } 
                                <h5 className = 'bolder' > { whichAccount() } </h5>  
                                </h5> 
                            </div> 
                        </div> 
                        <div className = ' px-lg-2 my-2 text-start scroll-y2' >
                            <h6 className = 'p-2 grey-text small' > DASHBOARD </h6>  
                            <div className = ' d-flex flex-row' >
                                <TabNavItem title = { 
                                    <h5> <Home size = "small" set = 'broken' stroke='bold' className = 'mx-3 bolder' /> 
                                    Home 
                                    </h5> }
                                    onClick = { handleTab1 }
                                    id = "tab1"
                                    className = "home"
                                    activeTab = { activeTab }
                                    setActiveTab = { setActiveTab }/> 
                            </div> 
                            <div className = ' d-flex flex-row ' >
                                <TabNavItem title = { 
                                    <h5> <User size = "small"set = 'broken' stroke='bold' className = 'mx-3 bolder' /> 
                                    Portfolio 
                                    </h5> }
                                    onClick = { handleTab2 }
                                    id = "tab2"
                                    activeTab = { activeTab }
                                    setActiveTab = { setActiveTab }/>
                            </div> 
                            <div className = ' py-2 d-flex flex-row d-none' >
                                <TabNavItem title = { 
                                    <h5> <People size = "small" set = 'broken' stroke='bold' className = 'mx-3' /> 
                                    SACCO Groups 
                                    </h5> }
                                    onClick = { handleTab3 }
                                    id = "tab3"
                                    activeTab = { activeTab }
                                    setActiveTab = { setActiveTab }/>
                            </div>
                            <div className = ' py-2 d-flex flex-row d-none' >
                                <TabNavItem title = { 
                                    <h5> <FaUniversity className = 'mx-3' />
                                    Investment Clubs 
                                    </h5> }
                                    onClick = { handleTab4 }
                                    id = "tab4"
                                    activeTab = { activeTab }
                                    setActiveTab = { setActiveTab }/>  
                            </div>
                            <h6 className = 'p-2 pt-5 grey-text small d-none' > ACTIVITY </h6>   
                            <div className = ' d-flex flex-row' >
                                <TabNavItem title = { 
                                    <h5> <Wallet size = "small"set = 'broken' stroke='bold' className = 'mx-3 bolder' /> 
                                    Deposits
                                    </h5> }
                                    onClick = { handleTab5 }
                                    id = "tab5"
                                    activeTab = { activeTab }
                                    setActiveTab = { setActiveTab }/>  
                            </div> 
                            <div className = ' d-flex flex-row d-none' >
                                <TabNavItem title = { 
                                    <h5> <FaHandHoldingUsd className = 'mx-3' /> 
                                    Loans 
                                    </h5> }
                                    onClick = { handleTab6 }
                                    id = "tab6"
                                    activeTab = { activeTab }
                                    setActiveTab = { setActiveTab }/>  
                            </div> 
                            <div className = 'd-none d-flex flex-row' >
                                <TabNavItem title = { 
                                    <h5> <FaDonate className = 'mx-3 bolder' /> 
                                    Withdraws 
                                    </h5> }
                                    onClick = { handleTab7 }
                                    id = "tab7"
                                    activeTab = { activeTab }
                                    setActiveTab = { setActiveTab }/>
                            </div>
                            <h6 className = 'p-2 pt-5 grey-text small' > SETTINGS </h6>   
                            <div className = ' d-flex flex-row' >
                                <TabNavItem title = { 
                                    <h5> <Setting size = "small" set = 'broken' stroke='bold' className = 'mx-3' /> 
                                    Account 
                                    </h5> }
                                    onClick = { handleTab8 }
                                    id = "tab8"
                                    activeTab = { activeTab }
                                    setActiveTab = { setActiveTab }/>  
                            </div> 
                            <div className = 'd-flex flex-row' >
                                <TabNavItem title = { 
                                    <h5> <Activity size = "small"set = 'broken' stroke='bold' className = 'mx-3' /> 
                                    Risk Profile 
                                    </h5> }
                                    onClick = { handleTab9 }
                                    id = "tab9"
                                    activeTab = { activeTab }
                                    setActiveTab = { setActiveTab }/>  
                            </div> 
                            <div className = ' d-flex flex-row' >
                                <TabNavItem title = { 
                                    <h5> <Chat size = "small"set = 'broken' stroke='bold' className = 'mx-3' /> 
                                    FAQs 
                                    </h5> }
                                id = "tab10"
                                onClick = { handleTab10 }
                                activeTab = { activeTab }
                                setActiveTab = { setActiveTab }/>  
                            </div>
                            <div className = ' d-flex flex-row' >
                                <TabNavItem title = { 
                                    <h5> <Call size = "small" set = 'broken' stroke='bold' className = 'mx-3' /> 
                                    Contact Us 
                                    </h5>
                                }
                                onClick = { handleTab3 }
                                id = "tab15"
                                activeTab = { activeTab }
                                setActiveTab = { setActiveTab }/>  
                            </div>
                            <div className = ' mt-5 px-3' > 
                                <div className='text-start'>
                                    <div className='mt-2'>
                                        <TabNavItem title = {<h5>API Account</h5>}
                                        onClick = { handleTab2 }
                                        id = "tab11"
                                        activeTab = { activeTab }
                                        setActiveTab = { setActiveTab }/>
                                    </div>
                                </div>
                                <div className=' text-start'>
                                    <div className=''> 
                                        <TabNavItem title = {<h5>LOGOUT</h5>}
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
                        <div className = "row" >
                            <div className = 'col-7' > 
                                <h5 className = 'mt-2 p-2 bluey bolder' >
                                <h5 className='rounded bluey'>
                                <FaRegLightbulb size = "15" className = 'position-relative' /> Tips: Building an emergency fund is cruicial in securing your future </h5> 
                                </h5> 
                            </div>
                            <div className = "col-lg-5" >
                                <div className='d-flex flex-row justify-content-end p-1 rounded-2'>
                                    <div> 
                                        <div className = 'p-2 d-felx' >
                                        <h5 className = 'btn btn-warning px-3 py-2' onClick = { handleShow4 } > Subscription:  { subStatus } </h5> 
                                        </div> 
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