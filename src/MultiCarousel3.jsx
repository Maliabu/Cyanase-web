import Carousel from "react-multi-carousel";
import "../node_modules/react-multi-carousel/lib/styles.css";
import './App.css'
import { ChevronRightCircle, Plus, Wallet } from "react-iconly";

function MultiCarousel3(props){
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
          partialVisibilityGutter: 130 // this is needed to tell the amount of px that should be visible.
        }
    }
    function getId(name, clas, des, id, logo, options, performance){
        props.getid(name, clas, des, id, logo, options, performance)
        props.handletab52()
    }
    const investmentClasses = () => {
        return(
            <Carousel partialVisible={true} rtl={false ? true : undefined} responsive={responsive} customLeftArrow={<div></div>} customRightArrow={<div></div>} className="">
            {
                props.fundManagers.map((option, id) => (
                    <div className="p-3 bg-grey border border-capacity-10 border-1 rounded-4 mx-ml" key={id} onClick={() => getId(option.class, option.last_name, option.first_name, option.id, option.profile.profile_picture, option.options, option.options.performance)}>
                        <div className="d-flex flex-row">
                        <h5 className="text-start wider mx-mc">{option.first_name} {option.last_name}
                        <h5 className="bolder rounded">{option.profile.country}</h5></h5>
                        <img src={option.profile.profile_picture} width={50} height={50} alt="logo" className="rounded-circle"/></div>
                        <div className="d-felx flex-row">
                        <ChevronRightCircle className="bluey" size={40}/></div>
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

export default MultiCarousel3;