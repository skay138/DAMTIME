import Menu from "./menu";
import axios from "axios";
import React, { useEffect, useState } from "react";
import DataTable from "./DataTable";

function Myinfo() {
  return (
    <div>
      <Menu />
      <DataTable />
    </div>
  );
}

export default Myinfo;
