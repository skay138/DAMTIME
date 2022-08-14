import React, { useEffect, useState } from "react";
import "./newmap.css";
const { kakao } = window;
var map; var marker;

const ReportMap = ({ pin, clklat, setLat, clklon, setLon }) => {

  useEffect(() => {
    var mapContainer = document.getElementById("map"), // 지도를 표시할 div
      mapOption = {
        center: new kakao.maps.LatLng(pin.Latitude, pin.Longitude), // 지도의 중심좌표
        level: 1, // 지도의 확대 레벨
      };

    map = new kakao.maps.Map(mapContainer, mapOption);

    // 마커가 표시될 위치입니다
    var markerPosition = new kakao.maps.LatLng(pin.Latitude, pin.Longitude);

    // 마커를 생성합니다
    marker = new kakao.maps.Marker({
      position: markerPosition,
    });

    // 마커가 지도 위에 표시되도록 설정합니다
    marker.setMap(map);
    kakao.maps.event.addListener(map, "click", function (mouseEvent) {
        var latlng = mouseEvent.latLng;
        setLat(latlng.getLat());
        setLon(latlng.getLng());
        
        marker.setPosition(latlng);
      });
  
  }, [pin.Latitude, pin.Longitude]);

  return (
    <div className="outdiv">
      <div id="map" className="mapdiv"></div>
      <br />
    </div>
  );
};

export default ReportMap;
