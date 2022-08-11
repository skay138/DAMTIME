import Menu from "./menu";
import React from "react";


function Help() {
  
  return (
    <div>
      <div className="title">DAMTIME</div>
      <Menu />
      <ul>
        <li><img src="https://img.icons8.com/ios-filled/100/3498DB/marker-d.png" width="35px" alt="구"></img> : 구에서 인증한 공공 흡연구역</li>
        <li><img src="https://img.icons8.com/ios-filled/100/000000/marker-u.png" width="35px" alt="유저"></img> : 유저가 추가한 사설 흡연구역</li>
        <li><img src="https://img.icons8.com/sf-regular/96/000000/add.png" width="35px" alt="추가"></img> : 핀 등록버튼&gt;등록할위치 클릭</li>
        <li><img src="https://img.icons8.com/ios-filled/50/000000/location-update.png" width="35px" alt="새로고침"></img> : 새로고침(현위치)</li>
        <li>흡연구역 등록 및 수정요청은 로그인을<br/>하셔야 서비스 이용이 가능합니다.</li>
        <li>마커 클릭&gt;요약정보(클릭)&gt;상세정보<br/>요약정보/맵 클릭&gt;요약정보끄기</li>
        <li>등록하신 핀은 내정보에서 관리가능</li>
      </ul>
    </div>
  );
}

export default Help;