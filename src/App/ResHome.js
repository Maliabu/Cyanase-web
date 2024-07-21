import { MainRequests, PersonalRequests, UserRequests, WithdrawRequests, InvestmentWithdrawRequests, SubscriptionRequests, GetInvestmentClassesRequests } from '../Api/MainRequests';
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
import Grph from '../images/10 Top Reasons Why Vendor Engagement Fails - 31West.jpeg'
import Saccos from '../Accounts/Saccos';
import Clubs from '../Accounts/Clubs';
import Ad from '../images/Group 212.png';
import House from '../images/house.png'
import ResWithdraws from './ResWithdraws'
import ResGoals from './ResGoals'
import { getCurrency } from '../payment/GetCurrency';
import MultiCarousel from '../MultiCarousel';
import MultiCarousel2 from '../MultiCarousel2';
import { FaChartLine, FaCheckDouble, FaChevronCircleRight, FaGoogleWallet, FaRegLightbulb, FaSearch, FaWallet} from 'react-icons/fa';
import Portfolio from '../Accounts/Portfolio'
import { Home, Wallet, Setting, Download, AddUser, Chart} from 'react-iconly';

const ResHome = (props) => {
    const [activeTab, setActiveTab1] = useState("tab1");
    const [goalSetting, setGoalSetting] = useState(false);
    const [withdrawSetting, setWithdrawSetting] = useState(false);
    const [span, setSpan] = useState([])
    const [deposit, setDeposit] = useState(0);
    const [graph, setGraph] = useState([])
    const [country, setCountry] = useState([])
    const [investmentDeposit, setInvestmentDeposit] = useState("");
    const [handler, setHandler] = useState("");
    const [totalWithdraw, setTotalWithdraw] = useState([])
    const [networth, setDepositNetworth] = useState(0);
    // let thisYear = new Date().getFullYear()
    const [investmentWithdraw, setInvestmentWithdraw] = useState([])
    const [option_name, setOptionName] = useState("")
    const [groups, setGroups] = useState(0)
    const [investment_id, setInvestmentId] = useState("")
    const [withdraws, setWithdraw] = useState([])
    const [investment_options, setOptions] = useState([])
    const [portfolioSetting, setPortfolioSetting] = useState(false)
    const [depositProgress, setDepositProgress] = useState([]);
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
    if (withdrawSetting) {
        return ( < ResWithdraw changeWithdrawSetting = { setWithdrawSetting }
            option_name = {option_name}
            networth = { groups }
            deposit = {investmentDeposit}
            handler = {handler}
            investmentId = {investment_id}
            / >
        )
    }
    function subtractTwoLists(listA, listB) {
        const mapA = new Map(listA.map(item => [item.name, { total: parseInt(item.total), data: item.data, investment_id: item.investment_id, handler: item.handler }])); // convert listA to map as { 'a' => { value: 2000, data: 'first' } }
      //console.log(mapA)
        // Subtract values from List B from List A
        listB.forEach(itemB => {
          const nameInB = itemB.name; //get name in B
          const valueInB = parseInt(itemB.total);//get value in B and parse to Int
          if (mapA.has(nameInB)) {
              
              const oldValue = mapA.get(nameInB).total;
              mapA.set(nameInB, { total: oldValue - valueInB, data: mapA.get(nameInB).data, investment_id: mapA.get(nameInB).investment_id, handler: mapA.get(nameInB).handler });
             //Updates the value associated with the "name" attribute in List A to the result of the subtraction
          }
        });
       const resultList = Array.from(mapA, ([name, { total, data, investment_id, handler }]) => ({ name, total, data, investment_id, handler }));
        return resultList;  // convert map to list, i.e { 'a' => { value: 2000, data: 'first' } } to [ { name: 'a', value: 1200 }]
    }
    let final_data = subtractTwoLists(results, result)
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
    function getWithdraws(name,networth,investment_id, deposit, handler){
        setOptionName(name)
        setGroups(networth)
        setInvestmentId(investment_id)
        setInvestmentDeposit(deposit)
        setHandler(handler)
        setWithdrawSetting(true)
    }
    function setAccountSettings(){
        handleTab8()
    }
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
            className = "rounded-circle object-fit-cover img-head-goal border border-white border-3"
            alt = "goal"/>
            ) 
            // console.log(i) -- now loop controllably
        }
        // goalInits.push(span[i].goal_name[0]) 
        // console.log(goalInits.filter(onlyUnique))
        return(
            <div className='row m-1'>
            {goalInits?.map((goal,id)=>(
                <div className='col-3 margin-goals text-center' key={id}>
                <div className='mt-1'>
                {goal}</div>
                </div>
            ))}</div>
        )}
    }
    let myGoalsMsg = ""
    const myGoals =()=>{
        if(span.length < 1){
            myGoalsMsg = "Add Goal"
            return null // no goals
        } else {
            myGoalsMsg = "More Goals"
            return(
                <div className='row'>
                <div className='col-8'>
                <div className='row justify-content-center rounded-3' > {
                    <div className = "col-1 d-none p-2 rounded-start-2">
                    <div className = "text-center mt-2" ><FaCheckDouble size={20}/></div> 
                    </div>
                    } 
                    {
                    <div className = "col-11 p-0">
                    {forif()}
                    </div>
                    } 
            </div> 
            </div>
                <div className='col-4'>
                    <h6 className=' mt-3 bk-warning2 rounded-3' onClick = { handleTab7 } id = "tab7"> {myGoalsMsg} </h6>
                </div>
            </div>
            )
        }
    }
    const myInvestments = () => {
        if (results.length === 0) {
            return(null
                // <div className='p-2'>
                //     <img src={CLASSES} alt='classes' width="100%"/>
                // </div>
            )
        } else{
            return(
                <div className='p-3 mt-2 blue-darks rounded-4'>
                <Carousel touch={true} interval={null} controls={false}>
                    {
                        final_data.map((option, id)=>(
                            <Carousel.Item >
                                <div className='row text-white' key={id}>
                                    <div className=''><h5 className='bolder pb-1'>{option.name}<h6>{option.handler}</h6></h5> </div>
                                    <div className = "row justify-content-end" ><div className='col text-start pt-3'><span className="bk-warning2 p-2 rounded-3 px-2" onClick={() => getWithdraws(option.name,option.total,option.investment_id, summ(option.data), option.handler)}>Withdraw</span></div><div className='col text-end'> <h6 className='m-0'>Total Deposit:
                                    <div className = "d-flex flex-row flex m-0 justify-content-end" >< span className='bolder'> { getCurrency(country) } </span>  
                                    <h4 className = "px-1 font-weight-light" > {
                                ((summ(option.data)) * 1000).toLocaleString()
                            } </h4></div ></h6></div><div className='text-end'><h6 className='m-0'>Networth:
                            <div className = "d-flex flex-row flex m-0 justify-content-end" ><span className='bolder'> { getCurrency(country) } </span>  
                            <h4 className = "px-1 font-weight-light m-0" > {
                                option.total.toLocaleString()
                            } </h4></div ></h6></div> </div >
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
    function summ(array) {
        let sum = 0
        array.forEach(item => {
            sum = sum + item
        });
        return sum
    }
    if (portfolioSetting) {
        return (
            <Portfolio changePortfolioSetting = {setPortfolioSetting}
                changeAccountSetting = {setAccountSettings}
                name = {props.name}
                profile = {props.profile}
                handletab5 = {handleTab5}
            />
        )
    }
    const Main = () => {
        return ( 
            <div className = 'px-2'> 
            <div className = 'row bg-white justify-content-center mx-1 py-2 rounded-4'>
            <div className='col-8 p-0'>
            <h6 className = " my-3 lh-1" > Hi there, <br/> <span className = 'bolder' > <h5>{ props.name }</h5> </span>  </h6></div>
            <div className='col-2 text-end p-0' onClick={() => setPortfolioSetting(true)}>
            <FaChartLine className="p-0 mt-2" set='broken' size={20}/><h6 className='small bolder mt-0'>Portfolio</h6></div>
            <div className='col-2 text-end p-0'>
            <img src = {props.profile}
            className = "rounded-circle object-fit-cover mt-2 img-head"
            onClick={() => setAccountSettings()}
            alt = "investors"/> </div> 
            </div>
            <div className='mx-2 p-3 rounded-4 card' onClick = { handleTab5}>
            <h4 className = 'bolder text-white' > Invest <p>Deposit Wallet</p> </h4>
            <div className = 'row' > 
            <div className = 'col-3 text-start' > <div className='mb-3 bolder d-none'><Wallet/></div>
            <span>
            <FaGoogleWallet/> <FaWallet/></span></div> 
            <div className = 'col-9 px-2 rounded-4' >
            <div className = 'd-flex justify-content-end mx-1' >
            <div className = ' text-end pt-2' > 
            <h6 className='small m-0'>Total Deposit 
            <div className = "d-flex flex-row flex justify-content-end" > <p> { getCurrency(country) } </p> <h3 className = "px-1 bolder" > { deposit.toLocaleString() }  
            </h3 > </div ></h6> <h6 className='small mt-2 mb-0'>Total Networth 
            <div className = "d-flex flex-row flex justify-content-end" > <p > { getCurrency(country) } </p> 
            <h3 className = "px-1 bolder" > { networthy().toLocaleString() } </h3></div ></h6> </div > 
            <img src={Grph} alt='graph' width="150" height="100" className='d-none'/> 
            <Chart size = "15" set = 'broken'
            onClick = {
                () => { setGoalSetting(true) }
            }
            className = ' mx-2 icon-padding active warning1 d-none' / > 
            <h6 className = 'mt-2 d-none rounded-3 p-3 px-5 bk-warning '
            onClick = {
                () => { setGoalSetting(true) }
            } > Goals </h6> </div> </div > </div ></div>
            <div className = "bg-lighter my-2 py-2 rounded-4">
            <div className='row m-1'>
            <div className='col-8'></div>
                <div className='col-4'>
                <h6 className='bk-warning rounded-3 px-4' onClick={handleTab5}> Deposit </h6></div>
            </div>
            <div>
                <div className='row justify-content-center m-2 g-2'>
                    <div className='col'>
                    <div className=' text-center p-2 bg-white shadow-sm rounded-3'>
                        <span className='small'>deposits</span>
                        <h4 className='bolder'>{ depositProgress.length }</h4>
                    </div>
                    </div>
                    <div className='col'>
                    <div className=' text-center p-2 bg-white shadow-sm rounded-3'>
                    <span className='small'>withdraws</span>
                    <h4 className='bolder'>{ wwithdraws() }</h4>
                    </div></div>
                    <div className='col'>
                    <div className=' text-center p-2 bg-white shadow-sm rounded-3'>
                    <span className='small'>investments</span>
                    <h4 className='bolder'>{ results.length }</h4>
                    </div></div>
                </div>
            </div>
            <div className = 'd-flex mx-1' > <FaRegLightbulb size = "15" className = 'mt-2 mx-2' / >
            <div className = 'rounded-3 mb-2 wider shadow-sm bg-white light-res-homey' >
            <h6 className = "mx-4 mt-2" > Tips: <p className='bolder' > Dont save your money, invest with Cyanase </p></h6></div > 
            </div ></div>
            <div className=' m-2'>
                {myGoals()}
            </div>
            <div className='d-none rounded-4 m-1 p-1'>
            <h4 className = 'm-3 bolder lh-1' > Investment Classes </h4>
            <MultiCarousel investmentClasses={investment_options} handletab5 = {handleTab5}/></div>
            <div className = 'mt-3 mb-5 mx-2' >
            <Carousel touch={true} interval={4000} controls={false}>
                <Carousel.Item >
                <img src = { Ad }
            className = "rounded-4 text-center"
            width = '100%'
            height = '50%'
            alt = "investors" / >
                </Carousel.Item>
                <Carousel.Item ><img src = { House }
            className = "text-center"
            width = '100%'
            height = '50%'
            alt = "investors" / >
                </Carousel.Item>
            </Carousel>
             </div>
            </div>
        )
    }
    return ( 
        <div className='pb-5'>
        <div className=' bottom-nav py-2'>
        <div className = 'row justify-content-center' >
        <div className = 'col-2 text-center bolder p-0' > 
        <TabNavItem title = { <span className='text-center' > <Home size = {20}
            set = 'broken'
            className = 'mt-2' /><div className='bolder'>Home</div>
            </span >
        }
        onClick = { handleTab1 }
        id = "tab1"
        className = ""
        activeTab = { activeTab }
        setActiveTab1 = { setActiveTab1 }
        /></div > 
        <div className = 'col-2 text-center p-0' >
        <TabNavItem title = { <span className='text-center'> <Download size = {20}
            set = 'broken'
            className = 'mt-2' /><div className='bolder'>Withdra..</div> 
            </span>
        }
        onClick = { handleTab2 }
        id = "tab2"
        activeTab = { activeTab }
        setActiveTab1 = { setActiveTab1 } /> </div > 
        <div className = 'col-3 text-center' >
        <div className='bg-lighter py-3 mx-2 rounded-circle'>
        <TabNavItem title = { <span > <Wallet size = {20}
            set = 'broken' /><div className='bolder d-none'>Deposit</div> </span>
        }
        onClick = { handleTab5 }
        id = "tab5"
        activeTab = { activeTab }
        setActiveTab1 = { setActiveTab1 } /></div > </div>
        <div className = 'col-2 text-center p-0' >
        <TabNavItem title = { <span > <AddUser size = {20}
            set = 'broken'
            className = 'mt-2' /><div className='bolder'>Goals</div> </span>
        }
        onClick = { handleTab3 }
        id = "tab7"
        activeTab = { activeTab }
        setActiveTab1 = { setActiveTab1 }
        /> </div >
        <div className = 'col-2 text-center p-0' >
        <TabNavItem title = { <span > <Setting size = {20}
            set = 'broken'
            className = 'mt-2' /><div className='bolder'>Settings</div> </span>
        }
        onClick = { handleTab8 }
        id = "tab8"
        activeTab = { activeTab }
        setActiveTab1 = { setActiveTab1 }
        /></div > </div ></div> 
        <TabContent id = "tab1"
        activeTab = { activeTab } > <Main parentCallback2 = { handleTab2 }
        / > </TabContent > 
        <TabContent id = "tab2"
        activeTab = { activeTab } > <ResWithdraws handletab5 = {handleTab5} / > </TabContent> 
        <TabContent id = "tab3"
        activeTab = { activeTab } > <Sacco parentCallback = { handleTab12 }
        activeTab = { activeTab }
        setActiveTab1 = { setActiveTab1 }
        / > </TabContent > 
        <TabContent id = "tab4"
        activeTab = { activeTab } > <Club parentCallback1 = { handleTab13 }
        / > </TabContent > 
        <TabContent id = "tab5"
        activeTab = { activeTab } > <Deposit handletab1 = { handleTab1 }
        / > </TabContent > 
        <TabContent id = "tab7"
        activeTab = { activeTab } > <ResGoals profile = {props.profile} / > </TabContent> 
        <TabContent id = "tab8"
        activeTab = { activeTab } > <ResSettings handletab2 = {props.handletab2}/ > </TabContent>
        <TabContent id = "tab9"
        activeTab = { activeTab } > <RiskProfile / > </TabContent> 
        <TabContent id = "tab10"
        activeTab = { activeTab } > <FAQs / > </TabContent>
        <TabContent id = "tab11"
        activeTab = { activeTab } > <Api / > </TabContent>
        <TabContent id = "tab12"
        activeTab = { activeTab } > <Saccos / > </TabContent> 
        <TabContent id = "tab13"
        activeTab = { activeTab } > <Clubs / > </TabContent>
        <TabContent id = "tab15"
        activeTab = { activeTab } > <ContactUs / > </TabContent> 
        </div >
    );
};
const TabNavItem = ({ id, activeTab, title, setActiveTab1 }) => {
    const handleClick = () => {
        setActiveTab1(id);
    };
    return ( <div className = "tab-nav" >
        <span onClick = { handleClick }
        className = { activeTab === id ? "activer" : "" } > { title } </span > </div >
    )
};

export default ResHome;