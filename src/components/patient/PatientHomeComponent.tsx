import React, { useEffect, useState } from "react";
import { Box, Grid, Typography, Paper } from "@mui/material";
import {
  dayOfWeekMap,
  formatDate,
  getDateOfCurrentWeek,
} from "../../services/datetimeService";
import { DayOfWeek, Patient } from "../../services/typeProps";
import patientAPI from "../../apis/patientAPI";

const PatientHomeComponent = () => {
  const [patientData, setPatientData] = useState<Patient>({
    _id: "",
    id: "",
    name: "",
    age: 0,
    phone: "",
    schedule: [
      {
        time: "",
        dayOfWeek: "",
        _id: "",
      },
    ],
    __v: 0,
    filterInfo: {
      _id: "",
      id: "",
      used: 0,
      description: "",
      isFinished: false,
      forPatient: [],
      __v: 0,
    },
  });

  useEffect(() => {
    const userDataString = sessionStorage.getItem("userData");
    const userData = userDataString ? JSON.parse(userDataString) : null;
    const accountID = userData ? userData.accountID : null;

    if (accountID) {
      patientAPI.getPatientByAccountID(accountID).then((response) => {
        const patientData: Patient = response.data.data;

        if (patientData !== null) {
          setPatientData(response.data.data);
        } else {
          setPatientData({
            _id: "",
            id: "",
            name: "",
            age: 0,
            phone: "",
            schedule: [
              {
                time: "",
                dayOfWeek: "",
                _id: "",
              },
            ],
            __v: 0,
            filterInfo: {
              _id: "",
              id: "",
              used: 0,
              description: "",
              isFinished: false,
              forPatient: [],
              __v: 0,
            },
          });
        }
      });
    }
  }, []);

  return (
    <Box sx={{ flexGrow: 1, padding: 4, backgroundColor: "#f5f5f5" }}>
      <Grid container spacing={4}>
        {/* Left Grid: Patient Info */}
        <Grid item xs={12} md={6} lg={6}>
          <Paper elevation={3} sx={{ padding: 3 }}>
            <Typography variant="h5" gutterBottom>
              Patient Information
            </Typography>
            <Typography variant="body1" sx={{ marginBottom: 1 }}>
              <strong>Name:</strong> {patientData.name}
            </Typography>
            <Typography variant="body1" sx={{ marginBottom: 1 }}>
              <strong>Age:</strong> {patientData.age}
            </Typography>
            <Typography variant="body1" sx={{ marginBottom: 1 }}>
              <strong>Phone:</strong> {patientData.phone}
            </Typography>
          </Paper>
        </Grid>

        {/* Right Grid: Schedule */}
        <Grid item xs={12} md={6} lg={6}>
          <Paper elevation={3} sx={{ padding: 3 }}>
            <Typography variant="h5" gutterBottom>
              Schedule (Weekly)
            </Typography>
            {patientData.schedule.map((entry, index) => {
              const dayNumber =
                dayOfWeekMap[entry.dayOfWeek.toLowerCase() as DayOfWeek];
              const date = getDateOfCurrentWeek(dayNumber);
              const formattedDate = formatDate(date);

              return (
                <Box key={index} sx={{ marginBottom: 2 }}>
                  <Typography variant="body1">
                    <strong>
                      {entry.dayOfWeek.charAt(0).toUpperCase() +
                        entry.dayOfWeek.slice(1)}
                      :
                    </strong>{" "}
                    {entry.time} ({formattedDate})
                  </Typography>
                </Box>
              );
            })}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PatientHomeComponent;
