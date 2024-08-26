import { Box } from "@mui/material";
import React from "react";
import MainLayout from "../components/MainLayout";
import { Account } from "../services/typeProps";
import { useSelector } from "react-redux";

const Home = () => {
  const user: Account = useSelector((state: any) => state.account.accounts);
  console.log("user", user);

  return (
    <Box>
      <MainLayout pageName="Home" user={user} mainData={<MainData />} />
    </Box>
  );
};

const MainData: React.FC = () => {
  return <Box>Hello</Box>;
};

export default Home;
