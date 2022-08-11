import axios from "axios";
import React, { useEffect, useState } from "react";
import ReportMap from "./ReportMap";
import "./pininfo.css";

const { kakao } = window;

const Modify = ({ pin }) => {
  // const userid = sessionStorage.getItem("loginId");


  // 수정요청 좌표
  const [clklat, setLat] = useState(pin.Latitude);
  const [clklon, setLon] = useState(pin.Longitude);
  const [loc, setLoc] = useState(pin.Location);
  useEffect(()=>{
    setLoc(pin.Location);
  },[pin.Location])

  const [mapon, setMapon] = useState(false);
  
  const selectList = [
    "개방형흡연부스",
    "부분개방형흡연실",
    "폐쇄형흡연부스",
    "라인형흡연구역",
    "비대면흡연부스",
    "기타",
  ];
  const [Selected, setSelected] = useState(pin.FacilityType);
  const getValue = (e) => {
    setSelected(e.target.value);
  };

  const state = {
    pinNo: pin.No,
    Location: loc,
    lat: clklat,
    lon: clklon,
    FacilityType: Selected,
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
        }
      }
    };
    geocoder.coord2Address(coord.getLng(), coord.getLat(), callback);
  }, [clklat, clklon]);

  const handdleChange = (e) => {
    setLoc(e.target.value);
  };

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
    <h5>새 위치를 터치하시면 주소가 나옵니다.<br />상세주소도 입력해주세요</h5>
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
    setMapon(true);
  }

  const hidemodify = () => {
    document.getElementById("modify").className = "modify hide";
  };

  return (
    <div id="modify" className="modify hide">
      <form className="modiform">
        <div id="mapdiv">
          <h3>주소수정</h3>
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
          <br />
          <br />
          <textarea className="loctext" onChange={handdleChange} value={loc}></textarea>
          <br />
          <div id="modiMap" className="modimap">
            {modifyMap()}
          </div>
        </div>
        <br />
        <button className="mapbtn " type="button" onClick={showMap}>지도표시</button>
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
