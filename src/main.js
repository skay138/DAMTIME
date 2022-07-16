import "./App.css";
import { useEffect, useState } from "react";
import { markerList } from "./markerList";

const { kakao } = window;

function Main() {
  const [refresh, setRefresh] = useState(false); //refresh
  const [pinla, setPinla] = useState(); //위도
  const [pinma, setPinma] = useState(); //경도

  //map 구현
  var map; // 외부접근 위해 전역변수로 설정

  useEffect(() => {
    var mapContainer = document.getElementById("myMap"), // 지도를 표시할 div
      mapOption = {
        center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
        level: 4, // 지도의 확대 레벨
      };

    map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다
  
    // 흡연구역 표시
    markerList.forEach((el) => {
      new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(el.lat, el.lon),
        title: el.name,
      });
    });
    

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

    var marker = new kakao.maps.Marker({
      // 지도 중심좌표에 마커를 생성합니다
      position: map.getCenter(),
      clickable: true, // 마커를 클릭했을 때 지도의 클릭 이벤트가 발생하지 않도록 설정합니다
    });
    // 지도에 마커를 표시합니다
    marker.setMap(map);
    marker.setVisible(false);
    console.log(marker.getVisible());

    //흡연구역등록
    let btn = document.createElement("div");
    btn.textContent = "흡연구역 등록";
    btn.onclick = addpin;

    function addpin() {
      console.log("i HAVE TO CODE");
      document.getElementById("addpin").className = "addpin";
      Addplace(marker.getPosition());
    }

    var iwContent = btn, // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
      iwRemoveable = true; // removeable 속성을 ture 로 설정하면 인포윈도우를 닫을 수 있는 x버튼이 표시됩니다

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
        infowindow.close(); //마커가 보이는데 맵을 클릭하면 마커&인포윈도우 안보이게
        document.getElementById("addpin").className = "addpin hide";
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

  // 등록 창 닫기
  const cancel = () => {
    document.getElementById("addpin").className="addpin hide";
    console.log("핀 등록 닫음");
  }

  // 마커등록
  const submit = () => {
    var pinName = document.getElementById("pinName").value;
    var newmarker = {
      num: markerList.length + 1,
      lat: pinla,
      lon: pinma,
      name: pinName,
      imgsrc: ""
    };
    
    markerList.push(newmarker);
    var last = markerList[markerList.length-1];
    console.log(last.num, last.name);

    // 마커 업데이트
    var lastloc = new kakao.maps.LatLng(last.lat, last.lon);
    var lastmarker = new kakao.maps.Marker({
      map: map,
      position: lastloc,
    });
    lastmarker.setMap(map);
    newmarker = {};
    alert("흡연구역으로 등록되었습니다.");
    cancel();
  }

  //refresh
  const refreshfn = () => setRefresh((current) => !current);

  return (
    <div>
      <div className="Mapcontent">
        <div className="title" onClick={refreshfn}>
          DAMTIME
        </div>
        <div id="myMap" className="Mapstyle"></div>
        <button className="currentlocation" id="currentlo">
          <span className="material-symbols-outlined">share_location</span>
        </button>
      </div>

      {/* 여기부터는 addpin입니다 */}
      <div id="addpin" className="addpin hide">
        {/* <h3>{pinla}, {pinma}</h3> */}
        <h3>흡연구역을 등록해주세요</h3>
        <input type="text" id="pinName" placeholder="장소명 입력"></input>
        <button onClick={submit}>등록</button>
        <button onClick={cancel}>취소</button>
      </div>
    </div>
  );
}

export default Main;
