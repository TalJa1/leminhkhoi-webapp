import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Paper,
  Slide,
  Dialog,
  AppBar,
  Toolbar,
  Typography,
  Button,
  List,
  ListItemText,
  Divider,
  Grid,
  styled,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { patientData } from "../../data/appData";
import { TransitionProps } from "@mui/material/transitions";
import CloseIcon from "@mui/icons-material/Close";
import { Patient } from "../../services/typeProps";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const DoctorManagementComponent = () => {
  const [open, setOpen] = useState(false);
  const [isModify, setIsModify] = useState(false);
  const [userDialog, setUserDialog] = useState<Patient>({
    id: -1,
    name: "",
    age: -1,
    phone: "",
    filterInfo: {
      id: -1,
      used: -1,
      isFinished: false,
    },
    schedule: [
      {
        time: "",
        dayofWeek: "",
      },
    ],
  });

  const handleClickOpen = (id: number) => {
    const patient = patientData.find((p) => p.id === id);
    if (patient) {
      setUserDialog(patient);
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    setIsModify(false);
    setOpen(false);
  };

  const handleModify = () => {
    setIsModify(true);
  };

  return (
    <React.Fragment>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "black" }}>
              <TableCell sx={{ color: "white" }}>
                <Typography>ID</Typography>
              </TableCell>
              <TableCell sx={{ color: "white" }}>
                <Typography>Name</Typography>
              </TableCell>
              <TableCell sx={{ color: "white" }} align="right">
                <Typography>Age</Typography>
              </TableCell>
              <TableCell sx={{ color: "white" }} align="right">
                <Typography>Phone</Typography>
              </TableCell>
              <TableCell sx={{ color: "white" }} align="right">
                <Typography>Actions</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {patientData.map((patient) => (
              <StyledTableRow key={patient.id}>
                <TableCell>
                  <Typography>{patient.id}</Typography>
                </TableCell>
                <TableCell>
                  <Typography>{patient.name}</Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography>{patient.age}</Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography>{patient.phone}</Typography>
                </TableCell>
                <TableCell align="right">
                  <IconButton
                    onClick={() => {
                      handleClickOpen(patient.id);
                    }}
                  >
                    <VisibilityIcon />
                  </IconButton>
                </TableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Detail
            </Typography>
            <Button
              autoFocus
              color="inherit"
              onClick={isModify ? handleSave : handleModify}
            >
              <Typography>{isModify ? "Save" : "Edit"}</Typography>
            </Button>
          </Toolbar>
        </AppBar>
        <List>
          <Grid container sx={{ padding: "1rem" }}>
            <Grid item xs={12} md={3} lg={3}>
              <ListItemText
                primary={<Typography>ID</Typography>}
                secondary={<Typography>{userDialog.id}</Typography>}
              />
            </Grid>
            <Grid item xs={12} md={3} lg={3}>
              <ListItemText
                primary={<Typography>Name</Typography>}
                secondary={<Typography>{userDialog.name}</Typography>}
              />
            </Grid>
            <Grid item xs={12} md={3} lg={3}>
              <ListItemText
                primary={<Typography>Age</Typography>}
                secondary={<Typography>{userDialog.age}</Typography>}
              />
            </Grid>
            <Grid item xs={12} md={3} lg={3}>
              <ListItemText
                primary={<Typography>Phone</Typography>}
                secondary={<Typography>{userDialog.phone}</Typography>}
              />
            </Grid>
          </Grid>
          <Divider />
          <Grid container sx={{ padding: "1rem" }}>
            <Grid container item xs={12} md={6} lg={6} spacing={2}>
              <Grid item xs={12} md={12}>
                <TableContainer component={Paper} sx={{ marginTop: 2 }}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ textAlign: "center" }}>
                          <Typography
                            sx={{ fontSize: "1.2rem", fontWeight: "bold" }}
                          >
                            Day of Week
                          </Typography>
                        </TableCell>
                        <TableCell sx={{ textAlign: "center" }}>
                          <Typography
                            sx={{ fontSize: "1.2rem", fontWeight: "bold" }}
                          >
                            Time
                          </Typography>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {userDialog.schedule.map((entry, index) => (
                        <TableRow key={index}>
                          <TableCell sx={{ textAlign: "center", width: "50%" }}>
                            <Typography
                              sx={{ fontSize: "1rem", fontWeight: "bold" }}
                            >
                              {entry.dayofWeek}
                            </Typography>
                          </TableCell>
                          <TableCell sx={{ textAlign: "center", width: "50%" }}>
                            <Typography
                              sx={{ fontSize: "1rem", fontWeight: "bold" }}
                            >
                              {entry.time}
                            </Typography>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
              <Grid item xs={12} md={12}>
                <Paper sx={{ padding: 2 }}>
                  <Grid container spacing={2} sx={{ textAlign: "center" }}>
                    <Grid item xs={4}>
                      <ListItemText
                        primary={<Typography>Filter ID</Typography>}
                        secondary={
                          <Typography>{userDialog.filterInfo.id}</Typography>
                        }
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <ListItemText
                        primary={<Typography>Used</Typography>}
                        secondary={
                          <Typography>{userDialog.filterInfo.used}</Typography>
                        }
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <ListItemText
                        primary={<Typography>Is Finished</Typography>}
                        secondary={
                          <>
                            {userDialog.filterInfo.isFinished ? (
                              <CheckCircleIcon color="primary" />
                            ) : (
                              <CancelIcon color="error" />
                            )}
                          </>
                        }
                      />
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            </Grid>
            <Grid item xs={12} md={6} lg={6}></Grid>
          </Grid>
        </List>
      </Dialog>
    </React.Fragment>
  );
};

export default DoctorManagementComponent;
