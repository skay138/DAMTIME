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
  };

  const navigate = useNavigate();

  let sessionStorage = window.sessionStorage;


  //input data의 변화가 있을때마다 value값 useState화
  const handleInputId = (e) => {
    setInputId(e.target.value);
  }

  const handleInputPw = (e) => {
    setInputPw(e.target.value);
  }

    //Login 버튼 클릭 이벤트
  const onClickLogin = () => {

    if (loginId.userid === "" || loginId.userpw === "") {
      alert("아이디 혹은 비밀번호를 기입하지 않으셨습니다.");
    } else {
      axios.post("/damlogin", loginId).then(function (res) {
        if (res.data === true) {
          navigate("/main");
          sessionStorage.setItem("loginId",loginId.userid);
        } else {
          alert(res.data);
        }
      });
    }
  };

  const nonmember = () =>{
    sessionStorage.setItem("loginId", "non");
    navigate('/main');
  }

return(
    <div id="logining" className="damlogin">
      <br/><h1>DAMTIME</h1>
      <div className='damback2'>
      <h2>Welcome Back!</h2>
      <fieldset className='tit'>
        
      <form>
      <legend className='tit2'>Log In</legend>
        <label htmlFor='input_id'>User : </label>
        <input 
        type='email' 
        name='input_id' 
        value={inputId} 
        onChange={handleInputId}
        placeholder="Type your e-mail" />
        <br />
        <label htmlFor='input_pw'>Pass : </label>
        <input 
        type='password' 
        name='input_pw' 
        value={inputPw} 
        onChange={handleInputPw}
        placeholder="Type your password" />
        <br /><br/>
        <input 
        className="butto" 
        type="submit"
        onClick={onClickLogin}
        value="LOGIN"
        ></input></form></fieldset>
        <br/><br/><form>
          <Link to='/main'>
          <input type='button' className="text" value="Using for Non remember"></input>
        </Link><br/>
        <Link to="/register/">
        <input type='button' className="text" value="Or Sign Up Using"></input>
        </Link>
        </form>
      </div>
    </div>
  );

}

export default Login;