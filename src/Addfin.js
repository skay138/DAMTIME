import axios from "axios";
import React, { useEffect, useState } from "react";
import "./App.css";
import "./addfin.css";

const { kakao } = window;

function Addpin({ pinlat, pinlon, userid, pinaddedfn }) {
  const [loc, setLoc] = useState("");
  const [detail, setDetail] = useState("");
  //const [fileUrl, setFileUrl] = useState(""); //카메라였던것

  const state = {
    FacilityType: "개방형흡연부스",
    Location: "",
    Longitude: pinlon,
    Latitude: pinlat,
    Description: "",
    UserId: userid,
  };

  var geocoder = new kakao.maps.services.Geocoder();
  var coord = new kakao.maps.LatLng(pinlat, pinlon);
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

  const handleloc = (e) => {
    setLoc(e.target.value);
  };

  const handledetail = (e) => {
    setDetail(e.target.value);
  };

  const handlesel = (e) => {
    state.FacilityType = e.target.value;
  };

  const handledes = (e) => {
    state.Description = e.target.value;
  };

  const push = (e) => {
    e.preventDefault();
    state.Location = `${loc} ${detail}`;
    if (window.confirm("마커를 등록하시겠습니까?")) {
      axios
        .post("https://damtime.kro.kr:4000/insert", state)
        .then(function (res) {
          console.log(res);
        });
      alert("흡연구역으로 등록되었습니다.");
      document.getElementById("addpin").className = "add hide";
      document.getElementById("myMap").className = "Mapstyle";
      pinaddedfn();
    }
  };

  const cancel = () => {
    document.getElementById("addpin").className = "add hide";
    document.getElementById("myMap").className = "Mapstyle";
    setLoc("");
    setDetail("");
  };

  return (
    <div id="addpin" className="add hide">
      <div className="addtitle">
        <span className="addspan">흡연구역 등록</span>
      </div>
      <br />
      {/* <Camera fileUrl={fileUrl} setFileUrl={setFileUrl} /> */}
      <form className="addform">
        <p>주소 입력<span className="ifblank"> (빈칸 시 직접 작성)</span> </p>
        <input onChange={handleloc} type="text" value={loc}></input>
        <br />
        <input
          onChange={handledetail}
          type="text"
          value={detail}
          placeholder="상세주소입력"
        ></input>
        <div className="type">
        <span className="seltype">타입선택 :  </span>
        <select onChange={handlesel}>
          <option value="개방형흡연부스">개방형흡연부스</option>
          <option value="부분개방형흡연실">부분개방형흡연실</option>
          <option value="폐쇄형흡연부스">폐쇄형흡연부스</option>
          <option value="라인형흡연구역">라인형흡연구역</option>
          <option value="비대면흡연부스">비대면흡연부스</option>
          <option value="기타">기타</option>
        </select>
        </div>
        <textarea onChange={handledes} placeholder="추가설명(선택)"></textarea>
        <button className="button addpinbtn" type="submit" onClick={push}>
          등록
        </button>
      </form>
      <button className="button cnclbtn" onClick={cancel}>
        취소
      </button>
    </div>
  );
}
export default Addpin;
