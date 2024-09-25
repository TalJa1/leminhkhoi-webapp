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
  styled,
  Box,
  InputBase,
  Chip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  Autocomplete,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { TransitionProps } from "@mui/material/transitions";
import CloseIcon from "@mui/icons-material/Close";
import { FilterInfo, Patient, SnackBarColor } from "../../services/typeProps";
import SearchIcon from "@mui/icons-material/Search";
import NotiAlert from "../NotiAlert";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { useNavigate } from "react-router-dom";
import ProgressingButton from "../ProgressingButton";
import filterAPI from "../../apis/filterAPI";
import patientAPI from "../../apis/patientAPI";
import QRCode from "react-qr-code";

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

const DoctorFilterManagement = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [isModify, setIsModify] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [filterData, setFilterData] = useState<FilterInfo[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<FilterInfo>({
    _id: "",
    id: "",
    used: 0,
    description: "",
    isFinished: false,
    forPatient: [],
    __v: 0,
  });
  const [search, setSearch] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackBarTitle, setSnackBarTitle] = useState<string>("");
  const [snackBarColor, setSnackBarColor] = useState<SnackBarColor>("success");
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [listPatient, setListPatient] = useState<Patient[]>([]);

  const fetchFilterData = () => {
    filterAPI
      .getFilters()
      .then((res) => {
        setFilterData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchFilterData();
  }, []);

  useEffect(() => {
    patientAPI
      .getPatients()
      .then((res) => {
        const patients: Patient[] = res.data.data;
        setListPatient(patients);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleClickOpen = (id: string) => {
    const filter = filterData.find((p) => p.id === id);
    if (filter) {
      setSelectedFilter(filter);
    }
    setOpen(true);
  };

  const handleClose = () => {
    setIsModify(false);
    setOpen(false);
  };

  const handleSave = () => {
    const editFilterBody = {
      used: selectedFilter.used,
      description: selectedFilter.description,
      isFinished: selectedFilter.isFinished,
      forPatient: selectedFilter.forPatient.map((patient) => patient.id),
    };

    filterAPI
      .editFilter(selectedFilter.id, editFilterBody)
      .then(() => {
        setSnackBarTitle("Save successfully");
        setSnackBarColor("success");
        setSnackbarOpen(true);
        setIsModify(false);
        fetchFilterData();
        setOpen(false);
      })
      .catch(() => {
        setSnackBarTitle("Save failed");
        setSnackBarColor("error");
        setSnackbarOpen(true);
        setIsModify(false);
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

  const filteredFilters = filterData.filter((filter) => {
    return (
      filter.id === search ||
      filter.description.toLowerCase().includes(search.toLowerCase())
    );
  });

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    if (name === "used") {
      setSelectedFilter((prev) => ({
        ...prev,
        [name]: Number(value),
      }));
      return;
    }
    setSelectedFilter((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleIsFinishedChange = (value: any) => {
    setSelectedFilter((prev) => ({
      ...prev,
      isFinished: value,
    }));
  };

  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    setLoading(true);

    filterAPI
      .createFilter()
      .then((res) => {
        fetchFilterData();
        setSnackBarTitle("Add successfully");
        setSnackBarColor("success");
        setLoading(false);
        setSnackbarOpen(true);
      })
      .catch((err) => {
        setSnackBarTitle("Add failed");
        setSnackBarColor("error");
        setLoading(false);
        setSnackbarOpen(true);
      });
  };

  const handleCancelClick = (patientId: string) => {
    setSelectedFilter((prev) => ({
      ...prev,
      forPatient: prev.forPatient.filter((patient) => patient.id !== patientId),
    }));
  };

  const handleAddPatient = () => {
    if (selectedPatient) {
      setSelectedFilter((prev) => ({
        ...prev,
        forPatient: [...prev.forPatient, selectedPatient],
      }));
      setSelectedPatient(null);
    }
  };

  return (
    <React.Fragment>
      <Box>
        {/* Call API and directly create new filter with all default value */}
        <ProgressingButton loading={loading} onClick={handleClick}>
          Add
        </ProgressingButton>
        <Paper
          component="form"
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            float: "right",
            marginBottom: "10px",
          }}
        >
          <InputBase
            value={search}
            onChange={handleSearchChange}
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search by Id or description"
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
              <TableCell sx={{ color: "white" }} align="center">
                <Typography>Used</Typography>
              </TableCell>
              <TableCell sx={{ color: "white" }} align="center">
                <Typography>Status</Typography>
              </TableCell>
              <TableCell sx={{ color: "white" }} align="left">
                <Typography>Description</Typography>
              </TableCell>
              <TableCell sx={{ color: "white" }} align="center">
                <Typography>Actions</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredFilters.map((filter) => (
              <StyledTableRow key={filter.id}>
                <TableCell>
                  <Typography>{filter.id}</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography>{filter.used}</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography
                    sx={{
                      color: filter.isFinished ? "red" : "green",
                      fontWeight: "bold",
                      fontSize: "16px",
                      textDecoration: filter.isFinished
                        ? "line-through"
                        : "none",
                    }}
                  >
                    {filter.isFinished ? "Finished" : "In Use"}
                  </Typography>
                </TableCell>
                <TableCell align="left">
                  <Typography>
                    {filter.description.length <= 70
                      ? filter.description
                      : `${filter.description.substring(0, 70)}...`}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <IconButton
                    onClick={() => {
                      handleClickOpen(filter.id);
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
          label={`Total number of filters: ${filteredFilters.length}`}
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
        <Box>
          <Accordion sx={{ marginBottom: 5 }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography sx={{ fontWeight: "bold" }}>
                Filter Information for Id {selectedFilter.id}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              {isModify ? (
                <TextField
                  label="Used"
                  name="used"
                  type="number"
                  value={selectedFilter.used}
                  onChange={handleInputChange}
                  inputProps={{ min: 0 }}
                />
              ) : (
                <Typography>Used: {selectedFilter.used}</Typography>
              )}
            </AccordionDetails>
            <AccordionDetails
              sx={{
                display: "flex",
                flexDirection: "row",
                columnGap: "5px",
                alignItems: "center",
              }}
            >
              Status:
              {isModify ? (
                <>
                  <IconButton
                    color={selectedFilter.isFinished ? "primary" : "default"}
                    onClick={() => handleIsFinishedChange(true)}
                  >
                    <CheckCircleIcon />
                  </IconButton>
                  <IconButton
                    color={!selectedFilter.isFinished ? "primary" : "default"}
                    onClick={() => handleIsFinishedChange(false)}
                  >
                    <CancelIcon />
                  </IconButton>
                </>
              ) : selectedFilter.isFinished ? (
                <Typography
                  sx={{
                    color: "red",
                    fontWeight: "bold",
                    fontSize: "16px",
                    textDecoration: "line-through",
                  }}
                >
                  Finished
                </Typography>
              ) : (
                <Typography
                  sx={{
                    color: "green",
                    fontWeight: "bold",
                    fontSize: "16px",
                  }}
                >
                  In Use
                </Typography>
              )}
            </AccordionDetails>
            <AccordionDetails>
              {isModify ? (
                <TextField
                  label="Description"
                  name="description"
                  value={selectedFilter.description}
                  onChange={handleInputChange}
                  fullWidth
                />
              ) : (
                <Typography>
                  Description: {selectedFilter.description}
                </Typography>
              )}
            </AccordionDetails>
          </Accordion>
          <Box
            style={{
              height: "auto",
              margin: "0 auto",
              maxWidth: 100,
              width: "100%",
            }}
          >
            <QRCode
              size={256}
              style={{ height: "auto", maxWidth: "100%", width: "100%" }}
              value={`{filterId: ${selectedFilter.id}, used: ${selectedFilter.used}}`}
              viewBox={`0 0 256 256`}
            />
          </Box>
          <Typography variant="h6" sx={{ marginTop: 2, textAlign: "center" }}>
            List of Patients
          </Typography>
          {isModify && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: 2,
              }}
            >
              <Autocomplete
                options={listPatient}
                getOptionLabel={(option) => option.name}
                value={selectedPatient}
                onChange={(event, newValue) => setSelectedPatient(newValue)}
                renderInput={(params) => (
                  <TextField {...params} label="Select Patient" />
                )}
                sx={{ width: 300, marginRight: 2 }}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleAddPatient}
              >
                Add
              </Button>
            </Box>
          )}
          <TableContainer
            component={Paper}
            sx={{ width: "80%", margin: "0 auto" }}
          >
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: "black" }}>
                  <TableCell sx={{ color: "white" }}>ID</TableCell>
                  <TableCell sx={{ color: "white" }}>Name</TableCell>
                  <TableCell sx={{ color: "white" }}>Age</TableCell>
                  <TableCell sx={{ color: "white" }}>Phone</TableCell>
                  {isModify && (
                    <TableCell sx={{ color: "white", textAlign: "center" }}>
                      Action
                    </TableCell>
                  )}
                </TableRow>
              </TableHead>
              <TableBody>
                {selectedFilter.forPatient.map((patient) => (
                  <TableRow key={patient.id}>
                    <TableCell>{patient.id}</TableCell>
                    <TableCell>{patient.name}</TableCell>
                    <TableCell>{patient.age}</TableCell>
                    <TableCell>{patient.phone}</TableCell>
                    {isModify && (
                      <TableCell sx={{ textAlign: "center" }}>
                        <Button
                          variant="contained"
                          color="error"
                          onClick={() => handleCancelClick(patient.id)}
                        >
                          Remove
                        </Button>
                      </TableCell>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Dialog>
    </React.Fragment>
  );
};

export default DoctorFilterManagement;
