import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Login() {
  const [inputId, setInputId] = useState('')
  const [inputPw, setInputPw] = useState('')

  const loginId = {
    userid: "",
    userpw: ""
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
    
    alert("로그인 되었습니다");
    document.getElementById("logining").className = "dam login";
  }

    //렌더링 후 첫 호출되는 함수
  useEffect(() => {
    axios.get('/use_inform/login')
    .then(res => console.log(res))
    .catch()
  },[])

  return(
    <div id='logining' className='dam login'>
      <h2>Login</h2>
      <form>
        <label htmlFor='input_id'>ID : </label>
        <input type='text' name='input_id' value={inputId} onChange={handleInputId} />
      
        <label htmlFor='input_pw'>PW : </label>
        <input type='password' name='input_pw' value={inputPw} onChange={handleInputPw} />
  
        <button type='submit' onClick={onClickLogin}>Login</button>
        </form>
    </div>
  )
}

export default Login;