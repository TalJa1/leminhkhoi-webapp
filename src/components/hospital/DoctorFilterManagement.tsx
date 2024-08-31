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
  styled,
  Box,
  InputBase,
  Chip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { filterListData } from "../../data/appData";
import { TransitionProps } from "@mui/material/transitions";
import CloseIcon from "@mui/icons-material/Close";
import { FilterListProps, SnackBarColor } from "../../services/typeProps";
import SearchIcon from "@mui/icons-material/Search";
import NotiAlert from "../NotiAlert";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
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

const DoctorFilterManagement = () => {
  const [open, setOpen] = useState(false);
  const [isModify, setIsModify] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [filterData, setFilterData] =
    useState<FilterListProps[]>(filterListData);
  const [selectedFilter, setSelectedFilter] = useState<FilterListProps>({
    id: -1,
    used: 0,
    description: "Filter 1 description",
    isFinished: false,
    forPatient: [
      {
        id: 1,
        name: "Nguyễn Văn A",
        age: 0,
        phone: "0987654321",
      },
    ],
  });

  const [search, setSearch] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackBarTitle, setSnackBarTitle] = useState<string>("");
  const [snackBarColor, setSnackBarColor] = useState<SnackBarColor>("success");

  const handleClickOpen = (id: number) => {
    const filter = filterListData.find((p) => p.id === id);
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
    setSnackBarTitle("Save successfully");
    setSnackBarColor("success");
    setSnackbarOpen(true);

    setIsModify(false);
    setOpen(false);
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
    const searchNumber = Number(search);
    return (
      filter.id === searchNumber ||
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

  return (
    <React.Fragment>
      <Box>
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
          <Accordion>
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
        </Box>
      </Dialog>
    </React.Fragment>
  );
};

export default DoctorFilterManagement;
