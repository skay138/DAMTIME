import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./login.css";
import Button from "./Button";

function Register() {
  const [account, setAccount] = useState({
    No: "",
    userid: "",
    userpw: "",
    username: "",
  });
  const [checkpw, setChckpw] = useState("");
  const navigate = useNavigate();

  //회원가입 버튼
  const onClickRegister = (e) => {
    e.preventDefault();
    setAccount({ No: "", userid: "", userpw: "", username: "" });
    if (checkpw === account.userpw) {
      // 비밀번호 확인
      axios.post("/damregister", account).then(function (res) {
        console.log(res);
        res.data === "중복된 아이디입니다" // 중복된 아이디면
          ? alert("중복된 아이디입니다.") // 알림만 뜨고 화면은 안넘어감
          : navigate("/"); // 중복되지 않았으면 메인페이지로 넘어감
      });
    } else alert("비밀번호를 확인해주세요");
  };

  const handleChange = (e) => {
    const renewAccount = {
      ...account,
      [e.target.name]: e.target.value,
    };
    console.log(renewAccount);
    setAccount(renewAccount);
  };

  const handleCHKPW = (e) => {
    setChckpw(e.target.value);
  };

  return (
    <div id="register" className="damlogin">
      <h2>회원가입</h2>
      <form>
        <label>
          이름 :
          <input
            type="text"
            name="username"
            defaultValue={account.username}
            onChange={handleChange}
            placeholder="닉네임"
          />
        </label>
        <br />
        <label>
          이메일 :
          <input
            type="email"
            name="userid"
            defaultValue={account.userid}
            onChange={handleChange}
            placeholder="email"
            required
          />
        </label>
        <br />

        <label>
          비밀번호 :
          <input
            type="password"
            name="userpw"
            defaultValue={account.userpw}
            onChange={handleChange}
            placeholder="password"
          />
        </label>
        <br />

        <label>비밀번호 확인 : </label>
        <input
          type="password"
          name="checkpw"
          defaultValue={checkpw}
          onChange={handleCHKPW}
          placeholder="password"
        />
        <br />

        <input
          className="button"
          type="Submit"
          onClick={onClickRegister}
          defaultValue="회원가입"
        />
        <Link to="/login">
          <Button name="돌아가기"></Button>
        </Link>
      </form>
    </div>
  );
}

export default Register;
