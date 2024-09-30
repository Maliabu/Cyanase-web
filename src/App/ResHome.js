import { MainRequests, PersonalRequests, UserRequests, WithdrawRequests, InvestmentWithdrawRequests, SubscriptionRequests, GetInvestmentClassesRequests } from '../Api/MainRequests';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Carousel } from 'react-bootstrap';
import '../App.css';
import React, { useState, useEffect } from "react";
import Deposit from "./Deposit";
import Sacco from './Sacco';
import Club from './Club';
import ResSettings from './ResSettings';
import RiskProfile from './RiskProfile';
import Api from '../Accounts/primaryUser';
import TabContent from "../Accounts/TabContent";
import ContactUs from '../Accounts/ContactUs';
import FAQs from '../Accounts/FAQs';
import Saccos from '../Accounts/Saccos';
import Clubs from '../Accounts/Clubs';
import Ad from '../images/Group 212.png';
import House from '../images/house.png'
import ResWithdraws from './ResWithdraws'
import ResGoals from './ResGoals'
import { getCurrency } from '../payment/GetCurrency';
import MultiCarousel from '../MultiCarousel';
import ProgressBar from 'react-bootstrap/ProgressBar';
import {FaRegLightbulb} from 'react-icons/fa';
import Portfolio from '../Accounts/Portfolio'
import { Home, Wallet, Setting, Download, AddUser} from 'react-iconly';
import Deposit1 from './Deposit1';

