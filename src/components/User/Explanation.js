import React from "react";
import classes from "./Explanation.module.css";
import { Typography } from "@mui/material";

const Explanation = () => {
  return (
    <div className={classes.middleCard}>
      <Typography variant="h6">
        <u>Explanation</u>
      </Typography>
      <Typography sx={{ mx: "auto", width: "85%" }}>
        <br />
        Simple-trade is an educational simplified trading platform, which allows
        you to simulate basic stock trading. You start with 10k$, try to be the
        most profitable trader!
        <br />
        <br />
        On the portfolio card you can see your current holdings: stock symbol,
        quantity, average buy price, and profit/lost.
        <br />
        <br />
        On the leaderboard card you can see a list that shows the users with the
        highest profit in descending order.
        <br />
        <br />
        Use the search bar to look for (autocompleted) real stocks and start
        trading!
        <br />
      </Typography>
    </div>
  );
};

export default Explanation;
