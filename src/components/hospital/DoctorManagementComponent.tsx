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
                  <IconButton aria-label="info">
                    <VisibilityIcon
                      onClick={() => {
                        handleClickOpen(patient.id);
                      }}
                    />
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
            <Button autoFocus color="inherit" onClick={handleClose}>
              save
            </Button>
          </Toolbar>
        </AppBar>
        <List>
          <Grid container sx={{ margin: "1rem" }}>
            <Grid item xs={6}>
              <ListItemText primary="ID" secondary={userDialog.id} />
            </Grid>
            <Grid item xs={6}>
              <ListItemText primary="Name" secondary={userDialog.name} />
            </Grid>
          </Grid>
          <Divider />
        </List>
      </Dialog>
    </React.Fragment>
  );
};

export default DoctorManagementComponent;
