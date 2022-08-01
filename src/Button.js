import { isDOMComponent } from "react-dom/test-utils";
import "./button.css";
import { Link, useNavigate } from "react-router-dom";

export default function Button({ name, action }) {
  // 등록버튼
  const navigate = useNavigate();

  function close() {
    document.getElementById("pininfo").className = "info hide";
    document.getElementById("addpin").className = "add hide";
  }

  function home() {
    navigate("/main");
  }

  function req() {
    console.log("Link did my job");
  }
  function submit() {
    // 수정등록
    alert("요청되었습니다.");
    navigate("/main");
  }

  function select() {
    switch (action) {
      case "req":
        return req();
      case "submit":
        return submit();
      case "home":
        return home();
      case "close":
        return close();
      default:
        return console.log("할일을 잃은 버튼..");
    }
  }

  return (
    <button className="button" onClick={select}>
      {name}
    </button>
  );
}
