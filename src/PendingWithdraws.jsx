import './App.css'
import { FaDonate } from 'react-icons/fa'

function PendingWithdraws(props){
    const investmentClasses = () => {
        return(
            <div className="scroll-y3">
            {
                props.data.map((option, id) => (
                    <div className="" onClick={() => props.getWithdraws(option.name,option.total,option.investment_id, props.summ(option.data), option.handler)}>
                    <div className='row justify-content-center p-0' key={id}>
                        <div className=''><h5 className='bolder pb-1'>{option.name}<h6>{option.handler}</h6></h5> </div>
                                    <div className = "row" ><div className='col text-start pt-4 px-0'><span className="light-res-home p-2 rounded-3"><FaDonate/></span></div><div className='col text-end px-0'> <h6 className='m-0'>Deposit:
                                    <div className = "d-flex flex-row flex m-0 justify-content-end" >< span className='bolder'> { props.getCurrency(props.country) } </span>  
                                    <h4 className = " font-weight-light" > {
                                ((props.summ(option.data)) * 1000).toLocaleString()
                            } </h4></div ></h6></div><div className='text-end p-0'><h6 className='m-0'>Networth:
                            <div className = "d-flex flex-row flex m-0 justify-content-end" ><span className='bolder'> { props.getCurrency(props.country) } </span>  
                            <h4 className = "px-1 font-weight-light m-0" > {
                                option.total.toLocaleString()
                            } </h4></div ></h6></div> 
                        </div>
                    </div>
                    </div>
                ))
            }
            </div>
        )
    }
    return(<div>
        {investmentClasses()}
    </div>)
}

export default PendingWithdraws;