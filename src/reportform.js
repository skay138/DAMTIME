import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ReportMap from "./ReportMap";
import "./pininfo.css";
import "./button.css";

const { kakao } = window;

const Report = () => {
  const location = useLocation();
  const pin = location.state;
  const userid = sessionStorage.getItem("loginId");

  // 수정요청 좌표
  const selectList = [
    "개방형흡연부스",
    "부분개방형흡연실",
    "폐쇄형흡연부스",
    "라인형흡연구역",
    "비대면흡연부스",
    "기타",
  ];

  const reportList = [
    "흡연구역 이름",
    "흡연구역 위치",
    "상세정보",
    "삭제 요청",
    "기타",
  ];

  const [selectedreport, setSelectedreport] = useState("흡연구역 이름");

  const [Selected, setSelected] = useState(pin.FacilityType);
  const [clklat, setLat] = useState("");
  const [clklon, setLon] = useState("");
  const [mlon, setMlon] = useState("");
  const [mlat, setMlat] = useState("");
  const [loc, setLoc] = useState("");
  const [des, setDes] = useState("");
  const [text, setText] = useState("");

  const state = {
    pinNo: pin.No,
    Location: loc,
    type: selectedreport,
    lat: mlat,
    lon: mlon,
    FacilityType: Selected,
    des: des,
    reporter: userid,
    owner: pin.UserId,
    note: text,
  };

  useEffect(() => {
    setLoc(pin.Location);
    setDes(pin.Description);
    setSelected(pin.FacilityType);
    setMlat(pin.Latitude);
    setMlon(pin.Longitude);
  }, [pin.No]);

  const [mapon, setMapon] = useState(false);

  const getValue = (e) => {
    setSelected(e.target.value);
  };

  const getreportValue = (e) => {
    setSelectedreport(e.target.value);
  };

  // 클릭해서 얻은 좌표 textarea에 띄워주기 위해 주소화

  useEffect(() => {
    var geocoder = new kakao.maps.services.Geocoder();
    var coord = new kakao.maps.LatLng(clklat, clklon);
    var callback = function (result, status) {
      if (status === kakao.maps.services.Status.OK) {
        if (
          result[0].road_address !== null &&
          result[0].road_address !== "제주특별자치도 제주시 첨단로 242"
        ) {
          setLoc(result[0].road_address.address_name);
          setMlat(clklat);
          setMlon(clklon);
        }
        else{
          setMlat(clklat);
          setMlon(clklon);
        }
      }
    };
    geocoder.coord2Address(coord.getLng(), coord.getLat(), callback);
  }, [clklat, clklon]);

  const handdleChange = (e) => {
    setLoc(e.target.value);
  };

  const handdleDes = (e) => {
    setDes(e.target.value);
  };

  const handdlenote = (e) => {
    setText(e.target.value);
  };

  const push = (e) => {
    e.preventDefault();
    if (window.confirm("수정요청을 보내겠습니까?")) {
      axios
        .post("https://damtime.kro.kr:4000/report", state)
        .then(function (res) {
          if(res.data !== ""){
            alert("수정요청등록");
          }
          else{
            alert("에러발생");
          }
        });
      window.history.back();
    }
  };

  const modifyMap = () => {
    if (mapon === true) {
      return (
        <div>
          <h5>수정될 핀의 상세주소도 입력해주세요</h5>
          <ReportMap
            pin={pin}
            setLat={setLat}
            setLon={setLon}
            clklat={clklat}
            clklon={clklon}
          />
        </div>
      );
    }
  };
  const showMap = () => {
    mapon ? setMapon(false) : setMapon(true);
  };

  const goback = (e) => {
    e.preventDefault();
    window.history.back();
  };

  return (
    <div>
      <header className="title">DAMTIME</header>
      <div id="modify" className="modify">
        <h3 className="head">수정요청</h3>
        <p style={{ fontSize: "20px", padding: "5px" }}>
          주요 요청사항 :{" "}
          <select
            id="type"
            className="options"
            onChange={getreportValue}
            value={selectedreport}
          >
            {reportList.map((item) => (
              <option value={item} key={item}>
                {item}
              </option>
            ))}
          </select>
        </p>

        <form className="modiform">
          <div id="mapdiv">
            <textarea
              className="loctext"
              onChange={handdleChange}
              value={loc}
              placeholder="주소"
            ></textarea>
            <br />
            <textarea
              className="destext"
              onChange={handdleDes}
              value={des}
              placeholder="상세설명"
            ></textarea>
            <br />
            <p style={{ fontSize: "20px", padding: "5px" }}>
              타입수정 :{" "}
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
            </p>

            <div id="modiMap" className="modimap">
              {modifyMap()}
            </div>
          </div>
          <button className="mapbtn" type="button" onClick={showMap}>
            {mapon ? "지도숨김" : "위치수정"}
          </button>
          <br />
          <textarea
            className="notetext"
            onChange={handdlenote}
            value={text}
            placeholder="추가요청사항/설명"
          ></textarea>
          <br />
          <button className="modbtn" type="submit" onClick={push}>
            전송
          </button>
          <button className="modbtn" onClick={goback}>
            취소
          </button>
        </form>
      </div>
    </div>
  );
};

export default Report;
