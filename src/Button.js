import { isDOMComponent } from 'react-dom/test-utils';
import './button.css';

export default function Button({ name, action }) {
  // 등록버튼


  function close() {
    document.getElementById("pininfo").className = "info hide";
    document.getElementById("addpin").className = "add hide";
    document.getElementById("report").className = "reoport hide";
  }

  function req() {
    //console.log("수정요청");
    document.getElementById("report").className = "report";
  }

  function select() {
    switch (action) {
      case "req":
        return req();
      default:
        return close();
    }
  }

  return <button className="button" onClick={select}>{name}</button>;
}
