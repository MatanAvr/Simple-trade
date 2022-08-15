import React, { useContext, useState } from "react";
import classes from "./Header.module.css";
import logo from "../img/Logo.png";
import Button from "@mui/material/Button";
import LogoutIcon from "@mui/icons-material/Logout";
import Container from "@mui/system/Container";
import AuthContext from "../../store/auth-context";
import Typography from "@mui/material/Typography";

const initialTime = (() => {
  const now = new Date();
  const date =
    String(now.getDate()).padStart(2, 0) +
    "." +
    String(now.getMonth() + 1).padStart(2, 0) +
    "." +
    now.getFullYear();
  const time =
    String(now.getHours()).padStart(2, 0) +
    ":" +
    String(now.getMinutes()).padStart(2, 0) +
    ":" +
    String(now.getSeconds()).padStart(2, 0);
  return `${date} , ${time}`;
})();

const Header = () => {
  const authCtx = useContext(AuthContext);
  const [dateAndTime, setDateAndTime] = useState(initialTime);

  const getFullime = () => {
    const now = new Date();
    const date =
      String(now.getDate()).padStart(2, 0) +
      "." +
      String(now.getMonth() + 1).padStart(2, 0) +
      "." +
      now.getFullYear();
    const time =
      String(now.getHours()).padStart(2, 0) +
      ":" +
      String(now.getMinutes()).padStart(2, 0) +
      ":" +
      String(now.getSeconds()).padStart(2, 0);
    setDateAndTime(`${date} , ${time}`);
  };

  setInterval(getFullime, 1000);

  return (
    <Container maxWidth="xl" disableGutters={true}>
      <div className={classes.header}>
        <img
          className={classes.logo}
          src={logo}
          alt="Logo"
          draggable="false"
          onClick={authCtx.loadTradeScreen.bind(null, "back")}
        />
        <div className={classes.headerRight}>
          <Typography variant="caption">{dateAndTime}</Typography>
          <Button
            style={{ textTransform: "none" }}
            size="small"
            variant="outlined"
            endIcon={<LogoutIcon />}
            onClick={authCtx.logout}
          >
            Logout
          </Button>
        </div>
      </div>
    </Container>
  );
};

export default Header;
