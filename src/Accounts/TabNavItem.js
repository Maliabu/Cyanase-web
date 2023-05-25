import React from "react";
import '../App.css';
const TabNavItem = ({ id, title, activeTab, setActiveTab }) => {

    const handleClick = () => {
        setActiveTab(id);
    };
    return ( < div className = "px-3 tab-nav lighter" >
        <
        h6 onClick = { handleClick }
        className = { activeTab === id ? "active" : "" } > { title } <
        /h6> < /
        div >
    );
};
export default TabNavItem;