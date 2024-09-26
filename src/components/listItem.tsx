import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import LogoutIcon from "@mui/icons-material/Logout";
import VaccinesIcon from "@mui/icons-material/Vaccines";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import MedicalInformationIcon from "@mui/icons-material/MedicalInformation";
import ContactPageIcon from '@mui/icons-material/ContactPage';
import { Link } from "react-router-dom";

export const mainListItems = (
  <React.Fragment>
    <ListItemButton component={Link} to="/home">
      <ListItemIcon>
        <HomeWorkIcon color="primary" />
      </ListItemIcon>
      <ListItemText primary="Home" />
    </ListItemButton>
    <ListItemButton component={Link} to="/management">
      <ListItemIcon>
        <MedicalInformationIcon color="info"/>
      </ListItemIcon>
      <ListItemText primary="Management" />
    </ListItemButton>
    <ListItemButton component={Link} to="/usermanagement">
      <ListItemIcon>
        <ContactPageIcon color="disabled" />
      </ListItemIcon>
      <ListItemText primary="User Management" />
    </ListItemButton>
    <ListItemButton component={Link} to="/filtermanagement">
      <ListItemIcon>
        <VaccinesIcon />
      </ListItemIcon>
      <ListItemText primary="Filter Management" />
    </ListItemButton>
    <ListItemButton component={Link} to="/login">
      <ListItemIcon>
        <LogoutIcon color="error" />
      </ListItemIcon>
      <ListItemText primary="Log Out" />
    </ListItemButton>
  </React.Fragment>
);

export const secondaryListItems = (
  <React.Fragment>
    <ListItemButton component={Link} to="/home">
      <ListItemIcon>
        <HomeWorkIcon color="primary" />
      </ListItemIcon>
      <ListItemText primary="Home" />
    </ListItemButton>
    <ListItemButton component={Link} to="/login">
      <ListItemIcon>
        <LogoutIcon color="error" />
      </ListItemIcon>
      <ListItemText primary="Log Out" />
    </ListItemButton>
  </React.Fragment>
);
