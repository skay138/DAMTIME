import Menu from "./menu";
import React from "react";
import { useNavigate } from "react-router-dom";


function Help() {
  const navigate = useNavigate();
  function tomain () {
    navigate("/main");
  }
  return (
    <div>
      <div className="title">DAMTIME</div>
      <Menu />
      <div style={{textAlign:"center",}}>
      <ul style={{ textAlign:"left", paddingRight:"33px", paddingLeft:"33px"}}>
        <li style={{textAlign:"center", fontWeight:"600"}}>사이트를 홈화면에 추가하시면 더욱 쾌적하게 이용하실 수 있습니다.</li>
        <li><img src="https://img.icons8.com/ios-filled/100/3498DB/marker-d.png" width="35px" alt="구"></img> : 구에서 정보제공한 흡연구역</li>
        <li><img src="https://img.icons8.com/ios-filled/100/000000/marker-u.png" width="35px" alt="유저"></img> : 유저가 추가한 사설 흡연구역</li>
        <li><img src="https://img.icons8.com/sf-regular/96/000000/add.png" width="35px" alt="추가"></img> : 핀 등록버튼&gt;등록할위치 클릭</li>
        <li><img src="https://img.icons8.com/ios-filled/50/000000/location-update.png" width="35px" alt="새로고침"></img> : 새로고침(현위치)<br/>현위치마커는 클릭하면 사라집니다.</li>
        <li>흡연구역 등록 및 수정요청은 로그인을 하셔야 서비스 이용이 가능합니다.</li>
        <li>마커 클릭&gt;상세정보배너 클릭&gt;상세정보<br/>요약정보/맵 클릭&gt;요약정보끄기</li>
        <li>본인이 등록한 마커는 내 정보 또는 마커 정보에서 관리가 가능합니다.</li>
      </ul>
      <button className="helpbtn" onClick={tomain}>
      OK</button>
      </div>
    </div>
  );
}

export default Help;