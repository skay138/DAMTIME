import React, { useEffect, useState } from "react";
import "./newmap.css";
const { kakao } = window;

const ReportMap = ({pin}) => {
  const [clklat, setLat] = useState(33.450701);
  const [clklon, setLon] = useState(126.570667);

  useEffect(() => {
    var mapContainer = document.getElementById("map"), // 지도를 표시할 div
      mapOption = {
        center: new kakao.maps.LatLng(pin.Latitude, pin.Longitude), // 지도의 중심좌표
        level: 2, // 지도의 확대 레벨
      };

    var map = new kakao.maps.Map(mapContainer, mapOption);

    // 마커가 표시될 위치입니다
    var markerPosition = new kakao.maps.LatLng(pin.Latitude, pin.Longitude);

    // 마커를 생성합니다
    var marker = new kakao.maps.Marker({
      position: markerPosition,
    });

    // 마커가 지도 위에 표시되도록 설정합니다
    marker.setMap(map);

    // 지도에 클릭 이벤트를 등록합니다
    // 지도를 클릭하면 마지막 파라미터로 넘어온 함수를 호출합니다
    kakao.maps.event.addListener(map, "click", function (mouseEvent) {
      var latlng = mouseEvent.latLng;
      setLat(latlng.getLat());
      setLon(latlng.getLng());


      // 가져온 위치로 마커 이동
      marker.setPosition(latlng);
    });
  }, []);

  return (
    <div className="outdiv">
      <div id="map" className="mapdiv"></div>
      <br/>
      {/* <p>
        경도:{clklat}
        <br></br> 위도:{clklon}
      </p> */}
    </div>
  );
};

export default ReportMap;
