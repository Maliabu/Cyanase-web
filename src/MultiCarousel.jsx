import Carousel from "react-multi-carousel";
import "../node_modules/react-multi-carousel/lib/styles.css";
import './App.css'

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
          partialVisibilityGutter: 230 // this is needed to tell the amount of px that should be visible.
        }
    }
    function getId(id){
        props.handletab5()
    }
    const investmentClasses = () => {
        return(
            <Carousel partialVisible={true} rtl={false ? true : undefined} responsive={responsive} customLeftArrow={<div></div>} customRightArrow={<div></div>} className="">
            {
                props.investmentClasses.map((option, id) => (
                    <div className="p-3 text-center shadow-sm rounded-3 mb-3 mx-mc" key={id} onClick={() => getId(option.investment_class_id)}>
                        <img src={option.logo} width={50} height={50} alt="logo"/>
                        <h6 className="mt-1">{option.investment_class}</h6>
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