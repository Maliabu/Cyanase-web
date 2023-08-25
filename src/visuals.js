import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Chart from 'react-apexcharts';
import { deposits,groupedData1 } from './data/deposits';
import { withdraws } from './data/withdraw';

const Visuals = () => {
    const values = []
    const dates = []
    const valuesW = []
    const datesW = []
    const dateConverter = (date) => {
        // date.toString().replaceAll(":", "/")
        const newDate = new Date(date)
        const year = newDate.getFullYear()
        return year
    }
    const groupArrayObject = deposits.reduce((group, obj) => {
        const { date,deposit_amount,updated } = obj;
        if (!group[date]) {
            group[date] = {
                name: date,
                date:updated,
                data:[]
            };
        }
        group[date].data.push(parseInt(deposit_amount))
        return group;
    }, {});
    const result = Object.values(groupArrayObject);
    const howMany = deposits.length
    const howManyWithdraw = withdraws.length
    deposits.map(d => (
        values.push(d.deposit_amount),
        dates.push(dateConverter(d.date))
    ))
    withdraws.map(w => (
        valuesW.push(w.withdraw),
        datesW.push(dateConverter(w.date))
    ))
    const wwithdraw = () => {
        let total_withdraws = []
        withdraws.map(withdraw => (total_withdraws.push(parseInt(withdraw.withdraw))))
        let sum = 0;
        for (let i = 0; i < total_withdraws.length; i++) {
            sum += total_withdraws[i];
        }
        return sum
    }
    const ddeposit = () => {
        let total_withdraws = []
        deposits.map(deposit => (total_withdraws.push(parseInt(deposit.deposit_amount))))
        let sum = 0;
        for (let i = 0; i < total_withdraws.length; i++) {
            if (isNaN(total_withdraws[i])) {
                total_withdraws[i] = 0
            }
            sum += total_withdraws[i];
        }
        return sum.toLocaleString()
    }
    const groupedData = deposits.reduce((result, entry) => {
        const { date, updated, deposit_amount } = entry;
        const existingYear = result.find(item => item.name === date);
        let sum = 0
    
        if (existingYear) {
            const existingMonth = existingYear.data.find(item => item.x === updated);
            if (existingMonth) {
                existingMonth.y.push(Number(deposit_amount));
            } else {
                existingYear.data.push({
                    x:updated,
                    y: [Number(deposit_amount)]
                });
            }
        } else {
            result.push({
                name:date,
                data: [{
                    x:updated,
                    y: [Number(deposit_amount)]
                }],
                total:sum
            });
        }
    
        return result;
    }, []);
    
    groupedData.forEach(yearData => {
        yearData.data.forEach(monthData => {
            monthData.y = monthData.y.reduce((total, value) => total + value, 0);
        });
    });
    let total = 0
    groupedData.forEach(yearData => {
    yearData.total = yearData.data.reduce((total, monthData) => total + monthData.y, 0);
    total += yearData.total
});
    
    console.log(JSON.stringify(groupedData, null, 4));
    const deposit = {
        options: {
            chart: {
                id: 'apexchart-example'
            },
            xaxis: {
                name: '2023',
                title: {
                    text: 'Deposits per year'
                },
                categories: result.map(d=>d.updated),
                // categories: ['jun', 'jul', 'aug'],
            },
            yaxis: {
                title: {
                    text: 'Deposit Amount in UGX'
                }
            },
            colors: ['#252859', '#E91E63', '#FF9800', '#b7b7b7'],

        },
        series: groupedData1,
        // series: [{
        //     name: "testing",
        //     data: [{
        //         x:["a"],
        //         y:[20]
        //     },{
        //         x:["b"],
        //         y:[0]
        //     }]
        // }],
        stroke: {
            curve: 'smooth',
        }
    }
    const withdrawal = {
        options: {
            chart: {
                id: 'apexchart-example'
            },
            xaxis: {
                title: {
                    text: 'Over time'
                },
                categories: [],
                // categories: ['jun', 'jul', 'aug'],
            },
            yaxis: {
                title: {
                    text: 'Withdraw Amount in UGX'
                }
            },
            colors: ['#252859', '#E91E63', '#FF9800', '#b7b7b7'],

        },
        series: [{
            data: valuesW
        }],
        xaxis: {
            categories: datesW
        },
        // series: [2, 60, 4],
        stroke: {
            curve: 'smooth',
        }
    }
    return ( <
        div className = 'p-lg-5 p-3' >
        <
        h1 className = 'p-lg-5 p-3' > Cyanase Data Visuals
        for deposits, withdraws and user activity < /h1><
        h2 className = 'p-lg-5 p-2 active bolder' > Deposit Activity < /h2><
        div className = 'bg-lighter p-2 p-lg-5' > <
        Chart options = { deposit.options }
        series = { deposit.series }
        className = "w-100"
        type = "area"
        height = { 500 }
        /></div >
        <
        div className = 'row p-lg-4 p-2 border-top border-bottom' >
        <
        div className = 'col-lg-5 col-sm-8 p-3 mt-3' >
        <
        h3 className = 'bolder' > Total Number of Deposits < /h3></div >
        <
        div className = 'col-lg-2 col-sm-3 p-3 mx-3 rounded-4 mt-3 bg-lighter' >
        <
        h3 className = 'bolder text-center' > { howMany } < /h3></div >
        <
        /div> 
        <div className='row p-3'>
            {
                groupedData.map(data=>(
                    <div className='col p-2'><h4 className='bolder'>Total deposit for {data.name}</h4><h4 className='font-lighter'>UGX {(data.total).toLocaleString()}</h4></div>
                ))
            }
        </div>
        <
        h3 className = 'bolder text-center my-5' > Total Deposit Amount in UGX: < h2 className = 'font-lighter' > { total.toLocaleString() } < /h2>  < /
        h3 > <
        h2 className = 'p-lg-5 active bolder' > Withdraw Activity < /h2><
        div className = 'bg-lighter p-lg-5' > <
        Chart options = { withdrawal.options }
        series = { withdrawal.series }
        className = "w-100"
        type = "area"
        height = { 500 }
        /></div >
        <
        div className = 'row p-lg-4 p-3 border-top border-bottom' >
        <
        div className = 'col-lg-3 col-sm-8 p-3 mt-3' >
        <
        h3 className = 'bolder' > Total Number of Withdraws < /h3></div >
        <
        div className = 'col-lg-2 col-sm-3 p-3 mx-3 rounded-4 mt-3 bg-lighter' >
        <
        h3 className = 'bolder text-center' > { howManyWithdraw } < /h3></div >
        <
        /div> <
        h3 className = 'bolder text-center my-5' > Total Withdraw Amount in UGX: < h2 className = 'font-lighter' > { wwithdraw() } < /h2>   < /
        h3 > < /
        div >
    );
}
export default Visuals;