import React from "react";
import { Box, Grid, Typography, Paper } from "@mui/material";
import { patientInfo } from "../../data/appData";
import {
  dayOfWeekMap,
  formatDate,
  getDateOfCurrentWeek,
} from "../../services/datetimeService";
import { DayOfWeek } from "../../services/typeProps";

const PatientHomeComponent = () => {
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
              <strong>Name:</strong> {patientInfo.name}
            </Typography>
            <Typography variant="body1" sx={{ marginBottom: 1 }}>
              <strong>Age:</strong> {patientInfo.age}
            </Typography>
            <Typography variant="body1" sx={{ marginBottom: 1 }}>
              <strong>Phone:</strong> {patientInfo.phone}
            </Typography>
          </Paper>
        </Grid>

        {/* Right Grid: Schedule */}
        <Grid item xs={12} md={6} lg={6}>
          <Paper elevation={3} sx={{ padding: 3 }}>
            <Typography variant="h5" gutterBottom>
              Schedule (Weekly)
            </Typography>
            {patientInfo.schedule.map((entry, index) => {
              const dayNumber =
                dayOfWeekMap[entry.dayofWeek.toLowerCase() as DayOfWeek];
              const date = getDateOfCurrentWeek(dayNumber);
              const formattedDate = formatDate(date);

              return (
                <Box key={index} sx={{ marginBottom: 2 }}>
                  <Typography variant="body1">
                    <strong>
                      {entry.dayofWeek.charAt(0).toUpperCase() +
                        entry.dayofWeek.slice(1)}
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
