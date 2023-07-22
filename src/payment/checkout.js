import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3';
import { useState } from 'react';

export default function Checkout({ name, phone, amount, currency, email, callBack, refer }) {
    const [statuss, setStatus] = useState("unsuccessful")
    const [reference, setref] = useState("")
    const [ref_id, setrefId] = useState(0)
    callBack(statuss)
    refer(reference, ref_id)
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
        h6 onClick = {
            () => {
                handleFlutterPayment({
                    callback: (response) => {
                        setStatus(response.status)
                        setref(response.flw_ref)
                        setrefId(response.transaction_id)
                        console.log(response);

                        closePaymentModal() // this will close the modal programmatically
                    },
                    onClose: () => {},
                });
            }
        }
        className = 'bk-warning active p-3 mx-5 rounded-3 mt-3' >
        Checkout <
        /h6> < /
        div >
    );
}