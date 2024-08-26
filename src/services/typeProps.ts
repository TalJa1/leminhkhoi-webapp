import React from "react";

export interface Account {
  email: string;
  password: string;
  role: string;
}

export interface MainLayoutProps {
  pageName: string;
  user: Account;
  mainData: React.ReactNode;
}
