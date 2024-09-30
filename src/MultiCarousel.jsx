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
          partialVisibilityGutter: 130 // this is needed to tell the amount of px that should be visible.
        }
    }
    function getId(clas, des, id, logo, options){
        props.getid(clas, des, id, logo, options)
        props.handletab51()
    }
    const investmentClasses = () => {
        return(
            <Carousel partialVisible={true} rtl={false ? true : undefined} responsive={responsive} customLeftArrow={<div></div>} customRightArrow={<div></div>} className=" py-2">
            {
                props.investmentClasses.map((option, id) => (
                    <div className="p-2 bg-white rounded-3 mx-mc" key={id} onClick={() => getId(option.investment_class, option.description, option.investment_class_id, option.logo, option.investment_options)}>
                        <img src={option.logo} width={40} height={50} alt="logo" className="rounded-circle"/>
                        <User size={50} className="rounded-circle p-3 bluey d-none bg-lighter"/>
                        <div className="d-flex flex-row">
                        <h6 className="text-start px-2 py-1 bluey wider bolder">{option.investment_class}</h6>
                        <h6 className="text-end bolder grey-text py-1">{option.investment_options.length}</h6></div>
                        <h6 className="px-2">{option.description}</h6>
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