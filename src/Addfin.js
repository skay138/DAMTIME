import axios from "axios";
import React, { useEffect, useState } from "react";
import "./App.css";
import "./addfin.css";
import Button from "./Button";
import Camera from "./camera";

const { kakao } = window;

function Addpin({ lat, lon }) {
  const [loc, setLoc] = useState("");
  const [detail, setDetail] = useState("");

  var geocoder = new kakao.maps.services.Geocoder();
  var coord = new kakao.maps.LatLng(lat, lon);
  var callback = function (result, status) {
    if (status === kakao.maps.services.Status.OK) {
      if (
        result[0].road_address != null &&
        result[0].road_address != "제주특별자치도 제주시 첨단로 242"
      ) {
        setLoc(result[0].road_address.address_name);
      }
    }
  };
  geocoder.coord2Address(coord.getLng(), coord.getLat(), callback);

  const state = {
    No: 0,
    FacilityType: "",
    Location: "",
    Longitude: lon,
    Latitude: lat,
  };

  const handdleloc = (e) => {
    setLoc(e.target.value);
  };

  const handdledetail = (e) => {
    setDetail(e.target.value);
  };

  const push = () => {
    state.Location = `${loc} ${detail}`;
    axios.post("/insert", state).then(function (res) {
      console.log(res);
    });

    alert("흡연구역으로 등록되었습니다.");
    document.getElementById("addpin").className = "info hide";
  };

  const cancel = () => {
    document.getElementById("addpin").className = "info hide";
    setLoc("");
    setDetail("");
  };

  return (
    <div id="addpin" className="info hide">
      <h4>흡연구역을 등록해주세요</h4>
      <Camera />
      <br />
      <p className="p">기본주소(빈칸 시 직접 작성)</p>
      <input onChange={handdleloc} type="text" value={loc}></input>
      <br />
      <input
        onChange={handdledetail}
        type="text"
        value={detail}
        placeholder="상세주소입력"
      ></input>
      <br />
      <br />
      <input
        className="button"
        type="submit"
        onClick={push}
        value="등록"
      ></input>
      <button onClick={cancel}>취소</button>
    </div>
  );
}
export default Addpin;
