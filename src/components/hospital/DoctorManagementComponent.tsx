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
  Box,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { patientData } from "../../data/appData";
import { TransitionProps } from "@mui/material/transitions";
import CloseIcon from "@mui/icons-material/Close";
import { Patient } from "../../services/typeProps";

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
  // hide last border
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
    schedule: [],
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
            <TableRow
              sx={{
                backgroundColor: "black",
              }}
            >
              <TableCell sx={{ color: "white" }}>ID</TableCell>
              <TableCell sx={{ color: "white" }}>Name</TableCell>
              <TableCell sx={{ color: "white" }} align="right">
                Age
              </TableCell>
              <TableCell sx={{ color: "white" }} align="right">
                Phone
              </TableCell>
              <TableCell sx={{ color: "white" }} align="right">
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {patientData.map((patient) => (
              <StyledTableRow key={patient.id}>
                <TableCell>{patient.id}</TableCell>
                <TableCell>{patient.name}</TableCell>
                <TableCell align="right">{patient.age}</TableCell>
                <TableCell align="right">{patient.phone}</TableCell>
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

      {/* Show dialog */}
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
              {isModify ? "Save" : "Edit"}
            </Button>
          </Toolbar>
        </AppBar>
        <List>
          <Grid container sx={{ padding: "1rem" }}>
            <Grid item xs={12} md={3} lg={3}>
              <ListItemText primary="ID" secondary={userDialog.id} />
            </Grid>
            <Grid item xs={12} md={3} lg={3}>
              <ListItemText primary="Name" secondary={userDialog.name} />
            </Grid>
            <Grid item xs={12} md={3} lg={3}>
              <ListItemText primary="Age" secondary={userDialog.age} />
            </Grid>
            <Grid item xs={12} md={3} lg={3}>
              <ListItemText primary="Phone" secondary={userDialog.phone} />
            </Grid>
          </Grid>
          <Divider />
          <Grid container sx={{ padding: "1rem" }}>
            <Grid item xs={12} md={8} lg={8}>
              {userDialog.schedule.map((s, index) => (
                <Box key={index}>
                  <ListItemText primary="Time" secondary={s.time} />
                  <ListItemText primary="Date" secondary={s.date} />
                </Box>
              ))}
            </Grid>
            <Grid item xs={12} md={4} lg={4}>
              <ListItemText
                primary="Filter ID"
                secondary={userDialog.filterInfo.id}
              />
              <ListItemText
                primary="Used"
                secondary={userDialog.filterInfo.used}
              />
              <ListItemText
                primary="Is Finished"
                secondary={userDialog.filterInfo.isFinished ? "Yes" : "No yet"}
              />
            </Grid>
          </Grid>
        </List>
      </Dialog>
    </React.Fragment>
  );
};

export default DoctorManagementComponent;
