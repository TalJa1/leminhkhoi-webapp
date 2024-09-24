import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import userAPI from "../apis/userAPI";
import { Account, SnackBarColor } from "../services/typeProps";
import { Autocomplete } from "@mui/material";
import { roles } from "../data/appData";
import NotiAlert from "../components/NotiAlert";

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const defaultTheme = createTheme();

export default function Auth() {
  const [isSignIn, setIsSignIn] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState<string | null>(null);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [roleError, setRoleError] = useState("");
  const [notiOpen, setNotiOpen] = useState(false);
  const [notiContent, setNotiContent] = useState<{
    title: string;
    color: SnackBarColor;
  }>({ title: "", color: "success" });

  const navigate = useNavigate();

  const switchToSignUp = () => setIsSignIn(false);
  const switchToSignIn = () => setIsSignIn(true);

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    if (emailError) {
      setEmailError("");
    }
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    if (passwordError) {
      setPasswordError("");
    }
  };

  const handleConfirmPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(event.target.value);
    if (confirmPasswordError) {
      setConfirmPasswordError("");
    }
  };

  const handleRoleChange = (
    event: React.ChangeEvent<{}>,
    value: string | null
  ) => {
    setRole(value?.toLocaleLowerCase() || null);
    if (roleError) {
      setRoleError("");
    }
  };

  const handleEmailBlur = () => {
    if (!validateEmail(email)) {
      setEmailError("Invalid email address");
    }
  };

  const handlePasswordBlur = () => {
    if (!validatePassword(password)) {
      setPasswordError("Password must be at least 6 characters");
    }
  };

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePassword = (password: string) => {
    return password.length >= 6;
  };

  const handleSignInSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);

    if (!isEmailValid) {
      setEmailError("Invalid email address");
    }

    if (!isPasswordValid) {
      setPasswordError("Password must be at least 6 characters");
    }

    // Email and password are valid
    if (isEmailValid && isPasswordValid) {
      userAPI
        .getUsers()
        .then((res) => {
          if (!Array.isArray(res.data.data)) {
            throw new Error("Response data is not an array");
          }
          const listAccount: Account[] = res.data.data;

          const account = listAccount.find(
            (account) =>
              account.email === email && account.password === password
          );
          if (!account) {
            setEmailError("Invalid email or password");
            setPasswordError("Invalid email or password");
            return;
          }
          sessionStorage.setItem(
            "userData",
            JSON.stringify({
              accountID: account.accountID,
              email: email,
              role: account.role,
            })
          );

          navigate("/home");
        })
        .catch((err) => {
          console.log("err", err);
        });
    }
  };

  const handleSignUpSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);
    const isConfirmPasswordValid = password === confirmPassword;
    const isRoleValid = role !== null;

    if (!isEmailValid) {
      setEmailError("Invalid email address");
    }

    if (!isPasswordValid) {
      setPasswordError("Password must be at least 6 characters");
    }

    if (!isConfirmPasswordValid) {
      setConfirmPasswordError("Passwords do not match");
    }

    if (!isRoleValid) {
      setRoleError("Please select a role");
    }

    if (
      isEmailValid &&
      isPasswordValid &&
      isConfirmPasswordValid &&
      isRoleValid
    ) {
      userAPI
        .createUser({ email, password, role })
        .then((res) => {
          setNotiContent({
            title: "User created successfully!",
            color: "success",
          });
          setNotiOpen(true);
          switchToSignIn();
        })
        .catch((err) => {
          console.log("err", err);
          setNotiContent({ title: "Error creating user", color: "error" });
          setNotiOpen(true);
        });
    }
  };

  const handleNotiClose = () => {
    setNotiOpen(false);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              'url("https://th.bing.com/th/id/R.c734d16472409df22ecfca97d99d6691?rik=GkINbMARksKu7w&riu=http%3a%2f%2fwww.pixelstalk.net%2fwp-content%2fuploads%2f2016%2f08%2fDesktop-Best-And-Website-background-2560x1600.jpg&ehk=PRvGxoU3%2f8bAVsH7JxbdDMfS8ui%2byLZy1wPVmNY2Rzs%3d&risl=&pid=ImgRaw&r=0")',
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "left",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          {isSignIn ? (
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={handleSignInSubmit}
                sx={{ mt: 1 }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  value={email}
                  onChange={handleEmailChange}
                  onBlur={handleEmailBlur}
                  error={!!emailError}
                  helperText={emailError}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={handlePasswordChange}
                  onBlur={handlePasswordBlur}
                  error={!!passwordError}
                  helperText={passwordError}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </Button>
                <Grid container>
                  <Grid item xs></Grid>
                  <Grid item>
                    <Link href="#" variant="body2" onClick={switchToSignUp}>
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
                <Copyright sx={{ mt: 5 }} />
              </Box>
            </Box>
          ) : (
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign Up
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={handleSignUpSubmit}
                sx={{ mt: 1 }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  value={email}
                  onChange={handleEmailChange}
                  error={!!emailError}
                  helperText={emailError}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={handlePasswordChange}
                  error={!!passwordError}
                  helperText={passwordError}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  error={!!confirmPasswordError}
                  helperText={confirmPasswordError}
                />
                <Autocomplete
                  options={roles}
                  getOptionLabel={(option) => option}
                  fullWidth
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Role"
                      margin="normal"
                      required
                      error={!!roleError}
                      helperText={roleError}
                    />
                  )}
                  value={role}
                  onChange={handleRoleChange}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Create new account
                </Button>
                <Grid container>
                  <Grid item xs></Grid>
                  <Grid item>
                    <Link href="#" variant="body2" onClick={switchToSignIn}>
                      {"Already have an account? Sign In"}
                    </Link>
                  </Grid>
                </Grid>
                <Copyright sx={{ mt: 5 }} />
              </Box>
            </Box>
          )}
        </Grid>
      </Grid>
      <NotiAlert
        open={notiOpen}
        handleClose={handleNotiClose}
        color={notiContent.color}
        title={notiContent.title}
      />
    </ThemeProvider>
  );
}
