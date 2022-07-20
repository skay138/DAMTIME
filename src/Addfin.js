import React from "react";
import "./App.css";
import Button from "./Button";
import Camera from "./camera";

function Addpin({lat, lon}) {

    console.log("보낼 데이터는 위도 : " + lat + "경도 : " + lon + "입니다.")

  return (
    <div id="addpin" className="info hide">
        <h4>흡연구역을 등록해주세요</h4>
        <Camera />
        <input type="text" id="pinName" placeholder="장소명 입력"></input>
        <br/>
        <Button name="등록" action="submit"/>
        <Button name="취소" action="close"/>
        
      </div>
  );
}
export default Addpin;