import "./App.css";
import Main from "./main.js";
import { Route, Routes } from "react-router-dom";
import Report from "./reportform";
import EntryPage from './EntryPage'

function App() {
  return (
    <Routes>
      <Route path="/main" element={<Main />} />
      <Route path="/report/" element={<Report />} />
      <Route path="/" element={<EntryPage />} />
    </Routes>
  );
}

export default App;
