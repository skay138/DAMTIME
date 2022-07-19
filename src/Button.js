export default function Button({ name, action }) {
  // 등록버튼

  function submit () {
    var pinName = document.getElementById("pinName").value;
    console.log(pinName);
    // var newmarker = {
    //   num: markerList.length + 1,
    //   lat: pinla,
    //   lon: pinma,
    //   name: pinName,
    //   imgsrc: "",
    // };

    // markerList.push(newmarker);

    // var last = markerList[markerList.length - 1];
    // console.log(last.num, last.name, last.lat, last.lon);

    // // 마커 업데이트
    // var lastloc = new kakao.maps.LatLng(last.lat, last.lon);
    // var lastmarker = new kakao.maps.Marker({
    //   map: map,
    //   position: lastloc,
    // });
    // lastmarker.setMap(map);
    // newmarker = {};
    alert("흡연구역으로 등록되었습니다.");
    close();
  };

  function close() {
    document.getElementById("pininfo").className = "info hide";
    document.getElementById("addpin").className = "info hide"
    console.log("상세보기 닫음");
  }

  return <button onClick={action === "close" ? close : submit}>{name}</button>;
}
