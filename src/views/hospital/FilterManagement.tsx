import React from "react";
import MainLayout from "../../components/MainLayout";
import { Account } from "../../services/typeProps";
import DoctorFilterManagement from "../../components/hospital/DoctorFilterManagement";

const FilterManagement = () => {
  const user: Account = JSON.parse(sessionStorage.getItem("userData") ?? "");
  return (
    <MainLayout
      pageTitle="Filter management"
      pageName="Filter Management"
      mainData={<DoctorFilterManagement />}
      user={user}
    />
  );
};

export default FilterManagement;
