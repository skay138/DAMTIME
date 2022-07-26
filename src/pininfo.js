import React from "react";
import "./App.css";
import "./pininfo.css";
import Button from "./Button";

function Pininfo({ pin }) {
  console.log(pin);

  return (
    <div id="pininfo" className="info hide">
      <div>{pin.Location}</div>
      <p>타입 : {pin.FacilityType}</p>
      <p>{pin.Description ? `추가설명 : ${pin.Description}` : null}</p>
      <Button name="수정요청" action="req" />
      <Button name="닫기" action="close" />
    </div>
  );
}
export default Pininfo;
