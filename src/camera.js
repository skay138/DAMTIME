import React, { useState } from "react";
import "./App.css";
// npm i browser-image-compression 했어요
import imageCompression from 'browser-image-compression';

function Camera( fileUrl, setFileUrl) {
    // const [fileUrl, setFileUrl] = useState("");
   
    const handleFileOnChange = async (e) => {
        var file = e.target.files[0];	// 입력받은 file객체
       
        // 이미지 resize 옵션 설정 (최대 width을 100px로 지정)
        const options = { 
            maxSizeMB: 2, 
            maxWidthOrHeight: 200
        }
        
        try {
        const compressedFile = await imageCompression(file, options);
        file = compressedFile;
        
        // resize된 이미지의 url을 받아 fileUrl에 저장
        const promise = imageCompression.getDataUrlFromFile(compressedFile);
        promise.then(result => {
            setFileUrl(result);
        })
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div id="cameradiv">
            <img id="pic" alt="" src={fileUrl} /><br/>
            <input type='file' accept='image/*' capture="camera" 
            id='camera' onChange={handleFileOnChange} 
            />
        </div>
    );
}

export default Camera;