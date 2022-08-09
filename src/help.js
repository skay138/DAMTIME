import Menu from "./menu";
import React, { useEffect, useState } from "react";

function Help() {
  
  return (
    <div>
      <div className="title">DAMTIME</div>
      <Menu />
      <ul>
        <li><img src="https://img.icons8.com/ios-filled/100/3498DB/marker-d.png" width="35px"></img> : 구에서 설치한 공공 흡연구역</li>
        <li><img src="https://img.icons8.com/ios-filled/100/000000/marker-u.png" width="35px"></img> : 유저가 추가한 사설 흡연구역</li>
        <li>지도클릭>버튼클릭>흡연구역 등록<br/>(최대한 정확하게 찍어주세요)</li>
        <li><img src="https://img.icons8.com/ios-filled/50/000000/location-update.png" width="35px"></img> : 새로고침(현위치)</li>
        <li>흡연구역 등록 및 수정요청은 로그인을<br/>하셔야 서비스 이용이 가능합니다.</li>
        <li>마커를 클릭하면 요약정보가 나오고<br/> 요약정보를 클릭시 상세정보가 나옵니다.</li>
        <li>등록하신 핀은 내정보에서 관리가능</li>
      </ul>
    </div>
  );
}

export default Help;
