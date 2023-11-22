import React from "react";
import '../App.css';
const TabNavItem = ({ id, title, activeTab, setActiveTab }) => {

    const handleClick = () => {
        setActiveTab(id);
    };
    return ( < div className = "px-2 tab-nav lighter" >
        <
        h6 onClick = { handleClick }
        className = { activeTab === id ? "bolder border-bottom border-warning active p-1 rounded-2" : "" } > { title } <
        /h6> < /
        div >
    );
};
export default TabNavItem;