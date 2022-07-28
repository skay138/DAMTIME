import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Register() {
  
  const [account, setAccount] = useState({No:"", userid:"", userpw:"", username:""});
  const [checkpw, setChckpw] = useState("");

//     //Login 버튼 클릭 이벤트
//   const onClickRegister = () => {
//     console.log('account');
//     if (checkpw === account.userpw){
//         axios.post("/damregister", account).then(function (res) {
//         console.log(res);
//         });
//     }
//     else
//         alert("비밀번호를 확인해주세요");
//   }
  
//   const getinput = (e) => {
//     setAccount(e.target.value);
//   }
  

  return(
    <div id="register" className="damlogin">
        최윤호 대머리
      {/* <h2>Login</h2>
      <form>
        <label htmlFor='nick'>닉네임 : </label>
        <input 
        type='text' 
        name='input_nick' 
        value={account.username}
        onChange={getinput}
        placeholder="닉네임" />
        <br />

        <label htmlFor='input_id'>ID : </label>
        <input 
        type='email' 
        name='input_id' 
        value={account.userid}
        onChange={getinput}
        placeholder="email" />
        <br />

        <label htmlFor='input_pw'>PW : </label>
        <input 
        type='password' 
        name='input_pw' 
        value={account.userpw}
        onChange={getinput}
        placeholder="password" />
        <br />

        <label htmlFor='check_pw'>PW : </label>
        <input 
        type='password' 
        name='checkpw' 
        value={setChckpw(this.target.value)}
        placeholder="password" />
        <br />


        <input 
        className="button" 
        type="submit"
        onClick={onClickRegister}
        value="회원가입"
        ></input>

        </form> */}
    </div>
  );

}

export default Register;