import React, { useState, useContext, useEffect } from "react";
import AuthContext from "../../store/auth-context";
// import classes from "./AuthForm.module.css";
import logo from "../img/Logo.png";
// import LoadingSpinner from "../UI/LoadingSpinner";
// import Button from "../UI/Button";
// import Modal from "../UI/Modal";
// import SignIn from "./SignIn";
/********************************************** */
// import * as React from "react";
// import Avatar from "@mui/material/Avatar";
// import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
// import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
// import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import LoadingButton from "@mui/lab/LoadingButton";
import SendIcon from "@mui/icons-material/Send";
// import { red } from "@mui/material/colors";
// import Card from "@mui/material/Card";
import Paper from "@mui/material/Paper";
import { Switch, Alert } from "@mui/material";
/********************************************** */
function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © Simple trade "}
      {/* <Link color="inherit" href="https://simpletrade-c8774.firebaseapp.com/"> */}

      {/* </Link> */}
      {new Date().getFullYear()}
    </Typography>
  );
}

const theme = createTheme();

export default function AuthForm() {
  const authCtx = useContext(AuthContext);
  const errorWhilelogin = authCtx.error;
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredFirstName, setEnteredFirstName] = useState("");
  // const [enteredLastName, setEnteredLastName] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [signinForm, setSigninForm] = useState(true);
  const [trytoLogin, setTryToLogin] = useState(false);
  // const [showModal, setShowModal] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const submitHandler = async (event) => {
    event.preventDefault();
    setTryToLogin(true);
    // const data = new FormData(event.currentTarget);
    setErrMsg("");
    if (
      enteredEmail.trim().length === 0 ||
      !enteredEmail.includes("@") ||
      !enteredEmail.includes(".")
    ) {
      setErrMsg("Please check the entered E-mail");
      setTryToLogin(false);

      return;
    }
    if (enteredPassword.trim().length < 5) {
      setErrMsg("Password should be at least 5 characters long");
      setTryToLogin(false);
      return;
    }
    if (!signinForm && enteredFirstName.trim().length < 3) {
      setErrMsg("Firsty name should be at least 3 characters long");
      setTryToLogin(false);
      return;
    }

    if (signinForm) {
      authCtx.login(enteredEmail, enteredPassword);
    } else {
      authCtx.signup(enteredEmail, enteredFirstName, enteredPassword);
    }
  };

  // const signinToggleHanlder = () => {
  //   setSigninForm((prevState) => {
  //     setSigninForm(!prevState);
  //   });
  // };

  // const modalHandler = () => {
  //   authCtx.toggleError();
  //   authCtx.errorMsg = "";
  //   // setShowModal(false);
  //   setTryToLogin(false);
  // };

  useEffect(() => {
    if (errorWhilelogin) {
      setErrMsg(authCtx.errorMsg);
      setTryToLogin(false);
    }
  }, [errorWhilelogin, authCtx.errorMsg]);

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="xs">
        <Paper
          variant="outlined"
          sx={{ marginTop: 8, padding: 3, borderRadius: "4%" }}
        >
          <CssBaseline />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <img src={logo} loading="lazy" width="60%" alt="logo" />

            <Typography component="h1" variant="h5">
              {signinForm ? "Sign in" : "Sign up"}
            </Typography>
            <Box
              component="form"
              // noValidate
              onSubmit={submitHandler}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                {signinForm ? (
                  ""
                ) : (
                  <>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        // autoComplete="given-name"
                        name="firstName"
                        value={enteredFirstName}
                        required
                        fullWidth
                        id="firstName"
                        label="First Name"
                        autoFocus
                        onChange={(e) => {
                          setEnteredFirstName(e.target.value);
                        }}
                      />
                    </Grid>
                    {/* <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        fullWidth
                        id="lastName"
                        value={enteredLastName}
                        label="Last Name"
                        name="lastName"
                        // autoComplete="family-name"
                        onChange={(e) => {
                          setEnteredLastName(e.target.value);
                        }}
                      />
                    </Grid> */}
                  </>
                )}
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    type="email"
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    onChange={(e) => {
                      setEnteredEmail(e.target.value);
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    minLength={5}
                    name="password"
                    label="Password"
                    type="password"
                    placeholder="5 charts"
                    id="password"
                    onChange={(e) => {
                      setEnteredPassword(e.target.value);
                    }}
                    // autoComplete="new-password"
                  />
                </Grid>
                {signinForm ? (
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={
                        <Switch
                          value="remember"
                          color="primary"
                          defaultChecked
                        />
                      }
                      label="Remember me"
                    />
                  </Grid>
                ) : (
                  ""
                )}
              </Grid>
              {errMsg ? ( // || authCtx.errorMsg
                <Alert severity="error" sx={{ marginTop: 2 }}>
                  {errMsg}!{/* || authCtx.errorMsg */}
                </Alert>
              ) : (
                ""
              )}
              <LoadingButton
                type="submit"
                sx={{ mt: 3, mb: 2 }}
                // onClick={handleClick}
                fullWidth
                endIcon={<SendIcon />}
                loading={trytoLogin}
                loadingPosition="end"
                variant="contained"
              >
                {signinForm ? "Sign In" : "Sign up"}
              </LoadingButton>
              <Grid container justifyContent="flex-start">
                <Grid item>
                  <Link
                    href="#"
                    variant="body2"
                    onClick={() => {
                      setSigninForm(!signinForm);
                      setErrMsg("");
                    }}
                  >
                    {signinForm
                      ? "Don't have an account? Sign Up"
                      : "Already have an account? Sign in"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 5 }} />
        </Paper>
      </Container>
    </ThemeProvider>
  );
}
