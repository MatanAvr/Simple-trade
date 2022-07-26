import React from "react";
import classes from "./Footer.module.css";

const Footer = () => {
  return (
    <p className={classes.footer}>
      <span>All rights reserved &#169;</span>
      <a href="mailto:simpletrade.isr@gmail.com">Contact us</a>
      <span>Version: 1.0.0</span>
    </p>
  );
};

export default Footer;
