import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./views/SignIn";
import Home from "./views/Home";
import Management from "./views/hospital/Management";
import Schedule from "./views/patient/Schedule";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/home" element={<Home />} />
        <Route path="/management" element={<Management />} />
        <Route path="/schedule" element={<Schedule />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
