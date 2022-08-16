import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ReportMap from "./ReportMap";
import "./pininfo.css";
import "./modify.css";

const { kakao } = window;

const Modify = () => {
  const location = useLocation();
  const pin = location.state;

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
  const [clklat, setLat] = useState("");
  const [clklon, setLon] = useState("");
  const [mlon, setMlon] = useState("");
  const [mlat, setMlat] = useState("");
  const [loc, setLoc] = useState("");
  const [des, setDes] = useState("");

  const state = {
    pinNo: pin.No,
    Location: loc,
    lat: mlat,
    lon: mlon,
    FacilityType: Selected,
    des: des,
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
        }else{
          setLoc("");
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

  const push = (e) => {
    e.preventDefault();
    if (window.confirm("수정하시겠습니까?")) {
      //핀 업데이트
      axios
        .post("https://damtime.kro.kr:4000/pinmodify", state)
        .then(function (res) {
          if (res.statusText === "OK") {
            alert("마커가 수정되었습니다.");
            window.history.back();
          }
        })
        .catch((err) => console.log(err));
      //기존핀 삭제
    }
  };
  
  const delmarker = (e) =>{
    var delpin = pin.No;
    var state = { data : delpin};
    e.preventDefault();
    if (window.confirm("삭제하시겠습니까?")) {
      //핀 업데이트
      axios
        .post("https://damtime.kro.kr:4000/userpin", state)
        .then(function (res) {
          if (res.statusText === "OK") {
            alert("마커가 삭제되었습니다.");
            window.history.back();
          }
        })
        .catch((err) => console.log(err));
      //기존핀 삭제
    }
  }

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

  const goback = (e) =>{
    e.preventDefault();
    window.history.back();
    
  }

  return (
    <div>
      <div className="title">DAMTIME</div>
    <div id="modify" className="modify">
      <h3 className="modititle">마커수정</h3>
      <form className="modiform">
        <div id="mapdiv">
          <textarea
            className="loctext"
            onChange={handdleChange}
            value={loc}
            placeholder="도로 위는 직접 주소를 입력해야 합니다."
          ></textarea>
          <br />
          <textarea
            className="loctext"
            onChange={handdleDes}
            value={des}
            placeholder="상세설명"
          ></textarea>
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
        <button className="mapbtn " type="button" onClick={showMap}>
          {mapon ? "지도숨김" : "지도표시"}
        </button>
        <br />
        <button className=" button modibtn" type="submit" onClick={push}>
          수정
        </button>
        <button className="button modibtn2" onClick={goback}>
          취소
        </button>
        <br/>
        <div className="delmarker" onClick={delmarker}>마커 삭제하기</div>
      </form>
    </div>
    </div>
  );
};

export default Modify;
