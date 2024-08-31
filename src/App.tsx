import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./views/SignIn";
import Home from "./views/Home";
import Management from "./views/hospital/Management";
import FilterManagement from "./views/hospital/FilterManagement";
import PatientAddition from "./components/hospital/PatientAddition";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/home" element={<Home />} />
        <Route path="/management" element={<Management />} />
        <Route path="/filtermanagement" element={<FilterManagement />} />
        <Route path="/patientaddition" element={<PatientAddition />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
