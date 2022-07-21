import axios from "axios";
import React, { useState } from "react";
import "./App.css";
import Button from "./Button";
import Camera from "./camera";

function Addpin({lat, lon}) {

    console.log("보낼 데이터는 위도 : " + lat + "경도 : " + lon + "입니다.")

    const state= {
      No : 0,
      FacilityType : "",
      Location : "",
      Longitude : lon,
      Latitude : lat,
    };

    const handlechange = (e) =>{
      state.Location = e.target.value;
    }

    const push = () =>{
      axios.post("/insert",state).then(function(res){
        console.log(res)
      })
    }



  return (
    <div id="addpin" className="info hide">
        <h4>흡연구역을 등록해주세요</h4>
        <Camera />
        <input onChange={handlechange} type="text" id="pinName" placeholder="장소명 입력"></input>
        <br/>
        <button onClick={push}>등록록</button>
        <Button name="등록" action="submit"/>
        <Button name="취소" action="close"/>
      </div>
  );
}
export default Addpin;