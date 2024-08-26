import React from "react";
import { Box } from "@mui/material";
import MainLayout from "../../components/MainLayout";
import { Account } from "../../services/typeProps";
import DoctorManagementComponent from "../../components/hospital/DoctorManagementComponent";

const Management = () => {
  const user: Account = JSON.parse(sessionStorage.getItem("userData") ?? "");

  return (
    <Box>
      <MainLayout
        pageTitle="Patient management"
        pageName="Management"
        mainData={<DoctorManagementComponent />}
        user={user}
      />
    </Box>
  );
};

export default Management;
