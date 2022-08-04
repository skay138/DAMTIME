import axios from "axios";
import React, { startTransition, useState } from "react";
import "./App.css";
import "./addfin.css";
import Camera from "./camera";

const { kakao } = window;

function Addpin({ pinlat, pinlon, userid }) {
  const [loc, setLoc] = useState("");
  const [detail, setDetail] = useState("");
  const [fileUrl, setFileUrl] = useState("");

  const state = {
    FacilityType: "개방형흡연부스",
    Location: "",
    Longitude: pinlon,
    Latitude: pinlat,
    Description: "",
    UserId: userid,
    ImgUrl: fileUrl,
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

    console.log(state.FacilityType);
  };

  const handledes = (e) => {
    state.Description = e.target.value;
  };

  const push = () => {
    state.Location = `${loc} ${detail}`;
    axios.post("https://damtime.kro.kr:4000/insert", state).then(function (res) {
      console.log(res);
    });

    alert("흡연구역으로 등록되었습니다.");
    document.getElementById("addpin").className = "add hide";
  };

  const cancel = () => {
    document.getElementById("addpin").className = "add hide";
    setLoc("");
    setDetail("");
    setFileUrl("");
  };

  return (
    <div id="addpin" className="add hide">
      <h3>
        <p>흡연구역 등록</p>
      </h3>
      <br />
      <Camera fileUrl={fileUrl} setFileUrl={setFileUrl} />
      <form>
      <br />
        <p className="p">주소입력(빈칸 시 직접 작성)</p>
        <input onChange={handleloc} type="text" value={loc}></input>
        <br />
        <input
          onChange={handledetail}
          type="text"
          value={detail}
          placeholder="상세주소입력"
        ></input>
        <br /><br />
        타입선택
        <select onChange={handlesel}>
          <option value="개방형흡연부스">개방형흡연부스</option>
          <option value="부분개방형흡연실">부분개방형흡연실</option>
          <option value="폐쇄형흡연부스">폐쇄형흡연부스</option>
          <option value="라인형흡연구역">라인형흡연구역</option>
          <option value="비대면흡연부스">비대면흡연부스</option>
          <option value="기타">기타</option>
        </select>
        <br />
        <textarea onChange={handledes} placeholder="추가설명(선택)"></textarea>
        <br />
        <button
          className="button addpinbtn"
          type="submit"
          onClick={push}
        >등록</button>
      </form>
      <button className="button" onClick={cancel}>
        취소
      </button>
    </div>
  );
}
export default Addpin;
