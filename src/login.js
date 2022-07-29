import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Button from "./Button";

function Login() {
  const [inputId, setInputId] = useState("");
  const [inputPw, setInputPw] = useState("");

  const loginId = {
    userid: inputId,
    userpw: inputPw,
  };

  //input data의 변화가 있을때마다 value값 useState화
  const handleInputId = (e) => {
    setInputId(e.target.value);
  };

  const handleInputPw = (e) => {
    setInputPw(e.target.value);
  };

  //Login 버튼 클릭 이벤트
  const onClickLogin = () => {
    axios.post("/damlogin", loginId).then(function (res) {
      if (res.data == true) {
        console.log(res.data)
      } else console.log("로그인실패");
    });
  };

  return (
    <div id="logining" className="damlogin">
      <h1>DAMTIME</h1>
      <div className="damback">
        <h2>Login</h2>
        <form>
          <label htmlFor="input_id">User : </label>
          <input
            type="email"
            name="input_id"
            value={inputId}
            onChange={handleInputId}
            placeholder="Type your e-mail"
          />
          <br />
          <label htmlFor="input_pw">Pass : </label>
          <input
            type="password"
            name="input_pw"
            value={inputPw}
            onChange={handleInputPw}
            placeholder="Type your password"
          />
        </form>
        <br />
        <br />
        <button className="butto" onClick={onClickLogin} value="LOGIN">
          login
        </button>
        <Link to="/register/">
          <Button className="text" name="Sign Up"></Button>
        </Link>
        {/* 구 회원가입 버튼
        <input 
        className="button" 
        type="submit"
        onClick={onClickRegister}
        value="회원가입"
        ></input> */}
      </div>
    </div>
  );
}

export default Login;
