import { useEffect } from "react";
import "./App.css";

function Adfitmid() {
  useEffect(() => {
    let ins = document.createElement("ins");
    let scr = document.createElement("script");
    ins.className = "kakao_ad_area";
    ins.style =
      "display:none; width:100%; position: relative; margin-bottom:30px z-index:5;";
    scr.async = "true";
    scr.type = "text/javascript";
    scr.src = "//t1.daumcdn.net/kas/static/ba.min.js";
    ins.setAttribute("data-ad-width", "320");
    ins.setAttribute("data-ad-height", "100");
    ins.setAttribute("data-ad-unit", "DAN-TFhCmbndPRprPQe0");
    document.querySelector(".adfitmid").appendChild(ins);
    document.querySelector(".adfitmid").appendChild(scr);
  }, []);

  return (
    <div>
      <div className="adfitmid"></div>
    </div>
  );
}

export default Adfitmid;
