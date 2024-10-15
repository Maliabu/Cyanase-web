import React, {useState, useEffect} from "react";
import MultiCarousel2 from "../MultiCarousel2";
import { getCurrency } from "../payment/GetCurrency";
import { UserRequests, MainRequests, InvestmentWithdrawRequests } from "../Api/MainRequests";
import ResWithdraw from '../App/ResWithdraw.js'
import Chart from "react-apexcharts";
import RiskProfile from '../images/Group 212.png'
import { FaChartBar, FaRegLightbulb } from "react-icons/fa";
import { ChevronLeft } from "react-iconly";

export default function Portfolio(props){
    const [option_name, setOptionName] = useState("")
    const [groups, setGroups] = useState(0)
    const [investment_id, setInvestmentId] = useState("")
    const [investmentDeposit, setInvestmentDeposit] = useState("");
    const [handler, setHandler] = useState("");
    const [withdrawSetting, setWithdrawSetting] = useState(false);
    const [country, setCountry] = useState([])
    const [graph, setGraph] = useState([])
    const [investmentWithdraw, setInvestmentWithdraw] = useState([])
    const [dates, setDates] = useState([])
    useEffect(() => {
        UserRequests().then(res => {
            setCountry(res.profile.country)
        });
        MainRequests().then(res => {
            setGraph(res[4]);
            setDates(res[5])
        })
        InvestmentWithdrawRequests().then(res => {
            setInvestmentWithdraw(res)
        });
    }, []);
    function summ(array) {
        let sum = 0
        array.forEach(item => {
            sum = sum + item
        });
        return sum
    }
    function getWithdraws(name,networth,investment_id, deposit, handler){
        setOptionName(name)
        setGroups(networth)
        setInvestmentId(investment_id)
        setInvestmentDeposit(deposit)
        setHandler(handler)
        setWithdrawSetting(true)
    }
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
    console.log(results)
    results.forEach(data => {
        data.total = data.networth.reduce((total, value) => total + parseInt(value), 0);
    });
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
    const optionsDoughnut = {
        series: results.map(option => summ(option.data)),
        options: {
            labels: results.map(option => (option.name)),
            chart: {
                type: 'radialBar',
            },
            plotOptions: {
                radialBar: {
                  offsetY: 0,
                  startAngle: 0,
                  endAngle: 270,
                  hollow: {
                    margin: 5,
                    size: '30%',
                    background: 'transparent',
                    image: undefined,
                  },
                  dataLabels: {
                    name: {
                      show: false,
                    },
                    value: {
                      show: false,
                    }
                  },
                  barLabels: {
                    enabled: true,
                    useSeriesColors: true,
                    margin: 8,
                    fontSize: '16px',
                    formatter: function(seriesName, opts) {
                      return seriesName + ":  " + opts.w.globals.series[opts.seriesIndex]
                    },
                  },
                }
              },
            colors: ['#f08101', '#252859', '#1b1e42', '#10122d'],
            // colors: ['#000', '#252859', '#FF9800', '#b7b7b7'],
            responsive: [{
                breakpoint: 480,
                options: {
                    chart: {
                        width: 330
                    },
                    legend: {
                        position: 'right',
                        horizontalAlign: 'left',
                        verticalAlign: 'left'
                    }
                }
            }]
        }
    }
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
            grid: {
                show: false
            },
            toolbar:{
                show: false
            },
            xaxis: {
                title: {
                    text: 'Your Investments Activity'
                },
                labels: {
                    show: false,
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
            colors: ['#f08101', '#252859', '#1b1e42', '#10122d'],
            // colors: [  '#000', '#FF9800', '#252859', '#b7b7b7'],
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
        series: results,
        stroke: {
            curve: 'smooth',
        }
    }
    const myInvestmentsGraph = () => {
        return(
            <div className='px-1 rounded-4 m-2 bluey'>
            <div className = '' > <Chart options = { options.options }
            series = { options.series }
            className = "w-100"
            type = "area"
            height = { 200 }
            /></div></div>
        )
    }
    const myWithdraws = () => {
            return (
                <div className = " text-center m-1 bg-lighter rounded-4 py-3" > 
                <div className="text-start mx-4">
                    <h4 className="bolder">Summary</h4>
                    <h6 className="lh-1 bluey d-none">Your investments activities as tracked by Cyanase Investors. Here find your goals and investment class options</h6>
                </div>
                <Chart options = { optionsDoughnut.options }
                    series = { optionsDoughnut.series }
                    type = "donut" />
                    </div>
            )
    }
    const checkPortfolio = () =>{
        if(graph.length === 0){
            return(<div>
                <div className="p-2 m-2 rounded-4 bg-white">
                <img src={RiskProfile} alt="invest today" width="100%" height="100%"/>
            </div>
            <div className="p-5 text-center rounded-4 bg-light">
            <h6 className='bolder'>Make Deposit</h6>
            <h6>Make your first deposit today and kickstart your investment journey. Get started with your risk Profile and let us know how best we can invest your deposit.</h6>
            <div className="d-flex mt-3">
                <h6 className="bk-warning rounded-3" onClick={props.handletab5}>Deposit</h6>
                <h6 className="bk-warning rounded-3" onClick={props.handletab5}>Complete Risk Profile</h6>
            </div>
            </div>
            </div>
            )
        } else {
            return(
                <div className="p-1">
            <ChevronLeft className="mx-3 text-white" onClick={props.handletab1}/>
                <div className=" rounded-4 m-0">
                <div className="d-flex flex-row mx-2">
                <div className="p-3 bg-lighter rounded-3">
                <h6><span className="bolder">Tips:</span>  Building an emergency fund is cruicial in securing your future</h6></div>
                <FaRegLightbulb size={35} set="broken" className="p-2 bluey rounded-3"/></div>
            <div className="mt-2">
            <MultiCarousel2 data={final_data} country={country} getWithdraws={getWithdraws} getCurrency={getCurrency} summ={summ}/></div>
            <div>{myInvestmentsGraph()}</div></div>
            <div className = "m-2 bg-back p-3 rounded-4">
            <div>
            <h4 className='mx-2 mt-3 bolder text-white'>Activity</h4>
                <div className='row justify-content-center bluey g-2'>
                    <div className='col'>
                    <div className=' text-center rounded-3'>
                        <span className='small text-white'>deposits</span>
                        <h4 className='bolder text-white'>{ props.depositProgress.length }</h4>
                    </div>
                    </div>
                    <div className='col'>
                    <div className=' text-center rounded-3'>
                    <span className='small text-white'>withdraws</span>
                    <h4 className='bolder text-white'>{ props.wwithdraws() }</h4>
                    </div></div>
                    <div className='col'>
                    <div className=' text-center rounded-3'>
                    <span className='small text-white'>goals</span>
                    <h4 className='bolder text-white'>{ props.span.length }</h4>
                    </div></div>
                    <div className='col'>
                    <div className=' text-center rounded-3'>
                    <span className='small text-white'>investments</span>
                    <h4 className='bolder text-white'>{ results.length }</h4>
                    </div></div>
                </div>
            </div></div>
            <div className="m-0">{myWithdraws()}</div>
        </div>
            )
        }
    }
    return(
        <div className="rounded-4">
<div className='py-2 fix-top bg-lighter rounded-bottom-4'>
            <div className = 'row mx-2 justify-content-center'>
            <div className='col-8 p-0'>
            <div className='d-flex'>
            <img src = {props.profile}
            className = "rounded-circle object-fit-cover img-head mt-1"
            onClick={() => props.changeAccountSetting(true)}
            alt = "investors"/><h5 className='m-2 mx-3 bluey d-none'>Hi {props.name}</h5></div></div>
            <div className='col-4 text-end px-2 bluey'><FaChartBar className="p-0 mt-2" set='broken' size={20}/><h6 className=' bolder'>My Portfolio</h6> </div> 
            </div></div>
        <div className=" scroll-y py-5">{checkPortfolio()}</div>
        </div>
    )
}
