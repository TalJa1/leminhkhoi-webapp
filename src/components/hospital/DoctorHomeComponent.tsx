import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import Box from "@mui/material/Box";
import { Chip, IconButton, InputBase } from "@mui/material";
import patientAPI from "../../apis/patientAPI";
import { Patient } from "../../services/typeProps";
import dayjs from "dayjs";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    paddingTop: theme.spacing(3), // Increase padding top for header cells
    paddingBottom: theme.spacing(3), // Increase padding bottom for header cells
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 16,
    paddingTop: theme.spacing(3), // Increase padding top for body cells
    paddingBottom: theme.spacing(3), // Increase padding bottom for body cells
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function createData(
  name: string,
  phone: string,
  filterId: number,
  age: number,
  time: string,
  date: string
) {
  return { name, phone, filterId, age, time, date };
}

function formatDate(date: Date): string {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
}

const today = new Date();
const formattedDate = formatDate(today);

const initialRows = [
  createData("Nguyễn Văn A", "0123456789", 1, 30, "08:00", formattedDate),
];

const DoctorHomeComponent = () => {
  const [rows, setRows] = useState(initialRows);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const res = await patientAPI.getPatients();
        const patients: Patient[] = res.data.data;

        // Get today's day of the week
        const today = dayjs().format("dddd").toLowerCase(); // e.g., "friday"

        // Filter and transform patients based on today's day of the week
        const newRows = patients
          .filter((patient) =>
            patient.schedule.some(
              (schedule) => schedule.dayOfWeek.toLowerCase() === today
            )
          )
          .map((patient) => {
            const schedule = patient.schedule.find(
              (schedule) => schedule.dayOfWeek.toLowerCase() === today
            );
            return createData(
              patient.name,
              patient.phone,
              Number(patient.filterInfo.id),
              patient.age,
              schedule ? schedule.time : "",
              formattedDate
            );
          });

        setRows(newRows);
      } catch (error) {
        console.error("Failed to fetch patients", error);
      }
    };

    fetchPatients();
  }, []);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearch(value);
    if (value === "") {
      setRows(initialRows);
    } else {
      const filteredRows = initialRows.filter(
        (row) =>
          row.name.toLowerCase().includes(value.toLowerCase()) ||
          row.phone.includes(value)
      );
      setRows(filteredRows);
    }
  };

  return (
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
          placeholder="Search by name or phone"
          inputProps={{ "aria-label": "Search by name or phone" }}
        />
        <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
          <SearchIcon />
        </IconButton>
      </Paper>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Patient name</StyledTableCell>
              <StyledTableCell align="right">Phone</StyledTableCell>
              <StyledTableCell align="right">Age</StyledTableCell>
              <StyledTableCell align="right">Kidney filter(id)</StyledTableCell>
              <StyledTableCell align="right">Time</StyledTableCell>
              <StyledTableCell align="right">Date</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <StyledTableRow key={row.name}>
                <StyledTableCell component="th" scope="row">
                  {row.name}
                </StyledTableCell>
                <StyledTableCell align="right">{row.phone}</StyledTableCell>
                <StyledTableCell align="right">{row.age}</StyledTableCell>
                <StyledTableCell align="right">{row.filterId}</StyledTableCell>
                <StyledTableCell align="right">{row.time}</StyledTableCell>
                <StyledTableCell align="right">{row.date}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ marginTop: "10px" }}>
        <Chip
          sx={{ float: "right" }}
          color="primary"
          label={`Total number of patients: ${rows.length}`}
        />
      </Box>
    </Box>
  );
};

export default DoctorHomeComponent;
