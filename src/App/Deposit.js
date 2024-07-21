
import { GetRiskProfile, UserRequests, GetInvestmentClassesRequests, RequestRiskAnalysisPercentages, UserVerificationRequests } from "../Api/MainRequests";
import { useEffect } from "react";
import React, { useState } from "react";
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from 'react-bootstrap/Modal';
import Learn1 from '../Accounts/Learn1';
import './style.scss'; 
import Depo from '../images/depo.png'
import { Wallet, ArrowLeftSquare} from "react-iconly";

const Deposit = ({ id, activeTab, children, ...props }) => {
    const [country, setCountry] = useState([])
    const [email, setEmail] = useState([])
    const [name, setName] = useState([])
    const [phone, setPhone] = useState([])
    const [show2, setShow2] = useState(false);
    const handleClose2 = () => setShow2(false);
    const handleShow2 = () => setShow2(true);
    const [investmentOption, setinvestmentoption] = useState("Automatic Asset Allocation")
    const [investment_options, setOptions] = useState([])
    const [riskAnalysisPercentages, setRiskAnalysisPecentages] = useState([])
    const [verification, setVerification] = useState("")
    const [complete, setComplete] = useState("Incomplete");

    useEffect(() => {

        GetRiskProfile().then(res => {
        
            if (res.investment_option === undefined) {
                setinvestmentoption("Automatic Asset Allocation")
            } else {
                setinvestmentoption(res.investment_option)
            }
        })

        UserRequests().then(res => {
            setCountry(res.profile.country)
            setName(res.last_name + " " + res.first_name)
            setPhone(res.profile.phoneno)
            setEmail(res.email)
        });

        GetInvestmentClassesRequests().then(res => {
            setOptions(res)
        });

        RequestRiskAnalysisPercentages().then(res=>{
            setRiskAnalysisPecentages(res)
        });

        UserVerificationRequests().then(res => {
            setVerification(res.success)
        });

        GetRiskProfile().then(res => {
            if (res.status === true) {
                setComplete("Complete")
            }
        });

    }, []);

    return ( < div className="mx-2"> < div className = " d-none d-sm-block" > <
        div className = "row mx-3 mt-2" > <
        div className = "col-8 dollar px-4 rounded-4 " >
         <
        div className = "row blue-darks rounded-4 px-3 py-4" >
        <
        div className = "col text-center" >
        <
        img src = { Depo }
        className = "pt-2 d-none"
        width = '20%'
        height = '40%'
        alt = "investors" / >
        <
        Wallet size = "xlarge"
        set = "broken"
        className = 'mx-2 mt-4' / > <
        h3 className = " p-3" > Deposit < /h3>  <
        div className = "" >
        <
        h6 className = "mx-3 py-2 rounded light-res-homey" > Make Personal Deposits < /h6> <
        h6 className = "mx-3 py-2 rounded light-res-homey" > Make Deposits to Goals < /h6> < /
        div > <
        div className = "d-flex flex-row flex justify-content-center" >  </div >
        <
        Modal show = { show2 }
        onHide = { handleClose2 }
        dialogClassName = "my-modal1" >
        <
        Learn1 tab9 = { props.handletab9 }
        country = { country }
        lastname = { name }
        email = { email }
        phone = { phone }
        option = { investmentOption }
        options = {investment_options}
        riskAnalysisPercentages = {riskAnalysisPercentages}
        verification = {verification}
        complete = {complete}
        getSth = {props.getSth}
        / > < /
        Modal > < /
        div ><
        div className = "col justify-content-center border-start p-5 mt-3" >
        <
        h6 className = "" > Make Deposists of any amount towards any market, you can on the other hand make goal based deposits to any goal, we shall keep track
        for you here.Make your deposit here. < /h6><
        h6 className = " light-res-home border p-3 rounded-3 mt-4 text-center"
        onClick = { handleShow2 } > <Wallet className="mx-2"/>
        Make Deposit < /h6> < /
        div >
        <
        /div>  <
        div > 
        <
        /
        div >
        <
        /
        div > <
        div className = "col-4 bg-lighter rounded-4 px-4" > <
        div className = "row p-2 rounded-3" >
        <
        div className = "text-start col-6 mt-3" > < h6 > PROCEDURE < /h6> < /div > < /
        div >
        <
        div className = "p-2" > <
        div className = "row px-3 bg-white rounded-4" >
        <
        div className = "col-2" >
        <
        p className = "py-2 px-3 mt-3 rounded-circle text-center bg-lighter" > 1 < /
        p >
        <
        /
        div >
        <
        div className = "col-10" >
        <
        h6 className = " pt-4" > Fill in your Risk Profile < /h6>< /
        div > < /div >  <
        div className = "row px-3 bg-white mt-2 rounded-4" >
        <
        div className = "col-2" >
        <
        p className = "py-2 px-3 mt-3 rounded-circle text-center bg-lighter" > 2 < /
        p >
        <
        /
        div >
        <
        div className = "col-10" >
        <
        h6 className = " pt-3" > Choose where to make your Deposit
        for example Treasury Bills < /h6>< /
        div > < /div > <
        div className = "row px-3 bg-white mt-2 rounded-4" >
        <
        div className = "col-2" >
        <
        p className = "py-2 mt-3 px-3 rounded-circle text-center bg-lighter" > 3 < /
        p >
        <
        /
        div >
        <
        div className = "col-10" >
        <
        h6 className = " pt-4" > Make the Deposit < /h6>< /
        div > < /div > <
        div className = "row justify-content-center bg-white p-4 mt-3 rounded-4" >
        <
        h4 className = " text-center p-3" > Investor Risk profile < /h4> <
        h6 className = "text-center small" > Your risk profile helps us invest your money accordingly,
        let us know what type of investor you are.Complete your profile and
        let us do the rest < /h6> <
        h6 className = "text-center mt-3 rounded-3 bk-warning"
        onClick = { props.handletab9 } > Complete your Risk Profile < /h6> < /
        div >
        <
        /
        div > < /
        div > < /
        div > < /div>
        <div className="fix-top bg-white d-lg-none d-md-none d-sm-block mx-2"><h4 className="bolder my-2">
        <
        ArrowLeftSquare size = { 25 }
        onClick = {
            () => { props.handletab1() }
        } / ><span className="mx-2 bolder">Deposit</span></h4></div>
        <div className="d-lg-none d-md-none d-sm-block "><
        Learn1 tab9 = { props.handletab9 }
        country = { country }
        lastname = { name }
        email = { email }
        phone = { phone }
        option = { investmentOption }
        options = {investment_options}
        riskAnalysisPercentages = {riskAnalysisPercentages}
        verification = {verification}
        complete = {complete}
        / ></div>
        < /div >
    );
};

export default Deposit;