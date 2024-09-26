import React from "react";
import { Account } from "../../services/typeProps";
import MainLayout from "../../components/MainLayout";
import UserManagementComponent from "../../components/hospital/UserManagementComponent";

function UserManagement() {
  const user: Account = JSON.parse(sessionStorage.getItem("userData") ?? "");

  return (
    <MainLayout
      pageTitle="User management"
      pageName="User Management"
      mainData={<UserManagementComponent />}
      user={user}
    />
  );
}

export default UserManagement;
