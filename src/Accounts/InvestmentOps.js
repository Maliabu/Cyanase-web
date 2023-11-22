import { useEffect, useState } from "react";
import { GetInvestmentOptionsRequests } from "../Api/MainRequests";

export let option=[]
export const Options = () =>{
    const [options, setOptions] = useState([])
    useEffect(() => {
        GetInvestmentOptionsRequests().then(res => {
            setOptions(res)
        })
    }, [options]);
    option = options
    return({options})
};

