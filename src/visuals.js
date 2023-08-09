import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Chart from 'react-apexcharts';
import { deposits } from './data/deposits';
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
    const howMany = deposits.length
    const howManyWithdraw = withdraws.length
    deposits.map(d => (
        values.push(d.deposit),
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
        deposits.map(deposit => (total_withdraws.push(parseInt(deposit.deposit))))
        let sum = 0;
        for (let i = 0; i < total_withdraws.length; i++) {
            if (isNaN(total_withdraws[i])) {
                total_withdraws[i] = 0
            }
            sum += total_withdraws[i];
        }
        return sum
    }
    console.log(dates)
    const deposit = {
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
                    text: 'Deposit Amount in UGX'
                }
            },
            colors: ['#252859', '#E91E63', '#FF9800', '#b7b7b7'],

        },
        series: [{
            data: values
        }],
        xaxis: {
            categories: dates
        },
        // series: [2, 60, 4],
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
        div className = 'col-lg-3 col-sm-8 p-3 mt-3' >
        <
        h3 className = 'bolder' > Total Number of Deposits < /h3></div >
        <
        div className = 'col-lg-2 col-sm-3 p-3 mx-3 rounded-4 mt-3 bg-lighter' >
        <
        h3 className = 'bolder text-center' > { howMany } < /h3></div >
        <
        /div> <
        h3 className = 'bolder text-center my-5' > Total Deposit Amount in UGX: < h2 className = 'font-lighter' > { ddeposit() } < /h2>  < /
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