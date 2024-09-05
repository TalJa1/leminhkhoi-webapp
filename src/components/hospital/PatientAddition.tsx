import React, { useState, ChangeEvent, FormEvent } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import { Patient } from "../../services/typeProps";
import { daysOfWeek } from "../../data/appData";
import { LocalizationProvider, MobileTimePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useNavigate } from "react-router-dom";
import ProgressingButton from "../ProgressingButton";

const PatientAddition: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [patientData, setPatientData] = useState<Patient>({
    id: 0,
    name: "",
    age: 0,
    phone: "",
    filterInfo: {
      id: 0,
      used: 0,
      isFinished: false,
    },
    schedule: [],
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPatientData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFilterInfoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPatientData((prev) => ({
      ...prev,
      filterInfo: {
        ...prev.filterInfo,
        [name]: value,
      },
    }));
  };

  const handleScheduleChange = (day: string, time: Dayjs | null) => {
    setPatientData((prev) => {
      const newSchedule = prev.schedule.filter((s) => s.dayofWeek !== day);
      if (time && time.format("HH:mm") !== "") {
        newSchedule.push({ time: time.format("HH:mm"), dayofWeek: day });
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
      filterInfo.id > 0 &&
      schedule.length > 0
    );
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
        <TextField
          label="Filter ID"
          name="id"
          value={patientData.filterInfo.id}
          onChange={handleFilterInfoChange}
          fullWidth
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
                    patientData.schedule.find((s) => s.dayofWeek === day)?.time
                      ? dayjs(
                          patientData.schedule.find((s) => s.dayofWeek === day)
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
          onClick={() => {
            if (!isFormValid()) return;
            setLoading(true);
            setTimeout(() => setLoading(false), 2000);
          }}
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
