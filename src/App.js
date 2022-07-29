import "./App.css";
import Main from "./main.js";
import { Route, Routes } from "react-router-dom";
import Report from "./reportform";
import Login from "./login";
import Register from "./register";

function App() {
  return (
    <Routes>
      <Route path="/main" element={<Main />} />
      <Route path="/report/" element={<Report />} />
      <Route path="/" element={<Login />} />
      <Route path="/register/" element={<Register />} />
    </Routes>
  );
}

export default App;
