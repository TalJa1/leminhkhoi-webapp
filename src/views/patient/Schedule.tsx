import { Box } from "@mui/material";
import React from "react";
import MainLayout from "../../components/MainLayout";
import { Account } from "../../services/typeProps";
import { useSelector } from "react-redux";

const Schedule = () => {
  const user: Account = useSelector((state: any) => state.account.accounts);

  return (
    <Box>
      <MainLayout
        pageTitle="Schedule"
        pageName="Schedule"
        mainData={<MainData />}
        user={user}
      />
    </Box>
  );
};

const MainData: React.FC = () => {
  return <Box>Patient 1</Box>;
};

export default Schedule;
