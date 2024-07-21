import { InfoCircle, Message } from "react-iconly"

const Alert = () => {
    return ( <
        div className = "text-center rounded-4" >
        <div className=" px-3 rounded-top-3"><h3 className=" py-4 border-bottom">Notifications</h3></div>  <
        div className = "col-lg-12 p-3" > <
        div className = "row rounded-4" >
        <
        div className = "col-2 p-3" >
        <
        InfoCircle set = "broken"
        size = "xlarge"
        className = " p-2" / >
        <
        /
        div > <
        div className = "col-10 py-4" >
        <
        h6 > < span className = "bolder text-start" > Message: < /span> Hey there.Welcome to Cyanase Investors Limited.<br/> Good luck on your investment journey  < /
        h6 > < /div > < /
        div > <
        /div> <
        div className = " blue-darks p-2" ><
        h6 className = " mt-1" ><Message className="mx-2"/> 'support@cyanase.com' < /h6> < /
        div > <
        /div>
    )
}
export default Alert;