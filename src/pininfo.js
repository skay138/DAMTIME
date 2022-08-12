import React from "react";
import "./App.css";
import "./pininfo.css";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

function Pininfo({ pin }) {
  const navigate = useNavigate();

  const userid = sessionStorage.getItem("loginId");

  const askreport = () => {
    if (userid === "non") {
      alert("비로그인상태입니다.");
    } else {
      navigate("/report", { state: pin });
      console.log(pin);
    }
  };

  const modify =(e) =>{
    e.preventDefault();
    navigate("/modify", { state: pin });
  }

  return (
    
    <div id="pininfo" className="info hide">
      <div className="infotitle">{pin.Location}</div>
      
        <div>타입 : {pin.FacilityType}</div>
        <div>{pin.Description ? `추가설명 : ${pin.Description}` : null}</div>
    
      {pin.UserId === userid ? (
        <button className="button" onClick={modify}>마커수정</button>
      ) : (
        <button className="button" name="수정요청" onClick={askreport}>
          수정요청
        </button>
      )}
      <Button name="닫기" action="close" />
    </div>
  );
}
export default Pininfo;
