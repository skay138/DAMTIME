import "./App.css";
import { useEffect, useState } from "react";
import { GetMap } from "./utility";

function Mainmap() {
    useEffect(() => {
      GetMap();
    }, []);
  
    return (
      <div>
        <div className="Mapcontent">
          <div className="title">DAMTIME</div>
          <div id="myMap" className="Mapstyle"></div>
          <button className="currentlocation" type="" onClick={GetMap}>
            <span className="material-symbols-outlined">share_location</span>
          </button>
        </div>
      </div>
    );
  }
  
  export default Mainmap;