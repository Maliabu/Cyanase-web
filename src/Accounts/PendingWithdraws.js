import React from "react";
import { Filter, Image } from "react-iconly";

const PendingWithdraws = (props) => {
    const pendingWithdraws = () => {
        if (props.pendingWith.length === 0) {
            return ( < div className = 'p-5 rounded-4 mt-2 text-center grey-text' > < div className = 'd-flex flex-row justify-content-center' > <
            Image size = "large"
            set = "broken"
            className = 'mx-2 grey-text' / > <
            Filter size = "large"
            set = "broken"
            className = ' grey-text' / > < /div> < /div > )
            }
            else return (
                props.pendingWith.map(withdraw => ( <div className=""><
                    div className = 'row p-2 mx-lg-3 mx-2 mt-1 bg-white rounded-3' >
                    <
                    div className = 'col-4 text-start' >< h6><span className="small"> { withdraw.currency }</span> { (withdraw.withdraw_amount).toLocaleString() } < /h6> < /div ><div className="col-3 text-center">
                        <h6 className="text-start"><span className="small">option </span><br/><span>{withdraw.investment_option} </span></h6>
                    </div><div className="col-4 text-center">
                        <h6 className="text-start"><span className="small">handler </span><br/><span>{withdraw.handler} </span></h6>
                    </div> <
                    div className = 'col-1 text-end bolder' > < h6 > { withdraw.created } < /h6>< /div > < /
                    div ></div>
                ))
            )

        }
    return ( <
        div className = "text-center rounded-4 p-lg-3" >
        <div className=" px-lg-3 rounded-top-3"><h4 className=" py-4">Pending Withdraws</h4></div>  <
        div className = "px-lg-3 scroll-y3 bg-lighter rounded-4" > {pendingWithdraws()}<
        /div> <
        /div>
    )
}
export default PendingWithdraws;