import Menu from "./menu";
import React, { useEffect, useState } from "react";
import DataTable from "./DataTable";

function Myinfo() {
  return (
    <div>
      <div className="title">DAMTIME</div>
      <Menu />
      <DataTable />
    </div>
  );
}

export default Myinfo;
