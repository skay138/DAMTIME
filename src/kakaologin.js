import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
var qs = require("qs");

export default function Kakaologin() {
  const REST_API_KEY = "022088995de86a28ae8d9b33823e57f3";
  const REDIRECT_URI = "http://localhost:3000/";
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  const PARAMS = new URL(document.location).searchParams;
  const KAKAO_CODE = PARAMS.get("code");


  let sessionStorage = window.sessionStorage;
  const navigate = useNavigate();

  useEffect(() => {
    if (KAKAO_CODE) {
      getKakaoTokenHandler(KAKAO_CODE.toString());
    }
  }, []);

  function getKakaoTokenHandler(kakao_code) {
    var data = qs.stringify({
      grant_type: "authorization_code",
      client_id: REST_API_KEY,
      code: kakao_code,
      redirect_uri: REDIRECT_URI,
    });
    var config = {
      method: "post",
      url: "https://kauth.kakao.com/oauth/token",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        getuser(response.data.access_token);
        console.log("TOKEN" + response.data.access_token);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function getuser(token) {
    var getuser = {
      method: "get",
      url: "https://kapi.kakao.com/v2/user/me",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios(getuser)
      .then(function (response) {
        sessionStorage.setItem("loginId", response.data.id);
        axios
          .post(
            "https://damtime.kro.kr:4000/kakaologin",
            ({
              id: response.data.id,
              email: response.data.kakao_account.email,
            })
          )
          .then(function (res) {
            if (res.data === true) {
              navigate("/main");
            } else if (res.data === "newuser") {
              alert("회원가입되었습니다.");
              navigate("/main");
            } else {
              console.log(res);
              alert(res.data);
            }
          });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <div>
      <button className="loginbtn"
        onClick={() => {
          window.location.href = KAKAO_AUTH_URL;
        }}
      >
        카카오로그인
      </button>
    </div>
  );
}
