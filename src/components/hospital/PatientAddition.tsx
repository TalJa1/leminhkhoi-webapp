import React, { useState, ChangeEvent, FormEvent } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import { Patient } from "../../services/typeProps";
import { daysOfWeek } from "../../data/appData";
import { LocalizationProvider, MobileTimePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const PatientAddition: React.FC = () => {
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
        <Typography variant="h4" component="h1" gutterBottom>
          Add New Patient
        </Typography>
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
        <TextField
          label="Used"
          name="used"
          type="number"
          value={patientData.filterInfo.used}
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
        <Button type="submit" variant="contained" color="primary">
          Add Patient
        </Button>
      </Box>
    </Box>
  );
};

export default PatientAddition;
