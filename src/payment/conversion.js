import { useEffect, useState } from 'react';
import Axios from 'axios';
 
export default function Conversion(from, input, to) {
 
    // Initializing all the state variables 
    const [info, setInfo] = useState([]);
    let output = 0
    let result = 0
 
    // Calling the api whenever the dependency changes
    useEffect(() => {
        Axios.get(
`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${from}.json`)
            .then((res) => {
                setInfo(res.data[from]);
            })
    }, [from]);
    // Function to convert the currency
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const convert = () => {
        var rate = info[to];
        output = input * rate;
        // result = input + " " + from + " = " + output.toFixed(2) + " " + to
        result = output.toFixed(2)
        return result
    }
    return convert()
}