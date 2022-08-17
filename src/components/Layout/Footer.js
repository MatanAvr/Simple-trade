import React from "react";
import classes from "./Footer.module.css";
import { Typography } from "@mui/material";

const Footer = () => {
  return (
    <p className={classes.footer}>
      <Typography variant="caption">All rights reserved &#169;</Typography>
      <Typography variant="caption">
        <a href="mailto:simpletrade.isr@gmail.com">Contact us</a>
      </Typography>
      <Typography variant="caption">Version: 1.0.1</Typography>
    </p>
  );
};

export default Footer;
