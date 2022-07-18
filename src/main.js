/* global kakao*/
import "./App.css";
import { useEffect, useState } from "react";
import { markerList } from "./markerList";
import pindata from "./pintest";
import Pininfo from "./pininfo";
import Button from "./Button";
import Addpin from "./Addfin";

const { kakao } = window;

function Main() {
  const [refresh, setRefresh] = useState(false); //refresh
  const [pinla, setPinla] = useState(33.450701); //위도
  const [pinma, setPinma] = useState(126.570667); //경도
  const [pinname, setPinname] = useState("이름없음");

  //map 구현

  var map; // 외부접근 위해 전역변수로 설정

  function geolocation() {
    // HTML5의 geolocation으로 사용할 수 있는지 확인합니다
    if (navigator.geolocation) {
      // GeoLocation을 이용해서 접속 위치를 얻어옵니다
      navigator.geolocation.getCurrentPosition(function (position) {
        var lat = position.coords.latitude, // 위도
          lon = position.coords.longitude; // 경도

        var locPosition = new kakao.maps.LatLng(lat, lon), // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다
          message = '<div style="padding:5px;">현위치</div>'; // 인포윈도우에 표시될 내용입니다

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

      var iwContent = message, // 인포윈도우에 표시할 내용
        iwRemoveable = true;

      // 인포윈도우를 생성합니다
      var infowindow = new kakao.maps.InfoWindow({
        content: iwContent,
        removable: iwRemoveable,
      });

      // 인포윈도우를 마커위에 표시합니다
      infowindow.open(map, marker);

      // 지도 중심좌표를 접속위치로 변경합니다
      map.setCenter(locPosition);
    }
  }

  useEffect(() => {
    var mapContainer = document.getElementById("myMap"), // 지도를 표시할 div
      mapOption = {
        center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
        level: 4, // 지도의 확대 레벨
      };

    map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

    geolocation(); //geolaction

    // 흡연구역 표시
    pindata.forEach((el) => {
      var imageSrc =
          "https://img.icons8.com/material-rounded/96/000000/marker.png", // 마커이미지의 주소입니다
        imageSize = new kakao.maps.Size(30, 30), // 마커이미지의 크기입니다
        imageOption = { offset: new kakao.maps.Point(27, 69) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

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

      var address = document.createElement("span");
      address.appendChild(document.createTextNode(el.Location));
      address.id = "location_" + el.No;
      content.appendChild(address);

      content.onclick = function () {
        document.getElementById("pininfo").className = "info";
        setPinname(el.Location);
      };

      /* 상세정보 구버젼
      content += "    <a><strong>&nbsp상세정보</strong></a>";
      content += '    <div class="desc">';
      content +=
        '        <img src="https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/place_thumb.png" alt="">';
      content += '        <span class="address">' + el.Location + "</span>";
      content += "    </div>";
      content += "</div>"; */

      // 커스텀 오버레이가 표시될 위치입니다
      var position = new kakao.maps.LatLng(el.Latitude, el.Longitude);

      // 커스텀 오버레이를 생성합니다
      var mapCustomOverlay = new kakao.maps.CustomOverlay({
        clickable: true,
        position: position,
        content: content,
        xAnchor: 0.56, // 커스텀 오버레이의 x축 위치입니다. 1에 가까울수록 왼쪽에 위치합니다. 기본값은 0.5 입니다
        yAnchor: 1.5, // 커스텀 오버레이의 y축 위치입니다. 1에 가까울수록 위쪽에 위치합니다. 기본값은 0.5 입니다
      });

      //마커의 클릭이벤트
      kakao.maps.event.addListener(marker, "click", function () {
        mapCustomOverlay.setMap(map);
      });

      kakao.maps.event.addListener(map, "click", function () {
        mapCustomOverlay.setMap(null);
      });
    });

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
    btn.textContent = "흡연구역 등록";
    btn.onclick = addpin;

    function addpin() {
      console.log("i HAVE TO CODE");
      document.getElementById("addpin").className = "info";
      Addplace(marker.getPosition());
    }

    var iwContent = btn, // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
      iwRemoveable = true; // removeable 속성을 true 로 설정하면 인포윈도우를 닫을 수 있는 x버튼이 표시됩니다

    // 인포윈도우를 생성합니다
    var infowindow = new kakao.maps.InfoWindow({
      content: iwContent,
      removable: iwRemoveable,
    });

    // 마커에 클릭이벤트를 등록합니다
    kakao.maps.event.addListener(marker, "click", function () {
      infowindow.open(map, marker);
    });

    kakao.maps.event.addListener(map, "click", function (mouseEvent) {
      {
        marker.getVisible()
          ? marker.setVisible(false)
          : marker.setVisible(true);
        infowindow.close();
        //마커가 보이는데 맵을 클릭하면 마커&인포윈도우 안보이게
        document.getElementById("addpin").className = "addpin hide"; //마커추가 숨기기
        document.getElementById("pininfo").className = "addpin hide"; //마커정보 숨기기
      }

      // 클릭한 위도, 경도 정보를 가져옵니다
      var latlng = mouseEvent.latLng;

      // 가져온 위치로 마커 이동
      marker.setPosition(latlng);
    });
  }, [refresh]);

  //장소추가
  const Addplace = (prop) => {
    var message = "클릭한 위치의 위도는 " + prop.La + " 이고, ";
    message += "경도는 " + prop.Ma + " 입니다";
    console.log(message);
    setPinla(prop.La);
    setPinma(prop.Ma);
  };


  
  //refresh
  const refreshfn = () => setRefresh((current) => !current);

  return (
    <div>
      <div className="Mapcontent">
        <div className="title" onClick={refreshfn}>
          DAMTIME
        </div>
        <div id="myMap" className="Mapstyle"></div>
        <button
          className="currentlocation"
          id="currentlo"
          onClick={geolocation}
        >
          <img
            src="https://img.icons8.com/sf-black-filled/64/000000/location-update.png"
            width="50px"
          />
        </button>
      </div>

      {/* 여기부터는 addpin입니다 */}
      <Addpin />

      {/* 여기부터는 핀정보입니다 */}
      <Pininfo name={pinname} />
    </div>
  );
}

export default Main;
