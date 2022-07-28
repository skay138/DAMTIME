import "./App.css";
import Main from "./main.js";
import { Route, Routes } from 'react-router-dom';
import Report from "./reportform";
import { useState } from "react";
import Login from "./login";

function App() {
  
  return (
    <Routes>  
    <Route path="/" element={<Main />} />
    <Route path="/report/" element={<Report />} /> 
    <Route path="/login/" element={<Login />} />
    </Routes>
    );
}

export default App;