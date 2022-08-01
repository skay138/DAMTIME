import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./logi.css";

function EntryPage() {
  const [state, setState] = useState({ currentView: "logIn" });

  const changeView = (view) => {
    setState({
      currentView: view,
    });
  };

  //로그인
  const [inputId, setInputId] = useState("");
  const [inputPw, setInputPw] = useState("");

  const loginId = {
    userid: inputId,
    userpw: inputPw,
  };

  const navigate = useNavigate();

  let sessionStorage = window.sessionStorage;

  //input data의 변화가 있을때마다 value값 useState화
  const handleInputId = (e) => {
    setInputId(e.target.value);
  };

  const handleInputPw = (e) => {
    setInputPw(e.target.value);
  };

  //Login 버튼 클릭 이벤트
  const onClickLogin = () => {
    if (loginId.userid === "" || loginId.userpw === "") {
      alert("아이디 혹은 비밀번호를 기입하지 않으셨습니다.");
    } else {
      axios.post("/damlogin", loginId).then(function (res) {
        if (res.data === true) {
          navigate("/main");
          sessionStorage.setItem("loginId", loginId.userid);
        } else if (res.data === false) {
          alert("비밀번호가 일치하지 않습니다.");
        } else {
          console.log(res);
          alert(res.data);
        }
      });
    }
  };

  const nonmember = () => {
    sessionStorage.setItem("loginId", "non");
    navigate("/main");
  };

  const currentView = () => {
    switch (state.currentView) {
      case "signUp":
        return (
          <form>
            <h2>회원가입</h2>
            <fieldset>
              <legend>Create Account</legend>
              <ul>
                <li>
                  <label htmlFor="email">Email:</label>
                  <input type="email" id="userid" required />
                </li>
                <li>
                  <label htmlFor="password">비밀번호:</label>
                  <input type="password" id="password" required />
                </li>
                <li>
                  <label htmlFor="password">비밀번호 확인:</label>
                  <input type="password" id="passwordchk" required />
                </li>
              </ul>
            </fieldset>
            <button>Submit</button>
            <button
              className="loginbtn"
              type="button"
              onClick={() => changeView("logIn")}
            >
              로그인 페이지로
            </button>
          </form>
        );
      case "logIn":
        return (
          <form>
            <h2>DAMTIME</h2>
            <fieldset>
              <legend>Log In</legend>
              <ul>
                <li>
                  <label htmlFor="username">Username:</label>
                  <input
                    type="email"
                    id="userid"
                    placeholder="type your email"
                    value={inputId}
                    onChange={handleInputId}
                    required
                  />
                </li>
                <li>
                  <label htmlFor="password">Password:</label>
                  <input
                    type="password"
                    id="password"
                    required
                    value={inputPw}
                    onChange={handleInputPw}
                  />
                </li>
                <li>
                  <i />
                  <a onClick={() => changeView("PWReset")} href="#">
                    Forgot Password?
                  </a>
                </li>
              </ul>
              <br/>
              <button
                className="loginbtn"
                type="submit"
                onClick={onClickLogin}
                value="LOGIN"
              >
                Login
              </button>
            </fieldset>
            <button
              onClick={nonmember}
              type="button"
              value="Enter by Non-member"
            >
              Enter by Non-member
            </button>
            <button type="button" onClick={() => changeView("signUp")}>
              회원가입하기
            </button>
          </form>
        );
      case "PWReset":
        return (
          <form>
            <h2>Reset Password</h2>
            <fieldset>
              <legend>Password Reset</legend>
              <ul>
                <li>
                  <em>A reset link will be sent to your inbox!</em>
                </li>
                <li>
                  <label htmlFor="email">Email:</label>
                  <input type="email" id="userid" required />
                </li>
              </ul>
            </fieldset>
            <button>Send Reset Link</button>
            <button type="button" onClick={() => changeView("logIn")}>
              Go Back
            </button>
          </form>
        );
      default:
        break;
    }
  };
  return <section id="entry-page">{currentView()}</section>;
}

export default EntryPage;
