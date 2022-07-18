import React from "react";
import "./App.css";
import Button from "./Button";

function Addpin() {

  return (
    <div id="addpin" className="info hide">
        {/* <h3>{pinla}, {pinma}</h3> */}
        <h3>흡연구역을 등록해주세요</h3>
        <input type="text" id="pinName" placeholder="장소명 입력"></input>
        <Button name="등록" action="submit"/>
        <Button name="취소" action="close"/>
      </div>
  );
}
export default Addpin;