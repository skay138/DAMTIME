import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Spin as Hamburger } from 'hamburger-react'
import "./menu.css"

const Menu = () => {

    const [isOpen, setOpen] = useState(false);
  
    return(
    <div>
    <Hamburger size={20} direction="right" toggled={isOpen} toggle={setOpen} z-index="15" />        
    
    <ul className={isOpen ? "show-menu" : "hide-menu"}>
            <li ><Link to="/">첫화면</Link></li>
            <li ><Link to="/main">지도화면</Link></li>
            <li >예시</li>
            <li >앨랠래</li>
    </ul>
    </div>
    );
}
export default Menu;