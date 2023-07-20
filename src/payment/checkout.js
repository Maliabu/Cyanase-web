import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3';
import { useState } from 'react';

export default function Checkout({ name, phone, amount, country, currency, email, callBack }) {
    const [statuss, setStatus] = useState("unsuccessful")
    callBack(statuss)
    console.log(name, phone, email, country, amount)
    const config = {
        public_key: 'FLWPUBK_TEST-955232eaa38c733225e42cee9597d1ca-X',
        tx_ref: Date.now(),
        amount: amount,
        currency: currency,
        payment_options: 'card,mobilemoney,ussd',
        customer: {
            email: email,
            phone_number: phone,
            name: name,
        },
        customizations: {
            title: 'deposit',
            description: 'Make a deposit',
            logo: '../images/CI.png',
        },
    };
    const handleFlutterPayment = useFlutterwave(config);
    return ( < div className = "App" >
        <
        h5 className = 'bolder' > Click below to checkout < /h5>

        <
        h6 onClick = {
            () => {
                handleFlutterPayment({
                    callback: (response) => {
                        setStatus(response.status)
                        console.log(response);
                        closePaymentModal() // this will close the modal programmatically
                    },
                    onClose: () => {},
                });
            }
        }
        className = 'status active p-2 rounded-3 mt-3' >
        Click to deposit <
        /h6> < /
        div >
    );
}