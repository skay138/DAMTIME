import React from "react";
import "./App.css";
import "./pininfo.css";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import Adfit from "./Adfit";


function Pininfo({ pin }) {
  const navigate = useNavigate();

  const userid = sessionStorage.getItem("loginId");

  const modify = () => {
    if (userid === "non") {
      alert("비로그인상태입니다.");
    } else {
      navigate("/report", { state: pin });
      console.log(pin);
    }
  };

  return (
    <div id="pininfo" className="info hide">
      <div>{pin.Location}</div>
      <ul>
        <li>타입 : {pin.FacilityType}</li>
        <li>{pin.Description ? `추가설명 : ${pin.Description}` : null}</li>
      </ul>
      <button className="button" name="수정요청" onClick={modify}>
        수정요청
      </button>
      <Button name="닫기" action="close" />
    </div>
  );
}
export default Pininfo;
