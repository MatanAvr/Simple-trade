import React, { useContext } from "react";
import AuthContext from "../../store/auth-context";
import classes from "./Leaderboard.module.css";
import LeaderboardItem from "./LeaderboardItem";
import LoadingSpinner from "../UI/LoadingSpinner";
import { Typography } from "@mui/material";

const Leaderboard = () => {
  const authCtx = useContext(AuthContext);
  const leaderboardList = authCtx.leaderboard;

  return (
    <div className={classes.leaderboard}>
      <Typography variant="h6">
        Leaderboard
        <br />
      </Typography>
      {leaderboardList.length === 0 ? (
        <LoadingSpinner />
      ) : (
        <LeaderboardItem
          key={Math.random()}
          leaderboardData={leaderboardList}
        />
      )}
      <Typography variant="caption">
        <br />
        {`Yor are in ${
          leaderboardList.findIndex(
            (item) => item.username === authCtx.userData.name
          ) + 1
        } 
        place out of ${leaderboardList.length} users.`}
        <br />
        (P/L is calculated from the initial 10k$ balance)
        <br />
        Last update: {getFullime()}
      </Typography>
    </div>
  );
};

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
    String(now.getMinutes()).padStart(2, 0);
  return `${date} , ${time}`;
};

export default Leaderboard;
