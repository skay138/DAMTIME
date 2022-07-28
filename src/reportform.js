import axios from "axios";
import React, { useState } from "react";
import Button from "./Button";
import ReportMap from "./ReportMap";
import "./pininfo.css";
import { useLocation, useNavigate } from "react-router-dom";

const Report = () => {

  const selectList = [
    "흡연구역 이름",
    "위치수정",
    "상세정보 수정",
    "흡연구역이 없음",
  ];

  const [Selected, setSelected] = useState("흡연구역 이름");

  const state ={
    //임의의 변수입니다.
    pininfo : 1,
    selected : Selected,
    lat : 33.450701,
    lon : 126.570667,
    text : "plz"
  }

  const navigate = useNavigate();
  const location = useLocation();
  const pin = location.state;
  // console.log(pin);
  const getValue = (e) => {
    setSelected(e.target.value);
  };
  const explain = () => {
    if (Selected === "위치수정") {
      return (
        <div id="mapdiv">
          <ReportMap pin={pin} />
        </div>
      );
    } else {
      return (
        <div>
          <textarea></textarea>
        </div>
      );
    }
  };

  const push = () => {
    axios.post("/report", state).then(function (res) {
      console.log(res);
    });
    alert("수정요청등록");
    navigate("/");
  };
  return (
    <div id="report" className="report">
      <h1>수정 요청</h1>
      <form>
        <select
          id="type"
          className="options"
          onChange={getValue}
          value={Selected}
        >
          {selectList.map((item) => (
            <option value={item} key={item}>
              {item}
            </option>
          ))}
        </select>
        <p>신고유형 : {Selected}</p>
        <div id="explaindiv">{explain()}</div>
        <input
          className="button"
          type="submit"
          value="요청"
          onClick={push}
        ></input>
        <Button name="닫기" action="home" />
      </form>
    </div>
  );
};

export default Report;
