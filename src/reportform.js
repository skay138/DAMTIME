import React, { useState } from "react";
import Button from "./Button";
import ReportMap from "./ReportMap";
import "./pininfo.css";

const Report = () => {
  const selectList = [
    "흡연구역 이름",
    "장소변경",
    "상세정보 수정",
    "흡연구역이 없음",
  ];
  const [Selected, setSelected] = useState("흡연구역 이름");
  const getValue = (e) => {
    setSelected(e.target.value);
  };
  const explain = () => {
    if (Selected === "장소변경") {
      return (
        <div id="mapdiv">
          <ReportMap />
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
        <input className="button" type="submit" value="요청"></input>
        <Button name="닫기" action="close" />
      </form>
    </div>
  );
};
export default Report;
