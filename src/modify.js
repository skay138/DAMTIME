import axios from "axios";
import React, { useEffect, useState } from "react";
import ReportMap from "./ReportMap";
import "./pininfo.css";

const { kakao } = window;

const Modify = ({ pin }) => {
  // const userid = sessionStorage.getItem("loginId");


  // 수정요청 좌표
  const selectList = [
    "개방형흡연부스",
    "부분개방형흡연실",
    "폐쇄형흡연부스",
    "라인형흡연구역",
    "비대면흡연부스",
    "기타",
  ];
  const [Selected, setSelected] = useState(pin.FacilityType);
  const [clklat, setLat] = useState(pin.Latitude);
  const [clklon, setLon] = useState(pin.Longitude);
  const [loc, setLoc] = useState("");
  const [des, setDes] = useState("");
  useEffect(()=>{
    setLoc(pin.Location);
    setDes(pin.Description);
    setSelected(pin.FacilityType);
  },[pin.Location, pin.Description])

  const [mapon, setMapon] = useState(false);
  

  const getValue = (e) => {
    setSelected(e.target.value);
  };

  const state = {
    pinNo: pin.No,
    Location: loc,
    lat: clklat,
    lon: clklon,
    FacilityType: Selected,
    des : des,
  };

  console.log(pin.FacilityType);
  
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
  }

  const push = (e) => {
    if (window.confirm("수정하시겠습니까?")) {
      //핀 업데이트
      axios
        .post("https://damtime.kro.kr:4000/pinmodify", state)
        .then(function (res) {
          if (res.statusText === "OK") {
            alert("마커가 수정되었습니다.");
          }
        })
        .catch((err) => console.log(err));
      //기존핀 삭제
    } else {
      e.preventDefault();
    }
  };

  const modifyMap = () => {
    if (mapon === true ) {
    return (
    <div>
    <h5>상세주소도 입력해주세요</h5>
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
  }
  const showMap = () => {
    {mapon?setMapon(false):setMapon(true)};
  }

  const hidemodify = () => {
    document.getElementById("modify").className = "modify hide";
  };

  return (
    <div id="modify" className="modify hide">
      <h3>마커수정</h3>
      <form className="modiform">
        <div id="mapdiv">
          <textarea className="loctext" onChange={handdleChange} value={loc}></textarea>
          <br />
          <textarea className="loctext" onChange={handdleDes} value={des}></textarea>
          <br />
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
          <div id="modiMap" className="modimap">
            {modifyMap()}
          </div>
        </div>
        <button className="mapbtn " type="button" onClick={showMap}>{mapon ? "지도숨김" : "지도표시"}</button>
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
