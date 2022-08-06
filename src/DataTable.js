import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";

export default function DataTable() {
  const [selectionModel, setSelectionModel] = useState([]);

  const userid = sessionStorage.getItem("loginId");

  const columns = [
    { field: "id", headerName: "번호", width: 70 }, //No
    { field: "Location", headerName: "장소명", width: 400 },
    { field: "Description", headerName: "상세설명", width: 200 },
    { field: "FacilityType", headerName: "장소유형", width: 150 },
  ];

  const [rows, setRows] = useState([]);

  const rowfn = (p) => {
    Array.from(p).forEach((el) => {
      el.id = el.No;
    });
    setRows(p);
  };

  useEffect(() => {
    axios
      .get("https://damtime.kro.kr:4000/getmypin", { params: { userid } })
      .then((res) => {
        // console.log(userid)
        // console.log(res.data);
        const mypin = res.data;
        rowfn(mypin);
      })
      .catch((error) => console.log(error));
  }, []);

  const handdlechange = (e) => {
    setSelectionModel(e);
  };
  
  const deletepin = () =>{
    let data = selectionModel.join();
    console.log(data);
    if(window.confirm("마커를 삭제하시겠습니까?")){
      axios.post("http://damtime.kro.kr:4000/userpin", data).then((res)=>{
        console.log(res);
      })
    }

  }

  return (
    <div style={{ position: "absolute", top: 150, height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        onSelectionModelChange={handdlechange}
        selectionModel={selectionModel}
      />
      <button onClick={deletepin}>삭제</button>
    </div>
  );
}
