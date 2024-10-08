import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3';
import axios from 'axios';
import { catch_errors, success, fail, preloader, preloaderCheckouts } from '../Api/RequestFunctions';
import { API_URL_SUBSCRIBE, TOKEN } from '../apis';

export default function Subscription({ name, phone, amount, currency, email, data, submit }) {
    console.log(amount)
    const config = {
        public_key: 'FLWPUBK-2f0d88d10a57d95acfd495bb18b32d43-X',
        tx_ref: "CYANASESUB01-v1",
        amount: amount,
        currency: currency,
        payment_options: 'card,mobilemoney,ussd',
        customer: {
            email: email,
            phone_number: phone,
            name: name,
        },
        customizations: {
            title: 'subscription',
            description: 'Make a subscription',
            logo: '../images/CI.png',
        },
    };
    const handleFlutterPayment = useFlutterwave(config);
    return ( < div className = "App" >
        <
        h6 onClick = {
            () => {
                preloaderCheckouts()
                handleFlutterPayment({
                    callback: (response) => {
                        if (response.status === "successful") {
                            data.reference = response.flw_ref
                            data.reference_id = response.transaction_id
                            data.tx_ref = response.tx_ref
                            submit()
                            preloader()
                            axios.post(`${API_URL_SUBSCRIBE}`, data, {
                                    headers: {
                                        "Content-Type": "multipart/form-data",
                                        'Accept': 'application/json',
                                        "Authorization": `Token ${ TOKEN }`
                                    }
                                })
                                .catch(function(error) {
                                    catch_errors(error)
                                })
                                .then(function(response) {
                                    if (!response) {
                                        fail("Something went wrong...")
                                    } else if (response.status === 200 && response.data.success === false) {
                                        fail(response.data.message)
                                    } else {
                                        success("You have subscribed successfully", "/home", "successful");
                                    }
                                });
                            // console.log(data)
                        }
                        // console.log(response);
                        closePaymentModal() // this will close the modal programmatically
                    },
                    onClose: () => {},
                });
            }
        }
        className = 'bk-warning rounded-3 mt-3'
        id = "checkouts" >
        Make subscription <
        /h6> < /
        div >
    );
}