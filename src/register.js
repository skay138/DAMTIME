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
      if (account.userpw.length < 8) {
        alert("비밀번호를 8자리 이상 입력해주세요.");
      } else {
        axios.post("/damregister", account).then(function (res) {
          console.log(res.data);

          if (res.data === "아이디중복") {
            alert("중복된 아이디입니다."); //아이디가 없으면
          } else if (res.data === "success") {
            alert("회원가입 되었습니다.");
            navigate("/");
          }
        });
      }
    } else alert("비밀번호가 일치하지 않습니다.");
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
    <div id="register" className="register">
      <div>
        <h2>회원가입(css 임시)</h2>
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
              value={account.userid}
              onChange={handleChange}
              placeholder="email"
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

          <input type='button' onClick={onClickRegister} className="text" value="submit"></input>
          <Link to="/">
            <input type='button' className="text" value="back"></input>
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Register;
