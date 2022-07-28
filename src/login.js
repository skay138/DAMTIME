import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Button from './Button';

function Login() {
  const [inputId, setInputId] = useState('')
  const [inputPw, setInputPw] = useState('')

  const loginId = {
    userid: inputId,
    userpw: inputPw,
  }
  
    //input data의 변화가 있을때마다 value값 useState화
  const handleInputId = (e) => {
    setInputId(e.target.value);
  }

  const handleInputPw = (e) => {
    setInputPw(e.target.value);
  }

    //Login 버튼 클릭 이벤트
  const onClickLogin = () => {
    console.log('click login');
    axios.post("/damlogin", loginId).then(function (res) {
      console.log(res);
    });
  }


  return(
    <div id="logining" className="damlogin">
      <h2>Login</h2>
      <form>
        <label htmlFor='input_id'>ID : </label>
        <input 
        type='email' 
        name='input_id' 
        value={inputId} 
        onChange={handleInputId}
        placeholder="email" />
        <br />
        <label htmlFor='input_pw'>PW : </label>
        <input 
        type='password' 
        name='input_pw' 
        value={inputPw} 
        onChange={handleInputPw}
        placeholder="password" />
        <br />
        <input 
        className="button" 
        type="submit"
        onClick={onClickLogin}
        value="로그인"
        ></input>
        <Link to="/register/">
        <Button name="회원가입"></Button>
        </Link>
        {/* 구 회원가입 버튼
        <input 
        className="button" 
        type="submit"
        onClick={onClickRegister}
        value="회원가입"
        ></input> */}

        </form>
    </div>
  );

}

export default Login;