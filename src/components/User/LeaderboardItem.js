import React, { useContext } from "react";
import classes from "./LeaderboardItem.module.css";
import AuthContext from "../../store/auth-context";

const LeaderboardItem = (props) => {
  const authCtx = useContext(AuthContext);
  const leaderboardData = props.leaderboardData;

  return (
    <ul className={classes.ul}>
      {leaderboardData.map((item, index) => {
        const pl = item.interest.toFixed(2) * 100 - 100;
        const cssClassName =
          item.username === authCtx.userData.name ? classes.mark : null;
        return (
          <li className={cssClassName} key={Math.random()}>
            <>{`${index + 1}. ${item.username}, P/L:`}</>
            <div
              className={
                pl > 0 ? classes.green : pl < 0 ? classes.red : classes.black
              }
            >
              {pl.toFixed(2)}%
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default LeaderboardItem;
