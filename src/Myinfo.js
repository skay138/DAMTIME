import Menu from "./menu";
import axios from "axios";
import React from "react";
import DataTable from "./DataTable";
import "./myinfo.css"

function Myinfo() {
  const ACCESS_TOKEN = sessionStorage.getItem("kakaotoken");
  const secession =()=>{
    if(window.confirm("정말로 연결을 끊으시겠습니까?")){
      axios.post(
        'https://kapi.kakao.com/v1/user/unlink',
        '',
        {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Bearer ${ACCESS_TOKEN}`
            }
        }
    ).then((res)=>{console.log(res.data.id)});
    }
  }

  
  return (
    <div className="myinfo">
      <div className="title">DAMTIME</div>
      <Menu />
      <h2 className="mypintitle">내 마커 관리</h2>
      <DataTable />
      <div className="endbtn" onClick={secession}>카카오계정 연결끊기</div>
    </div>
  );
}

export default Myinfo;
