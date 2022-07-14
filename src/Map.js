import React, { useEffect, useState } from "react";
import Currentlacation from "./Currentlocation";
import Mapstyle from "./Map.css";
import {log} from "./utility";

const { kakao } = window;



const Map = () => {

  const options = {
    center: new kakao.maps.LatLng(33.450701, 126.570667),
    level: 3,
  }

  function consolefn(currentlo) {
    const container = document.getElementById("myMap");

    const map = new kakao.maps.Map(container, {
      center: new kakao.maps.LatLng(...currentlo),
      level: 3,
    });
    log(currentlo[0], currentlo[1])
  }
  useEffect(() => {
    const container = document.getElementById("myMap");

    const map = new kakao.maps.Map(container, options);
    console.log("MAP CREATED :)");

    return () => console.log("MAP DESTROYED :(");
    //cleanup fn : in case we want to use fn when the component has destroyed
  }, []);

  return (
    <div>
      <div id="myMap" className="Mapstyle"></div>
      <Currentlacation currentlo={consolefn}/>
    </div>
  );
};

export default Map;
