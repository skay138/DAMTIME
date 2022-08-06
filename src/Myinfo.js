import Menu from "./menu";
import React, { useEffect, useState } from "react";
import DataTable from "./DataTable";
import "./myinfo.css"

function Myinfo() {
  
  return (
    <div>
      <div className="title">DAMTIME</div>
      <Menu />
      <h2 className="mypintitle">내 핀 관리</h2>
      <DataTable />
    </div>
  );
}

export default Myinfo;
