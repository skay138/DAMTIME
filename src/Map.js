import React, { useEffect, useState } from "react";
import Currentlacation from "./Currentlocation";
import Mapstyle from "./Map.css";
import { log, geolocate } from "./utility";

const { kakao } = window;

const Map = () => {
  useEffect(() => {
    geolocate();
    
  }, []);


  return (
    <div>
      <div id="myMap" className="Mapstyle"></div>
      <Currentlacation />
    </div>
  );
};

export default Map;
