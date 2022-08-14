import "./App.css";
import Main from "./main.js";
import { Route, Routes } from "react-router-dom";
import Report from "./reportform";
import EntryPage from "./EntryPage";
import Myinfo from "./Myinfo";
import Help from "./help";
import Modify from "./modify";
import About from "./About";

function App() {
  return (
    <Routes>
      <Route path="/" element={<EntryPage />} />
      <Route path="/main" element={<Main />} />
      <Route path="/report" element={<Report />} />
      <Route path="/myinfo" element={<Myinfo />} />
      <Route path="/help" element={<Help/>} />
      <Route path="/modify" element={<Modify/>} />
      <Route path="/about" element={<About />} />
    </Routes>
  );
}

export default App;
