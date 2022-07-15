import "./App.css";
import { useEffect, useState } from "react";
import Mainmap from "./main.js";
import { Addplace } from "./utility";

function App() {
  return (
    <div>
  <Mainmap />
  <Addplace/>
  </div>);
}

export default App;
