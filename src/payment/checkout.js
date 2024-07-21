import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3';
import axios from 'axios';
import { catch_errors, success, fail, preloader, preloaderCheckout } from '../Api/RequestFunctions';
import { API_URL_DEPOSIT, TOKEN } from '../apis';

export default function Checkout({ name, phone, amount, currency, email, data, submit }) {
    const config = {
        public_key: 'FLWPUBK-b248048d7e363a0497a7bf525c43d822-X',
        tx_ref: "CYANASEDEP01-v1",
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
                preloaderCheckout()
                handleFlutterPayment({
                    callback: (response) => {
                        if (response.status === "successful") {
                            data.reference = response.flw_ref
                            data.reference_id = response.transaction_id
                            data.tx_ref = response.tx_ref
                            submit()
                            preloader()
                            axios.post(`${API_URL_DEPOSIT}`, data, {
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
                                        fail("Something went wrong...", "Error")
                                    } else if (response.status === 200 && response.data.success === false) {
                                        fail(response.data.message, response.data.type)
                                    } else {
                                        success("You have deposited successfully", "/home", "successful");
                                    }
                                });
                        }
                        closePaymentModal() // this will close the modal programmatically
                    },
                    onClose: () => {},
                });
            }
        }
        className = 'bk-warning active px-3 mb-2 rounded-3'
        id = "checkout" >
        Make Deposit <
        /h6> < /
        div >
    );
}