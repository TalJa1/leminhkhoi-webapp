import { Box } from "@mui/material";
import React from "react";
import MainLayout from "../components/MainLayout";
import { Account } from "../services/typeProps";
import DoctorHomeComponent from "../components/hospital/DoctorHomeComponent";
import PatientHomeComponent from "../components/patient/PatientHomeComponent";

const Home = () => {
  const user: Account = JSON.parse(sessionStorage.getItem("userData") ?? "");

  return (
    <Box>
      <MainLayout
        pageTitle={
          user.role === "patient" ? "Patient Home" : "Patient List for Today"
        }
        pageName="Home"
        user={user}
        mainData={
          user.role === "patient" ? <MainDataPatient /> : <MainDataDoctor />
        }
      />
    </Box>
  );
};

const MainDataDoctor: React.FC = () => {
  return (
    <Box>
      <DoctorHomeComponent />
    </Box>
  );
};

const MainDataPatient: React.FC = () => {
  return (
    <Box>
      <PatientHomeComponent />
    </Box>
  );
};

export default Home;
