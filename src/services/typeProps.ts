import { TransitionProps } from "@mui/material/transitions";
import React from "react";

export interface Account {
  accountID: number;
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
  dayofWeek: string;
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
  schedule: Schedule[];
}

export interface SnackbarProps {
  open: boolean;
  Transition: React.ComponentType<
    TransitionProps & {
      children: React.ReactElement<any, any>;
    }
  >;
}

export type SnackBarColor = "success" | "error";

export type NotiAlertType = {
  open: boolean;

  handleClose: () => void;
  title: string;
  color: SnackBarColor;
};
