import "./App.css";
import { useEffect, useState } from "react";
import Mainmap from "./main.js";

function App() {
  const [login, setLogin] = useState(false);

  function onclick(){
    setLogin(true);
  }

  return (
  login? <Mainmap /> : <button onClick={onclick}>LOGIN</button>
  );
}

export default App;
