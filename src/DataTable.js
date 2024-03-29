import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./pininfo.css";

export default function DataTable() {
  const [selectionModel, setSelectionModel] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const state = {
    data: selectionModel.join(),
  };
  const userid = sessionStorage.getItem("loginId");
  const navigate = useNavigate();

  const columns = [
    // { field: "id", headerName: "번호", width: 50 },
    { field: "Location", headerName: "장소명", width: 400 },
    { field: "Description", headerName: "상세설명", width: 250 },
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
        const mypin = res.data;
        rowfn(mypin);
      })
      .catch((error) => console.log(error));
  }, [refresh]);

  const handdlechange = (e) => {
    setSelectionModel(e);
  };

  const modify = () => {
    var len = selectionModel.length;
    len === 0
      ? alert("수정할 마커를 선택해주세요 ")
      : len === 1
      ? Array.from(rows).forEach((el) => {
          Array.from(selectionModel).forEach((sl) => {
            console.log(sl)
            if (el.No === sl) {
              navigate("/modify", { state: el });
            }
          });
        })
      : alert("수정은 한 개씩 해주세요");
  };

  const deletepin = () => {
    if (window.confirm("마커를 삭제하시겠습니까?")) {
      axios
        .post("https://damtime.kro.kr:4000/userpin", state)
        .then((res) => {
          if (res.statusText === "OK") {
            alert(res.data.affectedRows + "개의 마커가 삭제되었습니다.");
            setRefresh((current) => !current);
          }
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div>
      <div style={{ width: "100%", height: "100%" }}>
        <div
          style={{ position: "absolute", top: 110, height: 400, width: "100%" }}
        >
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection
            onSelectionModelChange={handdlechange}
            selectionModel={selectionModel}
          />
          <br/>
          <button className="myinfobtnm" onClick={modify}>수정</button>
          <button className="myinfobtnd" onClick={deletepin}>삭제</button>
        </div>
      </div>
    </div>
  );
}
