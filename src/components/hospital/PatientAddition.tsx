import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Autocomplete,
} from "@mui/material";
import { Account, Patient, SnackBarColor } from "../../services/typeProps";
import { daysOfWeek } from "../../data/appData";
import { LocalizationProvider, MobileTimePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useNavigate } from "react-router-dom";
import ProgressingButton from "../ProgressingButton";
import filterAPI from "../../apis/filterAPI";
import patientAPI from "../../apis/patientAPI";
import userAPI from "../../apis/userAPI";
import NotiAlert from "../NotiAlert";

const PatientAddition: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [filterIDlist, setFilterIDlist] = useState([]);
  const [patientData, setPatientData] = useState<Patient>({
    _id: "",
    id: "",
    __v: 0,
    name: "",
    age: 0,
    phone: "",
    schedule: [],
    filterInfo: {
      id: "",
      used: 0,
      description: "",
      isFinished: false,
      forPatient: [],
      _id: "",
      __v: 0,
    },
  });
  const [snackBarTitle, setSnackBarTitle] = useState<string>("");
  const [snackBarColor, setSnackBarColor] = useState<SnackBarColor>("success");
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    filterAPI
      .getFilters()
      .then((res) => {
        const unfinishedFilters = res.data.data.filter(
          (f: { isFinished: boolean }) => !f.isFinished
        );
        setFilterIDlist(unfinishedFilters.map((f: { id: string }) => f.id));
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPatientData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleScheduleChange = (day: string, time: Dayjs | null) => {
    setPatientData((prev) => {
      const dayOfWeek = day.toLowerCase();
      const newSchedule = prev.schedule.map((s) =>
        s.dayOfWeek === dayOfWeek
          ? { ...s, time: time ? time.format("HH:mm") : "" }
          : s
      );

      // If the dayOfWeek does not exist in the schedule, add a new entry
      if (
        !newSchedule.some((s) => s.dayOfWeek === dayOfWeek) &&
        time &&
        time.format("HH:mm") !== ""
      ) {
        newSchedule.push({
          time: time.format("HH:mm"),
          dayOfWeek: dayOfWeek,
          _id: "",
        });
      }

      return {
        ...prev,
        schedule: newSchedule,
      };
    });
  };
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Patient Data:", patientData);
  };

  const isFormValid = () => {
    const { name, phone, age, filterInfo, schedule } = patientData;
    return (
      name.trim() !== "" &&
      phone.trim() !== "" &&
      age > 0 &&
      Number(filterInfo.id) > 0 &&
      schedule.length > 0
    );
  };

  const handleLinkAccount = (patientID: string) => {
    userAPI
      .getUsers()
      .then((res) => {
        const getUser: Account[] = res.data.data;
        const userRolePatient = getUser.filter(
          (user) => user.role === "patient"
        );
        const getLastUserRolePatient =
          userRolePatient[userRolePatient.length - 1];
        if (getLastUserRolePatient) {
          const linkAccountBody = {
            patientID: patientID,
            accountID: getLastUserRolePatient.accountID,
          };
          userAPI
            .linkAccount(linkAccountBody)
            .then((res) => {
              console.log("Link account successfully");
            })
            .catch((err) => {
              console.log("Link account failed");
            });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleAddPatient = () => {
    if (!isFormValid()) return;
    setLoading(true);
    // Add patient logic here
    const addPatient = {
      name: patientData.name,
      age: patientData.age,
      phone: patientData.phone,
      schedule: patientData.schedule.map(({ dayOfWeek, time }) => ({
        dayOfWeek,
        time,
      })),
      filterID: patientData.filterInfo.id,
    };
    patientAPI
      .createPatient(addPatient)
      .then((res) => {
        handleLinkAccount(res.data.data.id);
        setSnackBarTitle("Create successfully");
        setSnackBarColor("success");
        setLoading(false);
        setSnackbarOpen(true);
        navigate("/management");
      })
      .catch((err) => {
        console.error(err);
        setSnackBarTitle("Create failed");
        setSnackBarColor("error");
        setLoading(false);
        setSnackbarOpen(true);
      });
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f0f0f0",
      }}
    >
      <NotiAlert
        open={snackbarOpen}
        handleClose={handleCloseSnackbar}
        color={snackBarColor}
        title={snackBarTitle}
      />
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "60%",
          mt: 2,
          mb: 2,
          gap: 2,
          p: 4,
          boxShadow: 3,
          backgroundColor: "white",
          borderRadius: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            gap: 2,
          }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate(-1)}
          >
            Back
          </Button>
          <Typography variant="h4" component="h1" gutterBottom>
            Add New Patient
          </Typography>
        </Box>
        <TextField
          label="Name"
          name="name"
          value={patientData.name}
          onChange={handleInputChange}
          fullWidth
        />
        <TextField
          label="Age"
          name="age"
          type="number"
          value={patientData.age}
          onChange={handleInputChange}
          inputProps={{ min: 0 }}
          fullWidth
        />
        <TextField
          label="Phone"
          name="phone"
          value={patientData.phone}
          onChange={handleInputChange}
          fullWidth
        />
        <Typography variant="h6" component="h2" gutterBottom>
          Filter Info
        </Typography>
        {/* <TextField
          label="Filter ID"
          name="id"
          value={patientData.filterInfo.id}
          onChange={handleFilterInfoChange}
          fullWidth
        /> */}
        <Autocomplete
          disablePortal
          options={filterIDlist}
          fullWidth
          value={patientData.filterInfo.id}
          onChange={(e, value) => {
            setPatientData((prev) => ({
              ...prev,
              filterInfo: {
                ...prev.filterInfo,
                id: value ?? "",
              },
            }));
          }}
          renderInput={(params) => <TextField {...params} label="Filter ID" />}
        />
        <Typography variant="h6" component="h2" gutterBottom>
          Schedule
        </Typography>
        {daysOfWeek.map((day) => (
          <Box key={day} sx={{ display: "flex", gap: 2, alignItems: "center" }}>
            <Typography variant="body1" sx={{ width: "100px" }}>
              {day}
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["MobileTimePicker"]}>
                <MobileTimePicker
                  label={`Time for ${day}`}
                  value={
                    patientData.schedule.find((s) => s.dayOfWeek === day)?.time
                      ? dayjs(
                          patientData.schedule.find((s) => s.dayOfWeek === day)
                            ?.time
                        )
                      : null
                  }
                  onChange={(time) => handleScheduleChange(day, time)}
                />
              </DemoContainer>
            </LocalizationProvider>
          </Box>
        ))}
        <ProgressingButton
          onClick={() => handleAddPatient()}
          variant="contained"
          loading={loading}
        >
          Add Patient
        </ProgressingButton>
      </Box>
    </Box>
  );
};

export default PatientAddition;
