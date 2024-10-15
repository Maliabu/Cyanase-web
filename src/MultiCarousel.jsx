import Carousel from "react-multi-carousel";
import "../node_modules/react-multi-carousel/lib/styles.css";
import './App.css'
import { User } from "react-iconly";

function MultiCarousel(props){
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
          partialVisibilityGutter: 210 // this is needed to tell the amount of px that should be visible.
        }
    }
    function getId(clas, des, id, logo, options){
        props.getid(clas, des, id, logo, options)
        props.handletab51()
    }
    const investmentClasses = () => {
        return(
            <Carousel partialVisible={true} rtl={false ? true : undefined} responsive={responsive} customLeftArrow={<div></div>} customRightArrow={<div></div>} className="">
            {
                props.investmentClasses.map((option, id) => (
                    <div className="p-3 rounded-4 border border-1 border-opacity-10 border-dark mx-ml bg-white" key={id} onClick={() => getId(option.investment_class, option.description, option.investment_class_id, option.logo, option.investment_options)}>
                        <div className="d-flex flex-row">
                        <img src={option.logo} width={40} height={50} alt="logo" className="rounded-circle"/>
                        <h5 className="text-end bluey wider">
                        <h6 className="text-end bolder grey-text rounded">{option.investment_options.length}</h6>{option.investment_class}</h5></div>
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

export default MultiCarousel;