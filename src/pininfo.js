import React from "react";
import "./App.css";
import "./pininfo.css";
import Button from "./Button";

function Pininfo({name, type, des}) {

  return (
    <div id="pininfo" className="info hide">
      <div>{name}</div>
      <p>타입 : {type}</p>
      <p>{des ? `추가설명 : ${des}`: null}</p>
      <Button name="수정요청" action='req' />
      <Button name="닫기" action="close" />
    </div>
  );
}
export default Pininfo;