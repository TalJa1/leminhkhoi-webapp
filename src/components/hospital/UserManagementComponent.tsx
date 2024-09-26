import {
  Box,
  Chip,
  IconButton,
  InputBase,
  Paper,
  styled,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import userAPI from "../../apis/userAPI";
import { Account } from "../../services/typeProps";

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
  accountID: string,
  email: string,
  password: string,
  role: string
) {
  return { accountID, email, password, role };
}

const initialRows = [createData("1", "test@gmail.com", "123456", "patient")];

function UserManagementComponent() {
  const [userData, setUserData] = useState<
    {
      accountID: string;
      email: string;
      password: string;
      role: string;
    }[]
  >(initialRows);
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState(userData);

  useEffect(() => {
    userAPI
      .getUsers()
      .then((res) => {
        const patientData: Account[] = res.data.data.filter(
          (user: Account) => user.role === "patient"
        );
        
        setUserData(patientData);
        setFilteredData(patientData); // Initialize filtered data
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    setSearch(value);
    const filtered = userData.filter(
      (user) =>
        user.accountID.toLowerCase().includes(value) ||
        user.email.toLowerCase().includes(value)
    );
    setFilteredData(filtered);
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
              <StyledTableCell>User Id</StyledTableCell>
              <StyledTableCell>Email</StyledTableCell>
              <StyledTableCell align="right">Password</StyledTableCell>
              <StyledTableCell align="right">role</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.map((row) => (
              <StyledTableRow key={row.accountID}>
                <StyledTableCell component="th" scope="row">
                  {row.accountID}
                </StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  {row.email}
                </StyledTableCell>
                <StyledTableCell align="right">{row.password}</StyledTableCell>
                <StyledTableCell align="right">{row.role}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ marginTop: "10px" }}>
        <Chip
          sx={{ float: "right" }}
          color="primary"
          label={`Total number of patients: ${userData.length}`}
        />
      </Box>
    </Box>
  );
}

export default UserManagementComponent;
