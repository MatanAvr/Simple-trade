import React, { useContext } from "react";
// import classes from "./LeaderboardItem.module.css";
import AuthContext from "../../store/auth-context";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Chip from "@mui/material/Chip";
// import Avatar from "@mui/material/Avatar";

const LeaderboardItem = (props) => {
  const authCtx = useContext(AuthContext);
  const leaderboardData = props.leaderboardData;

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 200 }} size="small">
        <TableBody>
          {leaderboardData.map((item, index) => {
            const pl = (item.interest * 100 - 100).toFixed(2);
            return (
              <TableRow key={Math.random()}>
                {/* key={props.item._id} */}
                <TableCell align="center">{index + 1}</TableCell>
                {/* <TableCell align="center">
                  <Avatar sx={{ width: 20, height: 20, color: "black" }}>
                    {index + 1}
                  </Avatar>
                </TableCell> */}
                <TableCell align="center">{item.username}</TableCell>
                {/* <TableCell align="center">{pl.toFixed(2)}%</TableCell> */}
                <TableCell align="center">
                  <Chip
                    label={`${pl}%`}
                    size="small"
                    color={pl > 0 ? "success" : pl < 0 ? "error" : "info"}
                  />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
    // <ul className={classes.ul}>
    //   {leaderboardData.map((item, index) => {
    //     const pl = item.interest.toFixed(4) * 100 - 100;
    //     const cssClassName =
    //       item.username === authCtx.userData.name ? classes.mark : null;
    //     return (
    //       <li className={cssClassName} key={Math.random()}>
    //         <>{`${index + 1}. ${item.username}, P/L:`}</>
    //         <div
    //           className={
    //             pl > 0 ? classes.green : pl < 0 ? classes.red : classes.black
    //           }
    //         >
    //           {pl.toFixed(2)}%
    //         </div>
    //       </li>
    //     );
    //   })}
    // </ul>
  );
};

export default LeaderboardItem;
