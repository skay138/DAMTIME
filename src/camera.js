import React from "react";
import "./App.css";


function Camera() {
	
    // var camera = document.getElementById("camera");
    // var pic = document.getElementById("pic");

    var camera = document.createElement("input");
    camera.type = "file";
    camera.id = "camera";
    camera.accept = "image/*";
    camera.capture = "camera";
	var pic = document.createElement("img");
    pic.id = "pic";
    pic.alt = "흡연구역을 촬영해주세요.";


	camera.addEventListener('change', function(e){
		var file = e.target.files[0];
		pic.src = URL.createObjectURL(file);
	});
    

    return (
        <div id="cameradiv">
            <img id="pic" alt="흡연구역을 촬영해주세요."></img><br></br>
            <input type="file" accept="image/*" capture="camera" id="camera" alt="흡연구역을 촬영해주세요"></input>
        </div>
    );
}

export default Camera;