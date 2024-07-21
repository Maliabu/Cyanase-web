import React, {useState, useEffect} from "react";
import { Home} from "react-iconly";
import MultiCarousel2 from "../MultiCarousel2";
import { getCurrency } from "../payment/GetCurrency";
import { UserRequests, MainRequests, InvestmentWithdrawRequests } from "../Api/MainRequests";
import ResWithdraw from '../App/ResWithdraw.js'
import Chart from "react-apexcharts";
import RiskProfile from '../images/Group 212.png'
import { FaSearch } from "react-icons/fa";

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
                <div className='px-1'>
                    <div className = '' > <Chart options = { options.options }
            series = { options.series }
            className = "w-100"
            type = "area"
            height = { 150 }
            /></div></div>
        )
    }
    const myWithdraws = () => {
        // if (investmentWithdraw.length !== 0){
        // return (<div>
        //         <h5 className="px-2 py-3 mt-3">Your Withdraws</h5>
        //         <div className="scroll-y3">
        //     {investmentWithdraw.map(withdraw => ( 
        //         <div className = 'row p-2 mt-1 bg-white border-bottom'>
        //         <div className = 'col-4 text-start' > <h6 className='bolder'><span className='font-light'>{ getCurrency(country) }</span> <br/> { (withdraw.datas).toLocaleString() } </h6> </div> 
        //         <div className = 'col-7 text-start' > <h6 className=""><span className="text-dark bolder">{withdraw.name} </span><br/> {withdraw.handler}</h6> </div> 
        //         <div className = 'col-1 text-end bolder' > <h6> { withdraw.date } </h6></div> 
        //         </div>
        // ))}</div>
        // </div>
        // )}
        // else {
            return (
                <div className = " text-center my-1 mx-0 bg-white rounded-4 py-3" > 
                <div className="text-start mx-4">
                    <h4 className="bolder">Summary</h4>
                    <h6 className="lh-1">Your investments activities as tracked by Cyanase Investors. Here find your goals and investment class options</h6>
                </div>
                <Chart options = { optionsDoughnut.options }
                    series = { optionsDoughnut.series }
                    type = "donut" />
                    </div >
            )
        // }
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
                <div className="p-2 rounded-4 m-0 bg-white">
            <h4 className="px-3 my-3 bolder lh-1">Investments Portfolio
            <h6 className="small">Investments Activities</h6></h4>
            <div>{myInvestmentsGraph()}</div></div>
            <div className="my-3">
            <MultiCarousel2 data={final_data} country={country} getWithdraws={getWithdraws} getCurrency={getCurrency} summ={summ}/></div>
            <div className="m-0">{myWithdraws()}</div>
        </div>
            )
        }
    }
    return(
        <div className="rounded-4">
        <div className = 'row bg-white justify-content-center py-2 mx-1 rounded-4'>
            <div className='col-1'>
            <FaSearch className='mt-3' size={15}/></div>
            <div className='col-7'>
            <p className = " my-3 lh-1" > Hi there, <br/> <span className = 'bolder' > { props.name } </span>  </p></div>
            <div className='col-2 text-center' onClick={() => props.changePortfolioSetting(false)}>
            <Home className="p-0 mt-2" set='broken' size={20}/><h6 className="bolder small">home</h6></div>
            <div className='col-2'>
            <img src = {props.profile}
            className = "rounded-circle object-fit-cover mt-2 img-head"
            onClick={() => props.changeAccountSetting()}
            alt = "investors"/> </div> 
            </div>
        <div className="bg-lighter">{checkPortfolio()}</div>
        </div>
    )
}
