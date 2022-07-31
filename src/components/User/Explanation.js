import React from "react";
import classes from "./Explanation.module.css";
import Search from "../UI/Search";

const Explanation = () => {
  return (
    <div className={classes.middleCard}>
      {/* <u>Start trading!</u>
      <Search showNote={true} />
      <br /> */}
      <p className={classes.p}>
        <u>Explanation</u>
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
      </p>
      <br />
    </div>
  );
};

export default Explanation;
