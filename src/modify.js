import axios from "axios";
import React, { useState } from "react";
import ReportMap from "./ReportMap";
import "./pininfo.css";

const { kakao } = window;

const Modify = ({ pin }) => {
  const userid = sessionStorage.getItem("loginId");

  // 수정요청 좌표
  const [clklat, setLat] = useState(pin.Latitude);
  const [clklon, setLon] = useState(pin.Longitude);
  const [loc, setLoc] = useState("");
  const [detail, setDetail] = useState("");
  //console.log(pin);
  const state = {
    pinNo: pin.No,
    Location: `${loc} ${detail}`,
    lat: clklat,
    lon: clklon,
    userid: userid,
  };
  //console.log(state);
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

  const handledetail = (e) => {
    setDetail(e.target.value);
    console.log(state);
  };

  const push = (e) => {
    if (window.confirm("수정하시겠습니까?")) {
      //핀 업데이트
      axios
        .post("https://damtime.kro.kr:4000/insert", state)
        .then(function (res) {
        });
      //기존핀 삭제
    } else {
      e.preventDefault();
    }
  };

  const hidemodify = () => {
    document.getElementById("modify").className = "modify hide";
  };

  return (
    <div id="modify" className="modify hide">
      <form className="modiform">
        <div id="mapdiv">
          <h3>위치수정</h3>
          <ReportMap
            pin={pin}
            setLat={setLat}
            setLon={setLon}
            clklat={clklat}
            clklon={clklon}
          />
          <input value={state.Location} onChange={handdleChange}></input>
          <br />
          <input placeholder="상세주소 입력" onChange={handledetail}></input>
        </div>
        <br />
        <br />
        <button className=" button modibtn" type="submit" onClick={push}>
          전송
        </button>
        <button className="button modibtn2" onClick={hidemodify}>
          취소
        </button>
      </form>
    </div>
  );
};

export default Modify;
