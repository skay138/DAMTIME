import { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";


export default function DataTable() {

  const columns = [
    { field: "id", headerName: "고유번호", width: 70 }, //No
    { field: "Location", headerName: "장소명", width: 300 },
    { field: "Description", headerName: "상세설명", width: 200 },
    { field: "FacilityType", headerName: "장소유형", width: 150 }
  ];
  
  const [rows, setRows] = useState([]);
  const rowfn = (p) => {
   Array.from(p).forEach(el => {
    el.id = el.No;
   });
   setRows(p);
  }

  const userid = sessionStorage.getItem("loginId");
  axios
    .get("https://damtime.kro.kr:4000/getmypin", {params: {userid}})
    .then((res) => {
      // console.log(userid)
      // console.log(res.data);
      const mypin = res.data;
      rowfn(mypin);
    })
    .catch((error) => console.log(error));

  

  return (
    <div
      style={{ position: "absolute", top: 150, height: 400, width: "100%" }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>
  );
}
