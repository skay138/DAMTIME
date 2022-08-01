import { useEffect, useState } from "react";
import "./logi.css";

function EntryPage() {
  const [state, setState] = useState({ currentView: "logIn" });

  const changeView = (view) => {
    setState({
      currentView: view,
    });
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
            <button type="button" onClick={() => changeView("logIn")}>
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
                    required
                  />
                </li>
                <li>
                  <label htmlFor="password">Password:</label>
                  <input type="password" id="password" required />
                </li>
                <li>
                  <i />
                  <a onClick={() => changeView("PWReset")} href="#">
                    Forgot Password?
                  </a>
                </li>
              </ul>
            </fieldset>
            <button>Login</button>
            <button type="button" onClick={() => changeView("signUp")}>
              Create an Account
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
