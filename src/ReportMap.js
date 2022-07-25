import React, {useState} from "react";
import "./newmap.css";
const { kakao } = window;

const ReportMap = () => {

    const [clklat, setLat] = useState(33.450701);
    const [clklon, setLon] = useState(126.570667);

    var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
     mapOption = { 
        center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
        level: 3 // 지도의 확대 레벨
    };

    var map = new kakao.maps.Map(mapContainer, mapOption); 


    // 지도에 클릭 이벤트를 등록합니다
    // 지도를 클릭하면 마지막 파라미터로 넘어온 함수를 호출합니다
    kakao.maps.event.addListener(map, 'click', function(mouseEvent) {        
        
    var latlng = mouseEvent.latLng;
    setLat(latlng.getLat());
    setLon(latlng.getLng()); 
     
    });
    

    return (
    
    <div className="outdiv">
    <div id="map" className="mapdiv">Hello</div>
    <p>경도:{clklat}<br></br> 위도:{clklon}</p>
    </div>
    
    );
}

export default ReportMap;