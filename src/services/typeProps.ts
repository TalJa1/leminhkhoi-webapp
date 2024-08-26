import React from "react";

export interface Account {
  email: string;
  password: string;
  role: string;
}

export interface MainLayoutProps {
  pageName: string;
  pageTitle: string;
  user: Account;
  mainData: React.ReactNode;
}

export interface Schedule {
  time: string;
  date: string;
}

export interface FilterInfo {
  id: number;
  used: number;
  isFinished: boolean;
}

export interface Patient {
  id: number;
  name: string;
  age: number;
  phone: string;
  filterInfo: FilterInfo;
  schedule: Schedule;
}
