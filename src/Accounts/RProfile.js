import React, { useState } from "react";
import '../App.css';
import { FaRegWindowClose, FaUserEdit } from 'react-icons/fa';
import Form from 'react-bootstrap/Form';
import RiskProfile from '../images/10 Top Reasons Why Vendor Engagement Fails - 31West.png';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Table from 'react-bootstrap/Table';

const RProfile = () => {
    const Learn12 = () => {
        return ( <
            div className = " p-5 text-center blue-dark" > <
            img src = { RiskProfile }
            width = '50%'
            height = '30%'
            alt = "investors" / > <
            h4 className = "bolder my-3" > RISK PROFILE < /h4> <
            h6 className = "mt-5 text-warning" > Done < /h6>  <
            h6 className = "my-5" > You have successfully submitted your Risk Profile, you can now proceed as a more professional investor <
            /h6> < /div >
        )
    }
    const Learn11 = () => {
        return ( <
            div className = " py-5 mt-5" > <
            FaUserEdit className = "text-warning p-2 mx-5 px-2 border border-warning rounded-25"
            size = "50" / > <
            h5 className = "my-3 text-warning mx-5 px-2" > Risk Profile < /h5> <
            div >
            <
            h4 className = "blue-light mx-5 px-2" > Considering the < span className = "bolder" > negative impact of inflation on your Savings, < /span>growth investing if often used to counteract its effect, while 
            exposing you to short - term volatility. ? < /
            h4 > <
            h4 className = "blue-light mx-5 px-2" > Which of the following options best resonates you ? < /
            h4 > <
            div className = "blue-dark py-4 px-5 mt-4" >
            <
            div className = "py-4"
            key = "default-checkbox" >
            <
            Form >
            <
            Form.Check label = "I am comfortable with the arrangement to beat inflation"
            type = "checkbox"
            required id = "default-checkbox" /
            >
            <
            Form.Check label = "I know the risks associated with Inflation, but I would prefer middle ground"
            className = "mt-3"
            type = "checkbox"
            required id = "default-checkbox" /
            >
            <
            Form.Check label = "It could reduce my savings but I have no tolerance for Loss"
            className = "mt-3"
            type = "checkbox"
            required id = "default-checkbox" /
            >
            <
            /
            Form > < /
            div > < /
            div > <
            div className = "row px-5 rounded-25 mt-3" >
            <
            p className = "text-end" > Progress : { i }
            /11</p >
            <
            ProgressBar now = { getPercentage }
            className = "p-bar"
            variant = "warning" /
            >
            <
            h6 className = "p-3 mt-3 bg-warning text-center rounded-25"
            onClick = {
                () => { setStep(step + 1) }
            }
            type = "submit" > Submit < /h6> <
            h6 className = "p-3 border border-warning rounded-25 text-center text-warning"
            onClick = {
                () => { setStep(step - 1) }
            }
            type = "submit" > Previous < /h6> < /
            div > < /
            div > < /div >
        )
    }
    const Learn10 = () => {
        return ( <
            div className = " py-5 mt-5" > <
            FaUserEdit className = "text-warning p-2 mx-5 px-2 border border-warning rounded-25"
            size = "50" / > <
            h5 className = "my-3 text-warning mx-5 px-2" > Risk Profile < /h5> <
            div >
            <
            h4 className = "blue-light mx-5 px-2" > Would you consider borrowing money to make a future < span className = "bolder" > Investment < /span> ? < /
            h4 > <
            div className = "blue-dark py-4 px-5 mt-4" >
            <
            div className = "py-4"
            key = "default-checkbox" >
            <
            Form >
            <
            Form.Check label = "Yes"
            type = "checkbox"
            required id = "default-checkbox" /
            >
            <
            Form.Check label = "No"
            className = "mt-3"
            type = "checkbox"
            required id = "default-checkbox" /
            >
            <
            /
            Form > < /
            div > < /
            div > <
            div className = "row px-5 rounded-25 mt-3" >
            <
            p className = "text-end" > Progress: { i }
            /11</p >
            <
            ProgressBar now = { getPercentage }
            min = { 0 }
            max = { 100 }
            variant = "warning" /
            >
            <
            h6 className = "p-3 mt-3 border border-warning rounded-25 text-center text-warning"
            onClick = {
                () => { setStep(step + 1) }
            }
            type = "submit" > Next < /h6> <
            h6 className = "p-3 border border-warning rounded-25 text-center text-warning"
            onClick = {
                () => { setStep(step - 1) }
            }
            type = "submit" > Previous < /h6> < /
            div > < /
            div > < /div >
        )
    }
    const Learn9 = () => {
        return ( <
            div className = " py-5 mt-5" > <
            FaUserEdit className = "text-warning p-2 mx-5 px-2 border border-warning rounded-25"
            size = "50" / > <
            h5 className = "my-3 text-warning mx-5 px-2" > Risk Profile < /h5> <
            div >
            <
            h4 className = "blue-light mx-5 px-2" > Do you feel you are appropriately covered against < span className = "bolder" > Personal and / or business risks, < /span>such as accidents, Illness, trauma 
            or death ? < /
            h4 > <
            div className = "blue-dark py-4 px-5 mt-4" >
            <
            div className = "py-4"
            key = "default-checkbox" >
            <
            Form >
            <
            Form.Check label = "Yes"
            type = "checkbox"
            required id = "default-checkbox" /
            >
            <
            Form.Check label = "No"
            className = "mt-3"
            type = "checkbox"
            required id = "default-checkbox" /
            >
            <
            /
            Form > < /
            div > < /
            div > <
            div className = "row px-5 rounded-25 mt-3" >
            <
            p className = "text-end" > Progress : { i }
            /11</p >
            <
            ProgressBar now = { getPercentage }
            variant = "warning" /
            >
            <
            h6 className = "p-3 mt-3 border border-warning rounded-25 text-center text-warning"
            onClick = {
                () => { setStep(step + 1) }
            }
            type = "submit" > Next < /h6> <
            h6 className = "p-3 border border-warning rounded-25 text-center text-warning"
            onClick = {
                () => { setStep(step - 1) }
            }
            type = "submit" > Previous < /h6> < /
            div > < /
            div > < /div >
        )
    }
    const Learn8 = () => {
        return ( <
            div className = " py-5 mt-5" > <
            FaUserEdit className = "text-warning p-2 mx-5 px-2 border border-warning rounded-25"
            size = "50" / > <
            h5 className = "my-3 text-warning mx-5 px-2" > Risk Profile < /h5> <
            div >
            <
            h4 className = "blue-light mx-5 px-2" > The table below shows the < span className = "bolder" > highest one - year gain and One - year loss on five different hypothetical Investments of $10, 000. < /span>  < /
            h4 >
            <
            h4 className = "blue-light mx-5 px-2" > Given the potential Profit / Loss, where would you < span className = "bolder" > invest your money < /span> ? < /
            h4 > < div className = "mx-5 mt-3" >
            <
            Table striped className = "text-center" >
            <
            thead >
            <
            tr > <
            th > Portfolio < /th> <
            th > Highest Gain < /th> <
            th > Highest Loss < /th> < /
            tr > <
            /thead> <
            tbody >
            <
            tr > <
            td > A < /td> <
            td > $1000 < /td> <
            td > $200 < /td> < /
            tr > <
            tr > <
            td > B < /td> <
            td > $1500 < /td> <
            td > $450 < /td> < /
            tr > <
            tr > <
            td > C < /td> <
            td > $2500 < /td><
            td > $1200 < /td> < /
            tr > <
            tr > <
            td > D < /td> <
            td > $4000 < /td> <
            td > $2200 < /td>< /
            tr > <
            /tbody> < /
            Table > < /div> <
            div className = "blue-dark py-4 px-5 mt-4" >
            <
            div className = "py-4"
            key = "default-checkbox" >
            <
            Form >
            <
            Form.Check label = "A"
            type = "checkbox"
            required id = "default-checkbox" /
            >
            <
            Form.Check label = "B"
            className = "mt-3"
            type = "checkbox"
            required id = "default-checkbox" /
            >
            <
            Form.Check label = "C"
            className = "mt-3"
            type = "checkbox"
            required id = "default-checkbox" /
            >
            <
            Form.Check label = "D"
            className = "mt-3"
            type = "checkbox"
            required id = "default-checkbox" /
            >
            <
            /
            Form > < /
            div > < /
            div > <
            div className = "row px-5 rounded-25 mt-3" >
            <
            p className = "text-end" > Progress: { i }
            /11</p >
            <
            ProgressBar now = { getPercentage }
            variant = "warning" /
            >
            <
            h6 className = "p-3 mt-3 border border-warning rounded-25 text-center text-warning"
            onClick = {
                () => { setStep(step + 1) }
            }
            type = "submit" > Next < /h6> <
            h6 className = "p-3 border border-warning rounded-25 text-center text-warning"
            onClick = {
                () => { setStep(step - 1) }
            }
            type = "submit" > Previous < /h6> < /
            div > < /
            div > < /div >
        )
    }
    const Learn7 = () => {
        return ( <
            div className = " py-5 mt-5" > <
            FaUserEdit className = "text-warning p-2 mx-5 px-2 border border-warning rounded-25"
            size = "50" / > <
            h5 className = "my-3 text-warning mx-5 px-2" > Risk Profile < /h5> <
            div >
            <
            h4 className = "blue-light mx-5 px-2" > Tax savings, in some instances, can be obtained from investments albeit taking on more risk. < /
            h4 >
            <
            h4 className = "blue-light mx-5 px-2" > Which of the following best describes your < span className = "bolder" > Goal < /span> ? < /
            h4 > <
            div className = "blue-dark py-4 px-5 mt-4" >
            <
            div className = "py-4"
            key = "default-checkbox" >
            <
            Form >
            <
            Form.Check label = "Preferably guaranteed returns, Before Tax Savings"
            type = "checkbox"
            required id = "default-checkbox" /
            >
            <
            Form.Check label = "Stable, reliable returns, Minimal Tax Savings"
            className = "mt-3"
            type = "checkbox"
            required id = "default-checkbox" /
            >
            <
            Form.Check label = "Moderate Variability in returns, Reasonable Tax Savings"
            className = "mt-3"
            type = "checkbox"
            required id = "default-checkbox" /
            >
            <
            Form.Check label = "Unstable but potentially high returns, Maximize Tax Savings"
            className = "mt-3"
            type = "checkbox"
            required id = "default-checkbox" /
            >
            <
            /
            Form > < /
            div > < /
            div > <
            div className = "row px-5 rounded-25 mt-3" >
            <
            p className = "text-end" > Progress: { i }
            /11</p >
            <
            ProgressBar now = { getPercentage }
            variant = "warning" /
            >
            <
            h6 className = "p-3 mt-3 border border-warning rounded-25 text-center text-warning"
            onClick = {
                () => { setStep(step + 1) }
            }
            type = "submit" > Next < /h6> <
            h6 className = "p-3 border border-warning rounded-25 text-center text-warning"
            onClick = {
                () => { setStep(step - 1) }
            }
            type = "submit" > Previous < /h6> < /
            div > < /
            div > < /div >
        )
    }
    const Learn6 = () => {
        return ( <
            div className = " py-5 mt-5" > <
            FaUserEdit className = "text-warning p-2 mx-5 px-2 border border-warning rounded-25"
            size = "50" / > <
            h5 className = "my-3 text-warning mx-5 px-2" > Risk Profile < /h5> <
            div >
            <
            h4 className = "blue-light mx-5 px-2" > What are your < span className = "bolder" > Source of Funds < /span> ? < /
            h4 > <
            div className = "blue-dark py-4 px-5 mt-4" >
            <
            div className = "py-4"
            key = "default-checkbox" >
            <
            Form >
            <
            Form.Check label = "Employment"
            type = "checkbox"
            required id = "default-checkbox" /
            >
            <
            Form.Check label = "Inheritence/Gift"
            className = "mt-3"
            type = "checkbox"
            required id = "default-checkbox" /
            >
            <
            Form.Check label = "Savings/Superannuation"
            className = "mt-3"
            type = "checkbox"
            required id = "default-checkbox" /
            >
            <
            Form.Check label = "Other"
            className = "mt-3"
            type = "checkbox"
            required id = "default-checkbox" /
            >
            <
            /
            Form > < /
            div > < /
            div > <
            div className = "row px-5 rounded-25 mt-3" >
            <
            p className = "text-end" > Progress: { i }
            /11</p >
            <
            ProgressBar now = { getPercentage }
            variant = "warning" /
            >
            <
            h6 className = "p-3 mt-3 border border-warning rounded-25 text-center text-warning"
            onClick = {
                () => { setStep(step + 1) }
            }
            type = "submit" > Next < /h6> <
            h6 className = "p-3 border border-warning rounded-25 text-center text-warning"
            onClick = {
                () => { setStep(step - 1) }
            }
            type = "submit" > Previous < /h6> < /
            div > < /
            div > < /div >
        )
    }
    const Learn5 = () => {
        return ( <
            div className = " py-5 mt-5" > <
            FaUserEdit className = "text-warning p-2 mx-5 px-2 border border-warning rounded-25"
            size = "50" / > <
            h5 className = "my-3 text-warning mx-5 px-2" > Risk Profile < /h5> <
            div >
            <
            h4 className = "blue-light mx-5 px-2" > How mucn < span className = "bolder" > Capital < /span> are you considering <span className = "bolder">to Invest</span > ? < /
            h4 > <
            div className = "blue-dark py-4 px-5 mt-4" >
            <
            div className = "py-4"
            key = "default-checkbox" >
            <
            Form >
            <
            Form.Check label = "$1k - $2k"
            type = "checkbox"
            required id = "default-checkbox" /
            >
            <
            Form.Check label = "$2k - $5k"
            className = "mt-3"
            type = "checkbox"
            required id = "default-checkbox" /
            >
            <
            Form.Check label = "$5k - $10k"
            className = "mt-3"
            type = "checkbox"
            required id = "default-checkbox" /
            >
            <
            Form.Check label = "> $10k"
            className = "mt-3"
            type = "checkbox"
            required id = "default-checkbox" /
            >
            <
            /
            Form > < /
            div > < /
            div > <
            div className = "row px-5 rounded-25 mt-3" >
            <
            p className = "text-end" > Progress : { i }
            /11</p >
            <
            ProgressBar now = { getPercentage }
            variant = "warning" /
            >
            <
            h6 className = "p-3 mt-3 border border-warning rounded-25 text-center text-warning"
            onClick = {
                () => { setStep(step + 1) }
            }
            type = "submit" > Next < /h6> <
            h6 className = "p-3 border border-warning rounded-25 text-center text-warning"
            onClick = {
                () => { setStep(step - 1) }
            }
            type = "submit" > Previous < /h6> < /
            div > < /
            div > < /div >
        )
    }
    const Learn4 = () => {
        return ( <
            div className = " py-5 mt-5" > <
            FaUserEdit className = "text-warning p-2 mx-5 px-2 border border-warning rounded-25"
            size = "50" / > <
            h5 className = "my-3 text-warning mx-5 px-2" > Risk Profile < /h5> <
            div >
            <
            h4 className = "blue-light mx-5 px-2" > What would you hold as < span className = "bolder" > Maximun Loss to your Portfolio < /span> ? < /
            h4 > <
            div className = "blue-dark py-4 px-5 mt-4" >
            <
            div className = "py-4"
            key = "default-checkbox" >
            <
            Form >
            <
            Form.Check label = "< 10%"
            type = "checkbox"
            required id = "default-checkbox" /
            >
            <
            Form.Check label = "10 - 15%"
            className = "mt-3"
            type = "checkbox"
            required id = "default-checkbox" /
            >
            <
            Form.Check label = "15 - 20%"
            className = "mt-3"
            type = "checkbox"
            required id = "default-checkbox" /
            >
            <
            Form.Check label = "Up to 25%"
            className = "mt-3"
            type = "checkbox"
            required id = "default-checkbox" /
            >
            <
            /
            Form > < /
            div > < /
            div > <
            div className = "row px-5 rounded-25 mt-3" >
            <
            p className = "text-end" > Progress: { i }
            /11</p >
            <
            ProgressBar now = { getPercentage }
            variant = "warning" /
            >
            <
            h6 className = "p-3 mt-3 border border-warning rounded-25 text-center text-warning"
            onClick = {
                () => { setStep(step + 1) }
            }
            type = "submit" > Next < /h6> <
            h6 className = "p-3 border border-warning rounded-25 text-center text-warning"
            onClick = {
                () => { setStep(step - 1) }
            }
            type = "submit" > Previous < /h6> < /
            div > < /
            div > < /div >
        )
    }
    const Learn3 = () => {
        return ( <
            div className = " py-5 mt-5" > <
            FaUserEdit className = "text-warning p-2 mx-5 px-2 border border-warning rounded-25"
            size = "50" / > <
            h5 className = "my-3 text-warning mx-5 px-2" > Risk Profile < /h5> <
            div >
            <
            h4 className = "blue-light mx-5 px-2" > Where have you < span className = "bolder" > Invested in the Past ? < /span> ? < /
            h4 > <
            div className = "blue-dark py-4 px-5 mt-4" >
            <
            div className = "py-4"
            key = "default-checkbox" >
            <
            Form >
            <
            Form.Check label = "Treasuries"
            type = "checkbox"
            required id = "default-checkbox" /
            >
            <
            Form.Check label = "Credit"
            className = "mt-3"
            type = "checkbox"
            required id = "default-checkbox" /
            >
            <
            Form.Check label = "Alternatives"
            className = "mt-3"
            type = "checkbox"
            required id = "default-checkbox" /
            >
            <
            Form.Check label = "Listed Equities"
            className = "mt-3"
            type = "checkbox"
            required id = "default-checkbox" /
            >
            <
            /
            Form > < /
            div > < /
            div > <
            div className = "row px-5 rounded-25 mt-3" >
            <
            p className = "text-end" > Progress : { i }
            /11</p >
            <
            ProgressBar now = { getPercentage }
            variant = "warning" /
            >
            <
            h6 className = "p-3 mt-3 border border-warning rounded-25 text-center text-warning"
            onClick = {
                () => { setStep(step + 1) }
            }
            type = "submit" > Next < /h6> <
            h6 className = "p-3 border border-warning rounded-25 text-center text-warning"
            onClick = {
                () => { setStep(step - 1) }
            }
            type = "submit" > Previous < /h6> < /
            div > < /
            div > < /div >
        )
    }
    const Learn1 = () => {
        return ( <
            div className = " py-5 mt-lg-5" >
            <
            RPHeader / > <
            div >
            <
            h4 className = "blue-light mx-lg-5 mx-3 px-2" > What are your < span className = "bolder" > objectives
            for Investing < /span> ? < /
            h4 > <
            div className = "blue-dark py-4 px-5 mt-4" >
            <
            div className = "py-4"
            key = "default-checkbox" >
            <
            Form >
            <
            Form.Check label = "Saving"
            type = "checkbox"
            required id = "default-checkbox" /
            >
            <
            Form.Check label = "Retirement"
            className = "mt-3"
            type = "checkbox"
            required id = "default-checkbox" /
            >
            <
            Form.Check label = "Capital Preservation"
            className = "mt-3"
            type = "checkbox"
            required id = "default-checkbox" /
            >
            <
            Form.Check label = "Profit Generation"
            className = "mt-3"
            type = "checkbox"
            required id = "default-checkbox" /
            >
            <
            /
            Form > < /
            div > < /
            div > <
            div className = "row px-5 rounded-25 mt-3" >
            <
            p className = "text-end" > Progress: { i }
            /11</p >
            <
            ProgressBar now = { getPercentage }
            variant = "warning" /
            >
            <
            h6 className = "p-3 mt-3 border border-warning rounded-25 text-center text-warning"
            onClick = {
                () => { setStep(step + 1) }
            }
            type = "submit" > Next < /h6> <
            h6 className = "p-3 border border-warning rounded-25 text-center text-warning"
            onClick = {
                () => { setStep(step - 1) }
            }
            type = "submit" > Previous < /h6> < /
            div > < /
            div > < /div >
        )
    }
    const Learn2 = () => {
        return ( <
            div className = " py-5 mt-5" > <
            FaUserEdit className = "text-warning p-2 mx-5 px-2 border border-warning rounded-25"
            size = "50" / > <
            h5 className = "my-3 text-warning mx-5 px-2" > Risk Profile < /h5> <
            div >
            <
            h4 className = "blue-light mx-5 px-2" > What is your < span className = "bolder" > Investment Time Horizon < /span> ? < /
            h4 > <
            div className = "blue-dark py-4 px-5 mt-4" >
            <
            div className = "py-4"
            key = "default-checkbox" >
            <
            Form >
            <
            Form.Check label = "< 1 year"
            type = "checkbox"
            required id = "default-checkbox" /
            >
            <
            Form.Check label = "1 - 2 years"
            className = "mt-3"
            type = "checkbox"
            required id = "default-checkbox" /
            >
            <
            Form.Check label = "2 - 5 years"
            className = "mt-3"
            type = "checkbox"
            required id = "default-checkbox" /
            >
            <
            Form.Check label = "> 5 years"
            className = "mt-3"
            type = "checkbox"
            required id = "default-checkbox" /
            >
            <
            /
            Form > < /
            div > < /
            div > <
            div className = "row px-5 rounded-25 mt-3" >
            <
            p className = "text-end" > Progress: { i }
            /11</p >
            <
            ProgressBar now = { getPercentage }
            variant = "warning" /
            >
            <
            h6 className = "p-3 mt-3 border border-warning rounded-25 text-center text-warning"
            onClick = {
                () => { setStep(step + 1) }
            }
            type = "submit" > Next < /h6> <
            h6 className = "p-3 border border-warning rounded-25 text-center text-warning"
            onClick = {
                () => { setStep(step - 1) }
            }
            type = "submit" > Previous < /h6> < /
            div > < /
            div > < /div >
        )
    }
    const RPHeader = () => {
        return ( < div > < div className = "row" >
            <
            div className = "col-6" > <
            FaUserEdit className = "text-warning p-2 mx-lg-5 mx-3 px-2 border border-warning rounded-25"
            size = "50" / > < /div> <
            div className = "col-6 text-end" > <
            FaRegWindowClose className = "active d-none d-xs-block text-warning p-2 mx-lg-5 mx-3 px-2 rounded-circle"
            size = "50" / > < /div> < /
            div > <
            h5 className = "my-3 text-warning mx-lg-5 mx-3 px-2" > Risk Profile < /h5></div > )
    }
    const [step, setStep] = useState(0);
    var i = 0;
    var getPercentage = 0;
    const getPercent = () => {
        getPercentage = i / 11 * 100;
        console.log(getPercentage, i);
    }
    if (step === 1) {
        i += 1;
        getPercent()
        return ( < Learn1 / > )
    } else if (step === 2) {
        i += 2;
        getPercent()
        return ( < Learn2 / > );
    } else if (step === 3) {
        i += 3;
        getPercent()
        return ( < Learn3 / > );
    } else if (step === 4) {
        i += 4;
        getPercent()
        return ( < Learn4 / > );
    } else if (step === 5) {
        i += 5;
        getPercent()
        return ( < Learn5 / > );
    } else if (step === 6) {
        i += 6;
        getPercent()
        return ( < Learn6 / > );
    } else if (step === 7) {
        i += 7;
        getPercent()
        return ( < Learn7 / > );
    } else if (step === 8) {
        i += 8;
        getPercent()
        return ( < Learn8 / > );
    } else if (step === 9) {
        i += 9;
        getPercent()
        return ( < Learn9 / > );
    } else if (step === 10) {
        i += 10;
        getPercent()
        return ( < Learn10 / > );
    } else if (step === 11) {
        i += 11;
        getPercent()
        return ( < Learn11 / > );
    } else if (step === 12) {
        return ( < Learn12 / > );
    }
    return ( <
        div className = " p-lg-5 p-3 text-center blue-dark" > <
        img src = { RiskProfile }
        width = '50%'
        height = '30%'
        alt = "investors" / > <
        h4 className = "bolder my-3" > RISK PROFILE < /h4> <
        h6 className = "mt-2 text-warning" > Complete your Risk Profile < /h6>  <
        h6 > This is a questionnaire to be filled by the intending Investor(you).This will help us, help you keep trackOf your investments and help you every step of the way.This document is a mandatory part of each investor’ s Esteemed investing lifespan. <
        /h6><h6>
        It is mandatory
        for the good of every investor complete the questionnaire to fully complete Your Profile as desired. < /h6> <
        div className = "py-4 px-3 rounded-25 mt-3" >
        <
        h6 className = "px-lg-5 py-3 mx-2 border border-warning text-warning rounded-25"
        onClick = {
            () => { setStep(step + 1) }
        } >
        Start taking the Profile < /h6>  < /div > < /div >
    );
}

export default RProfile;