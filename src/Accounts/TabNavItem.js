import React from "react";
import '../App.css';
const TabNavItem = ({ id, title, activeTab, setActiveTab }) => {

    const handleClick = () => {
        setActiveTab(id);
    };
    return ( < div className = "px-2 tab-nav lighter" >
        <
        h6 onClick = { handleClick }
        className = { activeTab === id ? "bolder active p-1" : "" } > { title } <
        /h6> < /
        div >
    );
};
export default TabNavItem;