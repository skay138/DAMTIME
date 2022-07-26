import "./App.css";
import Main from "./main.js";
import {Route, Routes, useLocation} from 'react-router-dom';
import Report from "./reportform";
import { useState } from "react";

function App() {

  return (
  <Routes>  
  <Route path="/" element={<Main />} />
  <Route path="/report/" element={<Report />} /> 
  </Routes>
  );
}

export default App;