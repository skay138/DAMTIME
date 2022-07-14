import { useState } from "react";
import currentlacation from "./currentlocation.css";

function Currentlacation(props) {
  let coordinate = [];
  const onClick = () => {
    coordinate =[33.450701, 126.570667];
    props.currentlo(coordinate);
  };

  return (
    <button className="currentlocation" type="" onClick={onClick}>
      <span className="material-symbols-outlined">share_location</span>
    </button>
  );
}

export default Currentlacation;
