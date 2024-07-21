import Carousel from "react-multi-carousel";
import "../node_modules/react-multi-carousel/lib/styles.css";
import './App.css'
import { FaDonate } from "react-icons/fa";

function MultiCarousel2(props){
    const responsive = {
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 3,
          partialVisibilityGutter: 40 // this is needed to tell the amount of px that should be visible.
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 2,
          partialVisibilityGutter: 30 // this is needed to tell the amount of px that should be visible.
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1,
          partialVisibilityGutter: 80 // this is needed to tell the amount of px that should be visible.
        }
    }
    const investmentClasses = () => {
        return(
            <Carousel partialVisible={true} responsive={responsive} rtl={false} customLeftArrow={<div></div>} customRightArrow={<div></div>} className="">
            {
                props.data.map((option, id) => (
                    <div className={"card p-3 rounded-4 shadow-sm mx-mc mt-1"} onClick={() => props.getWithdraws(option.name,option.total,option.investment_id, props.summ(option.data), option.handler)}>
                    <div className='row justify-content-center p-0' key={id}>
                        <div className=''><h5 className='bolder pb-1'>{option.name}<h6>{option.handler}</h6></h5> </div>
                                    <div className = "row" ><div className='col text-start pt-4 px-0'><span className="light-res-home p-2 rounded-3"><FaDonate/></span></div><div className='col text-end px-0'> <h6 className='m-0'>Deposit:
                                    <div className = "d-flex flex-row flex m-0 justify-content-end" >< span className='bolder'> { props.getCurrency(props.country) } </span>  
                                    <h4 className = "bolder text-white" > {
                                ((props.summ(option.data)) * 1000).toLocaleString()
                            } </h4></div ></h6></div><div className='text-end p-0'><h6 className='m-0'>Networth:
                            <div className = "d-flex flex-row flex m-0 justify-content-end" ><span className='bolder'> { props.getCurrency(props.country) } </span>  
                            <h4 className = "px-1 bolder text-white m-0" > {
                                option.total.toLocaleString()
                            } </h4></div ></h6></div> 
                        </div>
                    </div>
                    </div>
                ))
            }
            </Carousel>
        )
    }
    return(<div>
        {investmentClasses()}
    </div>)
}

export default MultiCarousel2;