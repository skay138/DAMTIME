import Menu from "./menu";
import React, { useEffect, useState } from "react";
import DataTable from "./DataTable";
import axios from "axios";

function Myinfo() {
  const userid = sessionStorage.getItem("loginId");
  const [pins, setPins] = useState([]);

  React.useEffect(() => {
    axios
      .get("https://damtime.kro.kr:4000/getmypin", { params: { userid } })
      .then((res) => {
        setPins(res.data);
      })
      .catch((error) => console.log(error));
  }, []);
  return (
    <div>
      <div className="title">DAMTIME</div>
      <Menu />
      <DataTable pins={pins} />
    </div>
  );
}

export default Myinfo;
