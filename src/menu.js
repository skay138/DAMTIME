import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Spin as Hamburger } from "hamburger-react";
import "./menu.css";

const Menu = () => {
  const [isOpen, setOpen] = useState(false);
  const userid = sessionStorage.getItem("loginId");

  return (
    <div>
      <Hamburger
        size={20}
        direction="right"
        toggled={isOpen}
        toggle={setOpen}
      />

      <ul className={isOpen ? "show-menu" : "hide-menu"}>
        <li>
          {userid === "non" ? (
            <Link to="/">로그인 하기</Link>
          ) : (
            <Link to="/myinfo">내정보</Link>
          )}
        </li>
        <li>
          <Link to="/main">지도화면</Link>
        </li>
        <li>도움말</li>
      </ul>
    </div>
  );
};
export default Menu;
