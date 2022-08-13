import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "./img/kakao_login_medium_narrow.png";
var qs = require("qs");

export default function Kakaologin() {
  const REST_API_KEY = "022088995de86a28ae8d9b33823e57f3";
  const REDIRECT_URI = "https://damtime.netlify.app/";
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
        sessionStorage.setItem("kakaotoken", response.data.access_token);
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
          .post("https://damtime.kro.kr:4000/kakaologin", {
            id: response.data.id,
            email: response.data.kakao_account.email,
          })
          .then(function (res) {
            if (res.data === true) {
              navigate("/main");
            } else if (res.data === "newuser") {
              alert("회원가입되었습니다.");
              navigate("/main");
            } else if (res.data === "ban") {
              alert(
                `${
                  response.data.kakao_account.email
                    ? response.data.kakao_account.email
                    : response.data.id
                }님은 벤당하셨습니다. 메일로 아이디 기재 후 문의부탁드립니다.`
              );
            } else {
              alert("err");
            }
          });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <div style={{ textAlign: "center", margin: "10px" }}>
      <img
        src={logo}
        onClick={(e) => {
          e.preventDefault();
          window.location.href = KAKAO_AUTH_URL;
        }}
      ></img>
    </div>
  );
}
