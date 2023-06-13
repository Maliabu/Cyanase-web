import { InfoCircle } from "react-iconly"

const Alert = () => {
    return ( <
        div className = "p-lg-5 row" >
        <
        h3 className = "bolder" > Notifications < /h3>  <
        div className = "col-lg-8 p-3" > <
        div className = "row p-3" >
        <
        div className = "col-lg-2 p-3" >
        <
        InfoCircle set = "broken"
        size = "xlarge"
        className = "active p-2" / >
        <
        /
        div > <
        div className = "col-lg-10 shadow-sm rounded-4 p-3" >
        <
        h6 > < span className = "bolder" > Message: < /span> Hey there.Welcome to Cyanase Investors Limited.Good luck on your investment journey  < /
        h6 > < /div > < /
        div > <
        /div> <
        div className = "col-lg-4 bg-light rounded-3 p-lg-5" >
        <
        h4 className = "bolder" > Help < /h4> <
        h6 className = "active" > 'support@cyanase.com' < /h6> < /
        div > <
        /div>
    )
}
export default Alert;