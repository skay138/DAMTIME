/* global kakao*/
import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Pininfo from "./pininfo";
import Addpin from "./Addfin";
import Menu from "./menu";
import Adfit from "./Adfit";


const { kakao } = window;

function Main() {
  //로그인 시 정보받기

  const userid = sessionStorage.getItem("loginId");

  const [addbtn, setAddbtn] = useState(true);
  const [refresh, setRefresh] = useState(false); //refresh
  const [pinadded, setPinadded] = useState(false);

  //addfin
  const [pinla, setPinla] = useState(33.450701); //위도
  const [pinma, setPinma] = useState(126.570667); //경도

  //fin info
  const [pin, setPin] = useState({
    No: "",
    FacilityType: "",
    Location: "",
    Longitude: "",
    Latitude: "",
  });

  //pin api
  const [pindata, setPindata] = useState([]);
  const [userpin, setUserpin] = useState([]);

  //map 구현

  var map; // 외부접근 위해 전역변수로 설정

  //클릭한 마커
  const [clkedoverlay, setClkedoverlay] = useState([]);

  //geolocation
  function geolocation() {
    // HTML5의 geolocation으로 사용할 수 있는지 확인합니다
    if (navigator.geolocation) {
      // GeoLocation을 이용해서 접속 위치를 얻어옵니다
      navigator.geolocation.getCurrentPosition(function (position) {
        var lat = position.coords.latitude, // 위도
          lon = position.coords.longitude; // 경도

        var locPosition = new kakao.maps.LatLng(lat, lon), // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다
          message =
            '<div class ="label"><span class="left"></span><span class="center">현위치!</span><span class="right"></span></div>'; // 인포윈도우에 표시될 내용입니다

        // 마커와 인포윈도우를 표시합니다
        displayMarker(locPosition, message);
      });
    } else {
      // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다

      var locPosition = new kakao.maps.LatLng(33.450701, 126.570667),
        message = "geolocation을 사용할수 없어요..";

      displayMarker(locPosition, message);
    }
    // 지도에 마커와 인포윈도우를 표시하는 함수입니다
    function displayMarker(locPosition, message) {
      // 마커를 생성합니다
      var marker = new kakao.maps.Marker({
        map: map,
        position: locPosition,
      });


      var content = document.createElement("div");
      content.className = "currentlo";
      content.innerHTML = "현위치"

     

      // 인포윈도우를 생성합니다
      var customOverlay = new kakao.maps.CustomOverlay({
        content: content,
        position: locPosition,
        xAnchor: 0.5, // 커스텀 오버레이의 x축 위치입니다. 1에 가까울수록 왼쪽에 위치합니다. 기본값은 0.5 입니다
        yAnchor: 2.35, // 커스텀 오버레이의 y축 위치입니다. 1에 가까울수록 위쪽에 위치합니다. 기본값은 0.5 입니다
      });

      // 인포윈도우를 마커위에 표시합니다
      customOverlay.setMap(map);

      // 지도 중심좌표를 접속위치로 변경합니다
      map.setCenter(locPosition);
      kakao.maps.event.addListener(marker, "click", function () {
        marker.setMap(null);
        customOverlay.setMap(null);
      });
    }
  }

  //pinload
  function pinupload(data, pinimage) {
    Array.from(data).forEach((el) => {
      var imageSrc = pinimage, // 마커이미지의 주소입니다
        imageSize = new kakao.maps.Size(30, 30), // 마커이미지의 크기입니다
        imageOption = { offset: new kakao.maps.Point(15, 30) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

      // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
      var markerImage = new kakao.maps.MarkerImage(
        imageSrc,
        imageSize,
        imageOption
      );

      var marker = new kakao.maps.Marker({
        image: markerImage,
        map: map,
        position: new kakao.maps.LatLng(el.Latitude, el.Longitude),
        title: el.Location,
      });

      //오버레이
      var content = document.createElement("div");
      content.className = "overlay_info";

      var atag = document.createElement("a");
      var strong = document.createElement("strong");
      strong.innerHTML = "상세정보";
      atag.appendChild(strong);
      var descdiv = document.createElement("div");
      descdiv.className = "desc";

      var address = document.createElement("span");
      address.className = "address";
      address.appendChild(document.createTextNode(el.Location));
      address.id = "location_" + el.No;
      descdiv.appendChild(address);

      content.appendChild(atag);
      content.appendChild(descdiv);

      atag.onclick = function () {
        document.getElementById("pininfo").className = "info";
        document.getElementById("myMap").className = "Mapstyle dark";
        setPin(el);
      };

      descdiv.onclick = function () {
        mapCustomOverlay.setMap(null);
      };

      // 커스텀 오버레이가 표시될 위치입니다
      var position = new kakao.maps.LatLng(el.Latitude, el.Longitude);

      // 커스텀 오버레이를 생성합니다
      var mapCustomOverlay = new kakao.maps.CustomOverlay({
        id: el.No,
        clickable: true,
        position: position,
        content: content,
        xAnchor: 0.5, // 커스텀 오버레이의 x축 위치입니다. 1에 가까울수록 왼쪽에 위치합니다. 기본값은 0.5 입니다
        yAnchor: 1.25, // 커스텀 오버레이의 y축 위치입니다. 1에 가까울수록 위쪽에 위치합니다. 기본값은 0.5 입니다
      });

      //마커의 클릭이벤트
      kakao.maps.event.addListener(marker, "click", function () {
        map.panTo(position);
        mapCustomOverlay.setMap(map);
        setClkedoverlay(el);
        console.log(el);
      });

      kakao.maps.event.addListener(map, "click", function () {
        mapCustomOverlay.setMap(null);
      });
    });
  }

  useEffect(() => {
    axios
      .get("https://damtime.kro.kr:4000/public")
      .then((res) => {
        setPindata(res.data);
      })
      .catch((error) => console.log(error));

    axios
      .get("https://damtime.kro.kr:4000/userpin")
      .then((res) => {
        setUserpin(res.data);
      })
      .catch((error) => console.log(error));
  }, [pinadded]);

  useEffect(() => {
    setAddbtn(true);

    var mapContainer = document.getElementById("myMap"), // 지도를 표시할 div
      mapOption = {
        center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
        level: 2, // 지도의 확대 레벨
      };

    map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

    geolocation(); //geolaction

    //document.getElementById("currentlo").onclick = geolocation;

    // 흡연구역 표시
    pinupload(
      pindata,
      "https://img.icons8.com/ios-filled/100/3498DB/marker-d.png"
    );
    pinupload(
      userpin,
      "https://img.icons8.com/ios-filled/100/000000/marker-u.png"
    );

    var marker = new kakao.maps.Marker({
      // 지도 중심좌표에 마커를 생성합니다
      position: map.getCenter(),
      clickable: true, // 마커를 클릭했을 때 지도의 클릭 이벤트가 발생하지 않도록 설정합니다
    });
    // 지도에 마커를 표시합니다
    marker.setMap(map);
    marker.setVisible(false);

    //흡연구역등록
    let btn = document.createElement("div");
    btn.className = "adddiv";
    btn.textContent = "흡연구역 등록";

    btn.onclick = addpin;

    function addpin() {
      if (userid === "null") {
        alert("비로그인 상태입니다.");
      } else {
        document.getElementById("addpin").className = "add";
        document.getElementById("myMap").className = "Mapstyle dark"
        setPinla(marker.getPosition().Ma);
        setPinma(marker.getPosition().La);
      }
    }

    var iwContent = btn; // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다

      

    // 인포윈도우를 생성합니다
    var customOverlay = new kakao.maps.CustomOverlay({
      content: iwContent,
      clickable : true,
      position: map.getCenter(),
      xAnchor: 0.5, // 커스텀 오버레이의 x축 위치입니다. 1에 가까울수록 왼쪽에 위치합니다. 기본값은 0.5 입니다
      yAnchor: 2.45, 
    });

    //addbtn
    document.getElementById("addbtn").onclick = addbtn;

    function addbtn() {
      setAddbtn((current) => !current);
      if (marker.getVisible()) {
        marker.setVisible(false);
        customOverlay.setMap(null);
      } else {
        var position = map.getCenter();
        marker.setPosition(position);
        marker.setVisible(true);
        customOverlay.setMap(map);
        customOverlay.setPosition(position);
      }
    }

    kakao.maps.event.addListener(map, "click", function (mouseEvent) {
      var latlng = mouseEvent.latLng;
      marker.setPosition(latlng);
      customOverlay.setPosition(latlng);

      document.getElementById("pininfo").className = "info hide"; //마커정보 숨기기
      document.getElementById("addpin").className = "add hide";
      document.getElementById("myMap").className = "Mapstyle";
    });
  }, [refresh, pindata, userpin]);

  //refresh
  const refreshfn = () => setRefresh((current) => !current);
  const pinaddedfn = () => setPinadded((current) => !current);

  return (
    <div>
      <div className="Mapcontent">
        <div className="title" onClick={refreshfn}>
          DAMTIME
        </div>
        <div id="myMap" className="Mapstyle"></div>
        <button className={addbtn ? "addbtn" : "addbtnout"} id="addbtn">
          <img
            src="https://img.icons8.com/sf-regular/96/000000/add.png"
            width="45px" alt=""
          />
        </button>
        <button className="currentlocation" id="currentlo" onClick={refreshfn}>
          <img
            src="https://img.icons8.com/ios-filled/50/000000/location-update.png"
            width="35px" alt=""
          />
        </button>

        {/* 여기부터는 addpin입니다 */}
        <Addpin
          pinlat={pinla}
          pinlon={pinma}
          userid={userid}
          pinaddedfn={pinaddedfn}
        />

        {/* 여기부터는 핀정보입니다 */}
        <Pininfo pin={pin} />
      </div>
      <Menu />
      <Adfit/>
    </div>
  );
}

export default Main;
