import React, { useEffect, useState } from "react";
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
  InputBase,
  Chip,
  Autocomplete,
  TextField,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { daysOfWeek } from "../../data/appData";
import { TransitionProps } from "@mui/material/transitions";
import CloseIcon from "@mui/icons-material/Close";
import {
  FilterInfo,
  Patient,
  SnackBarColor,
} from "../../services/typeProps";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import { MobileTimePicker } from "@mui/x-date-pickers";
import SearchIcon from "@mui/icons-material/Search";
import NotiAlert from "../NotiAlert";
import { useNavigate } from "react-router-dom";
import patientAPI from "../../apis/patientAPI";
import filterAPI from "../../apis/filterAPI";

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
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [isModify, setIsModify] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [listPatientData, setListPatientData] = useState<Patient[]>(
    [] as Patient[]
  );
  const [userDialog, setUserDialog] = useState<Patient>({
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
    filterInfo: {
      _id: "",
      id: "",
      used: 0,
      description: "",
      isFinished: false,
      forPatient: [],
      __v: 0,
    },
    _id: "",
    __v: 0,
  });
  const [search, setSearch] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackBarTitle, setSnackBarTitle] = useState<string>("");
  const [snackBarColor, setSnackBarColor] = useState<SnackBarColor>("success");
  const [options, setOptions] = useState<FilterInfo[]>([]);

  const fetchPatients = () => {
    patientAPI
      .getPatients()
      .then((res) => {
        setListPatientData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  const handleClickOpen = (id: string) => {
    const patient = listPatientData.find((p) => p.id === id);
    if (patient) {
      setUserDialog(patient);
    }
    setOpen(true);
  };

  const handleClose = () => {
    setIsModify(false);
    setOpen(false);
  };

  const handleSave = () => {
    const editPatientBody = {
      name: userDialog.name,
      age: userDialog.age,
      phone: userDialog.phone,
      schedule: userDialog.schedule.map(({ _id, ...rest }) => rest),
      filterInfo: {
        id: userDialog.filterInfo.id,
      },
    };

    patientAPI
      .editPatient(editPatientBody, parseInt(userDialog.id))
      .then((res) => {
        setSnackBarTitle("Save successfully");
        setSnackBarColor("success");
        setSnackbarOpen(true);
        setIsModify(false);
        fetchPatients();
        setOpen(false);
      })
      .catch((err) => {
        setSnackBarTitle("Save failed");
        setSnackBarColor("error");
        setSnackbarOpen(true);
        setIsModify(false);
        setOpen(false);
      });
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const handleModify = () => {
    setIsModify(true);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const filteredPatients = Array.isArray(listPatientData)
    ? listPatientData.filter(
        (patient) =>
          patient.name.toLowerCase().includes(search.toLowerCase()) ||
          patient.phone.includes(search)
      )
    : [];

  // console.log("filteredPatients", filteredPatients);

  const capitalizeString = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  useEffect(() => {
    filterAPI
      .getFilters()
      .then((res) => {
        const getData: FilterInfo[] = res.data.data;
        const filterData = getData.filter((v) => v.isFinished !== true);

        setOptions(filterData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleInputChange =
    (field: keyof Patient) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setUserDialog((prev) => ({
        ...prev,
        [field]: event.target.value,
      }));
    };

  return (
    <React.Fragment>
      <Box>
        <Button
          variant="text"
          color="primary"
          onClick={() => {
            navigate("/patientaddition");
          }}
          sx={{ mr: 1 }}
        >
          Add
        </Button>
        <Paper
          component="form"
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            // maxWidth: 400,
            float: "right",
            marginBottom: "10px",
          }}
        >
          <InputBase
            value={search}
            onChange={handleSearchChange}
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search by name or phone"
            inputProps={{ "aria-label": "Search by name or phone" }}
          />
          <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
            <SearchIcon />
          </IconButton>
        </Paper>
      </Box>
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
            {filteredPatients.map((patient) => (
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

      <Box sx={{ marginTop: "10px" }}>
        <Chip
          sx={{ float: "right" }}
          color="primary"
          label={`Total number of patients: ${filteredPatients.length}`}
        />
      </Box>
      <NotiAlert
        open={snackbarOpen}
        handleClose={handleCloseSnackbar}
        color={snackBarColor}
        title={snackBarTitle}
      />
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
              {isModify ? (
                <TextField
                  label="Name"
                  value={userDialog.name}
                  onChange={handleInputChange("name")}
                  fullWidth
                />
              ) : (
                <ListItemText
                  primary={<Typography>Name</Typography>}
                  secondary={<Typography>{userDialog.name}</Typography>}
                />
              )}
            </Grid>
            <Grid item xs={12} md={3} lg={3}>
              {isModify ? (
                <TextField
                  label="Age"
                  value={userDialog.age}
                  onChange={handleInputChange("age")}
                  fullWidth
                />
              ) : (
                <ListItemText
                  primary={<Typography>Age</Typography>}
                  secondary={<Typography>{userDialog.age}</Typography>}
                />
              )}
            </Grid>
            <Grid item xs={12} md={3} lg={3}>
              {isModify ? (
                <TextField
                  label="Phone"
                  value={userDialog.phone}
                  onChange={handleInputChange("phone")}
                  fullWidth
                />
              ) : (
                <ListItemText
                  primary={<Typography>Phone</Typography>}
                  secondary={<Typography>{userDialog.phone}</Typography>}
                />
              )}
            </Grid>
          </Grid>
          <Divider />
          <Grid container alignItems="flex-start">
            <Grid
              container
              item
              xs={12}
              md={6}
              lg={6}
              sx={{ padding: "1rem" }}
              rowGap={1}
            >
              <Grid item xs={12} md={12}>
                <TableContainer component={Paper}>
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
                              {capitalizeString(entry.dayOfWeek)}
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
                      {isModify ? (
                        <Autocomplete
                          options={options}
                          getOptionLabel={(option) => option.id}
                          value={userDialog.filterInfo}
                          isOptionEqualToValue={(option, value) =>
                            option.id === value.id
                          }
                          onChange={(event, newValue) => {
                            setUserDialog((prev) => ({
                              ...prev,
                              filterInfo: {
                                ...prev.filterInfo, // Preserve existing filterInfo fields
                                id: newValue?.id || "", // Update with newValue fields
                                description: newValue?.description || "",
                                _id: newValue?._id || "", // Assuming newValue also has _id
                                used: newValue?.used || 0,
                                isFinished: newValue?.isFinished || false,
                                forPatient: newValue?.forPatient || [],
                                __v: newValue?.__v || 0,
                              },
                            }));
                          }}
                          renderInput={(params) => (
                            <TextField {...params} label="Filter ID" />
                          )}
                        />
                      ) : (
                        <ListItemText
                          primary={<Typography>Filter ID</Typography>}
                          secondary={
                            <Typography>{userDialog.filterInfo.id}</Typography>
                          }
                        />
                      )}
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
            <Grid item container xs={12} md={6} lg={6}>
              {isModify && (
                <Grid item sx={{ padding: "1rem" }}>
                  {daysOfWeek.map((day) => {
                    const scheduleEntry = userDialog.schedule.find(
                      (entry) =>
                        entry.dayOfWeek.toLowerCase() === day.toLowerCase()
                    );
                    const isScheduled = !!scheduleEntry;
                    return (
                      <Box
                        key={day}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          marginBottom: "1rem",
                          padding: "0.5rem",
                          border: "1px solid #e0e0e0",
                          borderRadius: "8px",
                          backgroundColor: "#f9f9f9",
                        }}
                      >
                        <Typography
                          sx={{
                            marginRight: "1rem",
                            width: "100px",
                            fontWeight: "bold",
                          }}
                        >
                          {day}
                        </Typography>
                        <IconButton
                          sx={{
                            width: "40px",
                            height: "40px",
                            marginRight: "1rem",
                          }}
                          onClick={() => {
                            setUserDialog((prev) => {
                              const isScheduled = prev.schedule.some(
                                (entry) =>
                                  entry.dayOfWeek.toLowerCase() ===
                                  day.toLowerCase()
                              );
                              return {
                                ...prev,
                                schedule: isScheduled
                                  ? prev.schedule.filter(
                                      (entry) =>
                                        entry.dayOfWeek.toLowerCase() !==
                                        day.toLowerCase()
                                    )
                                  : [
                                      ...prev.schedule,
                                      {
                                        time: "00:00",
                                        dayOfWeek: day.toLowerCase(),
                                        _id: "",
                                      },
                                    ],
                              };
                            });
                          }}
                        >
                          {isScheduled ? (
                            <CheckCircleIcon color="primary" />
                          ) : (
                            <CancelIcon color="error" />
                          )}
                        </IconButton>
                        {isScheduled && (
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={["MobileTimePicker"]}>
                              <MobileTimePicker
                                label={"Select Time"}
                                value={dayjs(
                                  `2022-04-17T${scheduleEntry!.time}`
                                )}
                                onChange={(newValue) => {
                                  setUserDialog((prev) => ({
                                    ...prev,
                                    schedule: prev.schedule.map((entry) =>
                                      entry.dayOfWeek.toLowerCase() ===
                                      day.toLowerCase()
                                        ? {
                                            ...entry,
                                            time: newValue!.format("HH:mm"),
                                          }
                                        : entry
                                    ),
                                  }));
                                }}
                              />
                            </DemoContainer>
                          </LocalizationProvider>
                        )}
                      </Box>
                    );
                  })}
                </Grid>
              )}
            </Grid>
          </Grid>
        </List>
      </Dialog>
    </React.Fragment>
  );
};

export default DoctorManagementComponent;
