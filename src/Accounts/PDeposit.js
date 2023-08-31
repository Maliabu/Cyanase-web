import React, { useState } from "react";
import '../App.css';
import { FaCheckCircle, FaWallet } from 'react-icons/fa';
import Form from 'react-bootstrap/Form';
import { useForm } from "react-hook-form";
import Learn1 from './Learn1'

function PDeposit() {
    const [step, setStep] = useState(0);
    const [formData, setFormData] = useState({
        payment_means: '',
        account_type: '',
        deposit_amount: '',
        currency: ''
    });
    const { register, handleSubmit } = useForm();
    const handleChange = (event) => {
        const name = event.target.name; //declare at top to avoid depreciation
        const value = event.target.value;
        setFormData({...formData, [name]: value })
    }
    function onSubmit(values) {
    }
    const Learn3 = () => {
        return ( <
            div className = "mt-5 p-5 text-center" > <
            FaCheckCircle className = "text-warning rounded-circle border border-warning p-2"
            size = "100" / >
            <
            h4 className = "bolder active mt-5" > Successful < /h4> <
            p className = "my-3 bolder" > Done < /p > <
            h6 > Your deposit was successful. < /h6> <h5>Your Deposit status has been reconciled < /
            h5 > < /
            div >
        )
    }
    const Learn2 = () => {
        return ( <
            div className = "mt-5 p-5 text-center" > <
            FaWallet className = "text-warning rounded-circle border border-warning p-2"
            size = "100" / > <
            h4 className = "bolder my-3" > Deposit < /h4> <
            h6 className = "mt-2" > How much would you like to Deposit to your account ? < /h6>  <
            Form.Group className = "mb-3 bg-white shadow-sm p-3 p-5" >
            <
            Form.Label > Amount to Deposit < /Form.Label>  <
            Form.Control type = "number"
            name = "deposit_amount"
            id = 'phone'
            required placeholder = "UGX 10,000" / >
            <
            Form.Control.Feedback type = "invalid" >
            This field is required. <
            /Form.Control.Feedback> < /
            Form.Group >
            <
            h6 className = "px-5 py-3 mt-5 mx-2 border border-warning text-warning rounded-25"
            onClick = {
                () => { setStep(step + 1) }
            } >
            Next < /h6> <
            h6 className = "px-5 py-3 mx-2 border border-warning text-warning rounded-25"
            onClick = {
                () => { setStep(step - 1) }
            } >
            Previous < /h6> < /
            div >
        )
    }
    if (step === 0) {
        return ( < Learn1 / > )
    } else if (step === 2) {
        return ( < Learn2 / > );
    } else if (step === 3) {
        return ( < Learn3 / > );
    }
    return ( <
        div className = "mt-5 p-5 text-center" > <
        FaWallet className = "text-warning rounded-circle border border-warning p-2"
        size = "100" / > <
        h4 className = "bolder my-3" > Deposit < /h4> <
        h6 className = "mt-2" > Choose your payment means. < /h6> <
        div className = "p-5 px-3 rounded-25 mt-3"
        key = "radio" >

        <
        Form onSubmit = { handleSubmit(onSubmit) } > <
        div key = { `default-radio` }
        className = "mb-3" >
        <
        Form.Check label = "I want to deposit from my wallet to make this deposit to my personal investment account"
        name = "group1"
        type = "radio" {...register("payment_means") }
        onChange = { handleChange }
        className = "mx-5"
        value = "wallet"
        required id = "default-radio" /
        >
        <
        Form.Check label = "No, am not using my wallet to make this deposit to my personal investment account"
        name = "group1" {...register("payment_means") }
        onChange = { handleChange }
        type = "radio"
        className = "mt-3 mx-5"
        value = "account"
        required id = "default-radio" /
        >
        <
        /
        div > <
        h6 className = "px-5 py-3 mt-5 mx-2 border border-warning text-warning rounded-25"
        onClick = {
            () => { setStep(step + 1) }
        } >
        Next < /h6> < /
        Form > < /div ></div >
    );
}

export default PDeposit;