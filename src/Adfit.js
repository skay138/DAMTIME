import { useEffect } from "react";
import "./App.css";
import { adfitkey } from "./keys";

function Adfit() {
  useEffect(() => {
    let ins = document.createElement("ins");
    let scr = document.createElement("script");
    ins.className = "kakao_ad_area";
    ins.style = "display:none; width:100%; position: absolute; bottom:0px;";
    scr.async = "true";
    scr.type = "text/javascript";
    scr.src = "//t1.daumcdn.net/kas/static/ba.min.js";
    ins.setAttribute("data-ad-width", "320");
    ins.setAttribute("data-ad-height", "50");
    ins.setAttribute("data-ad-unit", "DAN-M3VzVTwwqf9k6WpM");
    document.querySelector(".adfit").appendChild(ins);
    document.querySelector(".adfit").appendChild(scr);
  }, []);

  return (
    <div>
      <div className="adtop"></div>
      <div className="adfit"></div>
    </div>
  );
}

export default Adfit;
