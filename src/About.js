import Menu from "./menu";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./About.css";


function About() {
  const navigate = useNavigate();
  const [cnt,setCnt] = useState(0);
  const [fun,setFun] = useState(0);
  function godSangKyu () { setCnt(cnt+1); }
  function assistant () { setFun(fun+1); }
  function hide () { setCnt(0); setFun(0);}
  function tomain () {
    navigate("/main");
  }
  useEffect(() => {
    cnt >= 5 && fun >=1
    ? document.getElementById("easterdiv").className= "easterdiv zup"
    : document.getElementById("easterdiv").className= "easterdiv";
  }, [cnt, fun]);
  return (
    <div>
      <div className="title">DAMTIME</div>
      <Menu />
      <div  className="contents">
        <p className="team">TEAM DAMDAM</p>
        <p className="name" ><span className="clickthis" onClick={godSangKyu}>박상규</span>
        <span className="clickthis" onClick={assistant}> 최윤호</span>
        <br />송기원 이상민</p>
        <p className="contact">contact : damtimekr@gmail.com </p>
        <button className="aboutbtn" onClick={tomain}>
      메인으로</button><br />
        <div id="easterdiv" className="easterdiv"><img className="EasterEgg" src={cnt>=5 && fun>=1?"http://file3.instiz.net/data/cached_img/upload/2019/12/26/9/2a158b3b75e4b62300f92a56d202641c_mp4.gif":""}
            alt="" onClick={hide} />
        <p><span className="text">{cnt>=5 && fun>=1?"압도적으로 헌신한 박상규에게 이 이스터에그를 바칩니다.":""}</span></p>
        </div>
      </div>
      <p className="foot">Copyright © 2022 DAMDAM All rights reserved.</p>
    </div>
  );
}

export default About;