const ResHome = (props) => {
    const [activeTab, setActiveTab1] = useState("tab1");
    const [goalSetting, setGoalSetting] = useState(false);
    const [span, setSpan] = useState([])
    const [deposit, setDeposit] = useState(0);
    const [graph, setGraph] = useState([])
    const [country, setCountry] = useState([])
    const [totalWithdraw, setTotalWithdraw] = useState([])
    const [networth, setDepositNetworth] = useState(0);
    const [investmentWithdraw, setInvestmentWithdraw] = useState([])
    const [withdraws, setWithdraw] = useState([])
    const [investment_options, setOptions] = useState([])
    const [portfolioSetting, setPortfolioSetting] = useState(false)
    const [depositProgress, setDepositProgress] = useState([]);
    const [set, setSet] = useState("")
    const [description, setDescription] = useState("")
    const [logo, setLogo] = useState("")
    const [id, setId] = useState("")
    const [options, setOption] = useState()
    useEffect(() => {
        PersonalRequests().then(res => {
            setSpan(res[2]); // array(14)
        });
        MainRequests().then(res => {
            setDeposit(res[0]);
            setGraph(res[4]);
            setDepositNetworth(res[9]);
            setDepositProgress(res[4])
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
        GetInvestmentClassesRequests().then(res => {
            setOptions(res)
        });
        SubscriptionRequests().then(res=>{
            // setSubscription(res.status)
        })
    }, []);
    const getID = (clas, description, id, logo, options) => {
        setId(id)
        setSet(clas)
        setDescription(description)
        setLogo(logo)
        setOption(options)
    }
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
    const handleTab51 = () => {
        // update the state to tab2
        setActiveTab1("tab51");
    };
    const handleTab7 = () => {
        // update the state to tab2
        setActiveTab1("tab7");
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
    const handleTab14 = () => {
        // update the state to tab2
        setActiveTab1("tab14");
    };
    function setAccountSettings(){
        handleTab8()
    }
    let progress
    const forif = () => {
        let goalInits = []
        // function onlyUnique(value, index, array){
        //     return array.indexOf(value) === index
        // }
        if(span.length !== 0){
        for(var i=0; i<=4 || i>=2; i++){ // so even if i have 1 goal, i wont get errors
            if(span[i] === undefined){
                // console.log("undefined",i) -- first set the breaks before the loop starts
                break
            }
            goalInits.push(
                <img src = {span[i].goal_picture}
            className = "rounded-circle object-fit-cover img-head-goal"
            alt = "goal"/>
            ) 
            // console.log(i) -- now loop controllably
        }
        // goalInits.push(span[i].goal_name[0]) 
        // console.log(goalInits.filter(onlyUnique))
        return(
            <div className='mx-1'>
            <div className='d-flex'>
            <h5 className='bolder mt-2 bluey'>My Goals</h5>
            <div className='text-end wide'>
                    <h6 className=' btn border rounded-3 px-3 py-2' onClick = { handleTab7 } id = "tab7"> {myGoalsMsg} </h6>
                </div></div>
            {span?.map((goal,id)=>(
                <div className='row py-2 rounded-4 bg-white mt-1' key={id}>
                <div className='col-2'>
                <img src = {goal.goal_picture} width={50} height={50}
            className = "rounded-circle object-fit-cover"
            alt = "goal"/></div>
            <div className='col-7'><h6 className='px-3 bluey'>{goal.goal_name}<h6 className='grey-text d-none'>{goal.created}</h6>
            <h6 className='bluey bolder'>{
                    progress = (100 - ((goal.goal_amount - goal.deposit[0]) / goal.goal_amount * 100)).toFixed(2)
                    } %</h6></h6>
                    <ProgressBar now = { progress }
                        className="progress-sm mx-2 d-none"
                        variant = "#ff8b10" /></div>
            <div className='col-3 text-end'><h5 className='bluey bolder'>{goal.goal_amount.toLocaleString()}<h6 className='grey-text'>{goal.goal_period * 12} months</h6></h5></div>
                </div>
            ))}
            </div>
        )}
    }
    let myGoalsMsg = ""
    const myGoals =()=>{
        if(span.length < 1){
            myGoalsMsg = "Create new Goal"
            return null // no goals
        } else {
            myGoalsMsg = "Go to Goals"
            return(
                <div className=''>
                <div className='justify-content-center rounded-3' >
                    {
                    <div className = " p-0">
                    {forif()}
                    </div>
                    } 
            </div> 
            </div>
            )
        }
    }
    const networthy = () => {
        let totalNetworth = 0
        totalNetworth = networth - totalWithdraw
        return totalNetworth
    }
    if (portfolioSetting) {
        return (
            <Portfolio changePortfolioSetting = {setPortfolioSetting}
                changeAccountSetting = {setAccountSettings}
                name = {props.name}
                profile = {props.profile}
                handletab5 = {handleTab5}
                depositProgress = {depositProgress}
                span = {span}
                withdraws = {withdraws()}
            />
        )
    }
    const Main = () => {
        return ( 
            <div className=''>
            <div className='px-2 fix-top bg-white border-bottom-4'>
            <div className = 'row m-1 justify-content-center'>
            <div className='col-8 px-0'>
            <div className='d-flex'>
            <img src = {props.profile}
            className = "rounded-circle object-fit-cover img-head"
            onClick={() => setAccountSettings()}
            alt = "investors"/><h5 className='m-2 mx-2'>Hi {props.name}</h5></div></div>
            <div className='col-4 text-end p-0'><TabNavItem title = { <span className='text-center'><h6 className='p-2 btn border rounded-3'>My Portfolio</h6>
            </span>
        }
        onClick = { handleTab14 }
        id = "tab14"
        className = ""
        activeTab = { activeTab }
        setActiveTab1 = { setActiveTab1 }
        />
        </div> 
        </div></div>
        <div className=' pt-5 bg-white'>
            <div className='mx-2 px-3 pt-3 mt-3 cards border-none rounded-4'>
            <h5 className = 'bolder' > My Investments </h5>
            <div className='row mt-3 rounded-4 py-3'>
                <div className='col-5'>
            <div className = 'text-start' > 
            <h6 className='text-start'>Total Deposit
            <div className = "d-flex flex-row flex justify-content-start" >
             <p className='bolder'> { getCurrency(country) } </p> <h4 className='mx-2 text-white bolder'> { deposit.toLocaleString() }  
            </h4> </div></h6>  </div>
                </div>
                <div className='col-7'>
            <h6 className=' text-end'> Total Networth
            <div className = "d-flex flex-row flex justify-content-end" > <p className='m-2 bolder'> { getCurrency(country) } </p> 
            <h3 className = "display-4 bolder text-white" > { networthy().toLocaleString() } </h3></div></h6></div>
            </div>
            <div className = 'd-flex justify-content-end d-none' >
            <div>
            <h6 className='text-end'>Total Networth
            <div className = "d-flex flex-row flex justify-content-end" > <p className='m-2 bolder'> { getCurrency(country) } </p> 
            <h1 className = "display-6" > { networthy().toLocaleString() } </h1></div></h6></div>
            <div className='d-flex flex-row d-none justify-content-start'>
            <h5 className='p-2 mx-2 rounded-3'><Download size={20} set="broken"/></h5></div>
            </div>
            <h6 className='btn border text-white rounded-3 px-5 py-2' onClick = { handleTab5}>Deposit</h6>
            <h6 className='btn mx-2 border text-white rounded-3 py-2' onClick = {handleTab2}>Withdraw</h6>
            </div>
            <div className=' mx-2 rounded-bottom-4 px-2 d-none Venture text-white border-none'>
            <div className='row'>
                <div className='col-6'>
                <h6 className = 'bolder d-none m-2' > Total <br/>Deposit </h6></div></div>
            <div className = 'd-flex justify-content-end' >
            <div className = 'text-end' > 
            <h6 className='text-end mx-3'>Total Deposit
            <div className = "d-flex flex-row flex justify-content-end" >
             <p className='mx-3 bolder'> { getCurrency(country) } </p> <h1 className='display-6'> { deposit.toLocaleString() }  
            </h1> </div></h6>  </div> </div>
        </div>
        <div className='p-1 mt-1 bg-lighter rounded-4'>
            <h5 className = 'px-2 mt-3 lh-1 d-none bolder bluey' > Fund Managers </h5>
            <h5 className = 'px-2 mt-3 lh-1 bolder bluey' > Investment Classes </h5>
            <MultiCarousel investmentClasses={investment_options} handletab51 = {handleTab51} getid = {getID}/>
            <div className = 'd-flex mx-2 d-none' > 
            <FaRegLightbulb size ={30} className = 'mt-3 mx-1 p-2 bg-lighter rounded-circle' />
            <div className = 'rounded-4 wider bg-lighter p-2' >
            <h4 className = "mx-4 mt-2" > <h6 className='lh-1 mt-1' > Dont save your money, invest towards diverse options and goals </h6></h4></div> 
            </div>
            <div className=' m-2 rounded-3'>
                {myGoals()}
            </div>
            <div className = 'mt-2 mx-2' >
            <Carousel touch={true} interval={4000} controls={false}>
                <Carousel.Item >
                <img src = { Ad }
            className = "rounded-4 text-center"
            width = '100%'
            height = '50%'
            alt = "investors" />
                </Carousel.Item>
                <Carousel.Item >
                <img src = { House }
            className = "text-center"
            width = '100%'
            height = '50%'
            alt = "investors" />
                </Carousel.Item>
            </Carousel>
             </div>
            </div></div>
            </div>
        )
    }
    return ( 
        <div className=''>
        <div className='bottom-nav'>
        <div className = 'row justify-content-center my-2' >
        <div className = 'col-2 text-center bolder p-0' > 
        <TabNavItem title = { <span className='text-center' > <Home size = {20}
            set = 'broken'/><div className='bolder'>Home</div>
            </span>
        }
        onClick = { handleTab1 }
        id = "tab1"
        activeTab = { activeTab }
        setActiveTab1 = { setActiveTab1 }
        /></div> 
        <div className = 'col-2 text-center p-0' >
        <TabNavItem title = { <span className='text-center'> <Download size = {20}
            set = 'broken'/><div className='bolder'>Withdra..</div> 
            </span>
        }
        onClick = { handleTab2 }
        id = "tab2"
        activeTab = { activeTab }
        setActiveTab1 = { setActiveTab1 } /> </div> 
        <div className = 'col-3 text-center p-0' >
        <TabNavItem title = { <span > <Wallet size = {20}
            set = 'broken' /><div className='bolder'>Deposit</div> </span>
        }
        onClick = { handleTab5 }
        id = "tab5"
        activeTab = { activeTab }
        setActiveTab1 = { setActiveTab1 } /></div>
        <div className = 'col-2 text-center p-0' >
        <TabNavItem title = { <span > <AddUser size = {20}
            set = 'broken' /><div className='bolder'>Goals</div> </span>
        }
        onClick = { handleTab3 }
        id = "tab7"
        activeTab = { activeTab }
        setActiveTab1 = { setActiveTab1 }
        /> </div>
        <div className = 'col-2 text-center p-0' >
        <TabNavItem title = { <span > <Setting size = {20}
            set = 'broken'/><div className='bolder'>Settings</div> </span>
        }
        onClick = { handleTab8 }
        id = "tab8"
        activeTab = { activeTab }
        setActiveTab1 = { setActiveTab1 }
        /></div> </div></div> 
        <TabContent id = "tab1"
        activeTab = { activeTab } > <Main parentCallback2 = { handleTab2 }
        /> </TabContent> 
        <TabContent id = "tab2"
        activeTab = { activeTab } > <ResWithdraws handletab5 = {handleTab5} /> </TabContent> 
        <TabContent id = "tab3"
        activeTab = { activeTab } > <Sacco parentCallback = { handleTab12 }
        activeTab = { activeTab }
        setActiveTab1 = { setActiveTab1 }
        /> </TabContent> 
        <TabContent id = "tab4"
        activeTab = { activeTab } > <Club parentCallback1 = { handleTab13 }
        /> </TabContent> 
        <TabContent id = "tab5"
        activeTab = { activeTab } > 
        <Deposit 
        handletab1 = { handleTab1 } 
        setClass={set}
        setDescription = {description}
        setLogo = {logo}
        setId = {id}
        /> </TabContent> 
        <TabContent id = "tab51"
        activeTab = { activeTab } > 
        <Deposit1 
        handletab1 = { handleTab1 } 
        setClass={set}
        setDescription = {description}
        setLogo = {logo}
        setId = {id}
        setOptions = {options}
        /> </TabContent> 
        <TabContent id = "tab7"
        activeTab = { activeTab } > <ResGoals profile = {props.profile} /> </TabContent> 
        <TabContent id = "tab8"
        activeTab = { activeTab } > <ResSettings handletab2 = {props.handletab2}/> </TabContent>
        <TabContent id = "tab9"
        activeTab = { activeTab } > <RiskProfile /> </TabContent> 
        <TabContent id = "tab10"
        activeTab = { activeTab } > <FAQs /> </TabContent>
        <TabContent id = "tab11"
        activeTab = { activeTab } > <Api /> </TabContent>
        <TabContent id = "tab12"
        activeTab = { activeTab } > <Saccos /> </TabContent> 
        <TabContent id = "tab13"
        activeTab = { activeTab } > <Clubs /> </TabContent>
        <TabContent id = "tab15"
        activeTab = { activeTab } > <ContactUs /> </TabContent> 
        <TabContent id = "tab14"
        activeTab = { activeTab } > <Portfolio name = {props.name}
                depositProgress = {depositProgress}
                span = {span}
                wwithdraws = {wwithdraws}
        profile = {props.profile} handletab1={handleTab1} changeAccountSetting = {setAccountSettings}/> </TabContent> 
        </div>
    );
};
const TabNavItem = ({ id, activeTab, title, setActiveTab1 }) => {
    const handleClick = () => {
        setActiveTab1(id);
    };
    return ( <div className = "tab-nav" >
        <span onClick = { handleClick }
        className = { activeTab === id ? "activer" : "" } > { title } </span> </div>
    )
};

export default ResHome;