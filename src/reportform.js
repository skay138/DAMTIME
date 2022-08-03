import axios from "axios";
import React, { useState } from "react";
import Button from "./Button";
import ReportMap from "./ReportMap";
import "./pininfo.css";
import { useLocation, useNavigate } from "react-router-dom";

const { kakao } = window;

const Report = () => {
  const userid = sessionStorage.getItem("loginId");
  const navigate = useNavigate();
  const location = useLocation();
  const pin = location.state;
  // 수정요청 좌표
  const [clklat, setLat] = useState(pin.Latitude);
  const [clklon, setLon] = useState(pin.Longitude);
  const [text, setInputText] = useState("");
  const [loc, setLoc] = useState("");
  console.log(pin);
  const selectList = [
    "흡연구역 이름",
    "위치수정",
    "상세정보 수정",
    "삭제 요청",
  ];

  const [Selected, setSelected] = useState("흡연구역 이름");

  const state = {
    pinNo: pin.No,
    pininfo: loc,
    selected: Selected,
    lat: clklat,
    lon: clklon,
    text: text,
    userid: userid,
  };
  // 클릭해서 얻은 좌표 textarea에 띄워주기 위해 주소화
  var geocoder = new kakao.maps.services.Geocoder();
  var coord = new kakao.maps.LatLng(clklat, clklon);
  var callback = function (result, status) {
    if (status === kakao.maps.services.Status.OK) {
      if (
        result[0].road_address !== null &&
        result[0].road_address !== "제주특별자치도 제주시 첨단로 242"
      ) {
        setLoc(result[0].road_address.address_name);
      }
    }
  };
  geocoder.coord2Address(coord.getLng(), coord.getLat(), callback);

  const handdleChange = (e) => {
    setLoc(e.target.value);
  };

  const getValue = (e) => {
    setSelected(e.target.value);
  };
  const explain = () => {
    if (Selected === "위치수정") {
      return (
        <div id="mapdiv">
          <ReportMap
            pin={pin}
            setLat={setLat}
            setLon={setLon}
            clklat={clklat}
            clklon={clklon}
          />
          <textarea value={state.pininfo} onChange={handdleChange}></textarea>
        </div>
      );
    } else if (Selected === "흡연구역 이름") {
      return (
        <div>
          <textarea
            defaultValue={pin.Location}
            onChange={handleText}
          ></textarea>
        </div>
      );
    } else {
      return (
        <div>
          <textarea onChange={handleText} value={text}></textarea>
        </div>
      );
    }
  };

  const handleText = (e) => {
    setInputText(e.target.value);
  };

  const push = () => {
    axios.post("http://146.56.135.217:4000/report", state).then(function (res) {
      console.log(res);
    });
    alert("수정요청등록");
    navigate("/main");
    console.log(state);
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
