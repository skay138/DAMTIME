import React from "react";
import "./App.css";
import Button from "./Button";

function Pininfo({name}) {

  return (
    <div id="pininfo" className="info hide">
      <h3>{name}</h3>
      <Button name="닫기" action="close" />
    </div>
  );
}
export default Pininfo;
