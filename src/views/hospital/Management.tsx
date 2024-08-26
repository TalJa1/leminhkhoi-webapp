import { Box } from "@mui/material";
import React from "react";
import MainLayout from "../../components/MainLayout";
import { Account } from "../../services/typeProps";
import { useSelector } from "react-redux";
import DoctorManagementComponent from "../../components/hospital/DoctorManagementComponent";

const Management = () => {
  const user: Account = useSelector((state: any) => state.account.accounts);

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
