import { Box } from "@mui/material";
import React from "react";
import MainLayout from "../../components/MainLayout";
import { Account } from "../../services/typeProps";
import { useSelector } from "react-redux";

const Management = () => {
  const user: Account = useSelector((state: any) => state.account.accounts);

  console.log("user", user);
  return (
    <Box>
      <MainLayout pageName="Management" mainData={<MainData />} user={user} />
    </Box>
  );
};

const MainData: React.FC = () => {
  return <Box>Hello 123</Box>;
};

export default Management;
