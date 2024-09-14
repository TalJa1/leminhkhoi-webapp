import { TransitionProps } from "@mui/material/transitions";
import React from "react";

export interface Account {
  _id: string;
  accountID: string;
  email: string;
  password: string;
  role: string;
  __v: number;
}

export interface MainLayoutProps {
  pageName: string;
  pageTitle: string;
  user: Account;
  mainData: React.ReactNode;
}

export interface Schedule {
  time: string;
  dayOfWeek: string;
  _id: string;
}

export interface FilterInfo {
  _id: string;
  id: string;
  used: number;
  description: string;
  isFinished: boolean;
  forPatient: Patient[];
  __v: number;
}

export interface Patient {
  _id: string;
  id: string;
  name: string;
  age: number;
  phone: string;
  schedule: Schedule[];
  __v: number;
  filterInfo: FilterInfo;
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

export interface ForPatient {
  id: number;
  name: string;
  age: number;
  phone: string;
}

export interface ProgressingButtonProps {
  loading: boolean;
  onClick: () => void;
  children: React.ReactNode;
  [x: string]: any; // To accept any other props for the Button component
  variant?: "text" | "outlined" | "contained";
}

export type DayOfWeek =
  | "sunday"
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday";

export interface PatientRow {
  name: string;
  phone: string;
  id: number;
  age: number;
  time: string;
  date: string;
}
