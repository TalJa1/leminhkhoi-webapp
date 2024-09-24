import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./views/SignIn";
import Home from "./views/Home";
import Management from "./views/hospital/Management";
import FilterManagement from "./views/hospital/FilterManagement";
import PatientAddition from "./components/hospital/PatientAddition";
import FilterAddition from "./components/hospital/FilterAddition";
import UserManagement from "./views/hospital/UserManagement";

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
        <Route path="/filteraddition" element={<FilterAddition />} />
        <Route path="/usermanagement" element={<UserManagement />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
