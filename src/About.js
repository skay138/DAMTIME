import Menu from "./menu";
import React, {useState} from "react";
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
  return (
    <div>
      <div className="title">DAMTIME</div>
      <Menu />
      <div  className="contents">
        <p>TEAM DAMDAM</p>
        <p className="name" ><span onClick={godSangKyu}>박상규</span>
        <span onClick={assistant}> 최윤호</span>
        <br />송기원 이상민</p>
        <p className="contact">contact : damtimekr@gmail.com </p>
        <button className="button" onClick={tomain}
        style={{width:"100px", margin:"50px 40%"}}>
      메인으로</button>
        <p><img className="EasterEgg" src={cnt>=5 && fun>=1?"http://file3.instiz.net/data/cached_img/upload/2019/12/26/9/2a158b3b75e4b62300f92a56d202641c_mp4.gif":""}
            alt="" onClick={hide} /><br />
        <span className="text">{cnt>=5 && fun>=1?"압도적으로 헌신한 박상규에게 이 이스터에그를 바칩니다.":""}</span></p>
      </div>
      <p className="foot">Copyright © 2022 DAMDAM All rights reserved.</p>
    </div>
  );
}

export default About;