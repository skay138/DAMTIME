import React from "react";
import "./App.css";

function Pininfo() {

    var addressInfo = "why..."


    function close () {
        document.getElementById("pininfo").className = "pininfo hide";
        console.log("상세보기 닫음");

    }
        

    return (
        <div>
            <h3>
                { addressInfo }
            </h3>
            <button onClick={ close }>닫기</button>
        </div>
    );
}
export default Pininfo;