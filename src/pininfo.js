import React from "react";
import "./App.css";

function Pininfo({name}) {
  function close() {
    document.getElementById("pininfo").className = "pininfo hide";
    console.log("상세보기 닫음");
  }

  return (
    <div id="pininfo" className="addpin hide">
      <h3>{name}</h3>
      <button onClick={close}>닫기</button>
    </div>
  );
}
export default Pininfo;
