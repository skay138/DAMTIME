import "./App.css";
import Main from "./main.js";
import { Route, Routes } from "react-router-dom";
import Report from "./reportform";
import EntryPage from "./EntryPage";
import Myinfo from "./Myinfo";

function App() {
  return (
    <Routes>
      <Route path="/" element={<EntryPage />} />
      <Route path="/main" element={<Main />} />
      <Route path="/report" element={<Report />} />
      <Route path="/myinfo" element={<Myinfo />} />
    </Routes>
  );
}

export default App;
