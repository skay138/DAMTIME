import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./EntryPage.css";

function EntryPage() {
  const [state, setState] = useState({ currentView: "logIn" });

  const changeView = (view) => {
    setState({
      currentView: view,
    });
  };
  const emailRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  //아이디
  const [inputId, setInputId] = useState("");
  const [inputPw, setInputPw] = useState("");
  const loginId = {
    userid: inputId,
    userpw: inputPw,
  };

  const [checkpw, setChckpw] = useState("");

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
  const onClickLogin = (e) => {
    e.preventDefault();
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

  //회원가입 버튼
  const onClickRegister = (e) => {
    e.preventDefault();
    if (inputId === "") {
      alert("이메일을 입력하세요.");
    } else if (!emailRegex.test(inputId)) {
      alert("이메일 형식이 아닙니다.");
    } else {
      if (checkpw === inputPw) {
        // 비밀번호 확인
        if (inputPw.length < 8) {
          alert("비밀번호를 8자리 이상 입력해주세요.");
        } else {
          axios.post("/damregister", loginId).then(function (res) {
            console.log(res.data);

            if (res.data === "아이디중복") {
              alert("중복된 아이디입니다."); //아이디가 없으면
            } else if (res.data === "success") {
              alert("회원가입 되었습니다.");
              changeView("logIn");
            }
          });
        }
      } else alert("비밀번호가 일치하지 않습니다.");
    }
  };

  const handleCHKPW = (e) => {
    setChckpw(e.target.value);
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
                  <label htmlFor="email">이메일:</label>
                  <input
                    type="email"
                    id="userid"
                    value={inputId}
                    onChange={handleInputId}
                    placeholder="email"
                    autoComplete="off"
                    required
                  />
                  <p>
                    {emailRegex.test(inputId)
                      ? "이메일 형식입니다."
                      : "이메일 형식이 아닙니다."}
                  </p>
                </li>
                <li>
                  <label htmlFor="password">비밀번호:</label>
                  <input
                    type="password"
                    id="password"
                    value={inputPw}
                    onChange={handleInputPw}
                    placeholder="password"
                    required
                  />
                  <p>
                    {inputPw.length < 8
                      ? "비밀번호는 8자 이상을 요구합니다"
                      : "8자 이상입니다."}
                  </p>
                </li>
                <li>
                  <label htmlFor="password">비밀번호 확인:</label>
                  <input
                    type="password"
                    id="passwordchk"
                    onChange={handleCHKPW}
                    placeholder="password"
                    required
                  />
                  <p>
                    {checkpw === ""
                      ? null
                      : checkpw === inputPw
                      ? "비밀번호가 일치합니다"
                      : "비밀번호가 일치하지 않습니다"}
                  </p>
                </li>
              </ul>
            </fieldset>
            <button type="button" onClick={onClickRegister} value="submit">
              회원가입
            </button>
            <button onClick={() => changeView("logIn")}>로그인 페이지로</button>
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
                    placeholder="password"
                  />
                </li>
                <li>
                  <i />
                  <a onClick={() => changeView("PWReset")} href="#">
                    Forgot Password?
                  </a>
                </li>
              </ul>
              <br />
              <button
                className="loginbtn"
                type="submit"
                onClick={onClickLogin}
                value="LOGIN"
              >
                로그인
              </button>
            </fieldset>
            <button
              onClick={nonmember}
              type="button"
              value="Enter by Non-member"
            >
              비로그인으로 이용
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
                  <input type="email" id="userid" value={inputId} required />
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
