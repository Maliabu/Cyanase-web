import { MainRequests, PersonalRequests, Networth, UserRequests } from '../Api/MainRequests';
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
import Notify from '../Accounts/Notify';
import { PROFILE_PHOTO } from '../apis';
import TabContent from "../Accounts/TabContent";
import ContactUs from '../Accounts/ContactUs';
import FAQs from '../Accounts/FAQs';
import Chart from 'react-apexcharts';
import Saccos from '../Accounts/Saccos';
import Clubs from '../Accounts/Clubs';
import Ad from '../images/Group 212.png';
import ResWithdraws from './ResWithdraws'
import ResGoals from './ResGoals'
import { getCurrency } from '../payment/GetCurrency';
import { FaLightbulb } from 'react-icons/fa';
import { Home, Notification, Wallet, Setting, Work, TimeCircle, Download } from 'react-iconly';

const ResHome = (props) => {
    const [activeTab, setActiveTab1] = useState("tab1");
    const [goalSetting, setGoalSetting] = useState(false);
    const [withdrawSetting, setWithdrawSetting] = useState(false);
    const [span, setSpan] = useState([])
    const [deposit, setDeposit] = useState(0);
    const [index, setIndex] = useState(0);
    const [dollar, setDollar] = useState(0);
    const [graph, setGraph] = useState([])
    const [country, setCountry] = useState([])
    const [dates, setDates] = useState([])
    const [networth, setDepositNetworth] = useState(0);
    const [dollarNetworth, setDollarNetworth] = useState(0);
    let thisYear = new Date().getFullYear()
    const groupArrayObject = graph.reduce((group, obj) => {
        const { name, datas, date } = obj;
        if (!group[name]) {
            group[name] = {
                date: date,
                name: name,
                data: []
            };
        }
        group[name].data.push(datas);
        return group;
    }, {});
    const result = Object.values(groupArrayObject);
    const options = {
        options: {
            chart: {
                type: "area",
                stacked: false,
                height: 350,
                zoom: {
                    type: "x",
                    enabled: true,
                    autoScaleYaxis: true
                },
                toolbar: {
                    autoSelected: "zoom"
                }
            },
            dataLabels: {
                enabled: false
            },
            markers: {
                size: 0
            },
            xaxis: {
                title: {
                    text: 'Investments for ' + thisYear
                },
                categories: dates,
                // categories: ['jun', 'jul', 'aug'],
            },
            yaxis: {
                show: false,
                title: {
                    text: 'In Thousands(000) of ' + getCurrency(country)
                }
            },
            colors: ['#252859', '#E91E63', '#FF9800', '#b7b7b7'],
            fill: {
                type: "gradient",
                gradient: {
                    shadeIntensity: 1,
                    inverseColors: false,
                    opacityFrom: 0.5,
                    opacityTo: 0,
                    stops: [0, 90, 100]
                }
            },
        },
        // series: result,
        series: result,
        stroke: {
            curve: 'smooth',
        }
    }
    useEffect(() => {
        PersonalRequests().then(res => {
            setSpan(res[2]); // array(14)
        });
        MainRequests().then(res => {
            setDeposit(res[0]);
            setDollar(res[1]);
            setGraph(res[4]);
            setDollarNetworth(res[3]);
            setDates(res[5])
        })
        Networth().then(res => {
            setDepositNetworth(res[2]);
        })
        UserRequests().then(res => {
            setCountry(res.profile.country)
        });
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
    if (withdrawSetting) {
        return ( < ResWithdraw changeWithdrawSetting = { setWithdrawSetting }
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
    const myInvestments = () => {
        let nextResult = result.reverse()
        if (result.length === 0) {
            return(
                <div><p>no data</p></div>
            )
        } else{
            return(
                nextResult.map(option=>(
                    <div className="carousel-item"><p className='bolder'>Your Investment Classes</p>
                </div>
                ))
            )
        }
    }
    function summ(array) {
        let sum = 0
        array.forEach(item => {
            sum = sum + item
        });
        return sum
    }
      
    const handleSelect = (selectedIndex) => {
          setIndex(selectedIndex);
    }
    const Main = () => {
        return ( < div className = 'p-1 bg-lighter res-home' > < div className = "bg-white text-dark p-2 rounded-4" >
            <
            div className = 'd-flex mt-2' >
            <
            div className = 'rounded-4 bg-lighter wider' >
            <
            p className = "text-end mx-4 mt-2" > welcome back < span className = 'bolder' > { props.name } < /span> <
            span className = " justify-content-center" > <
            span className = "px-1" > pick up where you left off < /span></span > < /p>< /
            div > <
            // img src = "http://127.0.0.1:8000/static/photo.png"
            img src = {PROFILE_PHOTO}
            className = "rounded-circle object-fit-cover mx-2 mt-2 img-head"
            alt = "investors" / > < /
            div >
            <div className='p-2 d-none'>
                <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
                    <div class="carousel-inner bg-lighter rounded-3 p-3">
                        {
                            result.reverse().map((option, index)=>(
                                <div className={index === 0 ? "carousel-item active":"carousel-item"}><
                        div className = "row text-dark" >
                        <
                        div className = "col-6" > < h6 className = "bolder" > { option.name } < /h6> < /
                        div >
                        <
                        div className = "col" > < h6 className = "bolder active" > Rate: {
                            (option.data).length
                        } < /h6> < /div > <
                        div className = "col" > < h6 className = "bolder" > Total: { getCurrency(country) } {
                            (((summ(option.data)) * 1000).toFixed(0)).toLocaleString()
                        } < /h6> < /div > < /
                        div ></div>
                            ))
                        }
                    </div>
                    <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="sr-only d-none">Previous</span>
  </a>
  <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="sr-only d-none">Next</span>
  </a>
                </div>
            </div>
            <div className='p-4 mt-2 bg-light rounded-4'>
            <Carousel touch={true} interval={null} controls={false}>
                {
                    result.map((option, index)=>(
                        <Carousel.Item>
                            <div className='row text-dark'>
                                <div className='col-6'><p className='bolder'>{option.name}</p></div>
                                <
                        div className = "col" > < h6 className = "bolder active" > Rate: {
                            (option.data).length
                        } < /h6> < /div > <
                        div className = "col" > < h6 className = "bolder" > Total: { getCurrency(country) } {
                            (((summ(option.data)) * 1000).toFixed(0)).toLocaleString()
                        } < /h6> < /div >
                            </div>
                        </Carousel.Item>
                    ))
                }
            </Carousel></div>
            <
            div className = 'row' > <
            div className = 'col text-start' > <
            p className = ' mx-3 mt-2' > Your Investments < /p > < /div > <
            div className = 'col d-none' >
            <
            div className = 'd-flex justify-content-end mx-1' > < TimeCircle size = "medium"
            set = 'broken'
            onClick = {
                () => { setGoalSetting(true) }
            }
            className = ' mx-2 icon-padding rounded-circle active warning light-res-home ' / > < h6 className = 'mt-2 d-none rounded-3 p-3 px-5 bk-warning '
            onClick = {
                () => { setGoalSetting(true) }
            } >
            Goals < /h6> < /
            div > < /
            div > < /div >  <
            div className = 'blue-darks d-flex rounded-4' >
            <
            span className = 'text-center rounded-4 wide-60' > <
            p className = "bolder mt-3" > < Wallet size = "medium"
            className = 'text-warning d-none' /
            >
            <
            br / > Deposit <
            div className = "d-flex flex-row flex justify-content-center" > < p className = 'active' > { getCurrency(country) } < /p> < h2 className = "px-1 font-lighter" > { deposit - depositTotal }  < /
            h2 > < /div > < /p > < /span > < span className = 'py-4' > < h6 className = 'mt-2 rounded-3 p-3 px-4 warning '
            onClick = {
                handleTab5
            } >
            Deposit < /h6> </span > < /
            div >

            <
            div className = '' > <
            Chart options = { options.options }
            series = { options.series }
            className = "w-100 bg-white rounded-3 mt-2"
            type = "area"
            height = { 200 }
            /></div > <
            div className = 'blue-darks mt-2 d-flex rounded-4' >
            <
            span className = ' rounded-4 wide-60 mx-1' > <
            p className = "bolder mt-3 text-center" > < Work size = "15"
            set = 'broken'
            className = 'text-warning d-none' /
            >
            <
            br / > Networth <
            div className = "d-flex flex-row flex justify-content-center" > < p className = 'active' > { getCurrency(country) } < /p> <
            h2 className = "px-1 font-lighter" > { networth } < /h2></div > < /p>  < /span > < span className = 'py-4' > < h6 className = 'mt-2 rounded-3 p-3 px-3 warning '
            onClick = {
                () => { setWithdrawSetting(true) }
            } >
            Withdraw < /h6> </span > < /
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
            h5 className = "px-1" > { dollar } < /h5></div > < /p> < /span > <
            span className = 'shadow-lg rounded-4 wide-60 mx-1' > <
            p className = "bolder text-center mt-2" > < Work size = "15"
            className = 'text-warning d-none' /
            >
            <
            br / > Networth <
            div className = "d-flex flex-row flex justify-content-center" > < p className = 'text-warning' > USD < /p> <
            h5 className = "px-1" > { dollarNetworth } < /h5></div > < /p>  < /span > < /
            div >
            <
            div className = 'd-flex mt-2' > < FaLightbulb size = "35"
            className = 'mt-3 mx-2 p-2 rounded-circle light-res-home active' / >
            <
            div className = 'rounded-4 bg-lighter wider' >
            <
            p className = "mx-4 mt-2" > Tips: <
            div className = " justify-content-center" > <
            span className = "px-1" > Dont save your money, invest < /span></div > < /p>< /
            div > < /
            div >
            <
            /
            div >
            <
            p className = 'mx-3 bolder my-3 d-none' > Recent Activity < /p> <
            div className = "row mt-3 d-none px-2 bg-lighter rounded-3 mx-1 " > <
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
            div className = 'bg-light my-5 shadow rounded-4 mt-2 p-2 ' >
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
        div className = 'd-flex flex-row text-dark rounded-right rounded-4 d-block justify-content-center bg-lighter bottom-nav' >
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
        div className = ' py-3 text-center mx-3' >
        <
        TabNavItem title = { < span > < Download size = "20"
            set = 'broken'
            className = 'mt-2' / > < /span>
        }
        onClick = { handleTab2 }
        id = "tab2"
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
        setActiveTab1 = { setActiveTab1 } > < /
        TabNavItem > < /
        div > <
        div className = ' py-3 text-center mx-3' >
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
        div className = ' py-3 text-center' >
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
        activeTab = { activeTab } > < ResWithdraws / > < /TabContent> <
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
    return ( < div className = "px-3 tab-nav" >
        <
        span onClick = { handleClick }
        className = { activeTab === id ? "activer" : "" } > { title } < /
        span > < /
        div >
    )
};

export default ResHome;