import React from "react";
import "./App.css";
import "./pininfo.css";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

function Pininfo({ pin }) {
  const navigate = useNavigate();

  const userid = sessionStorage.getItem("loginId");

  const modify = () => {
    if (userid === "non") {
      alert("비로그인상태입니다.");
    } else {
      navigate("/report", { state: pin });
    }
  };

  return (
    <div id="pininfo" className="info hide">
      <form>
        <div>{pin.Location}</div>
        <img src={pin.ImgUrl} alt="" />
        <p>타입 : {pin.FacilityType}</p>
        <p>{pin.Description ? `추가설명 : ${pin.Description}` : null}</p>
        <button className="pininfobtn button" name="수정요청" onClick={modify}>
          수정요청
        </button>
      </form>
      <Button name="닫기" action="close" />
    </div>
  );
}
export default Pininfo;
